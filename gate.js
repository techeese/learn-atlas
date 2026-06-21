/* Atlas content gate — run:  node gate.js
   Validates the data layer the way the improvement loop does by hand every iteration:
   syntax loads, no duplicate lesson ids, every MCQ answer in range, no duplicate/empty MCQ
   choices or empty stems, flashcards well-formed, every embedded data-viz id is a real widget,
   and every prereq id (lesson.prereqs + PREREQS) points at a real lesson. Exits non-zero on any
   failure. Also prints non-blocking warnings (answer-position skew, duplicate stems within a lesson). */
const fs = require("fs");
const cp = require("child_process");
global.window = {};
global.document = { documentElement: {}, createElement: () => ({ getContext: () => ({ scale() {} }), style: {}, addEventListener() {} }), addEventListener() {} };
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
function load(f) { new Function("window", "document", "getComputedStyle", fs.readFileSync(f, "utf8")).call(global.window, global.window, global.document, global.getComputedStyle); }

const TOPICS = ["linear-algebra", "calculus", "algorithms", "deep-learning", "reinforcement-learning", "llm", "probability-statistics", "machine-learning", "information-theory"];
TOPICS.forEach(t => load("data/" + t + ".js"));
load("data/prereqs.js");
load("js/viz.js");
load("data/glossary.js");

