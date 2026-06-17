# Atlas — Changelog

Prepend new entries under this header. Include the loop-iteration number in the heading.

## iter 82 — Probability & Statistics — Module 4: Statistical Inference (4 lessons) (content; owner depth direction)
Added the fourth Probability & Statistics module — the payoff that turns probability into *statistics*: reasoning
from a sample back to the unknown population. Four lessons that build on each other:
**(1) The Law of Large Numbers** — the sample mean converges to $\mu$; the Weak Law via Chebyshev ($\operatorname{Var}(\bar X_n)=\sigma^2/n$);
the gambler's-fallacy trap; Monte-Carlo estimation; LLN-vs-CLT (destination vs. the shape of the wobble).
**(2) Sampling Distributions & the Standard Error** — a statistic is a random variable; $\mathbb{E}[\bar X]=\mu$,
$\operatorname{Var}(\bar X)=\sigma^2/n$; the standard error $\sigma/\sqrt n$ and the $\sqrt n$ law; the CLT stated formally.
**(3) Point Estimation: Bias, Variance & Consistency** — estimators, bias, MSE = variance + bias² (the same
bias–variance split as model fitting), consistency, and why the sample variance divides by $n-1$ (Bessel's correction).
**(4) Confidence Intervals** — $\bar X \pm z^{*}\sigma/\sqrt n$, the *correct* (procedural) interpretation of "95%
confident", margin of error & sample-size planning, and the $t$-distribution when $\sigma$ is unknown.
Each is a full KaTeX lecture + 6 flashcards + 3 homework (hint+solution) + 2 worked examples; MCQs deferred to the
pipeline next iteration (the iter 71→72 / 73→75 / 77→78 pattern). Probability & Statistics is now a **four-module,
16-lesson** course. Site: **129 lessons · 775 flashcards · 385 homework · 250 examples**. SW cache → `atlas-v26`;
README counts refreshed (lessons 125→129, concepts 125→129). Verified: `node gate.js` ALL GREEN (7 topics · 129
lessons); all four lessons render math with **katex-error=0** (CI derivation confirmed visually — $\bar X\approx
N(\mu,\sigma^2/n)$, $\pm1.96$, fractions all proper); course/cheatsheet/map + lessons smoke errs=0; legible at 390px;
stray Chrome cleaned up.

## iter 81 — Keyboard-accessible lesson tabs (ARIA tablist) (accessibility)
Fixed a real accessibility defect the checkpoint surfaced: the per-lesson section tabs (Lecture / Examples / Quiz /
Flashcards / Homework / Recall) were `<div>`s with click handlers only — no role, no `tabindex`, no keyboard support
— so keyboard and screen-reader users could not switch tabs at all (there was even a dead `.tab:focus-visible` CSS
rule for focus styling that could never trigger). Rebuilt them as a proper **ARIA tablist**: real `<button>` elements
with `role="tab"`, `aria-selected`, `aria-controls`, a **roving tabindex** (the active tab is `tabindex=0`, the rest
`-1`), and the panel as `role="tabpanel"` with `aria-labelledby` pointing at the active tab. Added keyboard
navigation — **←/→ (and ↑/↓) move between tabs, Home/End jump to first/last**, each moving focus and activating
that tab; Enter/Space work natively now that tabs are buttons. A button-style reset on `.tab` keeps the visuals
pixel-identical. SW cache → `atlas-v25`. Verified: tablist + 6 `role="tab"` buttons + tabpanel present; initial
roving tabindex correct (0 / −1); clicking updates `aria-selected`; ArrowRight from the first tab moves focus to and
selects the next; visuals unchanged (screenshot); `node gate.js` ALL GREEN; 14-route smoke errs=0; Chrome cleaned.

## iter 80 — Nine new achievements + stale-count fixes (gamification; owner "more achievements" ask) — 10-iter checkpoint
**Checkpoint review (iters 71–79):** the last ten iterations were almost entirely *content* (the new Probability &
Statistics topic + MCQ sweeps) and *visualizations* (CLT, normal explorer, covariance scatter). Gamification, UI/UX,
animations, and accessibility had gone quiet — and the owner's explicit 2026-06-17 ask for "more achievements" was
still undelivered. So this iteration is gamification.
Added **9 achievements (25 → 34)**, all awardable from already-tracked state (no new save fields, so every prior
save still loads): **Iron Will** (100-day streak), **Sharpshooter** (100 quiz answers correct), **Deadeye** (500
correct), **Memory Palace** (review 500 flashcards), **Homework Hero** (work through 25 homework solutions),
**Test Veteran** (complete 10 custom tests), **Loremaster** (80% mastery on 25 concepts), **Erudite** (5,000 total
XP), and **Atlas Complete** (finish every lesson in every subject). These fill the long gap between the early
milestones and the end-game (Polymath/Atlas Complete) and give the well-built site visible new goals. Also fixed two
**stale descriptions** that still said "six topics/subjects" (there are now seven) — reworded to "every subject"
(the award logic already iterated all courses, so only the text was wrong). SW cache → `atlas-v24`; README 25→34.
Verified: `node gate.js` ALL GREEN; the Achievements page renders all **34** cards ("0 of 34 unlocked"), errs=0;
a 13-route smoke is errs=0; and a Node functional test confirms each new unlock fires at its threshold
(mcq-100/500, cards-500, homework-hero, test-veteran, loremaster, erudite at 5k XP, atlas-complete on full
completion) and stays locked below it. Stray Chrome cleaned up.

## iter 79 — Covariance & Correlation scatter visualization (visualizations; owner depth direction)
A new interactive widget (`ps-covariance-scatter`, the 24th) that makes correlation *visceral*. A base cloud of 200
bivariate-normal points is generated once; dragging the **ρ slider** (−1…1) recomputes each point as
$Y=\rho z_1+\sqrt{1-\rho^2}\,z_2$, so the cloud smoothly **tilts** from a formless blob (ρ=0) toward a tight line
(ρ=±1) instead of re-randomizing. Overlaid live: the <span>best-fit regression line</span> (slope ρ), the **2σ
covariance ellipse** (eigen-decomposition of $[[1,\rho],[\rho,1]]$ — it collapses to the line at ρ=±1 and is a
circle at ρ=0), and a readout of the **sample correlation** computed from the actual points (which tracks the set ρ
with honest finite-sample noise) plus the sample covariance. A "↻ Resample" button draws a fresh cloud. Embedded in
the *Covariance & Correlation* lesson (right where ρ is introduced) and in the Lab. Static initial draw (no animation
loop). SW cache → `atlas-v23`; README viz counts 23→24. Verified: renders in Lab (ρ=0.6 cloud + line + ellipse);
slider drives sample r (ρ=−0.9→r=−0.90, ρ=0.95→r=0.96) with errs=0; canvas hydrates inside the lesson
(katex-error=0); legible at 390px (canvas `max-width:100%`); `node gate.js` ALL GREEN (24 widgets); Chrome cleaned.

## iter 78 — Probability & Statistics Module 3 — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Joint-Distributions module by bringing all three lessons (joint distributions/marginals/
independence, covariance & correlation, conditional expectation) from 0 → 12 MCQs each via the proven
author→adversarial-verify workflow pipeline: **+36 fact-checked questions**. Every one of the 12 Probability &
Statistics lessons now sits at exactly 12 MCQs (144 in the topic); the site bank crosses **1,464 → 1,500**. The
adversarial verifier independently re-derived every answer (e.g. confirming $P(Y{=}0\mid X{=}1)=0.1/0.4=0.25$,
the triangular-support independence test, $\operatorname{Var}(X+Y)=4+9-6=7$, and that $\mathbb{E}[X\mid Y]$ with
$Y$ fixed is a number while $\mathbb{E}[X\mid Y]$ is a random variable) — all three lessons returned ok=true,
unchanged. Distractors deliberately target the classic misconceptions (forgetting to renormalize a conditional,
mistaking uncorrelated for independent, dropping the covariance term in a variance-of-a-sum). Now every PS lesson
has a Quiz tab. SW cache → `atlas-v22`. Also refreshed three stale README counts (widgets 22→23 + the
Normal-distribution explorer, concepts 113→125). Verified: `node gate.js` ALL GREEN (7 topics · 125 lessons ·
**1,500 MCQs**); all three Module-3 quizzes render "Question 1 of 12" with 4 choices, errs=0, katex-error=0;
stray Chrome cleaned up.

