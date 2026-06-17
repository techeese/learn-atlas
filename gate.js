/* Atlas content gate — run:  node gate.js
   Validates the data layer the way the improvement loop does by hand every iteration:
   syntax loads, no duplicate lesson ids, every MCQ answer in range, flashcards well-formed,
   every embedded data-viz id is a real widget, and every prereq id (lesson.prereqs + PREREQS)
   points at a real lesson. Exits non-zero on any failure. */
const fs = require("fs");
global.window = {};
global.document = { documentElement: {}, createElement: () => ({ getContext: () => ({ scale() {} }), style: {}, addEventListener() {} }), addEventListener() {} };
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
function load(f) { new Function("window", "document", "getComputedStyle", fs.readFileSync(f, "utf8")).call(global.window, global.window, global.document, global.getComputedStyle); }

const TOPICS = ["linear-algebra", "calculus", "algorithms", "deep-learning", "reinforcement-learning", "llm", "probability-statistics"];
TOPICS.forEach(t => load("data/" + t + ".js"));
load("data/prereqs.js");
load("js/viz.js");

const C = global.window.COURSES || [];
const vizIds = new Set((global.window.VIZ_CATALOG || []).map(v => v.id));
const ids = new Set(), topicOf = {};
let lessons = 0, mcq = 0, cards = 0, hw = 0, ex = 0, errors = [];
C.forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
  lessons++; if (ids.has(l.id)) errors.push("duplicate lesson id: " + l.id); ids.add(l.id); topicOf[l.id] = c.id;
  (l.mcq || []).forEach((q, i) => { mcq++; if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.choices || []).length) errors.push("bad MCQ answer index: " + l.id + " #" + i); if (!Array.isArray(q.choices) || q.choices.length < 2) errors.push("MCQ needs ≥2 choices: " + l.id + " #" + i); });
  (l.flashcards || []).forEach((f, i) => { cards++; if (!f.front || !f.back) errors.push("flashcard missing front/back: " + l.id + " #" + i); });
  (l.homework || []).forEach(() => hw++);
  (l.examples || []).forEach(() => ex++);
  ((l.content || "").match(/data-viz="([^"]+)"/g) || []).forEach(s => { const id = s.slice(10, -1); if (!vizIds.has(id)) errors.push("unknown data-viz id '" + id + "' in " + l.id); });
})));
Object.entries(global.window.PREREQS || {}).forEach(([lid, arr]) => {
  if (!topicOf[lid]) errors.push("PREREQS lesson not found: " + lid);
  (arr || []).forEach(p => { if (!topicOf[p]) errors.push("PREREQS target not found: " + p + " (for " + lid + ")"); });
});

console.log(`GATE — ${C.length} topics · ${lessons} lessons · ${mcq} MCQs · ${cards} flashcards · ${hw} homework · ${ex} examples · ${vizIds.size} widgets`);
if (errors.length) { console.log("FAIL (" + errors.length + "):"); errors.slice(0, 30).forEach(e => console.log("  ✗ " + e)); process.exit(1); }
console.log("ALL GREEN ✓");
