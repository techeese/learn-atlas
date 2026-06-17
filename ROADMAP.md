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
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred for now]
- ~~Glossary with hover-definitions of key terms across lessons.~~ **DONE iter 57** (inline `.gloss` tooltips in lecture prose).
- ~~"Explain it back" — free-text recall with self-grading (Feynman technique).~~ **DONE iter 53** (Recall tab; self-graded against the lesson's flashcards, feeds mastery + XP). Future: optional AI grading when the tutor lands.
- Per-concept difficulty rating + adaptive question selection in tests.
- ~~Interleaved review sessions (mix topics) beyond the SRS queue.~~ **partly DONE iter 68** — Daily Mix (`#/session`) chains due cards + a weak-spot quiz + a next lesson into one guided flow.
- More viz ideas (40 widgets now; CLT iter 74, normal-explorer iter 76, covariance-scatter iter 79, CI-coverage
  iter 84, diffusion noising iter 89, convex-landscape/GD-trap iter 92, hypothesis-test/p-value iter 98, BPE-merge
  trainer iter 105, LR-schedule explorer iter 112, Q-learning gridworld iter 117, optimizer-race iter 136, Riemann-sum
  iter 148, Taylor-polynomial iter 152, dropout iter 162, positional-encoding iter 166, KL-divergence iter 172): MDP
  policy-iteration, a VAE latent-space explorer, a GAN training-dynamics demo. (✓ beam-search tree shipped iter ~138.)
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