## iter 77 — Probability & Statistics — Module 3: Joint Distributions & Dependence (3 lessons) (content; owner depth direction)
Deepened the newest topic with a third module covering how *multiple* random variables interact — the bridge from
single-variable probability into multivariate statistics and ML. Three full lessons:
**(1) Joint Distributions, Marginals & Independence** — joint PMF/PDF, marginalizing by summing/integrating out,
independence as a product factorization, conditional distributions, the support-shape shortcut.
**(2) Covariance & Correlation** — covariance (definition + computational formula), bilinearity, variance of a
sum, the Pearson correlation coefficient and its $[-1,1]$ range, and the crucial *uncorrelated ≠ independent*
counterexample ($Y=X^2$).
**(3) Conditional Expectation & the Tower Property** — $\mathbb{E}[X\mid Y]$ as a random variable, the law of
total expectation, the law of total variance (explained/unexplained), and the regression-function connection.
Each lesson is a rich KaTeX lecture + 6 flashcards + 3 homework problems (hint+solution) + 2 worked examples.
(MCQs deferred to a follow-up iteration via the proven author→verify pipeline, matching the iter 71→72 / 73→75
pattern.) Site now **125 lessons · 751 flashcards · 373 homework · 242 examples**. SW cache → `atlas-v21`. Also
corrected the README viz count (22→23, stale since iter 76). Verified: `node gate.js` ALL GREEN (7 topics · 125
lessons); all three new lessons render math with **katex-error=0** (confirmed visually — covariance formulas and the
conditional-expectation definition render as proper symbols, not literal backslashes); every lesson tab
(lecture/examples/flashcards/homework/recall) + course/cheatsheet/map: errs=0; legible at 390px; stray Chrome cleaned up.

## iter 76 — Normal Distribution Explorer visualization (visualizations; owner depth direction)
A new interactive widget (`ps-normal-explorer`, the 23rd) that lets you *feel* the Gaussian. Drag **μ** to slide
the whole bell; drag **σ** to stretch/pinch it (the x-domain auto-fits to μ±4σ so the curve always fills the
frame). Two modes via a selector: **empirical rule** shades the nested ±1σ/±2σ/±3σ bands with their fixed
68.3 / 95.4 / 99.7 % labels — visibly the *same* percentages no matter μ or σ; **interval P(a≤X≤b)** reveals two
z-bound sliders and computes the exact probability live via the standard-normal CDF (Abramowitz–Stegun erf),
showing the Φ(z_b)−Φ(z_a) decomposition and reinforcing that the answer depends only on the z-bounds. Embedded in
the *Normal Distribution & Standardization* lesson (right after the empirical-rule section) and in the Lab.
Also fixed **stale first-visit onboarding copy** (said "113 lessons" and listed only 6 topics → now "122 lessons"
and includes Probability & Statistics). SW cache → `atlas-v20`. Verified: renders in Lab (empirical bell with
shaded bands + labels); interval mode computes P(−1≤X≤1)=68.27 % via Φ; empirical mode hides the bound sliders
(2 visible), interval shows 4; dragging μ/σ → errs=0; all 19 routes errs=0; legible at 390px (canvas `max-width:100%`);
`node gate.js` ALL GREEN (23 widgets); stray Chrome cleaned up.

## iter 75 — Probability & Statistics distribution lessons to 12 MCQs each (content; owner depth direction)
Brought the 5 *Common Distributions* lessons (Bernoulli & Binomial, Poisson, Geometric & waiting-time,
Uniform & Exponential, Normal & standardization) from 0 → 12 MCQs each via the proven author→adversarial-verify
pipeline (`/tmp/gen_mcq_target_wf.js` → `Workflow` → `/tmp/inject_mcq.js`): **+60 fact-checked questions**, so
all 9 Probability & Statistics lessons now sit at exactly 12 MCQs (108 in the topic). Site bank **1,404 → 1,464**.
The verify pass enforced range-correct keys, no self-contradictory stems, no duplicate correct choices, valid
KaTeX. Verified: `node gate.js` ALL GREEN (7 topics · 122 lessons · 1,464 MCQs); the Normal-distribution lesson
quiz renders "Question 1 of 12" with 4 choices and errs=0 in headless Chrome; stray Chrome cleaned up.

## iter 74 — Central Limit Theorem visualization (visualizations; owner depth direction)
A new interactive widget (`ps-clt`, the 22nd) for the deepest idea in statistics — and the reason the normal
curve is everywhere. Pick a non-normal **source** (Exponential, Uniform, or Bimodal), set the **sample size n**,
and press **Run**: it repeatedly draws n values, averages them, standardizes, and accumulates the result into a
live histogram with the **standard-normal curve overlaid**. At n=1 the bars trace the raw (often skewed) source;
as n grows the histogram visibly snaps toward the bell — the CLT, regardless of source. Animated via
`VIZUtil.loop` (so `stopAll` cleans it up on nav) with a synchronous initial 250-sample draw. Embedded in the
*Normal Distribution & Standardization* lesson (at its CLT teaser) and in the Lab. SW cache → `atlas-v18`.
Verified: renders in Lab (n=10 → clean bell from an Exponential source), embedded canvas hydrates, scales at
390px, all-routes errs=0, `node gate.js` ALL GREEN; stray Chrome cleaned up.

## iter 73 — Probability & Statistics — Module 2: Common Distributions (5 lessons) (content; owner depth direction)
Deepened the new topic with a Common Distributions module: Bernoulli & Binomial, Poisson, Geometric &
waiting-time (memorylessness), Uniform & Exponential (the Poisson-process link), and the Normal distribution &
standardization (z-scores, the 68–95–99.7 rule). Each is a full KaTeX lecture + flashcards + homework + worked
examples, adversarially fact-checked. Fixed the iter-71 verify-prompt bug (verifier had overwritten `content`
with its review notes) by making the prompt explicit that `content` = lesson HTML only, commentary in `notes` —
all 5 lessons returned proper content. Site: 7 topics · 122 lessons · 733 flashcards · 364 homework · 236
examples. Verified: lessons render (Normal lesson 62 KaTeX spans), errs=0, gate ALL GREEN.

## iter 72 — Probability & Statistics — 12 MCQs per lesson (content; owner depth direction)
Brought the 4 Foundations lessons to 12 MCQs each (+48; site bank 1,356 → 1,404) via the proven
author→adversarial-verify MCQ pipeline (it caught a `\$$2` KaTeX bug and re-derived every probability). All 4
PS Foundations lessons now at 12 MCQs. Verified: PS quiz renders 12 and answers cleanly (errs=0), gate ALL GREEN.

## iter 71 — NEW SUBJECT: Probability & Statistics (the 7th topic) — Foundations module (content; owner-approved)
The owner explicitly greenlit a 7th subject. Launched **Probability & Statistics** (icon ℙ, azure #7aa7d0) with
a complete **Foundations of Probability** module — 4 fully-authored lessons: (1) Sample Spaces, Events & the
Axioms of Probability; (2) Conditional Probability, Independence & Bayes' Theorem (with the existing Bayes
visualization embedded inline); (3) Random Variables & Their Distributions; (4) Expectation, Variance & the
Shape of a Distribution. Each has rich KaTeX lecture content + flashcards + homework + worked examples
(24 cards, 12 homework, 8 examples total). Authored and adversarially fact-checked by a workflow (every
probability/Bayes/variance derivation independently re-checked). Site totals: **7 topics · 117 lessons · 702
flashcards · 349 homework · 226 examples**. Wired in (index.html, sw.js ASSETS + `atlas-v17`, gate.js TOPICS).
**Bug caught in verification:** the verify agent had overwritten the `content` field of 3 lessons with its own
review notes ("VERIFICATION COMPLETE…") instead of the corrected lecture HTML — caught because a DOM dump
showed `katex=0` on lessons full of math. Recovered the validated original author content from the workflow
transcripts and patched it in (re-embedding the Bayes viz). Verified: dashboard shows 7 topic cards / 117
lessons, lessons render (65 & 71 KaTeX spans, Bayes viz embeds), all-routes errs=0, `node gate.js` ALL GREEN.
MCQs (→12/lesson) and more modules come next. Also cleaned up 87 zombie headless-Chrome processes from prior
verification runs and now kill stray Chrome after every run (owner directive).

