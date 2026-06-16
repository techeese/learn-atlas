/* ============================================================
   ATLAS — SPA router + views + interactive engines
   ============================================================ */
(function () {
  "use strict";
  const C = () => window.COURSES;
  const app = document.getElementById("app");
  const esc = s => String(s == null ? "" : s);

  // ---------- math typeset ----------
  function typeset(retries) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(app, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    } else if ((retries || 0) < 40) {
      // KaTeX CDN script may not have attached yet — retry briefly.
      setTimeout(() => typeset((retries || 0) + 1), 120);
    }
  }

  // ---------- lookups ----------
  function findCourse(id) { return C().find(c => c.id === id); }
  function findLesson(cid, lid) {
    const c = findCourse(cid); if (!c) return null;
    for (const m of c.modules) { const l = m.lessons.find(x => x.id === lid); if (l) return { course: c, module: m, lesson: l }; }
    return null;
  }
  function flatLessons(c) { const out = []; c.modules.forEach(m => m.lessons.forEach(l => out.push(l))); return out; }

  // ---------- lesson index + prerequisites / learning path ----------
  let _index = null;
  function index() {
    if (_index) return _index;
    _index = {}; let ord = 0;
    C().forEach(c => c.modules.forEach((m, mi) => m.lessons.forEach(l => {
      _index[l.id] = { course: c, module: m, lesson: l, order: ord++, moduleIdx: mi };
    })));
    return _index;
  }
  // explicit prerequisites = lesson.prereqs (in data) ∪ window.PREREQS[id] (cross-topic graph)
  function explicitPrereqs(id) {
    const node = index()[id]; if (!node) return [];
    const a = node.lesson.prereqs || [], b = (window.PREREQS && window.PREREQS[id]) || [];
    return a.concat(b).filter((v, i, arr) => arr.indexOf(v) === i);
  }
  // All lessons that should be learned before `lid`: explicit prereqs closure
  // PLUS the lessons preceding it within its own course (natural ordering).
  function learningPath(lid) {
    const idx = index(), seen = {}, out = [];
    function visit(id) {
      if (seen[id]) return; seen[id] = true;
      const node = idx[id]; if (!node) return;
      // explicit prerequisites first (incl. cross-topic)
      explicitPrereqs(id).forEach(visit);
      // in-course preceding lessons (implicit prerequisites)
      flatLessons(node.course).forEach(l => { if (idx[l.id].order < node.order) visit(l.id); });
      out.push(id);
    }
    visit(lid);
    // stable order by global index, target last
    return out.map(id => idx[id]).filter(Boolean).sort((a, b) => a.order - b.order);
  }

  // ---------- question bank ----------
  function allQuestions() {
    const out = [];
    C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
      (l.mcq || []).forEach((q, i) => out.push({ q, courseId: c.id, color: c.color, lessonId: l.id, lessonTitle: l.title, courseTitle: c.title }));
    })));
    if (Array.isArray(window.QUESTION_BANK)) window.QUESTION_BANK.forEach(b => out.push(b));
    return out;
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // ---------- deterministic daily concept ----------
  function dayNumber() { const d = new Date(); return Math.floor(Date.parse(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0") + "T00:00:00") / 86400000); }
  function mulberry(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function isReady(id) { return !Store.isLessonDone(id) && learningPath(id).every(p => p.lesson.id === id || Store.isLessonDone(p.lesson.id)); }
  function readySet() { const s = new Set(); C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => { if (isReady(l.id)) s.add(l.id); }))); return s; }
  function dailyConcept() {
    const all = []; C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => all.push(l.id))));
    if (!all.length) return null;
    const rng = mulberry(dayNumber() + 7);
    const undone = all.filter(id => !Store.isLessonDone(id));
    const ready = undone.filter(isReady);
    const stretch = undone.filter(id => ready.indexOf(id) < 0); // not-yet-reachable concepts
    let id, advanced = false;
    if (stretch.length && rng() < 0.25) { id = stretch[Math.floor(rng() * stretch.length)]; advanced = true; } // occasional peek ahead
    else if (ready.length) { id = ready[Math.floor(rng() * ready.length)]; }                                    // prefer an actionable concept
    else { const pool = undone.length ? undone : all; id = pool[Math.floor(rng() * pool.length)]; advanced = !!undone.length; }
    return { node: index()[id], advanced, ready: ready.indexOf(id) >= 0 };
  }

  // ---------- toast ----------
  let toastWrap;
  function toast(icon, title, desc) {
    if (!toastWrap) { toastWrap = document.createElement("div"); toastWrap.className = "toast-wrap"; toastWrap.setAttribute("role", "status"); toastWrap.setAttribute("aria-live", "polite"); document.body.appendChild(toastWrap); }
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<div class="t-ico">${icon}</div><div><div class="t-t">${esc(title)}</div><div class="t-d">${esc(desc)}</div></div>`;
    toastWrap.appendChild(el);
    setTimeout(() => { el.style.transition = "opacity .4s, transform .4s"; el.style.opacity = "0"; el.style.transform = "translateX(40px)"; setTimeout(() => el.remove(), 420); }, 3200);
  }
  function flushAchievements() {
    Store.drainUnlocked().forEach(a => toast(a.icon, "Achievement unlocked", a.name));
    const lus = Store.drainLevelUps ? Store.drainLevelUps() : [];
    if (lus.length) levelUpCelebrate(lus[lus.length - 1]); // celebrate the highest reached
  }

  // ---------- onboarding / welcome tour ----------
  function showIntro(force) {
    if (!force) { try { if (localStorage.getItem("atlas.introSeen")) return; } catch (e) {} }
    const ov = document.createElement("div"); ov.className = "intro-ov";
    ov.innerHTML = `<div class="intro-card">
      <div class="intro-eyebrow">Welcome to your codex</div>
      <h2 class="intro-title">Atlas</h2>
      <p class="intro-sub">A personal home for linear algebra, calculus, algorithms, deep learning, reinforcement learning & LLMs — built to make hard ideas <em>click</em> and <em>stick</em>.</p>
      <div class="intro-grid">
        <div class="intro-item"><span>📖</span><b>Learn</b><small>113 lessons with rendered math, worked examples & interactive visualizations.</small></div>
        <div class="intro-item"><span>📝</span><b>Master</b><small>Spawn a test in <b>Mastery mode</b> — wrong answers return until you pass.</small></div>
        <div class="intro-item"><span>🗺️</span><b>Navigate</b><small>The Knowledge Constellation maps every concept and what it builds on.</small></div>
        <div class="intro-item"><span>💻</span><b>Build</b><small>Run real Python & JS in the Code Playground, right in the browser.</small></div>
      </div>
      <p class="intro-tip">Tip: press <kbd>⌘K</kbd> (or <kbd>Ctrl K</kbd>) to jump anywhere. Progress saves on this device.</p>
      <button class="btn primary" id="intro-go">Start learning →</button>
    </div>`;
    document.body.appendChild(ov);
    const close = () => { try { localStorage.setItem("atlas.introSeen", "1"); } catch (e) {} ov.remove(); };
    ov.addEventListener("click", e => { if (e.target === ov) close(); });
    ov.querySelector("#intro-go").addEventListener("click", close);
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", k); } });
  }

  // ---------- juice: confetti + level-up celebration (respects reduced-motion) ----------
  function reducedMotion() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } }
  function confetti() {
    if (reducedMotion()) return;
    const cv = document.createElement("canvas"), W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
    cv.style.cssText = "position:fixed;inset:0;z-index:250;pointer-events:none";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d"), cols = ["#e0a458", "#88a37a", "#9a8bc4", "#d2715a", "#f1e8da"];
    const ps = Array.from({ length: 130 }, () => ({ x: Math.random() * W, y: -20 - Math.random() * H * 0.3, vx: (Math.random() - 0.5) * 3.4, vy: 2 + Math.random() * 4.5, s: 4 + Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3 }));
    let t = 0, raf;
    function frame() {
      t++; ctx.clearRect(0, 0, W, H);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - t / 170); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); ctx.restore(); });
      if (t < 170) raf = requestAnimationFrame(frame); else cv.remove();
    }
    raf = requestAnimationFrame(frame);
  }
  function levelUpCelebrate(info) {
    confetti();
    const ov = document.createElement("div"); ov.className = "levelup-ov";
    ov.innerHTML = `<div class="levelup-card"><div class="lu-glyph">⬆</div><div class="lu-eyebrow">Level Up</div><div class="lu-lvl">Level ${info.level}</div><div class="lu-name">${esc(info.name)}</div><button class="btn primary" id="lu-close">Keep going →</button></div>`;
    document.body.appendChild(ov);
    const close = () => ov.remove();
    ov.addEventListener("click", e => { if (e.target === ov) close(); });
    ov.querySelector("#lu-close").addEventListener("click", close);
    document.addEventListener("keydown", function esc2(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc2); } });
  }

  // ---------- chrome (sidebar + topbar) ----------
  function renderChrome() {
    const lv = Store.levelInfo();
    document.getElementById("nav-courses").innerHTML = C().map(c => {
      const p = Store.courseProgress(c.id);
      return `<a href="#/course/${c.id}" data-route><span class="dot" style="background:${c.color}"></span>${esc(c.title)} <span style="margin-left:auto;font-size:11px;color:var(--ink-mute)">${p.pct}%</span></a>`;
    }).join("");

    document.getElementById("ring").style.setProperty("--ring", lv.pct + "%");
    document.getElementById("ring-num").textContent = lv.level;
    document.getElementById("lvl-name").textContent = lv.name;
    document.getElementById("lvl-sub").textContent = "Level " + lv.level;
    document.getElementById("xp-fill").style.width = lv.pct + "%";
    document.getElementById("xp-text").textContent = lv.next
      ? `${lv.xp.toLocaleString()} XP · ${lv.toNext.toLocaleString()} to ${lv.next.name}`
      : `${lv.xp.toLocaleString()} XP · max level`;
    const st = Store.stats();
    document.getElementById("streak-num").textContent = st.streak;
    // highlight active nav
    const hash = location.hash || "#/";
    document.querySelectorAll("[data-route]").forEach(a => {
      const active = a.getAttribute("href") === hash || (a.getAttribute("href") === "#/" && hash === "#/");
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  // ============================================================
  //  VIEWS
  // ============================================================
  function viewDashboard() {
    const st = Store.stats();
    const lv = Store.levelInfo();
    const goal = Store.raw.goalXp || 50, today = Store.todayXP(), goalPct = Math.min(100, Math.round(today / goal * 100));
    const weak = Store.weakSpots();
    // "continue where you left off"
    let contHtml = "";
    const last = Store.raw.lastLesson;
    if (last) { const [lc, ll] = last.split("/"); const node = findLesson(lc, ll);
      if (node) { const done = Store.isLessonDone(ll);
        contHtml = `<div class="cotd reveal" style="--c:${node.course.color}" data-go="#/lesson/${lc}/${ll}">
          <div class="cotd-side"><div class="cotd-ico" style="color:${node.course.color};border-color:${node.course.color}">↩</div><div class="cotd-tag">Continue</div></div>
          <div class="cotd-body"><div class="cotd-course">${esc(node.course.title)} · ${esc(node.module.title)}</div><h3>${esc(node.lesson.title)}</h3>
          <p>${done ? "Revisit this lesson, or jump to its quiz, flashcards & examples." : "Pick up right where you left off."}</p>
          <span class="btn primary" style="pointer-events:none">Resume →</span></div></div>`; } }
    const cd = dailyConcept();
    const cdHtml = cd ? `
      <div class="cotd reveal" style="--c:${cd.node.course.color}" data-go="#/lesson/${cd.node.course.id}/${cd.node.lesson.id}">
        <div class="cotd-side">
          <div class="cotd-ico" style="color:${cd.node.course.color};border-color:${cd.node.course.color}">${esc(cd.node.course.icon)}</div>
          <div class="cotd-tag">Concept of the Day${cd.advanced ? ` · <span style="color:var(--gold)">a stretch ↗</span>` : cd.ready ? ` · <span style="color:var(--sage)">ready ✓</span>` : ""}</div>
        </div>
        <div class="cotd-body">
          <div class="cotd-course">${esc(cd.node.course.title)} · ${esc(cd.node.module.title)}</div>
          <h3>${esc(cd.node.lesson.title)}</h3>
          <p>${cd.advanced ? "A peek ahead — something you haven't reached yet. Curiosity is rewarded." : cd.ready ? "All its prerequisites are done — you're ready for this one." : "Today's pick to keep your mind moving. A few minutes is enough."}</p>
          <span class="btn primary" style="pointer-events:none">Study now →</span>
        </div>
      </div>` : "";
    const cards = C().map(c => {
      const p = Store.courseProgress(c.id);
      const lc = flatLessons(c).length;
      return `
      <div class="course-card reveal" style="--c:${c.color}" data-go="#/course/${c.id}">
        <div class="cc-icon">${esc(c.icon)}</div>
        <h3>${esc(c.title)}</h3>
        <div class="blurb">${esc(c.blurb)}</div>
        <div class="cc-foot">
          <div class="mini-bar"><div class="mini-fill" style="width:${p.pct}%;background:${c.color}"></div></div>
          <span>${p.done}/${lc}</span>
        </div>
      </div>`;
    }).join("");

    app.innerHTML = `
    <div class="view">
      <div class="page-head reveal">
        <div class="eyebrow">Your learning codex</div>
        <h2>Welcome back, <em>${lv.name}</em>.</h2>
        <p>Pick up where you left off, drill due flashcards, or open a new topic. Every lesson, quiz, and review earns XP toward your next rank.</p>
      </div>

      <div class="stat-strip">
        <div class="stat reveal" style="--c:var(--gold)"><div class="v">${st.lessonsDone}/${st.totalLessons}</div><div class="k">Lessons done</div></div>
        <div class="stat reveal" style="--c:var(--sage)"><div class="v">${st.accuracy}%</div><div class="k">Quiz accuracy</div></div>
        <div class="stat reveal" style="--c:var(--rust)"><div class="v">${st.dueCount}</div><div class="k">Cards due</div></div>
        <div class="stat reveal" style="--c:var(--violet)"><div class="v">${st.streak}</div><div class="k">Day streak</div></div>
      </div>

      <div class="today-strip reveal">
        <div class="goal-ring" style="--p:${goalPct}"><span>${goalPct}%</span></div>
        <div class="today-text">
          <div class="t-main">Today's goal: <b>${today} / ${goal} XP</b> ${goalPct >= 100 ? "<span style='color:var(--sage)'>· hit! 🎉</span>" : ""}</div>
          <div class="t-sub">${weak.length ? `<span style="color:var(--rust)">⚠ ${weak.length} concept${weak.length === 1 ? "" : "s"} need review</span>` : "🔥 streak " + st.streak + " days · no weak spots right now"}${Store.raw.freezes ? ` · ❄️ ${Store.raw.freezes} freeze${Store.raw.freezes === 1 ? "" : "s"}` : ""}</div>
        </div>
        ${weak.length ? `<a class="btn" href="#/test" data-route style="margin-left:auto">Drill weak spots →</a>` : ""}
      </div>

      ${contHtml}
      ${cdHtml}

      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:34px" class="reveal">
        <a class="btn primary" href="#/review" data-route>⚡ Review ${st.dueCount} due card${st.dueCount === 1 ? "" : "s"}</a>
        <a class="btn" href="#/test" data-route>📝 Spawn a test</a>
        <a class="btn ghost" href="#/map" data-route>🗺️ Knowledge Map</a>
        <a class="btn ghost" href="#/lab" data-route>🎛️ Visualization Lab</a>
        <a class="btn ghost" href="#/glossary" data-route>📔 Glossary</a>
        <a class="btn ghost" href="#/library" data-route>📚 References</a>
      </div>

      <div class="page-head reveal" style="margin-bottom:18px"><h2 style="font-size:26px">Topics</h2></div>
      <div class="grid">${cards}</div>
    </div>`;
    bindGo();
    typeset();
  }

  function viewCourse(id) {
    const c = findCourse(id);
    if (!c) return view404();
    const p = Store.courseProgress(id);
    const modules = c.modules.map((m, mi) => {
      const rows = m.lessons.map(l => {
        const done = Store.isLessonDone(l.id);
        const eff = Store.effectiveMastery(l.id), lvl = Store.masteryLevel(eff), ready = isReady(l.id);
        const nMcq = (l.mcq || []).length, nCards = (l.flashcards || []).length, nHw = (l.homework || []).length;
        return `
        <div class="lesson-row ${done ? "done" : ""} ${ready ? "ready" : ""}" data-go="#/lesson/${c.id}/${l.id}">
          <div class="lesson-check">✓</div>
          <div style="flex:1">
            <div class="l-title">${esc(l.title)}${ready ? ` <span class="pill ready-pill">▶ start here</span>` : ""}</div>
            <div class="l-meta">${l.minutes || 10} min read · <span style="color:${lvl.color}">${lvl.label}</span></div>
            <div class="mastery-bar"><div class="mastery-fill" style="width:${Math.round(eff * 100)}%;background:${lvl.color}"></div></div>
          </div>
          <div class="l-right">
            ${nMcq ? `<span class="pill gold">${nMcq} MCQ</span>` : ""}
            ${nCards ? `<span class="pill violet">${nCards} cards</span>` : ""}
            ${nHw ? `<span class="pill sage">${nHw} HW</span>` : ""}
          </div>
        </div>`;
      }).join("");
      return `
      <div class="module reveal">
        <div class="module-head">
          <span class="mnum">MODULE ${mi + 1}</span>
          <h3>${esc(m.title)}</h3>
          <span class="mcount">${m.lessons.length} lesson${m.lessons.length === 1 ? "" : "s"}</span>
        </div>
        ${rows}
      </div>`;
    }).join("");

    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; ${esc(c.title)}</div>
      <div class="page-head reveal" style="display:flex;align-items:center;gap:20px">
        <div class="cc-icon" style="--c:${c.color};width:64px;height:64px;font-size:32px;color:${c.color};border-color:${c.color};background:color-mix(in srgb, ${c.color} 12%, transparent)">${esc(c.icon)}</div>
        <div>
          <div class="eyebrow" style="color:${c.color}">${p.done} of ${p.total} lessons · ${p.pct}% complete</div>
          <h2 style="font-size:38px">${esc(c.title)}</h2>
        </div>
      </div>
      <p style="color:var(--ink-soft);max-width:640px;margin:-14px 0 28px" class="reveal">${esc(c.blurb)}</p>
      <div class="mini-bar reveal" style="height:8px;margin-bottom:18px;max-width:none"><div class="mini-fill" style="width:${p.pct}%;background:${c.color}"></div></div>
      <div class="reveal" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:30px">
        <a class="btn ghost" href="#/cheatsheet/${c.id}" data-route>📄 Cheatsheet</a>
        <a class="btn ghost" href="#/placement/${c.id}" data-route>🎚️ Placement test</a>
        <a class="btn ghost" href="#/test" data-route>📝 Quiz me</a>
      </div>
      ${modules}
      ${refsBlock(c.id, "References for " + c.title)}
    </div>`;
    bindGo();
    typeset();
  }

  // references block (shared by course page + library)
  const KIND = { video: "🎬", course: "🎓", book: "📕", paper: "📄", article: "📝", interactive: "🕹️", reference: "🔖" };
  function refsBlock(topicId, heading) {
    const refs = (window.REFERENCES || {})[topicId];
    if (!refs || !refs.length) return "";
    return `
      <div class="module reveal" style="margin-top:34px">
        <div class="module-head"><span class="mnum">📚</span><h3>${esc(heading)}</h3></div>
        ${refs.map(r => `
          <a class="ref-item" href="${esc(r.url)}" target="_blank" rel="noopener">
            <span class="ref-kind">${KIND[r.kind] || "🔗"}</span>
            <span class="ref-main"><span class="ref-title">${esc(r.title)}</span><span class="ref-by">${esc(r.by)}</span>${r.note ? `<span class="ref-note">${esc(r.note)}</span>` : ""}</span>
            <span class="ref-tag">${esc(r.kind)} ↗</span>
          </a>`).join("")}
      </div>`;
  }

  // ---------- lesson (tabbed) ----------
  function viewLesson(cid, lid) {
    const found = findLesson(cid, lid);
    if (!found) return view404();
    const { course, lesson } = found;
    Store.setLastLesson(cid + "/" + lid);
    const all = flatLessons(course);
    const idx = all.findIndex(l => l.id === lid);
    const prev = all[idx - 1], next = all[idx + 1];

    const nMcq = (lesson.mcq || []).length, nCards = (lesson.flashcards || []).length, nHw = (lesson.homework || []).length, nEx = (lesson.examples || []).length;
    const tabs = [
      { id: "lecture", label: "Lecture", icon: "📖" },
      nEx ? { id: "examples", label: "Examples", icon: "🔍", badge: nEx } : null,
      nMcq ? { id: "quiz", label: "Quiz", icon: "✎", badge: nMcq } : null,
      nCards ? { id: "cards", label: "Flashcards", icon: "🃏", badge: nCards } : null,
      nHw ? { id: "homework", label: "Homework", icon: "✦", badge: nHw } : null,
      nCards ? { id: "recall", label: "Recall", icon: "🧠" } : null
    ].filter(Boolean);

    // prerequisite path: lessons that come before this one and aren't done yet
    const pending = learningPath(lid).filter(n => n.lesson.id !== lid && !Store.isLessonDone(n.lesson.id));
    const pathBanner = pending.length ? `
      <div class="path-banner reveal">
        <div class="pb-head"><span>🧭</span> <b>${pending.length} prerequisite${pending.length === 1 ? "" : "s"}</b> build up to this concept.</div>
        <a class="btn" href="#/path/${course.id}/${lid}" data-route>See the full learning path →</a>
      </div>` : "";

    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; <a href="#/course/${course.id}" data-route>${esc(course.title)}</a> &nbsp;›&nbsp; ${esc(lesson.title)}</div>
      <div class="page-head" style="margin-bottom:18px">
        <div class="eyebrow" style="color:${course.color}">${esc(course.title)} · ${lesson.minutes || 10} min${(() => { const eff = Store.effectiveMastery(lid), L = Store.masteryLevel(eff); return ` · <span style="color:${L.color}">${L.label}${eff > 0 ? " · " + Math.round(eff * 100) + "%" : ""}</span>`; })()}</div>
        <h2>${esc(lesson.title)}</h2>
        ${(() => { const eff = Store.effectiveMastery(lid), L = Store.masteryLevel(eff); return eff > 0 ? `<div class="mastery-bar" style="margin-top:10px;max-width:220px"><div class="mastery-fill" style="width:${Math.round(eff * 100)}%;background:${L.color}"></div></div>` : ""; })()}
      </div>
      ${pathBanner}
      <div class="tabs">${tabs.map((t, i) => `<div class="tab ${i === 0 ? "active" : ""}" data-tab="${t.id}">${t.icon} ${t.label}${t.badge ? `<span class="badge">${t.badge}</span>` : ""}</div>`).join("")}</div>
      <div id="tab-body"></div>
    </div>`;

    const body = document.getElementById("tab-body");
    function setTab(name) {
      document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
      if (name === "lecture") renderLecture(body, course, lesson, prev, next);
      else if (name === "examples") renderExamples(body, lesson);
      else if (name === "quiz") renderQuiz(body, lesson);
      else if (name === "cards") renderCards(body, lesson);
      else if (name === "homework") renderHomework(body, lesson);
      else if (name === "recall") renderRecall(body, course, lesson);
    }
    document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));
    setTab("lecture");
  }

  // "Builds on" (direct prereqs) + "Leads to" (lessons depending on this one)
  function lessonConnections(lid) {
    const idx = index();
    const builds = directPrereqs(lid).map(id => idx[id]).filter(Boolean);
    const leads = [];
    C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => { if (l.id !== lid && directPrereqs(l.id).indexOf(lid) >= 0) leads.push(idx[l.id]); })));
    if (!builds.length && !leads.length) return "";
    const chip = n => `<a class="conn-chip" href="#/lesson/${n.course.id}/${n.lesson.id}" data-route style="--c:${n.course.color}"><span class="cc-dot" style="background:${n.course.color}"></span>${esc(n.lesson.title)}</a>`;
    return `<div class="connections reveal">
      ${builds.length ? `<div class="conn-row"><span class="conn-label">Builds on</span><div class="conn-chips">${builds.map(chip).join("")}</div></div>` : ""}
      ${leads.length ? `<div class="conn-row"><span class="conn-label">Leads to</span><div class="conn-chips">${leads.slice(0, 6).map(chip).join("")}</div></div>` : ""}
    </div>`;
  }

  function renderLecture(body, course, lesson, prev, next) {
    const done = Store.isLessonDone(lesson.id);
    body.innerHTML = `
      <div class="prose reveal">${lesson.content || "<p>Content coming soon.</p>"}</div>
      <div class="notes-box reveal">
        <div class="notes-head">📝 My notes <span id="notes-saved"></span></div>
        <textarea id="notes-area" placeholder="Jot your own notes, questions, or 'aha' moments — saved automatically on this device.">${esc(Store.getNote(lesson.id))}</textarea>
      </div>
      <div class="lesson-actions">
        <button class="btn primary" id="complete-btn">${done ? "✓ Completed" : "Mark complete (+50 XP)"}</button>
        ${prev ? `<a class="btn ghost" href="#/lesson/${course.id}/${prev.id}" data-route>← ${esc(prev.title)}</a>` : ""}
        ${next ? `<a class="btn" href="#/lesson/${course.id}/${next.id}" data-route>${esc(next.title)} →</a>` : `<a class="btn" href="#/course/${course.id}" data-route>Back to course →</a>`}
        <button class="btn ghost" id="print-lesson" style="margin-left:auto">🖨️ Print</button>
      </div>
      ${lessonConnections(lesson.id)}`;
    const pl = document.getElementById("print-lesson"); if (pl) pl.addEventListener("click", () => window.print());
    const area = document.getElementById("notes-area");
    let nt; area.addEventListener("input", () => { clearTimeout(nt); nt = setTimeout(() => { Store.setNote(lesson.id, area.value); const s = document.getElementById("notes-saved"); s.textContent = "saved ✓"; setTimeout(() => s.textContent = "", 1500); }, 500); });
    const btn = document.getElementById("complete-btn");
    btn.addEventListener("click", () => {
      const was = Store.isLessonDone(lesson.id);
      const before = was ? null : readySet();
      Store.completeLesson(lesson.id);
      btn.textContent = "✓ Completed";
      if (!was) {
        toast("✨", "+50 XP", "Lesson complete: " + lesson.title);
        const newly = before ? [...readySet()].filter(id => !before.has(id)).map(id => index()[id]).filter(Boolean) : [];
        if (newly.length) toast("🔓", "Unlocked " + newly.length + " concept" + (newly.length > 1 ? "s" : ""), newly[0].lesson.title + (newly.length > 1 ? " · +" + (newly.length - 1) + " more" : ""));
      }
      flushAchievements();
      renderChrome();
    });
    bindGo();
    hydrateViz(body);
    hydrateCode(body);
    typeset();
  }

  // ---------- quiz engine ----------
  function renderQuiz(body, lesson) {
    const qs = lesson.mcq || [];
    let i = 0, correct = 0, locked = false;
    function draw() {
      if (i >= qs.length) { finish(); return; }
      const q = qs[i];
      body.innerHTML = `
      <div class="quiz reveal">
        <div class="q-progress">Question ${i + 1} of ${qs.length} · ${correct} correct so far · <kbd>1</kbd>–<kbd>4</kbd> to answer</div>
        <div class="q-stem">${q.q}</div>
        <div class="choices">
          ${q.choices.map((ch, ci) => `<button class="choice" data-ci="${ci}"><span class="key">${String.fromCharCode(65 + ci)}</span><span>${ch}</span></button>`).join("")}
        </div>
        <div id="explain-slot"></div>
        <div id="next-slot" style="margin-top:22px"></div>
      </div>`;
      locked = false;
      body.querySelectorAll(".choice").forEach(btn => btn.addEventListener("click", () => pick(parseInt(btn.dataset.ci, 10), q)));
      typeset();
    }
    function pick(ci, q) {
      if (locked) return;
      locked = true;
      const right = q.answer;
      body.querySelectorAll(".choice").forEach((btn, bi) => {
        btn.classList.add("locked");
        if (bi === right) btn.classList.add("correct");
        else if (bi === ci) btn.classList.add("wrong");
      });
      if (ci === right) correct++;
      document.getElementById("explain-slot").innerHTML =
        `<div class="explain"><div class="et">${ci === right ? "Correct ✓" : "Not quite"}</div>${q.explain || ""}</div>`;
      const nextBtn = document.createElement("button");
      nextBtn.className = "btn primary";
      nextBtn.textContent = i === qs.length - 1 ? "See results →" : "Next question →";
      nextBtn.addEventListener("click", () => { i++; draw(); });
      document.getElementById("next-slot").appendChild(nextBtn);
      typeset();
    }
    function finish() {
      const pct = Math.round((correct / qs.length) * 100);
      Store.recordQuiz(correct, qs.length, lesson.id);
      const msg = pct === 100 ? "Flawless! 🎯" : pct >= 70 ? "Solid work." : "Review the lecture and try again.";
      body.innerHTML = `
      <div class="quiz quiz-result reveal">
        <div class="big">${pct}%</div>
        <p style="color:var(--ink-soft);font-size:18px">${correct} of ${qs.length} correct · ${msg}</p>
        <p style="color:var(--ink-mute);margin:6px 0 22px">+${correct * 10}${pct === 100 ? " +30 perfect bonus" : ""} XP</p>
        <button class="btn primary" id="retry">↻ Retry quiz</button>
      </div>`;
      document.getElementById("retry").addEventListener("click", () => { i = 0; correct = 0; draw(); });
      if (pct === 100) confetti();
      flushAchievements();
      renderChrome();
    }
    draw();
  }

  // ---------- flashcards ----------
  function renderCards(body, lesson) {
    const cards = (lesson.flashcards || []).map((c, i) => ({ c, id: lesson.id + ":" + i }));
    runFlashcards(body, cards, "Lesson flashcards");
  }

  function runFlashcards(body, cards, label) {
    if (!cards.length) { body.innerHTML = emptyState("🃏", "No flashcards here yet."); return; }
    let i = 0, flipped = false, reviewed = 0;
    function draw() {
      if (i >= cards.length) { done(); return; }
      const { c } = cards[i];
      body.innerHTML = `
      <div class="flash-wrap reveal">
        <div class="flash-counter">${label} · ${i + 1} / ${cards.length}</div>
        <div class="card3d" id="card3d">
          <div class="card3d-inner">
            <div class="card-face"><span class="ftag">Prompt</span><div class="fcontent">${c.front}</div></div>
            <div class="card-face card-back"><span class="ftag">Answer</span><div class="fcontent">${c.back}</div></div>
          </div>
        </div>
        <div id="flash-controls"></div>
      </div>`;
      flipped = false;
      const card = document.getElementById("card3d");
      card.addEventListener("click", flip);
      drawControls();
      typeset();
    }
    function flip() {
      flipped = !flipped;
      document.getElementById("card3d").classList.toggle("flipped", flipped);
      drawControls();
    }
    function drawControls() {
      const slot = document.getElementById("flash-controls");
      if (!flipped) {
        slot.innerHTML = `<div class="flash-hint">Tap the card — or press <kbd>Space</kbd> — to reveal the answer</div>`;
      } else {
        const iv = g => { const d = Store.projectInterval(cards[i].id, g); return d <= 0 ? "soon" : d === 1 ? "1d" : d + "d"; };
        slot.innerHTML = `
          <div class="flash-grade">
            <button class="grade-btn again" data-g="0">Again<small>${iv(0)}</small></button>
            <button class="grade-btn hard"  data-g="1">Hard<small>${iv(1)}</small></button>
            <button class="grade-btn good"  data-g="2">Good<small>${iv(2)}</small></button>
            <button class="grade-btn easy"  data-g="3">Easy<small>${iv(3)}</small></button>
          </div>
          <div class="flash-hint">How well did you recall it? <kbd>1</kbd>–<kbd>4</kbd> grade · the time under each shows when you'll see it again.</div>`;
        slot.querySelectorAll(".grade-btn").forEach(b => b.addEventListener("click", () => {
          Store.gradeCard(cards[i].id, parseInt(b.dataset.g, 10));
          reviewed++; i++; draw(); renderChrome(); flushAchievements();
        }));
      }
    }
    function done() {
      body.innerHTML = `
      <div class="flash-wrap reveal" style="text-align:center;padding:40px 0">
        <div style="font-size:56px">🌟</div>
        <h3 style="font-family:var(--font-disp);font-size:28px;margin:12px 0">Deck cleared</h3>
        <p style="color:var(--ink-soft)">Reviewed ${reviewed} card${reviewed === 1 ? "" : "s"} · +${reviewed * 4} XP</p>
        <p style="color:var(--ink-mute);margin-top:6px">Spaced-repetition will resurface them when it's time.</p>
        <button class="btn primary" id="again-deck" style="margin-top:18px">↻ Run deck again</button>
      </div>`;
      document.getElementById("again-deck").addEventListener("click", () => { i = 0; reviewed = 0; draw(); });
      flushAchievements();
    }
    draw();
  }

  // ---------- homework ----------
  function renderHomework(body, lesson) {
    const hw = lesson.homework || [];
    if (!hw.length) { body.innerHTML = emptyState("✦", "No homework for this lesson."); return; }
    body.innerHTML = `<div class="hw reveal">` + hw.map((h, i) => `
      <div class="hw-item">
        <div class="hw-num">PROBLEM ${i + 1}</div>
        <div class="hw-prompt">${h.prompt}</div>
        <div class="hw-reveal">
          ${h.hint ? `<button class="btn ghost" data-hint="${i}">💡 Hint</button>` : ""}
          <button class="btn" data-sol="${i}">Show solution</button>
        </div>
        <div id="hint-${i}"></div>
        <div id="sol-${i}"></div>
      </div>`).join("") + `</div>`;

    hw.forEach((h, i) => {
      const hintBtn = body.querySelector(`[data-hint="${i}"]`);
      if (hintBtn) hintBtn.addEventListener("click", () => {
        document.getElementById("hint-" + i).innerHTML = `<div class="hw-sol" style="border-color:var(--gold-deep)"><div class="sl" style="color:var(--gold)">Hint</div>${h.hint}</div>`;
        typeset();
      });
      body.querySelector(`[data-sol="${i}"]`).addEventListener("click", () => {
        Store.revealHomework(lesson.id + ":hw" + i);
        document.getElementById("sol-" + i).innerHTML = `<div class="hw-sol"><div class="sl">Solution</div>${h.solution}</div>`;
        typeset(); renderChrome();
      });
    });
    typeset();
  }

  // ---------- recall ("explain it back" — free recall) ----------
  function renderRecall(body, course, lesson) {
    const cards = lesson.flashcards || [];
    if (!cards.length) { body.innerHTML = emptyState("🧠", "Add flashcards to a lesson to unlock free-recall practice."); return; }
    body.innerHTML = `
      <div class="recall reveal">
        <div class="recall-intro">
          <h3>🧠 Explain it back</h3>
          <p>Look away from the lecture and write everything you can about <b>${esc(lesson.title)}</b> from memory — the definition, the intuition, the key formulas, and when you'd reach for it. Recalling from a <em>blank page</em> is the single strongest way to find what you don't actually know yet — far better than re-reading.</p>
        </div>
        <textarea id="recall-area" class="recall-area" placeholder="Start typing your explanation from memory… (saved to your lesson notes on this device)">${esc(Store.getNote(lesson.id))}</textarea>
        <div class="recall-bar">
          <span id="recall-saved" class="recall-saved"></span>
          <button class="btn primary" id="recall-check">Check myself against ${cards.length} key point${cards.length === 1 ? "" : "s"} →</button>
        </div>
        <div id="recall-rubric"></div>
      </div>`;

    const area = body.querySelector("#recall-area");
    let nt;
    area.addEventListener("input", () => {
      clearTimeout(nt);
      nt = setTimeout(() => { Store.setNote(lesson.id, area.value); const s = body.querySelector("#recall-saved"); if (s) { s.textContent = "saved ✓"; setTimeout(() => s.textContent = "", 1500); } }, 500);
    });
    body.querySelector("#recall-check").addEventListener("click", revealRubric);
    typeset();

    function revealRubric() {
      const rub = body.querySelector("#recall-rubric");
      rub.innerHTML = `
        <div class="recall-rubric reveal">
          <p class="rubric-hint">Tick every point you genuinely covered <em>before</em> peeking — honest gaps are exactly what to restudy. Reveal any answer to compare your wording.</p>
          ${cards.map((c, i) => `
            <div class="rubric-item">
              <label class="rubric-pt"><input type="checkbox" data-rp="${i}"><span>${c.front}</span></label>
              <button class="btn ghost rubric-reveal" data-rb="${i}">show answer</button>
              <div class="rubric-ans" id="rub-ans-${i}"></div>
            </div>`).join("")}
          <div class="recall-score-bar">
            <button class="btn primary" id="recall-score">Score my recall (<span id="rp-count">0</span>/${cards.length})</button>
          </div>
          <div id="recall-result"></div>
        </div>`;
      rub.querySelectorAll(".rubric-reveal").forEach(b => b.addEventListener("click", () => {
        const i = b.dataset.rb;
        document.getElementById("rub-ans-" + i).innerHTML = `<div class="hw-sol"><div class="sl">Answer</div>${cards[i].back}</div>`;
        b.style.display = "none"; typeset();
      }));
      const upd = () => { const n = rub.querySelectorAll("input[data-rp]:checked").length; const c = document.getElementById("rp-count"); if (c) c.textContent = n; };
      rub.querySelectorAll("input[data-rp]").forEach(cb => cb.addEventListener("change", upd));
      rub.querySelector("#recall-score").addEventListener("click", scoreRecall);
      body.querySelector("#recall-check").disabled = true;
      typeset();
    }

    function scoreRecall() {
      const total = cards.length;
      const covered = body.querySelectorAll("input[data-rp]:checked").length;
      Store.touchStreak();
      for (let k = 0; k < covered; k++) Store.bumpMastery(lesson.id, { correct: true });   // reward demonstrated recall; missed points simply aren't credited
      const xp = covered * 6 + (covered === total ? 20 : 0);
      Store.addXP(xp);
      const pct = Math.round((covered / total) * 100);
      const msg = pct === 100 ? "Total recall — you can teach this. 🎓" : pct >= 60 ? "Strong. Re-read the points you left unticked, then recall again." : "Now you know exactly what to restudy. Re-read the lecture, then come back and recall.";
      document.getElementById("recall-result").innerHTML = `
        <div class="recall-done reveal">
          <div class="big">${covered}/${total}</div>
          <p style="color:var(--ink-soft)">${msg}</p>
          <p class="recall-xp">+${xp} XP</p>
          <button class="btn" id="recall-again">↻ Recall again</button>
        </div>`;
      const sb = body.querySelector("#recall-score"); if (sb) sb.disabled = true;
      document.getElementById("recall-again").addEventListener("click", () => renderRecall(body, course, lesson));
      if (pct === 100) confetti();
      flushAchievements();
      renderChrome();
    }
  }

  // ---------- global review (all due cards) ----------
  function viewReview() {
    const due = [], cards = Store.raw.cards || {}, now = Date.now(), DAY = 86400000;
    let soon = 0, week = 0, seen = 0;
    C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
      (l.flashcards || []).forEach((card, i) => {
        const id = l.id + ":" + i;
        if (Store.cardDue(id)) due.push({ c: card, id });
        const rec = cards[id];
        if (rec) { seen++; const d = rec.due || 0; if (d > now && d <= now + DAY) soon++; if (d > now && d <= now + 7 * DAY) week++; }
      });
    })));
    const forecast = `<div class="today-strip reveal" style="gap:0">
      <div class="fc-cell"><div class="fc-n" style="color:var(--rust)">${due.length}</div><div class="fc-k">due now</div></div>
      <div class="fc-cell"><div class="fc-n" style="color:var(--gold)">${soon}</div><div class="fc-k">next 24h</div></div>
      <div class="fc-cell"><div class="fc-n" style="color:var(--sage)">${week}</div><div class="fc-k">next 7 days</div></div>
      <div class="fc-cell"><div class="fc-n" style="color:var(--violet)">${seen}</div><div class="fc-k">cards in rotation</div></div>
    </div>`;
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Daily review</div>
      <div class="page-head reveal"><div class="eyebrow">Spaced repetition</div><h2>Daily <em>Review</em></h2>
      <p>${due.length ? `${due.length} card${due.length === 1 ? "" : "s"} due across all your topics. Grade honestly — the schedule adapts.` : "Nothing due right now. Come back tomorrow, or study a lesson's deck directly."}</p></div>
      ${forecast}
      <div id="review-body"></div>
    </div>`;
    bindGo();
    if (due.length) runFlashcards(document.getElementById("review-body"), shuffle(due), "Due across all topics");
    else document.getElementById("review-body").innerHTML = emptyState("✅", "Inbox zero. Your memory is up to date.");
  }

  // ---------- examples tab ----------
  function renderExamples(body, lesson) {
    const ex = lesson.examples || [];
    if (!ex.length) { body.innerHTML = emptyState("🔍", "No standalone examples — the lecture has worked examples inline."); return; }
    body.innerHTML = `<div class="hw reveal">` + ex.map((e, i) => `
      <div class="hw-item">
        <div class="hw-num">EXAMPLE ${i + 1}${e.title ? " · " + esc(e.title) : ""}</div>
        <div class="prose" style="max-width:none">${e.body || e.prompt || ""}</div>
        ${e.solution ? `<div class="hw-reveal"><button class="btn" data-ex="${i}">Show working</button></div><div id="ex-${i}"></div>` : ""}
      </div>`).join("") + `</div>`;
    ex.forEach((e, i) => {
      const b = body.querySelector(`[data-ex="${i}"]`);
      if (b) b.addEventListener("click", () => { document.getElementById("ex-" + i).innerHTML = `<div class="hw-sol"><div class="sl">Working</div>${e.solution}</div>`; typeset(); });
    });
    hydrateViz(body); typeset();
  }

  // ---------- interactive viz hydration ----------
  function hydrateViz(root) {
    if (!window.VIZ) return;
    (root || app).querySelectorAll("[data-viz]").forEach(node => {
      const id = node.getAttribute("data-viz");
      if (node.dataset.vizDone) return;
      node.dataset.vizDone = "1"; node.classList.add("viz");
      if (window.VIZ[id]) { try { window.VIZ[id](node); Store.unlock("visualizer"); flushAchievements(); } catch (e) { node.innerHTML = '<div class="viz-note">Visualization failed to load.</div>'; } }
      else node.innerHTML = `<div class="viz-note">Unknown visualization: ${esc(id)}</div>`;
    });
  }

  // ---------- custom test / exam spawner ----------
  function viewTest() {
    const courses = C();
    const completed = courses.flatMap(c => c.modules.flatMap(m => m.lessons)).filter(l => Store.isLessonDone(l.id));
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Test</div>
      <div class="page-head reveal"><div class="eyebrow">Question bank · ${allQuestions().length} questions</div><h2>Spawn a <em>Test</em></h2>
      <p>Build a fresh test on demand. Choose the scope and length — by default it draws <strong>only from what you've already learned</strong>, so you're never tested on what you haven't seen.</p></div>
      <div class="test-config reveal">
        <div class="tc-row">
          <label class="viz-slab">Scope</label>
          <select id="t-scope">
            <option value="mastered">✓ Only lessons I've completed (${completed.length})</option>
            <option value="weak">⚠ Focus my weak spots (${Store.weakSpots().length})</option>
            <option value="all">Everything (all topics)</option>
            ${courses.map(c => `<option value="course:${c.id}">${esc(c.title)} only</option>`).join("")}
          </select>
        </div>
        <div class="tc-row">
          <label class="viz-slab">Length</label>
          <select id="t-len"><option value="5">5 questions</option><option value="10" selected>10 questions</option><option value="20">20 questions</option><option value="40">40 questions</option></select>
        </div>
        <label class="tc-check"><input type="checkbox" id="t-mastery" checked> <span><b>Mastery mode</b> — wrong answers come back until you get them right (no casual remembering).</span></label>
        <button class="btn primary" id="t-start">Start →</button>
        <div id="t-warn" class="viz-note"></div>
      </div>
      ${Store.raw.tests.length ? `<div class="module reveal" style="margin-top:34px"><div class="module-head"><span class="mnum">🗂️</span><h3>Recent tests</h3></div>
        ${Store.raw.tests.slice(0, 8).map(t => `<div class="lesson-row" style="cursor:default"><div class="l-title" style="font-size:15px">${esc(t.label)}</div><div class="l-right"><span class="pill ${t.correct === t.total ? "sage" : "gold"}">${t.correct}/${t.total} · ${Math.round(t.correct / t.total * 100)}%</span></div></div>`).join("")}</div>` : ""}
    </div>`;
    bindGo();
    document.getElementById("t-start").addEventListener("click", () => {
      const scope = document.getElementById("t-scope").value, len = parseInt(document.getElementById("t-len").value, 10);
      let pool = allQuestions(), label = "All topics";
      if (scope === "mastered") { const done = {}; completed.forEach(l => done[l.id] = 1); pool = pool.filter(q => done[q.lessonId]); label = "Mastered material"; }
      else if (scope === "weak") { const weak = {}; Store.weakSpots().forEach(w => weak[w.lessonId] = 1); pool = pool.filter(q => weak[q.lessonId]); label = "Weak spots"; }
      else if (scope.startsWith("course:")) { const cid = scope.slice(7); pool = pool.filter(q => q.courseId === cid); label = (findCourse(cid) || {}).title || "Topic"; }
      if (pool.length < 3) { document.getElementById("t-warn").textContent = "Not enough questions in that scope yet — complete a few more lessons, or widen the scope."; return; }
      const picked = shuffle(pool).slice(0, Math.min(len, pool.length));
      if (document.getElementById("t-mastery").checked) runMasteryDrill(picked, label);
      else runTest(picked, label);
    });
  }

  // ---------- mastery drill: re-queue wrong answers until ALL are passed ----------
  function runMasteryDrill(items, label) {
    const total = items.length;
    let queue = items.map((it, k) => ({ it, key: k })); // each unique question
    queue = shuffle(queue);
    const remaining = new Set(queue.map(q => q.key));
    let firstTryRight = 0, attempts = 0, seenKeys = new Set();
    function draw() {
      if (!queue.length) return finish();
      const { it, key } = queue[0], q = it.q;
      const masteredN = total - remaining.size;
      app.innerHTML = `
      <div class="view"><div class="quiz reveal">
        <div class="q-progress">${esc(label)} · Mastery mode — <b style="color:var(--sage)">${masteredN}/${total} mastered</b>${queue.length > 1 ? ` · ${queue.length} in queue` : ""} · <kbd>1</kbd>–<kbd>4</kbd> answer</div>
        <div class="mastery-track"><div class="mastery-track-fill" style="width:${Math.round(masteredN / total * 100)}%"></div></div>
        <div class="q-stem">${q.q}</div>
        <div class="choices">${q.choices.map((ch, ci) => `<button class="choice" data-ci="${ci}"><span class="key">${String.fromCharCode(65 + ci)}</span><span>${ch}</span></button>`).join("")}</div>
        <div id="md-explain"></div><div id="md-next" style="margin-top:20px"></div>
      </div></div>`;
      let locked = false;
      app.querySelectorAll(".choice").forEach(b => b.addEventListener("click", () => {
        if (locked) return; locked = true;
        const ci = parseInt(b.dataset.ci, 10), right = q.answer, ok = ci === right;
        attempts++;
        if (!seenKeys.has(key)) { seenKeys.add(key); if (ok) firstTryRight++; }
        Store.bumpMastery(it.lessonId, { correct: ok });
        app.querySelectorAll(".choice").forEach((bb, bi) => { bb.classList.add("locked"); if (bi === right) bb.classList.add("correct"); else if (bi === ci) bb.classList.add("wrong"); });
        if (ok) { remaining.delete(key); queue.shift(); }
        else { const item = queue.shift(); queue.push(item); } // back of the line
        document.getElementById("md-explain").innerHTML = `<div class="explain"><div class="et">${ok ? "Correct ✓ — mastered" : "Not yet — you'll see this again"}</div>${q.explain || ""}${!ok ? `<div style="margin-top:6px;color:var(--ink-mute)">${esc(it.lessonTitle)} · <a href="#/lesson/${it.courseId}/${it.lessonId}" data-route style="color:var(--gold)">review the lesson →</a></div>` : ""}</div>`;
        const nb = document.createElement("button"); nb.className = "btn primary";
        nb.textContent = remaining.size ? "Continue →" : "Finish ✓";
        nb.addEventListener("click", draw); document.getElementById("md-next").appendChild(nb);
        bindGo(); typeset();
      }));
      typeset();
    }
    function finish() {
      const pct = Math.round(firstTryRight / total * 100);
      Store.recordTest(total, total, `${label} · mastery (${total}Q)`); // all eventually correct
      app.innerHTML = `
      <div class="view"><div class="quiz quiz-result reveal">
        <div class="big">✓ ${total}/${total}</div>
        <p style="color:var(--ink-soft);font-size:18px">All ${total} mastered · ${esc(label)}</p>
        <p style="color:var(--ink-mute);margin:6px 0 20px">${firstTryRight} right on the first try (${pct}%) · ${attempts} total attempts</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button class="btn primary" id="md-again">↻ New drill</button><a class="btn ghost" href="#/" data-route>Done</a></div>
      </div></div>`;
      bindGo();
      document.getElementById("md-again").addEventListener("click", () => { location.hash = "#/test"; });
      confetti(); flushAchievements(); renderChrome();
    }
    draw();
  }

  function runTest(items, label, opts) {
    opts = opts || {};
    let i = 0; const answers = new Array(items.length).fill(null);
    function draw() {
      const q = items[i].q;
      app.innerHTML = `
      <div class="view"><div class="quiz reveal">
        <div class="q-progress">${esc(label)} · Question ${i + 1} of ${items.length} · <kbd>1</kbd>–<kbd>4</kbd> answer · <kbd>↵</kbd> next</div>
        <div class="q-stem">${q.q}</div>
        <div class="choices">${q.choices.map((ch, ci) => `<button class="choice ${answers[i] === ci ? "sel" : ""}" data-ci="${ci}"><span class="key">${String.fromCharCode(65 + ci)}</span><span>${ch}</span></button>`).join("")}</div>
        <div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">
          ${i > 0 ? `<button class="btn ghost" id="t-prev">← Back</button>` : ""}
          <button class="btn primary" id="t-next" ${answers[i] == null ? "disabled" : ""}>${i === items.length - 1 ? "Submit test ✓" : "Next →"}</button>
          <span class="viz-note" style="margin:auto 0">${answers.filter(a => a != null).length} / ${items.length} answered</span>
        </div>
      </div></div>`;
      app.querySelectorAll(".choice").forEach(b => b.addEventListener("click", () => { answers[i] = parseInt(b.dataset.ci, 10); draw(); }));
      const nx = document.getElementById("t-next"); if (nx) nx.addEventListener("click", () => { if (i === items.length - 1) finish(); else { i++; draw(); } });
      const pv = document.getElementById("t-prev"); if (pv) pv.addEventListener("click", () => { i--; draw(); });
      typeset();
    }
    function finish() {
      if (opts.placement) return finishPlacement();
      let correct = 0; items.forEach((it, k) => { const ok = answers[k] === it.q.answer; if (ok) correct++; Store.bumpMastery(it.lessonId, { correct: ok }); });
      const pct = Math.round(correct / items.length * 100);
      Store.recordTest(correct, items.length, `${label} · ${items.length}Q`);
      app.innerHTML = `
      <div class="view"><div class="quiz quiz-result reveal">
        <div class="big">${pct}%</div>
        <p style="color:var(--ink-soft);font-size:18px">${correct} of ${items.length} correct · ${esc(label)}</p>
        <p style="color:var(--ink-mute);margin:6px 0 20px">+${correct * 8}${items.length >= 10 && correct === items.length ? " +50 perfect bonus" : ""} XP</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button class="btn primary" id="t-again">↻ New test</button><a class="btn ghost" href="#/" data-route>Done</a></div>
      </div>
      <div class="hw reveal" style="margin-top:30px"><div class="module-head"><span class="mnum">📋</span><h3>Review</h3></div>
        ${items.map((it, k) => { const ok = answers[k] === it.q.answer; return `<div class="hw-item" style="border-color:${ok ? "var(--sage-deep)" : "var(--rust)"}">
          <div class="hw-num" style="color:${ok ? "var(--sage)" : "var(--rust)"}">${ok ? "✓ Correct" : "✗ Incorrect"} · ${esc(it.lessonTitle)}</div>
          <div class="hw-prompt">${it.q.q}</div>
          <div class="viz-note">Correct answer: <b>${String.fromCharCode(65 + it.q.answer)}.</b> ${it.q.choices[it.q.answer]}${answers[k] != null && !ok ? ` · you chose ${String.fromCharCode(65 + answers[k])}` : answers[k] == null ? " · you skipped this" : ""}</div>
          ${it.q.explain ? `<div class="hw-sol"><div class="sl">Why</div>${it.q.explain}</div>` : ""}
        </div>`; }).join("")}
      </div></div>`;
      bindGo();
      document.getElementById("t-again").addEventListener("click", () => { location.hash = "#/test"; });
      flushAchievements(); renderChrome(); typeset();
    }
    function finishPlacement() {
      const course = opts.course;
      let correct = 0;
      items.forEach((it, k) => { const ok = answers[k] === it.q.answer; if (ok) { correct++; Store.markKnown(it.lessonId); } else Store.bumpMastery(it.lessonId, { correct: false }); });
      // recommended starting point = first lesson in order that isn't "known"
      const known = {}; items.forEach((it, k) => { if (answers[k] === it.q.answer) known[it.lessonId] = 1; });
      const flat = flatLessons(course);
      const start = flat.find(l => !known[l.id]) || flat[flat.length - 1];
      app.innerHTML = `
      <div class="view"><div class="quiz quiz-result reveal">
        <div class="big">${correct}/${items.length}</div>
        <p style="color:var(--ink-soft);font-size:18px">Placement complete · ${esc(course.title)}</p>
        <p style="color:var(--ink-mute);margin:6px 0 20px">${correct} concept${correct === 1 ? "" : "s"} marked as known — they'll show as Proficient and the map will skip ahead.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn primary" href="#/lesson/${course.id}/${start.id}" data-route>▶ Start at: ${esc(start.title)}</a>
          <a class="btn ghost" href="#/map" data-route>See the map</a>
        </div>
      </div>
      <div class="hw reveal" style="margin-top:30px"><div class="module-head"><span class="mnum">🎚️</span><h3>Your results</h3></div>
        ${items.map((it, k) => { const ok = answers[k] === it.q.answer; return `<div class="lesson-row" style="cursor:default"><div class="lesson-check ${ok ? "done2" : ""}" style="${ok ? "background:var(--sage);border-color:var(--sage);color:var(--bg)" : "color:var(--rust);border-color:var(--rust)"}">${ok ? "✓" : "?"}</div><div style="flex:1"><div class="l-title" style="font-size:15px">${esc(it.lessonTitle)}</div><div class="l-meta">${ok ? "known — marked Proficient" : "to learn"}</div></div></div>`; }).join("")}
      </div></div>`;
      bindGo(); renderChrome();
    }
    draw();
  }

  // ---------- learning path (knowledge dependency) ----------
  function viewPath(cid, lid) {
    const found = findLesson(cid, lid); if (!found) return view404();
    const target = found.lesson;
    const path = learningPath(lid);
    const firstUndone = path.find(n => !Store.isLessonDone(n.lesson.id));
    Store.unlock("pathfinder"); flushAchievements();
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; <a href="#/lesson/${cid}/${lid}" data-route>${esc(target.title)}</a> &nbsp;›&nbsp; Path</div>
      <div class="page-head reveal"><div class="eyebrow">Knowledge dependency · ${path.length} steps</div><h2>Path to <em>${esc(target.title)}</em></h2>
      <p>Master these in order and you'll have every prerequisite this concept rests on. Completed steps are checked; start at the first open one.</p></div>
      ${firstUndone ? `<a class="btn primary reveal" href="#/lesson/${firstUndone.course.id}/${firstUndone.lesson.id}" data-route style="margin-bottom:24px">▶ Start at: ${esc(firstUndone.lesson.title)}</a>` : `<div class="callout sage reveal" style="margin-bottom:24px"><div class="c-tag">Ready</div>You've completed every prerequisite — dive into ${esc(target.title)}.</div>`}
      <div class="path-list reveal">
        ${path.map((n, k) => { const done = Store.isLessonDone(n.lesson.id), isTarget = n.lesson.id === lid;
          return `<a class="path-step ${done ? "done" : ""} ${isTarget ? "target" : ""}" href="#/lesson/${n.course.id}/${n.lesson.id}" data-route>
            <span class="ps-num" style="--c:${n.course.color}">${done ? "✓" : k + 1}</span>
            <span class="ps-main"><span class="ps-title">${esc(n.lesson.title)}${isTarget ? " 🎯" : ""}</span><span class="ps-course" style="color:${n.course.color}">${esc(n.course.title)}</span></span>
            <span class="ps-min">${n.lesson.minutes || 10}m</span>
          </a>`; }).join("")}
      </div>
    </div>`;
    bindGo();
  }

  // ---------- visualization lab ----------
  // first lesson that embeds a given widget
  function vizLesson(vizId) {
    let found = null;
    C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => { if (!found && (l.content || "").indexOf('data-viz="' + vizId + '"') >= 0) found = { course: c, lesson: l }; })));
    return found;
  }
  function viewLab() {
    const cat = window.VIZ_CATALOG || [];
    const byTopic = {};
    cat.forEach(v => { (byTopic[v.topic] = byTopic[v.topic] || []).push(v); });
    const groups = C().map(c => {
      const items = byTopic[c.id] || []; if (!items.length) return "";
      return `<div class="module reveal"><div class="module-head"><span class="mnum" style="color:${c.color}">${esc(c.icon)}</span><h3>${esc(c.title)}</h3></div>
        <div class="lab-grid">${items.map(v => { const vl = vizLesson(v.id);
          return `<a class="lab-card" href="#/lab/${v.id}" data-route style="--c:${c.color}"><h4>${esc(v.title)}</h4><p>${esc(v.blurb)}</p>${vl ? `<span class="lab-in">↳ ${esc(vl.lesson.title)}</span>` : ""}<span class="lab-go">Open ↗</span></a>`; }).join("")}</div></div>`;
    }).join("");
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Lab</div>
      <div class="page-head reveal"><div class="eyebrow">${cat.length} interactive widgets</div><h2>Visualization <em>Lab</em></h2>
      <p>Play with the ideas directly — drag, slide, and animate. Manipulating a concept builds intuition faster than reading about it.</p></div>
      ${groups || emptyState("🎛️", "No visualizations loaded.")}
    </div>`;
    bindGo();
  }
  function viewLabItem(id) {
    const meta = (window.VIZ_CATALOG || []).find(v => v.id === id);
    if (!meta) return view404();
    const course = findCourse(meta.topic);
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; <a href="#/lab" data-route>Lab</a> &nbsp;›&nbsp; ${esc(meta.title)}</div>
      <div class="page-head reveal"><div class="eyebrow" style="color:${course ? course.color : "var(--gold)"}">${course ? esc(course.title) : "Visualization"}</div><h2>${esc(meta.title)}</h2><p>${esc(meta.blurb)}</p></div>
      <div class="viz reveal" data-viz="${esc(id)}"></div>
      <div class="lesson-actions">
        ${(() => { const vl = vizLesson(id); return vl ? `<a class="btn primary" href="#/lesson/${vl.course.id}/${vl.lesson.id}" data-route>📖 Read the lesson: ${esc(vl.lesson.title)} →</a>` : ""; })()}
        ${course ? `<a class="btn ghost" href="#/course/${course.id}" data-route>All of ${esc(course.title)} →</a>` : ""}
      </div>
    </div>`;
    bindGo(); hydrateViz(app);
  }

  // ---------- glossary ----------
  function viewGlossary() {
    const g = window.GLOSSARY || [];
    const topicName = id => id === "general" ? "General" : (findCourse(id) || {}).title || id;
    const topicColor = id => id === "general" ? "var(--gold)" : (findCourse(id) || {}).color || "var(--gold)";
    function render(q) {
      q = (q || "").trim().toLowerCase();
      const items = g.filter(e => !q || e.term.toLowerCase().includes(q) || e.def.toLowerCase().includes(q) || topicName(e.topic).toLowerCase().includes(q))
        .slice().sort((a, b) => a.term.localeCompare(b.term));
      document.getElementById("gloss-list").innerHTML = items.length ? items.map(e => `
        <div class="gloss-item">
          <div class="gloss-term">${esc(e.term)} <span class="gloss-topic" style="color:${topicColor(e.topic)};border-color:${topicColor(e.topic)}">${esc(topicName(e.topic))}</span></div>
          <div class="gloss-def">${e.def}</div>
        </div>`).join("") : emptyState("🔍", "No terms match “" + esc(q) + "”.");
      typeset();
    }
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Glossary</div>
      <div class="page-head reveal"><div class="eyebrow">${g.length} key terms</div><h2>The <em>Glossary</em></h2>
      <p>Fast, plain-language definitions of the core concepts across all six subjects. Search, or skim to refresh.</p></div>
      <input class="gloss-search" id="gloss-search" placeholder="Search terms…" aria-label="Search glossary">
      <div id="gloss-list" class="gloss-grid reveal"></div>
    </div>`;
    bindGo();
    document.getElementById("gloss-search").addEventListener("input", e => render(e.target.value));
    render("");
  }

  // ---------- library (all references) ----------
  function viewLibrary() {
    const refs = window.REFERENCES || {};
    const order = C().map(c => c.id).concat(["general"]);
    const titleFor = id => id === "general" ? "General & Foundations" : (findCourse(id) || {}).title || id;
    const colorFor = id => id === "general" ? "var(--gold)" : (findCourse(id) || {}).color || "var(--gold)";
    const blocks = order.filter(id => refs[id]).map(id => `
      <div class="module reveal"><div class="module-head"><span class="mnum" style="color:${colorFor(id)}">📚</span><h3>${esc(titleFor(id))}</h3></div>
        ${refs[id].map(r => `<a class="ref-item" href="${esc(r.url)}" target="_blank" rel="noopener">
          <span class="ref-kind">${KIND[r.kind] || "🔗"}</span>
          <span class="ref-main"><span class="ref-title">${esc(r.title)}</span><span class="ref-by">${esc(r.by)}</span>${r.note ? `<span class="ref-note">${esc(r.note)}</span>` : ""}</span>
          <span class="ref-tag">${esc(r.kind)} ↗</span></a>`).join("")}
      </div>`).join("");
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Library</div>
      <div class="page-head reveal"><div class="eyebrow">Curated external resources</div><h2>The <em>Library</em></h2>
      <p>The best book, video, course, and paper for each topic — when you want to go deeper than the lessons.</p></div>
      ${blocks}
    </div>`;
    bindGo();
  }

  // ---------- cheatsheet (printable) ----------
  function viewCheatsheet(cid) {
    const c = findCourse(cid); if (!c) return view404();
    const sections = c.modules.map(m => {
      const cards = []; m.lessons.forEach(l => (l.flashcards || []).forEach(f => cards.push(f)));
      if (!cards.length) return "";
      return `<div class="cs-section"><h3>${esc(m.title)}</h3><div class="cs-grid">${cards.map(f => `<div class="cs-card"><div class="cs-front">${f.front}</div><div class="cs-back">${f.back}</div></div>`).join("")}</div></div>`;
    }).join("");
    app.innerHTML = `
    <div class="view cheatsheet">
      <div class="crumbs no-print"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; <a href="#/course/${cid}" data-route>${esc(c.title)}</a> &nbsp;›&nbsp; Cheatsheet</div>
      <div class="cs-head">
        <div><div class="eyebrow" style="color:${c.color}">${esc(c.icon)} Quick reference</div><h2 style="font-family:var(--font-disp);font-size:34px">${esc(c.title)} — Cheatsheet</h2></div>
        <button class="btn no-print" id="print-btn">🖨️ Print / Save PDF</button>
      </div>
      ${sections || emptyState("🗂️", "No flashcards to summarize yet — add some content first.")}
    </div>`;
    bindGo(); typeset();
    const pb = document.getElementById("print-btn"); if (pb) pb.addEventListener("click", () => window.print());
  }

  // ---------- placement diagnostic ----------
  function viewPlacement(cid) {
    if (!cid) {
      app.innerHTML = `
      <div class="view">
        <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Placement</div>
        <div class="page-head reveal"><div class="eyebrow">Skip what you already know</div><h2>Placement <em>Test</em></h2>
        <p>A quick diagnostic per topic — one question per concept. Concepts you answer correctly get marked as known, so the dashboard and map can point you straight to what's actually new.</p></div>
        <div class="lab-grid reveal">${C().map(c => `<a class="lab-card" href="#/placement/${c.id}" data-route style="--c:${c.color}"><h4>${esc(c.icon)} ${esc(c.title)}</h4><p>Diagnose your level across this topic.</p><span class="lab-go">Start →</span></a>`).join("")}</div>
      </div>`;
      bindGo(); return;
    }
    const c = findCourse(cid); if (!c) return view404();
    const items = [];
    c.modules.forEach(m => m.lessons.forEach(l => { if ((l.mcq || []).length) { const q = l.mcq[Math.floor(Math.random() * l.mcq.length)]; items.push({ q, lessonId: l.id, lessonTitle: l.title, courseId: c.id, color: c.color }); } }));
    if (items.length < 3) { app.innerHTML = `<div class="view"><div class="crumbs"><a href="#/" data-route>Codex</a></div>${emptyState("🎚️", "Not enough questions in this topic for a placement test yet.")}</div>`; bindGo(); return; }
    runTest(shuffle(items), c.title + " placement", { placement: true, course: c });
  }

  // ---------- code playground ----------
  function viewPlayground() {
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Playground</div>
      <div class="page-head reveal"><div class="eyebrow">Run code in your browser</div><h2>Code <em>Playground</em></h2>
      <p>Implement the ideas for real. Python runs via Pyodide (the first run downloads it — needs internet); JavaScript runs instantly. Pick an example or write your own.</p></div>
      <div class="reveal" id="pg-host"></div>
    </div>`;
    bindGo();
    if (window.Playground) { window.Playground.mount(document.getElementById("pg-host"), { lang: "python" }); Store.unlock("coder"); flushAchievements(); }
    else document.getElementById("pg-host").innerHTML = emptyState("💻", "Playground failed to load.");
  }
  function hydrateCode(root) {
    if (!window.Playground) return;
    (root || app).querySelectorAll("[data-code]").forEach(node => {
      if (node.dataset.codeDone) return; node.dataset.codeDone = "1";
      const lang = node.getAttribute("data-code") || "python", expected = node.getAttribute("data-expected"), code = node.textContent.trim();
      const host = document.createElement("div"); node.textContent = ""; node.appendChild(host);
      window.Playground.mount(host, { lang, code, expected: expected });
    });
  }

  // ---------- knowledge map (dependency graph, colored by mastery) ----------
  function directPrereqs(lid) {
    const idx = index(), node = idx[lid]; if (!node) return [];
    const res = new Set(explicitPrereqs(lid));
    const flat = flatLessons(node.course), pos = flat.findIndex(l => l.id === lid);
    if (pos > 0) res.add(flat[pos - 1].id);
    return [...res].filter(id => idx[id]);
  }
  function viewMap() {
    const courses = C();
    const N = courses.length || 1;
    const topicLessons = courses.map(c => { const ls = []; c.modules.forEach(m => m.lessons.forEach(l => ls.push(l))); return ls; });
    const maxN = Math.max(1, ...topicLessons.map(a => a.length));
    const R0 = 92, DR = 27, RAD = Math.PI / 180;
    const Rmax = R0 + (maxN - 1) * DR + 40;
    const size = 2 * (Rmax + 84), cx = size / 2, cy = size / 2;
    const baseAng = ti => (-90 + ti * (360 / N)) * RAD;     // start at top, clockwise
    const sectorHalf = (360 / N / 2 - 1.5) * RAD;
    const pos = {}, nodes = [];
    courses.forEach((c, ti) => {
      topicLessons[ti].forEach((l, j) => {
        const r = R0 + j * DR, ang = baseAng(ti) + Math.sin(j * 0.5) * 8 * RAD;
        const x = cx + r * Math.cos(ang), y = cy + r * Math.sin(ang);
        pos[l.id] = { x, y }; nodes.push({ id: l.id, c, l, x, y });
      });
    });
    // faint colored sector wedges
    let sectors = "";
    courses.forEach((c, ti) => {
      const a1 = baseAng(ti) - sectorHalf, a2 = baseAng(ti) + sectorHalf, R = Rmax + 30;
      const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
      sectors += `<path class="map-sector" d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${c.color}"></path>`;
    });
    // concentric guide rings
    let rings = "";
    for (let k = 1; k <= maxN; k += 4) rings += `<circle class="map-ring" cx="${cx}" cy="${cy}" r="${R0 + k * DR}"></circle>`;
    // edges (curve control pulled toward centre → spokes stay straight, cross-links arc through the hub)
    let edges = "";
    nodes.forEach(n => directPrereqs(n.id).forEach(pid => {
      const a = pos[pid], b = pos[n.id]; if (!a || !b) return;
      const mx = (a.x + b.x) / 2 + (cx - (a.x + b.x) / 2) * 0.3, my = (a.y + b.y) / 2 + (cy - (a.y + b.y) / 2) * 0.3;
      edges += `<path class="map-edge" data-to="${n.id}" data-from="${pid}" d="M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}"></path>`;
    }));
    // nodes (dots only; hover shows the caption)
    let circles = "", readyCount = 0;
    nodes.forEach(n => {
      const eff = Store.effectiveMastery(n.id), lvl = Store.masteryLevel(eff), done = Store.isLessonDone(n.id);
      // "ready to learn" = not done, but every prerequisite (in-course + cross-topic) is complete
      const ready = !done && learningPath(n.id).every(p => p.lesson.id === n.id || Store.isLessonDone(p.lesson.id));
      if (ready) readyCount++;
      circles += `<g class="map-node ${ready ? "ready" : ""}" data-id="${n.id}" data-go="#/lesson/${n.c.id}/${n.l.id}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})">
        ${ready ? `<circle class="map-ready-ring" r="12" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-dasharray="3 3"></circle>` : ""}
        <circle r="7" fill="${lvl.color}" stroke="${done ? "var(--ink)" : "var(--bg)"}" stroke-width="${done ? 2 : 1.5}"></circle>
        <title>${esc(n.l.title)} — ${esc(n.c.title)}${ready ? " (ready to learn)" : ""}</title>
      </g>`;
    });
    // rim labels per topic
    let labels = "";
    courses.forEach((c, ti) => {
      const r = Rmax + 50, a = baseAng(ti), lx = cx + r * Math.cos(a), ly = cy + r * Math.sin(a);
      const anchor = Math.abs(Math.cos(a)) < 0.35 ? "middle" : (Math.cos(a) > 0 ? "start" : "end");
      labels += `<text class="map-rim" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="${c.color}" text-anchor="${anchor}">${esc(c.icon)} ${esc(c.title)}</text>`;
    });
    // centre hub
    const hub = `<g><circle class="map-hub-bg" cx="${cx}" cy="${cy}" r="46"></circle>
      <text class="map-hub-t" x="${cx}" y="${cy - 2}" text-anchor="middle">ATLAS</text>
      <text class="map-hub-s" x="${cx}" y="${cy + 15}" text-anchor="middle">${nodes.length} concepts</text></g>`;
    const legend = [["Mastered", "var(--sage)"], ["Proficient", "var(--gold)"], ["Learning", "var(--violet)"], ["Seen", "var(--ink-mute)"], ["New", "var(--line)"]]
      .map(([t, c]) => `<span class="map-leg"><span class="map-dot" style="background:${c}"></span>${t}</span>`).join("")
      + `<span class="map-leg"><span class="map-dot map-dot-ready"></span>Ready to learn${readyCount ? " (" + readyCount + ")" : ""}</span>`;
    app.innerHTML = `
    <div class="view" style="max-width:none">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Knowledge Map</div>
      <div class="page-head reveal"><div class="eyebrow">${nodes.length} concepts · 6 paths radiating outward</div><h2>Knowledge <em>Constellation</em></h2>
      <p>Each subject branches out from the core — foundations near the centre, mastery toward the rim. Hover a star to trace what it depends on; click to open it.</p></div>
      <div class="map-legend reveal">${legend}<span class="map-caption" id="map-caption">Hover a concept…</span></div>
      <div class="map-scroll reveal" id="map-scroll"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="map-svg">${sectors}${rings}${edges}${hub}${circles}${labels}</svg></div>
    </div>`;
    bindGo();
    const sc = document.getElementById("map-scroll");
    setTimeout(() => { sc.scrollLeft = (size - sc.clientWidth) / 2; sc.scrollTop = (size - sc.clientHeight) / 2; }, 0);
    const svg = app.querySelector(".map-svg"), cap = document.getElementById("map-caption");
    svg.querySelectorAll(".map-node").forEach(g => {
      g.addEventListener("mouseenter", () => {
        const id = g.dataset.id, node = index()[id]; svg.classList.add("dim");
        if (node) { const eff = Store.effectiveMastery(id), lv = Store.masteryLevel(eff); cap.innerHTML = `<b style="color:${node.course.color}">${esc(node.course.title)}</b> · ${esc(node.lesson.title)} · <span style="color:${lv.color}">${lv.label}</span>`; }
        const lit = new Set([id]); let frontier = [id];
        while (frontier.length) { const cur = frontier.pop(); directPrereqs(cur).forEach(p => { if (!lit.has(p)) { lit.add(p); frontier.push(p); } }); }
        svg.querySelectorAll(".map-node").forEach(n => n.classList.toggle("lit", lit.has(n.dataset.id)));
        svg.querySelectorAll(".map-edge").forEach(e => e.classList.toggle("lit", lit.has(e.dataset.to) && lit.has(e.dataset.from)));
      });
      g.addEventListener("mouseleave", () => { svg.classList.remove("dim"); cap.textContent = "Hover a concept…"; svg.querySelectorAll(".lit").forEach(x => x.classList.remove("lit")); });
    });
  }

  // ---------- achievements ----------
  function viewAchievements() {
    const have = Store.raw.achievements;
    const grid = Store.ACHIEVEMENTS.map(a => `
      <div class="ach ${have[a.id] ? "unlocked" : ""}">
        <div class="a-ico">${a.icon}</div>
        <div><div class="a-t">${a.name}</div><div class="a-d">${a.desc}</div></div>
      </div>`).join("");
    const got = Object.keys(have).length;
    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Achievements</div>
      <div class="page-head reveal"><div class="eyebrow">${got} of ${Store.ACHIEVEMENTS.length} unlocked</div><h2>Hall of <em>Achievements</em></h2></div>
      <div class="ach-grid reveal">${grid}</div>
    </div>`;
    bindGo();
  }

  // ---------- stats ----------
  function viewStats() {
    const st = Store.stats();
    const lv = Store.levelInfo();
    const perCourse = C().map(c => {
      const p = Store.courseProgress(c.id), mm = Math.round(Store.topicMastery(c.id) * 100);
      return `<div style="margin-bottom:18px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:6px"><span style="font-family:var(--font-disp)">${esc(c.title)}</span><span style="color:var(--ink-mute)">${p.done}/${p.total} done · ${mm}% mastery</span></div>
        <div class="mini-bar" style="height:8px;max-width:none"><div class="mini-fill" style="width:${p.pct}%;background:${c.color}"></div></div>
      </div>`;
    }).join("");
    // mastery distribution
    const dist = { mastered: 0, proficient: 0, learning: 0, seen: 0, unseen: 0 };
    C().forEach(c => c.modules.forEach(m => m.lessons.forEach(l => { dist[Store.masteryLevel(Store.effectiveMastery(l.id)).key]++; })));
    const distRow = [["mastered", "var(--sage)"], ["proficient", "var(--gold)"], ["learning", "var(--violet)"], ["seen", "var(--ink-mute)"], ["unseen", "var(--line)"]]
      .map(([k, col]) => `<div class="dist-cell"><div class="dist-num" style="color:${col}">${dist[k]}</div><div class="dist-lbl">${k}</div></div>`).join("");

    app.innerHTML = `
    <div class="view">
      <div class="crumbs"><a href="#/" data-route>Codex</a> &nbsp;›&nbsp; Progress</div>
      <div class="page-head reveal"><div class="eyebrow">${lv.name} · Level ${lv.level}</div><h2>Your <em>Progress</em></h2></div>
      <div class="stat-strip reveal">
        <div class="stat" style="--c:var(--gold)"><div class="v">${lv.xp.toLocaleString()}</div><div class="k">Total XP</div></div>
        <div class="stat" style="--c:var(--sage)"><div class="v">${st.lessonsDone}/${st.totalLessons}</div><div class="k">Lessons</div></div>
        <div class="stat" style="--c:var(--rust)"><div class="v">${st.cardsReviewed}</div><div class="k">Cards reviewed</div></div>
        <div class="stat" style="--c:var(--violet)"><div class="v">${st.accuracy}%</div><div class="k">Quiz accuracy</div></div>
      </div>

      <div class="page-head reveal" style="margin:8px 0 14px"><h2 style="font-size:24px">Concept mastery</h2></div>
      <div class="dist-strip reveal">${distRow}</div>

      <div class="page-head reveal" style="margin:24px 0 14px"><h2 style="font-size:24px">Study activity</h2></div>
      <div class="reveal" id="heatmap"></div>

      <div class="page-head reveal" style="margin:24px 0 16px"><h2 style="font-size:24px">By topic</h2></div>
      <div class="reveal" style="max-width:700px">${perCourse}</div>

      <div class="page-head reveal" style="margin:24px 0 14px"><h2 style="font-size:24px">Ranks</h2></div>
      <div class="ranks reveal">${Store.LEVELS.map((L, i) => {
        const reached = lv.level >= i + 1, current = lv.level === i + 1;
        return `<div class="rank-row ${reached ? "reached" : ""} ${current ? "current" : ""}">
          <div class="rank-num">${i + 1}</div>
          <div class="rank-main"><span class="rank-name">${esc(L.name)}</span><span class="rank-xp">${L.t.toLocaleString()} XP</span></div>
          <div class="rank-state">${current ? "★ you are here" : reached ? "✓" : "🔒"}</div>
        </div>`;
      }).join("")}</div>

      <div class="page-head reveal" style="margin:24px 0 14px"><h2 style="font-size:24px">Settings</h2></div>
      <div class="settings-box reveal">
        <label class="viz-slider" style="gap:10px">Daily XP goal
          <input id="goal-input" type="number" min="10" step="10" value="${Store.raw.goalXp}" style="width:90px">
          <button class="btn" id="goal-save">Save</button>
        </label>
        <div class="viz-slider" style="gap:10px;margin-top:14px"><span class="viz-slab">Reading text size</span>
          <button class="btn ghost rs-btn" data-rs="0.9">A−</button>
          <button class="btn ghost rs-btn" data-rs="1">A</button>
          <button class="btn ghost rs-btn" data-rs="1.15">A+</button>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
          <button class="btn ghost" id="export-btn">⬇ Export progress</button>
          <button class="btn ghost" id="import-btn">⬆ Import progress</button>
          <button class="btn ghost" id="reset-btn" style="border-color:var(--rust);color:var(--rust)">Reset all</button>
        </div>
        <input type="file" id="import-file" accept="application/json" style="display:none">
      </div>
    </div>`;
    bindGo();
    app.querySelectorAll(".rs-btn").forEach(b => b.addEventListener("click", () => { localStorage.setItem("atlas.textScale", b.dataset.rs); applyTextScale(); toast("🔠", "Text size set", "Reading text scaled to " + Math.round(b.dataset.rs * 100) + "%"); }));
    document.getElementById("heatmap").appendChild(buildHeatmap());
    document.getElementById("goal-save").addEventListener("click", () => { Store.setGoal(parseInt(document.getElementById("goal-input").value, 10)); toast("🎯", "Goal updated", "Daily target set to " + Store.raw.goalXp + " XP"); });
    document.getElementById("export-btn").addEventListener("click", () => {
      const blob = new Blob([Store.exportData()], { type: "application/json" }); const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "atlas-progress.json"; a.click();
    });
    document.getElementById("import-btn").addEventListener("click", () => document.getElementById("import-file").click());
    document.getElementById("import-file").addEventListener("change", e => {
      const f = e.target.files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => { if (Store.importData(r.result)) { toast("✅", "Imported", "Progress restored."); renderChrome(); router(); } else alert("That file isn't a valid Atlas export."); };
      r.readAsText(f);
    });
    document.getElementById("reset-btn").addEventListener("click", () => {
      if (confirm("Reset ALL progress, XP, streaks and flashcard schedules? This cannot be undone.")) { Store.resetAll(); renderChrome(); router(); }
    });
  }

  // GitHub-style activity heatmap (last ~17 weeks)
  function buildHeatmap() {
    const wrap = document.createElement("div"); wrap.className = "heatmap";
    const days = 119, today = new Date(); today.setHours(0, 0, 0, 0);
    const act = Store.raw.activity || {};
    let max = 1; Object.values(act).forEach(v => { if (v > max) max = v; });
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400000);
      const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const v = act[key] || 0, lvl = v === 0 ? 0 : v < max * 0.25 ? 1 : v < max * 0.5 ? 2 : v < max * 0.8 ? 3 : 4;
      const cell = document.createElement("div"); cell.className = "hm-cell hm-" + lvl; cell.title = key + ": " + v + " XP";
      wrap.appendChild(cell);
    }
    return wrap;
  }

  function view404() {
    app.innerHTML = `<div class="view"><div class="empty"><div class="e-ico">🧭</div><h2 style="font-family:var(--font-disp)">Lost in the stacks</h2><p>That page doesn't exist. <a href="#/" data-route style="color:var(--gold)">Return to your codex</a>.</p></div></div>`;
    bindGo();
  }

  function emptyState(icon, msg) { return `<div class="empty"><div class="e-ico">${icon}</div><p>${esc(msg)}</p></div>`; }

  // ---------- navigation helpers ----------
  function bindGo() {
    app.querySelectorAll("[data-go]").forEach(el => el.addEventListener("click", () => { location.hash = el.dataset.go; }));
  }

  // ---------- command palette (⌘K) ----------
  function searchIndex() {
    const out = [];
    C().forEach(c => {
      out.push({ t: c.title, sub: "Topic", hash: "#/course/" + c.id, icon: c.icon });
      c.modules.forEach(m => m.lessons.forEach(l => out.push({ t: l.title, sub: c.title, hash: "#/lesson/" + c.id + "/" + l.id, icon: "📖" })));
    });
    (window.VIZ_CATALOG || []).forEach(v => out.push({ t: v.title, sub: "Visualization", hash: "#/lab/" + v.id, icon: "🎛️" }));
    [["Dashboard", "#/", "⌂"], ["Daily Review", "#/review", "⚡"], ["Spawn a Test", "#/test", "📝"], ["Knowledge Map", "#/map", "🗺️"], ["Code Playground", "#/playground", "💻"], ["Glossary", "#/glossary", "📔"], ["Library", "#/library", "📚"], ["Progress", "#/stats", "📊"], ["Achievements", "#/achievements", "🏆"]].forEach(([t, h, i]) => out.push({ t, sub: "Page", hash: h, icon: i }));
    (window.GLOSSARY || []).forEach(e => out.push({ t: e.term, sub: "Glossary", hash: "#/glossary", icon: "📔" }));
    Object.keys(window.REFERENCES || {}).forEach(k => (window.REFERENCES[k] || []).forEach(r => out.push({ t: r.title, sub: "Reference · " + r.by, hash: r.url, ext: true, icon: "🔖" })));
    return out;
  }
  let paletteEl = null;
  function openPalette() {
    if (paletteEl) return;
    const idx = searchIndex();
    paletteEl = document.createElement("div"); paletteEl.className = "palette-scrim";
    paletteEl.innerHTML = `<div class="palette"><input class="palette-in" placeholder="Search concepts, visualizations, pages, references…"><div class="palette-list"></div><div class="palette-foot">↑↓ navigate · ↵ open · esc close</div></div>`;
    document.body.appendChild(paletteEl);
    const inp = paletteEl.querySelector(".palette-in"), list = paletteEl.querySelector(".palette-list");
    let sel = 0, results = [];
    function render() {
      const q = inp.value.trim().toLowerCase();
      if (q) {
        const score = x => { const t = x.t.toLowerCase(); if (t === q) return 0; if (t.startsWith(q)) return 1; if (t.indexOf(q) >= 0) return 2; if ((x.sub || "").toLowerCase().indexOf(q) >= 0) return 3; return 9; };
        results = idx.map((x, i) => ({ x, s: score(x), i })).filter(o => o.s < 9).sort((a, b) => a.s - b.s || a.i - b.i).map(o => o.x).slice(0, 50);
      } else results = idx.slice(0, 50);
      if (sel >= results.length) sel = Math.max(0, results.length - 1);
      list.innerHTML = results.length ? results.map((r, i) => `<div class="palette-item ${i === sel ? "sel" : ""}" data-i="${i}"><span class="pi-ico">${r.icon}</span><span class="pi-main"><span class="pi-t">${esc(r.t)}</span><span class="pi-sub">${esc(r.sub)}</span></span>${r.ext ? '<span class="pi-ext">↗</span>' : ""}</div>`).join("") : '<div class="palette-empty">No matches</div>';
      list.querySelectorAll(".palette-item").forEach(e => e.addEventListener("click", () => go(parseInt(e.dataset.i, 10))));
    }
    function go(i) { const r = results[i]; if (!r) return; closePalette(); if (r.ext) window.open(r.hash, "_blank", "noopener"); else location.hash = r.hash; }
    function scrollSel() { const e = list.querySelector(".sel"); if (e) e.scrollIntoView({ block: "nearest" }); }
    inp.addEventListener("input", () => { sel = 0; render(); });
    inp.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); render(); scrollSel(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); scrollSel(); }
      else if (e.key === "Enter") { e.preventDefault(); go(sel); }
      else if (e.key === "Escape") { closePalette(); }
    });
    paletteEl.addEventListener("click", e => { if (e.target === paletteEl) closePalette(); });
    render(); inp.focus();
  }
  function closePalette() { if (paletteEl) { paletteEl.remove(); paletteEl = null; } }

  // ---------- router ----------
  function router() {
    if (window.VIZUtil) window.VIZUtil.stopAll(); // kill any running animation loops
    const h = (location.hash || "#/").slice(1);
    const parts = h.split("/").filter(Boolean); // e.g. ["course","linear-algebra"]
    window.scrollTo(0, 0);
    if (parts.length === 0) viewDashboard();
    else if (parts[0] === "course") viewCourse(parts[1]);
    else if (parts[0] === "lesson") viewLesson(parts[1], parts[2]);
    else if (parts[0] === "review") viewReview();
    else if (parts[0] === "test") viewTest();
    else if (parts[0] === "lab") parts[1] ? viewLabItem(parts[1]) : viewLab();
    else if (parts[0] === "map") viewMap();
    else if (parts[0] === "playground") viewPlayground();
    else if (parts[0] === "library") viewLibrary();
    else if (parts[0] === "glossary") viewGlossary();
    else if (parts[0] === "cheatsheet") viewCheatsheet(parts[1]);
    else if (parts[0] === "placement") viewPlacement(parts[1]);
    else if (parts[0] === "path") viewPath(parts[1], parts[2]);
    else if (parts[0] === "achievements") viewAchievements();
    else if (parts[0] === "stats") viewStats();
    else view404();
    renderChrome();
    closeSidebar();
  }

  // ---------- theme ----------
  function initTheme() {
    const saved = localStorage.getItem("atlas.theme") || "ink";
    document.documentElement.setAttribute("data-theme", saved);
    updateThemeLabel(saved);
    document.getElementById("theme-toggle").addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const nx = cur === "ink" ? "parchment" : "ink";
      document.documentElement.setAttribute("data-theme", nx);
      localStorage.setItem("atlas.theme", nx);
      updateThemeLabel(nx);
      renderChrome();
    });
  }
  function updateThemeLabel(t) {
    document.getElementById("theme-toggle").innerHTML = t === "ink" ? "☾ &nbsp;Ink theme" : "☀ &nbsp;Parchment theme";
  }

  // ---------- mobile sidebar ----------
  function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    const s = document.getElementById("scrim"); if (s) s.remove();
  }
  function initMobile() {
    document.getElementById("menu-btn").addEventListener("click", () => {
      const sb = document.getElementById("sidebar");
      sb.classList.add("open");
      const sc = document.createElement("div"); sc.className = "scrim"; sc.id = "scrim";
      sc.addEventListener("click", closeSidebar);
      document.body.appendChild(sc);
    });
  }

  // ---------- keyboard shortcuts for the study loop ----------
  function studyKeys(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (document.querySelector(".palette-scrim, .levelup-ov, .intro-ov")) return; // a modal owns the keys
    // flashcards: Space/Enter flips; once flipped, 1-4 grades
    const card = document.getElementById("card3d");
    if (card) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); card.click(); return; }
      if (card.classList.contains("flipped")) { const i = "1234".indexOf(e.key); if (i >= 0) { const gb = document.querySelectorAll(".grade-btn")[i]; if (gb) { e.preventDefault(); gb.click(); } } }
      return;
    }
    // MCQ choices (quiz / test / mastery drill): 1-4 or a-d to pick
    const choices = document.querySelectorAll(".choice:not(.locked)");
    if (choices.length) { let i = "1234".indexOf(e.key); if (i < 0) i = "abcd".indexOf(e.key.toLowerCase()); if (i >= 0 && i < choices.length) { e.preventDefault(); choices[i].click(); return; } }
    // Enter advances (next / submit / continue)
    if (e.key === "Enter") { const nb = document.getElementById("t-next") || document.querySelector("#md-next .btn, #next-slot .btn"); if (nb) { e.preventDefault(); nb.click(); } }
  }

  function applyTextScale() { try { document.documentElement.style.setProperty("--read-scale", localStorage.getItem("atlas.textScale") || "1"); } catch (e) {} }

  // ---------- boot ----------
  function boot() {
    Store.touchStreak();           // count today toward streak on open
    applyTextScale();
    initTheme();
    initMobile();
    window.addEventListener("hashchange", router);
    window.addEventListener("keydown", e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openPalette(); } });
    window.addEventListener("keydown", studyKeys);
    const sb = document.getElementById("search-btn"); if (sb) sb.addEventListener("click", openPalette);
    const skip = document.getElementById("skip-link"); if (skip) skip.addEventListener("click", () => { app.focus(); app.scrollIntoView(); });
    const guide = document.getElementById("guide-btn"); if (guide) guide.addEventListener("click", () => showIntro(true));
    router();
    flushAchievements();
    if (Store.freezeJustUsed()) toast("❄️", "Streak saved!", "A freeze covered the day you missed.");
    showIntro(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
