# Atlas — Changelog

Prepend new entries under this header. Include the loop-iteration number in the heading.

## iter 7 — Question bank expansion: Linear Algebra doubled to 128 MCQs (content / owner ask)
Owner wants an ever-growing bank so retries can't be memorized. Authored + adversarially verified (32-agent
workflow, every answer-index re-derived) 4 NEW MCQs per Linear Algebra lesson — 64 added across 16 lessons,
taking LA from 64 → 128 MCQs (8 per lesson) and the whole bank from 452 → 516. New questions are
non-duplicate, mix computational + conceptual, with misconception distractors. Verified: 0 bad indices,
0 dupes, all routes errs=0. (Loop will rotate to the next topic each pass.)

## iter 6 — Mastery mode: wrong answers re-queue until you pass (gamification / new functionality)
OWNER ASK — "think again until I pass, not casual remembering." The Spawn-a-Test page now has a default-on
**Mastery mode**: every question you miss goes to the back of the queue and keeps coming back until you
answer it correctly; the drill only finishes when ALL are mastered. Immediate feedback + explanation +
a "review the lesson" link on each miss, a live mastered-progress track, and a first-try-accuracy summary.
Each answer feeds the mastery model (wrong lowers it, so weak concepts resurface). Verified end-to-end:
errs=0, a drive that missed most first-tries re-queued and drained to ✓5/5 over 9 attempts.

## iter 5 — Runnable code exercises embedded in algorithm & DL lessons (examples / new functionality)
Added in-lesson `<div data-code>` exercises (Pyodide Python) with `data-expected` self-check badges: bubble
sort, binary search, and DP-Fibonacci in the algorithms lessons; a one-neuron forward pass and a numerical-
gradient (backprop building block) in the DL lessons. Code is HTML-escaped in storage so `<`/`>` survive
innerHTML and decode back to runnable source. Expected outputs verified against real python3. Verified:
syntax green, all routes errs=0, the embedded playground hydrates and the code decodes correctly.

## iter 4 — Interactive visualizations embedded inline in the lessons they illustrate (understandability)
Wired the 10 Lab widgets into 13 lessons across all 6 topics via `<div data-viz>` — e.g. the vector-add
widget now sits inside "Vectors and Vector Operations", the matrix-transform widget in "Matrices as Linear
Transformations" and "Determinants", gradient-descent in "Optimization" and the DL "Optimizers" lesson,
the gridworld in "Value Iteration", embeddings in the DL and LLM embedding lessons. Re-serialized each
per-topic data file (content preserved; idempotent). Verified: syntax green, all routes errs=0, the inline
canvas hydrates, math intact, legible at 390px. Now learners manipulate a concept right where they read it.

## iter 3 — Knowledge Map redesigned as a radial Constellation (UI / visualization)
Owner ask: make the map game-like. Replaced the 6-column layout with a radial skill-tree — a central glowing
ATLAS hub, the 6 subjects as colored sectors radiating outward (foundations near the core, advanced concepts
toward the rim), cross-topic prerequisites arcing through the middle, concentric guide rings, and rim labels.
Hovering a star lights its full dependency chain plus a caption; click opens it. Verified errs=0, 113 nodes, 6 sectors.

## iter 2 — Cross-topic prerequisite graph connects the 6 topics (content details / understandability)
Added data/prereqs.js (window.PREREQS): 40 hand-verified cross-topic edges (e.g. backprop → chain-rule +
matrix-multiplication; self-attention → attention-mechanism + dot-product; RLHF → policy-gradients + PPO;
LoRA → low-rank/PCA). app.js learningPath/directPrereqs now merge these with in-course ordering, so the
Knowledge Map links its columns (147 edges) and a path like "Self-Attention" traverses Linear Algebra →
Deep Learning → LLM from the beginning. All ids validated cross-topic; 9 routes errs=0.

## iter 1 — Comprehensive content integrated: 113 lessons across 6 topics (content details)
Replaced the 15-lesson seed with the workflow-generated, adversarially fact-checked curriculum:
**6 topics · 113 lessons · 452 MCQs · 678 flashcards · 337 homework problems** (212 verifier fixes applied).
Split content into per-topic data files (data/<topic>.js, push to window.COURSES); removed data/courses.js;
wired index.html script tags + sw.js ASSETS and bumped CACHE atlas-v1->v2. Verified: 25 routes errs=0,
lessons render with KaTeX math, Knowledge Map populated with all 113 concepts, 0 bad MCQ answer-indices,
0 duplicate lesson ids.


## iter 0 — Foundation (hand-built before the loop)
The base platform: a static, gamified, GitHub-Pages-ready personal learning site for 6 topics
(linear algebra, calculus, algorithms, deep learning, reinforcement learning, LLMs).

- **Core**: data-driven courses (`data/courses.js`), hash-router SPA (`js/app.js`), localStorage
  state with NaN-safe migrations (`js/store.js`), KaTeX math, "Ink"/"Parchment" themes.
- **Learning modes**: lectures, Examples tab, MCQ quizzes, SM-2 flashcards + global Daily Review, homework.
- **Mastery model**: decaying per-concept score → weak-spots, mastery distribution, map colors.
- **Knowledge Map**: SVG dependency graph of all concepts, colored by mastery, prereq edges.
- **Code Playground** (`js/playground.js`): Pyodide Python + JS, embeddable via `<div data-code>`.
- **Visualization Lab** (`js/viz.js`): 10 interactive canvas widgets, embeddable via `<div data-viz>`.
- **Spawn-a-Test**: custom exam from the question bank (scopes: mastered / weak / topic / all).
- **Learning paths**: prerequisite closure + in-course ordering.
- **Placement diagnostic**: marks known concepts, recommends a starting point.
- **Cheatsheets**: printable per-topic quick reference.
- **Concept of the Day**, **⌘K command palette**, per-lesson **notes**, **daily goal + activity heatmap +
  streak freezes**, **export/import progress**, **Library** of curated references, **PWA/offline**.
- Gamification: XP, 10 levels (Novice→Polymath), streak, 16 achievements.
- Verified: all routes render with 0 runtime errors in headless Chrome.

Seed content only (6 courses, 15 lessons) — the comprehensive-content workflow output is pending integration (see ROADMAP "Now").
