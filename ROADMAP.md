# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
linear algebra, calculus, algorithms, deep learning, reinforcement learning, and LLMs.
Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the live queue:
done items move to CHANGELOG and out; new ideas land in the backlog.

## ★ OWNER DIRECTIVE (2026-06-17 — supersedes default rotation until delivered)
The owner reviewed the mature site and set the next arc. Rotate across these (biggest-value first):
1. **NEW SUBJECT: Probability & Statistics** — IN PROGRESS. ✅ iter 71: Foundations module (4 lessons +
   cards/homework/examples; Bayes viz embedded). ✅ iter 73: Common Distributions module (5 lessons). ✅ iter 74:
   CLT viz (`ps-clt`). ✅ iter 75: all 9 PS lessons now at 12 MCQs (108 topic / 1,464 site). NEXT for this topic:
   ✅ iter 76: normal-distribution explorer viz (`ps-normal-explorer`: μ/σ + empirical-rule bands + interval CDF).
   ✅ iter 77: Module 3 "Joint Distributions & Dependence" (3 lessons). ✅ iter 78: all 3 Module-3 lessons to 12
   MCQs (+36; topic now 144 / site 1,500). All 12 PS lessons now at 12 MCQs.
   ✅ iter 79: covariance/correlation scatter viz (`ps-covariance-scatter`, embedded in the covariance lesson).
   ✅ iter 82: Module 4 "Statistical Inference: Estimation & Confidence" (4 lessons). ✅ iter 83: all 4 Module-4
   lessons to 12 MCQs (+48; topic now 192 / site 1,548). All 16 PS lessons now at 12 MCQs.
   ✅ iter 84: confidence-interval coverage simulator viz (`ps-ci-coverage`). ✅ iter 85: Module 5 "Hypothesis
   Testing" (4 lessons). ✅ iter 86: all 4 Module-5 lessons to 12 MCQs (+48; topic now 240 / site 1,596). All 20 PS
   lessons now at 12 MCQs — PS is a COMPLETE 5-module course with full MCQ + cards + homework + examples coverage.
   OPTIONAL future: Module 6 — Bayesian inference (priors/posteriors/conjugacy, MAP vs MLE) would round it out.
   ⚠ ROTATION DUE: iters 71–86 were almost entirely Probability & Statistics. Directive item 2 ("deepen the existing
   six with ADVANCED lessons") has been neglected — rotate there next (e.g. an advanced LA/calc/DL/RL/LLM module).
   ⚠ Lesson-authoring workflow bug (iter 71): the VERIFY agent overwrote `content` with its review notes for
   3/4 lessons. When authoring future lessons, make the verify schema/prompt EXPLICIT: "return the corrected
   LESSON HTML in `content`; put commentary ONLY in `notes`; never write a summary into `content`." (Recovered
   via transcript extraction this time.)