## iter 70 — Typo-tolerant fuzzy search in the ⌘K command palette (understandability / workflow) — 10-iter checkpoint
The command palette is the core fast-navigation tool across 113 lessons + 21 visualizations + glossary + pages
+ references, but it only did exact substring matching — a small typo ("eignvalue", "softmx", "gradent")
returned nothing. Added a **typo-tolerant subsequence tier**: if the query characters appear in order within a
title (allowing omissions/abbreviations), it matches, scored just below true substring hits and ranked by how
tight/early the match is. Exact > prefix > substring > fuzzy ordering is preserved, so precise queries are
unaffected. One-function change in `openPalette`; no new state. SW cache → `atlas-v16`. Verified: a node unit
test of the matcher (eignvalue→eigenvalue, softmx→softmax, gradent→gradient all match; gibberish rejected) and
a headless palette test where typing "eignvalue" surfaces "Eigenvalues and Eigenvectors" as the top result,
errs=0, `node gate.js` ALL GREEN.
**Checkpoint note:** both owner content sweeps are done and the platform is mature across all compass areas;
the two biggest remaining swings (a 7th topic, the AI tutor) stay owner-gated, so the loop continues delivering
genuine in-scope polish on the existing six rather than unilaterally expanding scope.

## iter 69 — Course-page overview: mastery distribution + "continue/start next" CTA (UI/UX)
The course page is the main navigation hub into each topic's now-large content, but its header only showed a
flat progress %. Added an at-a-glance **mastery distribution bar** — a segmented strip showing how many of the
topic's lessons are New / Seen / Learning / Proficient / Mastered, with a small legend (and a `role="img"`
label for screen readers) — so you can see where your knowledge actually stands, not just how many lessons
you've opened. Added a prominent **"▶ Continue / Start: <next lesson>" CTA** that jumps straight to your
ready-frontier (or first unstarted) lesson — no scrolling to find where you left off — plus a **"~N min of
reading left"** readout (or a "✓ all lessons complete" note). Pure UI/UX, no new state. SW cache → `atlas-v15`.
Verified: renders with a multi-segment distribution + "Continue" CTA when there's progress (desktop) and a
single-segment "Start" CTA on a fresh profile (390px mobile); errs=0 across 9 routes; `node gate.js` ALL GREEN.

## iter 68 — "Daily Mix": a one-click guided study session (new functionality)
For a busy self-learner the hardest part is deciding *what* to do in a spare 15 minutes — the dashboard's
entry points (resume, due cards, weak-spot drill, concept of the day) are all there but scattered. Daily Mix
(new `#/session` route, a "🎯 Start Daily Mix" button on the dashboard + ⌘K) chains them into one guided flow
with a step indicator: **(1) Review** up to 8 due flashcards → **(2) Quiz** a 6-question check drawn from your
weak spots (falling back to recently-completed material) → **(3) Next** a concrete "Learn next" lesson from the
ready frontier. The sequence adapts — phases with nothing to do are skipped (a brand-new user with no due cards
or completed lessons goes straight to a lesson suggestion). Built by adding a small `onDone` callback to the
existing `runFlashcards` and `runTest` engines (so each phase's result screen offers "Continue →" instead of
"retry") and an orchestrating `viewSession()` — no duplication of the card/quiz logic, and no new persisted
state. SW cache → `atlas-v14`. Verified with a polling driver through the entire flow: cards → quiz → finish
all reached with errs=0; renders desktop + 390px; the adaptive skip works; `node gate.js` ALL GREEN.

## iter 67 — Decoding playground visualization: temperature + top-p nucleus (visualizations)
A new interactive widget (`llm-decoding`, the 21st) for the highest-leverage inference-time knob in applied
LLM work — and `l-decoding-strategies` ("Decoding Strategies and Sampling") had no visual. It shows a fixed
next-token distribution (after the prompt "The sky is __") as a bar chart sorted by probability, with two
sliders: **temperature** reshapes the softmax (low → sharp/near-greedy, high → flat/chaotic) and **top-p**
draws a red cutoff line and highlights the **nucleus** (the gold head of the distribution you actually sample
from, renormalized) while dimming the truncated tail. A live readout reports T, top-p, a regime label, the
distribution's entropy in bits, and how many tokens survive. Embedded in the decoding lesson + the Lab; it also
picks up iter 66's a11y treatment (canvas `role="img"` + label, named sliders) automatically via `hydrateViz`.
Synchronous initial `draw()`. SW cache → `atlas-v13`. Verified: renders in Lab (T/top-p driven live) + the
embedded canvas hydrates with aria in the lesson, scales at 390px, all-routes errs=0, `node gate.js` ALL GREEN.

## iter 66 — Accessibility: screen-reader names for the 20 visualizations + slider labels; SW cache catch-up (accessibility)
First non-content iteration after both owner sweeps — rotating to **accessibility**, untouched since iter 11
despite ~9 interactive features added since. The 20 canvas widgets were invisible to screen readers (canvas
content has no accessible representation). Now, in the single `hydrateViz` chokepoint, each visualization's
**canvas gets `role="img"` + a descriptive `aria-label`** (its title + blurb), and the container becomes a
labeled `role="group"` ("Interactive visualization: <title>") — so a screen-reader user knows what each widget
shows and that they've entered an interactive region. Also gave every `VIZUtil.slider` range input an
`aria-label` (its control name) and a live `aria-valuetext` (the formatted value, e.g. "d=10" not "10"). No
visual change. **Also a correctness catch-up:** the `data/*.js` files are in the service-worker `ASSETS`, but
the iters 60–65 MCQ edits never bumped the cache, so offline/PWA users were still on the old 897-question bank.
Bumping `CACHE` to `atlas-v12` now refreshes every asset (all 1,356 MCQs + this iteration). Recorded the
"bump CACHE on any cached-asset change, not just new files" rule in the loop playbook. Verified via DOM dump:
canvas `role="img"` + aria-label present, container `group` labeled, both sliders carry aria-labels, errs=0
across 8 routes, viz renders unchanged, `node gate.js` ALL GREEN.

## iter 65 — Question-bank growth: +76 MCQs across LLMs — SWEEP COMPLETE, every lesson at 12 (content; owner-requested)
The bank-growth sweep finishes with LLMs: +4 MCQs on each of the 19 lessons (8 → 12; LLM 152 → 228). With this,
**every one of the 113 lessons across all six topics now holds exactly 12 fact-checked MCQs — 1,356 total,
up from 897 at iter 59** (avg verified at 12.00/lesson by a site-wide script). This delivers, end to end, the
owner's most-repeated request ("add more and more and more questions … think again until I pass, not casual
remembering"): with 12 distinct, position-shuffled questions per lesson plus Mastery mode (wrong answers
re-queue until passed), a learner can no longer coast on memorizing answer positions. Every one of the ~459
new questions was authored to test understanding (computational + misconception-bait) and **independently
re-solved by an adversarial verifier** that fixed real defects across the sweep (self-contradictory stems,
duplicate/ambiguous correct choices, wrong answer keys, malformed KaTeX). LLM topics: chain-rule LM definition,
BPE encoding order, KV-cache/quantization roofline, decoding/temperature, in-context learning, RAG metrics,
hallucination & eval statistics, and frontier safety. Verified: the multihead LLM quiz now offers 12 MCQs and
answers cleanly (errs=0 across routes), `node gate.js` ALL GREEN (1,356 MCQs, answer ranges + structure validated).