// emulate the Playground's runJS console.log path exactly (objects→JSON, args joined by " ", logs by "\n")
// so the gate can RUN every javascript code-exercise and confirm its data-expected actually matches.
function runJS(src) {
  const logs = [], orig = console.log;
  console.log = (...a) => logs.push(a.map(x => typeof x === "object" ? JSON.stringify(x) : String(x)).join(" "));
  try { new Function(src)(); } finally { console.log = orig; }
  return logs.join("\n");
}
// reverse the HTML-escaping that code/expected go through in the data layer (decode &amp; LAST)
function unesc(s) { return String(s).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#3?9;|&#x27;/g, "'").replace(/&amp;/g, "&"); }

const C = global.window.COURSES || [];
const vizIds = new Set((global.window.VIZ_CATALOG || []).map(v => v.id));
const ids = new Set(), topicOf = {};
let lessons = 0, mcq = 0, cards = 0, hw = 0, ex = 0, codeChecked = 0, errors = [], warnings = [], skew = [];
const pyExercises = [];   // python code-exercises collected for a post-pass (run via python3 if available)

// ---- render-hazard lints (the class of bugs that render WRONG without throwing: iter 189 "<"-in-math,
//      iter 200 money-"\$" garble, iter 52 raw markdown). The app normalizer escapes "<" and "\$" at boot,
//      but these patterns still signal trouble: an ODD count of unescaped single-"$" means unbalanced math
//      OR a literal "$" that wasn't escaped (write money as \$); raw **bold**/__italic__ outside code/math
//      won't render through innerHTML. Both render silently-wrong (no KaTeX error), so the gate is the only
//      cheap catch. (Verified zero false positives across the corpus when added.)
function dollarOdd(s) { const t = String(s).replace(/\\\$/g, "").replace(/\$\$/g, ""); return ((t.match(/\$/g) || []).length % 2) === 1; }
function stripCodeMath(s) { return String(s).replace(/<pre[\s\S]*?<\/pre>/gi, " ").replace(/<code[\s\S]*?<\/code>/gi, " ").replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/\$[^$\n]*?\$/g, " "); }
function rawMarkdown(s) { const t = stripCodeMath(s); return /\*\*[^*\n]{1,80}\*\*/.test(t) || /(?:^|[^_A-Za-z0-9])__[^_\n]{1,80}__(?:[^_A-Za-z0-9]|$)/.test(t); }
// mathtools-only LaTeX envs that THIS KaTeX build can't parse → a real .katex-error at typeset time that the
// static $-parity/tag lints miss (only --dump-dom kErr caught it). Found iter 329: a psmallmatrix had shipped
// unnoticed in an example. KaTeX supports matrix/pmatrix/bmatrix/Bmatrix/vmatrix/Vmatrix/smallmatrix/array/cases/
// aligned/gathered — but NOT the [pbBvV]smallmatrix family or the starred matrix*/cases* variants (those need
// mathtools). Denylist exactly those (verified zero matches across the corpus). Fix: \left(\begin{smallmatrix}…\right).
const UNSUPPORTED_KATEX_ENV = /\\begin\{(?:[pbBvV]smallmatrix|(?:matrix|pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|smallmatrix|cases)\*)\}/;
function checkRender(s, where) {
  if (typeof s !== "string" || !s) return;
  if (dollarOdd(s)) errors.push("unbalanced / unescaped $ (write a literal money $ as \\$): " + where);
  if (rawMarkdown(s)) errors.push("raw markdown ** or __ won't render via innerHTML (use <strong>/<em>): " + where);
  if (UNSUPPORTED_KATEX_ENV.test(s)) errors.push("unsupported KaTeX env (mathtools, not in this build — use \\left(\\begin{smallmatrix}…\\right)): " + where);
}
// unbalanced HTML tags render silently-wrong: an unclosed <details>/<b>/<div> (e.g. from a bad byte-stable
// injection) swallows or mis-styles the rest of the lesson. Count opens vs closes for these paired tags on
// math/code-stripped content (so "<" inside $…$ or a code block isn't miscounted; an *unclosed* <pre>/<code>
// survives the strip and is still caught). ONLY tags that do NOT auto-close in the HTML parser are listed:
// flow tags like <p>/<li>/<td>/<h3> are implicitly closed by a following block (e.g. "<p>…<h4>"), so their raw
// imbalance is benign and would be a false positive. Void tags (br/img/hr) are excluded too.
const PAIRED_TAGS = ["details", "b", "strong", "em", "span", "sup", "sub", "ul", "ol", "table", "div", "blockquote", "code", "pre"];
function tagBalance(s, where) {
  if (typeof s !== "string" || !s) return;
  const t = stripCodeMath(s);
  for (const tag of PAIRED_TAGS) {
    const open = (t.match(new RegExp("<" + tag + "(?=[\\s/>])", "gi")) || []).length;
    const close = (t.match(new RegExp("</" + tag + "\\s*>", "gi")) || []).length;
    if (open !== close) errors.push("unbalanced <" + tag + "> in " + where + " (" + open + " open / " + close + " close)");
  }
}
C.forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
  lessons++; if (ids.has(l.id)) errors.push("duplicate lesson id: " + l.id); ids.add(l.id); topicOf[l.id] = c.id;
  const ansPos = {}, stems = {};
  // Strip <div data-code …>…</div> blocks before the render/tag lints: the code and its expected-output
  // legitimately contain `$` (template literals), `<`, `%` etc. that are NOT KaTeX/HTML and must not trip
  // the math-$-parity or tag-balance checks. The code itself is still validated by running it (below).
  const contentLint = String(l.content || "").replace(/<div\s+data-code="[a-z]+"\s+data-expected="[^"]*"\s*>[\s\S]*?<\/div>/g, " ");
  checkRender(contentLint, l.id + ".content");
  tagBalance(contentLint, l.id + ".content");
  (l.mcq || []).forEach((q, i) => {
    mcq++;
    const choices = Array.isArray(q.choices) ? q.choices : [];
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= choices.length) errors.push("bad MCQ answer index: " + l.id + " #" + i);
    if (choices.length < 2) errors.push("MCQ needs ≥2 choices: " + l.id + " #" + i);
    const trimmed = choices.map(c => String(c).trim());
    if (trimmed.some(c => !c)) errors.push("empty MCQ choice: " + l.id + " #" + i);
    if (new Set(trimmed).size !== trimmed.length) errors.push("duplicate MCQ choices: " + l.id + " #" + i);
    // also catch render-identical duplicates that differ only by whitespace (KaTeX renders "$a-b$" and "$a - b$"
    // the same) — collapse all whitespace but PRESERVE case, since math case is significant (F≠f, O≠o, Ω≠ω).
    const collapsed = choices.map(c => String(c).replace(/\s+/g, ""));
    if (new Set(collapsed).size !== collapsed.length) errors.push("duplicate MCQ choices (whitespace-normalized): " + l.id + " #" + i);
    if (!String(q.q || "").trim()) errors.push("empty MCQ stem: " + l.id + " #" + i);
    checkRender(q.q, l.id + " mcq#" + i + ".q"); checkRender(q.explain, l.id + " mcq#" + i + ".explain");
    choices.forEach((ch, ci) => checkRender(ch, l.id + " mcq#" + i + ".choice" + ci));
    if (typeof q.answer === "number") ansPos[q.answer] = (ansPos[q.answer] || 0) + 1;
    const key = String(q.q || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
    if (key) { if (stems[key] != null) warnings.push("duplicate MCQ stem in " + l.id + " (#" + stems[key] + " & #" + i + ")"); else stems[key] = i; }
  });
  const nq = (l.mcq || []).length;
  if (nq >= 8) { const maxPos = Math.max(0, ...Object.values(ansPos)); if (maxPos / nq > 0.7) skew.push(l.id); }   // egregious correct-answer-position bias
  (l.flashcards || []).forEach((f, i) => { cards++; if (!f.front || !f.back) errors.push("flashcard missing front/back: " + l.id + " #" + i); checkRender(f.front, l.id + " card#" + i + ".front"); checkRender(f.back, l.id + " card#" + i + ".back"); });
  (l.homework || []).forEach((h, i) => { hw++; if (h) { if (!((h.prompt || h.q || "").trim())) errors.push("homework missing prompt in " + l.id + " hw#" + i); Object.keys(h).forEach(k => checkRender(h[k], l.id + " hw#" + i + "." + k)); } });
  (l.examples || []).forEach((e, i) => { ex++; if (e) { if (!((e.body || e.scenario || e.prompt || "").trim())) errors.push("example missing body/scenario in " + l.id + " ex#" + i); Object.keys(e).forEach(k => checkRender(e[k], l.id + " ex#" + i + "." + k)); } });
  ((l.content || "").match(/data-viz="([^"]+)"/g) || []).forEach(s => { const id = s.slice(10, -1); if (!vizIds.has(id)) errors.push("unknown data-viz id '" + id + "' in " + l.id); });
  // content-parity warnings (non-blocking): every lesson should reach the site standard of 16 MCQ /
  // 6 flashcards / 3 examples / 3 homework / 3 deeper-dives. Surfaces gaps in new content automatically
  // (e.g. the iter-668 catch where a freshly-built module shipped with 0 deep-dives).
  { const ddN = ((l.content || "").match(/<summary>/g) || []).length, gaps = [];
    if ((l.mcq || []).length < 16) gaps.push((l.mcq || []).length + "/16 MCQ");
    if ((l.flashcards || []).length < 6) gaps.push((l.flashcards || []).length + "/6 cards");
    if ((l.examples || []).length < 3) gaps.push((l.examples || []).length + "/3 examples");
    if ((l.homework || []).length < 3) gaps.push((l.homework || []).length + "/3 homework");
    if (ddN < 3) gaps.push(ddN + "/3 deep-dives");
    if (gaps.length) warnings.push("below content-parity standard: " + l.id + " — " + gaps.join(", ")); }
  // run every embedded JavaScript code-exercise and confirm its output equals data-expected (catches a wrong
  // expected string — which silently shows the learner "✗ Doesn't match" on correct code). Python is collected
  // here and verified in a post-pass via python3 (if installed), so those exercises are protected too.
  const codeRe = /<div\s+data-code="([a-z]+)"\s+data-expected="([^"]*)"\s*>([\s\S]*?)<\/div>/g;
  let cm; while ((cm = codeRe.exec(l.content || ""))) {
    const lang = cm[1], expected = unesc(cm[2]).trim(), code = unesc(cm[3]).trim();
    if (lang === "javascript") {
      codeChecked++;
      let out; try { out = runJS(code).trim(); } catch (e) { errors.push("data-code threw in " + l.id + ": " + e.message); continue; }
      if (out !== expected) errors.push("data-code expected-mismatch in " + l.id + "\n      got: " + JSON.stringify(out.slice(0, 90)) + "\n      exp: " + JSON.stringify(expected.slice(0, 90)));
    } else if (lang === "python") {
      pyExercises.push({ lid: l.id, code, expected });
    }
  }
})));
// python code-exercises: verify via python3 if available (Pyodide runs them in the browser; this protects the
// data-expected strings from silent regressions). If python3 is missing (some CI), skip with a warning, never fail.
if (pyExercises.length) {
  let py3 = true;
  try { cp.execSync("python3 --version", { stdio: "ignore" }); } catch (e) { py3 = false; }
  if (!py3) {
    warnings.push("python3 not found — skipped verifying " + pyExercises.length + " python code-exercise(s)");
  } else {
    const tmp = require("os").tmpdir() + "/atlas_gate_py.py";
    for (const pe of pyExercises) {
      fs.writeFileSync(tmp, pe.code);
      let out;
      try { out = cp.execSync("python3 " + JSON.stringify(tmp), { encoding: "utf8", timeout: 10000 }).trim(); }
      catch (e) { errors.push("python data-code threw in " + pe.lid + ": " + String(e.stderr || e.message).slice(0, 120)); continue; }
      codeChecked++;
      if (out !== pe.expected) errors.push("python data-code expected-mismatch in " + pe.lid + "\n      got: " + JSON.stringify(out.slice(0, 90)) + "\n      exp: " + JSON.stringify(pe.expected.slice(0, 90)));
    }
    try { fs.unlinkSync(tmp); } catch (e) {}
  }
}
// dangling internal links: any hand-authored "#/lesson/<topic>/<id>" in content must resolve to a real lesson
// (a renamed/removed lesson leaves a link that silently 404s on click). Second pass — all ids are now known.
let linksChecked = 0;
C.forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
  const re = /#\/lesson\/[a-z0-9-]+\/([a-z0-9-]+)/g; let lm;
  while ((lm = re.exec(l.content || ""))) { linksChecked++; if (!ids.has(lm[1])) errors.push("dangling lesson link '#/lesson/.../" + lm[1] + "' in " + l.id); }
})));
// glossary: render-hazard lint every definition + flag duplicate terms (the inline-tooltip source of truth)
const gloss = global.window.GLOSSARY || [];
const gseen = {};
gloss.forEach((t, i) => {
  if (!t || !t.term || !t.def) { errors.push("glossary entry missing term/def: #" + i); return; }
  const k = String(t.term).toLowerCase();
  if (gseen[k]) errors.push("duplicate glossary term: " + t.term); else gseen[k] = 1;
  checkRender(t.def, "glossary['" + t.term + "'].def");
});
Object.entries(global.window.PREREQS || {}).forEach(([lid, arr]) => {
  if (!topicOf[lid]) errors.push("PREREQS lesson not found: " + lid);
  (arr || []).forEach(p => { if (!topicOf[p]) errors.push("PREREQS target not found: " + p + " (for " + lid + ")"); });
});
// achievement consistency: every defined achievement must appear in a Hall category (else it is invisible to the
// learner), and every category id must be a real achievement (else a dead reference). store.js (needs a localStorage
// stub) provides the ids; app.js's ACH_CATEGORIES is parsed as text. Degrades to a warning if it can't introspect.
let achIds = [];
try { global.localStorage = { getItem() { return null; }, setItem() {}, removeItem() {} }; load("js/store.js"); achIds = ((global.window.Store || {}).ACHIEVEMENTS || []).map(a => a.id); }
catch (e) { warnings.push("achievement check skipped — couldn't load store.js (" + e.message + ")"); }
if (achIds.length) {
  const appSrc = fs.readFileSync("js/app.js", "utf8");
  const block = appSrc.match(/ACH_CATEGORIES\s*=\s*\[([\s\S]*?)\n\s*\];/);
  if (!block) warnings.push("achievement check skipped — ACH_CATEGORIES not found in app.js");
  else {
    const catIds = new Set((block[1].match(/"([a-z0-9-]+)"/g) || []).map(s => s.slice(1, -1)));
    const achSet = new Set(achIds);
    achIds.forEach(id => { if (!catIds.has(id)) errors.push("achievement '" + id + "' is in store.js but no Hall category — it would be invisible; add it to ACH_CATEGORIES"); });
    catIds.forEach(id => { if (!achSet.has(id)) errors.push("ACH_CATEGORIES references unknown achievement id '" + id + "'"); });
  }
}

console.log(`GATE — ${C.length} topics · ${lessons} lessons · ${mcq} MCQs · ${cards} flashcards · ${hw} homework · ${ex} examples · ${vizIds.size} widgets · ${gloss.length} glossary · ${codeChecked} code-exercises verified · ${linksChecked} internal links ok`);
if (warnings.length) { console.log("warnings (" + warnings.length + ", non-blocking):"); warnings.slice(0, 40).forEach(w => console.log("  ⚠ " + w)); }
if (skew.length) console.log("note: correct-answer-position bias (>70% at one index) in " + skew.length + " lesson(s) — pre-existing; de-skewing needs per-MCQ care (some explanations cite positions).");
if (errors.length) { console.log("FAIL (" + errors.length + "):"); errors.slice(0, 30).forEach(e => console.log("  ✗ " + e)); process.exit(1); }
console.log("ALL GREEN ✓");