2. **Deepen the existing six** — ✅✅ COMPLETE (iter 99). Every original topic now has a 7th frontier/advanced module,
   each with full content + 12 MCQs + flashcards + homework + examples (RL's Module-5 MCQs are the only deferred bit, add next).
   add ADVANCED lessons/modules (not just more of the same; go further than the
   current depth) where each topic has frontier/advanced gaps. DONE:
   ✅ iter 87: Deep Learning → new "Generative Models" module (Autoencoders/VAEs, GANs, Diffusion). ✅ iter 88: all 3
   generative lessons to 12 MCQs (+36; DL topic now 264 / site 1,632) — DL fully complete again.
   ✅ iter 90: Calculus → new "Convex & Constrained Optimization" module (convexity, GD convergence, Lagrange
   multipliers). ✅ iter 91: all 3 convex lessons to 12 MCQs (+36; calc topic now 300 / site 1,668) — Calculus fully
   complete again. ✅ iter 93: Linear Algebra → new "Matrix Calculus for ML" module. ✅ iter 94: all 3 matrix-calc
   lessons to 12 MCQs (+36; LA topic now 228 / site 1,704) — Linear Algebra fully complete again.
   ✅ iter 96: Algorithms → new "Advanced Algorithms & Analysis" module. ✅ iter 97: all 3 advanced-algo lessons to 12 MCQs
   (+36; algo topic now 276 / site 1,740) — Algorithms fully complete again.
   ✅ iter 99: Reinforcement Learning → new "Model-Based, Offline & Imitation RL" module (the LAST of the six).
   ✅ iter 100: all 3 RL frontier lessons to 12 MCQs (+36; RL topic now 240 / site 1,776). deepen-the-six is COMPLETE,
   and EVERY one of the 148 lessons now has exactly 12 MCQs.
   POST-ARC: the loop returns to the broad compass — more deeper-dives on hard concepts, UI/UX & animation polish,
   onboarding, more achievements/gamification, new functionality, and topping up any new lessons' MCQs.
   ✅ iter 101: bookmarks (★ save lessons; dashboard section). ✅ iter 102: glossary 48→75 (PS + advanced terms).
   ✅ iter 103: per-topic mastery-composition bars on the Progress page.
   ✅ iter 104: "Redeem your mistakes" deck — every wrong MCQ is logged + drillable in mastery mode (the owner's
   "think again until you pass" loop); + a 35th achievement (♻️ Redeemer).
   ✅ iter 105: `llm-bpe` BPE tokenizer trainer (29th viz) — embedded in the LLM tokenization lesson.
   ✅ iter 106: answer-feedback juice (correct pop+glow, key spring, wrong shake) on every MCQ.
   ✅ iter 107: full-text lesson search in ⌘K (body matches with highlighted snippets).
   ✅ iter 108: four new deeper-dives (eigenvectors=power-iteration, CLT=why-a-bell, attention=soft-dictionary,
   policy-gradients=train-by-trial) — directive 3.
   ✅ iter 109: five new achievements (Curator, Annotator, Flawless Five, Crack Shot, Deep Thinker) → 40 total.
   ✅ iter 110: keyboard a11y for clickable [data-go] cards (role/tabindex/Enter-Space via bindGo) — ★110 checkpoint.
   Ideas still open for this arc: onboarding refresh; flashcard flip/grade juice & route-transition polish; MORE
   deeper-dives (KKT/shadow-price, vanishing/exploding gradients, batch-norm, the kernel trick, dropout-as-ensemble);
   surfacing missed-deck stats on the Progress page; mastery-weighted/recency ranking in ⌘K (title tier is still
   purely lexical); a "Daily Ritual" achievement once Daily-Mix completions are tracked.
   ✅ iter 111: worked examples for the 5 remaining LA lessons (diagonalization/spectral/SVD/PCA/four-subspaces) →
   examples coverage now 148/148 (298 total), all math numerically verified.
   ✅ iter 112: Learning-Rate Schedule explorer (dl-lr-schedules, 30th viz) — constant/step/exp/cosine/linear + warmup.
   ✅ iter 113: Notebook (#/notes) — gathers all per-lesson notes into one reviewable page (new functionality).
   ✅ iter 114: onboarding refresh — intro tour counts now computed live (fixed stale "122 lessons" → 148), modernized
   copy, fixed an Escape-listener leak on tour replay.
   ✅ iter 115: +3 deeper-dives (vanishing/exploding gradients = exponential product; BatchNorm = covariate-shift vs.
   smoother-landscape; KKT = complementary slackness) → 9 deeper-dives site-wide (directive 3).
   ✅ iter 116: Knowledge-Map keyboard navigation (roving tabindex + arrows + Enter, ARIA labels, gold focus ring) —
   closes the last mouse-only surface. The whole UI is now keyboard-operable.
   ✅ iter 117: Q-Learning Gridworld (rl-q-learning, 31st viz) — an agent that learns a policy from experience
   (ε-greedy + off-policy TD), embedded in the SARSA/Q-Learning lesson.
   ✅ iter 118: "Activity" panel on the Progress page — 12 lifetime-stat tiles (questions, perfect quizzes, mistakes
   redeemed/outstanding, notes, bookmarks, achievements, streak…), 3 actionable; surfaces existing tracked state.
   ✅ iter 119: ★ STARTED the 12→16 MCQ-growth arc (owner's #1 ask). Phase 1: Algorithms·Foundations (3 lessons)
   12→16 (+12, bank 1,776→1,788), adversarially verified, answer positions shuffled.
   → ARC QUEUE (one module/topic per content iteration, interleave with compass): finish Algorithms (6 more modules),
   then LA / Calc / DL / RL / LLM / PS. Reusable approach: author 4/lesson avoiding existing stems → adversarial-verify
   Agent (ALL must PASS) → shuffle correct-choice positions → node injector (load course, push, rewrite JSON) → gate →
   quiz renders "of 16". Keep `String.raw`/double-backslash LaTeX discipline; bump bank count in README + CHANGELOG.
   ✅ iter 120: per-achievement progress bars (gold fill + cur/target) on locked threshold achievements, ≥80% "near"
   highlight — ★120 checkpoint. Thin areas now: animations/juice (since 106), a fresh viz (MDP policy-iteration, VAE).
   ✅ iter 121: MCQ arc phase 2 — Algorithms·Core Data Structures 12→16 (+12, bank →1,800). Algorithms 2/7 modules done.
   ✅ iter 122: flashcard grade juice — graded card flies out in its grade colour (rust/gold/sage), reduced-motion safe.
   (animations/juice was the thin area since 106; now refreshed.)
   ARC PROGRESS: Algorithms modules at 16 = foundations, data-structures. REMAINING in Algorithms: sorting-searching,
   algorithm-design, graphs, advanced-ml-connections, advanced-techniques (5). Then LA/Calc/DL/RL/LLM/PS. Interleave!
   CHECKED & FOUND HEALTHY (113): mobile renders clean across dashboard/map/lab/stats/test at 390px; `index()` is
   already memoized; staggered page-entrance already exists (CSS :nth-child reveal delays). So perf/mobile/transitions
   have little headroom. NEGLECTED areas still worth a pass: onboarding refresh, SVG Knowledge-Map keyboard nav
   (roving-tabindex/arrow-keys, deferred from 110), workflow/dev-flow, and MORE deeper-dives (directive 3 backlog).
   MORE VIZ IDEAS still open (backlog below): MDP policy-iteration, a learning-rate-schedule plot, a VAE latent-space
   explorer, a GAN training-dynamics demo, a Q-learning/SARSA path demo.
   (former note) RL → model-based or offline RL (the LAST of the six; LLMs are already very deep). Then deepen-the-six is COMPLETE
   and the loop returns to the broad compass / more deeper-dives / new functionality.
   Author with `String.raw` + single-backslash LaTeX; the
   per-topic data file uses its OWN header comment — preserve it. NOTE: name the module variable anything but `module`
   (reserved in CommonJS), and run generators from the learn-atlas dir (relative `data/...` paths).
3. **Hard-concept support** — for concepts that are hard to understand, add an EXTRA place/way to explain
   (e.g. a deeper-dive / "intuition" expandable, an alternative explanation), and SPLIT or MERGE lessons where
   that makes a concept land better. ✅ iter 95: built the reusable `<details class="deep-dive"><summary>Deeper dive: …</summary>…</details>`
   component (native, accessible, collapsed by default, print-opens; KaTeX works inside). Seeded on Bayes (natural
   frequencies) + the VAE reparameterization trick (pathwise derivative). ✅ iter 108: +4 — eigenvectors
   (power-iteration/long-run), CLT "why a bell" (convolution attractor + max-entropy), attention (soft differentiable
   dictionary), policy-gradients (train-by-trial + baseline=grading-curve). Site now has 6 deeper-dives. NEXT: keep
   sprinkling on hard concepts — ✅ iter 115 did vanishing/exploding gradients, BatchNorm (two stories), and KKT
   complementary slackness. Remaining candidates: the kernel trick (needs an SVM host — none yet), convexity
   (local=global), backprop = chain-rule + memoization, condition number / why GD zig-zags, softmax temperature.
   One or two per content iteration, with a genuinely DIFFERENT angle (not a restatement). Consider SPLIT/MERGE too.
4. **New learning functionality** is welcome too.
Verification: owner chose KEEP FULL verification (screenshot every view desktop+mobile + DOM-dump errs=0) —
but ALWAYS `pkill -f "Google Chrome.*--headless"` after each run so zombie Chrome can't accumulate (87 had
piled up by iter 70; cleaned). Wrap chrome in `timeout` too.

## Now (highest priority)
- **QUESTION BANK — phase 1 DONE (iters 7–9): all 6 topics at ~8 MCQs/lesson, bank 452 → 897.** Mastery mode
  (iter 6) recycles misses until passed. Standing low-priority job: keep topping up weak/thin lessons toward
  ~10/lesson over time, but this is no longer the lead — INTERLEAVE it with the rest of the compass now.
- **NOW INTERLEAVE (bank goal met):** rotate the compass each iteration — don't repeat an area twice running.
  - New visualizations for concepts that lack one: PCA/eigenbasis, convolution, MDP policy iteration, Bayes,
    RNN unrolling. (DONE: neural-net forward pass, attention heatmap, + the original 10.)
  - UI/animation polish & juice (confetti on level-up, XP-gain float, smoother transitions).
  - Onboarding/first-visit tour, better empty states, a hover-glossary of key terms.
  - (DONE iter 11: accessibility — reduced-motion, focus-visible, ARIA, skip link, live-region toasts.)

## Perf notes (iter 58)
First-load path optimized: all 13 data/logic scripts are `defer` (parallel fetch, ordered exec); fonts load
via a `<link>` (not a chained `@import`); `preconnect` to jsdelivr + Google Fonts. Remaining lever if load
ever feels heavy: the 6 topic data files total ~3.5 MB and are parsed eagerly — Pages already gzips them
(whitespace ≈ free on the wire), so the real cost is parse/execute. Lazy-loading per-topic content is the
big swing but RISKY (search/map/allQuestions/dailyConcept iterate `window.COURSES`); only attempt with a
shared "topics index" (id/title/blurb/color) loaded first + full lessons on demand. Not worth it yet.

## Improvement compass — rotate; broken always wins; biggest value first
1. **Content details** — depth, accuracy, missing sub-topics, new lessons/modules, worked examples.
2. **UI / UX** — layout, typography, spacing, color, polish, delight.
3. **Workflow / dev-flow** — tooling, the loop itself, gates, content pipelines.
4. **Visualizations** — new interactive widgets (`js/viz.js`), improve existing ones.
5. **Animations / juice** — motion, micro-interactions, transitions, fanfare.
6. **New functionality** — a new pillar or feature that raises the bar.
7. **Examples** — concrete, worked examples wherever a concept needs one.
8. **Understandability** — clearer explanations, onboarding, empty states, tooltips, glossary.
9. **Accessibility** — keyboard nav, ARIA, focus states, contrast, reduced-motion.
10. **Performance** — load time, render cost, lazy-loading.
11. **Mobile (390px)** — a release gate, not an afterthought.
12. **Gamification** — depth and motivation (without cheapening learning).

## Backlog (ideas — mine these; add as you discover more)
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred for now]
- ~~Glossary with hover-definitions of key terms across lessons.~~ **DONE iter 57** (inline `.gloss` tooltips in lecture prose).
- ~~"Explain it back" — free-text recall with self-grading (Feynman technique).~~ **DONE iter 53** (Recall tab; self-graded against the lesson's flashcards, feeds mastery + XP). Future: optional AI grading when the tutor lands.
- Per-concept difficulty rating + adaptive question selection in tests.
- ~~Interleaved review sessions (mix topics) beyond the SRS queue.~~ **partly DONE iter 68** — Daily Mix (`#/session`) chains due cards + a weak-spot quiz + a next lesson into one guided flow.
- More viz ideas (29 widgets now; CLT iter 74, normal-explorer iter 76, covariance-scatter iter 79, CI-coverage
  iter 84, diffusion noising iter 89, convex-landscape/GD-trap iter 92, hypothesis-test/p-value iter 98, BPE-merge
  trainer iter 105, LR-schedule explorer iter 112, Q-learning gridworld iter 117): MDP policy-iteration, a VAE
  latent-space explorer, a GAN training-dynamics demo, a beam-search/decoding tree.
  NOTE: viz blurbs AND notes are NOT KaTeX-typeset (the Lab shows them raw) — use plain unicode (xₜ, √, ε, ᾱ), not $...$.
- Lesson-embedded code exercises (`data-code` with `data-expected`) tied to each algorithm/DL lesson.
- Reduced-motion + high-contrast accessibility modes.
- ~~Search ranking improvements (fuzzy, recency, mastery-weighted) in ⌘K.~~ **fuzzy DONE iter 70** (typo-tolerant subsequence tier). Recency/mastery-weighting still open.
- Onboarding tour for first visit; better empty states everywhere.
- Audio: optional ambient focus soundscape (generative WebAudio, mute by default).
- Print/PDF a full lesson (not just cheatsheets).

## Cadence / anti-monotony (binding)
- Don't pick the **same compass area two iterations running** unless it's broken or owner-asked.
- Prefer the **biggest-value** move; a bold swing (new pillar, overhaul) beats a tidy tweak when warranted.
- **Broken always wins**: a real bug / console error / broken render preempts everything.

## Owner priority — question-bank growth sweep ✅ COMPLETE (iters 60–65)
Owner's most-repeated ask: "more and more and more questions … think again until I pass." Grew every lesson to
12 MCQs via author→adversarial-verify (verification was CRITICAL — a wrong answer key teaches the wrong thing;
the verify pass caught self-contradictory stems, ambiguous/duplicate correct choices, wrong keys, bad KaTeX).
DONE: LA (60, +64), Calculus (61, +88), Algorithms (62, +80), Deep Learning (63, +76), RL (64, +75, target-12
so thin lessons topped up), LLMs (65, +76). **Final: every one of the 113 lessons at exactly 12 MCQs; 1,356
site-wide (was 897).** Reusable tooling if more are ever needed: `/tmp/gen_mcq_target_wf.js <topicId> <noun>
<target>` → `Workflow` → `/tmp/inject_mcq.js <topicId> <out>` (appends + validates) → gate → quiz check.
→ **Both owner content sweeps are now COMPLETE** (examples 47–52, questions 60–65). Loop returns to the broader
compass (UI/viz/animations/gamification/understandability/accessibility/perf), rotating per anti-monotony.

## Owner priority — worked examples sweep ✅ COMPLETE (iters 47–52)
"Examples when we need it." Added 2 verified worked examples to every lesson that warranted them, all six
topics, via the author→adversarial-verify workflow. DONE: Linear Algebra (47), Calculus (48), Algorithms (49),
Deep Learning (50), Reinforcement Learning (51), LLMs (52). **Then iter 111 filled the last 5 computational LA gaps
(diagonalization/spectral/SVD/PCA/four-subspaces) the original sweep had skipped — examples coverage is now 148/148,
298 total.** (Lesson note: the iter-47 "purely conceptual, correctly skipped" call was wrong for SVD/eigen lessons —
those are prime worked-example material; iter 111 corrected it with numerically-verified examples.)
→ **The loop now rotates back to the broader compass** — UI/UX, visualizations, animations, new functionality,
and gamification have been quiet since iter 46. Pick the biggest-value non-content move next (and honor
anti-monotony: content/examples ran 6 iterations straight under the owner-ask exemption).
Reusable pipeline if more content is ever needed: `/tmp/gen_examples_wf.js <topicId> <noun>` →
`Workflow({scriptPath})` → `/tmp/inject_examples.js <topicId> <outputFile>` → gate → all-routes → 390px.
Re-running the generator after a partial inject re-bakes ONLY the still-missing lessons (good for retries).
**Landmines from the sweep:** (1) matrix/token-heavy lessons (DL RNN+attention, LLM multi-head) STALL the
workflow author agent on all 6 retries (~3h wasted) — author those DIRECTLY with a `String.raw` node script
+ one verify Agent. (2) The generator's verify prompt said "no raw HTML", so some authors emitted markdown
`**bold**` which does NOT render (Examples tab uses innerHTML; KaTeX ignores `**`) — fixed 219 spans in
iter 52. If the pipeline is reused, make the author/verify prompts mandate `<strong>`/`<em>`, never markdown.

## Notes / discoveries
- **Architecture review (iter 36):** layer discipline is clean — content in `data/*.js`, visualizations in
  `js/viz.js` (818 ln, cohesive registry of 18 widgets), playground in `js/playground.js`, state + SM-2 +
  mastery in `js/store.js` (374 ln), all app/router/views in `js/app.js` (1381 ln), styles in `css/styles.css`.
  `js/app.js` is the only large file; it's ONE IIFE whose ~40 view/helper functions share closure vars
  (`app`, `esc`, `C`, `index`, `bindGo`, `typeset`, `flushAchievements`, …), so a split needs a shared-context
  object — high-coupling, partially unverifiable (render behavior), low immediate value. **Verdict: healthy;
  no clean+safe+worthwhile extraction now. Defer the shared-context split until app.js becomes painful** (the
  overlay layer — confetti/levelup/intro/palette/studyKeys — is the cleanest future leaf). `node gate.js`
  guards the data layer.
- **LaTeX-authoring convention (iter 77):** new lessons can be authored with a node generator that loads the
  existing course, builds lesson objects with `String.raw` + SINGLE-backslash LaTeX (`\frac`, `\operatorname`),
  pushes the new module, and rewrites the file as `header + "(window.COURSES...).push(\n" + JSON.stringify(course,
  null,2) + "\n);\n"`. KaTeX renders this correctly (verified katex-error=0 + visual). NOTE: the iter-71/73 lessons
  happen to carry DOUBLE backslashes in-memory and ALSO render fine — KaTeX is robust to both here — so don't be
  alarmed by the mismatch; single-backslash is the cleaner standard. Generator pattern saved at
  `/tmp/gen_ps_module3.js` (back up the data file first: `cp data/probability-statistics.js /tmp/ps_backup.js`).
- **10-iter checkpoint (iter 80):** iters 71–79 were almost all *content* (PS topic + MCQ sweeps) and *viz*
  (CLT, normal-explorer, covariance-scatter). NEGLECTED and due for rotation: **UI/UX polish, animations/juice,
  accessibility, performance, onboarding.** Gamification was addressed iter 80 (9 new achievements, 25→34; owner's
  "more achievements" ask now DELIVERED). Next non-content/non-viz pick should come from the neglected list above
  before the loop returns to PS Module 4. Achievements are awarded from existing state only (no new save fields) —
  if you add one needing new tracking, update blank() + load() merge with Number.isFinite.
  · iter 81 addressed ACCESSIBILITY (lesson tabs → ARIA tablist with keyboard nav). STILL neglected: UI/UX polish,
  animations/juice, onboarding, performance. A11y follow-ups if auditing more div-as-control patterns: check
  `.grade-btn`, modal close buttons, and the Knowledge-Map nodes (lesson tabs were the most-used, done first).
- (loop appends findings here)