## iter 64 — Question-bank growth: +75 MCQs across Reinforcement Learning, all lessons now at 12 (content; owner-requested)
Bank-growth sweep reaches Reinforcement Learning. Upgraded the generator to **target a per-lesson count** (12)
rather than a flat +4, so the two historically-thin lessons get topped all the way up: rl-td-learning 5 → 12
(+7) and rl-trpo-ppo 4 → 12 (+8), while the other 15 lessons go 8 → 12 (+4). Result: **every one of the 17 RL
lessons now sits at exactly 12 MCQs** (RL 129 → 204, **site-wide 1,205 → 1,280**). Topics include credit
assignment, MDP/Markov sufficiency, discounting & effective horizon, GAE bootstrapping & stop-gradient targets,
PPO clipping (both advantage signs) vs gradient clipping, Thompson sampling, the noisy-TV curiosity trap,
reward hacking, KL-regularized RLHF, and offline-RL trajectory stitching. Same author→adversarial-verify
pipeline (every answer independently re-solved). Verified: the previously-thin rl-trpo-ppo quiz now offers 12
MCQs and answers cleanly (errs=0 across routes), a script confirms all 17 lessons = 12, `node gate.js` ALL GREEN.

## iter 63 — Question-bank growth: +76 MCQs across Deep Learning (content; owner-requested)
Bank-growth sweep reaches Deep Learning: +4 MCQs on each of the 19 lessons (8 → 12/lesson; DL 152 → 228,
**site-wide 1,129 → 1,205**). Topics span dead-ReLU debugging, gradient accumulation, bias-variance,
embedding-table sizing, LSTM gradient flow, multi-head attention, causal masking with $-\infty$, cross- vs
self-attention, residual connections, LoRA serving economics, and in-context learning. Same
author→adversarial-verify pipeline (every answer independently re-solved); no stalls this time (MCQs are far
lighter than the iter-50 worked examples that hung on the matrix-heavy lessons). Verified: a DL quiz (the
attention lesson, which also embeds the backprop-adjacent viz) now offers 12 MCQs and answers cleanly
(errs=0 across routes), `node gate.js` ALL GREEN.

## iter 62 — Question-bank growth: +80 MCQs across Algorithms (content; owner-requested)
Bank-growth sweep reaches Algorithms: +4 MCQs on each of the 20 lessons (8 → 12/lesson; algorithms 160 → 240,
**site-wide 1,049 → 1,129**). The adversarial verify pass keeps paying off on this topic's subtle bounds: it
caught a distractor `Θ(n²+n log n+1)` that denotes the **same set** as the correct answer `Θ(n²)` (a genuine
second-correct-answer, replaced with `Θ(n log n)`), and two Master-Theorem distractors stating **factually wrong
asymptotics** (e.g. claiming $aT(n/2)+n$ at $a{=}2$ is $\Theta(n)$ rather than $\Theta(n\log n)$) — corrected
before injection. Verified: an algorithms quiz now offers 12 MCQs and answers cleanly (errs=0 across routes),
`node gate.js` ALL GREEN.

## iter 61 — Question-bank growth: +88 MCQs across Calculus (content; owner-requested)
Bank-growth sweep continues to Calculus: +4 MCQs on each of the 22 lessons (8 → 12/lesson; calculus 176 → 264,
**site-wide 961 → 1,049 — past 1,000**). Same author→adversarial-verify pipeline; the verify pass again earned
its keep — it caught a question with **two identical correct choices** ($\pi(x^2-(x^2)^2)$ and $\pi(x^2-x^4)$
are the same integrand) and replaced the duplicate with a genuinely-wrong distractor, plus other fixes — before
injection. Each batch mixes a computational item with a misconception-bait; answer positions varied; existing
stems fed to the author to avoid duplicates. Verified: a calculus quiz now offers 12 MCQs and answers cleanly
(errs=0 across routes), `node gate.js` ALL GREEN (answer ranges + structure validated).

## iter 60 — Question-bank growth starts: +64 MCQs across Linear Algebra (content; owner-requested) — 10-iter checkpoint
Honoring the owner's most-repeated, most-emphatic ask ("add more and more and more questions … think again
until I pass, not casual remembering") — untouched since iter 9. Every lesson sat at exactly 8 MCQs, enough
that a determined learner could memorize answer positions rather than re-derive. Added **4 new MCQs to each of
the 16 Linear Algebra lessons** (8 → 12/lesson; LA 128 → 192, site-wide 897 → **961**). Authored to test
understanding — each batch includes a computational item and one that baits a common misconception — then
**adversarially verified**: a second agent independently re-solved every question and checked the marked answer,
the distractors, and the explanation. This caught real, harmful errors the author missed — a self-contradictory
stem ("spans ℝ³ but is dependent" with 3 vectors, impossible), an unsupported `\begin{psmallmatrix}` KaTeX
environment, and two explanations whose rationale was wrong — all fixed before injection. New questions are
appended (existing stems were fed to the author to prevent duplicates) and the answer position is varied.
**10-iteration checkpoint:** since the examples sweep the loop has rotated cleanly through every compass area;
the only neglected owner-priority was the question bank — now addressed, and this kicks off a per-topic
bank-growth sweep (LA done; calc/algo/DL/RL/LLM next). Verified: a lesson's quiz now offers 12 MCQs and answers
cleanly (errs=0 across routes), `node gate.js` ALL GREEN (answer ranges + structure validated).

## iter 59 — Backpropagation visualization: the chain rule on a computational graph (visualizations)
A new interactive widget (`dl-backprop`, the 20th) for the concept DL learners struggle with most — and it had
a dedicated lesson ("Backpropagation: The Chain Rule at Scale") with no visual. It lays out the computational
graph of $L=(w\cdot x-y)^2$ as boxes (w, x, y → ×→ −→ ()²) wired with arrows labeled by each **local
derivative**. Every node shows its **forward value in gold** and its **gradient ∂L/∂· in rust**; sliders for
w, x, y recompute both passes live. The takeaway is made explicit: $\partial L/\partial w = 2e\cdot x$ is
exactly the number gradient descent subtracts from w, and the whole backward pass costs ≈ one forward pass.
Embedded in the backprop lesson and in the Visualization Lab. Synchronous initial `draw()`. SW cache →
`atlas-v11`. Verified: renders in Lab (w changed live) + embedded canvas hydrates in the lesson, scales at
390px (`max-width:100%`), all-routes errs=0, `node gate.js` ALL GREEN (data-viz id validated).

## iter 58 — Faster first load: defer scripts, parallelize fonts, preconnect CDNs (performance)
The examples sweep grew the data layer to ~3.5 MB across 13 scripts that were loaded as plain (render-order,
sequential) `<script>` tags. Three safe wins: (1) added `defer` to all 13 data/logic scripts — the browser now
fetches them in parallel and executes them in document order after parse instead of one-at-a-time as the parser
hits them (and KaTeX, also deferred earlier in the document, is now guaranteed ready before `app.js` boots, so
the very first lesson typesets without the retry). (2) Moved the Google-Fonts load from a chained `@import`
inside `styles.css` (CSS must download first, *then* the fonts are discovered) to a `<link>` in `<head>`, so
fonts download in parallel with the stylesheet. (3) Added `preconnect`/crossorigin hints for `cdn.jsdelivr.net`,
`fonts.googleapis.com`, and `fonts.gstatic.com` to pay the DNS+TLS cost up front. No behavior change. SW cache
→ `atlas-v10`. Verified: app boots and renders under defer (errs=0 across 13 routes), a lesson typesets 420
KaTeX spans (math intact) with glossary tooltips still wrapping, the dashboard renders with the correct fonts
(no visual regression), `node gate.js` ALL GREEN.

## iter 57 — Inline glossary tooltips in lessons (understandability)
"Understand faster": the first occurrence of each glossary term in a lecture now gets a dotted underline and a
hover/tap definition popup (with its own KaTeX rendered), so you can recall what "eigenvalue" or "span" means
without leaving the page. A `linkGlossary` pass runs over the lecture `.prose` BEFORE `typeset()`, walking text
nodes and skipping anything inside math, code, links, headings, viz, or already-wrapped spans — and crucially
skipping any text node containing `$`, so KaTeX delimiters are never split. Conservative by design: terms ≥4
chars, first-occurrence-only (one wrap per term per lesson), capped at 14, longest-term-first matching.
Keyboard- and touch-accessible (`tabindex`/`role=button`, shows on `:focus`); `prefers-reduced-motion`
respected via the global media query. Built in `app.js` + `styles.css` reusing `window.GLOSSARY` (48 terms);
no new state. SW cache → `atlas-v9`. Verified via DOM dump (4 tooltips wrapped on a lesson, 328 KaTeX spans
intact — math unbroken), a desktop + 390px screenshot of a live tooltip, and all-routes errs=0 across the
glossary-bearing lessons; `node gate.js` ALL GREEN.

