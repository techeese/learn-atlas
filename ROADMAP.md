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
   ✅ iter 123: MCQ arc phase 3 — Algorithms·Sorting & Searching 12→16 (+12, bank →1,812). Algorithms 3/7 modules done.
   REMAINING in Algorithms: algorithm-design, graphs, advanced-ml-connections, advanced-techniques (4). Then 6 topics.
   VERIFY NOTE: the adversarial agent's prose sometimes mis-numbers indices — always dump the actual last-N MCQs +
   keys to confirm before commit (the substance verdicts have been reliable).
   ✅ iter 124: Beam Search decoding tree (llm-beam-search, 32nd viz) — embedded in the LLM decoding lesson.
   Viz backlog remaining: MDP policy-iteration (risk: 3rd gridworld), VAE latent-space, GAN training-dynamics.
   ✅ iter 125: MCQ arc phase 4 — Algorithms·Algorithm Design (4 lessons) 12→16 (+16, bank →1,828). Algorithms 4/7.
   REMAINING in Algorithms: graphs (3), advanced-ml-connections (4), advanced-techniques (3). Then 6 topics.
   ✅ iter 126: Daily Mix now includes a "Redeem" phase (drills the mistakes deck) — closes the daily loop
   (remember → test → fix → grow). runMasteryDrill gained opts.onDone for chaining.
   ✅ iter 127: MCQ arc phase 5 — Algorithms·Graph Algorithms 12→16 (+12, bank →1,840). Algorithms 5/7 modules.
   REMAINING in Algorithms: advanced-ml-connections (4), advanced-techniques (3). Then LA/Calc/DL/RL/LLM/PS.
   ✅ iter 128: hardened gate.js (dup/empty-choice + empty-stem FAILURES, dup-stem + position-bias diagnostics).
   ⚠ NEW DEBT SURFACED: ~22 lessons (>70%) have correct-answer-position bias (original authoring fixed the index).
   NOT auto-fixable by shuffle — many explanations cite positions ("option A", "choice (a)"). FUTURE: de-skew
   lesson-by-lesson, rewriting any position-referencing explanations (careful, per-MCQ; pair with an adversarial check).
   The 12→16 arc's NEW MCQs are already shuffled, so this is purely original-content debt.
   ✅ iter 129: MCQ arc phase 6 — Algorithms·Complexity/Strings/ML (4 lessons) 12→16 (+16, bank →1,856). Algorithms 6/7.
   REMAINING in Algorithms: advanced-techniques (3 lessons) — then Algorithms fully at 16; move to LA/Calc/DL/RL/LLM/PS.
   (Each shuffled batch also de-biases its lessons: the gate's position-bias note is ticking down, 22→21 so far.)
   ✅ iter 130: Cross-Entropy Loss & Perplexity viz (dl-cross-entropy, 33rd) in the DL loss lesson — ★130 checkpoint.
   ✅ iter 131: MCQ arc phase 7 — Algorithms·Advanced Techniques 12→16 (+12, bank →1,868). ★ ALGORITHMS FULLY AT 16
   (all 23 lessons, 7/7 modules) — first topic complete. NEXT TOPICS for the arc (interleave one module per content
   iteration): Linear Algebra, Calculus, Deep Learning, RL, LLMs, Prob & Stats. (Authoring tip that worked: 4 NEW
   foundational MCQs/lesson avoiding existing stems, adversarial-verify agent + key-dump, shuffle positions, gate.)
   ✅ iter 132: keyboard-shortcuts help overlay (press ? / sidebar ⌨ Shortcuts) — understandability/a11y discoverability.
   ✅ iter 133: MCQ arc topic 2 — Linear Algebra·Foundations 12→16 (+16, bank →1,884). LA 1/7 modules.
   ✅ iter 134: dashboard "closest achievement" nudge (gamification) — gold card surfacing the nearest locked
   achievement (icon/name/cur·target/desc/bar), links to #/achievements; only shows once you've started toward one.
   Refactored `achProgressMap()` out of `viewAchievements` + added `nearestAchievement()`. SW cache →v77.
   ✅ iter 135: MCQ arc → Linear Algebra·Matrices 12→16 (+12, bank →1,896). LA 2/7 modules (foundations, matrices).
   Adversarial agent ALL PASS; positions shuffled; render-check "of 16" errs=0; SW cache →v78.
   ✅ iter 136: Optimizer Race viz (dl-optimizers, 34th) — SGD/Momentum/RMSProp/Adam race on an ill-conditioned valley;
   embedded in the DL optimizers lesson (replaced the weak 1-D calc-gradient-descent embed). Math pre-tuned in Node;
   errs=0; SW cache →v79. VIZ BACKLOG remaining: MDP policy-iteration (3rd gridworld — lower priority), VAE latent-space,
   GAN training-dynamics.
   ✅ iter 137: MCQ arc → Linear Algebra·Structure 12→16 (+8, bank →1,904). LA 3/7 modules (foundations, matrices, structure).
   Adversarial agent ALL PASS; positions shuffled; render-check "of 16" errs=0; SW cache →v80.
   ✅ iter 138: deeper-dive (directive 3) — cross-entropy = entropy + KL divergence, in dl-loss-functions (the lesson had
   MLE but no KL). → 10 deeper-dives site-wide. Identity checked numerically; render errs=0/24 katex/kErr 0; SW cache →v81.
   DEEPER-DIVE BACKLOG remaining: the kernel trick (needs a home lesson), dropout-as-ensemble (ALREADY covered in-line),
   double-descent (already a paragraph in dl-overfitting — could expand), log-sum-exp stability, the curse of dimensionality.
   ✅ iter 139: MCQ arc → Linear Algebra·Eigen 12→16 (+12, bank →1,916). LA 4/7 modules (foundations, matrices, structure, eigen).
   Adversarial agent ALL PASS; positions shuffled; render-check "of 16" errs=0; SW cache →v82.
   ✅ iter 140 (★checkpoint): animated daily-goal ring sweep on the dashboard (animations; neglected since 122). @property --p
   + transition; sweeps 0→goal% with the count-up; reduced-motion safe; errs=0; SW cache →v83. STILL-THIN compass areas to
   rotate next: workflow (since 126), new functionality (since 113), UI/UX, mobile audit.
   ✅ iter 141: MCQ arc → Linear Algebra·Orthogonality 12→16 (+8, bank →1,924). LA 5/7 modules. Adversarial agent ALL PASS;
   positions shuffled; render-check "of 16" errs=0; SW cache →v84.
   ✅ iter 142: ⌘K is now a true command palette (workflow; neglected since 126) — curated empty state (Resume + quick actions)
   + runnable commands (toggle theme, cycle text size, restart tour); errs=0; SW cache →v85. Backlog idea still open:
   mastery/recency-weighted ⌘K ranking (title tier is still purely lexical). Still-thin: new functionality (since 113), UI/UX, mobile audit.
   ✅ iter 143: MCQ arc → Linear Algebra·SVD & Applications 12→16 (+8, bank →1,932). LA 6/7 modules. Adversarial agent ALL PASS;
   positions shuffled; render-check "of 16" errs=0; SW cache →v86.
   ✅ iter 144: auto "On this page" TOC for every lesson (new functionality/UX; neglected since 113). buildLessonTOC: collapsible
   numbered section list (2-col→1-col mobile), smooth-scroll, reduced-motion safe; errs=0; SW cache →v87. Still-thin: mobile audit, UI/UX.
   ✅ iter 145: MCQ arc → Linear Algebra·Matrix Calculus 12→16 (+12, bank →1,944). ★ LINEAR ALGEBRA COMPLETE — all 19 LA
   lessons at 16 (2nd topic done, after Algorithms). Adversarial agent ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v88.
   ARC NEXT TOPICS (one module per content iteration, interleave with compass): Calculus, Deep Learning, RL, LLMs, Prob & Stats.
   (Position-bias note now 17 lessons, ticking down as each shuffled batch de-skews.)
   ✅ iter 146: mobile audit (7 high-risk views at 390px — all clean, no breakage) + 3 new achievements → 43 (Daily Ritual =
   finish a Daily Mix, Creature of Habit = 14 distinct study days, Sage = 25k XP). errs=0; SW cache →v89; README 40→43.
   Still-thin: UI/UX polish. Achievement ideas still open: Lab Explorer (open N distinct viz — needs distinct-viz tracking).
   ✅ iter 147: MCQ arc → Calculus·Foundations 12→16 (+16, bank →1,960). 3rd TOPIC OPENED. Calc 1/7 modules. Adversarial agent
   ALL PASS (hardened one ambiguous continuity distractor → f'(a)); positions shuffled; render "of 16" errs=0; SW cache →v90.
   ✅ iter 149: MCQ arc → Calculus·The Derivative 12→16 (+16, bank →1,976). Calc 2/7 modules. Adversarial agent ALL PASS;
   positions shuffled; render "of 16" errs=0; SW cache →v92.
   ✅ iter 150 (★150): scroll-spy for the lesson TOC (UI/UX) — highlights the current section as you scroll (IntersectionObserver,
   disconnected/rebuilt per render). errs=0; SW cache →v93. NOTE for future: headless --dump-dom does NOT drive programmatic
   scrolling (body{overflow-y:auto} scroll box), so scroll-DRIVEN behavior can only be verified by on-load state + graceful-
   degradation reasoning, not end-to-end. ★150 reflection logged in CHANGELOG (loop healthy; arc steady; compass well-rotated).
   ✅ iter 151: MCQ arc → Calculus·Applications of the Derivative 12→16 (+16, bank →1,992). Calc 3/7 modules. Adversarial
   agent ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v94.
   CALC REMAINING (MCQ arc): integration(4), applications-integration(3), multivariable-bridge(3), convex-optimization(3).
   Then DL/RL/LLM/PS. (Bank approaching 2,000 MCQs.)
   ✅ iter 152: Taylor Polynomial approximator viz (calc-taylor, 36th) in the linearization lesson — degree-n polynomial
   hugging sin/cos/eˣ; degree 1 = the linearization. Numerics pre-verified; errs=0; SW cache →v95; README 35→36.
   VIZ BACKLOG remaining: MDP policy-iteration (3rd gridworld — low priority), VAE latent-space, GAN training-dynamics.
   ✅ iter 153: MCQ arc → Calculus·Integration 12→16 (+16, bank →2,008). ★ BANK CROSSED 2,000 MCQs. Calc 4/7 modules.
   Adversarial agent ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v96.
   CALC REMAINING (MCQ arc): applications-integration(3), multivariable-bridge(3), convex-optimization(3). Then DL/RL/LLM/PS.
   ✅ iter 154: Hall of Achievements grouped into 7 themed categories (gamification/UI-UX) — each with a header + unlocked
   count; safety "More" bucket for future uncategorized ones. errs=0; 43 cards across 7 cats; SW cache →v97. Still-thin: animations (since 140).
   ✅ iter 155: MCQ arc → Calculus·Applications of Integration 12→16 (+12, bank →2,020). Calc 5/7 modules. Adversarial agent
   ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v98.
   ✅ iter 157: MCQ arc → Calculus·Bridge to Multivariable 12→16 (+12, bank →2,032). Calc 6/7 modules. Adversarial agent
   ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v100.
   ✅ iter 159: MCQ arc → Calculus·Convex & Constrained Optimization 12→16 (+12, bank →2,044). ★ CALCULUS COMPLETE — all 25
   Calc lessons at 16 (3rd topic done, after Algorithms & LA). Adversarial agent ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v102.
   ARC NEXT TOPICS (one module per content iteration, interleave with compass): Deep Learning, Reinforcement Learning, LLMs, Prob & Stats.
   ✅ iter 161: MCQ arc → Deep Learning·Foundations 12→16 (+12, bank →2,056). 4th TOPIC OPENED. DL 1/7 modules. Adversarial
   agent ALL PASS; positions shuffled; render "of 16" errs=0; SW cache →v104.
   ✅ iter 368: **Transformer-block schematic — 81st widget** (visualizations). l-transformer-block had no viz. New
   `llm-transformer-block`: residual stream through Multi-Head Attention + Feed-Forward (each Add & Norm), gold residual skips,
   toggle highlighting attention=communicate / FFN=compute. app.js fallback 80→81. Verified: gate GREEN (81 widgets); dump-dom
   toggle drives both notes, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v308.
   ✅ iter 367: **3 more code exercises across LLM/LA/algo** (active learning). +3 JS (69→72, gate runs 67): l-positional-encoding
   (sinusoidal PE → 0.84), la-matrix-derivative-identities (∇xᵀAx=2Ax → 6 6), a-network-flow (augmenting-path bottleneck → 3).
   Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (67 verified); dump-dom quad-grad runs → "6 6" "✓ matches";
   smoke errs=0/kErr=0 (12). SW →v307.
   ✅ iter 366: **3 more worked examples on flagship hard lessons** (examples). +3 (346→349) across algo/calc/LA:
   a-np-completeness (verify O(n) vs solve 2ⁿ), c-functions-and-graphs (composition shrinks domain → 2), la-basis-dimension
   (why dimension is well-defined). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (349 examples); dump-dom each
   shows 3, reveals (katex 91/71/63, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v306.
   ✅ iter 365: **4 more deeper-dives on foundational lessons** (content). +4 dd (121→125) across algo/LA/PS/calc:
   a-hash-tables (keys→addresses, O(1)), la-matrices-as-transformations (columns = basis landing spots),
   ps-t-tests (why t not z), c-derivative-definition (secant→tangent limit). String.raw LaTeX; byte-stable inject w/ guards.
   Verified: gate GREEN; dump-dom each renders (katex 6/11/13/10, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v305.
   ✅ iter 364: **PPO clipped-surrogate visualizer — 80th widget** (visualizations). rl-trpo-ppo had no viz. New `rl-ppo-clip`:
   min(r·A, clip(r,1−ε,1+ε)·A) vs the policy ratio r; toggle advantage sign — A>0 flattens at r=1.2 (capped), A<0 floored at
   0.8 but unclipped past 1.2 (the asymmetry). app.js fallback 79→80. Verified: gate GREEN (80 widgets); node clip (caps 1.20 /
   floors -0.80); dump-dom toggle drives both notes, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v304.
   ✅ iter 363: **3 more code exercises across RL/PS/DL** (active learning). +3 JS (66→69, gate runs 64): rl-actor-critic
   (advantage/TD error → 1.50), ps-t-tests (t-statistic → 1.00), dl-rnn-lstm-gru (one RNN step tanh → 0.76). Node-verified;
   byte-stable inject w/ guards. Verified: gate GREEN (64 verified); dump-dom RNN-step runs → "0.76" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v303.
   ✅ iter 362: **3 more worked examples on flagship hard lessons** (examples). +3 (343→346) across algo/calc/PS:
   a-recurrences-master-theorem (Case 2 mergesort → Θ(n log n)), c-continuity (jump discontinuity can't be patched),
   ps-p-values (multiple comparisons: 1−0.95²⁰=0.642). Node-verified; byte-stable inject w/ guards (cases env KaTeX-OK).
   Verified: gate GREEN (346 examples); dump-dom each shows 3, reveals (katex 87/78/30, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v302.
   ✅ iter 361: **4 more deeper-dives on foundational lessons** (content). +4 dd (117→121) across DL/RL/LA/calc:
   dl-pretraining-and-finetuning-paradigm (transfer learning), rl-mdp-formalism (Markov property), la-diagonalization (A^k=PD^kP⁻¹),
   c-fundamental-theorem (the two halves are inverses). String.raw LaTeX; byte-stable inject w/ guards. Verified: gate GREEN;
   dump-dom each renders (katex 0/3/17/4, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v301.
   ✅ iter 360: **Step-back: full kErr/route + coverage audit (clean) + precision-recall threshold viz (79th widget)** (visualizations).
   Sweeps: 148 lessons (reveal examples + open deep-dives) errs=0/kErr=0/0 bad; 96 routes errs=0/kErr=0 (244 green). Coverage:
   0 structurally-thin lessons (343 examples, 117 dd-lessons, 66 code-lessons). Ship: dl-practical-training-and-debugging had no
   viz → `ml-threshold` (two score distributions + movable threshold; precision↑/recall↓: t=−1 .98/.66, t=1 .50/.96). app.js
   fallback 78→79. Verified: gate GREEN (79 widgets); node metrics; dump-dom recall 0.98→0.50, precision 0.66→0.96, embed
   hydrates; smoke errs=0/kErr=0 (12). SW →v300.
   ✅ iter 359: **3 more code exercises across algo/DL/RL** (active learning). +3 JS (63→66, gate runs 61): a-recurrences-master-theorem
   (critical exponent log_b(a) → 3.00), dl-embeddings-and-tokenization (cosine similarity → 0.96), rl-value-approximation (linear
   V=w·φ → 1.40). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (61 verified); dump-dom value-approx runs →
   "1.40" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v299.
   ✅ iter 358: **Chain-rule visualizer — 78th widget** (visualizations). c-chain-rule had no viz (backprop's foundation). New
   `calc-chain`: y=sin²x with a movable tangent whose slope = inner rate cos x × outer rate 2·sin x (the rates multiply). app.js
   fallback 77→78. Verified: gate GREEN (78 widgets); node dy/dx=(2 sin x)(cos x); dump-dom slope 1.000 = product 1.000,
   rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v298.
   ✅ iter 357: **3 more worked examples on flagship hard lessons** (examples). +3 (340→343) across PS/calc/DL:
   ps-uniform-exponential (exponential memorylessness → e⁻¹=0.368), c-antiderivatives (power rule n=−1 exception → ln|x|),
   dl-activation-functions (sigmoid saturation: σ'(0)=0.25 vs σ'(5)=0.0066). Node-verified; byte-stable inject w/ guards.
   Verified: gate GREEN (343 examples); dump-dom each shows 3, reveals (katex 32/68/92, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v297.
   ✅ iter 356: **4 more deeper-dives on foundational lessons** (content). +4 dd (113→117) across algo/calc/RL/LA:
   a-arrays-lists-stacks-queues (array vs linked = layout tradeoff), c-optimization (∇f=0 necessary not sufficient),
   rl-imitation (behavioural cloning drift / compounding error), la-matrix-calculus-backprop (backprop = chain rule, cheap order).
   String.raw LaTeX (\lt/\gt); byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 7/4/3/2, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v296.
   ✅ iter 355: **3 more code exercises across DL/LLM lessons** (active learning). +3 JS (60→63, gate runs 58): dl-attention-mechanism
   (attention weights → 0.67 0.33), dl-overfitting-and-regularization (L2 loss → 1.25), l-tokenization-bpe (BPE merge step → ab).
   Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (58 verified); dump-dom attention runs → "0.67 0.33" "✓ matches";
   smoke errs=0/kErr=0 (12). SW →v295.
   ✅ iter 354: **Gradient-descent convergence visualizer — 77th widget** (visualizations). c-gradient-descent-convergence had no viz.
   New `calc-gd`: GD on f(x)=x² from x=2, x←x(1−2η); slider η shows the 4 regimes (|1−2η|<1): slow / one-step (η=0.5) / oscillate /
   diverge (η≥1). app.js fallback 76→77. Verified: gate GREEN (77 widgets); node trajectories; dump-dom slider drives regime
   slow→one-step→oscillate→diverge, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v294.
   ✅ iter 353: **3 more worked examples on flagship hard lessons** (examples). +3 (337→340) across calc/LLM/PS:
   c-derivatives-special-functions (log diff of xˣ → 6.77), l-pretraining-objective-data (perplexity e²≈7.39),
   ps-errors-and-power (power=1−β=0.80 + four levers). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (340
   examples); dump-dom each shows 3, reveals (katex 65/67/37, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v293.
   ✅ iter 352: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (109→113) across algo/DL/PS/calc:
   a-graph-representations-traversal (BFS/DFS = queue vs stack), dl-learning-rate-schedules-and-tuning (why warmup→decay),
   ps-bernoulli-binomial (where C(n,k)p^k(1-p)^(n-k) comes from), c-linearization-lhopital (why L'Hôpital = ratio of tangent
   slopes). String.raw LaTeX; byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 1/0/12/14, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v292.
   ✅ iter 351: **3 more code exercises — lessons-with-code past 60** (active learning). +3 JS (57→60, gate runs 55) across LA/DL/RL:
   la-svd (singular values from AᵀA → 4 3), dl-initialization-and-vanishing-gradients (He init √(2/fan_in) → 0.1250),
   rl-policy-gradient-theorem (REINFORCE G·∇logπ → 1.0 -0.6). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (55
   verified); dump-dom He-init runs → "0.1250" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v291.
   ✅ iter 350: **Step-back: full kErr/route + coverage audit (clean) + critical-point viz (76th widget)** (visualizations). Sweeps: 148
   lessons (reveal examples + open deep-dives) errs=0/kErr=0/0 bad; 93 routes errs=0/kErr=0 (241 green). Coverage audit: all 148
   lessons ≥2 examples (337), 16 MCQs (2368), ≥cards/hw — zero gaps. Ship: c-multivariable-optimization had no viz → `calc-saddle`
   (heatmap of f(x,y), presets Bowl/Saddle/Dome classified by Hessian eigenvalue signs). app.js fallback 75→76. Verified: gate GREEN
   (76 widgets); dump-dom presets → saddle/min/max, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v290.
   ✅ iter 349: **3 more worked examples on flagship hard lessons** (examples). +3 (334→337) across calc/PS/RL: c-implicit-related-rates
   (expanding balloon dr/dt=1/π), ps-geometric-waiting (E[X]=6, P(X>3)=0.579), rl-value-iteration (contraction: error ×γ → V*=10).
   Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (337 examples); dump-dom each shows 3, reveals (katex 56/34/22,
   kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v289.
   ✅ iter 348: **Bias-variance tradeoff visualizer — 75th widget** (visualizations). ps-point-estimation had no viz. New `ps-estimator`:
   shrinkage estimator θ̂=(1−λ)X — plots bias²(rust)/variance(violet)/MSE(gold U-curve) vs λ, slider + MSE-minimum marker;
   unbiased MSE 4.00 vs minimum 3.45 at λ≈0.14. app.js fallback 74→75. Verified: gate GREEN (75 widgets); node min 3.45<4;
   dump-dom slider drives MSE 4.00→3.45→7.25, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v288.
   ✅ iter 347: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (105→109) across RL/algo/LLM/calc:
   rl-eligibility-traces (TD(λ) dial), a-comparison-sorts (quicksort vs mergesort trade-offs), l-safety-and-frontier (alignment =
   proxy problem), c-extrema-curve-sketching (f'/f'' draw the shape). String.raw LaTeX (\lt/\gt); byte-stable inject w/ guards.
   Verified: gate GREEN; dump-dom each renders (katex 5/5/0/13, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v287.
   ✅ iter 346: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 54→57, gate runs 52)
   across LA/calc/PS: la-low-rank-pca (PCA explained variance → 0.80), c-gradient-directional (directional derivative = |∇f| → 5.00),
   ps-sampling-distributions (standard error → 2.00). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (52 verified);
   dump-dom PCA runs → "0.80" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v286.
   ✅ iter 345: **3 more worked examples on flagship hard lessons** (examples). +3 (331→334) across LA/calc/RL: la-four-subspaces-rank
   (four-subspace dims interlock: 3×5 rank 2 → 2,3,2,1), c-differentiation-rules (product rule (uv)'=u'v+uv'), rl-exploration
   (UCB optimism: arm 2 1.615 > arm 1 1.099). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (334 examples);
   dump-dom each shows 3, reveals (katex 58/46/122, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v285.
   ✅ iter 344: **Hypothesis-test visualizer — 74th widget** (visualizations). ps-hypothesis-testing-logic had no viz. New `ps-hyptest`:
   standard-normal null + |z|>1.96 rejection region (rust); slide observed z → p-value tail (violet) + reject/fail decision; Φ via
   erf approx. app.js fallback 73→74. Verified: gate GREEN (74 widgets); node p(1.96)=0.050; dump-dom slider drives p 0.317→0.051→0.009,
   z=3→REJECT, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v284.
   ✅ iter 343: **4 more deeper-dives on foundational lessons** (content). +4 dd (101→105) across DL/algo/PS/calc:
   dl-the-artificial-neuron-and-mlp (neuron=logistic reg, MLP=universal approx), a-asymptotic-analysis (why Big-O drops constants),
   ps-expectation-variance (E always adds, Var pickier), c-definite-integral-riemann (integral = limit of rectangles). String.raw
   LaTeX; byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 3/18/9/13, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v283.
   ✅ iter 342: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 51→54, gate runs 49)
   across PS/calc/LLM: ps-confidence-intervals (CI margin → 1.96), c-multivariable-optimization (Hessian det test → 3),
   l-optimization-and-stability (gradient clipping → 0.6 0.8). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (49
   verified); dump-dom clip runs → "0.6 0.8" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v282.
   ✅ iter 341: **3 more worked examples on flagship hard lessons** (examples). +3 (328→331) across algo/calc/LA: a-trees-heaps
   (heap array indexing: i=3 → parent 1, children 7,8), c-computing-limits (limit at infinity → 3), la-symmetric-spectral
   (spectral decomposition as sum of rank-1 projections, reconstructs [[2,1],[1,2]]). Node-verified; byte-stable inject w/ guards.
   Verified: gate GREEN (331 examples); dump-dom each shows 3, reveals (katex 109/44/43, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v281.
   ✅ iter 340: **Step-back: full kErr+route sweep (clean) + greedy activity-selection viz (73rd widget)** (visualizations). Sweep: 148
   lessons (reveal examples + open deep-dives) errs=0/kErr=0/0 bad; 90 routes errs=0/kErr=0. 238 green. Reflection: dd crossed 100,
   healthy rotation, gate-hardening held. Ship: a-greedy had no viz → `algo-greedy` (5 activities on a timeline, Step in finish-order,
   selects max 3, rejects trap E[1,9]). app.js fallback 72→73. Verified: gate GREEN (73 widgets); node sel A,C,D=3; dump-dom Step→1
   Run→3, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v280.
   ✅ iter 339: **4 more deeper-dives — past 100** (content). +4 dd (97→101) across DL/RL/algo/PS: dl-activation-functions
   (no nonlinearity → linear collapse), rl-value-approximation (the deadly triad), a-binary-search (invariant + overflow/loop bugs),
   ps-normal-distribution (why normal is everywhere: CLT/max-entropy/convenience). String.raw LaTeX; byte-stable inject w/ guards.
   Verified: gate GREEN; dump-dom each renders (katex 6/0/9/10, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v279.
   ✅ iter 338: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 48→51, gate runs 46)
   across LA/PS/RL: la-orthonormal-gram-schmidt (Gram-Schmidt → 0.5 -0.5, orthogonal), ps-hypothesis-testing-logic (z-statistic
   → 2.00), rl-policy-iteration (greedy argmax Q → 1). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (46
   verified); dump-dom greedy-action runs → "1" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v278.
   ✅ iter 337: **3 more worked examples on flagship hard lessons** (examples). +3 (325→328) across DL/calc/RL: dl-convolution-operation
   (two 3×3 beat one 5×5: 18<25 params, same RF), c-derivative-definition (|x| corner: no derivative at 0), rl-td-learning
   (TD 5.5 vs MC 3 targets). Node-verified; byte-stable inject w/ guards (\lt/\gt). Verified: gate GREEN (328 examples); dump-dom
   each shows 3, reveals (katex 119/57/74, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v277.
   ✅ iter 336: **Worked examples are now searchable + tab deep-linking** (workflow/discoverability). Examples live in l.examples (not
   l.content), so all 325 were invisible to ⌘K. Added (1) lesson-tab deep-links via a 4th hash segment #/lesson/c/l/<tab>
   (router passes parts[3]; viewLesson opens that tab, falls back to lecture); (2) all 325 examples indexed in ⌘K (📐 Example),
   linking to …/examples. Verified: gate GREEN; dump-dom c-optimization/examples opens activeTab=examples (3 items); palette
   "Maximizing area" returns an Example result; smoke incl /examples+/quiz errs=0/kErr=0 (12). SW →v276.
   ✅ iter 335: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (93→97) across DL/DL/LLM/algo:
   dl-convolution-operation (weight-sharing+locality), dl-practical-training-and-debugging (debug order), l-decoding-strategies
   (T/top-k/top-p trade-off), a-shortest-paths-topo (why Dijkstra needs non-neg edges). String.raw LaTeX (\lt/\gt); byte-stable
   inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 2/2/9/4, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v275.
   ✅ iter 334: **Area-between-curves visualizer — 72nd widget** (visualizations). c-area-volume had no viz. New `calc-area`: region
   between y=2x and y=x² on [0,2], shaded to a movable right edge b; accumulated area b²−b³/3 → 4/3 at b=2. app.js fallback 71→72.
   Verified: gate GREEN (72 widgets); node area formula; dump-dom slider drives area 0.864→1.333→0.667, rawDollar=0, embed
   hydrates; smoke errs=0/kErr=0 (12). SW →v274.
   ✅ iter 333: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 45→48, gate runs 43)
   across LA/RL/PS: la-projection-least-squares (vector projection → 2.5 2.5), rl-monte-carlo (MC value = mean of returns → 2.00),
   ps-conditional-expectation (law of total expectation → 14.00). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN
   (43 verified); dump-dom MC runs → "2.00" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v273.
   ✅ iter 332: **3 more worked examples on flagship hard lessons** (examples). +3 (322→325) across calc/algo/RL: c-optimization
   (max area, fixed perimeter → 5×5 square, 25), a-comparison-sorts (Ω(n log n) lower bound: n=4 → ≥5 comparisons),
   rl-mdp-formalism (discounting bounds the return: 1/(1−γ) → 10). Node-verified; byte-stable inject w/ guards (\lt for <1/<0).
   Verified: gate GREEN (325 examples); dump-dom each shows 3, reveals (katex 23/132/114, kErr=0, rawDollar=0); smoke
   errs=0/kErr=0 (12). SW →v272. (Also confirmed read-progress bar + back-to-top already exist — didn't duplicate.)
   ✅ iter 331: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (89→93) across LLM/algo/PS/LA:
   l-transformer-block (mix-then-think + residuals), a-union-find-range (lazy+flat → O(α(n))), ps-covariance-correlation
   (correlation = covariance normalized), la-matrix-multiplication (= function composition). String.raw LaTeX; byte-stable inject
   w/ guards. Verified: gate GREEN; dump-dom each renders (katex 1/4/7/23, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v271.
   ✅ iter 330: **Step-back: full kErr+route sweep (clean) + gate hardened vs mathtools envs** (workflow/broken-proofing). Triggered by
   the 329 psmallmatrix discovery. kErr audit: all 148 lessons (reveal every example + open every deep-dive) → errs=0/kErr=0/0 bad;
   all 89 non-lesson routes → errs=0/kErr=0. 237 routes green; psmallmatrix was the only KaTeX error in the codex. Ship: gate.js
   UNSUPPORTED_KATEX_ENV lint flags [pbBvV]smallmatrix + starred matrix*/cases* (mathtools, unparseable) — caught statically now.
   Verified: gate GREEN (0 false positives); self-test reintroduced psmallmatrix → gate FAILS correctly → removed → green; gate.js
   not cached (no SW bump).
   ✅ iter 329: **3 more worked examples + a KaTeX render-bug fix** (examples / broken). +3 (319→322) across LA/algo/calc:
   la-inverse-and-systems (singular systems: no/infinite solutions), a-graph-representations-traversal (DFS cycle detection via
   back-edge), c-convexity (Jensen's inequality, gap = Var). BONUS: fixed a pre-existing KaTeX error in the MSE-convexity
   example (`psmallmatrix` → `\left(\begin{smallmatrix}…\right)`); c-convexity now kErr=0. Verified: gate GREEN (322 examples);
   dump-dom each shows 3, reveals (katex 62/137/41, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v270.
   ✅ iter 328: **Newton's-method visualizer — 71st widget** (visualizations). No Newton viz; it's iterated linearization → 2nd viz on
   c-linearization-lhopital. New `calc-newton`: on f(x)=x²−2, Step draws the tangent to its x-intercept (next guess), Run iterates
   to √2 (2→1.5→1.4167→1.41421), quadratic convergence note. app.js fallback 70→71. Verified: gate GREEN (71 widgets); node
   converges to √2; dump-dom Step→1.5, Run→1.414214, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v269.
   ✅ iter 327: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 42→45, gate runs 40)
   across calc/DL/algo: c-fundamental-theorem (FTC ∫₀²3x²=8), dl-dropout-and-normalization (batch norm → 0.00 1.00), a-hash-tables
   (h(k)=k mod 7 → 3,1,3,4,1). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (40 verified); dump-dom batch-norm
   runs → "0.00 1.00" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v268.
   ✅ iter 326: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (85→89) across DL/RL/LA/calc:
   dl-embeddings-and-tokenization (symbols→geometry), rl-policy-iteration (monotone evaluate-improve climb),
   la-gradients-jacobians (Jacobian = derivative generalized), c-partial-derivatives (freeze every axis but one). String.raw
   LaTeX; byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 0/3/7/7, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v267.
   ✅ iter 325: **3 more worked examples on flagship hard lessons** (examples). +3 (316→319) across algo/PS/calc: a-divide-and-conquer
   (Karatsuba 12×34 → 408 in 3 mults), ps-bernoulli-binomial (binomial mean 6 / var 4.2 / sd 2.05), c-extrema-curve-sketching
   (closed-interval extremes: max at endpoint x=2). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (319
   examples); dump-dom each shows 3, reveal renders (katex 93/41/101, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v266.
   ✅ iter 324: **Geometric-distribution visualizer — 70th widget** (visualizations). ps-geometric-waiting had no viz. New
   `ps-geometric`: PMF bars P(X=k)=(1−p)^(k−1)p, p slider, dashed mean line at 1/p, memorylessness note. app.js fallback 69→70.
   Verified: gate GREEN (70 widgets); node PMF sums to 1 + mean=1/p; dump-dom slider drives mean 3.33→1.25→10.00, rawDollar=0,
   embed hydrates; smoke errs=0/kErr=0 (12). SW →v265.
   ✅ iter 323: **3 more code exercises across computational lessons** (active learning). +3 JS (lessons-with-code 39→42, gate runs 37)
   across LA/algo/PS: la-gradients-jacobians (gradient → 8 7), a-linear-sorts-selection (counting sort → 0,0,2,2,3,3,3,5),
   ps-normal-distribution (z-score → 2.00). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (37 verified);
   dump-dom counting-sort runs → "0,0,2,2,3,3,3,5" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v264.
   ✅ iter 322: **Inline-extras icons in the course lesson list** (UI/UX). Extends the 320 amplify theme: course lesson rows now flag
   inline 🎛️ viz / 🧩 deeper-dive / 💻 code exercise (computed from content, aria-label/title for SR) so hands-on lessons are
   spottable at a glance — depth advertised before AND inside a lesson. Verified: gate GREEN; dump-dom PS course shows icons on
   19/20 rows, sample aria-label "Includes deeper dive", errs=0; all-7-courses smoke errs=0/kErr=0 (12). SW →v263.
   ✅ iter 321: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (81→85) across LLM/algo/PS/calc:
   l-finetuning-and-instruction-tuning (SFT shapes behaviour not knowledge), a-correctness-invariants (loop invariant = induction),
   ps-random-variables-distributions (random variable = function), c-antiderivatives (why +C). String.raw LaTeX; byte-stable inject
   w/ guards. Verified: gate GREEN; dump-dom each renders (katex 0/0/9/8, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v262.
   ✅ iter 320: **Step-back: full-site sweep (clean) + "In this lesson" extras strip** (UI/UX). Step-back: 311–319 verified, no bugs
   (2 landmines caught pre-commit); codex exhaustively complete → surface depth over adding more. Full 235-route sweep, first
   since 310 → errs=0/kErrTotal=0/bad=none. Ship: clickable "In this lesson" badge strip (🎛️ interactive / 🧩 deeper dive / 💻
   code exercise) atop each lecture, computed from content, scrolls to + opens the extra — advertises the 69 viz + 81 dd + 39
   code exercises previously below the fold. Verified: gate GREEN; dump-dom right badges per lesson, deeper-dive badge opens it
   (open false→true), errs=0; 235-sweep clean; smoke errs=0/kErr=0 (12). SW →v261.
   ✅ iter 319: **Joint-distribution visualizer — 69th widget** (visualizations). ps-joint-distributions had no viz. New `ps-joint`:
   5×5 P(X,Y) heatmap + marginal P(X)/P(Y) bars; presets Independent (joint=outer product, indep error 0) vs Correlated (diagonal
   mass, error 0.083). app.js fallback 68→69. Plain-unicode note. Verified: gate GREEN (69 widgets); node both sum to 1 + error
   0 vs 0.083; dump-dom toggle drives error 0.000↔0.083, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v260.
   ✅ iter 318: **3 more worked examples on flagship hard lessons** (examples). +3 (313→316) across DL/PS/algo: dl-attention-mechanism
   (why √dₖ: unscaled softmax saturates [0.018,0.982] vs scaled [0.378,0.622]), ps-poisson (P(≥1)=1−e^−λ → 0.950), a-hash-tables
   (load factor α=0.75 → resize → 0.375, amortized O(1)). Node-verified; byte-stable inject w/ guards. Verified: gate GREEN (316
   examples); dump-dom each shows 3, reveal renders (katex 57/25/57, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v259.
   ✅ iter 317: **4 more deeper-dives on flagship hard lessons** (content). Steered to RL/calc/LA/DL; +4 dd (77→81): rl-offline
   (distribution shift → conservatism), la-projection-least-squares (least squares = orthogonal projection), c-continuity (IVT
   guarantees a root), dl-transfer-learning (general features transfer). String.raw LaTeX; \lt/\gt for sign inequalities; byte-stable
   inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 0/10/10/0, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v258.
   ✅ iter 316: **Kruskal's MST visualizer — 68th widget** (visualizations). a-mst-union-find had no viz. New `algo-kruskal`: 6-node
   weighted graph, Step takes edges cheapest-first (added sage / rejected dashed-rust via union-find cycle test), Run/Reset; note
   narrates each + the running weight to the minimum 13. app.js fallback 67→68. Verified: gate GREEN (68 widgets); node MST weight
   13/5 edges; dump-dom Step adds 1–2, Run→13/5/complete, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v257.
   (Landmine: node -e inline breaks on apostrophes; use a script file for doc edits with `'`.)
   ✅ iter 315: **3 more code exercises across the 4-count topics** (active learning). +3 JS (lessons-with-code 36→39, gate runs 34)
   across LA/RL/PS: la-eigenvalues-eigenvectors (2×2 eigenvalues from trace+det → 3 1), rl-td-learning (TD(0) update → 5.50),
   ps-point-estimation (sample SD with n−1 → 2.58). Node-verified; byte-stable inject w/ guards (incl. **-free). Verified: gate
   GREEN (34 verified); dump-dom la-eigenvalues runs → "3 1" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v256.
   ✅ iter 314: **In-app "reduce motion" toggle** (a11y). Animations respected OS prefers-reduced-motion but had no in-app control.
   Added a Settings toggle → data-reduce-motion="on" on <html>, which makes reducedMotion() true (gates all JS animations) +
   triggers a CSS guard mirroring the OS-pref block; persisted + re-applied on boot, aria-pressed. Verified: gate GREEN; dump-dom
   off by default, toggle sets attr + persists + relabels, boot re-applies a preset pref; smoke errs=0/kErr=0 (12). SW →v255.
   ✅ iter 313: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (73→77) across LLM/DL/algo/PS:
   l-optimization-and-stability (warmup/AdamW/clipping = stability), dl-pooling-and-cnn-architectures (invariance + receptive
   field), a-approximation-randomized (keep a guarantee: c-approx or randomized), ps-sample-spaces-events (probability = set
   theory + measure). String.raw LaTeX; byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex
   0/0/2/7, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v254.
   ✅ iter 312: **Conditional-expectation visualizer — 67th widget** (visualizations). ps-conditional-expectation had a dd but no viz.
   New `ps-conditional-expectation`: scatter y=3+2sin(x)+noise, X sliced into bins → average Y per slice = E[Y|X] curve tracing
   the true relationship; noise slider + true-curve toggle; deterministic jitter. app.js fallback 66→67. Verified: gate GREEN
   (67 widgets); node binned means track f (max err 0.26); dump-dom renders, note has E[Y|X], slider+toggle update, rawDollar=0,
   embed hydrates; smoke errs=0/kErr=0 (12). SW →v253.
   ✅ iter 311: **3 more worked examples on flagship hard lessons** (examples). +3 (310→313) across LA/PS/calc: la-svd (rank-1
   approximation keeps 25/34≈73.5%), ps-t-tests (paired t-test → t≈5.20), c-area-volume (shells: ∫2πx·x²=8π). Node-verified;
   byte-stable inject w/ guards. Verified: gate GREEN (313 examples); dump-dom each shows 3, reveal renders (katex 49/40/72,
   kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v252.
   ✅ iter 310: **Step-back: full-site sweep (clean) + SR-complete Playground** (a11y). Step-back: 301–309 rotation diverse
   (UI-UX/viz/content/examples/animation/viz/content/UI-UX/code), animation refreshed (305), no bugs shipped. Full 232-route
   sweep (148 lessons + 66 lab + 7 courses + 11 pages), first since 300 → errs=0/kErrTotal=0/bad=none. Ship: code-exercise/
   Playground output + ✓/✗ check had no live region (SR users couldn't hear the result); fixed — output wrap role=status
   aria-live=polite, textarea aria-label, selects labeled; covers all 36 code exercises + the playground. Verified: gate GREEN;
   dump-dom outWrap live=polite, editor labeled, ✓ check renders inside live region, errs=0; 232-sweep clean; smoke errs=0/kErr=0 (12). SW →v251.
   ✅ iter 309: **3 more code exercises across thinnest topics** (active learning). DL/PS thinnest (3 each); +3 JS (lessons-with-code
   33→36, gate runs 31): dl-convolution-operation (1-D conv edge detector → 0,5,0,0), dl-pooling-and-cnn-architectures
   (max-pool → 3,5,4), ps-covariance-correlation (Pearson r → 0.60). Hit + recorded the `**`-fails-rawMarkdown landmine (use
   Math.pow). Verified: gate GREEN (31 verified); dump-dom dl-convolution runs → "0,5,0,0" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v250.
   ✅ iter 308: **⌘K glossary terms deep-link to their definition** (UI/UX). Glossary hits in ⌘K all opened #/glossary (138-list);
   now deep-link to #/glossary/<term> → router passes term to viewGlossary → pre-fills the search → focused, definition-visible
   view. Bare #/glossary unchanged. Verified: gate GREEN; dump-dom #/glossary/Posterior pre-fills + narrows to 3, #/glossary
   shows 138 empty-box, errs=0; smoke errs=0/kErr=0 (12). SW →v249.
   ✅ iter 307: **4 more deeper-dives on flagship hard lessons** (content). Steered to less-covered topics (PS/RL/algo/calc); +4 dd
   (69→73): ps-uniform-exponential (memorylessness), rl-model-based (plan vs react), a-divide-and-conquer (balanced splits →
   O(n log n)), c-integration-techniques (sub=chain reversed, parts=product reversed). String.raw LaTeX; byte-stable inject w/
   guards. Verified: gate GREEN; dump-dom each renders (katex 6/2/6/7, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v248.
   ✅ iter 306: **Binary Min-Heap visualizer — 66th widget** (visualizations). a-trees-heaps had no viz. New `algo-heap`: values as a
   tree + the contiguous array below, min at root; Insert sifts up, Extract-min sifts down, Reset; note carries the live array
   (verifiable + SR-readable). (Confirmed 58-achievement set already exhaustive → viz higher value.) app.js fallback 65→66.
   Verified: gate GREEN (66 widgets); node siftUp/down keep heap property; dump-dom 3 inserts + extract → valid min-heap, root=min
   both times, rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v247.
   ✅ iter 305: **Knowledge Map draws its constellation on landing** (animation). Map rendered instantly; added a staged CSS
   opacity reveal (wedges/rings → edges → nodes), opacity-only (nodes carry SVG transform), `drawing` class added pre-paint +
   removed after 1s so hover/dim resume, reduced-motion safe + never strands invisible (fill-mode + class removal → opacity 1).
   Verified: gate GREEN; dump-dom drawingEarly=true/drawingLate=false, 148 nodes end opacity 1, errs=0; smoke errs=0/kErr=0 (12). SW →v246.
   ✅ iter 304: **3 more worked examples on flagship hard lessons** (examples). +3 (307→310) across LA/algo/RL:
   la-matrix-multiplication (Ax as column combination → [4,10]), a-binary-search (lower_bound → index 1),
   rl-policies-values (V from π,Q → 8.2, gap 1.8). Node-verified; byte-stable inject w/ even-$ + tag-balance (incl <code>) guards.
   Verified: gate GREEN (310 examples); dump-dom each Examples tab shows 3, reveal renders (katex 117/28/97, kErr=0, rawDollar=0);
   smoke errs=0/kErr=0 (12). SW →v245.
   ✅ iter 303: **4 more deeper-dives on flagship hard lessons** (content). +4 dd (65→69) across LA/DL/LLM/calc:
   la-orthonormal-gram-schmidt (QᵀQ=I → free inverse/dot-product coords/stability), dl-overfitting-and-regularization
   (regularization = prefer simplest fit), l-rag-and-tools (RAG separates knowledge from reasoning), c-gradient-descent-convergence
   (condition number κ → zigzag). String.raw LaTeX; byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders
   (katex 6/2/0/6, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v244.
   ✅ iter 302: **The ε–δ limit visualizer — 65th widget** (visualizations). c-limits-intuition had no viz. New `calc-limit-epsilon`:
   pick tolerance ε (band around L), widget finds δ interval around a keeping the curve inside; shrink ε → δ shrinks but always
   exists (∀ε ∃δ). Presets: (x²−1)/(x−1) with removable hole (δ=ε, limit ignores f(a)) and x² (δ<ε, asymmetric). δ found
   numerically. app.js fallback 64→65. Plain-unicode note. Verified: gate GREEN (65 widgets); node δ≈ε (hole) vs δ<ε (quad);
   dump-dom ε slider drives δ 0.60→0.10, toggle switches to x² (δ=0.05), rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v243.
   ✅ iter 301: **Topic filter for the Glossary + stale-copy fix** (UI/UX). 138 terms / 7 subjects had search but no topic filter.
   Added per-topic chips (All + topics present), composing with search (no re-render), mirroring the Lab (286). Also fixed stale
   copy "all six subjects" → "seven". Reuses .lab-tbtn pills, aria-pressed, mobile-wrap. Verified: gate GREEN; dump-dom — 9 chips,
   Calculus → its 17 terms (all tagged Calculus), All topics → 138 restored, errs=0; smoke errs=0/kErr=0 (12). SW →v242.
   ✅ iter 300: **Step-back: full-site sweep (clean) + 5 glossary terms** (understandability). Milestone step-back: 291–299 rotation
   diverse (viz/mobile/mobile/examples/gamification/viz/content/a11y/code), 2 real mobile bugs fixed, no bugs shipped. Full
   230-route sweep (148 lessons + 64 lab + 7 courses + 11 pages), first since 290 → errs=0/kErrTotal=0/bad=none. Ship: glossary
   audited vs ~56 core terms (very complete); +5 gaps (133→138): Prior, Posterior, Expected value, Stationary distribution,
   Taylor series — exact phrases now auto-link + hover-define. Byte-stable inject w/ even-$ + dup guards. Verified: gate GREEN
   (138 glossary); dump-dom glossary page shows 5/5 with KaTeX (120 spans), kErr=0, rawDollar=0; 230-sweep clean; smoke errs=0/kErr=0 (12). SW →v241.
   ✅ iter 299: **3 more interactive code exercises across thin topics** (active learning). LA/calc/DL/RL/PS were tied at 3; +3 JS
   (lessons-with-code 30→33, gate runs 28): la-inverse-and-systems (Cramer's rule → 1 3), rl-value-iteration (Bellman update →
   9.0), c-intro-differential-equations (Euler's method → 2.25, pairs w/ the 289 slope-field dd). Node-verified; byte-stable
   inject w/ guards. Verified: gate GREEN (28 verified); dump-dom rl-value-iteration runs → "9.0" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v240.
   ✅ iter 298: **Accessible flashcard flip** (a11y). Both 3-D card faces were always in the DOM with no aria-hidden → SR read the
   answer before flipping (leak + defeats retrieval). Fix: card = role=button tabindex=0 + aria-label (updates on flip);
   aria-hidden toggles per flip state (back hidden until flip); card3d-inner aria-live=polite announces the reveal. Verified:
   gate GREEN; dump-dom — role=button, live=polite, before flip front visible/back hidden, after flip swapped + label updated,
   errs=0; smoke errs=0/kErr=0 (12). SW →v239.
   ✅ iter 297: **4 more deeper-dives on flagship hard lessons** (content). (First confirmed number-key/A–D quiz keys + 1–4 flashcard
   grading already exist + are documented.) +4 dd (61→65) across algo/calc/LLM/PS: a-np-completeness (NP-complete interreducible →
   P=NP), c-implicit-related-rates (chain rule wearing a clock), l-prompting-and-in-context-learning (ICL conditions, doesn't
   teach), ps-hypothesis-testing-logic (proof by contradiction with a dial). String.raw LaTeX; byte-stable inject w/ guards.
   Verified: gate GREEN; dump-dom each renders (katex 0/13/0/9, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v238.
   ✅ iter 296: **Student's-t vs. normal visualizer — 64th widget** (visualizations). ps-t-tests had no viz. New `ps-t-dist`: t-curve
   (violet) over standard normal (dashed), shaded |t|>2 tails + live P(t>2); slide df 1–40 → P(t>2) falls 14%→5.2%→~2.5%,
   converging to normal's 2.3% by df≈30. PDF numerically normalized (no gamma). app.js fallback 63→64. Plain-unicode note.
   Verified: gate GREEN (64 widgets); node peak 0.346→0.399 + tail 0.118→0.023; dump-dom slider drives P(t>2) 14%→5.2%→2.x%,
   rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v237.
   ✅ iter 295: **"Deep Work" achievement ties the focus timer into progression** (gamification). Focus timer (279) had no reward
   tie-in. New 🧘 Deep Work achievement (complete 5 sessions): Store.addFocusSession() increments persisted focusSessions +
   unlocks at 5, wired into stopFocusTimer(done); added to Exploration Hall category + progress map [focusSessions,5]. New
   persisted focusSessions field (blank+load). Achievements 57→58. Verified: gate GREEN (reachability ok); dump-dom — Hall shows
   it locked on old save (loads 0), 5 calls → unlock + both persist; smoke errs=0/kErr=0 (12). SW →v236.
   ✅ iter 294: **3 more worked examples on flagship hard lessons** (examples). +3 (304→307) across calc/PS/DL: c-fundamental-theorem
   (average value of a function → 3), ps-conditional-independence-bayes (Monty Hall → switch wins 2/3), dl-loss-functions
   (binary cross-entropy → 0.105/0.693/2.303). Node-verified; byte-stable inject w/ even-$ + tag-balance guards. Verified: gate
   GREEN (307 examples); dump-dom each Examples tab shows 3, reveal renders (katex 59/35/69, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v235.
   ✅ iter 293: **Fix: Progress page overflowed horizontally on mobile** (mobile/bug). 390px audit of 14 views found #/stats
   overflowing (sw 539>390): the .dist-strip repeat(5,1fr) can't shrink 5 cols below ~88px each. Fix: auto-fit minmax(88px,1fr)
   → wraps to 2 rows on phone, single row of 5 on desktop. Verified (iframe@390): #/stats overflow=false, 5 cells 2 rows; 760px
   1 row; full audit over=NONE; gate GREEN; smoke errs=0/kErr=0. SW →v234.
   ✅ iter 292: **Fix: visualizations were squished on mobile** (mobile/bug). .viz-canvas had max-width:100% (width shrank) but
   canvas() set a fixed inline height (didn't shrink) → all 63 widgets squished horizontally on phones (ratio 0.90 vs 1.54).
   Fix: drop inline height + add height:auto so canvas scales proportionally from its intrinsic w:h. Pointer helper uses
   getBoundingClientRect so drag unaffected. Verified (iframe@390px+postMessage): scaling/master-theorem now 316×205 ratio 1.54
   (was 316×350); desktop unchanged 540×350; gate GREEN; smoke errs=0/kErr=0 (12). SW →v233.
   ✅ iter 291: **Scaling-laws visualizer — 63rd widget** (visualizations). l-scaling-laws had no viz. New `llm-scaling`: for fixed
   compute C=6ND, loss-vs-model-size U-curve (L=E+A/Nᵃ+B/Dᵃ), marks compute-optimal N* at the dip; slide budget 10¹⁸–10²⁴
   and N* climbs 91M→2.9B→91B at constant ~20 tok/param (constants tuned (B/A)^(1/a)≈20). app.js fallback 62→63. Plain-unicode
   note. Verified: gate GREEN (63 widgets); node U-curve + 21 tok/param constant; dump-dom slider grows N* 91M→2.9B→91.2B,
   rawDollar=0, embed hydrates; smoke errs=0/kErr=0 (12). SW →v232.
   ✅ iter 290: **Step-back: full-site sweep (clean) + 2 LLM code exercises** (active learning). Step-back: 281–289 rotation diverse
   (code/viz/content/examples/viz/UI-UX/gamification/a11y/content), no bugs. Full 228-route sweep (148 lessons + 62 lab + 7
   courses + 11 pages), first since 280 → errs=0/kErrTotal=0/bad=none. Ship: LLM was thinnest code topic (2); +2 JS
   (lessons-with-code 28→30, gate runs 25): l-self-attention (scaled dot-product attention → 0.731,0.269 | 7.31,2.69),
   l-pretraining-objective-data (perplexity=exp(CE) → 2.00 1.20). Node-verified; byte-stable inject w/ guards. Verified: gate
   GREEN (25 verified); dump-dom l-self-attention runs → "0.731,0.269 | 7.31,2.69" "✓ matches"; 228-sweep clean; smoke errs=0/kErr=0 (12). SW →v231.
   ✅ iter 289: **4 more deeper-dives on flagship hard lessons** (content). +4 (57→61) across DL/calc/algo/RL (RL's first since 277):
   dl-rnn-lstm-gru (additive cell-state vs vanishing multiplicative recurrence), c-intro-differential-equations (ODE as slope
   field), a-backtracking-branch-bound (pruned DFS + bound), rl-exploration (ε-greedy vs UCB optimism bonus). String.raw LaTeX;
   byte-stable inject w/ guards. Verified: gate GREEN; dump-dom each renders (katex 4/4/0/5, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v230.
   ✅ iter 288: **Screen-reader polish for the app chrome** (accessibility). Audit confirmed route-focus + reducedMotion guards
   solid; fixed 3 gaps: logo div→`<a>` (keyboard/SR home link, glyph aria-hidden, focus ring), 7/10 nav icons missing
   aria-hidden → all 10 hidden (SR reads just the labels), streak flame aria-hidden (count kept). Verified: gate GREEN;
   dump-dom — brand anchor navigates home, 10/10 icons + flame hidden, streak number kept, errs=0; smoke errs=0/kErr=0 (12). SW →v229.
   ✅ iter 287: **"Whole subject complete" celebration, once per topic** (gamification). Finishing a whole subject passed almost
   silently (only the final module's "📗 Module complete!" + topic-clear achievement which unlocks once). Added a per-topic
   confetti + "🎓 Topic complete!" toast, gated once-per-topic (new persisted topicDoneCelebrated map + Store.celebrateTopicOnce);
   supersedes the module toast when both land. Verified: gate GREEN; dump-dom — seeded 19 LA lessons minus the last, Mark
   complete → "🎓 Linear Algebra complete!" toast + flag persisted, errs=0; old-shape save upgrades cleanly; smoke errs=0/kErr=0 (12). SW →v228.
   ✅ iter 286: **Topic filter for the Visualization Lab** (UI/UX). 62 widgets / 7 subjects had search + All/Unexplored but no topic
   filter. Added per-topic chips (All topics + 7); each card got data-topic; apply() composes topic × search × explored-mode
   (no re-render); pill chips, aria-pressed, mobile-wrap. Verified: gate GREEN; dump-dom — 8 chips, Calculus → exactly its 9
   widgets (all data-topic=calculus), All topics → 62 restored, errs=0; smoke errs=0/kErr=0 (12). SW →v227.
   ✅ iter 285: **Master Theorem visualizer — 62nd widget** (visualizations). a-recurrences-master-theorem had no viz. New
   `algo-master-theorem`: per-level work bars for T(n)=a·T(n/b)+nᵈ; ratio r=a/bᵈ tips root-heavy(Θ(nᵈ))/flat(Θ(nᵈ log n))/
   leaf-heavy(Θ(n^log_b a)), dominant level highlighted, Θ named live; sliders a/b/d + presets (mergesort/strassen/binsearch).
   Plain-unicode note. app.js fallback 61→62. Verified: gate GREEN (62 widgets); node log₂7=2.81; dump-dom presets give
   right cases (merge r=1 balanced, strassen r=1.75 leaf→n^2.81, binsearch r=1 balanced), rawDollar=0, embed hydrates;
   smoke errs=0/kErr=0 (12). SW →v226.
   ✅ iter 284: **3 more worked examples on flagship hard lessons** (examples). Confirmed MCQ answer-positions balanced (0 skewed).
   +3 examples (301→304), new techniques across DL/PS/algo: dl-backpropagation (2-step chain y=(wx+b)³ → 27/54),
   ps-confidence-intervals (CI for a proportion → [0.504,0.696]), a-greedy (fractional knapsack → 240, where greedy works).
   Node-verified; byte-stable inject w/ even-$ + tag-balance guards. Verified: gate GREEN (304 examples); dump-dom each
   Examples tab shows 3, reveal renders (katex 26/45/131, kErr=0, rawDollar=0, answers present); smoke errs=0/kErr=0 (12). SW →v225.
   ✅ iter 283: **4 more deeper-dives on flagship hard lessons** (content). +4 (53→57) across algo/LLM/PS/DL: a-string-algorithms
   (KMP failure-function, O(nm)→O(n+m)), l-hallucination (fluency optimizes plausible not true), ps-point-estimation
   (n−1 Bessel's correction), dl-diffusion-models (learn to denoise). String.raw LaTeX; byte-stable inject w/ guards.
   Verified: gate GREEN; dump-dom each renders (katex 5/0/12/0, kErr=0, rawDollar=0; content re-read for integrity);
   smoke errs=0/kErr=0 (12). SW →v224.
   ✅ iter 282: **Law of Large Numbers visualizer — 61st widget** (visualizations). ps-law-of-large-numbers had a dd but no viz. New
   `ps-lln`: sample a die/coin, running average plotted converging to μ (3.5) inside a shrinking ±2σ/√n band; Play (rAF) +
   "+100" (sync, testable) + Reset + Fair-die/Coin. Distinct from CLT viz (distribution vs convergence). Plain-unicode note.
   app.js fallback 60→61. Verified: gate GREEN (61 widgets); node 400 rolls→3.41; dump-dom 4×"+100"→n=400 avg~3.38, rawDollar=0,
   embed hydrates; smoke errs=0/kErr=0 (12). SW →v223.
   ✅ iter 281: **3 interactive code exercises for thinnest topics** (new functionality / active learning). DL had only 1 (biggest
   topic), RL next-thinnest; +3 JS (lessons-with-code 25→28, gate runs 23): dl-activation-functions (neuron forward pass +
   ReLU → 0.00 1.70), dl-gradient-descent-and-optimizers (one GD step x←x−lr·2x, 5→2.56), rl-mdp-formalism (discounted
   return G=Σγᵏrₖ → 1.729). Node-verified; byte-stable inject w/ round-trip + no-existing-data-code guards. Verified: gate
   GREEN (23 verified); dump-dom dl-activation runs → "0.00 1.70" "✓ matches"; smoke errs=0/kErr=0 (12). SW →v222.
   ✅ iter 280: **Step-back: full-site sweep (clean) + Hall progress-bar sweep** (animation). Step-back: 270–279 rotation
   healthy+diverse, no bugs. Full 226-route sweep (148 lessons + 60 lab + 7 courses + 11 pages), first since 250 →
   errs=0/kErr=0 everywhere; 30 iters of injections broke nothing. Ship: achievement-Hall bars now sweep-fill on landing
   (added transition to .a-prog-fill, extended sweepBars to target .a-prog-fill/.ach-progress-fill, call it in
   viewAchievements) — consistent with course/Progress pages. Verified: gate GREEN; dump-dom Hall bars carry target+0.7s
   transition (20/33 in-progress), errs=0; smoke errs=0/kErr=0 (12). SW →v221.
   ✅ iter 279: **Focus timer — time-boxed study sessions** (new functionality). For "studying alongside a full-time job": launch a
   25/50-min session from ⌘K → persistent corner countdown pill (pause/stop), rides along across navigation; on completion
   a gentle Web-Audio chime + tab-title flash + toast. No XP (ungameable). Transient state (no save-shape change); print-hidden.
   Verified: gate GREEN; dump-dom real flow — ⌘K "focus" surfaces both commands, 25-min → pill 25:00→24:59, pause→▶,
   stop→gone, errs=0; smoke errs=0/kErr=0 (12). SW →v220.
   ✅ iter 278: **SVD rotate·stretch·rotate visualizer — 60th widget** (visualizations). la-svd had a deep-dive but no viz. New
   `la-svd`: unit circle + basis through A=UΣVᵀ in 4 steppable stages (①circle ②Vᵀ rotate ③Σ stretch→ellipse ④U rotate);
   4 sliders (2 angles, σ₁/σ₂); ellipse semi-axes = singular values; det=±σ₁σ₂. Plain-unicode note (no $). app.js fallback
   59→60. Also re-audited 390px (new viz+dashboard, docOver=0, no regression). Verified: gate GREEN (60 widgets); node — A
   has singular values exactly 2.400/1.000 (valid SVD); dump-dom stages switch, rawDollar=0, embed hydrates; smoke
   errs=0/kErr=0 (12). SW →v219.
   ✅ iter 277: **4 more deeper-dives on flagship hard lessons** (content). +4 (49→53) across DL/calc/RL/LA:
   dl-attention-mechanism (soft differentiable dictionary lookup), c-improper-integrals (limit in disguise; 1/x² vs 1/x),
   rl-actor-critic (REINFORCE + baseline → advantage), la-inverse-and-systems (don't form A⁻¹; solve by LU/elimination).
   String.raw LaTeX; byte-stable inject w/ even-$, no-**, tag-balance (incl <code>) pre-guards. Verified: gate GREEN;
   dump-dom each renders (katex 1/7/3/11, kErr=0, rawDollar=0); smoke errs=0/kErr=0 (12). SW →v218.
   ✅ iter 276: **"Best study day yet!" toast** (gamification). Completed the personal-bests celebration trio (record-streak ✓,
   best-test ✓, now best-day ✓). Fires once the instant today's XP crosses your prior best-ever day — detected as the
   crossing inside addXP (fires once/day, never on day 1, no new persisted state; transient _bestDaySet drained in
   flushAchievements beside the goal toast). Verified: gate GREEN; node test (200→quiet at 150, fires 230 on crossing,
   quiet after, day-1 silent); browser lesson-complete (0→50 vs best 30) raises the toast; smoke errs=0/kErr=0 (12). SW →v217.
   ✅ iter 275: **SR fixes: live quiz feedback + labeled test selects** (accessibility). Two real gaps: (1) quiz "Correct/Not quite"
   + explanation was injected into non-live slots → screen readers heard nothing; added aria-live="polite" to #explain-slot
   (quiz), .qc-explain-slot (quick check), #md-explain (mastery/daily-mix). (2) test-config Scope/Length labels lacked for=
   → added for="t-scope"/"t-len" (also click-to-focus). Verified: gate GREEN; dump-dom — answered quiz leaves #explain-slot
   aria-live=polite + feedback text; #/test labels resolve; smoke errs=0/kErr=0 (12). SW →v216.
   ✅ iter 274: **Statistical-power visualizer — 59th widget** (visualizations). PS thinnest viz topic (6); ps-errors-and-power had no
   viz. New `ps-power`: two normal curves (H₀, H₁ separated by effect size d), movable threshold; shaded α (rust) / β (gold)
   / power (sage) with live numbers; sliders (threshold, d) + presets (α=.05/large/underpowered). erf-based Φ; plain-text
   note (no $, viz-note landmine). app.js fallback 58→59. Verified: gate GREEN (59 widgets); dump-dom note z=1.65,d=2 →
   α=0.050/β=0.361/power=0.639 (rawDollar=0); embed hydrates; smoke errs=0/kErr=0 (12). SW →v215.
   ✅ iter 273: **4 more deeper-dives on flagship hard lessons** (content). +4 (45→49) across topics 265 missed: dl-gans (two-player
   minimax game / Nash equilibrium), ps-poisson (law of rare events / binomial limit), a-mst-union-find (Kruskal + cut
   property + Union-Find), l-peft-lora (low-rank patch ΔW=BA, <1% of weights). String.raw LaTeX; byte-stable inject w/
   even-$, no-**, tag-balance pre-guards. Verified: gate GREEN; dump-dom each renders (katex 9/11/0/22, kErr=0, rawDollar=0);
   smoke errs=0/kErr=0 (12). SW →v214.
   ✅ iter 272: **One-tap search on mobile** (UI/UX). Search/command-palette was buried in the sidebar footer on mobile (tap-☰ →
   scroll → tap; "⌘K" hint meaningless on touch). Added a topbar 🔎 (#topbar-search → openPalette), shown only ≤900px
   (mirrors .menu-btn), hidden on desktop + print. Verified: 390px dump-dom display:grid + click opens palette (errs=0);
   desktop display:none; smoke errs=0/kErr=0 (12). SW →v213.
   ✅ iter 271: **3 more worked examples on flagship hard lessons** (examples). Content uniform (no thin spots); added a 3rd worked
   example to 3 lessons at 2, each a NEW technique (298→301): la-determinants (3×3 det by cofactor = 49), a-dynamic-programming
   (0/1 knapsack 2-D table, max=9, why greedy fails), ps-normal-distribution (z-score beyond empirical rule, z≈1.33,
   Φ=0.9082≈91%). All values node-verified; byte-stable inject w/ even-$ + <strong>-balance pre-guards. Verified: gate GREEN
   (301 examples); dump-dom each Examples tab shows 3, reveal renders (katex 14/43/53, kErr=0, rawDollar=0, answers present);
   smoke errs=0/kErr=0 (12). SW →v212.
   ✅ iter 270: **Gate: unbalanced-HTML-tag lint + step-back** (workflow). Step-back: 260–269 rotation healthy+diverse, mobile bug
   caught (266), perf settled (265); workflow (gate) most-neglected → hardened it. Added tag-balance lint to gate.js:
   counts open/close for non-auto-closing paired tags (details,b,strong,em,span,sup,sub,ul,ol,table,div,blockquote,code,pre)
   on math/code-stripped content → catches an unclosed <details>/<b>/<div> from a bad injection. Scoped OUT auto-closing
   flow tags (p/li/td/h3…) after a first pass false-flagged 5 valid <p>…<h4> (implicit close); zero false positives now.
   Verified: gate GREEN across 148 lessons; 8-case unit test of the logic passes. gate.js is dev-only (not in SW ASSETS) →
   no cache bump, site byte-identical.
   ✅ iter 269: **Consistency-strip cells pop in on landing** (animation). The forecast bars swept + stats counted up, but the 14-day
   strip appeared instantly. sweepStrip(): cells scale-in left-to-right (chronological wave) via CSS @keyframes csPop +
   fill-mode:both + per-cell inline animation-delay (i·38ms, cap 540) — fill-mode guarantees they settle at scale(1) (can't
   stick hidden). Reduced-motion safe (JS guard + global rule). Verified: gate GREEN; dump-dom all 14 cells get cs-pop +
   animation-name csPop + staggered delay (cell5=190ms), errs=0; smoke errs=0/kErr=0 (12). SW →v211.
   ✅ iter 268: **Lagrange-multipliers visualizer — 58th widget** (visualizations). c-lagrange-multipliers had a deep-dive but no viz.
   New `calc-lagrange`: maximize f=x+y on the unit circle; slider moves a point round the constraint, level line sweeps,
   ∇f (gold, constant) & ∇g (violet, radial) drawn; tangency (gradients parallel) turns sage = "∇f=λ∇g". Animated
   Maximize(45°,√2)/Minimize(225°,−√2) via loop. app.js fallback 57→58. Verified: gate GREEN (58 widgets); dump-dom slider
   compute (45°→1.414 Tangent/max, 225°→−1.414 min, 100°→cuts); lesson embed hydrates; smoke errs=0/kErr=0 (12). SW →v209.
   (rAF buttons don't advance in headless; slider verifies same draw path.)
   ✅ iter 267: **Weekly momentum on the dashboard** (gamification). Filled the missing medium-term horizon (daily streak + lifetime
   XP existed, nothing weekly). Added a "📈 N XP this week · ▲/▼ X% vs last week" line to the consistency-strip card —
   last-7-days XP vs the 7 before, computed in the strip's existing 14-day loop (no new state). Trend ▲/▼/even/building;
   hidden for zero-activity users; comma-formatted. Verified: gate GREEN; dump-dom all branches (up ▲19%, down ▼83%, new
   "building momentum", none→absent, 2,000 comma); smoke errs=0/kErr=0 (12). SW →v208.
   ✅ iter 266: **Fix: glossary tooltips caused sideways scroll on mobile** (bugfix / mobile). 390px re-audit (first since 253) found
   lessons overflowing horizontally (la-determinants +97px, c-chain-rule +116px; code-free lessons clean). Culprit:
   `.gloss-pop` (absolute, left:0, ~270px, laid out even while visibility:hidden) — a right-side term pushes its hidden popup
   past the viewport → persistent horizontal scroll. Long pre-existing. Fix: placeGlossPops() shifts any overflowing popup
   left to fit (clamped to left edge), so tooltips stay fully visible & the page stops scrolling; runs post-layout (rAF +
   post-KaTeX timeout) + debounced resize. Verified: 390px dump-dom docOver 97–125px→0 (popups clamped to right≤380, on-screen);
   desktop unaffected (docOver=0); smoke errs=0/kErr=0 (12). SW →v207.
   ✅ iter 265: **5 more deeper-dives + performance verdict** (content). PERF (measured, logged): data ~5.3MB raw but ~1.5MB gzip
   (Pages serves gzip), SW-cached after first visit; lazy-load breaks all-COURSES search/map/daily-concept; minify breaks
   inject pipeline → **perf is fine for this single-user SW-cached site; not a must-do anymore.** Ship: +5 deep-dives (40→45)
   on topics 260 missed (algorithms, calculus) + 3 more: a-network-flow (max-flow=min-cut), c-multivariable-optimization
   (Hessian eigenvalues), la-symmetric-spectral (spectral theorem), rl-dqn (replay+target net), l-positional-encoding
   (attention order-blind / RoPE). Verified: gate GREEN; dump-dom each renders (katex 8/6/7/2/4, kErr=0, rawDollar=0);
   smoke errs=0/kErr=0 (12). SW →v206.
   ✅ iter 264: **4 interactive code exercises for thinnest topics** (new functionality / active learning). Calculus & LA had only 1
   code exercise each; added 4 JS (gate now runs 20, lessons-with-code 21→25): la-determinants (det=ad−bc → 5,0; ties to
   262's viz), la-dot-product-norms (dot → 0,9), c-derivative-definition (secant limit → 6.00), c-chain-rule (central diff
   vs analytic → 54 54). Byte-stable inject w/ round-trip guard. SELF-CORRECTION: first dropped a Riemann exercise into
   c-definite-integral-riemann which ALREADY had one (per-topic count hid the per-lesson location) → reverted, re-injected
   into code-free lessons, injector now refuses lessons with existing data-code. Verified: gate GREEN (20 verified);
   dump-dom widgets run (det→"5 0", chain→"54 54", "✓ matches"); smoke errs=0/kErr=0 (12). SW →v205.
   ✅ iter 263: **Finish keyboard-viz a11y: projection + ? overlay** (accessibility). Closed the two loose ends from 259: (1)
   la-projection now keyboard-operable (its b is scalars bx/by → getter/setter wrapper onto dragKeys, keeps drag clamp
   x∈[−3,5] y∈[−3,4]); (2) `?` overlay gains an "Interactive visualizations" group (Tab/arrows/Shift+arrows). All 5
   draggable widgets now keyboard-operable + discoverable. Verified: gate GREEN; dump-dom — projection tab=0, arrows move b
   (2.3,2.5)→(3,3), 20×→x clamps 5.0; `?` overlay has the viz group; smoke errs=0/kErr=0 (12). SW →v204.
   ✅ iter 262: **Determinant-as-signed-area visualizer — 57th widget** (visualizations). LA had fewest viz (7); determinants lesson
   only had the generic transform viz. New `la-determinant` (in la-determinants): drag the 2 columns of a 2×2 matrix →
   parallelogram area = |det|, sage(det>0)/rust(det<0)/collapses-to-line(det=0=singular); faint unit square; presets
   (Identity/Shear/Scale×2/Reflect/Singular). Keyboard-accessible via dragKeys (arrows=col1, Shift=col2) + role=img.
   app.js viz-complete fallback 56→57. Verified: gate GREEN (57 widgets); dump-dom note math across presets (det 5/0/1,
   keyboard→1.5); lesson embeds + renders; smoke errs=0/kErr=0 (12). SW →v203.
   ✅ iter 261: **Resume-reading position for long lessons** (UI/UX — step-back flagged this overdue). Saves per-lesson scroll depth
   (own `atlas.readPos` key, no save-shape change; capped 40) on the existing reading-progress rAF; reopening a part-read
   lesson shows a dismissible "⤓ Resume where you left off" pill that smooth-scrolls back. Not auto-scroll (jarring while
   KaTeX/viz settle); guarded (save >200px, offer >400px, skip if already scrolled, page-tall-enough check, 9s auto-dismiss,
   cleared on nav). SELF-CORRECTION: wired `offerResume(lid)` in renderLecture (param is `lesson.id`, not `lid`) → threw
   post-paint; caught via dump-dom step-through. Verified: gate GREEN; dump-dom + scrollTo spy — seeded 1200 → pill scrolls
   to 1200 then dismisses; empty/150px → no pill; CSS @keyframes entrance (base opacity:1); smoke errs=0/kErr=0 (12). SW →v202.
   ✅ iter 260: **5 deeper-dives on flagship hard concepts + step-back** (content). Step-back: 250–259 rotation healthy + varied,
   owner streak bug fixed (256); neglected = performance (no clean win) & UI/UX (last 244) — queued, neither broken.
   Ship: +5 "aha" deep-dives (35→40) on lessons that lacked one — dl-transformer (mix/think over residual stream),
   l-tokenization-bpe (BPE = greedy compression), rl-monte-carlo (MC vs TD: wait-for-truth vs trust-your-guess),
   ps-p-values (P(data|H0) not P(H0|data)), la-low-rank-pca (PCA = SVD of centered data). String.raw LaTeX, byte-stable
   inject w/ round-trip guard. Verified: gate GREEN; dump-dom each renders (katex 11/5/1/11/9, kErr=0, rawDollar=0);
   smoke errs=0/kErr=0 (12). SW →v201. BACKLOG: la-projection keyboard support (scalar bx/by, deferred from 259);
   performance lever (data parse/transfer) still open; UI/UX pass overdue.
   ✅ iter 259: **Keyboard-operable draggable-vector viz** (accessibility). The drag-only vector widgets were mouse/touch-only; added
   shared `VIZUtil.dragKeys(c, getItems, redraw)` — canvas tabindex=0 + gold focus ring, arrows nudge vector 1, Shift+arrows
   vector 2 (½-grid snap, ±7 clamp; getItems() survives preset reassignment). Applied to la-dot-product, la-vector-add,
   la-gram-schmidt (+ aria-labels mention the keys; vector-add gained role=img). Verified via --dump-dom (screenshots were
   black-PNG flaky): all 3 tabIndex=0+focusable, keys move the right vector (dot a→3.5/b→3, vector-add u/v, gram v1/v2);
   smoke errs=0/kErr=0 (12 routes). SW →v200. NOTE: la-projection drags scalar bx/by (not {x,y}) — keyboard TODO there.
   ✅ iter 258: **Two silent reward moments now celebrate** (gamification). ❄️ "Streak freeze earned!" toast at boot when a 7-day
   milestone grants a freeze (new freezeEarned() signal, only below the cap of 3); 🎯 "New best test score!" toast from
   the test result when % strictly beats every prior ≥5Q test (first-ever stays quiet; computed from tests history, no new
   state). No save-shape change. Verified: gate GREEN; node tests (freeze 6→7 signals once + not at cap; best-test logic 6
   cases); browser freeze toast shows on 6→7; smoke errs=0/kErr=0 (12 routes). SW →v199.
   ✅ iter 257: **Deepen inline glossary — algorithms + RL** (understandability). The two thinnest topics (11 each) → +8 each
   (glossary 117→133): algo (binary search, recursion, memoization, BST, heap, topological sort, shortest path, loop
   invariant); RL (discounted return, TD learning, SARSA, advantage function, actor-critic, off-policy, experience replay,
   eligibility trace). Now balanced 16–22 across topics. Skipped over-generic terms (return/advantage/stack). Verified:
   gate GREEN (lints defs + dups); glossary page renders 133; SARSA lesson wraps 6 inline tooltips w/ KaTeX popups; smoke
   errs=0/kErr=0 (12 routes). SW →v198.
   ✅ iter 256: **Fix: consistency strip matched to the streak** (bugfix — owner reported "streak squares always empty"). Root cause: streak
   counts app-opens (touchStreak/lastActive), strip lit only XP-days (activity>0) → kept-streak-but-no-XP days showed
   empty squares. Fix: new `activeDays` map (blank+load merge; backfill the current streak's N days on load so the strip
   instantly matches; touchStreak marks today every open incl. same-day). Strip lights on activity>0 OR activeDays. No
   XP/heatmap semantics change. Verified: gate GREEN; node test (5-streak/0-XP → last 5 lit, same-day re-mark, old save
   {}); browser 4-day/0-XP streak → last 4 squares lit (were empty); smoke errs=0/kErr=0 (12 routes). SW →v197.
   ✅ iter 255: **Policy-gradient (REINFORCE) visualizer — 56th widget** (visualizations). RL thinnest viz topic; new `rl-policy-gradient`
   in rl-policy-gradient-theorem (mirrors its one-step-bandit example): softmax over 3 actions (rewards −1/+2/+0.5),
   step/play does exact gradient ascent ∂J/∂θⱼ=πⱼ(Rⱼ−J), bars rise for +advantage (▲) / fall for −(▼), expected-return
   sparkline climbs. Deterministic; VIZUtil.loop; plain-HTML note. Verified: gate GREEN (56 widgets); 40 steps→B 98%,
   J=1.969→+2; smoke errs=0/kErr=0 (12 routes); 390px scales. app.js fallback →56. SW →v196.
   ✅ iter 254: **Adjustable new-cards-per-session pace** (new functionality). Daily Review's new-card intake was a fixed const (30);
   made it a Settings control (5–100) backed by new `newPerSession` state (blank+load, Number.isFinite clamp; old saves
   default 30). Review caps at Store.raw.newPerSession. Tunes the core SRS loop to the learner. Verified: gate GREEN; node
   test (default 30, clamps 999→100/1→5/NaN→30, old save→30); in-browser cap=8 → review shows 8 new; settings save →15 +
   toast (errs=0); smoke errs=0/kErr=0 (12 routes). SW →v195.
   ✅ iter 253: **Smoother entrance cascade + mobile re-verified** (animation/juice). `.reveal` stagger only covered nth-child(1–8);
   items 9+ inherited delay:0 and popped in at once (a double-beat) on content-rich pages (dashboard/Progress/Hall have
   15–18 reveals). Fixed: snappy .04s step through 14 items, nth-child(n+15) capped at .60s; reduced-motion still disables.
   Paired with a fresh 390px audit of the ~14 features since iter 239 (mod-nav, personal bests, forecast, lesson-stamp,
   gram-schmidt/dijkstra/dp viz) — all clean, nothing to fix. CSS-only. Verified: gate GREEN; computed delays climb
   (.08→.36→.44) + cap .60 past 14 (no delay:0 items); smoke errs=0/kErr=0 (12 routes); 390px dashboard+lesson clean. SW →v194.
   ✅ iter 252: **Five more deeper-dives on hard concepts** (content depth — owner's "keep improve the depth", last content 241).
   One per topic (~30→~35): DL Adam (momentum+RMSProp+bias correction), RL PPO clip (why a pessimistic bound — current
   policy collects the data), Algo greedy (exchange argument; knapsack breaks it), Calc convexity (local=global, ∇f=0
   sufficient), Prob independent-vs-uncorrelated (Y=X² counterexample, jointly-Gaussian exception). String.raw LaTeX;
   byte-stable inject + no-op guard; no save-shape change. Verified: gate GREEN (lints dive content); Adam dive 6 katex/
   kErr=0/rawDollar=0; smoke all 5 present, errs=0/kErr=0 (12 routes). SW →v193.
   ✅ iter 251: **Gram-Schmidt visualizer — 55th widget + focus-ring fix** (visualizations). LA had projection but not orthogonalization.
   New `la-gram-schmidt` in la-orthonormal-gram-schmidt: drag 2 vectors, keep u₁=v₁, subtract v₂'s projection (gold bar +
   dashed drop) → u₂ perpendicular (right-angle marker, live u₂·u₁=0); "normalize" → ê₁/ê₂ on unit circle. Deterministic.
   ALSO fixed an iter-248 regression: the focus-the-heading move painted a :focus-visible gold ring on the h2 after every
   nav — added `#app:focus, #app .page-head h2:focus { outline:none }` (focus still moves, ring gone). Verified: gate GREEN
   (55 widgets); default u₂·u₁=0 (v₁=(3,.5),v₂=(1.5,2.5)→u₂=(−.36,2.19)); normalize unit circle; h2 outlineStyle now none +
   still focused; smoke errs=0/kErr=0 (12 routes); 390px scales. app.js fallback →55. SW →v192.
   ✅ iter 250: **Step-back + whole-site health sweep + 2 gate guards** (workflow/dev-flow). ★250 reflection: 240–249 rotated well
   (workflow/content/viz×2/gamification×2/UI-UX/new-func/animation/accessibility — none starved); site measurably richer.
   Neglected: performance (deferred — minify breaks inject pipeline, lazy-load risky, parse is cached). Shipped: (1)
   comprehensive sweep of ALL 202 routes (148 lessons + 54 lab) → errs=0/kErr=0, zero problems anywhere; (2) gate guards —
   dangling internal `#/lesson/` links (0 today, future-proofs deep-dive cross-refs) + achievement reachability (loads
   store.js, every ACHIEVEMENT must be in an ACH_CATEGORY, no dead category refs). Negative-tested the achievement guard
   (orphan → FAIL exit 1; restore → GREEN). gate.js is dev-only → no SW bump, no app change.
   ✅ iter 249: **Code exercises reward XP + achievements** (gamification / new functionality). The 21 exercises gave only a ✓ — now
   solving one (output matches) awards +15 XP once (deduped via new `solvedCode` map; blank+load merge) + a toast, and
   unlocks 🧪 "It Runs!" (1) / ⌨️ "Code Adept" (10). Playground check() → onSolve callback; hydrateCode keys it by
   hash(lang|expected|code). Achievements 55→57 (Exploration category + progress map). Verified: gate GREEN; node test
   (+15 once, dedup on re-solve, unlocks at 1 & 10); end-to-end click Run → xp 0→15, solvedCode=1, code-solver unlocked,
   toast, pg-check ok (errs=0); Hall shows "It Runs!"; smoke errs=0/kErr=0 (12 routes). SW →v191.
   ✅ iter 248: **SPA focus management on route change** (accessibility — most overdue, last 234). Router updated title + scrolled top
   but never moved focus; keyboard/SR users were stranded on the removed element. Now after each view renders, focus moves
   to the new view's <h2> (fallback #app) so the page name is announced. Modal-guarded (intro/palette/levelup/shortcuts
   keep focus), focus({preventScroll:true}) so no scroll jump, tabindex=-1 so no visible ring on mouse nav. app.js only.
   Verified: gate GREEN; lesson→H2 "Vectors and Vector Operations", stats→"Your Progress", scrollTop=0, outlineStyle=none;
   modal guard holds (intro open → focusInsideIntro=true); all-routes 14/14 moved focus, errs=0/kErr=0. SW →v190.
   ✅ iter 247: **"You did it" lesson-complete celebration** (animation/juice — most overdue, last 237). The core action (mark complete,
   up to 148×) was flat; now a sage ✓ stamps center-screen (scale-pop + glow) and the button pops sage, escalating to the
   bigger 📗 module-complete confetti when a lesson finishes its module. New celebrateLessonDone(btn) (transient
   .lesson-stamp + .lesson-done-pop class); reduced-motion safe; no state/data change (app.js+css). Verified: gate GREEN;
   click adds stamp (✓, animationName=lessonStamp) + button pop + "✓ Completed" (errs=0); static render shows the glowing
   ✓; smoke errs=0/kErr=0 (12 routes). SW →v189.
   ✅ iter 246: **Notes export to Markdown** (new functionality — rotating off 4 recent viz). Notebook notes were trapped in
   localStorage; added "⬇ Export all as Markdown" on #/notes (shown only when notes exist): builds a clean .md (title +
   summary, grouped by subject in curriculum order, each note under its lesson ### heading), downloads as
   atlas-notes-<date>.md via the existing Blob path + revokeObjectURL + toast. No new state, app.js only. Verified: gate
   GREEN; clicking Export with 3 seeded notes produced the exact expected Markdown (Blob intercepted) + correct filename,
   errs=0; empty-state guard holds (no button w/o notes); smoke errs=0/kErr=0 (12 routes). SW →v188.
   ✅ iter 245: **Dijkstra's shortest-path visualizer — 54th widget** (visualizations). Graph-traversal viz only covers unweighted
   BFS/DFS; weighted shortest paths had none. New `algo-dijkstra` in a-shortest-paths-topo (after the worked example):
   6-node weighted graph from A, step/play/skip/reset settle the closest unsettled node (gold) and relax its edges
   (badges tick ∞→down), settled nodes sage, shortest-path-tree edges thicken sage, live note narrates each settle/relax.
   Run precomputed into per-settlement events; VIZUtil.loop (stopAll-safe); plain-HTML note. Verified: gate GREEN (54
   widgets); skip-to-end correct (A0 B3 C2 D8 E10 F13, tree A→C→B→D→E→F); mid-run settle-C relaxations correct
   (B4→3,D→10,E→12); smoke errs=0/kErr=0 (12 routes); 390px scales. app.js fallback →54. SW →v187.
   ✅ iter 244: **Keyboard lesson navigation [ / ]** (UI/UX). Step to prev/next lesson while reading (complements the iter-238 dot nav).
   Self-contained in studyKeys (parses route, prev/next from flatLessons); guarded: ignored mid-quiz (no nav when live
   choices exist), no-op at course boundaries, inherits input/modal guards. Documented in the ? overlay ("Lessons" group).
   app.js only — no CSS/data/state change. Verified: gate GREEN; ] advances + [ returns (errs=0); quiz-guard holds (4
   choices → hash unchanged); boundary holds (first lesson [ = no-op); overlay shows the group; smoke errs=0/kErr=0 (12
   routes). NOTE (content status): every lesson now has ≥2 examples — examples coverage complete, not a gap. SW →v186.
   ✅ iter 243: **Personal bests panel** (gamification — most overdue, last 233). Beat-your-record loop on the Progress page: 🔥 longest
   streak (+"at your peak!" tag), ⚡ best day XP, 🎯 best test %, 📅 days studied — gold-framed tiles. 3/4 computed from
   existing history; only longest streak needed new `maxStreak` (blank+load back-fill to max(maxStreak,streak); old saves
   load). Beating the streak record fires a "🏆 New record streak!" toast (new Store.streakRecord(), guarded ≥3d).
   Verified: gate GREEN; node test (6→7, maxStreak 7, streakRecord true, personalBests correct, back-fill); panel renders
   4 correct tiles (23/140/92%/7); smoke errs=0/kErr=0 (12 routes) 4 tiles; 390px reflows. SW →v185.
   ✅ iter 242: **Dynamic-programming visualizer — 53rd widget** (visualizations — rotating off content). Algorithms was the thinnest
   viz topic (6) and missing the DP pillar. New `algo-dp-editdistance` in a-dynamic-programming (§8 Edit Distance): the
   Levenshtein table (kitten→sitting) fills cell-by-cell (step/play/skip/reset), current cell gold + chosen source sage
   (diagonal-free on match, else 1+min top/left/diag), live note narrates each step, then the answer (3) is ringed and an
   optimal edit path traces back in violet with decoded ops. VIZUtil.loop (stopAll-safe); plain-HTML note. Verified: gate
   GREEN (53 widgets); skip-to-end correct full table+answer 3+backtrace; mid-step highlight+note correct; smoke
   errs=0/kErr=0 (12 routes); 390px scales. app.js fallback →53. SW →v184.
   ✅ iter 241: **Five deeper-dives on hard concepts** (content depth / understandability — owner's "keep improve the depth" ask).
   One per topic, breadth + difficulty (deep-dives ~25→~30): LA determinants (volume-scaling ⇒ det=0⟺singular,
   det(AB) multiplicativity), DL backprop (why reverse-mode: one loss, millions of params), RL Bellman (γ-contraction
   fixed point ⇒ convergence), LLM scaling (Chinchilla compute-optimal, ~20 tok/param), prob CIs (the procedure not the
   interval). String.raw LaTeX; byte-stable inject + no-op guard per file; no save-shape change. Verified: gate GREEN
   (now lints deep-dive content too); determinant dive 15 katex/kErr=0/rawDollar=0 (incl ⟺ display); smoke errs=0/kErr=0
   (12 routes), all 5 present. SW →v183.
   ✅ iter 240: **Step-back + stronger gate** (workflow/dev-flow). ★240 reflection: compass well-rotated across 230–239 (no area
   starved); site measurably richer (viz 50→52, code 14→21 all-topics, glossary 89→117, high-contrast, forecast, live flame,
   mod-nav). Neglected: performance (deferred — minify breaks inject pipeline, lazy-load risky) + workflow (addressed now).
   gate.js gains: (1) **runs every JS code-exercise** (emulates Playground runJS, asserts output===data-expected; 16
   verified/run — replaces the manual browser pg-check ritual; Python skipped, needs Pyodide); (2) **lints all 117 glossary
   defs** (parity/markdown) + dup-term check. Negative-tested (sabotaged expected → precise FAIL; restored → GREEN).
   Summary now "· 117 glossary · 16 code-exercises verified". No user-facing change → no SW bump.
   ✅ iter 239: **Deepen the inline glossary — +28 terms** (understandability). Glossary 89→117; the thin/jargon-dense topics got
   the most: LLM +13 (positional encoding, KV cache, beam search, nucleus sampling, in-context learning, chain-of-thought,
   scaling laws, LoRA, quantization, RAG, hallucination, autoregressive…), LA +9 (dot product, orthogonality, projection,
   column/null space, diagonalization, orthonormal basis, positive definite), calc +6 (continuity, critical/saddle points,
   directional derivative, Riemann sum, FTC). Powers inline hover-tooltips on first occurrence in prose. Injector guards
   even-$ parity + bans raw **. Verified: gate GREEN; glossary page renders 117; "dot product"/"projection" now wrap inline
   on the dot-product lesson with KaTeX-rendered popup math; smoke errs=0/kErr=0 (12 routes). SW →v182. (Skipped generic
   "Norm" — false-matches "batch norm".)
   ✅ iter 238: **In-module navigator + module breadcrumb** (UI/UX — last at 230). Lesson view now shows where you are within a unit:
   a jump-anywhere dot strip under the title (sage done / gold-ring current / empty todo, each a real link), a "<module> ·
   X/N" label, and the module name added to the breadcrumb. Pure orientation (reads lesson-done; no state change); a11y
   (nav aria-label, per-dot title/aria-current); print-hidden. Verified: gate GREEN; mid-module lesson dots
   ["done","done","cur","todo"], label "Foundations of Probability · 3/4", dot click navigates (errs=0); 390px wraps;
   smoke errs=0/kErr=0 (12 routes). SW →v181.
   ✅ iter 237: **The streak flame comes alive** (animation/juice — most-overdue lane, last at 228). Header 🔥 was a static emoji;
   now: ambient `flameFlicker`, intensity tiers by streak length (unlit/lit/hot≥7/blazing≥30/inferno≥100, set in
   renderChrome via data-tier guard), and a one-time `flameFlare` when today extends the streak (new `Store.streakJustUp()`
   signal from touchStreak, consumed in boot). Reduced-motion safe (global rule + flareStreak JS guard); no save-shape
   change. Verified: gate GREEN; node signal test PASS (5→6 true, consumed, same-day false); in-browser flicker+tiers
   apply, flare fires on yesterday→today (flareSeen=true, 40→41); smoke errs=0/kErr=0 (12 routes). SW →v180.
   ✅ iter 236: **Dot-product & angle visualizer — 52nd widget** (visualizations — rotating off content). LA was the thinnest topic
   (5 widgets) and lacked the dot product. New `la-dot-product` in la-dot-product-norms (had no viz): two draggable
   vectors, angle arc + a·b recolour by sign (sage acute / gold right-angle ⊥ / rust obtuse), b's scalar projection as a
   shaded bar that flips backwards past 90°, live a·b = aₓbₓ+a_yb_y = |a||b|cosθ + θ°. Presets Acute/Right/Obtuse/Aligned.
   Verified: gate GREEN (52 widgets); 3 sign cases exact (5.5/50° sage, 0/90° gold⊥, −4/117° rust); smoke errs=0/kErr=0
   (12 routes); 390px scales. app.js fallback →52. SW →v179.
   ✅ iter 235: **Runnable code in every topic — RL & LLM exercises** (examples / new functionality). Completes the active-coding
   milestone (RL & LLMs were the last two at zero): RL discounted return (forward Σγᵗrₜ vs backward Gₜ=rₜ+γGₜ₊₁, agree) +
   one Q-learning update (TD target/error/Q = 1.72/1.72/0.86); LLM softmax output head (sums to 1) + temperature & greedy
   decoding (0.844→0.481, greedy token 0). Coverage 17→21, **7/7 topics**. Deterministic; data-expected captured via runJS
   replay. Verified: gate GREEN; all 4 return pg-check ok errs=0 exact output; real component renders (unicode Σ/γᵗ/rₜ +
   `<` decoded); 390px mobile + new TOC section; smoke errs=0/kErr=0 (13 routes). SW →v178.
   ✅ iter 234: **High-contrast accessibility mode** (accessibility — rotating off gamification). Independent `data-contrast="high"` toggle
   layered on EITHER theme: deepens text/bg separation, brightens hairline borders (esp. low-contrast --ink-mute/--line),
   intensifies accents; +3px focus rings, solid-underlined inline links. Sidebar button (`#contrast-toggle`, aria-pressed)
   + ⌘K command, persisted in `atlas.contrast`. CSS = two var-override blocks (ink + parchment, identical token set so no
   leakage). Verified: toggle flips normal↔high + persists + label/aria update (errs=0); all 4 theme×contrast lesson
   renders correct + legibility visibly boosted; smoke errs=0/kErr=0 (13 routes) data-contrast=high; 390px mobile HC clean.
   SW →v177. Backlog item closed.
   ✅ iter 233: **7-day review forecast on the dashboard** (gamification / new functionality — rotating off content). Forward-looking
   companion to the 14-day consistency strip: a bar chart of how many started cards come due each of the next 7 days
   (today gold, rest rust, empty days a baseline), header "N due now · M more this week · K later". New pure
   `Store.reviewForecast(days)` bucketed from each card's existing `due` (no new state); bars sweep up via `sweepForecast()`
   (reduced-motion early-return); hidden until cards are in flight; role=img + aria-label. Verified: node unit test PASS
   (dueNow=1, days=[1,2,0,0,0,0,1], upcoming=4, beyond=1; empty store → hidden); gate GREEN; desktop+390px correct counts;
   smoke errs=0/kErr=0 (13 routes) forecast=present bars=7. SW →v176.
   ✅ iter 232: **Code exercises open in Probability & Statistics** (examples / new functionality — rotating off viz/UI). First 3
   runnable, self-checking JS exercises in a topic that had ZERO: expectation/variance (E[X]=1.90, Var=0.89, SD=0.9434),
   Bayes false-alarm trap (P(D|+)=0.1667 for a 99%-accurate test on a 1% disease), and the binomial PMF (sums to 1).
   Coverage 14→17 lessons. Deterministic (no Math.random) → exact headless check; data-expected captured by replaying the
   runJS console.log path. Verified: gate GREEN; all 3 return pg-check **ok** (multi-line data-expected round-trips),
   errs=0; real Playground renders (i<k decoded, unicode superscripts intact); 390px mobile legible + new TOC section;
   smoke errs=0/kErr=0/rawDollar=0 (13 routes). SW →v175. NEXT: extend code exercises to RL & LLMs (still zero).
   ✅ iter 231: **New viz `llm-causal-mask` — 51st widget** (visualizations — rotating off UI/UX). In l-multihead-and-causal-masking
   (had prose + KV-cache, no picture). 7×7 attention matrix over "The cat sat on the mat ." with a **mask toggle**
   (full bidirectional/BERT ↔ lower-triangular causal with ✕ on future cells) + **step** (reveal query rows L→R for
   autoregressive generation) + **all** reset; recency-biased softmax per allowed row. Shows why the whole matrix is
   computed at once under teacher forcing while inference fills one row at a time → the structural reason for the KV cache.
   Note is plain HTML (viz-note landmine). Verified: gate GREEN (**51 widgets**, embed resolves); smoke errs=0/kErr=0
   rawDollar=0 (12 routes); desktop masked+bidirectional screenshots correct; 390px mobile canvas scales + both notes
   correct. app.js viz-complete fallback `|| 50`→`|| 51`. SW →v174.
   ✅ iter 230: **Back-to-top button on long pages** (UI/UX — freshest lane). Floating gold ↑ button (bottom-right) fades in
   past ~600px scroll, smooth-scrolls to top (reduced-motion safe). Reuses the read-progress mechanism (same scrollingElement
   + rAF scroll handler; one global button; hidden on route change). Verified: gate GREEN; smoke errs=0/kErr=0 (10 routes)
   with toTopBtn=1; hidden-at-top correct; visual renders. NOTE: headless can't programmatically scroll the document
   (moved=0 on a 6662px page), so scroll-toggle/click-scroll aren't headless-exercisable — correct by parity with the
   shipping read-progress bar (identical mechanism). SW →v173. ★230 step-back: loop healthy, well-rotated, site mature.
   ✅ iter 229: **New viz `dl-signal-propagation` — 50th widget** (visualizations). In dl-initialization-and-vanishing-gradients
   (had deep-dive, no viz). Per-layer gain g → activation RMS across 24 layers on a log scale: g=1 flat, below vanishes,
   above explodes (exponential in depth). g slider + too-small/good/too-big presets; note shows g²⁴ + verdict. Math
   node-validated (g0.85→×0.020; g1.15→×28.6). Verified: gate GREEN (50 widgets); presets correct err=0; smoke errs=0/kErr=0
   (10 routes); mobile scales. SW →v172. ★ Lab milestone: 50 visualizations.
   ✅ iter 228: **Mastery/progress bars sweep up from 0 on load** (animation/juice — freshest lane, last animation iter 212).
   `sweepBars()` resets each `.mastery-fill` to 0% then restores its inline target on a double-rAF (the existing
   `transition:width .5s` animates it); reduced-motion safe; no new CSS. Module bars given `.mastery-fill` so they sweep too.
   Called in viewCourse + viewStats. Verified: gate GREEN; module bar 0% mid-sweep → target settled (err=0); smoke
   errs=0/kErr=0 (10 routes). Animation-only (bars unchanged, mobile-fine). SW →v171.
   ✅ iter 227: **Code exercises across LA/Calc/DL (11→14 lessons)** (new functionality / active practice — diversified the
   lane beyond algorithms). la-matrix-multiplication (matmul → "19 22 43 50"), c-definite-integral-riemann (midpoint Riemann
   → "0.3333"), dl-loss-functions (softmax → "0.665 0.245 0.090"). Byte-stable per-file inject. Verified: all 9 embedded JS
   exercises decoded+executed → output===expected (9/9); gate GREEN; softmax exercise browser run "✓ Output matches expected"
   err=0; smoke errs=0/kErr=0 (10 routes). Reuses Playground (no new mobile layout). SW →v170. (Code-exercise coverage 14/148,
   now spanning algorithms + core ML math.)
   ✅ iter 226: **New viz `rl-discounting`** (visualizations — RL was the most viz-thin topic). 49th widget, in rl-mdp-formalism
   after the discount-factor section. Bars = weight γᵗ of a future reward (geometric decay); effective-horizon marker at
   1/(1−γ); γ slider + myopic/far-sighted presets; note shows return G + horizon + verdict. Math node-validated (γ0.9→G9.28/h10;
   γ0.99→h100). Verified: gate GREEN (49); init+far-sighted notes correct err=0; smoke errs=0/kErr=0 (10 routes); mobile 390px
   scales. SW →v169. (RL viz now 5; topic balance improved.)
   ✅ iter 225: **14-day consistency strip on the dashboard** (gamification/habit · retention — fresh lane, diversifies from
   viz/deep-dives). Compact 14-cell strip under the today-strip (studied days filled, today ringed) + "studied K of last 14 ·
   today ✓ / keep your streak alive" nudge — reinforces the habit at the daily landing. Pure additive to viewDashboard from
   the existing activity map; small reusable CSS (flex cells, aspect-ratio). No new state. Verified: gate GREEN; strip renders
   14 cells/correct count/today ringed (err=0); smoke errs=0/kErr=0 (10 routes); mobile 390px flexes. SW →v168.
   ✅ iter 224: **Deeper dives for PS (2→4) — depth pass COMPLETE** (understandability). PS was the lone thin topic; added
   ps-conditional-expectation (E[Y|X] = best predictor = what regression learns; tower + total variance) and
   ps-law-of-large-numbers (LLN vs CLT; σ/√n shrinkage; finite-variance caveat). Every topic now ≥3 deep-dives (LA3 Calc3
   Algo3 DL4 LLM4 RL4 PS4). Byte-stable inject. Verified: gate GREEN (lints), cond-exp dive katex=22/kErr=0 + fires
   deep-thinker, smoke errs=0/kErr=0 (10 routes). SW →v167. (Deep-dive arc done — no need to return; future = viz/practice/delight.)
   ✅ iter 223: **Three more runnable code exercises (8→11 lessons)** (new functionality / active practice — diversifies from
   viz). Added JS exercises to a-trees-heaps (BST insert+inorder → "1 2 3 4 5 6 7 8 9"), a-mst-union-find (union-find
   components → "3"), a-string-algorithms (naive substring search → "0 7"). Byte-stable inject. Verified: all 6 embedded JS
   exercises decoded+executed as playground runJS → output===expected (6/6); gate GREEN; browser run shows "✓ Output matches
   expected" err=0; smoke errs=0/kErr=0 (10 routes). Reuses Playground (no new mobile layout). SW →v166.
   (Code-exercise coverage now 11/148 — more algorithm/DL lessons remain candidates.)
   ✅ iter 222: **New viz `algo-binary-search`** (visualizations — owner-loved; 4 iters since last viz). 48th widget, in
   a-binary-search (which already had a code exercise → now read+watch+code). Binary-vs-linear race on one sorted array:
   binary narrows a lo–hi window, linear scans, live comparison counts make O(log n) vs O(n) visceral. Counts node-validated
   (midpoint→binary 1; last→binary 5/linear 21). Verified: gate GREEN (48); race renders err=0 (binary 1 vs linear mid-scan);
   smoke errs=0/kErr=0 (10 routes); mobile 390px scales. SW →v165.
   ✅ iter 221: **Deeper dives for LA & Calc (1→3 each)** (understandability — completes raising the two thinnest topics).
   la-svd (rotate-stretch-rotate), la-four-subspaces-rank (the jigsaw), c-chain-rule (=backprop engine), c-gradient-directional
   (steepest ascent ⊥ level sets). Byte-stable inject across both files. Verified: gate GREEN (lints), four-subspaces dive
   katex=28/kErr=0 + fires deep-thinker, gradient dive katex=15/kErr=0, smoke errs=0/kErr=0 (10 routes). SW →v164.
   Deep-dive coverage now: LA 3, Calc 3, Algo 3, DL 4, LLM 4, RL 4, PS 2 — every topic ≥2; PS(2) is the lone thin one left.
   ✅ iter 220: **Per-module progress bars + module-completion celebration** (gamification/UI — fresh lane, last gamification
   iter 209). Course page module headers now show X/N done (✓ complete when finished) + a progress bar; completing a
   module's last lesson fires confetti + "📗 Module complete!" toast (guarded: once, multi-lesson modules only). Pure
   additive to viewCourse + lesson-complete handler; no new state/CSS. Verified: gate GREEN; seeded course page shows 5
   bars (Foundations ✓ / Common Distributions 2/5) err=0; completing last lesson fires confetti+toast err=0; smoke
   errs=0/kErr=0 (10 routes); mobile 390px legible. SW →v163. ★220 step-back: loop healthy; compass well-rotated; site mature.
   ✅ iter 219: **Runnable in-lesson coding exercises (5→8 lessons)** (new functionality / active practice — diversifies from
   viz/deep-dives). The `data-code` self-checking editor reached only 5 lessons; added JS exercises to a-divide-and-conquer
   (merge sort → "1 2 3 4 5 7 8 9"), a-graph-representations-traversal (BFS → "A B C D E F"), a-greedy (activity selection
   → "4"). JS chosen so it's verifiable headless (no Pyodide). Byte-stable inject (code HTML-escaped). Verified: each block
   decoded+executed as playground runJS → output===expected (3/3); gate GREEN; browser run shows "✓ Output matches
   expected" (err=0); smoke errs=0/kErr=0 (10 routes). Reuses existing Playground (no new mobile layout). SW →v162.
   (Code-exercise coverage now 8/148 — more algorithm/DL lessons are candidates for future hands-on exercises.)
   ✅ iter 218: **New viz `algo-hashing`** (visualizations — owner-loved; 3 iters since last viz). The 47th widget, in
   `a-hash-tables` (no viz). Insert keys → chained buckets colored by collision severity; +1/+8/Find/Reset + table-size
   slider; live load factor α=n/m, longest chain, expected lookup ≈1+α/2. Teaches "why O(1) needs low α." Verified: gate
   GREEN (47); seed+insert+find shows n=25/m=11/α=2.27/found-in-1-comp err=0; smoke errs=0/kErr=0 (10 routes); mobile 390px
   scales. SW →v161.
   ✅ iter 217: **Deeper dives for RL (1→4)** (understandability — owner's depth love; diversifies from recent viz/new-func).
   why-VI-converges (Bellman γ-contraction + Banach, in rl-value-iteration), bootstrapping & TD-vs-MC bias/variance
   (rl-td-learning), on-policy-vs-off-policy + cliff-walking (rl-sarsa-qlearning). Byte-stable inject. Verified: gate GREEN
   (lints), VI dive katex=25/kErr=0 + fires deep-thinker, smoke errs=0/kErr=0 (10 routes). SW →v160. (Deep-dive coverage
   now: Algo 3, DL 4, LLM 4, RL 4, PS 2, LA 1, Calc 1 — LA & Calc are the thin ones left.)
   ✅ iter 216: **Recent-test performance trend on the Progress page** (new functionality/UI · retention — deliberate non-viz
   diversification per the iter-215 owner note). The `tests` array stored scores but only the count was shown; added a
   "Recent tests" section (avg + best + last 10 as color-coded score bars). Pure additive (existing data + `.mastery-bar`
   + tokens; no new state/CSS). Verified: gate GREEN; seeded render avg 80%/best 100% color-coded (err=0); empty-tests case
   omits the section cleanly; smoke errs=0/kErr=0 (10 routes); mobile 390px legible. SW →v159.
   NOTE/backlog (a11y): the interactive canvas viz (la-vector-add, la-eigen, calc-derivative, la-projection, graph-traversal
   node-click, ps-covariance-scatter…) are mouse/touch-only — no keyboard path. A dedicated a11y arc should add keyboard
   operability (focusable canvas + arrow/Enter handlers, or slider/button alternatives). Too broad for one iter; queued.
   ✅ iter 215: **New viz `la-projection`** (visualizations — owner-loved; topic diversity: LA not visualized in many iters;
   214 wasn't viz). The 46th widget, in `la-projection-least-squares` (no viz). Drag target b → its projection p (closest
   point on span(a)) + perpendicular residual e with right-angle marker; live aᵀe≈0 (normal equation) + |e|. The geometry
   behind least squares/regression. Math validated in node (aᵀe=0, |e|=grid-min). Verified: gate GREEN (46), init paint
   p=(2.84,1.14) err=0, drag b→(-0.5,3.2) p=(0.67,0.27) err=0, smoke errs=0/kErr=0 (10 routes), mobile 390px scales. SW →v158.
   ✅ iter 214: **Deeper dives for LLM (1→4) + homework celebration fix** (understandability · correctness). LLM had only
   1 deep-dive; added why-attention-÷√dₖ (multihead), why-KV-cache-is-O(n²) (inference-efficiency), how-DPO-drops-the-
   reward-model (rlhf). Byte-stable inject (String.raw). Also fixed the homework "Show solution" handler — it was the
   one XP path missing `flushAchievements()`, so Homework-Hero unlocked silently and the iter-212 daily-goal celebration
   never fired from homework. Verified: gate GREEN (lints), √dₖ dive katex=23/kErr=0 + fires deep-thinker, DPO dive
   kErr=0, smoke errs=0/kErr=0 (11 routes). SW →v157.
   ✅ iter 213: **New viz `calc-ftc-accumulation`** (visualizations — owner-loved; anti-monotony, last viz iter 211). The
   45th widget, embedded in `c-fundamental-theorem` (the FTC had no viz). Two panels: top = integrand f with signed area
   shaded to a sweeping x; bottom = accumulation A(x)=∫f with a tangent whose slope always = f(x), making A′(x)=f(x)
   visible. Play sweep + slider + integrand select (bump/sine/line). Cumulative-trapezoid integral; math validated vs
   antiderivatives + A′≈f<1e-3 in node. Verified: gate GREEN (45), init/sine screenshots err=0 (A(0)=2.66 slope=3.00;
   A(-1.5)=-2.01 falling), smoke errs=0/kErr=0 (10 routes), mobile 390px scales. SW →v156.
   ✅ iter 212: **"Daily goal reached!" celebration** (animation/juice · retention). Crossing the daily XP goal was silent
   (static text on next dashboard visit only); now the instant today's XP crosses the goal → confetti + toast, rewarding
   the come-back habit when it happens. `addXP` detects the once-per-day crossing → transient `_goalJustReached` →
   `flushAchievements()` (universal XP hook) fires it. New state field `goalCelebrated` (state-safe blank()+load()).
   Verified: node tests (fires once, never re-fires, old saves load, no false-positive), browser E2E (seed 49 XP, grade
   a card → confetti + toast, err=0), smoke errs=0/kErr=0 (14 routes). SW →v155.
   ✅ iter 211: **New viz `algo-graph-traversal`** (visualizations — owner-loved; anti-monotony, last viz iter 207). The
   44th widget, embedded in `a-graph-representations-traversal` (the whole graph module had 0 viz). BFS (queue) vs DFS
   (stack) on a 9-node graph: animated frontier, state-colored + visit-numbered nodes, lit discovery-tree edges, a live
   queue/stack panel with the next-to-take cell highlighted, click-a-node-to-restart. BFS order A B C D E F G H I; DFS
   A D G I H E F C B (validated vs node sim). Verified: gate GREEN (44), init/BFS/DFS/click screenshots err=0, smoke
   errs=0/kErr=0 (10 routes), mobile 390px scales. SW →v154.
   ✅ iter 210: **Deeper dives for Algorithms** (understandability — owner's "depth/hard-concept" love). Algorithms was the
   only subject with 0 deep-dives; added 3 (`a-dynamic-programming` = memoized recomputation; `a-amortized-analysis` =
   the banker's $O(1)$ append argument; `a-recurrences-master-theorem` = read $n\log n$ off the recursion tree). Byte-stable
   inject (String.raw LaTeX); pure content. Verified: gate GREEN, DP dive katex=14/kErr=0/errs=0 + fires deep-thinker,
   recurrences dive katex=20/kErr=0, smoke errs=0. SW →v153. (All 7 subjects now have deep-dives.)
   ✅ iter 209: **5 endgame achievements** (gamification — owner's most-repeated ask, untouched since iter 120). Ladders
   had stopped short of the complete codex; added 🗻 Summit (master 100 concepts), 🎇 Year of Fire (365-day streak),
   🌠 Living Legend (5,000 correct), 💫 Luminary (100k XP), 🏵️ Grand Examiner (100% on a 40Q test). 50→55. Fully wired
   (unlock conditions in store.js beside existing checks; 4 metric ones in achProgressMap for live bars; all 5 in
   ACH_CATEGORIES). No new state. Verified: consistency (55, all categorized, no dupes), page renders all 5 w/ correct
   bars (err=0), smoke errs=0/kErr=0, 390px legible. SW →v152.
   ✅ iter 208: **Quiz results = momentum + remediation hub** (UI/UX · functionality). The per-lesson quiz finish screen
   was a dead end (score + lone "Retry"). Now: **Redrill the N you missed** (mastery-mode re-queue of exactly the wrong
   ones — the owner's "think again until you pass" loop, previously only on the *test* results screen) + **Next lesson →**
   for forward momentum. `renderQuiz` now takes course+next; local `missedIdx` tracking; no new state. Verified: results
   screen all 3 CTAs (err=0), redrill launches mastery drill on the 16 missed (err=0), smoke errs=0/kErr=0, 390px wraps.
   SW →v151.
   ✅ iter 207: **New viz `dl-gan-training`** (visualizations — first non-content move after the arc completed). The
   43rd widget, embedded in the GANs lesson (which had NO viz). Generator (orange) vs optimal discriminator D=p_data/
   (p_data+p_g) (purple) vs real data (green); Play steps the alternating game → generator converges onto the data and
   D flattens to 0.5 (equilibrium, auto-stops); two-mode toggle demonstrates mode collapse (single Gaussian covers one
   peak, D stays confident on the other). Faithful: analytic optimal D + real gradient ascent on the generator's fool-D
   objective (validated convergence in node first). Verified: gate GREEN (43 widgets); 3 screenshots (init/equilibrium/
   collapse) all err=0; all-routes errs=0/kErr=0 (14 routes); mobile 390px scales. SW →v150.
   ✅ iter 206: MCQ arc → **PS·Hypothesis-Testing 12→16** (all 4 lessons — testing logic, p-values, errors & power,
   t-tests; +16, bank →2,368). Adversarial ALL 16 PASS (arithmetic re-checked: one-sided z=−2.0<−1.645; 20×0.05=1
   expected false positives; one-sided p=P(Z>1.75)≈0.04; two-sample SE=√(s₁²/n₁+s₂²/n₂)); each new batch balanced
   0/1/2/3 with distinct patterns ([2,1,3,0],[0,3,1,2],[3,0,2,1],[1,2,0,3]); byte-stable inject (no-op guard PASS);
   gate GREEN (render-hazard lints clear); p-values quiz (the money/percentage landmine lesson) advanced through new
   Qs render MAX kErr=0 / raw$=0 (screenshotted); all-routes errs=0/kErr=0 (16 routes); mobile 390px legible (Quiz
   badge "16"); SW →v149. **★★★ PS COMPLETE — all 5 modules / 23 lessons at 16. THIS COMPLETES THE ENTIRE 12→16 ARC:
   all 148 lessons across all 7 topics now at 16 MCQs (bank 2,368).** Loop now returns to bolder broad-compass moves.
   ✅ iter 205: MCQ arc → **PS·Inference/Estimation 12→16** (all 4 lessons — LLN, sampling distributions/standard error,
   point estimation/bias-variance, confidence intervals; +16, bank →2,352). Adversarial ALL 16 PASS (arithmetic
   re-checked); positions balanced 0/1/2/3; gate GREEN (lints clear); Sampling+CI quizzes render "of 16" kErr=0
   (inside-math money confirmed by screenshot); all-routes errs=0; SW →v148. **PS now 4/5 modules** — only
   **Hypothesis-Testing** remains to COMPLETE THE WHOLE 12→16 ARC. (2nd content iter in a row — deliberate push to
   finish the owner's near-complete #1 ask; non-content surfaces are at a maturity plateau.)
   ✅ iter 204: MCQ arc → **PS·Joint 12→16** (all 3 lessons — joint distributions/marginals/independence, covariance/
   correlation, conditional expectation/tower; +12, bank →2,336). Adversarial ALL 12 PASS (arithmetic re-checked);
   positions balanced 0/1/2/3; byte-stable inject; gate GREEN (render-hazard lints clear); Cov+CondExp quizzes render
   "of 16" rawDollars=0 kErr=0; all-routes errs=0; SW →v147. **PS now 3/5 modules.** REMAINING: PS Inference/Estimation,
   Hypothesis-Testing.
   ✅ iter 203: **New viz `ps-binomial-poisson`** (visualizations — non-content; pairs with iter-202). The 42nd widget:
   Binomial PMF bar chart (n,p sliders), mean-np line, live mean/var/σ, + a Poisson(np) overlay showing the law of
   rare events. Filled the gap — the discrete-distribution lessons had no viz. Embedded in ps-bernoulli-binomial.
   PMFs via stable recurrences (sum to 1.000000); gate GREEN (42 widgets, data-viz id resolves); renders+interactive,
   390px legible, all-routes errs=0; SW →v146. (Viz no longer over-represented — last ~6 non-content slots were not viz.)
   ✅ iter 202: MCQ arc → **PS·Distributions 12→16** (all 5 lessons — Bernoulli/Binomial, Poisson, Geometric/waiting,
   Uniform/Exponential, Normal; +20, bank →2,324). Adversarial ALL 20 PASS (arithmetic re-checked); positions balanced
   0/1/2/3; byte-stable inject; gate GREEN incl. new render-hazard lints (cleared all 20); Poisson+Normal quizzes
   render "of 16" rawDollars=0 kErr=0; all-routes errs=0; SW →v145. **PS now 2/5 modules.** REMAINING: PS Joint,
   Inference/Estimation, Hypothesis-Testing.
   ✅ iter 201: **Corpus render-hazard audit + permanent gate lints** (workflow/quality — non-content). Whole-corpus
   static scan (17,964 strings) for silent render-wrong patterns; found+fixed 3 (a `**markdown**` MCQ stem → `<strong>`;
   2 bare `$500` money → `\$`). Added `gate.js` lints: odd unescaped-`$` parity + raw `**`/`__` outside code/math —
   the bug classes that render wrong WITHOUT a KaTeX error (iter-189/200/52). Self-tested, zero false positives; gate
   GREEN; no new MCQs (bank 2,304); SW →v144.
   ✅ iter 200: MCQ arc → **PS·Foundations 12→16** (the FINAL topic opens; +16, bank →2,304) **+ FIX money-`\$` math
   garble** (broken-wins, surfaced while verifying). 4 PS lessons (sample-spaces/axioms, conditional/Bayes, random
   vars, expectation/variance) adversarial ALL 16 PASS, balanced. Bug: bare `\$` in prose mis-paired with the next
   real `$…$` → garbled math; extended boot `escapeMathLt` to rewrite outside-math `\$`→`$\$$` (REAL-bad=0; 6 wrapped,
   ~26 inside-math `\$` preserved). EXPVAR quiz/lecture + algorithms lecture render clean; all-routes errs=0; SW →v143.
   **ARC: 6/7 topics done; Prob & Stats now 1/5 modules.** REMAINING: PS Distributions, Joint, Inference, Testing.
   ✅ iter 199: **Dashboard topic cards show mastery, not just completion** (UI/UX — non-content). Each Topics-grid
   card now has a "N% mastered" readout (decay-aware `topicMastery`, mastery-level-colored dot) under the "N/M done"
   bar — so completion no longer overstates knowledge. No new state. Verified: seeded LA→"5% mastered", untouched→
   "not started"; errs=0; 390px clean; SW →v142.
   ✅ iter 198: MCQ arc → **LLM·Applications 12→16** (RAG/tools, hallucination/eval, safety/frontier; +12, bank
   →2,288). **★★ LLM TOPIC COMPLETE** — all 19 LLM lessons / 6 modules at 16. Adversarial ALL 12 PASS; positions
   balanced 0/1/2/3; byte-stable inject; RAG + safety quizzes render "of 16" rawDollars=0 kErr=0; all-routes errs=0;
   SW →v141. **ARC: 6/7 topics done** (Algo/LA/Calc/DL/RL/LLM) — only **Probability & Statistics** remains to finish
   the whole 12→16 arc (5 modules: Foundations, Distributions, Joint, Inference/Estimation, Hypothesis-Testing).
   ✅ iter 197: **Scope-aware Test setup** (UI/UX — non-content). "Spawn a Test" now shows a live "N questions
   available" readout that updates per scope (Everything→2,276, LLMs→292, etc.), notes when length will be clamped to
   the pool, and disables Start with a warning when a scope is too thin (<3 q). Shared `scopedPool()`; aria-live.
   Verified: all scope states correct, clamp message, errs=0, 390px legible; SW →v140.
   ✅ iter 196: MCQ arc → **LLM·Inference 12→16** (all 3 lessons — decoding/sampling, prompting/ICL/CoT,
   inference-efficiency; +12, bank →2,276). Adversarial ALL 12 PASS; positions balanced 0/1/2/3; byte-stable inject;
   decode + inf-efficiency quizzes render "of 16" rawDollars=0 kErr=0; all-routes errs=0; SW →v139. **LLM now 5/6
   modules at 16** — only **Applications** remains. ARC REMAINING: LLM·Applications, then Probability & Statistics.
   ✅ iter 195: **"Keep it fresh" made actionable** (new functionality / retention — non-content). Closes the iter-191
   loop: dashboard card got a **↻ Quick refresh** CTA + new `#/refresh` route running a mastery drill from the fading
   lessons' MCQs; correct answers `bumpMastery` (resets the decay clock) so refreshed concepts leave the fading band.
   No new state. Verified: seeded→"refresh all 2", drill draws from fading lessons; empty→"Nothing fading ✨";
   all-routes errs=0; 390px CTA full-width; SW →v138.
   ✅ iter 194: MCQ arc → **LLM·Alignment 12→16** (all 3 lessons — SFT/instruction-tuning, RLHF/reward-models/DPO,
   PEFT/LoRA; +12, bank →2,264). Adversarial ALL 12 PASS; positions balanced 0/1/2/3; byte-stable inject; RLHF + LoRA
   quizzes render "of 16" rawDollars=0 kErr=0; all-routes errs=0; SW →v137. **LLM now 4/6 modules at 16**
   (Foundations✓, Transformer✓, Training✓, Alignment✓). ARC REMAINING: LLM (Inference, Applications), Probability & Stats.
   ✅ iter 193: **Lab gallery searchable + explored-progress** (UI/UX — non-content rebalance). 41-widget grid got a
   "N of 41 explored" bar (from `vizSeen`), live search (title/blurb/lesson/topic), an All/Unexplored filter, and a
   "✓ explored" marker + sage border per opened widget — navigable, completable, feeds *Full Spectrum*. Client-side
   over the existing render, no new state. Verified: seeded→1/41 + marker; search "gradient"→5; Unexplored→40/41;
   fresh→0/41; all-routes errs=0; 390px legible; SW →v136.
   ✅ iter 192: MCQ arc → **LLM·Training 12→16** (all 3 lessons — pretraining objective/data/compute, AdamW/schedules/
   stability, scaling laws; +12, bank →2,252). Adversarial ALL 12 PASS; positions balanced 0/1/2/3; byte-stable inject;
   opt + scaling quizzes render "of 16" rawDollars=0 kErr=0; all-routes errs=0; SW →v135. **LLM now 3/6 modules at 16**
   (Foundations✓, Transformer✓, Training✓). ARC REMAINING: LLM (Alignment, Inference, Applications), Probability & Stats.
   ✅ iter 191: **"Keep it fresh" fading-mastery surface** (new functionality / retention — non-content rebalance).
   `Store.fadingConcepts()` surfaces concepts once learned well (stored `s≥0.7`) now decayed into [0.55,0.8) — the
   spacing-effect "refresh before you forget" gap that `weakSpots()` (eff<0.55, reactive) missed. Sage dashboard card,
   no new state (reads `state.mastery`). Verified: shows fading (62/70/71%), excludes mastered(95%)+weak-spot(49%);
   empty for new users; all-routes errs=0; 390px legible; SW →v134.
   ✅ iter 190: MCQ arc → **LLM·Transformer 12→16** (all 4 lessons — self-attention, multihead+masking, the block,
   positional-encoding; +16, bank →2,240). The heart of the course. Adversarial ALL 16 PASS; positions balanced
   0/1/2/3 (distinct per-lesson patterns); byte-stable inject; self-attn + pos-enc quizzes render "of 16" rawDollars=0
   kErr=0; all-routes errs=0; SW →v133. **LLM now 2/6 modules at 16** (Foundations✓, Transformer✓).
   ARC REMAINING: LLMs (4 modules: Training, Alignment, Inference, Applications), Probability & Statistics.
   ✅ iter 189: **FIX (broken-wins)** — math containing a literal `<`+letter (e.g. `x_{<t}`) was truncated site-wide
   (HTML tokenizer ate it as a tag start → raw `$` showed; 621 `<` across 332 strings, heaviest in LLM/DL).
   `escapeMathLt` + boot-time `normalizeMath()` in app.js escape `<`→`&lt;` *inside math spans only* (in-memory; data
   files unchanged). + MCQ arc → **LLM·Foundations 12→16** (all 3 lessons, +12, bank →2,224); 6th topic OPENED.
   Adversarial ALL PASS; positions balanced; lecture rawDollars 13→0, quiz 3→0; multi-topic + all-routes errs=0; SW →v132.
   ARC REMAINING: LLMs (5 modules left), Probability & Statistics.
   ✅ iter 188: 4 endgame achievements (gamification — owner-loved; non-content; 46→50): 📕 Centenarian (100 lessons),
   🏆 Marksman (2,000 correct), 🗿 Savant (50 concepts mastered), 🔬 Full Spectrum (open every viz — threshold reads
   live VIZ_CATALOG). No new state (reuse existing counters → prior saves load). Node test: count 50, unlocks fire,
   backward-compat ✓; Hall renders all 4, "0 of 50", errs=0; SW →v131.
   ✅ iter 187: MCQ arc → Reinforcement Learning·Advanced 12→16 (+12, bank →2,212). All 3 lessons (model-based/offline/
   imitation). ★★ RL COMPLETE — all 20 RL lessons / 7 modules at 16. Arc has finished 5/7 topics (Algo/LA/Calc/DL/RL).
   Adversarial agent ALL PASS; positions balanced 3/3/3/3 (distinct patterns); render "of 16" errs=0; SW →v130.
   ARC REMAINING: LLMs, Probability & Statistics.
   ✅ iter 186: Multi-armed bandit viz (`rl-bandit`, **41st widget**, visualizations — non-content; pairs w/ iter-185
   exploration lesson which had no viz). 5 arms, strategy select (ε-greedy/UCB/greedy) + ε slider + Pull/Reset; arm
   est-vs-true bars + cumulative-regret curve. Honest note (no false "UCB wins"; multi-seed study showed greedy=high
   variance, UCB=consistent). Caught+fixed a `select` shadowing VIZUtil.select bug. gate ALL GREEN · 41 widgets; lab
   render errs=0; embed host+canvas; 390px good; SW →v129. (Note: viz now 5 of last ~13 non-content slots — diversify next.)
   ✅ iter 185: MCQ arc → Reinforcement Learning·Practice & Frontiers 12→16 (+12, bank →2,200 ★). All 3 lessons
   (exploration/practical-rl/connections-frontiers). RL 6/7 modules — only Advanced left. Adversarial agent ALL PASS;
   positions balanced 3/3/3/3 (distinct patterns); render "of 16" errs=0; SW →v128. RL REMAINING (arc): advanced(3).
   Then LLMs, Prob & Stats.
   ✅ iter 184: Honest "cards due" + capped new-card Daily Review (UI/UX+correctness — non-content). 390px mobile audit
   (6 complex views) = mobile solid; surfaced a real bug: fresh profile showed "887 cards due" & review queued all 889.
   Fix: cardState() new/due/later + stats.reviewDue; dashboard/CTA/palette use reviewDue (fresh=0); Daily Review =
   due reviews + capped 30 new/session. Node logic + browser verified (fresh: cardsDue=0, deck=30); smoke errs=0; SW
   →v127. NOTE: mobile confirmed clean across labs/palette/map/test/dashboard.
   ✅ iter 183: MCQ arc → Reinforcement Learning·Policy Gradient 12→16 (+12, bank →2,188). All 3 lessons (policy-
   gradient-theorem/actor-critic/trpo-ppo). RL 5/7 modules. Adversarial agent ALL PASS; positions balanced 3/3/3/3
   (distinct patterns); render "of 16" errs=0; SW →v126. RL REMAINING (arc): practice-frontiers(3), advanced(3).
   Then LLMs, Prob & Stats.
   ✅ iter 182: De-skew answer positions across the last 9 biased lessons (workflow/content-quality — non-content).
   Correctness-preserving reorder (correct-choice text unchanged, answer index updated, asserted) of 81 MCQs in RL/LLM/
   PS; position-referencing MCQs skipped + edge cases hand-reviewed. ★ The gate's long-standing answer-position-bias
   note is now GONE (every lesson ≤33%/index). Gate GREEN; de-skewed quizzes render errs=0; smoke errs=0; SW →v125.
   ✅ iter 181: MCQ arc → Reinforcement Learning·Function Approximation 12→16 (+8, bank →2,176). Both lessons (value-
   approximation/dqn). RL 4/7 modules. Adversarial agent ALL PASS (Mnih-2015 DQN architecture confirmed); positions
   balanced 2/2/2/2 (distinct patterns); render "of 16" errs=0; SW →v124. RL REMAINING (arc): policy-gradient(3),
   practice-frontiers(3), advanced(3). Then LLMs, Prob & Stats.
   ✅ iter 180 (★180): Modal focus management (accessibility — non-content; a11y last touched iter 160). Shared
   `modalA11y()` helper gives the 4 overlays (palette/tour/level-up/shortcuts) role=dialog+aria-modal, focus-in,
   Tab-trap, and focus-restore-to-opener. Headless focus test: palette+shortcuts role/aria-modal/focus-in/esc-close/
   focus-restored all ✓; Tab trapped; smoke errs=0; no visual change; SW →v123. ★180 reflection in CHANGELOG (loop
   healthy; DL complete, RL 3/7; thin: workflow, mobile, perf=fine).
   ✅ iter 179: MCQ arc → Reinforcement Learning·Model-Free Prediction 12→16 (+16, bank →2,168). All 4 lessons (monte-
   carlo/td-learning/sarsa-qlearning/eligibility-traces). RL 3/7 modules. Adversarial agent ALL PASS; positions
   balanced 4/4/4/4 (distinct patterns); render "of 16" errs=0; SW →v122. RL REMAINING (arc): function-approximation(2),
   policy-gradient(3), practice-frontiers(3), advanced(3). Then LLMs, Prob & Stats.
   ✅ iter 178: TD-vs-Monte-Carlo viz (`rl-td-mc`, **40th widget**, visualizations — non-content; pairs w/ upcoming
   model-free-prediction module). Sutton & Barto 5-state random walk; Run-episodes plays TD(0) (gold) + MC (sage) vs
   true 1/6…5/6 (dashed) with live RMS. Embedded in `rl-td-learning`. node sim confirms RMS→TD .044/MC .086 @100ep;
   gate ALL GREEN · 40 widgets; lab Run-100 drives RMS .236→.079 errs=0; lesson embed host+canvas; 390px good; SW →v121.
   ✅ iter 177: MCQ arc → Reinforcement Learning·Dynamic Programming 12→16 (+8, bank →2,152). Both lessons (policy-
   iteration/value-iteration). RL 2/7 modules. Adversarial agent ALL PASS; positions balanced 2/2/2/2 (distinct
   patterns); render "of 16" errs=0; SW →v120. RL REMAINING (arc): model-free-prediction(4), function-approximation(2),
   policy-gradient(3), practice-frontiers(3), advanced(3). Then LLMs, Prob & Stats.
   ✅ iter 176: Glossary expansion +14 ML terms (understandability — non-content; owner's hard-concept-support ask):
   cross-entropy, KL divergence, learning rate, dropout, batch/layer norm, logit, epoch, receptive field, gradient
   clipping, mixed precision, maximum likelihood, perplexity, Markov property (75→89). New terms auto-wrap as inline
   tooltips across the dense DL/LLM/RL lectures. Chose specific/unambiguous terms (no generic/overlap mis-wraps).
   89 terms no-dups; lesson tooltips wrap+render kErr=0; glossary page renders math; smoke errs=0; SW →v119.
   ✅ iter 175: MCQ arc → Reinforcement Learning·Foundations 12→16 (+12, bank →2,144). 5th TOPIC OPENED. All 3 lessons
   (what-is-rl/mdp-formalism/policies-values). RL 1/7 modules. Adversarial agent ALL PASS; positions balanced 3/3/3/3
   (distinct patterns); render "of 16" errs=0; SW →v118. Arc: 4 topics complete (Algo/LA/Calc/DL), RL opened.
   RL REMAINING (arc): dynamic-programming(2), model-free-prediction(4), function-approximation(2), policy-gradient(3),
   practice-frontiers(3), advanced(3). Then LLMs, Prob & Stats.
   ✅ iter 174: Cascade count-up on the Progress page (animations/juice — non-content). The celebration page's numbers
   (hero stats + 12 activity tiles + mastery distribution) now count up from zero in a capped stagger on landing.
   Generalized countUp(el,delay) (backward-compat); reduced-motion shows real values instantly. errs=0; dashboard/
   result count-ups still work; reduced-motion desktop+390px screenshots good; SW →v117.
   ✅ iter 173: MCQ arc → Deep Learning·Generative Models 12→16 (+12, bank →2,132). All 3 lessons (autoencoders-vae/
   gans/diffusion). ★★ DEEP LEARNING COMPLETE — all 22 DL lessons / 7 modules at 16. Arc has finished 4/7 topics
   (Algorithms, LA, Calculus, DL). Adversarial agent ALL PASS; positions balanced 3/3/3/3 (distinct patterns); render
   "of 16" errs=0; SW →v116. ARC REMAINING: Reinforcement Learning, LLMs, Probability & Statistics.
   ✅ iter 172: KL-divergence viz (`dl-kl-divergence`, **39th widget**, visualizations — non-content). Adjustable
   Gaussian posterior q vs fixed prior N(0,1); live KL(q‖p) (the VAE regularizer) + KL(p‖q) asymmetry; "match the
   prior" button drives KL→0 (closed-form, no trained model). Embedded in `dl-autoencoders-vae` (generative module).
   gate ALL GREEN · 39 widgets; lab+lesson render errs=0, rawDollars=0, match-prior→KL=0; desktop+390px good; SW →v115.
   ✅ iter 171: MCQ arc → Deep Learning·Transformers 12→16 (+12, bank →2,120). All 3 lessons (architecture/
   pretraining-finetuning/practical-training). ★ DL 6/7 modules at 16 — only Generative Models remains. Adversarial
   agent ALL PASS; positions balanced 3/3/3/3 (distinct patterns); render "of 16" errs=0; SW →v114.
   DL REMAINING (arc): generative(3). Then RL/LLM/PS.
   ✅ iter 170 (★170): Reading-progress bar for long lessons (UI/UX + animations — non-content). Height-activated
   (shows only when page scrollable >400px), single rAF-throttled scroll/resize listener + per-route recompute, lives
   outside #app, reduced-motion safe, aria-hidden. errs=0 across 8 routes; activation verified (scrollMax=7099→on);
   forced-fill desktop+390px screenshots good. SW →v113. ★170 reflection in CHANGELOG (loop healthy; DL 5/7 at 16;
   thin areas: understandability/hard-concept support, examples-revisit, perf=fine).
   ✅ iter 169: MCQ arc → Deep Learning·Sequences & Attention 12→16 (+12, bank →2,108). All 3 lessons (rnn-lstm-gru/
   embeddings-tokenization/attention). ★ DL 5/7 modules at 16. Adversarial agent ALL PASS; positions balanced 3/3/3/3
   (distinct patterns, no marching); render "of 16" errs=0; SW →v112. DL REMAINING (arc): transformers(3),
   generative(3). Then RL/LLM/PS.
   ✅ iter 168: 3 new achievements (gamification — owner-loved; 43→46): 🔎 Self-Examiner (try a Quick Check), 🌟 Quick
   Ace (ace one), 🛰️ Viz Voyager (open 15 different viz). Integrates the iter-164 Quick Check into the motivation loop
   (rewards the behavior, not score — stays no-stakes). New recordQuickCheck/recordVizOpen + vizSeen/quickChecks state
   (blank+load merge, backward-compat verified). Browser: Self-Examiner unlocks on QC completion, errs=0; SW →v111.
   ✅ iter 167: MCQ arc → Deep Learning·Convolutional Networks 12→16 (+12, bank →2,096). All 3 lessons (convolution/
   pooling/transfer-learning). ★ DL 4/7 modules at 16. Adversarial agent ALL PASS (conv-equivariance vs pooling-
   invariance validated); positions balanced 3/3/3/3; render "of 16" errs=0; SW →v110. DL REMAINING (arc):
   sequences-attention(3), transformers(3), generative(3). Then RL/LLM/PS.
   ✅ iter 166: Positional-encoding viz (`llm-positional-encoding`, **38th widget**, visualizations — non-content,
   interleaved). 3 views (heatmap pos×dim / frequency waves / relative-similarity) + a `d` slider; static draws.
   Embedded in `llm/l-positional-encoding`. gate ALL GREEN · 38 widgets; lab+lesson render errs=0, rawDollars=0;
   3 desktop + 390px screenshots good; SW →v109; README 37→38.
   ✅ iter 165: MCQ arc → Deep Learning·Generalization 12→16 (+12, bank →2,084). All 3 lessons (overfitting/
   dropout-norm/initialization). ★ DL 3/7 modules at 16. Adversarial agent ALL PASS; positions balanced 3/3/3/3;
   render "of 16" errs=0; SW →v108. DL REMAINING (arc): convolutional(3), sequences-attention(3), transformers(3),
   generative(3). Then RL/LLM/PS.
   ✅ iter 164: Inline **Quick Check** (new functionality/understandability — non-content, interleaved). Low-stakes
   3-question retrieval at the end of every lecture (testing effect, in-flow); reuses the lesson's MCQs; NO XP/mastery
   (graded Quiz tab owns scoring); "full quiz →" CTA + reshuffle. `mountQuickCheck()` in app.js + `#quick-check`
   card CSS. Functional drive errs=0 (CTA switches to quiz tab); KaTeX kErr=0; 390px legible; smoke errs=0; SW →v107.
   ✅ iter 163: MCQ arc → Deep Learning·Training Mechanics 12→16 (+16, bank →2,072). All 4 lessons (loss/backprop/
   optimizers/LR-schedules). DL 2/7 modules. Adversarial agent ALL PASS (one borderline training-loop distractor
   hardened); positions balanced 4/4/4/4; render "of 16" errs=0; SW cache →v106.
   DL REMAINING (MCQ arc): generalization(3), convolutional(3), sequences-attention(3), transformers(3),
   generative(3). Then RL/LLM/PS.
   ✅ iter 162: Dropout viz (`dl-dropout`, **37th widget**, visualizations — interleaved with the arc). 4-layer MLP drops
   hidden units with prob p (slider 0–0.8); Resample/Animate sample thinned sub-networks; Test phase keeps all (q-scaling
   note). Embedded before the BN h3 in `dl-dropout-and-normalization`. gate ALL GREEN · 37 widgets; lab+lesson render
   errs=0, rawDollars=0; desktop+390px screenshots good; SW cache →v105; README 36→37. NEXT (arc): DL·Training Mechanics 12→16.
   ✅ iter 160 (★160): per-route document titles (a11y/UX) — router sets meaningful document.title (lesson/course/viz names
   resolved; pages labeled). errs=0 across ~20 routes; SW cache →v103. ★160 reflection in CHANGELOG (loop healthy, 3/7 topics
   migrated, compass well-rotated). Still-thin: examples, performance (both never a dedicated iter — candidates).
   ✅ iter 158: "Redrill the N you missed" button on the test results screen (workflow/new-functionality; neglected since 142/144)
   — immediate mastery drill on just this session's misses; reuses runMasteryDrill; omitted on perfect runs. errs=0; SW cache →v101.
   ✅ iter 156: animated score reveal on result screens (animations; neglected since 140) — count-up + bigPop spring, confetti
   on perfect 10+ test; reduced-motion safe. Also HARDENED shared countUp with Math.max(0,k) clamp (rAF/performance.now clock
   skew could render a negative score). errs=0; SW cache →v99. NOTE: headless --dump-dom doesn't advance rAF, so count-up
   end-state verified via the reduced-motion path (exact final score) + the clamp (no negative) + real-browser dashboard precedent.
   ✅ iter 148: Riemann Sum visualizer (calc-riemann, 35th viz; the first INTEGRATION viz) in the definite-integral lesson.
   Function/rule/n controls + Refine animation; numerics pre-verified; errs=0; SW cache →v91; README 34→35.
   VIZ BACKLOG remaining: MDP policy-iteration (3rd gridworld — low priority), VAE latent-space, GAN training-dynamics,
   Taylor-polynomial approximation (would pair with the linearization lesson).
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
- **(iter 240 note for future iters) JS code-exercises are now gate-verified** — `node gate.js` runs every
  `data-code="javascript"` block and asserts output===`data-expected`. So when authoring a new JS exercise you no longer
  need the manual browser pg-check ritual to confirm the answer key; the gate catches a wrong `data-expected`. (A quick
  visual screenshot is still nice for layout, and **Python exercises still need a manual/browser check** — Pyodide can't
  run in node.) Capture the expected via the runJS replay as before, then trust the gate.
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred for now]
- ~~Glossary with hover-definitions of key terms across lessons.~~ **DONE iter 57** (inline `.gloss` tooltips in lecture prose).
- ~~"Explain it back" — free-text recall with self-grading (Feynman technique).~~ **DONE iter 53** (Recall tab; self-graded against the lesson's flashcards, feeds mastery + XP). Future: optional AI grading when the tutor lands.
- Per-concept difficulty rating + adaptive question selection in tests.
- ~~Interleaved review sessions (mix topics) beyond the SRS queue.~~ **partly DONE iter 68** — Daily Mix (`#/session`) chains due cards + a weak-spot quiz + a next lesson into one guided flow.
- More viz ideas (41 widgets now; CLT iter 74, normal-explorer iter 76, covariance-scatter iter 79, CI-coverage
  iter 84, diffusion noising iter 89, convex-landscape/GD-trap iter 92, hypothesis-test/p-value iter 98, BPE-merge
  trainer iter 105, LR-schedule explorer iter 112, Q-learning gridworld iter 117, optimizer-race iter 136, Riemann-sum
  iter 148, Taylor-polynomial iter 152, dropout iter 162, positional-encoding iter 166, KL-divergence iter 172,
  TD-vs-MC iter 178, multi-armed-bandit iter 186, binomial⇄poisson iter 203, GAN-training iter 207): a VAE latent-space
  explorer (NOTE: the VAE lesson already embeds `dl-kl-divergence`, so a 2nd VAE viz is lower priority), a policy-iteration
  vs value-iteration comparison. (✓ beam-search tree iter ~138; ✓ value-iteration is the existing gridworld; ✓ GAN
  training-dynamics + mode-collapse demo iter 207, embedded in the GANs lesson — 43 widgets now.)
  NOTE: viz blurbs AND notes are NOT KaTeX-typeset (the Lab shows them raw) — use plain unicode (xₜ, √, ε, ᾱ), not $...$.
- ~~Lesson-embedded code exercises (`data-code` with `data-expected`) tied to each algorithm/DL lesson.~~ **MILESTONE iter 235**: 21 exercises, **≥1 in all 7 topics** (algos 9, DL 3, prob-stats 3, RL 2, LLM 2, calc 1, LA 1). Future: deepen thin topics (calc/LA at 1) where a runnable demo adds real insight.
- ~~Reduced-motion + high-contrast accessibility modes.~~ **DONE** (reduced-motion long-standing; **high-contrast mode iter 234** — `data-contrast="high"` layered on either theme, sidebar + ⌘K toggle, persisted).
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
- **★ LANDMINE — mathtools-only LaTeX envs silently fail KaTeX (found+fixed iter 329):** `\begin{psmallmatrix}` /
  `bsmallmatrix` / `Bmatrix*` etc. come from the `mathtools` package, which the bundled KaTeX build does NOT load —
  they raise `No such environment: …` at typeset time (a real `.katex-error`, but the gate's static lints don't catch it;
  only the `--dump-dom` kErr count does). KaTeX DOES support `matrix/pmatrix/bmatrix/vmatrix/smallmatrix`. For an inline
  parenthesized small matrix use `\left(\begin{smallmatrix}…\end{smallmatrix}\right)`. Lesson: ALWAYS run the dump-dom
  kErr check after adding/reveal-checking math content — a pre-existing example had shipped this error unnoticed.
- **★ LANDMINE — `**` in code-exercise source fails the gate (iter 309):** the gate's `rawMarkdown` lint flags `**` as
  markdown bold, so JS exponentiation (`x ** 2`) in a `data-code` exercise trips it. Use multiplication (`x * x`) or
  `Math.pow` in exercise code, never `**`. (Caught a ps-covariance exercise; reverted + re-injected.)
- **★ LANDMINE — literal `<` inside math breaks rendering (found+fixed iter 189):** math content is injected via
  `innerHTML` *before* `typeset()`; a `<` immediately followed by a letter (e.g. `x_{<t}`, or `\alpha<1` written
  without a space) is parsed as an HTML tag-open, truncating the text node and breaking the `$…$` pair → raw `$`
  shows and the rest of the expression vanishes. Was site-wide (621 instances, 332 strings). FIXED centrally by
  `escapeMathLt`/`normalizeMath()` in app.js (escapes `<`→`&lt;` inside math at boot, in-memory). **You no longer
  need to hand-escape `<` in data** — the normalizer covers content/mcq/examples/homework/flashcards/glossary. But
  if you add a NEW innerHTML+math render path or a new data field, make sure it flows through `normalizeMath()` (or
  the rendered string is `escapeMathLt`-clean). `>` is safe unescaped; only `<`+letter breaks. Verify new math views
  with the rawDollars=0 / katex>0 / kErr=0 harness.
- **★ LANDMINE — bare escaped money `\$` in prose garbles nearby math (found+fixed iter 200):** a `\$` in prose (e.g.
  "wins \$2", or a choice like `\$3.5`) leaves a stray `$` that KaTeX auto-render mis-pairs with the next real `$…$`,
  rendering the prose *between* them as garbled italic math (kErr stays 0 — it's "valid" wrong math — so the
  rawDollars/`.katex-error` checks alone miss it; you must LOOK at the screenshot). FIXED in the same boot normalizer:
  outside math, `\$`→`$\$$` (a self-contained span that renders a literal "$"); inside math, `\$` is left as-is
  (KaTeX handles it). **You no longer need to avoid `\$` in data** — but money written as a bare literal `$` (no
  backslash) sitting near `$…$` math could still mis-pair, so write money as `\$`. When verifying a money-bearing
  lesson, *screenshot it* — the garble renders without raising kErr.
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
