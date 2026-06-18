/* Atlas content gate — run:  node gate.js
   Validates the data layer the way the improvement loop does by hand every iteration:
   syntax loads, no duplicate lesson ids, every MCQ answer in range, no duplicate/empty MCQ
   choices or empty stems, flashcards well-formed, every embedded data-viz id is a real widget,
   and every prereq id (lesson.prereqs + PREREQS) points at a real lesson. Exits non-zero on any
   failure. Also prints non-blocking warnings (answer-position skew, duplicate stems within a lesson). */
const fs = require("fs");
global.window = {};
global.document = { documentElement: {}, createElement: () => ({ getContext: () => ({ scale() {} }), style: {}, addEventListener() {} }), addEventListener() {} };
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
function load(f) { new Function("window", "document", "getComputedStyle", fs.readFileSync(f, "utf8")).call(global.window, global.window, global.document, global.getComputedStyle); }

const TOPICS = ["linear-algebra", "calculus", "algorithms", "deep-learning", "reinforcement-learning", "llm", "probability-statistics"];
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

// ---- render-hazard lints (the class of bugs that render WRONG without throwing: iter 189 "<"-in-math,
//      iter 200 money-"\$" garble, iter 52 raw markdown). The app normalizer escapes "<" and "\$" at boot,
//      but these patterns still signal trouble: an ODD count of unescaped single-"$" means unbalanced math
//      OR a literal "$" that wasn't escaped (write money as \$); raw **bold**/__italic__ outside code/math
//      won't render through innerHTML. Both render silently-wrong (no KaTeX error), so the gate is the only
//      cheap catch. (Verified zero false positives across the corpus when added.)
function dollarOdd(s) { const t = String(s).replace(/\\\$/g, "").replace(/\$\$/g, ""); return ((t.match(/\$/g) || []).length % 2) === 1; }
function stripCodeMath(s) { return String(s).replace(/<pre[\s\S]*?<\/pre>/gi, " ").replace(/<code[\s\S]*?<\/code>/gi, " ").replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/\$[^$\n]*?\$/g, " "); }
function rawMarkdown(s) { const t = stripCodeMath(s); return /\*\*[^*\n]{1,80}\*\*/.test(t) || /(?:^|[^_A-Za-z0-9])__[^_\n]{1,80}__(?:[^_A-Za-z0-9]|$)/.test(t); }
function checkRender(s, where) {
  if (typeof s !== "string" || !s) return;
  if (dollarOdd(s)) errors.push("unbalanced / unescaped $ (write a literal money $ as \\$): " + where);
  if (rawMarkdown(s)) errors.push("raw markdown ** or __ won't render via innerHTML (use <strong>/<em>): " + where);
}
C.forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
  lessons++; if (ids.has(l.id)) errors.push("duplicate lesson id: " + l.id); ids.add(l.id); topicOf[l.id] = c.id;
  const ansPos = {}, stems = {};
  checkRender(l.content, l.id + ".content");
  (l.mcq || []).forEach((q, i) => {
    mcq++;
    const choices = Array.isArray(q.choices) ? q.choices : [];
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= choices.length) errors.push("bad MCQ answer index: " + l.id + " #" + i);
    if (choices.length < 2) errors.push("MCQ needs ≥2 choices: " + l.id + " #" + i);
    const trimmed = choices.map(c => String(c).trim());
    if (trimmed.some(c => !c)) errors.push("empty MCQ choice: " + l.id + " #" + i);
    if (new Set(trimmed).size !== trimmed.length) errors.push("duplicate MCQ choices: " + l.id + " #" + i);
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
  (l.homework || []).forEach((h, i) => { hw++; if (h) Object.keys(h).forEach(k => checkRender(h[k], l.id + " hw#" + i + "." + k)); });
  (l.examples || []).forEach((e, i) => { ex++; if (e) Object.keys(e).forEach(k => checkRender(e[k], l.id + " ex#" + i + "." + k)); });
  ((l.content || "").match(/data-viz="([^"]+)"/g) || []).forEach(s => { const id = s.slice(10, -1); if (!vizIds.has(id)) errors.push("unknown data-viz id '" + id + "' in " + l.id); });
  // run every embedded JavaScript code-exercise and confirm its output equals data-expected (catches a wrong
  // expected string — which silently shows the learner "✗ Doesn't match" on correct code). Python can't run here.
  const codeRe = /<div\s+data-code="([a-z]+)"\s+data-expected="([^"]*)"\s*>([\s\S]*?)<\/div>/g;
  let cm; while ((cm = codeRe.exec(l.content || ""))) {
    const lang = cm[1], expected = unesc(cm[2]).trim(), code = unesc(cm[3]).trim();
    if (lang !== "javascript") continue;
    codeChecked++;
    let out; try { out = runJS(code).trim(); } catch (e) { errors.push("data-code threw in " + l.id + ": " + e.message); continue; }
    if (out !== expected) errors.push("data-code expected-mismatch in " + l.id + "\n      got: " + JSON.stringify(out.slice(0, 90)) + "\n      exp: " + JSON.stringify(expected.slice(0, 90)));
  }
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

console.log(`GATE — ${C.length} topics · ${lessons} lessons · ${mcq} MCQs · ${cards} flashcards · ${hw} homework · ${ex} examples · ${vizIds.size} widgets · ${gloss.length} glossary · ${codeChecked} code-exercises verified`);
if (warnings.length) { console.log("warnings (" + warnings.length + ", non-blocking):"); warnings.slice(0, 40).forEach(w => console.log("  ⚠ " + w)); }
if (skew.length) console.log("note: correct-answer-position bias (>70% at one index) in " + skew.length + " lesson(s) — pre-existing; de-skewing needs per-MCQ care (some explanations cite positions).");
if (errors.length) { console.log("FAIL (" + errors.length + "):"); errors.slice(0, 30).forEach(e => console.log("  ✗ " + e)); process.exit(1); }
console.log("ALL GREEN ✓");