## iter 56 — Five new achievements (incl. the Recall pillar) + a collection-progress bar (gamification)
The badge set predated several features — most notably the iter-53 Recall pillar earned no recognition. Added
five achievements (20 → 25): **Explain It Back** (score your first free recall), **Total Recall** (recall 100%
of a lesson's key points), **Deep Diver** (80% mastery on 10 concepts), **Well-Rounded** (Proficient mastery
in all six subjects), and **Half-Century** (50 lessons). Wired their triggers — recall ones in `scoreRecall`,
the mastery ones inside `bumpMastery` (counts mastered concepts + checks per-topic mastery each bump), and
Half-Century in `completeLesson`. The Achievements page now shows a **collection-progress bar** (X of 25 ·
%) so the meta-game has a visible goal. State-safe (achievements use the existing `achievements` field; old
saves just show the new badges locked). SW cache → `atlas-v8`. Verified on a clean profile: scoring a recall
fires the "Explain It Back" + "Total Recall" unlock toasts, Achievements renders with the progress bar
(desktop & 390px, "0 of 25"), all-routes errs=0, `node gate.js` ALL GREEN.

## iter 55 — XP-reward juice: floating "+XP", animated level ring, stat count-up (animations / juice)
Made the core reward loop *feel* rewarding. Earning XP (lesson, quiz, recall, etc.) now (1) floats a gold
"+N XP" chip up from the topbar level ring, (2) gives the ring a springy pop and smoothly fills its
conic-gradient progress (via a registered `@property --ring` + transition; the fill jumps cleanly on a
level-up wrap instead of animating backward), and (3) the dashboard hero stats count up from zero on landing.
`renderChrome` diffs XP against the last render so the float fires only on genuine gains (not route changes).
All three respect `prefers-reduced-motion` (JS guards + the global reduced-motion media query). Built in
`app.js` + `styles.css` — no new state, no store.js change. SW cache → `atlas-v7`. Verified on a clean
(clear+reload) profile: full flow errs=0 with `floatFired=true`, dashboard stats settle correctly (2/113 · 0%
· 678 · 1), renders desktop & 390px mobile, `node gate.js` ALL GREEN. (Note: headless localStorage is shared
across runs and was showing corrupt negative stats — verified on a clear+reload clean state, per the landmine.)

## iter 54 — Overfitting / bias–variance visualization (visualizations)
A new interactive widget (`dl-overfitting`, the 19th) for the most important — and previously un-visualized —
concept in ML. It fits a polynomial of adjustable **degree** to a noisy sample of a hidden $\sin(2\pi x)$:
crank the degree and watch the fitted curve go from a rigid underfit (degree 0–1), through a clean fit
(~degree 3), to a wildly oscillating overfit (degree 8–10) that threads every training point while missing
the true function. A live readout shows **train RMSE falling monotonically while held-out test RMSE U-turns**,
with a Good-fit / Underfitting / Overfitting verdict — the bias–variance tradeoff made visible. Controls:
degree, noise level, and "new sample". Embedded in the *Overfitting, Underfitting, and Regularization* lesson
and available in the Visualization Lab. Implemented in `js/viz.js` with a from-scratch ridge-stabilized
polynomial least-squares fit (normalized Vandermonde + Gaussian-elimination solver) and a seeded PRNG so the
demo is reproducible; synchronous initial `draw()` so the canvas paints on first frame. Bumped SW cache to
`atlas-v6`. Verified: renders in Lab (degree 10 = overfit) + embedded in lesson + 390px mobile (degree 3 =
good fit), `node gate.js` ALL GREEN (data-viz id validated), all-routes errs=0.

## iter 53 — "Explain it back": a free-recall (Feynman) study mode (new functionality)
First non-content iteration since the examples sweep, and a direct answer to the owner's deepest learning ask
("not casual remembering — I have to think again until I pass"): a new **Recall** tab on every lesson with
flashcards. You write an explanation of the whole concept from a blank page (the strongest form of active
recall), then reveal the lesson's flashcards as a self-check rubric — tick each point you genuinely covered,
peek at any answer to compare wording, and score yourself. Covered points feed the decaying **mastery** model
(demonstrated recall raises mastery; missed points simply aren't credited, since free recall is a high bar)
and award XP (+6/point, +20 for a clean sweep, confetti at 100%); the written recall auto-saves to your lesson
notes. Built entirely in `app.js` + `css/styles.css` reusing existing primitives (`getNote/setNote`,
`bumpMastery`, `addXP`, `touchStreak`) — no new state fields, so old saves load unchanged. Bumped the service
worker cache to `atlas-v5` so PWA/offline users get the update. Verified: full flow (write → check → reveal →
score 4/6) runs errs=0, renders desktop & 390px mobile, `node gate.js` ALL GREEN, all-routes errs=0.

## iter 52 — Worked examples for all 18 LLM lessons + a markdown-bold render fix (content; owner-requested) — SWEEP COMPLETE
Finishes the examples sweep: every LLM lesson that lacked examples now has 2 (36 total) — sequence
probability via the chain rule, softmax over logits, BPE merge tracing, embeddings/output head,
**multi-head + causal masking** (computed end to end), the transformer block, positional encoding/RoPE,
pretraining objective & data, AdamW/stability, scaling laws, SFT, RLHF/DPO, LoRA param counts, decoding
& sampling, in-context learning & chain-of-thought, KV-cache/GQA memory & bandwidth, RAG cosine retrieval
+ a ReAct tool-use trace, hallucination taxonomy & calibration, and a safety base-rate guardrail
calculation. 17 lessons via a 34-agent author→verify workflow; the matrix-heavy multi-head lesson (which
stalled the workflow agent for DL attention in iter 50) was authored directly and independently re-derived
(ALL CORRECT) — the iter-50 self-correction working as intended.
**Also fixed a real shipping render bug:** several example authors emitted markdown `**bold**`, but the
Examples tab renders via `innerHTML`, so KaTeX leaves `**` untouched and it showed as literal asterisks in
expanded solutions. Converted **219** markdown-bold spans to `<strong>` across Linear Algebra (78),
Calculus (128), Reinforcement Learning (8), and LLMs (5); Algorithms/DL were already clean. (Slipped past
iters 47–48 because those screenshots only showed collapsed examples.)
**Sweep totals: 108/113 lessons now carry worked examples — 218 in all** (the 5 without are purely-conceptual
LA lessons the verifier correctly skipped). Verified: expanded calculus solution now renders bold correctly,
LLM BPE + multi-head examples render desktop & 390px mobile, `node gate.js` ALL GREEN, all-routes errs=0.

## iter 51 — Worked examples for all 16 Reinforcement Learning lessons (content; owner-requested)
Examples sweep reaches Reinforcement Learning: every one of the 16 lessons that lacked examples now has 2
(32 total) — evaluative vs instructive feedback, modeling an MDP + computing returns, Bellman backups &
value/policy iteration, Monte-Carlo returns, TD(0) updates, SARSA vs Q-learning updates (on- vs off-policy),
n-step/eligibility traces & GAE over a rollout, value approximation, DQN targets, REINFORCE/policy-gradient,
actor-critic advantages, the PPO clipped surrogate (both advantage signs), ε-greedy + Thompson-sampling
exploration with regret, reward-hacking & observation normalization, and sequential credit assignment. Each
is a full step-by-step `{title, body, solution}` with KaTeX behind a "Show working" reveal. Authored then
adversarially verified by a 32-agent workflow that re-derived every value (caught & fixed real issues: a PPO
example body that contradicted its own solution, a confusing Bellman line). RL examples 2 → 34 (182 site-wide).
Verified: SARSA/Q-learning + Bellman examples render desktop & 390px mobile, `node gate.js` ALL GREEN,
all-routes errs=0.

## iter 50 — Worked examples for all 17 Deep Learning lessons (content; owner-requested)
Examples sweep reaches Deep Learning: every one of the 17 lessons that lacked examples now has 2 (34 total) —
empirical vs true risk & the generalization gap, a neuron/MLP forward pass in matrix form, activation/loss
(softmax+cross-entropy) computations, LR schedules, regularization & dropout/normalization math, init &
gradient flow, a convolution feature-map computation, pooling/CNN sizing, transfer-learning param counts,
RNN unrolling + an LSTM cell step (the additive memory highway), embeddings/tokenization, scaled
dot-product attention + causal self-attention with masking, the Transformer end-to-end, pretraining/fine-tuning,
and practical debugging. Each is a full step-by-step `{title, body, solution}` with KaTeX behind a "Show working"
reveal. 15 lessons were authored+verified by a 33-agent workflow; the 2 heaviest (RNN, attention) reliably
stalled the workflow agent, so I authored those 4 examples directly with concrete small-number computations and
had an independent agent adversarially re-derive every value (verdict: ALL CORRECT). DL examples 4 → 38
(150 site-wide). Verified: attention (bmatrix/masking) + RNN render desktop & 390px mobile, `node gate.js`
ALL GREEN, all-routes errs=0.

## iter 49 — Worked examples for all 18 Algorithms lessons (content; owner-requested)
Examples sweep reaches Algorithms: every one of the 18 lessons that lacked examples now has 2 (36 total),
tuned to the domain — concrete algorithm TRACES on small inputs (Kruskal + union-by-rank/path-compression,
Kahn's topo-sort + DAG longest-path critical path, KMP prefix function, Rabin-Karp rolling hash with a
spurious-hit, BFS/DFS), solved recurrences (Master Theorem Case 1 with a recursion-tree cross-check, the
unequal n/3 + 2n/3 split Akra-Bazzi can't touch), Big-O proofs with explicit witnesses, NP certificate
verification + a 3-SAT→Independent-Set reduction, a Vertex-Cover 2-approximation and randomized MAX-SAT 7/8,
and gradient-descent/SGD cost analysis. Each is a full step-by-step `{title, body, solution}` (KaTeX + HTML
list traces) behind a "Show working" reveal. Authored then adversarially verified by a 36-agent workflow that
re-traced every algorithm and re-derived every bound (caught & fixed real errors: an asymptotic witness
off-by-one n_0=6→7, an MST cut crossing-edge list, a malformed `C^\*`→`C^*`). Algorithms examples 4 → 40
(116 site-wide). Verified: Examples render desktop (collapsed + expanded list traces) + 390px mobile,
`node gate.js` ALL GREEN, all-routes errs=0.

## iter 48 — Worked examples for all 20 Calculus lessons (content; owner-requested)
Extended the examples push to Calculus: every one of the 20 lessons that lacked examples now has 2 worked
examples (40 total) — limits (factor/cancel, piecewise-continuity, conjugates, L'Hôpital), derivatives
(definition, rules, special functions, implicit/related-rates, curve-sketching, linearization), integrals
(antiderivatives, Riemann sums, FTC both parts, substitution & by-parts, area/volume, improper + probability),
ODEs, and the multivariable trio (partials, gradient/directional, Hessian classification). Each is a complete
step-by-step `{title, body, solution}` with KaTeX behind a "Show working" reveal. Authored then adversarially
verified by a 40-agent workflow that independently re-derived every answer (caught & fixed real errors, e.g. a
linearization accuracy claim of "2%" corrected to "9%"). Calculus examples 5 → 45 (80 site-wide). Verified:
Examples tab renders on c-integration-techniques (desktop) and c-area-volume (390px mobile), `node gate.js`
ALL GREEN, all-routes errs=0.

## iter 47 — Worked examples for 9 Linear Algebra lessons (content; owner-requested)
"Examples when we need it": added 18 worked examples (2 each) to nine LA lessons that had none —
la-vectors-operations, la-dot-product-norms, la-span-independence, la-inverse-and-systems,
la-orthonormal-gram-schmidt, la-matrix-multiplication, la-projection-least-squares, la-basis-dimension,
la-matrices-as-transformations. Each is `{title, body, solution}` with KaTeX-rendered working behind a
"Show working" reveal. Authored then adversarially verified by a workflow; 5 purely-conceptual LA lessons
correctly received none. LA examples 5 → 23 (40 total). Verified: Examples tab renders on
la-matrix-multiplication (screenshot), `node gate.js` ALL GREEN, all-routes errs=0.

## iter 46 — "Unlocked" feedback when a lesson opens new concepts (gamification / learning flow)
Completing a lesson now tells you what it opened up: if it was the last missing prerequisite for other
concepts, a "🔓 Unlocked N concept(s): <title>" toast fires alongside the +50 XP — concrete momentum feedback
(it computes the ready-frontier before/after completion). Verified: finishing "Vectors and Vector Operations"
correctly unlocks "Dot Product, Norms, and Angles". errs=0, gate ALL GREEN.

## iter 45 — "Start here" markers on the course page (learning flow)
Completing the ready-frontier trio (map iter 43, daily concept iter 44): the course page now flags the
lesson(s) you're ready to start — not done, all prerequisites met — with a gold "▶ start here" badge and a
subtle highlighted row, so within a topic you can see exactly where to pick up. errs=0, gate ALL GREEN
(a fresh user sees it on the first lesson).

## iter 44 — Concept of the Day prefers an actionable concept (learning flow)
The daily pick was purely random, often surfacing something you're not ready for. It now prefers a concept
on your **"ready to learn" frontier** (prerequisites satisfied, not started) and labels it "ready ✓" with
"all its prerequisites are done", while keeping an occasional (~25%) "a stretch ↗" peek ahead. So the
dashboard's daily nudge is something you can actually start today. Deterministic per day; errs=0, gate ALL GREEN.

## iter 43 — "Ready to learn" frontier on the Knowledge Map (learning flow)
The Constellation showed mastery, but not *what to learn next*. Now any concept whose prerequisites are all
complete but which you haven't started gets a pulsing gold dashed ring (and a legend count), so the map
answers "what's actionable right now?" — your learning frontier at a glance. The pulse respects reduced-motion.
Verified: errs=0, gate ALL GREEN; completing 3 foundational lessons surfaced 6 ready concepts with rings.

## iter 42 — Printable lessons (UX / content)
A "🖨️ Print" button on the lecture produces a clean, paper-friendly printout — the lecture text, math, and
worked examples in dark-on-white — with all the interactive chrome (sidebar, tabs, notes, widgets, code
blocks, nav, connections) stripped via print CSS. Reuses the pipeline that already powers cheatsheet printing.
Good for offline study and annotation. Verified: button present, errs=0, gate ALL GREEN, print-to-PDF
generates a 246 KB document cleanly (visual PDF inspection unavailable — poppler not installed).

## iter 41 — Independent MCQ correctness audit: 0 errors found (content quality)
A second, independent adversarial pass over the question bank: a 6-agent workflow (one subject-expert
professor per topic) re-derived the answer to a 72-MCQ sample (≈12 per topic, spread across lessons) and
checked each for a wrong key, ambiguity, or a factual/explanation error. Result: **0 genuine problems
flagged** across all six topics — validating that the original generate→adversarial-verify pipeline produced
a correctly-keyed bank. No content changes needed; documented as a quality checkpoint.

## iter 40 — Advertise keyboard shortcuts in Test + Mastery modes (UX consistency)
Added the 1–4 / Enter `<kbd>` hints to the custom-test and mastery-drill progress lines (the shortcuts already
worked there since iter 24; now they're discoverable). Gate ALL GREEN.

## iter 39 — Show mastery in the lesson header (mastery model / UX)
Your grasp of a concept was visible on the course list but not while you studied it. The lesson header now
shows the mastery level + percent ("Learning · 42%") and a thin mastery bar (when you've practiced it), so
you always know where you stand on the page you're reading. Gate ALL GREEN, errs=0.

## iter 38 — Surface the Knowledge Map & Glossary on the dashboard (UX / discoverability)
The dashboard's quick-action row promoted Review/Test/Lab/Library but not two of the most useful pages.
Added 🗺️ Knowledge Map and 📔 Glossary so they're reachable in one tap from the home screen (they were only
in the sidebar / ⌘K). Gate ALL GREEN, errs=0.

## iter 37 — Visualization Lab links each widget to its lesson (understandability / navigation)
The Lab was a dead-end — you could play with a widget but not jump to where it's taught. Each lab card now
shows "↳ <lesson title>", and a widget's page has a "📖 Read the lesson: <title> →" button (plus the topic
link), resolved by scanning lesson content for the embedded `data-viz` id. All 18 widgets link correctly.
Gate ALL GREEN, errs=0.

## iter 36 — README brought current + architecture review (docs / maintenance)
Updated the stale README to the real platform (18 widgets, 20 achievements, 897 MCQs, Mastery mode, the radial
Constellation, glossary, keyboard shortcuts, connections, ranks ladder, SRS interval previews + forecast,
accessibility, the PWA update prompt, `gate.js`, and the live URL). Logged an architecture review in ROADMAP:
layers are clean, `app.js` is large but cohesive (one IIFE with shared closures), so the shared-context split
is deferred until it's painful. Docs-only at runtime; gate ALL GREEN.

## iter 35 — Review-load forecast on the Daily Review (spaced repetition)
Pairs with iter 34's interval previews: the Daily Review now opens with a forecast strip — due now / next 24h
/ next 7 days / cards in rotation — computed from each card's stored due date, so you can see your upcoming
workload and plan sessions. Verified: errs=0, gate ALL GREEN; with 2 cards graded forward the buckets read
676 due / 1 next-24h / 2 next-7-day / 2 in rotation, matching the schedule.

## iter 34 — Anki-style interval previews on flashcard grades (spaced repetition)
The Again/Hard/Good/Easy buttons gave no sense of *when* you'd see a card again. Each now shows its projected
next-review interval under the label (e.g. Hard 1d · Good 3d · Easy 5d), via a non-mutating `projectInterval`
that mirrors the SM-2 scheduler — so grading is informed, like Anki. Logic unit-tested clean (fresh→1/1/2,
then 3/3/5, then 8/8/8; Easy ≥ Good ≥ Hard always). Gate ALL GREEN, render errs=0.

## iter 33 — Relevance ranking in the ⌘K command palette (UX)
The palette indexes ~190 items (lessons, glossary terms, widgets, pages, references) but showed matches in raw
order. Added scoring — exact title match → title prefix → title contains → sub/category contains — so the best
hit leads. Searching "vector" now surfaces the Vector glossary term, then "Vectors and Vector Operations",
then the Vector Addition widget. Gate ALL GREEN, errs=0.

## iter 32 — Graceful PWA update prompt (distribution)
Since the loop ships to the live site constantly, installed/returning PWA users could sit on cached content.
The service worker now WAITS instead of skip-waiting on install, and the page detects an installed-but-waiting
worker and shows a small "✨ A new version of Atlas is available — Refresh" prompt; clicking posts SKIP_WAITING,
the worker activates, and `controllerchange` reloads once into the fresh build. First-time install/caching is
unchanged. Verified: gate ALL GREEN, sw.js parses, site loads errs=0 (SW is a no-op on file://; the flow
engages live on the next deploy).

## iter 31 — Hardening pass + a committed content gate (workflow / tooling)
A maturity checkpoint after 24 autonomous iterations: full regression audit — old-shape save migrates safely
(all numbers finite), and all 30 routes + 18 widgets render with errs=0 and zero viz-hydration failures.
Since the audit was clean, institutionalized it: added `gate.js` (run `node gate.js`) which validates the whole
data layer — no duplicate lesson ids, every MCQ answer in range, flashcards well-formed, every embedded
`data-viz` id is a real widget, every prereq id resolves. Prints a summary + ALL GREEN; the loop's Step-3
check now runs it. Current gate: 6 topics · 113 lessons · 897 MCQs · 678 flashcards · 18 widgets, all green.

## iter 30 — Reading text-size control (accessibility / reading comfort)
Long study sessions get an in-app text-size preference (A− / A / A+ in Settings) that scales the lesson prose
via a `--read-scale` CSS variable, persisted to localStorage and applied on boot — independent of UI chrome
and browser zoom. Verified: errs=0, A+ sets the scale to 1.15 and it sticks.

## iter 29 — New visualization: k-means clustering (visualizations)
Built algo-kmeans for the flagship unsupervised-learning idea. Three gaussian blobs; Lloyd's algorithm
alternates assign (color each point by nearest centroid) and update (move each centroid to its cluster mean),
animating to convergence with a live inertia readout and a k selector (2–4). Embedded in the Algorithmic
Foundations of ML lesson. Lab catalog 17 → 18. errs=0.

## iter 28 — Five milestone achievements for long-term goals (gamification)
The achievement set had no long-horizon goals. Added 5 (15 → 20): Mastery (80% on a concept), Module Master
(finish every lesson in a module), Renaissance (study all six topics), Centurion (review 100 flashcards),
and Devoted (30-day streak) — each wired to its real trigger in the store (mastery bump, lesson complete,
card grade, streak). Logic-tested: all fire from real actions; Achievements page renders 20, errs=0.

## iter 27 — "Connections" footer turns the dependency graph into in-lesson navigation (understandability)
Each lecture now ends with a Connections block: "Builds on" (the lesson's direct prerequisites, incl.
cross-topic ones) and "Leads to" (lessons that depend on it, computed as reverse edges) as color-coded
clickable chips. So from Backpropagation you can jump back to the Chain Rule & matrix multiplication, or
forward to DQN & policy gradients. Makes the knowledge graph usable while reading, not just on the map.
Verified: errs=0, both rows render with correct prereq/dependent links.

## iter 26 — New visualization: gradient descent in 2D (visualizations)
Built calc-gd2d — the optimization picture the 1-D widget can't show. An elliptical contour map of
$f=0.12x^2+y^2$ with the descent path animated down it; the elongated bowl makes the path visibly zig-zag
across the steep axis, and pushing the learning-rate slider past the curvature limit makes it diverge. Click
anywhere to drop a new start point. Embedded in the Gradient/Directional-Derivatives lesson. Lab catalog 16 → 17. errs=0.

## iter 25 — Ranks ladder on the Progress page (gamification)
The 10-rank journey (Novice → Polymath) was only ever glimpsed as the current rank in the topbar. Added a
full Ranks ladder to Progress: every rank with its XP threshold, reached ones lit with a gold badge, the
current one highlighted ("★ you are here"), and locked ones dimmed — so the path ahead is visible and
motivating. Verified: errs=0, 10 ranks render, current/reached/locked states correct (Student at 500 XP).

## iter 24 — Keyboard shortcuts for the study loop (UX / accessibility)
A single global key handler speeds up daily practice without touching the mouse: press 1–4 (or a–d) to
answer any MCQ (quiz, custom test, mastery drill), Space to flip a flashcard then 1–4 to grade it, and Enter
to advance/submit/continue. It ignores typing in inputs and yields to open modals. Discoverable via small
`<kbd>` hints in the quiz progress line and flashcard prompts. Verified: errs=0, a quiz driven purely by
keystrokes selects answers and advances.

## iter 23 — New visualization: RNN unrolling & memory (visualizations)
Built dl-rnn for the recurrent-network idea. The network is unrolled across 6 time steps (input → hidden →
output rows) with the recurrent edge h_{t-1}→h_t drawn explicitly and an animated pulse along the hidden
chain. An impulse enters at t=1 and the hidden state $h_t=\\tanh(w_x x_t + w_h h_{t-1})$ carries it forward,
decaying by the recurrence weight; a slider for $w_h$ shows short vs long memory. Embedded in the RNN/LSTM/GRU
lesson. Lab catalog 15 → 16. errs=0.

## iter 22 — Wire existing visualizations into more lessons (understandability)
Several lessons taught a concept an existing widget illustrates but didn't embed it. Added 5 inline embeds:
the eigenvector widget in Diagonalization, the sorting visualizer in Linear-Time Sorts, the derivative widget
in Differentiation Rules, and the gridworld in both Policies/Value-Functions and Policy-Iteration. errs=0,
all 4 spot-checked lessons hydrate their inline canvas.

## iter 21 — Worked examples now span all six topics (content)
Extended iter 18's Examples tab to every subject: 12 more worked examples across determinants, optimization
& gradient-descent intuition, binary search (a full trace + the O(log n) argument), SGD updates with a note
on momentum, a Bellman backup + why γ<1, and self-attention (attention as a weighted average + why ÷√dₖ).
Ten lessons now carry worked examples, at least one per topic. Verified: errs=0, RL & LLM Examples tabs
render with correct math.

## iter 20 — New visualization: Bayes' theorem & base rates (visualizations)
Built calc-bayes for one of the least-intuitive ideas in probability/ML. A 400-person grid splits into
true-positives (gold), false alarms (violet), missed cases (rust), true-negatives; sliders for base rate,
sensitivity, and specificity recompute it live and report P(condition | +). It makes the base-rate fallacy
visceral — at a 5% prior with a 90/90 test, only ~32% of positives are real. Embedded in the
Improper-Integrals (probability connections) lesson. Lab catalog 14 → 15. errs=0.

## iter 19 — "Continue where you left off" resume card (UX / retention)
Lowering the friction to return: the store now remembers the last lesson you opened (`lastLesson`), and the
dashboard surfaces a prominent "Continue" card (topic · module · lesson, with a Resume button) above the
Concept of the Day. Directly serves the "want to come back" goal. NaN-safe schema add. Verified: errs=0,
visiting a lesson then returning shows the card resolving to that exact lesson.

## iter 18 — Worked examples activate the Examples tab (content)
The per-lesson Examples tab existed but was empty. Hand-wrote 10 worked examples (problem → revealable
solution) across four flagship lessons: eigenvalues/eigenvectors (incl. a non-diagonalizable shear), the
chain rule (3 composites), dynamic programming (Fibonacci + coin-change, with why greedy fails), and
backprop (a numeric gradient through one weight + why activations are cached). KaTeX math incl. matrices.
Verified: errs=0, the Examples tab appears and the working reveals with correct rendering.

## iter 17 — Glossary of key terms (understandability / content)
Added a searchable Glossary (data/glossary.js): 48 hand-curated, plain-language definitions of the core
concepts across all six subjects (8 each — e.g. span, eigenvector, chain rule, Big-O, backprop, Bellman
equation, attention), with KaTeX math, topic-colored chips, and live search over term/definition/topic.
New "Glossary" nav item + route; every term is also searchable in the ⌘K palette. sw.js cache → atlas-v4.
Verified: errs=0, 48 terms render, search filters correctly.

## iter 16 — Flow reflection + responsive Knowledge Map on mobile (mobile / UI)
~10-iteration flow reflection: rotation is healthy (content 7–9 · viz 10/14/15 · a11y 11 · juice 12 ·
onboarding 13) and a 390px audit found the platform holds up well (intro, lessons, tests, widgets all
scale/stack). The one real weakness: the radial Knowledge Map was a fixed ~1450px SVG that forced awkward
panning on phones. Fix: on ≤760px the map SVG scales to fit the viewport (viewBox does the work), so the
whole constellation is visible at a glance; desktop keeps the large scrollable version. Verified: desktop
map errs=0 / 113 nodes unchanged, mobile map now fits the width.

## iter 15 — New visualization: convolution & feature maps (visualizations)
Built dl-convolution, the core CNN operation. An 8×8 input (a bright square) with a selectable 3×3 kernel
(vertical/horizontal edge, blur, sharpen, identity); Play/Step slides the receptive field cell-by-cell,
computing each feature-map value as Σ(kernel × patch) and coloring it green (+) / red (−) so edge kernels
visibly light up the square's borders. Embedded in the Convolution lesson. Lab catalog 13 → 14. errs=0.

## iter 14 — New visualization: PCA / principal components (visualizations)
Built la-pca, the LA→ML bridge concept. Tilt (angle) and stretch a 64-point data cloud; the widget computes
the covariance, finds its eigenvectors analytically, and draws PC1 (gold, max-variance axis) + PC2 (sage),
reporting the % variance PC1 captures. "Project onto PC1" drops a perpendicular from every point to the axis
(violet) — the literal 1-D dimensionality reduction. Embedded in the Low-Rank/PCA lesson. Lab catalog 12 → 13.
Verified: errs=0, widget renders and the projection path works.

## iter 13 — Onboarding: first-visit welcome tour (understandability)
A new learner now gets oriented instead of dropped into a feature-dense app. A first-visit modal introduces
Atlas and its four pillars — Learn (lessons + viz), Master (Mastery-mode tests), Navigate (Knowledge
Constellation), Build (Code Playground) — with the ⌘K tip and a save-is-local note; it shows once
(localStorage flag) and a sidebar "Guide / tour" button reopens it anytime. Esc/backdrop/CTA all close it.
Verified: errs=0, shows on first visit, reopens via Guide, no errors navigating after dismiss.

## iter 12 — Juice: level-up celebration + confetti (animations)
Added a delight beat. The store now detects level-ups (XP crossing a rank threshold) and queues them;
flushAchievements fires a centered "Level N · <rank name>" celebration modal with a 130-particle confetti
burst. Confetti also fires on a perfect (100%) quiz and on clearing a Mastery drill. All of it respects
prefers-reduced-motion (no-op when the user asks for less motion). Verified: errs=0; granting XP across the
150-point threshold pops the "Level 2 · Apprentice" celebration.

## iter 11 — Accessibility pass (accessibility)
Rotated to a neglected area. Added: a `prefers-reduced-motion` media query that disables reveals/transitions/
animations for users who ask for less motion; `:focus-visible` outlines on every interactive element
(nav, buttons, choices, cards, tabs) for keyboard users; a "Skip to content" link; `aria-current="page"`
on the active nav item; `aria-label`s on the icon-only menu button and nav landmarks; `aria-hidden` on
decorative glyphs; and a polite `aria-live` region for toasts so achievements are announced to screen readers.
Verified: all routes errs=0, aria-current + skip link working, no visual regression.

## iter 10 — Two new interactive visualizations: neural-net forward pass + attention heatmap (visualizations)
Interleaving off the question-bank run: built two widgets that filled the biggest viz gaps. **Neural Network
Forward Pass** (dl-neural-net) — drag 3 inputs, watch weighted sums → ReLU hidden → softmax outputs with
green/red signed edges and animated signal flow; embedded in the Neuron/MLP lesson. **Self-Attention Heatmap**
(llm-attention) — a 7-word sentence where each row is a word's attention over the others ("it" → "cat"),
hover to read weights; embedded in the DL attention lesson and the LLM self-attention lesson. Lab catalog
10 → 12. Verified: all routes errs=0, both widgets hydrate inline and in the Lab.

## iter 9 — Question bank: batched expansion of the remaining 4 topics (content / owner ask)
Finished the bank-doubling goal in one batched pass: a 150-agent author+verify workflow added ~4 new
adversarially-checked MCQs to each of the 75 lessons in algorithms, deep learning, RL, and LLMs — 293 added
(algorithms +80, deep-learning +76, RL +61, llm +76; duplicates auto-skipped). **Whole bank 604 → 897**, all
6 topics now ~8 MCQs/lesson. With Mastery mode, misses recur until passed. Verified: 0 bad indices, errs=0.
Next: the loop interleaves other compass areas (new visualizations, UI/a11y polish) now the bank goal is met.

## iter 8 — Question bank expansion: Calculus doubled to 176 MCQs (content / owner ask)
Continued the ever-growing-bank push: a 44-agent author+verify workflow added 4 new adversarially-checked
MCQs to each of the 22 Calculus lessons — 88 added (88 → 176, 8/lesson); whole bank 516 → 604. Verified:
0 bad indices, 0 dupes, all routes errs=0. (Workflow task-output was slow to flush, so results were also
reconstructed from the verify-agent transcripts as a cross-check — both matched.) Next topic: algorithms.

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
