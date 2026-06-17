# Atlas — Changelog

Prepend new entries under this header. Include the loop-iteration number in the heading.

## iter 230 — Back-to-top button on long pages (UI/UX)
Freshest lane (UI/UX, last ~iter 208). The site has many long pages — lessons, the 50-widget Lab, the 55-achievement
Hall — but no quick way back to the top once you've scrolled down. Added a floating **back-to-top button** (bottom-right,
circular, gold ↑) that fades in past ~600px of scroll and smooth-scrolls to the top on click.
Implementation reuses the **exact mechanism of the shipping reading-progress bar**: one global button created in
`initReadProgress`, toggled by `updateToTop()` inside the same rAF-throttled scroll handler that drives the progress bar
(reading the same `document.scrollingElement`), and hidden on every route change (router). Smooth scroll respects
`prefers-reduced-motion`. Small reusable CSS (`.to-top` / `.to-top.on`), z-index below the mobile sidebar so it never
covers the menu.
Verified: `gate.js` ALL GREEN; all-routes smoke (10 routes) **errs=0/kErr=0** with the button present as a **single
global instance** (`toTopBtn=1`); at the top of a page the button is correctly hidden (`.on`=false); the visual renders
(forced-on screenshot). Note: headless Chrome can't apply programmatic scroll to the document (every element reports
`moved=0` despite a 6662px page), so the scroll-triggered show/hide and click-scroll can't be exercised in headless —
but the feature is correct by parity with the read-progress bar, which uses the identical scrollingElement + scroll
listener and has shipped working. SW cache `atlas-v172` → `atlas-v173`.

## iter 229 — Signal-propagation / initialization explorer — the 50th widget (visualizations)
New widget **`dl-signal-propagation`** (the **50th** — a round milestone), embedded in
`dl-initialization-and-vanishing-gradients` after the He-init section (it had a deep-dive but no viz). Makes the
exponential-in-depth heart of vanishing/exploding gradients tangible.
- Bars show the activation RMS after each of 24 layers, given a per-layer **gain g** (how much the weights scale the
  signal): plotted on a log scale from a center "preserved (×1)" line. At **g = 1** the bars stay flat; **below 1** they
  descend (vanish); **above 1** they rise (explode) — exponentially, so even g = 0.9 or 1.1 is fatal deep enough.
- A **g slider** plus **too small (0.85)** / **good init (1.0)** / **too big (1.15)** presets. The note reports the
  signal multiplier g²⁴ and a verdict (healthy / vanishes / explodes), tying it back to why Xavier/He aim for g ≈ 1 and
  why normalization + residuals exist.
Math validated in node (g=1→×1.0; g=0.85→×0.020; g=1.15→×28.6). Note uses plain HTML (`g<sup>24</sup>`), not `$…$`.
Verified: `gate.js` ALL GREEN (**50 widgets**, embed resolves); Lab-route run — flat/vanish/explode presets all correct,
**err=0**; all-routes smoke (10 routes incl. `#/lab/dl-signal-propagation` + the embedded lesson) **errs=0/kErr=0**;
mobile 390px scales. SW cache `atlas-v171` → `atlas-v172`.

## iter 228 — Mastery/progress bars sweep up from empty on load (animation/juice)
Freshest-lane pick (animation was last at iter 212). The course and Progress pages already cascade-count their stats and
sweep the daily-goal ring, but the **mastery/progress bars snapped to their value statically**. Now they **animate from
0% to their value** on load — extending the "look how far you've come" flourish to the bars: opening a course shows its
per-module and per-lesson bars fill in, and the Progress page's recent-test bars do the same.
Implementation: a tiny `sweepBars(root)` helper resets each `.mastery-fill` to `0%` then restores its inline target on a
double-rAF, letting the existing `transition: width .5s` do the work — **reduced-motion safe** (early-returns), **no new
CSS** (the transition already existed). Gave the course module bars the `.mastery-fill` class so they sweep too. Called
in `viewCourse` and `viewStats`. No render-site rewrites, no new state.
Verified: `gate.js` ALL GREEN; with seeded completion a module bar reads **0% mid-sweep (~120ms) → its target when
settled** (err=0) — the animation provably runs from empty; all-routes smoke (10 routes, course/stats changed)
**errs=0/kErr=0**. Bars are unchanged `.mastery-fill` (already mobile-verified); the change is animation-only.
SW cache `atlas-v170` → `atlas-v171`.

## iter 227 — Code exercises across LA / Calculus / Deep Learning (new functionality / active practice)
Extended hands-on coding from **11 → 14 lessons**, and — unlike the algorithm-heavy earlier batches — spread them across
the **core ML math** so the playground proves it works everywhere:
- **`la-matrix-multiplication`** — the triple-loop **matmul** straight from the definition → `19 22 43 50`.
- **`c-definite-integral-riemann`** — a **midpoint Riemann sum** approximating ∫₀¹x² dx with n=1000 → `0.3333` (= 1/3).
- **`dl-loss-functions`** — **softmax** (max-subtraction for stability, then normalize) on logits [2,1,0] → `0.665 0.245
  0.090`.
JavaScript again (verifiable headless). Byte-stable per-file injection (no-op guard each; code HTML-escaped to round-trip).
Verified: **all 9 embedded JS exercises decoded + executed as the playground's `runJS` → output === `data-expected`** (9
pass / 0 fail); `gate.js` ALL GREEN (2,368 MCQs · 49 widgets); in-browser the softmax exercise mounts (editor + Run) and
shows **"✓ Output matches expected"** (err=0); all-routes smoke (10 routes incl. all 3 lessons + the playground)
**errs=0/kErr=0**. Reuses the existing Playground component (no new mobile layout). SW cache `atlas-v169` → `atlas-v170`.

## iter 226 — Discount-factor γ explorer (visualizations)
New widget **`rl-discounting`** (the **49th**), embedded in `rl-mdp-formalism` right after the "Discount Factor γ"
section. RL was the most viz-thin topic (4 widgets), and γ — arguably RL's most consequential single hyperparameter —
was un-visualized.
- Bars show the weight **γᵗ** of a reward *t* steps in the future, decaying geometrically; the first (immediate) reward
  is gold, the rest fade with their weight. A dashed **effective-horizon** marker sits at **1/(1−γ)** (or labels itself
  "off-chart" when γ is large).
- A **γ slider** plus **myopic (0.5)** / **far-sighted (0.99)** presets. The note reports the discounted return
  G = Σγᵗ and the horizon, and switches its verdict (myopic / balanced / far-sighted) with γ.
- Drag γ and the decay curve visibly stretches (γ→1, long horizon) or collapses to the first bar (γ→0, myopic) —
  the felt meaning of "how far ahead the agent looks."
Math validated in node: G and 1/(1−γ) match (γ=0.9 → G≈9.28, horizon 10; γ=0.99 → horizon 100). Note uses plain
HTML (`γ<sup>t</sup>`, `<i>t</i>`), not `$…$`, per the viz-note landmine.
Verified: `gate.js` ALL GREEN (**49 widgets**, embed resolves); Lab-route run — init (γ=0.9) and far-sighted (γ=0.99,
"horizon 100 off-chart") notes correct, **err=0**; all-routes smoke (10 routes incl. `#/lab/rl-discounting` + the
embedded lesson) **errs=0/kErr=0**; mobile 390px the bars + marker scale and stay legible. SW cache `atlas-v168` → `atlas-v169`.

## iter 225 — 14-day consistency strip on the dashboard (gamification / habit · retention)
The dashboard (the daily landing) showed a streak *number* but not your recent consistency — and the Stats activity
heatmap is a separate page you visit deliberately. Added a compact **14-day consistency strip** right under the
today-strip: the last two weeks as cells (filled sage when you studied that day, **today ringed in gold**), with a label
"🔥 N-day streak · studied K of the last 14 days · **today ✓** / study today to keep it alive". It reinforces the
streak habit at the exact moment of return, and the nudge prompts you to keep the streak alive if you haven't studied
today. Fresh gamification/habit lane (last gamification iter 220); diversifies from the recent viz/deep-dive/practice runs.
Pure additive to `viewDashboard`, computed from the existing `activity` map (last-14-days keys in the same `YYYY-MM-DD`
format), plus a small reusable CSS block (`.consistency`/`.cs-cell` — flex cells with `aspect-ratio:1` so they fit any
width). **No new state, no data change.**
Verified: `gate.js` ALL GREEN; with seeded activity the strip renders **14 cells, correct filled count, today ringed**,
label shows "today ✓" when today is studied (err=0); all-routes smoke (10 routes, home route changed) **errs=0/kErr=0**;
mobile 390px the cells flex to fit and stay legible. SW cache `atlas-v167` → `atlas-v168`.

## iter 224 — Deeper dives for Probability & Statistics — completing the depth pass (understandability)
PS was the lone topic still at 2 "Deeper dives"; raised it to **4**, so **every subject now carries ≥3** (LA 3, Calc 3,
Algo 3, DL 4, LLM 4, RL 4, PS 4) — the depth pass is complete. Two on ML-central ideas:
- **`ps-conditional-expectation`** — *conditional expectation is the best predictor*: among all $g(X)$, $\mathbb{E}[Y\mid X]$
  minimizes $\mathbb{E}[(Y-g(X))^2]$ — so regression (linear or neural) is just an attempt to learn the conditional mean;
  plus the tower property and the total-variance (explained/unexplained) decomposition.
- **`ps-law-of-large-numbers`** — *LLN vs CLT*: the LLN says $\bar X_n\to\mu$; the CLT says the error is
  $\mathcal{N}(0,\sigma^2/n)$, shrinking like $\sigma/\sqrt n$ — why halving error needs 4× data (Monte Carlo, polling
  margins, minibatch noise), and the finite-variance caveat (Cauchy breaks it).
Byte-stable injection (no-op guard; `String.raw` LaTeX; even-`$` + no-markdown pre-checks; no raw `<` in math). Verified:
`gate.js` ALL GREEN incl. render-hazard lints (2,368 MCQs · 48 widgets); the conditional-expectation dive (densest, 44
`$`) renders **katex=22, kErr=0, errs=0** and fires **deep-thinker**; all-routes smoke (10 routes incl. both lessons)
**errs=0/kErr=0**. SW cache `atlas-v166` → `atlas-v167`.

## iter 223 — Three more runnable code exercises for Algorithms (new functionality / active practice)
Extended the hands-on coding practice from **8 → 11 lessons**, adding runnable JS exercises (each a complete, correct
reference implementation the learner runs for an instant ✓, then edits) to three foundational data-structure/algorithm
lessons that had none — in three different modules:
- **`a-trees-heaps`** — a **binary search tree**: insert (smaller-left/bigger-right) then inorder traversal → `1 2 3 4
  5 6 7 8 9`, revealing the BST property that inorder is always sorted.
- **`a-mst-union-find`** — **union-find** with path halving: merge edges, count connected components → `3` (the engine
  inside Kruskal's MST).
- **`a-string-algorithms`** — **naive substring search**: slide the pattern, record every match index → `0 7` (occurrences
  of "abra" in "abracadabra"; motivates KMP/Rabin-Karp).
JS again, so each is verifiable headless. Byte-stable injection (no-op guard; code HTML-escaped so `<`/`>`/`&` round-trip).
Verified: **all 6 embedded JS exercises decoded + executed as the playground's `runJS` → output === `data-expected`** (6
pass / 0 fail); `gate.js` ALL GREEN (2,368 MCQs · 48 widgets); in-browser the union-find exercise mounts (editor + Run)
and shows **"✓ Output matches expected"** (err=0); all-routes smoke (10 routes incl. all 3 lessons + the playground)
**errs=0/kErr=0**. Reuses the existing Playground component (no new mobile layout). SW cache `atlas-v165` → `atlas-v166`.

## iter 222 — Binary-vs-linear search race visualizer (visualizations)
New widget **`algo-binary-search`** (the **48th**), embedded in `a-binary-search` after the classic-algorithm section —
which already had a Python code exercise, so the lesson is now read + watch + code. The most iconic O(log n)-vs-O(n)
contrast, made a race.
- The same 21-value sorted array is searched **two ways at once**: a top "Binary search · O(log n)" row narrows a
  lo–hi window around a highlighted midpoint (eliminated cells grey out); a bottom "Linear search · O(n)" row scans a
  pointer left-to-right. Each row shows a **live comparison count**, and a caption narrates the binary step
  ("23 < 31 → search right half").
- Play / Step / New target / Reset. The gap is visceral — binary finishes in ≤ ⌈log₂ n⌉ = 5 while linear can take 21 —
  and the note scales it up ("at a million items: binary ~20, linear up to a million").
Logic validated in node first: comparison counts are exact across all targets (midpoint → binary 1, last element →
binary 5 / linear 21; max binary = 5 = ⌈log₂ 22⌉).
Verified: `gate.js` ALL GREEN (**48 widgets**, embed resolves); Lab-route run shows the race (binary found in 1 while
linear still scanning at 7 comparisons) — err=0; all-routes smoke (10 routes incl. `#/lab/algo-binary-search` + the
embedded lesson) **errs=0/kErr=0**; mobile 390px the two rows scale and stay legible. SW cache `atlas-v164` → `atlas-v165`.

## iter 221 — Deeper dives for Linear Algebra & Calculus — the last two thin topics (understandability)
LA and Calculus were the only topics still at **1** "Deeper dive" each; raised both to **3** (the depth pass now covers
every subject — minimum is PS at 2). Four `<details class="deep-dive">` on foundational ML-math:
- **`la-svd`** — *every matrix is a rotation, a stretch, and another rotation*: $A=U\Sigma V^{\top}$ sends the unit sphere
  to an ellipsoid whose semi-axes are the singular values; why it's the "fundamental theorem" (works for *every* matrix,
  unifies PCA / Eckart–Young / the four subspaces).
- **`la-four-subspaces-rank`** — *the four subspaces as a jigsaw*: row⊥null fill $\mathbb{R}^n$, col⊥left-null fill
  $\mathbb{R}^m$; all dimensions hinge on rank $r$; $A$ maps the row space one-to-one onto the column space and crushes
  the null space.
- **`c-chain-rule`** — *the chain rule is the engine of backprop*: a net is one composite function; backprop is the chain
  rule applied right-to-left with memoization; reverse-mode is efficient because the loss is one scalar; vanishing
  gradients are the product of many sub-1 factors.
- **`c-gradient-directional`** — *why the gradient is steepest ascent ⊥ level sets*: $D_uf=\nabla f\cdot u=\lVert\nabla
  f\rVert\cos\theta$ is maximized along $\nabla f$, and is $0$ along a contour — so $\nabla f$ crosses the contours at
  right angles (the basis of gradient descent and the Lagrange condition).
Injected byte-stably across both data files (no-op guard each; `String.raw` LaTeX; even-`$` + no-markdown pre-checks; no
raw `<` in math). Verified: `gate.js` ALL GREEN incl. render-hazard lints (2,368 MCQs · 47 widgets); the four-subspaces
dive (densest, 56 `$`) renders **katex=28, kErr=0, errs=0** and fires **deep-thinker**; the gradient dive renders
**katex=15, kErr=0**; all-routes smoke (10 routes incl. all 4 lessons) **errs=0/kErr=0**. SW cache `atlas-v163` → `atlas-v164`.

## iter 220 — Per-module progress bars + a module-completion celebration (gamification / UI)
The course page listed each module's lesson *count* but showed **no progress through it**, and finishing a whole module
— a meaningful milestone — passed silently. Fresh gamification/delight lane (last gamification was iter 209). Two parts:
- **Per-module progress** on every course page: each module header now shows **"X/N done"** (turning a sage **"✓
  complete"** when finished) above a thin progress bar (gold while in progress, sage when done) — so you can see how far
  through each unit you are at a glance.
- **Module-completion celebration**: completing a module's *last* lesson fires **confetti + a "📗 Module complete!"
  toast** (guarded to fire once, only on the completion that finishes the module, and never for single-lesson modules).
Pure additive to `viewCourse` + the lesson-complete handler — reuses existing `confetti()`/`toast()` and theme tokens;
**no new state, no CSS, no data change**.
Verified: `gate.js` ALL GREEN; with a seeded save the course page shows **5 module bars** — "Foundations ✓ complete"
(full sage bar) and "Common Distributions 2/5 done" (partial gold), err=0; completing the last lesson of a 3/4-done
module fired **confetti + "📗 Module complete!: Foundations of Probability"** (err=0); all-routes smoke (10 routes)
**errs=0/kErr=0**; mobile 390px the per-module bars stay legible. SW cache `atlas-v162` → `atlas-v163`.

## iter 219 — Runnable in-lesson coding exercises for 3 algorithm lessons (new functionality / active practice)
The `data-code` infrastructure (an embedded editor that runs JS natively / Python via Pyodide and **self-checks output
against `data-expected`**) existed but reached only **5 of 148 lessons**. Reading about an algorithm isn't coding it —
so added **runnable JavaScript exercises** (5 → 8 lessons) to three foundational algorithm lessons that had none, each a
complete, correct reference implementation the learner runs (instant ✓), edits, and experiments with:
- **`a-divide-and-conquer`** — **merge sort** (split, sort halves, merge) → `1 2 3 4 5 7 8 9`.
- **`a-graph-representations-traversal`** — **BFS** with an explicit queue → `A B C D E F` (the exact order its viz
  animates; the lead-in nudges swapping `shift()`→`pop()` to get DFS).
- **`a-greedy`** — **activity selection** (earliest-finish-first) → `4`.
Chose JavaScript precisely because it runs in-browser *and* is fully verifiable headless (no Pyodide/network) — diversifies
from the recent viz/deep-dive stretch. Injected byte-stably (no-op guard; code HTML-escaped programmatically so `<`/`>`/`&`
round-trip through `textContent`).
Verified: extracted each embedded block, **decoded the HTML entities and executed it exactly as the playground's `runJS`
does → output === `data-expected` for all 3** (3 pass / 0 fail); `gate.js` ALL GREEN (2,368 MCQs · 47 widgets); in-browser
the exercise mounts (editor + Run), running it shows **"✓ Output matches expected"** (err=0); all-routes smoke (10 routes
incl. all 3 lessons + the playground) **errs=0/kErr=0**. Reuses the existing Playground component (already embedded in 5
lessons), so no new mobile layout. SW cache `atlas-v161` → `atlas-v162`.

## iter 218 — Hash-table visualizer: collisions & load factor (visualizations)
New widget **`algo-hashing`** (the **47th**), embedded in `a-hash-tables` after the "Load Factor, Resizing, and
Amortized Cost" section — a core data structure that had no viz, where the "why O(1) on average" story is genuinely
visual and surprising.
- m bucket rows; inserted keys land by **h(k)=k mod m** and **chain** within their bucket, each cell colored by chain
  length (sage 1 / gold 2 / rust 3+) so collisions are obvious at a glance.
- **+1 / +8 keys**, **Find a key** (highlights the hit + reports comparison count), **Reset**, and a **table-size m**
  slider. The note shows live **load factor α=n/m**, longest chain, and **expected lookup ≈ 1+α/2**.
- The teaching beat: pile on keys (or shrink m) and watch α climb past 1, chains grow, and the expected-lookup cost
  rise — the visceral case for keeping α low and resizing (O(1+α)).
Verified: `gate.js` ALL GREEN (**47 widgets**, embed resolves); Lab-route run (seed 9 keys, +16, Find) shows
**n=25, m=11, α=2.27, longest chain 6, expected lookup 2.14, "Found key 26 in bucket 4 after 1 comparison"** — err=0;
all-routes smoke (10 routes incl. `#/lab/algo-hashing` + the embedded lesson) **errs=0/kErr=0**; mobile 390px the bucket
rows scale and stay legible. SW cache `atlas-v160` → `atlas-v161`.

## iter 217 — Deeper dives for the Reinforcement-Learning track (understandability — owner's "depth" love)
RL holds the most abstract "but *why*?" ideas in the curriculum yet had only **1** "Deeper dive" (in the
policy-gradient lesson). Added **3** (1 → 4), each a `<details class="deep-dive">` on a concept learners routinely
struggle with — diversifying away from the recent viz/new-functionality stretch (understandability wasn't the last two
iters):
- **`rl-value-iteration`** — *why value iteration always converges*: the Bellman optimality operator $T$ is a
  $\gamma$-contraction in max-norm ($\lVert TU-TV\rVert_\infty \le \gamma\lVert U-V\rVert_\infty$), so by Banach's
  fixed-point theorem iterating it from anywhere lands on the unique $V^\star$ with error $\le \gamma^k$. Explains why
  large $\gamma$ converges slowly, and why policy evaluation ($T^\pi$) works for the same reason.
- **`rl-td-learning`** — *bootstrapping*: MC's return $G_t$ is unbiased but high-variance; TD's target
  $r+\gamma V(s')$ is biased (leans on its own estimate) but low-variance and learnable online (essential for continuing
  tasks) — the bias-variance trade, and the seed of the deadly triad.
- **`rl-sarsa-qlearning`** — *on-policy vs off-policy*: SARSA uses the action actually taken (evaluates the policy it
  follows, exploration included); Q-learning uses $\max_{a'}Q$ (learns the greedy policy while exploring) — the
  cliff-walking split, and why off-policy is what lets DQN learn from a replay buffer.
Injected byte-stably (no-op guard; `String.raw` LaTeX; even-`$` + no-markdown pre-checks). Verified: `gate.js` ALL GREEN
incl. render-hazard lints (2,368 MCQs · 46 widgets); the value-iteration dive (densest, 52 `$`) renders **katex=25,
kErr=0, errs=0** and fires the **deep-thinker** achievement; all-routes smoke (10 routes incl. all 3 lessons)
**errs=0/kErr=0**. (No money/`<`-in-math, so neither render landmine applies.) SW cache `atlas-v159` → `atlas-v160`.

## iter 216 — Recent-test performance trend on the Progress page (new functionality / UI · retention)
The app **stored every custom test's score** (last 25) but only ever showed the *count* ("Tests taken: N") — the
learner could never see their exam **performance or trajectory**, one of the strongest "see your progress → come back"
motivators. Added a **"Recent tests"** section to the Progress page (between Activity and Concept mastery): a running
**Average** and **Best**, then the last 10 tests as rows — scope label + a color-coded score bar (sage ≥90% / gold ≥70%
/ rust below) + `correct/total · %`. Deliberately non-viz this iteration (a clean Stats/UX panel, not a Lab widget) to
diversify after a viz-heavy stretch, per the iter-215 owner note.
Pure additive: reuses the existing `tests` array + `.mastery-bar` styles + theme tokens — **no new state, no CSS, no
data change**. Gracefully absent when no tests have been taken.
Verified: `gate.js` ALL GREEN; with seeded history the section renders with the correct summary (**Average 80%, Best
100%** for scores [90,70,100,78,60]) and color-coded bars (err=0); the **empty-tests** case is handled (section omitted,
`#/stats` renders clean in the all-routes smoke); all-routes smoke (10 routes) **errs=0/kErr=0**; mobile 390px the
section stays legible (Average 77%/Best 100% for the 3-test seed). SW cache `atlas-v158` → `atlas-v159`.

## iter 215 — Orthogonal-projection visualizer: least-squares geometry (visualizations)
New widget **`la-projection`** (the **46th**), embedded in `la-projection-least-squares` after "The Geometry of
Orthogonal Projection". Chose a topic not visualized in many iters (Linear Algebra) and the concept that underpins
linear regression / least squares / PCA reconstruction — none of which had a geometric viz.
- A target vector **b** (gold), a line through the origin **span(a)**, the projection **p = (aᵀb)a** (sage, the
  "shadow"), and the residual **e = b − p** (rust dashed) drawn with a right-angle marker at p.
- **Drag b** (or tilt the line) and p slides to stay the **closest point on the line to b** while the right angle is
  preserved — the live readout shows aᵀe ≈ 0 (the normal equation) and |e| (the minimized distance). This makes
  "closest point ⇔ perpendicular error" tangible: the geometry behind least squares.
- Mouse + touch drag; two handles (b-tip, line-tilt); fully synchronous first paint.
Math validated in node before building: aᵀe = 0 to machine precision for all configs, and |e| equals a brute-force grid
search of the minimum distance from b to the line — so p is provably the least-squares closest point.
Verified: `gate.js` ALL GREEN (**46 widgets**, embed resolves); Lab-route screenshots — initial paint shows
**p=(2.84,1.14)**, |e|=1.47, aᵀe≈0 (err=0), and after **dragging b to (−0.5, 3.2)** p tracks to **(0.67,0.27)**,
|e|=3.16, aᵀe≈0, right angle preserved (err=0); all-routes smoke (10 routes incl. `#/lab/la-projection` + the embedded
lesson) **errs=0/kErr=0**; mobile 390px the canvas scales and stays legible. SW cache `atlas-v157` → `atlas-v158`.

## iter 214 — Deeper dives for the LLM track + homework celebration fix (understandability · correctness)
The LLMs topic — the owner's frontier interest — had just **1** "Deeper dive" (it sat in the self-attention lesson),
while it holds some of the hardest "but *why* that detail?" ideas in modern AI. Added **3** (1 → 4), each a
`<details class="deep-dive">` on a concept learners most often take on faith:
- **`l-multihead-and-causal-masking`** — *why attention divides by $\sqrt{d_k}$*: dot products of $d_k$ unit-variance
  terms have SD $\sqrt{d_k}$, so unscaled scores saturate the softmax (near one-hot, vanishing gradient); dividing by
  $\sqrt{d_k}$ restores variance ≈1 so heads of any width stay trainable. That's why it's *scaled* dot-product attention.
- **`l-inference-efficiency`** — *why the KV-cache turns $O(n^3)$ generation into $O(n^2)$*: causal keys/values for the
  prefix never change, so cache them and attend only the new query — $O(t)$ per step instead of $O(t^2)$; the memory
  cost is exactly what motivates multi-query/grouped-query attention and cache quantization.
- **`l-rlhf-and-preference-optimization`** — *how DPO drops the reward model and the RL loop*: the KL-regularized optimum
  $\pi^\star \propto \pi_{\text{ref}}\exp(r/\beta)$ inverts to express the reward as a policy log-ratio; substituting into
  the Bradley–Terry loss cancels the normalizer, leaving a single supervised loss on preference pairs.
**Also fixed a real correctness gap:** the homework "Show solution" handler awarded XP but never called
`flushAchievements()` — the lone XP path that didn't — so the **Homework-Hero** unlock was silent and (since iter 212)
the **daily-goal celebration** couldn't fire from homework. Added the call; now every XP-earning action surfaces its
rewards consistently.
Injected byte-stably (no-op guard; `String.raw` LaTeX; even-`$` parity + no-raw-markdown pre-checks). Verified:
`gate.js` ALL GREEN incl. render-hazard lints (2,368 MCQs · 45 widgets); the √d_k dive renders **katex=23, kErr=0,
errs=0** and fires the **deep-thinker** achievement; the DPO dive (most complex LaTeX) renders **kErr=0/errs=0**;
all-routes smoke (11 routes incl. all 3 lessons + a homework lesson) **errs=0/kErr=0**. (No money/`<`-in-math, so
neither render landmine applies.) SW cache `atlas-v156` → `atlas-v157`.

## iter 213 — Fundamental Theorem of Calculus visualizer: area accumulates (visualizations)
New widget **`calc-ftc-accumulation`** (the **45th**), embedded in `c-fundamental-theorem` right after the
"Accumulation Function" section. The FTC is arguably the single most important result in all of calculus, and it had
**no visualization**. Owner loves viz; anti-monotony (last viz iter 211). Two stacked panels:
- **Top** — the integrand f(t), with the signed area from the left endpoint up to a sweeping x shaded (green where
  f>0, rust where f<0), and the point (x, f(x)) marked.
- **Bottom** — the accumulation function A(x)=∫f drawn as x sweeps, with a **red tangent line whose slope always equals
  f(x)** — making **A′(x)=f(x)** (FTC Part 1) literally visible: where f is tall A climbs steeply, where f=0 A is flat
  (a turning point), where f<0 A falls.
- **Play** sweeps x left→right; a **sweep-x slider** scrubs manually; an **integrand select** (a Gaussian bump, a sine
  wave, a line) shows different accumulations (the bump → an S-curve; the odd functions → A returns to 0 by symmetry).
A is computed by cumulative-trapezoid integration. Math validated in node before building: A matches the closed-form
antiderivatives (line & sine both integrate to 0 over the symmetric domain; the bump → 3√π ≈ 5.317), and the numeric
A′ matches f to <1e-3 everywhere — so the tangent-slope claim is exact. (Note text uses plain unicode "A′(x)=f(x)",
not `$…$`, per the viz-note landmine.)
Verified: `gate.js` ALL GREEN (**45 widgets**, embed resolves); Lab-route screenshots — (a) initial paint on the bump
shows **A(0)=2.66** with **slope=3.00** at the peak (err=0), (b) sine at x=−1.5 shows **A=−2.01**, f<0 → "A falls",
rust negative-area shading (err=0); all-routes smoke (10 routes incl. `#/lab/calc-ftc-accumulation` + the embedded
lesson) **errs=0/kErr=0**; mobile 390px both panels scale and stay legible. SW cache `atlas-v155` → `atlas-v156`.

## iter 212 — "Daily goal reached!" celebration the moment you cross it (animation/juice · retention)
The daily XP goal is the core "come back every day" mechanic, yet **crossing it was silent** — only a static "hit! 🎉"
appeared on the *next* dashboard visit. Now the instant today's XP crosses the goal — mid-quiz, mid-review, grading a
card — you get **confetti + a "Daily goal reached!" toast**, rewarding the habit exactly when it happens. Anti-monotony:
first animation/juice move in a while (last was ~iter 120); owner loves delight + the come-back loop.
Implementation mirrors the existing `_freezeJustUsed`/`drainLevelUps` transient-flag pattern: `addXP` detects the
once-per-day crossing (`prev < goalXp && now ≥ goalXp && goalCelebrated !== today`), sets a transient
`_goalJustReached`, and stamps `goalCelebrated` (new state field). The universal `flushAchievements()` hook (already
called on every XP-earning path — quiz/test/recall/flashcard/daily-mix) drains it and fires `confetti()` + a toast.
State-safe: new `goalCelebrated` added to `blank()` and the `load()` typeof-merge, so prior saves load unchanged.
Verified: `gate.js` ALL GREEN; **node tests** of the crossing logic — old-shape save (no field) loads, crossing 45→53
fires `goalJustReached` exactly once, more XP the same day does **not** re-fire, starting already-above-goal never
fires; **browser E2E** — seeding today at 49 XP then grading one flashcard fired **confetti + "Daily goal reached!"
toast** (err=0); all-routes smoke (14 routes) **errs=0/kErr=0** (no regression from touching the core `addXP` +
universal `flushAchievements`). SW cache `atlas-v154` → `atlas-v155`.

## iter 211 — Graph-traversal visualizer: BFS vs DFS (visualizations)
New widget **`algo-graph-traversal`** (the **44th**), embedded in `a-graph-representations-traversal`. The entire
Algorithms **graph module** (traversal, shortest paths, MST) had **zero visualizations** — and traversal is both its
most foundational idea and its most "watchable" one. Owner loves viz + delight; anti-monotony (last viz was iter 207).
- A fixed 9-node graph (A–I, branching + cycles) is explored by **BFS (a queue)** or **DFS (a stack)**. Press **Play**
  and the frontier animates; nodes are colored by state (gold = discovered, rust = current, green = visited) and stamped
  with their **visit order**, while the **discovery-tree edges** light up green.
- The live **queue/stack panel** below the graph shows the frontier contents with the "next to be taken" cell
  highlighted (front for BFS, top for DFS) — making the FIFO-vs-LIFO distinction tangible.
- **Click any node** to restart from it; **Step**/**Reset**; **BFS⇄DFS** select. The note explains why a queue gives
  shortest paths (rings) and a stack gives a deep plunge (recursion / cycle detection / topo-sort).
Correct by construction: BFS yields the clean ringed order **A B C D E F G H I**; DFS yields the deep order
**A D G I H E F C B** — both validated against an independent node simulation before wiring up.
Verified: `gate.js` ALL GREEN (**44 widgets**, embed id resolves); Lab-route screenshots of (a) initial synchronous
paint, (b) BFS mid-traversal (rings + queue "G H I"), (c) full DFS (deep order, stack empty), (d) node-click changing
the start to F — all **err=0**; all-routes smoke (10 routes incl. `#/lab/algo-graph-traversal` + the embedded lesson)
**errs=0/kErr=0**; mobile 390px the canvas scales and stays legible. SW cache `atlas-v153` → `atlas-v154`.

## iter 210 — Deeper dives for the Algorithms track (understandability — owner's "depth / hard-concept" love)
Algorithms was the **only one of the 7 subjects with zero "Deeper dive" expandables** — odd, since it holds some of the
hardest "but *why* does this work?" ideas. Authored **3** of them (0 → 3), each a `<details class="deep-dive">` appended
to its lesson, on the concepts learners most often half-understand:
- **`a-dynamic-programming`** — *DP is just remembering*: the naive Fibonacci call tree is $\approx\phi^n$ nodes because
  it re-derives the same subproblems; memoizing collapses it to $O(n)$. Overlapping subproblems + optimal substructure;
  top-down vs bottom-up; Fibonacci's $O(1)$-space table.
- **`a-amortized-analysis`** — *why a dynamic array's append is $O(1)$ even though some appends copy everything*: the
  banker's argument (3 coins/append, 2 banked to fund the next resize) and the aggregate view ($1+2+4+\cdots+n<2n$), plus
  why geometric growth — not fixed $+k$ — is what makes it converge.
- **`a-recurrences-master-theorem`** — *read $n\log n$ off the recursion tree*: every level of merge sort's tree does
  $cn$ work over $\log_2 n$ levels; the three Master-Theorem cases are just "leaves heaviest / balanced / root heaviest."
Injected byte-stably (no-op guard first; `String.raw` to preserve single-backslash LaTeX, matching how content loads);
a pre-write check enforces even-$ parity, no raw markdown, no template artifacts. **No code/schema change** — pure content.
Verified: `gate.js` ALL GREEN incl. render-hazard lints (2,368 MCQs · 43 widgets); live render of the DP dive shows
**katex=14, kErr=0, errs=0** and expanding it fires the **deep-thinker** achievement (existing toggle handler); the
recurrences dive (densest, 40 `$`) shows **katex=20, kErr=0, errs=0**; the amortized lesson typesets cleanly; all-routes
smoke (11 routes incl. all 3 lessons) **errs=0/kErr=0**. (No money/`<`-in-math in any dive, so neither render landmine
applies.) SW cache `atlas-v152` → `atlas-v153`.

## iter 209 — Five endgame achievements matched to the complete site (gamification)
The achievement ladders had stopped well short of the now-complete codex (148 lessons · 2,368 MCQs · 43 viz · all 7
topics): mastery capped at 50 concepts, streaks at 100 days, correct-answers at 2,000, XP at 25k. So a devoted learner
ran out of things to chase. Added **5 long-haul capstones** (50 → **55 achievements**) — the owner's most-repeated
gamification ask, untouched since iter 120 — each extending an existing ladder to a true endgame:
- 🗻 **Summit** — reach 80% mastery on **100 concepts** (ladder was 10/25/50).
- 🎇 **Year of Fire** — a **365-day streak** (ladder was 3/7/30/100).
- 🌠 **Living Legend** — **5,000** quiz questions answered correctly (ladder was 100/500/1k/2k).
- 💫 **Luminary** — earn **100,000 total XP** (ladder was 5k/25k).
- 🏵️ **Grand Examiner** — score **100% on a 40-question test** (binary; +100 XP bonus, like Exam Ace's +50).
Fully wired, not just defined: unlock conditions sit beside the existing identical threshold checks in `store.js`
(`touchStreak`, `addXP`, `recordQuiz`/`recordTest`, `bumpMastery`); the four metric-based ones are in `app.js`
`achProgressMap()` so they get live progress bars + can surface in the dashboard "closest achievement" nudge; all five
are slotted into `ACH_CATEGORIES` (Mastery / Consistency / Quizzes / Levels). **No new state** — every metric
(mcq.correct, streak, xp, mastered-count, test correct/total) already existed; old saves load unchanged.
Verified: a consistency check confirms **55 achievements, all categorized, zero orphans/duplicates, zero duplicate
icons**; achievements page renders all five (seeded progress shows **Summit 0/100, Year of Fire 120/365, Living Legend
2,500/5,000, Luminary 30,000/100,000**; Grand Examiner card shows icon 🏵️ + "Score 100% on a 40-question test"),
header reads "0 OF 55 UNLOCKED", **err=0**; `gate.js` ALL GREEN; all-routes smoke (14 routes) **errs=0/kErr=0** (no
regression from the store/app edits); achievements page legible at **390px**. SW cache `atlas-v151` → `atlas-v152`.

## iter 208 — Quiz results screen: redrill-the-missed + next-lesson momentum (UI/UX · functionality)
The per-lesson quiz results screen was a **dead end** — it showed a score and a lone "↻ Retry quiz" button. That moment
fires after *every* one of the 148 lessons' quizzes, so it's one of the highest-frequency screens in the app, and it
neither helped you fix what you got wrong nor moved you forward. Now it's a momentum + remediation hub:
- **↻ Redrill the N you missed** — runs the existing `runMasteryDrill` over *exactly* the questions you got wrong,
  re-queueing each until you get it right (the owner's "think again until you pass" loop). The *test* results screen
  already had this; the per-lesson quiz — the place misses are freshest — did not. Now it does.
- **Next: <lesson> →** — sends you straight to the next lesson in the course (or "Back to <course> →" on the last
  lesson), so finishing a quiz flows onward instead of stalling. Primary-styled at ≥70%, ghost below (review first).
- **↻ Retry quiz** retained. Missed-index tracking is local to the quiz run; Retry resets it cleanly.
Implementation: `renderQuiz(body, lesson)` now receives `course` + `next` (from the lesson view's existing prev/next);
a local `missedIdx` collects wrong-answer indices in `pick()`; the redrill builds mastery-drill items
({q, lessonId, lessonTitle, courseId, qIdx}) and on completion calls `router()` to land back on the lesson. No new
state, no schema change. Anti-monotony: first UI/UX move after content (206) + viz (207).
Verified: syntax OK; `gate.js` ALL GREEN (2,368 MCQs · 43 widgets); drove a full lesson quiz to the results screen —
all three CTAs render with the correct next-lesson title ("Diffusion Models"), **err=0**; clicked **Redrill** → the
mastery drill launches on exactly the 16 missed questions (mastery-track present, "16 in queue"), **err=0**; all-routes
smoke (14 routes) **errs=0/kErr=0** (no regression); results screen at **390px** wraps the three CTAs into a clean
centered stack. SW cache `atlas-v150` → `atlas-v151`.

## iter 207 — GAN training visualizer: the adversarial game (visualizations)
New widget **`dl-gan-training`** (the **43rd**), embedded in the GANs lesson (`dl-gans`), which previously had **no
visualization** — a real gap, now filled with the field's most iconic figure (Goodfellow et al. Fig. 1) made live.
Pivot off content after the 12→16 arc completed (anti-monotony; the owner explicitly loves visualizations / "a joy to
watch"). What it shows:
- **Real data** density (green), the **generator** density (orange, a Gaussian N(μ,σ)), and the **optimal
  discriminator** D(x) = p_data/(p_data+p_g) (purple) — the analytic optimum, plotted exactly.
- **Play** runs the alternating game: each step retrains D to its optimum, then takes one gradient-ascent step on the
  generator's "fool D" objective J = ∫ p_g·log D dx (numerical gradient). The generator slides onto the data and
  **D(x) flattens to 0.5 everywhere** (a coin flip) at the global optimum p_g = p_data — auto-stops when JSD ≈ 0.
- **Two modes (collapse)** toggle: a single-Gaussian generator can cover only one of two real peaks, so it visibly
  **mode-collapses** onto one while D stays confident (≈1) over the abandoned mode and JS divergence stalls — the
  canonical GAN failure, made tangible. Note explains remedies (minibatch discrimination, unrolled, Wasserstein).
- Controls: Play/Pause, Step, Reset, mode select, learning-rate slider. Live readout of generator μ/σ + JS divergence.
Faithful by construction: D is the analytic optimal discriminator; the generator does real gradient ascent. Validated
the dynamics in node first — single-mode converges to N(1.0,0.85) with JSD→0 (~15 steps); two-mode collapses to
μ≈−1.9 with JSD stuck ≈0.21.
Verified: syntax OK; `gate.js` ALL GREEN (**43 widgets**, embed id resolves; 2,368 MCQs); screenshots of (a) initial
synchronous paint, (b) single-mode equilibrium (curves overlap, D≈0.5), (c) two-mode collapse — all **err=0**;
all-routes smoke (14 routes incl. `#/lab/dl-gan-training` + the embedded lesson) **errs=0/kErr=0**; mobile 390px
canvas scales and stays legible. `dl-vae-latent` was the runner-up but the VAE lesson already has `dl-kl-divergence`;
the GANs lesson had nothing. SW cache `atlas-v149` → `atlas-v150`.

## iter 206 — MCQ arc → PS Hypothesis-Testing module 12→16 ★★★ COMPLETES THE WHOLE ARC (content — owner's #1 ask)
**Probability & Statistics → Hypothesis Testing**, all 4 lessons **12 → 16 MCQs** (+16; bank **2,352 → 2,368**). New
foundational questions, adversarially fact-checked with arithmetic re-verified (**ALL 16 PASS**); each new batch
answer-balanced 0/1/2/3 with distinct patterns ([2,1,3,0], [0,3,1,2], [3,0,2,1], [1,2,0,3]):
- **The logic of testing**: one-sided vs two-sided power/pre-commitment tradeoff; testing as probabilistic
  proof-by-contradiction; a worked one-sided $z$-test ($\sigma/\sqrt{n}$ SE → $z=-2.0<-1.645$ → reject); burden-of-proof
  setup (null = "no effect", never *accept* $H_0$).
- **p-values**: statistical vs practical significance (huge-$n$ trap, read the effect size); the $p \ne P(H_0\text{ true})$
  fallacy; multiple comparisons ($20\times0.05=1$ expected false positive, Bonferroni $\alpha/m$); one-sided p-value from
  $P(Z>1.75)\approx0.04$.
- **Errors & power**: Type I = false positive / Type II = false negative (screening framing); underpowered fields
  publish disproportionately many flukes that fail to replicate; power analysis = pre-data sample-size planning;
  raising $n$ (shrinking $\sigma/\sqrt{n}$) raises power, lowering $\alpha$ *reduces* it.
- **t-tests**: two-sample SE $=\sqrt{s_1^2/n_1+s_2^2/n_2}$ (variances add); paired t-test for before/after (removes
  between-subject variance → more power); assumptions + robustness (CLT, breaks with skew+tiny-$n$/outliers/dependence);
  test–CI duality (a 95% CI containing 0 ⇒ fail to reject at $\alpha=0.05$).

**★★★ PS COMPLETE — all 5 modules / 23 lessons at 16**, and this **COMPLETES THE ENTIRE 12→16 MCQ-GROWTH ARC: all 148
lessons across all 7 topics now hold 16 MCQs** (bank **2,368**). The owner's #1 most-repeated ask ("add more and more
questions") is fully delivered end-to-end. The loop now steps back to bolder, broader-compass moves.
Verified: adversarial ALL 16 PASS (arithmetic re-checked); `gate.js` ALL GREEN incl. render-hazard lints (7 topics ·
148 lessons · **2,368 MCQs** · 42 widgets); indices 0/1/2/3-balanced; byte-stable injection (no-op guard PASS); the
**p-values quiz** (the money/percentage landmine lesson) advanced through its new questions renders **MAX kErr=0 /
raw$=0** (screenshotted — `$p=0.03$`, `$\alpha=0.05$`, `$2{,}000{,}000$` all typeset, `*incorrect*` italicized); all
16 routes smoke errs=0/kErr=0; mobile 390px legible (Quiz badge "16"). SW cache `atlas-v148` → `atlas-v149`.

## iter 205 — MCQ arc → PS Inference/Estimation module 12→16 (content — owner's #1 ask)
**Probability & Statistics → Statistical Inference: Estimation & Confidence**, all 4 lessons **12 → 16 MCQs** (+16;
bank **2,336 → 2,352**). New foundational questions, adversarially fact-checked with arithmetic re-verified (**ALL 16
PASS**), answer positions balanced 0/1/2/3 with distinct per-lesson patterns:
- **Law of Large Numbers**: Monte Carlo as the LLN-as-a-tool; proportions-not-counts (the dilution mechanism behind
  the gambler's fallacy); ML empirical-risk→expected-risk; the $\sigma^2/n$ variance shrink driving the Chebyshev proof.
- **Sampling distributions**: $\mathbb{E}[\bar X]=\mu$, $\operatorname{Var}(\bar X)=\sigma^2/n$; the CLT standardized
  form; *why a bell* (convolution fixed point + max entropy); sampling distribution = distribution of a *statistic*.
- **Point estimation**: Bessel's $n-1$ (degrees of freedom); a biased-low-variance estimator beating an unbiased one
  on MSE; consistency (bias→0 *and* variance→0); the bias–variance ↔ under/overfitting map.
- **Confidence intervals**: a 90% CI computation ($z^*=1.645$); capture-rate set by the confidence *level* not $n$;
  why $t$-intervals are wider (estimating $\sigma$ → heavier tails); the confidence–precision tradeoff at fixed $n$.

**PS now 4/5 modules at 16** (Foundations ✓, Distributions ✓, Joint ✓, Inference ✓) — only **Hypothesis Testing**
remains to complete the entire 12→16 arc across all 7 topics. (This was a second content iteration in a row, a
deliberate push to finish the owner's near-complete #1 ask; non-content surfaces are at a maturity plateau.)
Verified: adversarial ALL 16 PASS (arithmetic re-checked); `gate.js` ALL GREEN incl. render-hazard lints (7 topics ·
148 lessons · **2,352 MCQs** · 42 widgets); indices 0/1/2/3-balanced; byte-stable injection; Sampling & CI quizzes
render "Question 1 of 16" kErr=0 (the sampling Q1's inside-math money `$\sigma=\$30{,}000$` confirmed rendering
correctly by screenshot — no garble); all-routes smoke (8 routes) errs=0. SW cache `atlas-v147` → `atlas-v148`.

## iter 204 — MCQ arc → PS Joint Distributions module 12→16 (content — owner's #1 ask)
**Probability & Statistics → Joint Distributions & Dependence**, all 3 lessons **12 → 16 MCQs** (+12; bank
**2,324 → 2,336**). New foundational questions, adversarially fact-checked with arithmetic re-verified (**ALL 12
PASS**), answer positions balanced 0/1/2/3 with distinct per-lesson patterns:
- **Joint distributions**: continuous probability as a *volume* (double integral); independence must hold at *every*
  pair (one bad cell breaks it); a conditional $P(X{=}1\mid Y{=}1)$ slice-and-renormalize computation; inference as
  "compute a conditional off the joint."
- **Covariance/correlation**: computing $\rho=\operatorname{Cov}/(\sigma_X\sigma_Y)$; independent ⇒ Cov $=0$ (and why);
  the $Y=X^2$ counterexample (uncorrelated ≠ independent — correlation is *linear* only); $\rho$'s invariance under
  positive linear transforms.
- **Conditional expectation**: the tower property as divide-and-conquer; the law of *total variance*
  (within- + between-group, i.e. unexplained + explained); the hen-and-eggs tower computation ($\mathbb{E}[X]=p\lambda$);
  regression function & RL value function both being conditional expectations.

**PS now 3/5 modules at 16** (Foundations ✓, Distributions ✓, Joint ✓). Arc: 6/7 topics done; **PS 3/5**.
Verified: adversarial ALL 12 PASS (arithmetic re-checked); `gate.js` ALL GREEN incl. render-hazard lints (7 topics ·
148 lessons · **2,336 MCQs** · 42 widgets); indices 0/1/2/3-balanced; byte-stable injection; Covariance &
Conditional-Expectation quizzes render "Question 1 of 16" rawDollars=0 kErr=0; all-routes smoke (8 routes) errs=0;
conditional-expectation quiz screenshot clean. SW cache `atlas-v146` → `atlas-v147`.

## iter 203 — New viz: Binomial ⇄ Poisson PMF explorer (visualizations — non-content)
Non-content move pairing with the iter-202 Distributions content. The PS topic had 5 visualizations but **none for the
discrete distributions** — `ps-bernoulli-binomial`, `ps-poisson`, and `ps-geometric-waiting` had no embedded widget.
Added **`ps-binomial-poisson`** (the **42nd** Lab widget): an interactive Binomial PMF bar chart with sliders for the
number of trials *n* and success probability *p*, a dashed line at the mean *np*, a live readout of mean/variance/σ and
the distribution's shape, and a **Poisson(np) overlay** toggle that traces the Poisson PMF over the bars — visually
demonstrating the **law of rare events** (Binomial → Poisson when *n* is large and *p* small) that the new MCQs cover.
- `js/viz.js`: registered `ps-binomial-poisson`. PMFs computed via numerically-stable recurrences (no large
  factorials): Binomial $P(k)=P(k-1)\cdot\frac{n-k+1}{k}\cdot\frac{p}{1-p}$, Poisson $Q(k)=Q(k-1)\cdot\lambda/k$.
  Synchronous initial `draw()`; loops-free (static, redraws on input) so nothing leaks across navigations.
- Embedded `<div data-viz="ps-binomial-poisson"></div>` in the Bernoulli/Binomial lesson.

Verified: PMFs sum to 1.000000 (Bin(50,0.5), Bin(10,0.02), Poisson(4)); `gate.js` ALL GREEN — now **42 widgets**, and
it confirms the embedded `data-viz` id resolves to a registered widget; Lab item renders (canvas + 2 sliders + overlay
button, errs=0) and is interactive (set n=40 → note correctly reads "mean np 20.00, variance 10.00, σ ≈ 3.16"); the
Poisson overlay correctly *diverges* at large p and converges at small p; lesson embed hydrates (errs=0); all-routes
smoke (9 routes incl. the new Lab item) errs=0; legible at **390px** (canvas `max-width:100%` scales). README widget
count 41→42 (+ Lab description); app.js viz-complete fallback 41→42. SW cache `atlas-v145` → `atlas-v146`.

## iter 202 — MCQ arc → PS Distributions module 12→16 (content — owner's #1 ask)
The 12→16 arc's largest module yet: **Probability & Statistics → Common Distributions**, all **5 lessons 12 → 16
MCQs** (+20; bank **2,304 → 2,324**). New foundational questions, adversarially fact-checked with arithmetic
re-verified (**ALL 20 PASS**), answer positions balanced 0/1/2/3 with distinct, non-marching per-lesson patterns:
- **Bernoulli/Binomial**: $\mathbb{E}=np$, $\text{Var}=np(1-p)$ computed; a BINS "fixed-$n$" violation (stop-on-3rd-head
  → negative binomial); why the mean needs no independence but the variance does; Bernoulli $=\text{Bin}(1,p)$.
- **Poisson**: the law-of-rare-events limit ($n\to\infty,p\to0,np=\lambda$); the overdispersion diagnostic
  (Var$\gg$mean ⇒ Poisson wrong); relative spread $1/\sqrt\lambda$; a PMF computation.
- **Geometric**: why "geometric" (the series sums to 1); the condition-on-first-trial mean derivation; negative-binomial
  mean $r/p$; its continuous counterpart = Exponential.
- **Uniform/Exponential**: Uniform variance $(b-a)^2/12$; the Poisson-counts/Exponential-waits duality; the Exponential
  density's shape (peak at 0); Exponential mean $1/\lambda$ & variance $1/\lambda^2$.
- **Normal**: inflection points at $\mu\pm\sigma$; z-score comparison across different-unit tests; an empirical-rule
  tail ($P(Z<-1)\approx16\%$); a standardize-then-empirical-rule interval ($\mu\pm2\sigma\approx95\%$).

**PS now 2/5 modules at 16** (Foundations ✓, Distributions ✓). Arc: 6/7 topics done; **PS 2/5**.
Verified: adversarial ALL 20 PASS (arithmetic re-checked); `gate.js` ALL GREEN incl. the new iter-201 render-hazard
lints (7 topics · 148 lessons · **2,324 MCQs**) — the lints cleared all 20 new items; indices 0/1/2/3-balanced;
byte-stable injection; Poisson & Normal quizzes render "Question 1 of 16" rawDollars=0 kErr=0; all-routes smoke (10
routes) errs=0; Bernoulli quiz screenshot clean. SW cache `atlas-v144` → `atlas-v145`.

## iter 201 — Corpus render-hazard audit + permanent gate lints (workflow / quality — non-content)
The iter-200 money-`\$` garble had been latent **~117 iterations** because hand render-checks only cover the lessons
a turn touches. Ran a **whole-corpus static audit** (all 17,964 content strings across 148 lessons) for the silent
render-wrong patterns — then made the gate catch the whole class so they can't recur.
- **Found & fixed 3 real issues**: (a) `**inductive step**` raw markdown in an Algorithms MCQ stem (rendered as
  literal asterisks via innerHTML) → `<strong>`; (b)/(c) two bare un-escaped `$500` money signs in an LLM RAG
  homework prompt/solution (a lone `$` happens to render literal, but it's fragile next to math) → escaped to `\$500`
  (the iter-200 normalizer now wraps them safely).
- **New permanent lints in `gate.js`** (run on every content field — content, MCQ q/explain/choices, examples,
  homework, flashcards): an **odd count of unescaped single-`$`** (unbalanced math, or a literal `$` that wasn't
  written as `\$`), and **raw `**bold**` / `__italic__` outside `<code>`/`<pre>`/math**. These are exactly the bug
  classes that render *silently wrong without throwing a KaTeX error*, so an automated gate is the only cheap catch.
  Self-tested: the lint flags "wins $5 … $x$" and "the **inductive step**", and correctly ignores escaped money,
  balanced math, `<code>S**2</code>`, `def __init__`, and `<strong>` — **zero false positives across the corpus**.

No new MCQs (bank stays 2,304). Verified: `gate.js` ALL GREEN with the new lints active (7 topics · 148 lessons ·
2,304 MCQs); lint self-test all-pass; browser — the Algorithms quiz shows no literal `**` and the RAG homework renders
"…how many euros is $500?" cleanly (no garble, kErr=0); all-routes smoke (10 routes) errs=0. Data files
`algorithms.js` + `llm.js` touched (the 3 fixes) → SW cache `atlas-v143` → `atlas-v144`. ROADMAP + skill landmines
already note both delimiter hazards.

## iter 200 — Final topic opens: PS Foundations 12→16 + FIX money-"\$" math garble (content + bug)
Two things, the second surfaced by the first. **(1) Content** — opened the **last** topic of the 12→16 arc:
**Probability & Statistics → Foundations**, all 4 lessons **12 → 16 MCQs** (+16; bank **2,288 → 2,304**), adversarially
fact-checked (**ALL 16 PASS**, arithmetic re-verified), positions balanced 0/1/2/3 with distinct per-lesson patterns:
sample-spaces/axioms (complement for "at least one"; derived-vs-axiom; classical counting; inclusion–exclusion for the
overlap), conditional/Bayes (without-replacement chaining; law of total probability; naive-Bayes independence;
posterior ∝ likelihood × prior), random variables (continuous endpoints don't matter; density ≠ probability; PDF
normalization; tail via CDF complement), expectation/variance (linearity even for *dependent* vars; LOTUS; σ under a
linear transform; the $\mathbb{E}[X^2]-\mathbb{E}[X]^2$ formula).
**(2) Bug (broken-wins), found while verifying the above:** a bare escaped money dollar `\$` in prose (e.g. "wins
\$2") left a stray `$` that KaTeX auto-render **mis-paired with the next real `$…$`**, rendering the intervening prose
as garbled math (the expectation-variance quiz Q1 stem was visibly scrambled). Extended the iter-189 boot normalizer
`escapeMathLt`: outside math, rewrite `\$` → `$\$$` (a self-contained span KaTeX renders as a literal "$", which can
never mis-pair); inside math, `\$` is left untouched (KaTeX handles it). Also fixed its fast-path so `\$`-only strings
aren't skipped. In-memory at boot — **no data files changed**.

Verified: adversarial ALL 16 PASS; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,304 MCQs** · 41 widgets); answer
indices 0/1/2/3-balanced; byte-stable injection. Bugfix — node harness proved the transform's only effects are
`<`→`&lt;` (in math) and `\$`→`$\$$` (outside math): **REAL-bad=0** across 17,964 strings, **6 bare money dollars
wrapped, ~26 inside-math `\$` preserved**; browser: the EXPVAR quiz stem now reads correctly ("…wins $2 for each
pip…", katex 2→7), the expectation-variance *lecture* renders its inside-math money (`$\$0$`/`$\$50$`/`$\$100$`, katex
70, kErr=0), and the algorithms lecture (also uses `\$`) is clean (katex 195, kErr=0); all-routes smoke (13 routes,
multi-topic) errs=0. SW cache `atlas-v142` → `atlas-v143`.

**Arc: 6/7 topics fully at 16, the 7th (Prob & Stats) now started (1/5 modules).** Remaining PS modules: Distributions,
Joint, Inference/Estimation, Hypothesis-Testing.

## iter 199 — Dashboard topic cards show mastery, not just completion (UI/UX — non-content)
Non-content rebalance. The dashboard's Topics grid showed only *completion* (a "N/M done" bar) — which **overstates
knowledge**: a learner who clicked through every lesson but whose mastery has since decayed sees a full bar yet may
retain little. Added a second, honest signal to each topic card: a mastery readout — a **mastery-level-colored dot +
"N% mastered"** (or "not started") — from the existing decay-aware `Store.topicMastery()`, right under the completion
bar. Now "clicked through it" and "actually know it" are never conflated on the main landing surface.
- `js/app.js` (`viewDashboard`): each card computes `topicMastery` + `masteryLevel`, renders a `.cc-stats` block with
  the completion row ("N/M done") and a new `.cc-mastery` row. No new state.
- `css/styles.css`: `.cc-stats` / `.cc-mastery` / `.cc-mdot`.

Verified (seeded mastery): LA with 2/19 lessons mastered → "1/19 done" + sage dot + "5% mastered"; an untouched topic
→ "not started" with a muted dot; the % is the topic-wide average (consistent with the course page's mastery metric).
errs=0; all-routes smoke (11 routes) errs=0; **390px** both rows render cleanly under the blurb (screenshot read).
`gate.js` ALL GREEN (data untouched). SW cache `atlas-v141` → `atlas-v142`.

## iter 198 — MCQ arc → LLM Applications 12→16 ★★ LLM TOPIC COMPLETE (content — owner's #1 ask)
Finished the LLM topic's last module — **Applications**, all 3 lessons **12 → 16 MCQs** (+12; bank **2,276 → 2,288**).
**★★ All 19 LLM lessons / 6 modules are now at 16 MCQs — the entire Large Language Models course is complete.**
New foundational questions, adversarially fact-checked (**ALL 12 PASS**; one verify flag was a transcription slip in
the *prompt*, not the item — confirmed post-inject that the keyed index maps to the intended choice), answer positions
balanced 0/1/2/3 with distinct per-lesson patterns ([1,2,0,3] / [3,0,2,1] / [0,3,1,2]):
- **RAG & tools**: the chunk-size tradeoff (muddy vs context-starved); ANN indexes (HNSW/IVF) trade recall for speed;
  fine-tuning vs RAG (style-in-weights vs fresh citable facts — orthogonal); updating a fact = a *re-index*, not a retrain.
- **Hallucination & evaluation**: no native *abstain* token (the decoder is obligated to guess); benchmark
  **contamination** as the silent dominant validity threat; **Goodhart/saturation**; LLM-as-judge **position bias** +
  circularity.
- **Safety & frontier**: **scalable oversight**; the **∀-defense vs ∃-attack** asymmetry (and jailbreak transfer);
  bias as dataset-bias-through-an-estimator (representational + allocational harm); **misuse & marginal risk**.

**Arc: 6/7 topics fully at 16** — Algorithms ✓ · LA ✓ · Calculus ✓ · DL ✓ · RL ✓ · **LLM ✓** — only **Probability &
Statistics** remains to finish the entire 12→16 MCQ-growth arc.
Verified: node syntax ALL JS OK; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,288 MCQs** · 41 widgets); answer
indices confirmed + 0/1/2/3-balanced per lesson (incl. an explicit check that the judge-bias item's key maps to the
"position bias" choice); byte-stable injection; RAG & safety quizzes render "Question 1 of 16" rawDollars=0 kErr=0;
all-routes smoke (11 routes) errs=0; RAG quiz screenshot clean. SW cache `atlas-v140` → `atlas-v141`.

## iter 197 — Scope-aware Test setup: live question-pool readout (UI/UX — non-content)
Non-content rebalance. "Spawn a Test" is a core, high-use surface, but it showed *lesson* counts in the scope picker,
not the *question*-pool size — so you couldn't tell how many questions a scope held until you hit Start (and got a
"not enough questions" error after the fact). Made the setup **scope-aware**:
- A live **"N questions available"** readout under the Length row that updates the instant you change scope
  (Completed / Weak spots / a Topic / Everything) — e.g. *Everything → 2,276*, *LLMs → 292*.
- When the chosen length exceeds the pool, it says **"· your test will use all N"** (no silent surprise).
- When a scope is too thin to test (< 3 questions), it shows a rust warning and **disables Start** up front, instead
  of erroring on click.
- Refactored the scope→pool logic into one shared `scopedPool(scope)` used by both the readout and Start (no drift);
  `aria-live="polite"` on the readout. CSS: `.tc-avail` / `.tc-thin`.

Verified (seeded states): default *Completed* with 0 done → "⚠ Only 0 questions" + Start disabled; *Everything* →
"2,276 questions available" + enabled; *LLMs* → 292; *Weak spots* (none) → thin + disabled; 1 lesson done + length 40
→ "16 questions available · your test will use all 16". errs=0 throughout; all-routes smoke (12 routes) errs=0;
**390px** the readout is legible below the Length row (screenshot clean). `gate.js` ALL GREEN (data untouched). SW
cache `atlas-v139` → `atlas-v140`.

## iter 196 — MCQ arc → LLM Inference module 12→16 (content — owner's #1 ask)
Resumed the 12→16 MCQ-growth arc: the LLM **Inference** module, all 3 lessons **12 → 16 MCQs** (+12; bank
**2,264 → 2,276**). New foundational questions, adversarially fact-checked (**ALL 12 PASS**), answer positions
balanced 0/1/2/3 with distinct per-lesson patterns ([2,3,1,0] / [0,2,3,1] / [3,1,0,2]):
- **Decoding & sampling**: temperature as $p_i(\tau)\propto p_i^{1/\tau}$; temperature *reshapes but never truncates*
  (so it's paired with top-k/top-p); pure sampling's *long-tail* danger; **self-consistency** (sample many chains +
  majority vote, errors cancel).
- **Prompting, ICL & CoT**: **zero-shot CoT** ("Let's think step by step"); the CoT-faithfulness caveat (a trace is a
  plausible / post-hoc explanation, not a record of the internal process); ICL as **Bayesian task inference**
  (sharpening $p(T\mid P)$); and when CoT is *not* worth it (trivial tasks, small models).
- **Inference efficiency**: weight-only int4 vs **W8A8** (memory-bandwidth vs compute bottleneck); affine quantization
  + **outlier protection** (LLM.int8()/AWQ); the *two* costs that grow with context (KV cache = linear memory,
  attention = quadratic compute); and why **speculative decoding** pays off *because* decode is memory-bound.

LLM topic now **5/6 modules at 16** (Foundations ✓, Transformer ✓, Training ✓, Alignment ✓, Inference ✓) — only the
**Applications** module remains. Arc: Algorithms ✓ · LA ✓ · Calculus ✓ · DL ✓ · RL ✓ · **LLM 5/6** · Prob & Stats remaining.
Verified: node syntax ALL JS OK; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,276 MCQs** · 41 widgets); answer
indices confirmed + 0/1/2/3-balanced per lesson; byte-stable injection (no-op round-trip guard); decoding &
inference-efficiency quizzes render "Question 1 of 16" rawDollars=0 kErr=0; all-routes smoke (13 routes) errs=0;
decode quiz screenshot clean with math typeset. SW cache `atlas-v138` → `atlas-v139`.

## iter 195 — "Keep it fresh" becomes actionable: one-click refresh drill (new functionality — retention)
Non-content rebalance that **closes the loop** the iter-191 fading-mastery surface opened. That iteration *showed*
which mastered concepts were fading (decayed into the [0.55, 0.8) band) but left the learner to navigate to each
lesson manually. Now the dashboard "Keep it fresh" card has a **↻ Quick refresh** CTA, and a new `#/refresh` route
runs a **mastery drill built from the fading lessons' own MCQs** (a few per lesson, capped at 12). Because answering
correctly calls `Store.bumpMastery(..., {correct:true})` — which raises the stored strength *and resets the 45-day
decay clock* — refreshed concepts climb back above the fading threshold and drop off the list. Surface → action →
re-locked knowledge → shrinking list: the spacing-review loop is now complete.
- `js/app.js`: `viewRefresh()` (gathers `Store.fadingConcepts()`, pulls their questions from `allQuestions()`,
  shuffles, runs `runMasteryDrill`); friendly empty state ("Nothing fading right now ✨") and a fallback to lesson
  links if a fading lesson somehow carries no MCQs; route `#/refresh`; a `.fade-cta` button on the dashboard card.
- `css/styles.css`: `.fade-cta` (sage primary button, full-width on mobile).
- **No new state** — reuses the existing mastery model and drill machinery.

Verified: seeded a decayed save → dashboard shows "↻ Quick refresh all 2 →" and `#/refresh` runs a mastery-mode drill
labeled "Refresh · fading concepts" drawn from the fading lessons (errs=0); fresh user → "Nothing fading right now ✨"
empty state, no drill; all-routes smoke (11 routes incl. `#/refresh`) errs=0; **390px** the CTA spans full width below
the chips (screenshot read clean). `gate.js` ALL GREEN (data untouched). SW cache `atlas-v137` → `atlas-v138`.

## iter 194 — MCQ arc → LLM Alignment module 12→16 (content — owner's #1 ask)
Resumed the 12→16 MCQ-growth arc: the LLM **Alignment** module, all 3 lessons **12 → 16 MCQs** (+12; bank
**2,252 → 2,264**). New foundational questions, adversarially fact-checked (**ALL 12 PASS**), answer positions
balanced 0/1/2/3 with distinct per-lesson patterns ([3,1,0,2] / [2,0,3,1] / [1,3,2,0]):
- **Fine-tuning & instruction tuning (SFT)**: SFT as *behavioral cloning* of demonstrations (cross-entropy on the
  response, conditioned on the prompt); why the chat template must match at train/inference; how SFT teaches the model
  to *stop* (end-of-turn token); and that SFT shapes behavior, not facts (knowledge lives upstream in pretraining).
- **RLHF, reward models & DPO**: the reward model = SFT net + scalar head at EOS, trained by Bradley–Terry/logistic
  NLL; the **four models** PPO-RLHF holds in memory (policy, critic, frozen RM, frozen reference); why RL (not plain
  backprop) — the reward is non-differentiable over sampled tokens; DPO's **implicit reward** $\beta\log(\pi_\theta/\pi_{\text{ref}})$.
- **PEFT / LoRA**: the low-intrinsic-rank justification for $\Delta W=BA$; full-FT's ~16 bytes/param Adam accounting
  (→ ~112 GB for 7B); QLoRA's **NF4** (4-bit levels optimal for normal-distributed weights, on the *frozen* base); and
  which matrices LoRA adapts (attention projections, well under 1% trainable).

LLM topic now **4/6 modules at 16** (Foundations ✓, Transformer ✓, Training ✓, Alignment ✓). Arc: Algorithms ✓ · LA ✓
· Calculus ✓ · DL ✓ · RL ✓ · **LLM 4/6** · Probability & Statistics remaining.
Verified: node syntax ALL JS OK; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,264 MCQs** · 41 widgets); answer
indices confirmed + 0/1/2/3-balanced per lesson; byte-stable injection (no-op round-trip guard); RLHF & LoRA quizzes
render "Question 1 of 16" rawDollars=0 kErr=0; all-routes smoke (13 routes) errs=0; LoRA quiz screenshot clean with
math typeset. SW cache `atlas-v136` → `atlas-v137`.

## iter 193 — Lab gallery: searchable + explored-progress tracking (UI/UX — non-content)
Non-content rebalance. The Visualization Lab had grown to **41 widgets in a flat, scroll-only grid** with no way to
search and — despite the `vizSeen` state and the *Full Spectrum* achievement (open every viz) already existing — no
sign of which you'd opened. Turned the Lab into a **navigable, completable collection** (UI/UX + understandability,
light gamification), all client-side over the existing per-route render (no new state):
- **Explored-progress header** — a "N of 41 explored" bar (sage→gold gradient fill) computed from `Store.raw.vizSeen`.
- **Live search** — a search box filters all 41 cards by title / blurb / the lesson each is embedded in / topic
  (substring match over a precomputed `data-s` attribute; hides emptied topic groups; shows a "no matches" note).
- **Unexplored filter** — an All / Unexplored (N) toggle to jump straight to the widgets you haven't opened yet —
  the fast path to completing *Full Spectrum*.
- **Per-card "✓ explored" marker** + a sage top-border on opened widgets, so explored vs new is legible at a glance.
- CSS: `.lab-controls`/`.lab-prog`/`.lab-search`/`.lab-filter`/`.lab-seen`, sage palette, 480px stacking.

Verified: seeded a save with explored viz → "1 of 41 explored" + the explored card shows its ✓ marker + sage border;
search "gradient" → 5 cards; the Unexplored toggle → 40 of 41; fresh user → "0 of 41", no explored cards, errs=0.
All-routes smoke (13 routes) errs=0; **390px** the controls stack and the gallery stays legible (screenshot read clean);
`gate.js` ALL GREEN (data untouched). SW cache `atlas-v135` → `atlas-v136`.

## iter 192 — MCQ arc → LLM Training module 12→16 (content — owner's #1 ask)
Resumed the 12→16 MCQ-growth arc: the LLM **Training** module, all 3 lessons **12 → 16 MCQs** (+12; bank
**2,240 → 2,252**). New foundational questions, adversarially fact-checked (**ALL 12 PASS**), answer positions
balanced 0/1/2/3 with distinct per-lesson patterns ([2,0,1,3] / [1,3,2,0] / [0,2,3,1]):
- **Pretraining (objective/data/compute)**: cross-entropy ≡ minimizing $D_{\mathrm{KL}}$ to the data
  ($H(q,p)=H(q)+D_{\mathrm{KL}}$, $H(q)$ θ-independent); teacher-forcing's **exposure bias**; why noisy data *raises
  the loss floor* (high entropy = unpredictable, wastes capacity); the **data mixture** as a capability lever.
- **Optimization (AdamW/schedules/stability)**: **bf16 vs fp16** (bf16 keeps fp32's exponent range → no loss
  scaling); why an **fp32 master copy** of weights (tiny updates would round to zero in bf16); Adam's two moments
  (momentum + variance → per-parameter adaptive LR); why weight decay skips biases/LayerNorm gains/embeddings.
- **Scaling laws**: compute-optimal as constrained optimization (minimize $A/N^\alpha+B/D^\beta+E$ s.t. $C\approx6ND$;
  $\alpha\approx\beta$ → $N,D\propto\sqrt C$); power-law **scale-invariance** (no characteristic scale → extrapolation
  works); **emergence** as an average over micro-skills; why returns "diminish but never stop" (constant fractional,
  shrinking absolute, drop per decade).

LLM topic now **3/6 modules at 16** (Foundations ✓, Transformer ✓, Training ✓). Arc: Algorithms ✓ · LA ✓ · Calculus ✓
· DL ✓ · RL ✓ · **LLM 3/6** · Probability & Statistics remaining.
Verified: node syntax ALL JS OK; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,252 MCQs** · 41 widgets); answer
indices confirmed + 0/1/2/3-balanced per lesson; byte-stable injection (no-op round-trip guard); optimization &
scaling-laws quizzes render "Question 1 of 16" rawDollars=0 kErr=0; all-routes smoke (14 routes) errs=0; scaling-laws
quiz screenshot clean with math typeset. SW cache `atlas-v134` → `atlas-v135`.

## iter 191 — "Keep it fresh": surface fading-mastery concepts on the dashboard (new functionality — retention)
Rebalanced off three content-heavy iterations to a non-content move. The lesson **mastery-decay model**
(`effectiveMastery`, 45-day halflife) was *computed but never surfaced proactively*: `weakSpots()` is reactive
(eff < 0.55 = struggling, "⚠ concepts need review" + Drill weak spots), but nothing tells a returning learner
*"you mastered this well and it's now slipping — refresh it before you forget."* That gap is exactly the **spacing
effect**, the core lever for *remembering longer* and a genuine reason to *come back*.
- **`Store.fadingConcepts()`** (`js/store.js`): returns concepts that reached real strength (stored `s ≥ 0.7`) but
  whose effective mastery has decayed into the **[0.55, 0.8) "slipping" band** — cleanly disjoint from `weakSpots()`
  (eff < 0.55). Sorted most-faded first. Reads existing `state.mastery` only — **no new state field**, so prior
  saves load unchanged.
- **Dashboard widget** (`js/app.js` `viewDashboard`): a sage-tinted "♻️ Keep it fresh — N concepts fading" card
  (positive nudge, distinct from the rust weak-spots and gold achievement nudges) listing up to 6 fading concepts as
  chips — mastery-colored dot · title · current mastery % — each linking to its lesson for a quick revisit. Shown only
  when non-empty.
- **CSS** (`css/styles.css`): `.fade-strip`/`.fade-chip` etc., sage palette, flex-wrap chips, 480px media query.

Verified: `fadingConcepts` band logic — seeded a save with decayed mastery and confirmed the widget shows exactly the
two/three fading concepts (62% / 70% / 71%, sorted most-faded first) while **excluding** a still-mastered concept (95%,
eff ≥ 0.8) and a weak-spot (49%, eff < 0.55 → caught by the existing weak-spots surface, not here); fresh-user case
shows **no** strip, errs=0. All-routes smoke (13 routes, seeded mastery) errs=0; dashboard screenshot reads clean
(sage card below the action buttons); **390px** the card is legible — chips wrap, long titles ellipsize, % visible.
`gate.js` ALL GREEN (data untouched). SW cache `atlas-v133` → `atlas-v134`.

## iter 190 — MCQ arc → LLM Transformer module 12→16 (content — owner's #1 ask)
Continued the 12→16 MCQ-growth arc into the **heart of the LLM course**: the **Transformer** module, all 4 lessons
**12 → 16 MCQs** (+16; bank **2,224 → 2,240**). The `<`-in-math fix from iter 189 means these can use the dense
notation (`x_{<t}`, `QK^\top`, offsets `i-j`, `R_m^\top R_n = R_{n-m}`) freely. New foundational questions per lesson,
adversarially fact-checked (general-purpose agent, **ALL 16 PASS**), answer positions balanced 0/1/2/3 with distinct
per-lesson patterns ([3,0,2,1] / [0,2,1,3] / [2,3,0,1] / [1,0,3,2]):
- **Self-Attention**: the $O(n^2)$ cost traces to the $n\times n$ score matrix $QK^\top$; Q/K/V are *roles* (one token,
  three matrices); matching ($q\cdot k$) is decoupled from content ($v$); self- vs cross-attention (where Q,K,V come from).
- **Multi-Head + Causal Masking**: the KV cache turns per-token decoding $O(n^2)\to O(n)$ at a memory cost; the mask is
  a fixed, *data-independent* lower-triangular pattern; whole-sequence parallel training is *valid only because* the
  mask forbids peeking ahead; probing shows heads *specialize* (previous-token / syntactic / induction), fused by $W^O$.
- **Transformer Block**: "mix (attention, across tokens) then mull (FFN, within each token)"; the *residual stream*
  mental model; residuals make blocks $\approx$ identity at init (deep net starts shallow, grows); GELU vs ReLU (smooth,
  nonzero gradient for small negatives).
- **Positional Encoding**: RoPE rotates Q,K but *not* V (position shapes *which* tokens, not *what content*); absolute
  PE is *added* at the input only (signal must survive every layer); relative schemes encode the offset $i-j$ in the
  scores (T5 = a learned scalar bias per distance bucket); RoPE's continuous angles make context extension (PI/NTK/YaRN)
  cheap where a learned table cannot.

LLM topic now **2/6 modules at 16** (Foundations ✓ iter 189, Transformer ✓). Arc status: Algorithms ✓ · Linear Algebra ✓
· Calculus ✓ · Deep Learning ✓ · RL ✓ · **LLM in progress (2/6)** · Probability & Statistics remaining.
Verified: node syntax ALL JS OK; `gate.js` ALL GREEN (7 topics · 148 lessons · **2,240 MCQs** · 41 widgets); answer
indices confirmed + 0/1/2/3-balanced per lesson; byte-stable injection (no-op round-trip guard); self-attention &
positional-encoding quizzes render "Question 1 of 16" with rawDollars=0, kErr=0; all-routes smoke (15 routes) errs=0;
self-attention quiz screenshot reads clean with all math typeset. SW cache `atlas-v132` → `atlas-v133`.

## iter 189 — FIX: math with "<" was silently truncated site-wide (bug) + LLM Foundations 12→16 MCQs (content)
**Broken-always-wins.** While extending the LLM MCQ arc I discovered a real, *visible*, site-wide rendering bug.
KaTeX delimiters (`$…$` / `$$…$$`) are injected into the DOM via `innerHTML` **before** `typeset()` runs. A literal
`<` immediately followed by a letter inside math — e.g. the ubiquitous LLM notation `x_{<t}` ("tokens before t"), or
`\alpha < 1` written as `<1` — is interpreted by the HTML tokenizer as the **start of a tag**, which truncates the
text node and breaks the surrounding `$…$` pair. The math then rendered as **raw dollar signs**, and everything after
the `<` in that expression vanished. Measured impact: **621 `<` characters across 332 content strings** (heaviest in
LLM & deep-learning, where `x_{<t}` is everywhere; e.g. the *What a Language Model Is* lecture showed 13 raw-dollar
breaks and its quiz Q1 had 3 of 4 choices broken).
- **Fix** (`js/app.js`): added `escapeMathLt(s)` — a delimiter-aware scanner that escapes `<` → `&lt;` **only inside
  math spans** (respects `\$` escapes, leaves HTML tags, matrix `&`, and `>` untouched; idempotent). The HTML parser
  then turns `&lt;` back into a literal `<` in the *text node*, which KaTeX renders correctly. A one-time
  `normalizeMath()` runs at the top of `boot()` over every lesson `content`, MCQ `q`/`choices`/`explain`, examples,
  homework, flashcards, and glossary def. Source data files keep their readable LaTeX (no `<` rewriting on disk);
  the escape happens in-memory at load. No `data/` files needed changing for the fix.
- **Verified**: node harness proved the transform's *only* effect is `<`→`&lt;` (escaped 621, **zero** other byte
  diffs across 17,484 scanned strings; `\$` currency and matrix `&` preserved). Browser: *What a Language Model Is*
  lecture rawDollars **13→0** (katex 55→67), quiz Q1 rawDollars **3→0** (katex 2→5 — stem + all 4 choices now render);
  DL/Algorithms(`\$` currency, 195 katex)/Probability/Linear-Algebra(matrix `&`, 114 katex) lectures all rawDollars=0,
  kErr=0; all-routes smoke (15 routes) errs=0; quiz legible at 390px with all math rendered.

Also in this iter (the content work that surfaced the bug): **LLM → Foundations module, all 3 lessons 12 → 16 MCQs**
(+12; bank **2,212 → 2,224**). New foundational questions per lesson, adversarially fact-checked (ALL PASS), answer
positions balanced 0/1/2/3 with distinct per-lesson patterns:
- *What a Language Model Is*: self-supervision, the n-gram Markov assumption vs. full-prefix attention, perplexity
  comparability across tokenizers, and which token dominates the NLL (the rarest-assigned one).
- *Tokenization & BPE*: the word-vs-char tradeoff, vocab-size = base + #merges, why byte/char-level is costly
  (O(n²) attention, weak units), and SentencePiece's raw-stream / `▁` reversibility.
- *Embeddings & Prediction Head*: param count `V·d_model ≈ 205M`, temperature τ>1 flattening, logits-vs-probabilities,
  and the end-to-end token→embed→blocks→logits→softmax→sample pipeline.
This opens the 6th topic of the 12→16 MCQ arc (LA✓ Calc✓ Algos✓ DL✓ RL✓ — LLM started; Prob&Stats remains).
SW cache `atlas-v131` → `atlas-v132`.

## iter 188 — 4 "endgame" achievements for the long-haul learner (gamification — owner-loved)
Gamification was 20 iters stale (last at 168), and the achievement *progression* had clear ceilings now that the site
is vast (148 lessons, 2,212-MCQ bank, 41 widgets, 5/7 topics complete): lessons capped at 50, correct-answers at 1,000,
mastery at 25 concepts, and there was no viz-completionist. Added **4 higher tiers (46 → 50)** that give a dedicated
learner months-long targets:
- **📕 Centenarian** — complete 100 lessons (between Half-Century=50 and Atlas-Complete=148).
- **🏆 Marksman** — answer 2,000 quiz questions correctly (above Crack Shot=1,000; the 2,212-bank makes it reachable).
- **🗿 Savant** — reach 80% mastery on 50 concepts (above Loremaster=25).
- **🔬 Full Spectrum** — open *every* visualization in the Lab (above Viz Voyager=15; threshold reads the live
  `VIZ_CATALOG` length so it auto-tracks as widgets are added — currently 41).
- **No new state needed**: all four reuse existing counters (`lessons`, `mcq.correct`, mastery scan, `vizSeen`), so a
  prior-shape save loads unchanged. Unlock checks slotted beside the existing tiers in `store.js` (completeLesson,
  recordQuiz+recordTest, bumpMastery, recordVizOpen); ids added to the Hall categories + progress map in `app.js`.
- **Verified**: `store.js`+`app.js` syntax OK; a node test confirms **count 46→50**, a prior-shape save loads
  (xp/mcq preserved), and the unlock logic fires correctly — `recordQuiz` with 2,100 correct → Marksman; opening all
  41 distinct viz → Full Spectrum (dups don't double-count); browser → the Hall renders all four new badges in their
  categories and the header reads **"0 of 50 unlocked"**, `errs=0`; all-routes smoke (10) `errs=0`; achievements
  screenshot read clean. SW cache **v130 → v131**; README 46 → 50.

## iter 187 — MCQ arc → Reinforcement Learning · Advanced 12 → 16 — ★ RL COMPLETE (content — owner's #1 ask)
The arc finishes RL's seventh and final module, *Model-Based, Offline & Imitation RL*. All **three** lessons go
12 → 16 (**+12, bank 2,200 → 2,212**), stating the bedrock the existing (application-heavy) 12 assumed:
- **Model-Based RL**: what it *is* (learn $\hat p$/$\hat r$, then plan) / what *Dyna* does (real update + model update + k
  simulated updates) / what *MCTS* is (select→expand→simulate→backup; the AlphaZero engine) / why it's sample-efficient
  (model-learning is supervised, mining every transition).
- **Offline RL**: what it *is* (best policy from a fixed dataset, no interaction) / why it matters (unsafe/costly live
  exploration) / what the *behavior policy* is / the guiding principle (pessimism about unsupported actions).
- **Imitation Learning**: what it *is* (learn from demonstrations, sidestep reward design) / *BC vs IRL* (clone actions
  vs recover the reward) / what *DAgger* fixes (covariate shift, by labeling the agent's own states) / why IRL generalizes.
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,212 MCQs** (no bias note); direct
  key-dump confirms answer indices map to the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson
  patterns (0,2,1,3 / 3,1,2,0 / 1,3,0,2); an independent adversarial fact-check agent returned **ALL PASS** (it
  validated the DAgger-vs-GAIL-vs-IRL distinctions); render-checks on the Offline and Imitation quizzes → `errs=0 |
  "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (10) `errs=0`. SW cache **v129 → v130**; README 2,200 →
  2,212.
- ★★ **REINFORCEMENT LEARNING IS NOW COMPLETE** — all **20 RL lessons across all 7 modules** at 16 MCQs. The 12→16 arc
  has finished **5 of 7 topics** (Algorithms, Linear Algebra, Calculus, Deep Learning, Reinforcement Learning).
  Remaining: **LLMs** and **Probability & Statistics**.

## iter 186 — Multi-armed bandit visualization (`rl-bandit`, the 41st widget) (visualizations)
The iter-185 *Exploration* lesson (ε-greedy, UCB, regret, multi-armed bandits) had **no viz** — yet the bandit is the
canonical explore/exploit testbed. New `rl-bandit` widget: 5 arms with hidden Bernoulli win-rates (best = C at 0.75).
A **strategy** select (ε-greedy / UCB1 / pure-greedy) + an **ε** slider + **Pull ×50 / ×500 / Reset** drive a live
simulation. The top panel shows each arm's **estimated** win-rate (bar) vs its **true** rate (red tick) with pull
counts, greedy arm highlighted; the bottom panel plots the **cumulative-regret** curve. Rigorous — pure sampling from
fixed arms, exact regret; no trained model; uses only `Math.random` (browser). Embedded before the "Strategy 1 — UCB"
heading in `rl-exploration`.
- **Honest pedagogy**: a multi-seed node study showed that at a 500-pull horizon **no single strategy strictly wins**
  — pure greedy has the *highest variance* (regret range ~1→250: sometimes near-perfect, sometimes locked onto a
  worse arm), ε-greedy pays a steady tax, and UCB is the *most consistent* (its log-regret edge needs far longer
  horizons). The note reflects this truthfully (it does NOT claim "UCB wins") and invites the learner to **reset &
  re-run to witness greedy's swings**.
- **Bug caught & fixed in-flight**: my internal arm-picker was named `select`, which **shadowed VIZUtil's `select()`
  helper** → the strategy dropdown threw at mount ("Visualization failed to load"). Renamed to `chooseArm`; verified
  by directly invoking `window.VIZ['rl-bandit']` (bypassing hydrateViz's try/catch) to surface the real error first.
- **Verified**: `viz.js` + `reinforcement-learning.js` syntax OK; byte-stable JSON round-trip guard (+36 bytes);
  `node gate.js` **ALL GREEN · 41 widgets**; lab render-check → `errs=0 | canvas=1 | rawDollars=0`, 500 pulls →
  regret 17.3, strategy switch to UCB works; lesson-embed `host=1, canvas=1`; all-routes smoke (10) `errs=0`; desktop +
  **390px** screenshots read crafted/legible (arm bars + regret curve). SW cache **v128 → v129**; README 40 → 41.

## iter 185 — MCQ arc → Reinforcement Learning · Practice & Frontiers 12 → 16 (content — owner's #1 ask)
The arc continues through RL's *Exploration, Practice & Connections* module. All **three** lessons go 12 → 16 (**+12,
bank 2,188 → 2,200**), stating the bedrock the existing 12 assumed:
- **Exploration**: the explore–exploit tradeoff / what *ε-greedy* is / what *regret* measures / UCB's "optimism under
  uncertainty" principle.
- **Practical RL**: what *reward hacking* is / the *sparse vs dense* reward tradeoff / what *sample efficiency* means /
  *model-free vs model-based*.
- **Connections & Frontiers**: RL's three distinguishing features (evaluative feedback, credit assignment, the agent
  controls its own data) / *SFT vs RL* (teach by example vs by consequence) / what the RLHF *reward model* is / what
  *offline RL* is.
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,200 MCQs** (★ bank crossed 2,200; no
  bias note); direct key-dump confirms answer indices map to the intended choices, **balanced 3/3/3/3** with three
  *distinct* per-lesson patterns (0,2,1,3 / 3,1,2,0 / 1,3,0,2); an independent adversarial fact-check agent returned
  **ALL PASS**; render-checks on the (KaTeX-heavy) Exploration and Connections quizzes → `errs=0 | "Question 1 of 16"
  | rawDollars=0 kErr=0`; all-routes smoke (10) `errs=0`. SW cache **v127 → v128**; README 2,188 → 2,200. RL now
  **6/7 modules at 16** — only the *Advanced* module remains before RL completes.

## iter 184 — Honest "cards due" + capped new-card intake in Daily Review (UI/UX + correctness)
A **390px mobile audit** (the release gate, not dedicated in a while) swept the newest/most-complex views — TD-MC &
positional-encoding labs, the command palette, Knowledge Map, test, dashboard — and confirmed mobile is **solid**
(no overflow, cramped controls, or breakage at true 390px). But it surfaced a real *correctness/UX* bug: a brand-new
profile's dashboard read **"887 cards due"** and the Daily Review would have queued the **entire 889-card deck**.
Root cause: `cardDue()` treats *never-seen* cards as "due" (correct for letting the review queue surface new cards),
but the dashboard stat / CTA / palette and the review session all conflated *unseen* cards with a *review backlog* —
alarming and inaccurate, and a brutal first session.
- **Fix**: added `Store.cardState(id)` → `new` / `due` / `later`, and `stats()` now returns **`reviewDue`** (started &
  now due — the honest "needs attention" number) and `newCount` alongside the legacy `dueCount`. The dashboard "Cards
  due" stat, its review CTA, and the ⌘K "Daily Review · N due" entry now use `reviewDue` (a fresh user sees **0**, not
  887). The Daily Review view now serves **all due reviews + a capped 30 new cards/session** (matching Daily Mix's
  existing cap), with an honest forecast (*due to review · new this session · due in 7 days · in rotation*) and copy.
  `cardDue` is unchanged, so nothing else regresses.
- **Verified**: `store.js`+`app.js` syntax OK; a node logic test — fresh profile `reviewDue=0, newCount=totalCards`;
  after seeding 1 due + 1 later card, `reviewDue=1` and `cardState` returns due/later/new correctly; browser on a
  **fresh profile** → dashboard "Cards due = 0", CTA "⚡ Review flashcards" (no scary number), Review forecast "0 due ·
  30 new this session", and the **flashcard deck is 30 cards (not 889)**; all-routes smoke (11) `errs=0`; the 6-view
  390px audit read clean. No state-shape change → prior saves load. SW cache **v126 → v127**.

## iter 183 — MCQ arc → Reinforcement Learning · Policy Gradient 12 → 16 (content — owner's #1 ask)
The arc continues through RL's *Policy-Gradient & Actor-Critic* module. All **three** lessons go 12 → 16 (**+12, bank
2,176 → 2,188**), stating the bedrock the existing 12 assumed:
- **Policy Gradients & REINFORCE**: what policy-gradient methods *are* (parameterize $\pi_\theta$, ascend expected
  return — vs value-based) / the objective $J(\theta)=\mathbb{E}[R(\tau)]$ / the REINFORCE estimator ($\nabla\!\log\pi
  \cdot R$) / why subtract a *baseline* (variance reduction, unbiased).
- **Actor-Critic**: what actor-critic *is* (actor=policy, critic=value fn) / the *advantage* $A=Q-V$ / why pure
  REINFORCE's MC return is high-variance / how the *critic* is trained (value regression to a TD/MC target).
- **TRPO & PPO**: what a *trust region* is / what PPO's *clip* accomplishes (keep $r_t$ near 1; cheap first-order trust
  region) / why PPO is *on-policy* (recollect data each round) / what the ratio $r_t=\pi_\theta/\pi_{\theta_{old}}$ measures.
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,188 MCQs** (no bias note — the
  iter-182 de-skew plus these balanced additions keep all three lessons clean); direct key-dump confirms answer indices
  map to the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson patterns (0,2,1,3 / 3,1,2,0 /
  1,3,0,2); an independent adversarial fact-check agent returned **ALL PASS**; render-checks on the (KaTeX-heavy)
  Actor-Critic and TRPO/PPO quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (11)
  `errs=0`. SW cache **v125 → v126**; README 2,176 → 2,188. RL now **5/7 modules at 16**.

## iter 182 — De-skew answer positions across the last 9 biased lessons (workflow / content quality)
`node gate.js` had flagged "answer-position bias (>70% of answers at one index)" for ~120 iterations — a real quiz-
quality smell in the *original* 12-MCQ sets (their author overwhelmingly favored option B; e.g. `rl-trpo-ppo` and
`ps-geometric-waiting` were **11/12 at index 1**). The 12→16 arc had been diluting it (13→9 flagged), but 9 lessons
remained. This resolves it directly with a **correctness-preserving de-skew**: a one-off script reorders each MCQ's
choices so the correct one lands at a balanced target index, **updating `answer` accordingly** — the correct-choice
*text is unchanged*, so the answer key is provably still right (the script asserts `choices[newAnswer] === original
correctText` and aborts otherwise). **81 MCQs across 9 lessons** (in RL, LLM, and Prob-&-Stats) were rebalanced to
~25–33% max per index.
- **Safety**: MCQs whose stem/explanation/choices reference an answer by letter or order ("option B", "(a)", "the
  former"…) were **skipped** (left untouched) so no explanation could end up pointing at a moved choice. A broader
  positional-language scan surfaced 24 further mentions; each was reviewed and confirmed *content*-legitimate ("the
  first success", "the first epochs", "compute-optimal choice", and stem scenario-labels "(a)/(b)/(c)" that each answer
  restates in full) — not answer-position references. The two genuinely-ambiguous reordered MCQs were inspected by
  hand and confirmed intact.
- **Verified**: byte-stable JSON round-trip guard per file; the text-invariant assertion passed for all 81 reorders
  (zero failures → no answer key altered); `node gate.js` **ALL GREEN — and the answer-position-bias note is now GONE
  entirely** (every lesson ≤ 33% per index); render-checks on the de-skewed `rl-trpo-ppo` and `ps-geometric-waiting`
  quizzes → `errs=0 | "Question 1 of 12" | rawDollars=0 kErr=0`; all-routes smoke (11) `errs=0`. SW cache **v124 →
  v125** (3 data files touched). MCQ count unchanged (2,176 — only reordered).

## iter 181 — MCQ arc → Reinforcement Learning · Function Approximation 12 → 16 (content — owner's #1 ask)
The arc continues through RL's *Function Approximation & Value-Based Deep RL* module. Both lessons go 12 → 16 (**+8,
bank 2,168 → 2,176**), stating the bedrock the existing 12 assumed:
- **Value Function Approximation**: *why* FA is needed (state spaces too large/continuous to tabulate, and tables
  can't generalize) / what a *feature vector* $\mathbf{x}(s)$ is / the *linear* approximator form ($\hat v=\mathbf
  w^\top\mathbf x$, gradient $=\mathbf x$) / a neural net as a *learned feature constructor* (hidden layers = features,
  final linear = weights).
- **Deep Q-Networks**: what a *DQN* is (a neural net $Q(s,a;\theta)$ replacing the table, fit on squared TD error) /
  what *experience replay* is (buffer + random minibatches) / what the *target network* $\theta^-$ is / the DQN
  *architecture* (one forward pass outputs Q for all actions).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,176 MCQs**; direct key-dump confirms
  answer indices map to the intended choices, **balanced 2/2/2/2** with two *distinct* per-lesson patterns
  (1,3,0,2 / 2,0,3,1); an independent adversarial fact-check agent returned **ALL PASS** (it confirmed the Mnih-2015
  DQN architecture — state-in / one Q-value-per-action-out, single pass); render-checks on the Value-Approximation and
  DQN quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (11) `errs=0`. SW cache
  **v123 → v124**; README 2,168 → 2,176. RL now **4/7 modules at 16**.

## iter 180 — Modal focus management: trap + restore + dialog semantics (accessibility) · ★180 reflection
Accessibility was the most-neglected compass area (last dedicated at iter 160, 20 iters ago). The four overlays
(command palette, welcome tour, level-up, keyboard-shortcuts) all handled Escape, but shared three real a11y gaps:
focus wasn't moved into / **trapped within** the dialog, focus was **lost on close** (keyboard & screen-reader users
got dumped to the page top), and most lacked `role="dialog"`/`aria-modal`. Added one shared **`modalA11y(scrim, card,
label)`** helper that: marks the card `role="dialog"` + `aria-modal="true"` (+ an aria-label), moves focus inside on
open, **traps Tab/Shift+Tab within the dialog**, and on `release()` **restores focus to whatever was focused when the
modal opened**. Wired into all four overlays (open → store the releaser; every close path calls it). Purely
behavioral — no visual change.
- **Verified**: `app.js` syntax OK; a headless focus-driven test confirms, for the command palette: `role=dialog`,
  `aria-modal=true`, focus moves into the input on open, **Tab stays trapped**, Escape closes, and **focus returns to
  the Search button** that opened it; same for the shortcuts overlay (`role=dialog`, `aria-modal`, focus-in,
  focus-restored to the ⌨ button). All-routes smoke (11) `errs=0`. No visual change → no screenshot/mobile gate needed.
  SW cache **v122 → v123**.

★ **180-iteration reflection.** The loop remains healthy — strict content/non-content alternation held another 10
iters, zero red gates, zero reverts. **Content**: the 12→16 MCQ arc reached **2,168 MCQs**; **Deep Learning completed**
(all 22 lessons, iter 173) and the arc is now **5 topics opened / 4 complete** (Algorithms, LA, Calculus, DL done; RL
at 3/7 modules). **Non-content** rotated genuinely widely this stretch — viz×2 (positional-encoding→transformers,
KL→VAE… then dropout earlier; TD-vs-MC→RL), gamification (achievements 168), animations (Progress count-up 174),
understandability (glossary +14 terms 176), UI/UX (reading-progress bar 170), and now a11y (180). Site totals:
**40 widgets · 46 achievements · 89 glossary terms · 2,168 MCQs**. The "pair a viz with the upcoming content module"
tactic is paying off (positional-encoding, KL, TD-MC all landed where the arc was heading). *Still-thin / candidates*:
**workflow/dev-flow** (gate or MCQ-pipeline tooling — last at 158), **mobile** (no dedicated audit-and-fix in a while),
and **performance** (verified fine at 164, no action). No area is alarmingly neglected; flow still serves the north
star. **OWNER:** the arc will keep marching through RL → LLMs → Prob & Stats (≈45 lessons / ~11 content iters to reach
the whole bank at 16); say the word if you'd rather I divert to a bigger new pillar instead of finishing the sweep.

## iter 179 — MCQ arc → Reinforcement Learning · Model-Free Prediction 12 → 16 (content — owner's #1 ask)
The arc continues through RL's *Model-Free Prediction & Control* module. All **four** lessons go 12 → 16 (**+16, bank
2,152 → 2,168**), stating the bedrock the existing 12 assumed:
- **Monte Carlo**: the core idea (average actual returns over sampled episodes) / what *model-free* means / that MC
  assumes only *termination* (not the Markov property) / the incremental-mean update's purpose.
- **TD Learning**: the *TD target* ($R_{t+1}+\gamma V(S_{t+1})$) / what the *TD error* represents (a prediction
  error) / TD as model-free-but-bootstrapping (the MC↔DP synthesis) / TD(0) prediction converges to $v_\pi$.
- **SARSA & Q-Learning**: *prediction vs control* / the SARSA update & its name (on-policy, uses the action actually
  taken) / *behavior vs target* policy / why control must keep exploring (ε-greedy).
- **Eligibility Traces**: the $n$-step return as the TD(0)↔MC interpolation / what the *λ-return* is / what an
  *eligibility trace* is / the *forward vs backward* view equivalence.
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,168 MCQs** (position-bias note even
  dropped 10→9 lessons — the balanced additions de-skewed another); direct key-dump confirms answer indices map to the
  intended choices, **balanced 4/4/4/4** with four *distinct* per-lesson patterns (0,2,1,3 / 2,0,3,1 / 3,1,2,0 /
  1,3,0,2); an independent adversarial fact-check agent returned **ALL PASS** (it validated the 1/N incremental-mean,
  the Robbins-Monro TD(0)→$v_\pi$ convergence, and the λ-return weights vs S&B Eq 12.2); render-checks on the
  (KaTeX-heavy) Eligibility-Traces and SARSA/Q quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`;
  all-routes smoke (11) `errs=0`. SW cache **v121 → v122**; README 2,152 → 2,168. RL now **3/7 modules at 16**.

## iter 178 — TD-vs-Monte-Carlo visualization (`rl-td-mc`, the 40th widget) (visualizations)
RL is the current content focus but was viz-thin (only the gridworld + Q-learning widgets), and the single most
illuminating idea of the upcoming *Model-Free Prediction* module — how **TD bootstraps** while **MC waits for the
return** — had no visual. New `rl-td-mc` widget runs the canonical **Sutton & Barto 5-state random walk**: episodes
start at center C, step left/right with equal probability, reward +1 only at the right terminal, so the true values
rise linearly (A=1/6 … E=5/6, drawn dashed). A **▶ Run 10 / ▶▶ Run 100 / ↻ Reset** control plays episodes and plots
**TD(0)** (gold) and **every-visit Monte-Carlo** (sage) estimates crawling toward the truth, with **live RMS errors**
for each — so the learner *sees* TD converge with lower variance. An **α** slider tunes the step size. Rigorous (the
true values are known in closed form; no trained model) and uses only `Math.random` (browser-side). Embedded before
the "MC vs TD vs DP" comparison in `rl-td-learning`; note is plain-unicode.
- **Verified**: `viz.js` + `reinforcement-learning.js` syntax OK; a node simulation confirms the math — RMS falls from
  ~0.30 to **TD 0.044 / MC 0.086** after 100 episodes (TD lower-variance, the classic result); byte-stable JSON
  round-trip guard before the embed (+35 bytes); `node gate.js` **ALL GREEN · 40 widgets** (embedded id resolves);
  lab render-check → `errs=0 | canvas=1 | rawDollars=0`, and **"Run 100" drives TD RMS 0.236 → 0.079** in-browser
  (the simulation works); lesson-embed → `host=1, canvas=1`; all-routes smoke (11) `errs=0`; desktop + **390px**
  screenshots read crafted/legible (TD/MC/true lines converging). SW cache **v120 → v121**; README 39 → 40.

## iter 177 — MCQ arc → Reinforcement Learning · Dynamic Programming 12 → 16 (content — owner's #1 ask)
The arc continues through RL's *Planning with Dynamic Programming* module. Both lessons go 12 → 16 (**+8, bank
2,144 → 2,152**), stating the bedrock the existing 12 assumed:
- **Policy Evaluation & Policy Iteration**: what *policy evaluation* computes ($v_\pi$ of a fixed policy via Bellman
  expectation backups) / what the *policy-improvement* step does (greedy w.r.t. $v_\pi$) / what *policy iteration* is
  (alternate the two until the policy is stable → optimal) / why DP is *planning* not *learning* (it needs a known model).
- **Value Iteration & GPI**: what *value iteration* does (iterate the Bellman *optimality* backup — the $\max_a$ —
  to $v_*$) / what the *Bellman optimality equation* says ($v_*(s)=\max_a\dots$) / what *GPI* is (the unifying
  evaluation⇄improvement pattern) / the *stopping rule* ($\Delta<\theta$, sound by the $\gamma$-contraction).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,152 MCQs**; direct key-dump confirms
  answer indices map to the intended choices, **balanced 2/2/2/2** with two *distinct* per-lesson patterns
  (1,3,0,2 / 2,0,3,1); an independent adversarial fact-check agent returned **ALL PASS** (it validated the
  contraction-bound justification of the stopping rule); render-checks on both quizzes → `errs=0 | "Question 1 of 16"
  | rawDollars=0 kErr=0`; all-routes smoke (11) `errs=0`. SW cache **v119 → v120**; README 2,144 → 2,152. RL now
  **2/7 modules at 16**.

## iter 176 — Glossary expansion: +14 high-frequency ML terms (understandability — owner's "hard-concept support" ask)
The inline `.gloss` tooltips (and the searchable Glossary page) are a core understandability feature, but the 75-term
glossary was **light on the dense modern-ML vocabulary** that saturates the DL/LLM/RL/Prob-&-Stats lectures — so many
hard terms got *no* hover-definition. Added **14 carefully-written terms (75 → 89)**, each a one-glance definition that
now lights up wherever it appears in lecture prose: **cross-entropy, KL divergence, learning rate, dropout, batch
normalization, layer normalization, logit, epoch, receptive field, gradient clipping, mixed precision, maximum
likelihood, perplexity, and the Markov property**. Pairs with the just-opened RL topic and deepens help across every
technical lesson — a scalable understandability win (zero per-lesson authoring; the existing tooltip engine surfaces
them automatically).
- **Care taken on matching**: `linkGlossary` matches whole words case-insensitively, longest-first, max 14/lesson,
  skipping headings/code/KaTeX. So I chose **specific, unambiguous** terms — no generic words (e.g. "return") and no
  overlap traps (added "Cross-entropy", not bare "Entropy", which `\b…\b` would wrongly match inside "cross-entropy").
  Defs use `$…$` (KaTeX-rendered in the tooltip) and match the existing terse house style.
- **Verified**: `glossary.js` syntax OK; integrity check — **89 terms, no case-insensitive duplicates, all
  `{term,topic,def}` well-formed**; on the DL Loss-Functions lesson the new terms wrap as `.gloss` tooltips
  (`hasNewTerm=true`, 7 terms linked) and render clean (`kErr=0`, no raw `$` in prose); the Glossary page renders the
  new entries with their math (screenshot read — Cross-entropy/KL-divergence/Logit show formulas); all-routes smoke
  (10) `errs=0`. SW cache **v118 → v119**; README 75 → 89.

## iter 175 — MCQ arc → Reinforcement Learning · Foundations 12 → 16 (content — owner's #1 ask; 5th topic opens)
The arc opens its **fifth topic, Reinforcement Learning**, with the *Foundations: the RL problem & MDPs* module. All
**three** lessons go 12 → 16 (**+12, bank 2,132 → 2,144**), stating the bedrock the existing 12 assumed:
- **What RL Is**: the trial-and-error/no-teacher definition (the "third paradigm") / what a *policy* is (states→actions)
  / what the *return* $G_t$ is (cumulative discounted future reward) / the role of the *discount factor* $\gamma$.
- **MDPs**: the five-tuple $(S,A,P,R,\gamma)$ / the *Markov property* (future depends only on the current state) /
  what the *transition dynamics* $p(s',r\mid s,a)$ describe / that the *reward function* alone specifies the goal.
- **Policies, Values, Bellman**: the *state-value* $v_\pi$ and *action-value* $q_\pi$ definitions / what a *Bellman
  equation* expresses (value = immediate reward + discounted next-state value) / the *optimal* $v_*$/$\pi_*$ (greedy
  w.r.t. $q_*$).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,144 MCQs**; direct key-dump confirms
  answer indices map to the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson patterns
  (0,2,1,3 / 3,1,2,0 / 1,3,0,2); an independent adversarial fact-check agent returned **ALL PASS** (it confirmed the
  γ distractor — "probability the environment changes its reward function" — is fabricated, not the real
  continuation-probability interpretation); render-checks on the (KaTeX-heavy) Policies-Values and What-is-RL quizzes
  → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (11) `errs=0`. SW cache **v117 → v118**;
  README 2,132 → 2,144. Arc progress: **5 topics opened, 4 complete** (Algorithms, LA, Calculus, DL done; RL 1/7
  modules). Remaining: RL (6 modules), LLMs, Probability & Statistics.

## iter 174 — Cascade count-up on the Progress page (animations / juice)
The **Progress page** is the "look how far I've come" celebration screen, yet all its numbers — the hero stat-strip
(XP / lessons / cards / accuracy), the **12 activity tiles**, and the mastery-distribution counts — rendered
*statically* while only the dashboard's hero stats animated (iter 156). Now, on landing, those numbers **cascade-count
up from zero** in a gentle top-to-bottom stagger, so the screen breathes at exactly the moment you've come to admire
your stats — an *earned* animation, not gratuitous motion.
- Generalized the existing `countUp(el)` to `countUp(el, delay)` (backward-compatible — the optional delay sets the
  zero-state immediately, so a staggered start shows no value-flash, then begins after `delay` ms). The Progress page
  fires it across `.stat-strip .v, .act-num, .dist-num` with a capped stagger (`min(i·32, 430)` ms) so the cascade
  stays snappy (~1.1s total) rather than draggy. It correctly counts composite values too (`8/22`, `92%`, `13/46` →
  counts the leading number, keeps the suffix). **Reduced-motion safe**: `countUp` no-ops under reduced-motion, so
  those users see the real values instantly.
- **Verified**: `app.js` syntax OK; **reduced-motion** render (desktop + **390px**) shows the *real* values
  immediately — heroXP `1,234`, activity `60`/`50` — proving graceful degradation (no "stuck at 0"); normal-mode
  `errs=0` (the live cascade completes to real values in a real browser — headless rAF/timers don't advance, the
  documented landmine, same basis as the iter-156 result count-up); backward-compat confirmed — the dashboard and
  result-screen count-ups still work and the all-routes smoke (11 routes) is `errs=0`; reduced-motion desktop + mobile
  screenshots read crafted with no layout regression. SW cache **v116 → v117**.

## iter 173 — MCQ arc → Deep Learning · Generative Models 12 → 16 — ★ DEEP LEARNING COMPLETE (content — owner's #1 ask)
The arc finishes DL's seventh and final module, *Generative Models*. All **three** lessons go 12 → 16 (**+12, bank
2,120 → 2,132**), stating the bedrock the existing 12 assumed:
- **Autoencoders & VAEs**: the autoencoder's encoder→bottleneck→decoder structure / generative vs. discriminative /
  the reparameterization trick's *form* ($z=\mu+\sigma\odot\varepsilon$) / the ELBO's two terms (reconstruction − KL).
- **GANs**: the generator + discriminator structure / what "adversarial" means (the minimax game) / the equilibrium
  ($p_g=p_{\text{data}}$, $D\equiv\tfrac12$) / what *mode collapse* is.
- **Diffusion Models**: the core idea (fixed forward noising + learned reverse denoising) / the forward process /
  how generation runs (denoise from pure noise) / the training objective (predict the noise $\varepsilon$ with MSE).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,132 MCQs** (position-bias note even
  dropped 11→10 lessons — the balanced additions de-skewed another); direct key-dump confirms answer indices map to
  the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson patterns (0,2,1,3 / 3,1,2,0 / 1,3,0,2);
  an independent adversarial fact-check agent returned **ALL PASS** (it validated the ELBO phrasing and the standard
  DDPM ε-prediction parameterization); render-checks on the GANs and Diffusion quizzes → `errs=0 | "Question 1 of 16"
  | rawDollars=0 kErr=0`; all-routes smoke (12, incl. the VAE lesson now carrying the iter-172 KL viz) `errs=0`. SW
  cache **v115 → v116**; README 2,120 → 2,132.
- ★★ **DEEP LEARNING IS NOW COMPLETE** — all **22 DL lessons across all 7 modules** are at 16 MCQs. The 12→16 arc has
  now finished **4 of 7 topics** (Algorithms, Linear Algebra, Calculus, Deep Learning). Remaining: Reinforcement
  Learning, LLMs, Probability & Statistics.

## iter 172 — KL-divergence visualization (`dl-kl-divergence`, the 39th widget) (visualizations)
KL divergence is everywhere in this curriculum — the VAE's latent regularizer, PPO's trust region, the cross-entropy/
LM objective — yet it's abstract and famously *asymmetric*, and had no viz. New `dl-kl-divergence` widget makes it
tangible: a fixed standard-normal **prior** $p=\mathcal N(0,1)$ (sage) and an adjustable Gaussian **posterior**
$q=\mathcal N(\mu,\sigma^2)$ (gold, μ/σ sliders). It shows **KL(q‖p)** — exactly the VAE's regularizer — live, and a
**🎯 Match the prior** button that snaps q to $\mathcal N(0,1)$ so you *watch KL hit 0.000*. It also displays
**KL(p‖q)** alongside, making the asymmetry concrete (forward KL is mode-covering, reverse KL — which the VAE
minimises — is mode-seeking). Rigorous with **no trained model**: KL between two Gaussians is the closed form
$\log(\sigma_2/\sigma_1)+\frac{\sigma_1^2+(\mu_1-\mu_2)^2}{2\sigma_2^2}-\tfrac12$. Static draw (screenshot-faithful);
note is plain-unicode (uses ‖, μ, σ — no `$…$`). Embedded before "7. Generating and interpolating" in the
`dl-autoencoders-vae` lesson (the generative module), right where the ELBO's KL term lives.
- **Verified**: `viz.js` + `deep-learning.js` syntax OK; byte-stable JSON round-trip guard before the embed (+43 bytes);
  `node gate.js` **ALL GREEN · 39 widgets** (embedded id resolves); lab render-check → `errs=0 | canvas=1 | sliders=2 |
  rawDollars=0`, and **"Match the prior" drives KL(q‖p) to 0.000** (confirms the closed-form computation + the
  event-dispatch button wiring); lesson-embed check → `host=1, canvas=1`; all-routes smoke (11) `errs=0`; desktop +
  **390px** screenshots read crafted/legible (both KL readouts + the two Gaussian curves). SW cache **v114 → v115**;
  README 38 → 39.

## iter 171 — MCQ arc → Deep Learning · Transformers 12 → 16 (content — owner's #1 ask)
The arc continues through DL's sixth module, *Transformers and the Modern Deep Learning Stack*. All **three** lessons
go 12 → 16 (**+12, bank 2,108 → 2,120**), stating the bedrock the existing 12 assumed:
- **The Transformer Architecture**: the defining change vs. the RNN (no recurrence → all-pairs attention → $O(1)$
  path + parallelism) / what *multi-head* attention does (parallel attention in projected subspaces, concatenated) /
  the sublayer wrapping (residual + layer norm) / where self-attention's Q,K,V come from ($xW^Q/xW^K/xW^V$ of the same input).
- **Pretraining & Fine-Tuning**: the foundation-model paradigm (pretrain once on unlabeled data, adapt cheaply many
  times) / what makes it *self*-supervised (labels manufactured from the input) / *MLM*/BERT (mask ~15%, bidirectional)
  / *autoregressive*/GPT (predict from predecessors, causal → can generate).
- **Practical Training & Debugging**: what a *tensor* is (shape/dtype/device) / what *mixed precision* trades (bf16/
  fp16 speed+memory vs. precision) / what dominates GPU memory & causes *CUDA OOM* (activations + optimizer state) /
  what *gradient checkpointing* trades (recompute activations to save memory).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,120 MCQs**; direct key-dump confirms
  answer indices map to the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson patterns
  (0,2,1,3 / 3,1,2,0 / 1,3,0,2); an independent adversarial fact-check agent returned **ALL PASS** (it scrutinized the
  residual+norm pre/post-norm subtlety and the AR-objective-vs-training-parallelism distractor); render-checks on the
  Transformer-Architecture and Practical-Training quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`;
  all-routes smoke (12) `errs=0`. SW cache **v113 → v114**; README 2,108 → 2,120.
  ★ **Deep Learning is now 6/7 modules at 16** — only the *Generative Models* module remains before DL is complete.

## iter 170 — Reading-progress bar for long lessons (UI/UX + animations) · ★170 reflection
The lessons are genuinely long-form (the Attention lecture is ~7,000px tall), but there was no sense of *how far
through* you are. A slim **reading-progress bar** now sits at the very top edge (3px, gold gradient with a soft glow)
and fills left→right as you scroll any long page. It is **height-activated, not route-coupled**: a single passive
`scroll`/`resize` listener (rAF-throttled) plus a per-navigation recompute shows the bar only when the page is
genuinely scrollable (`scrollHeight − clientHeight > 400`) and hides it on short pages — so it self-manages across
every route with no per-view wiring or listener leaks. Reduced-motion safe (the width transition is gated behind
`prefers-reduced-motion: no-preference`; those users get instant, un-animated updates). The element lives outside
`#app` (so route re-renders never wipe it) and is `aria-hidden` (a purely visual aid; the TOC + scroll-spy remain the
semantic navigation).
- **Files**: `index.html` (persistent `#read-progress` element), `css/styles.css` (`#read-progress` + `.rp-fill`),
  `js/app.js` (`updateReadProgress`/`scheduleReadProgress`/`initReadProgress`, init in `boot()`, sync recompute in
  `router()` + a 200ms deferred recompute after KaTeX/viz settle the height).
- **Verified**: `app.js` syntax OK; functional dump-dom across 8 routes `errs=0`, and on the long Attention lesson the
  bar activates (`on=true`, `scrollMax=7099`, fill `0%` at top); a forced-fill screenshot (desktop + **390px**)
  confirms the gold bar's appearance and that it doesn't disturb the header/layout; top-of-lesson screenshot shows no
  regression. (Headless can't drive real scroll — confirmed `scrollTop` stays 0 in `--dump-dom`, the known landmine —
  so the scroll-driven fill rests on the verified activation + the trivial `clamp(scrollTop/max)` math, the same
  logic+graceful-degradation basis accepted for the iter-150 scroll-spy.) SW cache **v112 → v113**.

★ **170-iteration reflection.** Health check: the loop is humming — strict content/non-content alternation held for the
last 10 iters with zero red gates or reverts. **Content**: the 12→16 MCQ arc reached **2,108 MCQs** and Deep Learning
is **5/7 modules at 16** (only transformers + generative remain before RL/LLM/PS). **Non-content** rotated well —
viz (dropout 162, positional-encoding 166), new-functionality (Quick Check 164), gamification (achievements 168, which
also *integrated* 164 into the reward loop), a11y (160), and now UI/UX (170). The site is measurably richer:
**38 widgets · 46 achievements · 2,108 MCQs**, with a new in-flow retrieval surface and reading orientation. *Still
thin / candidates next*: a dedicated **understandability** pass (owner's "hard-concept support" ask — deeper-dives
exist but alternative-explanation depth is untouched), **examples** (sweep complete but never revisited for the newer
advanced modules), and **performance** (verified fine at iter 164, no action needed). No compass area is alarmingly
neglected; the flow still serves the north star (understand faster · remember longer · come back).

## iter 169 — MCQ arc → Deep Learning · Sequences & Attention 12 → 16 (content — owner's #1 ask)
The arc continues through DL's fifth module, *Sequence Models and the Attention Revolution*. All **three** lessons go
12 → 16 (**+12, bank 2,096 → 2,108**), stating the bedrock the existing 12 assumed:
- **RNNs/LSTMs/GRUs**: what the hidden state $h_t$ *is* (the running, compressed memory of the past) / what *BPTT*
  means (backprop on the unrolled graph, gradients summing into shared weights) / the LSTM *forget gate*'s role
  (keep vs. erase the cell state) / the seq-to-one configuration (predict from $h_T$).
- **Embeddings & Tokenization**: what a learned *embedding* is (a dense learned vector; similar tokens near each
  other) / what *one-hot* is / what *tokenization* is (splitting text into the units that get embedded) / the
  embedding-table shape ($|V|\times d$, embed = row lookup).
- **The Attention Mechanism**: what *query/key/value* represent (the soft-dictionary roles) / the three steps
  (score → softmax → weighted average of values) / what the attention weights $\alpha$ are (a distribution over
  positions summing to 1) / what defines *self-attention* (Q,K,V all from the same sequence).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,108 MCQs**; direct key-dump confirms
  answer indices map to the intended choices, **balanced 3/3/3/3** with three *distinct* per-lesson patterns
  (0,2,1,3 / 3,0,2,1 / 1,3,0,2 — no marching); an independent adversarial fact-check agent returned **ALL PASS** (it
  confirmed the self-attention Q's cross-attention distractor is a contrast case, not a second valid answer);
  render-checks on the Attention and Embeddings quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`;
  all-routes smoke (12) `errs=0`. SW cache **v111 → v112**; README 2,096 → 2,108.
  ★ **Deep Learning is now 5/7 modules at 16** (foundations, training-mechanics, generalization, convolutional,
  sequences-attention).

## iter 168 — 3 new achievements that reward the best learning behaviors (gamification — owner-loved; +integrates iter-164 Quick Check)
Gamification had gone quiet since iter 154 (14 iters), and the iter-164 **Quick Check** shipped *disconnected* from the
motivation loop. This closes that loop and rewards the site's two highest-leverage behaviors — in-flow retrieval and
deep exploration — with **3 new achievements (43 → 46)**:
- **🔎 Self-Examiner** — try a lecture's Quick Check (rewards doing low-stakes retrieval at all).
- **🌟 Quick Ace** — ace a Quick Check (all answers right).
- **🛰️ Viz Voyager** — open **15 different** visualizations (the old "Visualizer" rewards opening just *one*; this
  rewards exploring the 38-widget lab — with a live progress bar in the Hall).
Crucially the Quick-Check badges reward the **behavior, not a graded score**, so Quick Check stays no-stakes (still no
XP/mastery). New `recordQuickCheck(correct,total)` and `recordVizOpen(id)` in `store.js`; viz hydration now records the
*distinct* id (so `visualizer` + `viz-voyager` both flow from one path); Quick Check's `done()` calls
`recordQuickCheck` + `flushAchievements`. New ids slotted into the grouped Hall categories (Quizzes & Tests /
Exploration) and `viz-voyager` into the progress map + dashboard "nearest achievement" nudge.
- **State safety**: two new fields — `quickChecks` (count) and `vizSeen` ({id→true}) — added to `blank()` AND the
  `load()` typeof-merge (`num(...)` / object-guard), so a prior-shape save still loads.
- **Verified**: `store.js` + `app.js` syntax OK; a node test with a **prior-shape save (no new fields)** loads cleanly
  (xp/streak preserved, `quickChecks=0`, `vizSeen={}`); unlock logic exercised — `recordQuickCheck(2,3)`→Self-Examiner
  only, `(3,3)`→Quick Ace; 15 distinct viz→Viz Voyager, dup opens don't double-count; **count 43→46**. Browser drive:
  completing a Quick Check unlocks Self-Examiner (`errs=0`), and all three render in the Hall; desktop + **390px**
  achievements screenshots good (mobile header reads "0 of 46 unlocked"); all-routes smoke (12) `errs=0`. SW cache
  **v110 → v111**; README 43 → 46.

## iter 167 — MCQ arc → Deep Learning · Convolutional Networks 12 → 16 (content — owner's #1 ask)
The arc continues through DL's fourth module, *Convolutional Networks for Vision*. All **three** lessons go 12 → 16
(**+12, bank 2,084 → 2,096**), stating the bedrock the existing 12 assumed:
- **The Convolution Operation**: what a *kernel* is (a small array of learnable weights = a pattern detector) / what a
  *feature map* is (the grid of responses = a heatmap of where the pattern appears) / the two priors convolution
  encodes (locality + translation *equivariance*) / why we zero-pad (center the kernel on border pixels so the output
  doesn't shrink).
- **Pooling & CNN Architectures**: what max-pooling outputs (the window max) / pooling's purpose beyond downsampling
  (small-shift tolerance / local invariance) / pooling has *no* learnable parameters / a 2×2/stride-2 pool gives
  $(H/2, W/2, C)$ — channels untouched (applied per channel).
- **Transfer Learning**: the central idea (reuse a net pretrained on a large dataset for a new small-data task) /
  feature-extraction (freeze backbone, train head) vs fine-tuning (also unfreeze backbone) / the feature hierarchy
  (early = generic edges/blobs, late = task-specific) / the standard first step: discard the old head, attach a fresh
  $K$-class head.
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,096 MCQs** (position-bias note even
  dropped 12→11 lessons — the balanced additions de-skewed another); direct key-dump confirms answer indices map to
  the intended choices, **balanced 3/3/3/3** with no within-lesson marching pattern; an independent adversarial
  fact-check agent returned **ALL PASS** (it specifically validated the conv-*equivariance* vs pooling-*invariance*
  distinction as internally consistent); render-checks on the Pooling and Convolution quizzes → `errs=0 | "Question 1
  of 16" | rawDollars=0 kErr=0`; all-routes smoke (13) `errs=0`. SW cache **v109 → v110**; README 2,084 → 2,096.
  ★ **Deep Learning is now 4/7 modules at 16** (foundations, training-mechanics, generalization, convolutional).

## iter 166 — Positional-encoding visualization (`llm-positional-encoding`, the 38th widget) (visualizations)
The transformers thread had **no positional-encoding viz** — yet sinusoidal PE is one of the most abstract ideas in
the stack (a formula of nested powers of 10000), and the dedicated lesson *"Positional Information: From Sinusoids to
RoPE"* had no visual. New `llm-positional-encoding` widget makes it concrete with **three views** (a `view` select):
- **Heatmap** — the iconic *position × dimension* grid (40 positions × d dims), colour = the sin/cos value (sage +1,
  rust −1). You can see low dimensions oscillate fast and high ones slowly — the "continuous binary clock."
- **Frequencies (waves)** — a handful of dimensions drawn as sine waves across positions, making the geometrically
  spaced wavelengths (ω = 10000^−2k/d) visible — *these are the rows of the heatmap*.
- **Relative similarity** — dot-product similarity between a chosen query position q (slider) and every position,
  normalised so the peak at q is 1; it decays smoothly and symmetrically with distance, which is *why* fixed
  sinusoids let attention recover **relative** position.
- A `dimensions d` slider (16–64) rescales the encoding live. All three are **synchronous static draws** (no rAF), so
  first paint is correct and screenshots are faithful. The note is plain-unicode (uses ω, superscripts, −; no `$…$`).
  Embedded before the "Absolute Position 2: Learned Embeddings" h3 in `llm/l-positional-encoding`. Canvas gets
  `role="img"` + an aria description.
- **Verified**: `viz.js` + `llm.js` syntax OK; byte-stable JSON round-trip guard before the embed (+50 bytes);
  `node gate.js` **ALL GREEN · 38 widgets** (embedded id resolves); lab render-check cycling all three modes →
  `errs=0 | canvas=1 | ctls=3 | rawDollars=0`; lesson-embed check → `host=1, canvas=1`; all-routes smoke (12)
  `errs=0`; desktop screenshots of all three modes + a **390px** mobile shot read crafted/legible. SW cache
  **v108 → v109**; README 37 → 38 (two counts + appended to the widget list).

## iter 165 — MCQ arc → Deep Learning · Generalization 12 → 16 (content — owner's #1 ask)
The arc continues through DL's third module, *Generalization: Regularization and Stable Training*. All **three**
lessons go 12 → 16 (**+12, bank 2,072 → 2,084**), stating the bedrock the existing 12 assumed:
- **Overfitting & Regularization**: overfit = low-train/high-val (variance term) vs underfit (bias) / what a
  *validation* set is for (vs the test set) / the *generalization gap* = $R(f) - \hat R(f)$ / $L_2$ adds a
  $\lambda\lVert w\rVert_2^2$ penalty (shrinks effective capacity).
- **Dropout & Normalization**: dropout zeros each unit with prob $p$ (keeps with $q=1-p$) / why it's *off* at test
  (deterministic prediction) / BatchNorm normalizes a feature to ~zero-mean/unit-variance across the batch then
  applies learnable $\gamma,\beta$ / LayerNorm normalizes across *one example's features* vs BatchNorm across the batch.
- **Initialization & Gradient Flow**: what the *vanishing-gradient* problem is (geometric decay back through layers)
  / why weights need *random* (not constant) init — symmetry breaking / what *fan-in* means / the core goal: keep
  signal variance ~constant layer to layer (per-layer multiplier ≈ 1).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,084 MCQs** (position-bias note even
  dropped 13→12 lessons — the balanced additions de-skewed one); direct key-dump confirms answer indices map to the
  intended choices, **balanced 3/3/3/3**; an independent adversarial fact-check agent returned **ALL PASS** (it
  scrutinized the Q10 symmetry-breaking edge case — holds for any constant init); render-checks on the Overfitting and
  Initialization quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (13, incl. the
  dropout lesson that also carries the iter-162 viz) `errs=0`. SW cache **v107 → v108**; README 2,072 → 2,084.
  ★ **Deep Learning is now 3/7 modules at 16** (foundations, training-mechanics, generalization).

## iter 164 — Inline "Quick Check": low-stakes retrieval at the end of every lecture (new functionality / understandability)
The lecture reading flow had **no retrieval practice** — the Quiz tab is a deliberate, separate switch, so learners
who read and move on never test recall, forfeiting the single best-evidenced retention lever (the *testing effect*,
Roediger & Karpicke). New **Quick Check** sits at the end of the lecture body (right after the prose, before notes
& navigation — the natural "done reading" beat). It opens collapsed with an inviting framing ("Reading it is not the
same as remembering it"), then runs **3 questions sampled from the lesson's own MCQ bank** with immediate
correct/incorrect feedback + explanations, ending on a "you recalled N/3" beat with a one-tap **"Take the full quiz →"**
CTA (clicks the quiz tab) and an "↻ Another 3" reshuffle.
- **Deliberately no-stakes**: awards **no XP, no mastery, no miss-tracking** — the graded Quiz tab owns scoring. This
  keeps it pedagogically distinct (low-stakes in-flow retrieval vs. the graded test) and prevents double-counting /
  gaming. Zero new content — reuses each lesson's existing MCQs via the shared `shuffle()` + the quiz visual classes
  (`.choice`/`.explain`), so it inherits KaTeX typesetting and the answer-feedback juice. Skips itself on lessons
  with < 3 MCQs (`host.remove()`).
- **Files**: `js/app.js` — `mountQuickCheck(host, lesson)` (self-contained state machine), a `#quick-check`
  placeholder in `renderLecture`'s body + the mount call; `css/styles.css` — `#quick-check` card (gold left-accent
  panel) + `.qc-*` styles, theme-variable-based so both themes adapt.
- **Verified**: `node -e Function(...)` syntax OK; functional drive (headless) — mount→intro→Start→answer→explanation
  →Next→done-screen all `errs=0`, and the **"full quiz" CTA switches to the quiz tab and renders it** (`aria-selected
  =true`, "Question 1 of …" shown); KaTeX check inside the card → `qcKErr=0 | qcRawDollars=0 | sawKatex=1`; desktop
  intro + answered screenshots read crafted; **390px** mobile screenshot legible (stem + wrapped choices); all-routes
  smoke (15 routes incl. a non-DL lesson) `errs=0`. No state-shape change (store.js untouched) → prior saves load.
  SW cache **v106 → v107**.

## iter 163 — MCQ arc → Deep Learning · Training Mechanics 12 → 16 (content — owner's #1 ask)
The arc's **fourth topic continues**: all **four** lessons of the *How Networks Learn* module go 12 → 16
(**+16, bank 2,056 → 2,072**), stating the bedrock the existing 12 assumed.
- **Loss Functions**: a loss is *one scalar measuring badness* that training minimizes / softmax maps logits to a
  nonnegative distribution summing to 1 / binary classification = single sigmoid + binary cross-entropy / why
  regression keeps a *linear* output (the Gaussian target is unbounded).
- **Backpropagation**: a computational graph is a *DAG* of intermediate values / the backward pass is seeded with
  $\bar L=\partial L/\partial L=1$ / why *reverse topological order* (downstream contributions must accumulate
  first) / gradient descent then steps $\theta\leftarrow\theta-\eta\nabla_\theta L$, opposite the gradient.
- **Optimizers**: the gradient points toward steepest *increase* / "unbiased estimator" means
  $\mathbb{E}[\nabla L_{\text{batch}}]=\nabla L_{\text{full}}$ / raising momentum $\beta$ adds inertia (longer
  history) / what "stochastic" actually names (random data sampling).
- **Learning Rates / Loop**: the five-step canonical loop order (zero_grad → forward → loss → backward → step) /
  an *epoch* = one full pass over the data / why the loss must be a *scalar* (we differentiate it) / why schedules
  *decay* the rate (big steps early, fine steps late).
- **Verified**: byte-stable JSON round-trip guard; `node gate.js` **ALL GREEN · 2,072 MCQs**; a direct key-dump
  confirms answer indices map to the intended choices with a **balanced 4/4/4/4** position distribution (de-skewed);
  an independent adversarial fact-check agent returned **ALL PASS** — its one flagged borderline (the training-loop
  ordering distractor that merely moved `zero_grad` to the end, arguably also valid) was **hardened** to an
  unambiguously broken order (`step → backward`) via a byte-stable patch; render-checks on the Backprop and
  Loss-Functions quizzes → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`; all-routes smoke (13) `errs=0`.
  SW cache **v105 → v106**; README 2,056 → 2,072. DL now 2/7 modules at 16.

## iter 162 — Dropout visualization (`dl-dropout`, the 37th widget) (visualizations)
A non-content move interleaved into the MCQ arc. The *Dropout & Normalization* lesson taught implicit ensembling —
"$n$ droppable units define $2^n$ weight-sharing sub-networks" — but had **no viz**; this makes the idea
*watchable*. A new `dl-dropout` widget draws a 4-layer MLP (`sizes [3,6,6,2]`); in **Training** mode each forward
pass independently keeps each hidden unit with prob $q=1-p$ (a **drop-rate slider**, 0–0.8), drawing dropped units
as crossed-out gray rings with their edges gone and surviving units as filled gold/sage nodes — **🎲 Resample** draws
a fresh mask, **▶ Animate** resamples ~1.7×/s so you watch a different thinned sub-network each pass. A **phase**
select flips to **Test** mode (all units kept, edges dimmed, note explains the $q$-scaling / inverted-dropout
convention). The live note is plain-unicode (uses "2ⁿ", no `$…$` — KaTeX doesn't re-run on dynamic note updates) and
reports the exact `dropped/total` hidden count. Embedded inline just before the "Batch Normalization" h3 in
`dl-dropout-and-normalization`. Canvas gets `role="img"` + an aria description; the initial `resample()` paints
synchronously so first paint isn't blank.
- **Verified**: `node -e Function(...)` syntax OK on `viz.js` + `deep-learning.js`; byte-stable JSON round-trip guard
  passed before the embed (+37 bytes, the one escaped `<div>`); `node gate.js` **ALL GREEN · 37 widgets** (the
  embedded id resolves); lab render-check `#/lab/dl-dropout` → `errs=0 | canvas=1 | ctls=10 | rawDollars=0` with the
  note reading "dropped 3/12 hidden units"; lesson-embed check → `host=1 | canvasInHost=1 | sliders=1 | errs=0`;
  all-routes smoke (14 routes) → `errs=0`; desktop + **390px** screenshots read and look crafted/legible. SW cache
  **v104 → v105**; README 36 → 37 (two counts + appended to the widget list); the home "Learn" card count is
  computed from the registry and now auto-reads 37.

## iter 161 — MCQ arc → Deep Learning · Foundations 12 → 16 (content — owner's #1 ask; 4th topic opens)
The arc opens its **fourth topic, Deep Learning**, with the *Foundations* module. **+4 new MCQs each** to all three
lessons (**+12, bank 2,044 → 2,056**), stating the bedrock the existing 12 assumed: supervised-vs-unsupervised /
classification-vs-regression / the goal is *generalization* / what a validation set is for; weights & bias are the
learnable parameters / "hidden" layers / softmax for $K$-class output / the forward pass computes the output; ReLU
$=\max(0,z)$ / $\tanh$ range $(-1,1)$ / why ReLU avoids vanishing gradients ($\phi'=1$ for $z>0$) / sigmoid for a binary
output. Answer positions shuffled ([2,0,3,1]/[1,3,0,2]/[3,1,2,0]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (2,056 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (the
  validation-vs-test, single-sigmoid-is-binary-only, forward-pass-not-backprop, and ReLU-not-smooth/bounded/probabilistic
  distractors all checked); render-check on the Activation-Functions quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`.
  SW cache **v103 → v104**; README 2,044 → 2,056.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓, Calculus ✓; **Deep Learning now 1/7** (foundations). Remaining DL:
  training-mechanics, generalization, convolutional, sequences-and-attention, transformers, generative. Then RL/LLM/PS.

## iter 160 — Per-route document titles (a11y / UX) + ★160 reflection
The SPA left the browser-tab title stuck on "Atlas · Personal Learning Codex" for *every* route — so screen-reader users
heard no page-change announcement on navigation, and browser history / bookmarks / open tabs were all indistinguishable.
The router now sets a meaningful `document.title` per route via `docTitleFor(parts)`: lessons, courses, and lab widgets
resolve to their *actual* names (e.g. "Convex Sets, Convex Functions & Why They Matter · Atlas", "Taylor Polynomials… · Atlas"),
and every page route gets a clear label ("Knowledge Map", "Daily Mix", "Progress", "Learning path: …", "Cheatsheet: Calculus"…).
- **Verified**: `node gate.js` ALL GREEN; navigated ~20 route types and captured the title the router set for each →
  **errs=0**, lesson/course/viz/path/cheatsheet/placement names all correctly resolved, page routes labeled, the 404 falls
  back to the base title. SW cache **v102 → v103**.
- **★160 reflection**: the loop is healthy and the owner's #1 ask is the engine — the 12→16 MCQ arc has now fully migrated
  **3 of 7 topics** (Algorithms, Linear Algebra, Calculus; bank 1,776 → 2,044, +268). Non-content slots stayed well-rotated
  across the compass: viz ×3 (optimizer race / Riemann / Taylor), gamification ×2 (achievement nudge & 43-achievement
  categorization), animations (goal-ring sweep, result count-up), workflow (command palette, "redrill misses"), UI/UX
  (TOC + scroll-spy, per-route titles), new functionality (auto-TOC), plus a clean mobile audit and a countUp clock-skew
  fix. No compass area is starved; no failure mode has tripped. Next ~50: finish the arc (DL/RL/LLM/PS → ~2,300 MCQs),
  keep interleaving bold viz/feature swings.

## iter 159 — MCQ arc → Calculus · Convex & Constrained Optimization 12 → 16 · ★ CALCULUS COMPLETE (content — owner's #1 ask)
The final Calculus module. **+4 new MCQs each** to *Convex Sets & Functions*, *Gradient Descent on Convex Functions*,
and *Lagrange Multipliers* (**+12, bank 2,032 → 2,044**) — and with this **all 25 Calculus lessons are at 16 MCQs**, making
**Calculus the third topic fully migrated** (after Algorithms ✓ and Linear Algebra ✓). New angles: the convex-set
definition / convex ⟺ Hessian PSD / which function is convex ($e^x$) / $-f$ is concave; a concrete GD step ($x_0{=}4,
\eta{=}0.1\Rightarrow 3.2$) / converged when $\nabla f=0$ / too-large-lr diverges / GD is first-order; a Lagrange compute
($\max(x{+}y)$ s.t. $x^2{+}y^2{=}2$ is $2$) / the constraint restricts to the feasible set / the Lagrangian $f-\lambda g$ /
$\lambda{=}0$ ⟹ the constraint isn't binding. Answer positions shuffled ([1,3,0,2]/[2,0,3,1]/[3,1,2,0]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (2,044 MCQs) and a
  programmatic check confirms **every Calculus lesson = 16**; direct key-dump confirms the shuffled indices; an independent
  adversarial fact-check agent returned **ALL PASS** (PSD-not-PD, $x_1{=}3.2$, $\max{=}2$ via Cauchy–Schwarz, Lagrangian
  $f-\lambda g$, $\lambda{=}0$ non-binding all checked); render-check on the Lagrange quiz → `errs=0 | "Question 1 of 16" |
  rawDollars=0 kErr=0`. SW cache **v101 → v102**; README 2,032 → 2,044.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓, **Calculus ✓** — 3 of 7 topics fully at 16 (bank 1,776 → 2,044).
  NEXT topics: Deep Learning, Reinforcement Learning, LLMs, Probability & Statistics.

## iter 158 — "Redrill the N you missed" on the test results screen (workflow / new functionality)
Finishing a (non-mastery) test now offers an immediate **"↻ Redrill the N you missed"** button on the results screen,
which launches a mastery drill on *exactly* the questions you just got wrong (shuffled, re-queued until each sticks) —
tightening the owner's "think again until you pass" loop: fix the misses while they're fresh, no detour to the dashboard's
global mistakes deck. The button is a no-op-omit on a perfect run (`${missed.length ? … : ""}`), and only appears on the
standalone result (not the chained Daily-Mix flow). Reuses the existing `runMasteryDrill`; misses cleared from the global
deck as you get them right, exactly as before.
- **Verified**: `node gate.js` ALL GREEN; drove a 5-question test (mastery off) to its result → `errs=0`, button reads
  "↻ Redrill the N you missed" with the correct count, and clicking it **replaces the result with a fresh drill question**
  on just the missed items (`resultGone:true, drillQuestionShown:true`); a perfect test omits the button by construction;
  all-routes smoke `errs=0`; results screenshot read (primary gold Redrill + New test + Done). SW cache **v100 → v101**.
- Workflow/new-functionality areas were the most-neglected (since iters 142/144); this revisits them.

## iter 157 — MCQ arc → Calculus · Bridge to Multivariable 12 → 16 (content — owner's #1 ask)
The Calculus arc's sixth module, *Bridge to Multivariable Calculus for ML*. **+4 new MCQs each** to all three lessons
(**+12, bank 2,020 → 2,032**): a $\partial/\partial x$ compute / the partial as a slice-slope / how many partials
$f(x,y,z)$ has / an $f_{xx}$ compute; $\nabla f=(f_x,f_y)$ / $\nabla(x^2+y^2)$ at $(1,2)=(2,4)$ / directional derivatives
need a **unit** vector / $\mathbf u\perp\nabla f\Rightarrow D_{\mathbf u}f=0$; what the Hessian test distinguishes
(min/max/saddle) / positive-definite Hessian ⟹ local min / the Hessian is the matrix of second partials /
negative-definite Hessian ⟹ local max. Answer positions shuffled ([2,0,3,1]/[1,3,2,0]/[3,1,0,2]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (2,032 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (the
  $2xy^3$ / $6xy$ computes, the $(2,4)$ gradient, normalize-first directional derivative, and the PD→min / ND→max
  Hessian criteria all checked); render-check on the Optimization quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`.
  SW cache **v99 → v100**; README 2,020 → 2,032.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 6/7** — only Convex & Constrained Optimization remains,
  then Calculus is complete. Then DL/RL/LLM/PS.

## iter 156 — Animated score reveal on result screens + countUp clock-skew hardening (animations)
Quiz/test/recall/placement **result screens** now land with a celebratory flourish: the big score **counts up** from 0
and springs in with a `bigPop` scale animation, turning the highest-emotion moment of a study session into a reward
(perfect runs already fire confetti; a perfect 10+ test now does too). `animateBig()` is called at all five result
points (quiz, mastery-drill all-correct, test, placement, recall); it's a no-op under reduced motion.
- **Hardening (real bug found while verifying)**: the shared `countUp` mixed `performance.now()` (start) with the rAF
  callback timestamp (elapsed). Those share a time origin in real browsers, but when they don't, `k` could go negative
  and render a **negative score** ("-1%"). Added a `Math.max(0, …)` clamp so `k∈[0,1]` always — fixes the artifact and
  hardens the dashboard stat count-up that uses the same helper.
- **animations** was the most-neglected compass area (since iter 140); this revisits it.
- **Verified**: `node gate.js` ALL GREEN; drove a full 16-question quiz to its result → `errs=0`, `big-pop` class applied,
  and under `--force-prefers-reduced-motion` the score shows its exact final value (`13%` for 2/16) with no animation
  (confirming the count-up — not the score — was the only thing affected); post-clamp the score never renders negative;
  all-routes smoke `errs=0`. SW cache **v98 → v99**.

## iter 155 — MCQ arc → Calculus · Applications of Integration 12 → 16 (content — owner's #1 ask)
The Calculus arc's fifth module, *Applications of Integration & Differential Equations*. **+4 new MCQs each** to all
three lessons (**+12, bank 2,008 → 2,020**): area between curves $=\int(\text{top}-\text{bottom})$ / disk volume
$\pi\int f^2$ / shell volume $2\pi\int x f$ / the area between $y=x$ and $y=x^2$ on $[0,1]$ is $\tfrac16$; what makes an
integral improper / improper $=\lim_{b\to\infty}\int_1^b$ / $\int_0^\infty e^{-x}=1$ / the direct comparison test; the
order of a DE (= highest derivative) / the general solution $\frac{dy}{dt}=ky\Rightarrow y=Ce^{kt}$ / verify a solution
by substitution / how to start a separable equation. Answer positions shuffled ([1,3,0,2]/[2,0,3,1]/[3,1,2,0]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (2,020 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (the
  disk "π∫f vs π∫f²", comparison "converges-not-equals", DE-order-vs-degree, and $e^{kt}+C$-fails-substitution traps all
  checked; the $1/6$ area recomputed); render-check on the Area & Volume quiz → `errs=0 | "Question 1 of 16" |
  rawDollars=0 kErr=0`. SW cache **v97 → v98**; README 2,008 → 2,020.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 5/7**. Remaining Calc: multivariable-bridge,
  convex-optimization. Then DL/RL/LLM/PS.

## iter 154 — Hall of Achievements grouped into themed categories (gamification / UI/UX)
With the roster at **43**, the achievements page was one long flat grid. It now renders in **7 themed categories** —
Lessons & Courses, Quizzes & Tests, Consistency & Streaks, Flashcards & Recall, Mastery, Levels & XP, and Exploration &
Practice — each with a gold section header and its own "unlocked / total" count, so a learner can see at a glance which
*dimensions* of progress exist and where they're furthest along.
- **app.js**: `viewAchievements` now maps each id to a category (`ACH_CATEGORIES`) and renders a `section()` per group;
  a safety "More" bucket would catch any future uncategorized achievement (currently empty — all 43 are placed). The
  per-card markup, progress bars, and "near" highlight are unchanged.
- **styles.css**: `.ach-cat` / `.ach-cat-head` (gold heading + right-aligned mono count); the existing responsive
  `.ach-grid` still collapses to one column on mobile.
- **Verified**: `node gate.js` ALL GREEN; in-browser → `errs=0`, **43 cards across 7 categories**, `hasMore=false`
  (every achievement categorized), counts `1/7,1/9,1/6,1/5,0/4,1/4,0/8` (sum 43, unlocked total matches the seed);
  all-routes smoke `errs=0`; desktop + 390px mobile screenshots read. SW cache **v96 → v97**.

## iter 153 — MCQ arc → Calculus · Integration 12 → 16 · ★ BANK CROSSES 2,000 MCQs (content — owner's #1 ask)
The Calculus arc's fourth module, *Integration*. **+4 new MCQs each** to all four lessons (**+16, bank 1,992 → 2,008** —
**past 2,000** for the first time): the antiderivative power rule / what an antiderivative is ($F'=f$) / $\int\cos x\,dx$ /
$\int\frac1x\,dx=\ln|x|+C$; the definite integral as signed area / $\int_a^a=0$ / swapping limits flips the sign /
$\Delta x=\frac{b-a}{n}$; FTC Part 2 ($\int_a^b f=F(b)-F(a)$) / FTC Part 1 ($\frac{d}{dx}\int_a^x f=f(x)$) / $\int_0^1 x^2=\tfrac13$ /
differentiation & integration are inverse operations; $u$-sub reverses the chain rule / the IBP formula $uv-\int v\,du$ /
$\int\frac{2x}{x^2+1}\,dx=\ln(x^2+1)+C$ / when integration by parts is the right tool. Answer positions shuffled ([2,0,3,1]/[1,3,0,2]/[3,1,2,0]/[1,2,3,0]).
- **Verified**: byte-stable JSON round-trip (diff +176 localized insertions); `node gate.js` ALL GREEN (**2,008 MCQs**);
  direct key-dump confirms shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (the
  $\ln|x|$ absolute-value, $\ln(x^2)\neq\ln|x|$, $\int\frac{2x}{x^2+1}=\ln$-not-$2\ln$-not-$\arctan$, and inverse-not-same-operation
  traps all checked); render-check on the FTC quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v95 → v96**; README 1,992 → 2,008.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 4/7** (foundations, derivatives, applications-of-derivatives,
  integration). Remaining Calc: applications-of-integration, multivariable-bridge, convex-optimization. Then DL/RL/LLM/PS.

## iter 152 — Taylor Polynomial approximator viz (visualization)
The **36th** widget (`calc-taylor`), embedded in *Linear Approximation, Differentials & L'Hôpital's Rule* (which had no
viz) right after the linearization section — because it **generalizes that lesson**: it overlays a function (sin x, cos x,
or eˣ) with its degree-n Taylor polynomial about 0, and **degree 1 is exactly the tangent-line linearization** the lesson
just taught. A degree slider (0–12, or a **▶ Build up** animation ramping it) shows each added term widening the interval
where the gold polynomial hugs the sage curve — then a finite polynomial always peels away far from the centre. The note
reports the max approximation error over the central window.
- **Numerically pre-verified**: confirmed in Node that the partial sums converge to each function (e.g. sin at x=1: P₁=1.0
  → P₃=0.833 → P₁₁=0.84147; err₁₁≈1.6e-10) and that P₁(x)=x for sin (the linearization), before writing the canvas.
- **Verified**: `node gate.js` ALL GREEN (now **36 widgets**, the `data-viz` id resolves); Lab route → `errs=0`, note
  reads "sin x · Taylor degree 5 · max error … 1.082" (matches: P₅ sin peels off by x≈3.5), **rawDollars=0** (plain-unicode
  note); fixed a self-introduced shadowing bug (named the Taylor fn `P`, colliding with VIZUtil's palette `P()` — renamed
  to `poly`) before first render; lesson embed + all-routes smoke `errs=0`; desktop + 390px mobile screenshots read.
  SW cache **v94 → v95**; README 35 → 36.

## iter 151 — MCQ arc → Calculus · Applications of the Derivative 12 → 16 (content — owner's #1 ask)
The Calculus arc's third module, *Applications of the Derivative*. **+4 new MCQs each** to all four lessons
(**+16, bank 1,976 → 1,992**): when to use implicit differentiation / related-rates differentiate w.r.t. $t$ /
$\frac{dy}{dx}$ of $xy=12$ is $-y/x$ / $\frac{dy}{dx}$ is the implicit-curve tangent slope; the First Derivative Test
(neg→pos ⟹ local min) / inflection = concavity change / $f'>0 \Rightarrow$ increasing / the Extreme Value Theorem;
the closed-interval method (critical points **and** endpoints) / convex ⟹ local min is global / Fermat ($f'=0$ at an
interior extremum) / the learning rate $\eta$ is the step size; and L'Hôpital's precondition ($\tfrac00$ or $\tfrac\infty\infty$) /
it uses $f'/g'$ not the quotient rule / $\lim_{x\to0}\frac{e^x-1}{x}=1$ / the linearization is the tangent line.
Answer positions shuffled ([2,0,3,1]/[1,3,0,2]/[3,1,2,0]/[1,2,3,0]).
- **Verified**: byte-stable JSON round-trip (diff +176 localized insertions); `node gate.js` ALL GREEN (1,992 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (the
  $xy=12\Rightarrow-y/x$ sign vs the "$12/x^2$" trap, FDT neg→pos = min, L'Hôpital f'/g'-not-quotient-rule, and
  linearization-not-2nd-order-Taylor all checked); render-check on the Optimization quiz → `errs=0 | "Question 1 of 16" |
  rawDollars=0 kErr=0`. SW cache **v93 → v94**; README 1,976 → 1,992.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 3/7** (foundations, derivatives, applications-of-derivatives).
  Remaining Calc: integration, applications-of-integration, multivariable-bridge, convex-optimization. Then DL/RL/LLM/PS.

## iter 150 — Scroll-spy for the lesson TOC (UI/UX) + ★150 reflection
The iter-144 "On this page" TOC now **highlights the section you're currently reading** as you scroll — completing the
feature. An `IntersectionObserver` over the section headings recomputes, on each crossing, the last heading whose top is
at/above a trigger line and marks the matching TOC entry `.active` (gold text + a left gold accent bar). The observer is
disconnected and rebuilt per lesson render (no leak); on lessons with <3 sections nothing is added.
- **Verified**: `node gate.js` ALL GREEN; on-load wiring confirmed → `errs=0`, the observer is created and `setActive()`
  marks section 1 active (screenshot read: gold left-accent highlight on the first TOC item); all-routes smoke `errs=0`.
  NOTE: the *dynamic* highlight-on-scroll can't be exercised in this headless mode — programmatic scrolling is a no-op
  there (the page uses a `body{overflow-y:auto}` scroll box that `--dump-dom` doesn't drive), so I verified by (a) the
  on-load active state, (b) the standard IO + `getBoundingClientRect` mechanism, and (c) **graceful degradation**: it is
  purely additive — if scroll events never fired, the highlight just stays on section 1 with zero regression to the TOC's
  jump behavior and no error. SW cache **v92 → v93**.
- **★150 reflection**: the loop is healthy and ambitious. The owner's #1 ask (the 12→16 MCQ arc) is driving steadily —
  Algorithms ✓, Linear Algebra ✓, Calculus 2/7, bank 1,776 → 1,976 (+200) — interleaved with non-content moves across
  the whole compass: viz ×3 (optimizer race, Riemann sum, cross-entropy), gamification ×2 (nudge, +6 achievements),
  workflow (command palette), new-functionality (notebook→TOC), animation (goal ring), a11y, understandability
  (deeper-dives), a mobile audit (clean), and dev-flow (gate hardening). No compass area is starved; no failure mode has
  tripped. Next ~50: finish the MCQ arc (Calc/DL/RL/LLM/PS), keep one bold viz/feature per ~handful of content iters.

## iter 149 — MCQ arc → Calculus · The Derivative 12 → 16 (content — owner's #1 ask)
The Calculus arc's second module, *The Derivative: Definition & Rules*. **+4 new MCQs each** to all four lessons
(**+16, bank 1,960 → 1,976**), stating the bedrock the existing 12 assumed: derivative notation ($f'$, $\frac{dy}{dx}$) /
the derivative of a line is its slope $m$ / what $f''$ means (concavity, acceleration) / average-vs-instantaneous rate;
the power rule $\frac{d}{dx}x^n=nx^{n-1}$ / $\frac{d}{dx}x=1$ / the product rule $(fg)'=f'g+fg'$ / a multi-rule polynomial
compute; the chain rule $f'(g(x))g'(x)$ / $\frac{d}{dx}(2x+1)^5=10(2x+1)^4$ / rates-multiply intuition / $\frac{d}{dx}\sin 5x=5\cos 5x$;
and $\frac{d}{dx}e^x=e^x$ / $\sin\!\to\!\cos,\ \cos\!\to\!-\sin$ / $\frac{d}{dx}\ln x=\frac1x$ / $\frac{d}{dx}\tan x=\sec^2 x$.
Answer positions shuffled ([3,2,0,1]/[1,3,0,2]/[2,0,3,1]/[1,3,2,0]).
- **Verified**: byte-stable JSON round-trip (diff +176 localized insertions); `node gate.js` ALL GREEN (1,976 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** (every
  derivative recomputed; the $\tan x$ distractor "$1/\cos x$"=$\sec x\neq\sec^2 x$ and the dropped-inner-derivative
  chain-rule distractors all confirmed wrong); render-check on the Chain-Rule quiz → `errs=0 | "Question 1 of 16" |
  rawDollars=0 kErr=0`. SW cache **v91 → v92**; README 1,960 → 1,976.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 2/7** (foundations, derivatives). Remaining Calc:
  applications-of-derivatives, integration, applications-of-integration, multivariable-bridge, convex-optimization. Then DL/RL/LLM/PS.

## iter 148 — Riemann Sum visualizer (visualization) — the first integration viz
The **35th** widget (`calc-riemann`), embedded in *Riemann Sums & the Definite Integral* (which had no viz) — and the
**first integration visualization** on the site (the 34 others covered LA/derivatives/optimization/probability/DL/LLM/RL,
never the integral). Approximates the area under a curve with rectangles: pick the **function** (x², √x, 1+sin x — each
with a known exact integral), the **rule** (left / right / midpoint), and the **number of rectangles** n (slider, or a
**▶ Refine** animation that ramps n from 1→50). It draws the rectangles under the live curve and reports `approx area`,
the `exact ∫`, and the signed `error` — so the learner watches left under-shoot, right over-shoot, midpoint nail it, and
all three converge as n grows. Embedded right where the lesson takes the n→∞ limit.
- **Numerically pre-verified**: confirmed in Node that all three functions' left/right/midpoint sums converge to their
  exact integrals (e.g. x² midpoint: err 1.4e-1 → 5.5e-4 as n 4→64) before writing the canvas.
- **Verified**: `node gate.js` ALL GREEN (now **35 widgets**, the `data-viz` id resolves); Lab route → `errs=0`, note
  reads "20 rectangles · midpoint · approx 8.9944 · exact 9.0000 · error −0.0056" (matches the math) with **rawDollars=0**
  (note is plain-unicode per the viz-note rule — no `$…$`); lesson embed + all-routes smoke `errs=0`; desktop + 390px
  mobile screenshots read (gold rectangles under a sage curve, controls usable). SW cache **v90 → v91**; README 34 → 35.

## iter 147 — MCQ arc → Calculus · Foundations 12 → 16 (content — owner's #1 ask; 3rd topic opens)
The arc opens its **third topic, Calculus**, starting with the *Foundations: Functions, Limits & Continuity* module.
**+4 new MCQs each** to all four lessons (**+16, bank 1,944 → 1,960**), stating the bedrock facts the existing 12 assumed:
what makes a relation a function / domain-vs-range / composition order / the $mx+b$ slope-intercept reading; the
two-sided-limit ⟺ equal one-sided-limits criterion / the base limits $\lim c=c,\ \lim x=a$ / polynomial limits by
substitution / the sum law; substitute-first strategy / $\lim_{x\to\infty}1/x=0$ / degree comparison for rational limits
at infinity / a $+\infty$ limit "does not exist" (finitely); the draw-without-lifting intuition / polynomials are
continuous everywhere / jump vs removable vs infinite discontinuities / continuity ⟹ $\lim_{x\to a}f=f(a)$. Positions
shuffled ([1,3,0,2]/[2,0,3,1]/[3,1,0,2]/[1,2,3,0]).
- **Verified**: byte-stable JSON round-trip (diff +176 localized insertions); `node gate.js` ALL GREEN (1,960 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS** — and
  on its one subtle flag (continuity Q4's "average of one-sided limits" distractor numerically *equals* $f(a)$ when
  continuous) I **hardened** that distractor to the unambiguously-wrong "the derivative $f'(a)$" and re-gated GREEN;
  render-check on the Continuity quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v89 → v90**; README 1,944 → 1,960.
- **Arc progress**: Algorithms ✓, Linear Algebra ✓; **Calculus now 1/7** (foundations). Remaining Calc: derivatives,
  applications-of-derivatives, integration, applications-of-integration, multivariable-bridge, convex-optimization. Then DL/RL/LLM/PS.

## iter 146 — Mobile audit (clean) + 3 new achievements (gamification — owner-loved)
Two parts. **(1) Mobile audit** (flagged thin area, last done iter 113): screenshotted **7 high-risk views at true 390px**
— Progress/stats, Knowledge Map, Test, Lab, Achievements, Glossary, and a lesson (with the new TOC) — and read each.
**All render cleanly**; no breakage found (the lone "404" was a harness typo'd lesson id, not a site bug). Mobile is healthy.
**(2) New achievements** (the owner explicitly loves "more achievements"; last expanded iter 109): **+3 → 43 total**,
filling real gaps rather than padding —
- **🌅 Daily Ritual** — finish a Daily Mix session (the core "open the app, study 15 min" loop was previously uncelebrated).
- **📆 Creature of Habit** — study on 14 different days (rewards long-run consistency, distinct from the consecutive-day streak).
- **🧙 Sage** — earn 25,000 total XP (extends the XP arc well past Erudite's 5k for a dedicated learner).
- Triggers wired with existing infra (no new `state` fields): `addXP` unlocks `sage`/`habit`; the Daily-Mix finish screen
  unlocks `daily-ritual` when real work was done. `achProgressMap` gained `habit`/`sage` so their bars + the dashboard
  "closest achievement" nudge work.
- **Verified**: `node gate.js` ALL GREEN; Node trigger sim — `sage` fires at ≥25k XP, `habit` at ≥14 activity days,
  `daily-ritual` via `unlock()`, `ACHIEVEMENTS.length === 43`; in-browser Achievements page → `errs=0`, **43 cards**,
  eyebrow "4 of 43 unlocked", all three new render as unlocked; all-routes smoke `errs=0`. SW cache **v88 → v89**; README 40 → 43.

## iter 145 — MCQ arc → Linear Algebra · Matrix Calculus 12 → 16 · ★ LINEAR ALGEBRA COMPLETE (content — owner's #1 ask)
The final LA module. **+4 new MCQs each** to *Gradients, Jacobians & Layout*, *Differentiating Vector & Matrix
Expressions*, and *Matrix Calculus Behind Backprop* (**+12, bank 1,932 → 1,944**) — and with this **all 19 Linear
Algebra lessons are now at 16 MCQs**, making LA the **second topic fully migrated** to 16 (after Algorithms).
New foundational angles: descent steps along $-\nabla f$ / $\nabla f=\mathbf 0$ at a minimum / the Jacobian of $A\mathbf x$
is $A$ / $\nabla f\cdot\mathbf u$ is the directional derivative; gradient linearity / $\nabla\|\mathbf x\|=\mathbf x/\|\mathbf x\|$
vs $\nabla\|\mathbf x\|^2=2\mathbf x$ / a quadratic's gradient is affine ⟹ linear normal equations; backprop = the chain
rule / forward-computes-loss-vs-backward-computes-gradients / the $W\leftarrow W-\eta\,\partial L/\partial W$ update /
backprop is seeded from the scalar loss ($\partial L/\partial L=1$). Answer positions shuffled ([3,1,0,2]/[2,0,3,1]/[1,3,2,0]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (1,944 MCQs) and a
  programmatic check confirms **every LA lesson = 16** (the gate's position-bias note ticked 19 → 17 as the shuffled
  batches keep de-skewing); direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent
  returned **ALL PASS** (the squared-vs-non-squared norm pair confirmed genuinely distinct; Jacobian-of-$Ax$-is-$A$-not-$A^\top$;
  quadratic-gradient-is-affine; the "length of gradient" distractor correctly not a second answer); render-check on the
  Backprop quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v87 → v88**; README 1,932 → 1,944.
- **Arc progress**: Algorithms ✓ (7/7), **Linear Algebra ✓ (7/7)**. NEXT topics: Calculus, Deep Learning, RL, LLMs, Prob & Stats.

## iter 144 — Auto "On this page" table of contents for every lesson (new functionality / UX)
Lessons are dense — **every one of the 148 has 4–11 `<h3>` sections** (avg 7.5) — but there was no way to see a lesson's
structure or jump within it. Now the Lecture view auto-builds a collapsible **"On this page"** TOC from the section
headings: a numbered, 2-column list (1-column on mobile) where each entry smooth-scrolls to its section.
- **app.js**: `buildLessonTOC(body)` runs after the prose mounts — collects `.prose h3` (skipping any inside a
  `<details>` deep-dive), stamps each with an `id` + `.toc-anchor`, and inserts a `<details class="lesson-toc" open>`
  above the body. Clicks call `scrollIntoView` (smooth, or instant under reduced motion). Shows only when ≥3 sections.
  Uses no `href` anchors, so it never touches the hash router.
- **styles.css**: `.lesson-toc` card + numbered `.toc-link`s (CSS counters), `columns:2` collapsing to 1 at ≤640px,
  `scroll-margin-top` on anchors, gold hover, focus-visible ring.
- **Verified**: `node gate.js` ALL GREEN; render-check on the (8-section) Loss Functions lesson →
  `errs=0 | summary "📑 On this page · 8 sections" | 8 links | 8 anchored h3s with ids | clicking a link errors=0 and its
  target exists`; all-routes smoke `errs=0`; desktop (2-col) + 390px mobile (1-col) screenshots read. SW cache **v86 → v87**.
- New functionality had been neglected since iter 113 (Notebook); this revisits it.

## iter 143 — MCQ arc → Linear Algebra · SVD & Applications 12 → 16 (content — owner's #1 ask)
The 12→16 arc continues through LA's **SVD and Applications to Machine Learning** module. **+4 new MCQs each** to *The
Singular Value Decomposition* and *Low-Rank Approximation, PCA & Dimensionality Reduction* (**+8, bank 1,924 → 1,932**),
stating plainly the facts the existing 12 leaned on: **every** real matrix has an SVD, $\sigma_1=\|A\|_2$ (the spectral
norm / max stretch), the columns of $V$ are eigenvectors of $A^\top A$, and each $\sigma_i u_i v_i^\top$ term is rank 1;
PCA requires centering the data, principal components are orthogonal directions ordered by variance, reduction means
projecting onto the top-$k$ PCs, and $A^{+}=A^{-1}$ for an invertible square $A$. Answer positions shuffled ([2,1,3,0]/[1,3,0,2]).
- **Verified**: byte-stable JSON round-trip (diff +88 localized insertions); `node gate.js` ALL GREEN (1,932 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS**
  (each answer recomputed from scratch, with the precision points checked — σ₁=spectral not Frobenius, SVD exists for
  *every* real matrix, $V$↔$A^\top A$ not $AA^\top$, $A^{+}=A^{-1}$ only under the invertible-square restriction);
  render-check on the SVD quiz → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v85 → v86**; README 1,924 → 1,932.
- **Arc progress**: Algorithms ✓ (7/7). Linear Algebra now **6/7** — only matrix-calculus(3) remains; then Calc/DL/RL/LLM/PS.

## iter 142 — ⌘K becomes a true command palette: quick actions + runnable commands (workflow)
The command palette could only *navigate* (and on an empty query it dumped the raw search index — topics, then 148
lessons). Now it's a real command palette:
- **Curated empty state** — opening ⌘K with no query leads with **Resume: <your last lesson>** (continue where you left
  off), then Start Daily Mix, Daily Review (· N due), and Spawn a Test, instead of a wall of topic/lesson entries.
- **Runnable commands** — three state-changing verbs are now searchable and executable from the palette: *Toggle theme
  (Ink / Parchment)*, *Cycle reading text size*, *Restart the welcome tour*. Selecting one runs an `action()` (and toasts),
  no navigation needed. Refactored the theme toggle into a reusable `toggleTheme()` and added `cycleTextScale()`.
- `searchIndex()` now concats the commands so typing e.g. "theme" surfaces the toggle as the top hit; `go()` runs
  `r.action` when present, else navigates. Footer/placeholder updated to advertise commands.
- **Verified**: `node gate.js` ALL GREEN; driven smoke (seeded a `lastLesson`) → `errs=0`, empty-query defaults =
  [Resume…, Start Daily Mix, Daily Review · 889 due, Spawn a Test, Toggle theme, Cycle reading text size, Restart tour];
  searching "theme" ranks the command first; clicking it flips `data-theme` **ink → parchment** and closes the palette;
  all-routes smoke `errs=0`; desktop + 390px mobile screenshots read. SW cache **v84 → v85**.
- Workflow had been neglected since iter 126; this revisits it.

## iter 141 — MCQ arc → Linear Algebra · Orthogonality 12 → 16 (content — owner's #1 ask)
The 12→16 arc continues through LA's **Orthogonality, Projection, and Least Squares** module. **+4 new MCQs each** to
*Orthonormal Bases & Gram–Schmidt* and *Projections & Least Squares* (**+8, bank 1,916 → 1,924**), stating plainly the
facts the existing 12 leaned on: an orthogonal matrix's inverse is its transpose ($Q^{-1}=Q^\top$), what Gram–Schmidt
takes in and produces, normalizing $v\mapsto v/\|v\|$, and $\det Q=\pm 1$; the projection-onto-a-line formula
$\tfrac{a^\top b}{a^\top a}a$, that least squares minimizes $\|Ax-b\|^2$, the projection-as-closest-point geometric
definition, and the mirror case $b\perp S \Rightarrow$ projection $= \mathbf 0$. Answer positions shuffled ([1,2,3,0]/[2,0,3,1]).
- **Verified**: byte-stable JSON round-trip (diff +88 localized insertions); `node gate.js` ALL GREEN (1,924 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS**
  (each answer recomputed from scratch — incl. the edge checks that "$\det Q=\pm1$" beats the "$1$" trap and that the
  line-projection denominator is $a^\top a$; single-correct, KaTeX-safe); render-check on the Projections quiz
  → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v83 → v84**; README bank count 1,916 → 1,924.
- **Arc progress**: Algorithms ✓ (7/7). Linear Algebra now **5/7** (foundations, matrices, structure, eigen, orthogonality).
  Remaining LA: svd-applications(2), matrix-calculus(3); then Calc/DL/RL/LLM/PS.

## iter 140 — Animated daily-goal ring sweep on the dashboard (animations) — ★140 checkpoint
The dashboard's stat numbers already count up on landing, but the daily-goal ring next to them rendered statically (a
plain `--p` in its conic-gradient, with no `@property` registration so it couldn't interpolate). Now it **sweeps from
0 to today's goal %** in sage green, in step with the count-up, so the whole "today" strip comes alive together.
- **styles.css**: registered `@property --p` (`<number>`, initial 0) and added a `transition: --p .9s` to `.goal-ring`,
  so the conic angle is now animatable (mirrors the existing `@property --ring` level-ring pattern).
- **app.js**: render the ring at `--p:0`, then `sweepGoalRing(goalPct)` flips it to the target across two `rAF`s so the
  transition fires. Reduced-motion sets the value instantly (and the global `prefers-reduced-motion` rule zeroes the
  transition anyway).
- **Verified**: `node gate.js` ALL GREEN; render-check seeded a 70% goal → `errs=0`, ring caught mid-sweep at `--p≈18`
  (interpolating, not snapping), and with `--force-prefers-reduced-motion` it lands exactly on `--p=70` (target correct);
  all-routes smoke `errs=0`; desktop + 390px mobile screenshots read (clean sage sweep, on-aesthetic). SW cache **v82 → v83**.
- **★140 reflection**: last 10 iters = MCQ arc ×5 interleaved with viz ×2, a11y, gamification, understandability; the LA
  12→16 arc is healthy (4/7 modules). Animations had been neglected since iter 122 — this revisits it. Still-thin areas
  to rotate through next: workflow (since 126), new functionality (since 113), UI/UX, mobile audit.

## iter 139 — MCQ arc → Linear Algebra · Eigen 12 → 16 (content — owner's #1 ask)
The 12→16 arc continues through LA's **Eigenvalues, Eigenvectors, and Diagonalization** module. **+4 new MCQs each** to
*Eigenvalues & Eigenvectors*, *Diagonalization & Matrix Powers*, and *Symmetric Matrices & the Spectral Theorem*
(**+12, bank 1,904 → 1,916**), stating plainly the spectral facts the existing 12 (compute/proof questions) leaned on:
det = product / trace = sum of eigenvalues, triangular ⟹ eigenvalues are the diagonal, the $A^{-1}\!\to 1/\lambda$ and
$A^2 v = \lambda^2 v$ rules; diagonalizable ⟺ $n$ independent eigenvectors, what $P$/$D$ hold, similar matrices share
eigenvalues, eigenvectors of a diagonal matrix are $e_i$; symmetric ⟹ orthogonal eigenvectors, positive-definite ⟺ all
$\lambda>0$, the Rayleigh max $\max_{\|x\|=1} x^\top A x = \lambda_{\max}$, and the spectral shift $A+cI \to \lambda+c$.
Answer positions shuffled ([2,0,3,1]/[1,3,0,2]/[3,1,0,2]).
- **Verified**: byte-stable JSON round-trip (diff +132 localized insertions); `node gate.js` ALL GREEN (1,916 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS**
  (each answer recomputed from scratch; the iff/necessary-vs-sufficient distractors and the shared-value-with-false-rider
  distractor all correctly wrong; single-correct, KaTeX-safe); render-check on the Diagonalization quiz
  → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v81 → v82**; README bank count 1,904 → 1,916.
- **Arc progress**: Algorithms ✓ (7/7). Linear Algebra now **4/7** (foundations, matrices, structure, eigen). Remaining
  LA: orthogonality(2), svd-applications(2), matrix-calculus(3); then Calc/DL/RL/LLM/PS.

## iter 138 — Deeper dive: cross-entropy = entropy + KL divergence (understandability — directive 3)
A new "Deeper dive" expandable on *Loss Functions: MSE, Cross-Entropy, and the Softmax Link*. The lesson already
derives cross-entropy as a negative log-likelihood but **never mentions KL divergence** — so the information-theory
reading was missing. The dive adds it: treating the target as a distribution $p$ and the model as $q$, it decomposes
$H(p,q) = H(p) + D_{\mathrm{KL}}(p\,\|\,q)$, shows the entropy term is constant in $\theta$, and lands the punchline —
**minimizing cross-entropy is exactly minimizing the KL divergence to the truth** (distribution-matching). It explains
why one-hot labels collapse this to the familiar $-\ln(p_{\text{true}})$ (since $H(p)=0$), what the irreducible floor
means for soft labels / distillation, and why the same KL move reappears in VAEs, PPO, and knowledge distillation —
plus the asymmetry caveat. Directly serves directive 3 (hard-concept support) and the owner's "keep improving the depth".
- **Verified**: the identity $H(p,q)=H(p)+D_{\mathrm{KL}}(p\|q)$ checked numerically (random $p,q$ + the one-hot case);
  byte-stable JSON round-trip (+3,041 chars, localized); `node gate.js` ALL GREEN; render-check on the lesson with the
  dive expanded → `errs=0`, **24 KaTeX nodes rendered inside it, kErr=0, 0 raw `$`**; confirmed overflow-neutral vs the
  closed state (identical offender set — the new display math adds 0px overflow). SW cache **v80 → v81**.

## iter 137 — MCQ arc → Linear Algebra · Structure 12 → 16 (content — owner's #1 ask)
The 12→16 arc continues through LA's **Rank, Subspaces, and Determinants** module. **+4 new MCQs each** to *Rank, Null
Space & the Four Fundamental Subspaces* and *Determinants* (**+8, bank 1,896 → 1,904**), stating plainly the load-bearing
facts the existing 12 (applied/compute questions) assumed: the **rank–nullity theorem** ($\operatorname{rank}+\dim N = n$
columns), rank = number of pivots (with nullity as the trap), which dimension each subspace lives in
($C(A)\subseteq\mathbb{R}^m$, $N(A)\subseteq\mathbb{R}^n$), and full-column-rank ⟹ trivial null space; plus determinant
multiplicativity ($\det(AB)=\det A\,\det B$), invertible ⟺ $\det\neq 0$, two identical rows ⟹ $\det=0$, and single-row
scaling vs. whole-matrix scaling ($5$ vs $5^n$). Answer positions shuffled ([1,3,0,2]/[2,0,3,1]).
- **Verified**: byte-stable JSON round-trip (diff +88 localized insertions); `node gate.js` ALL GREEN (1,904 MCQs);
  direct key-dump confirms the shuffled indices; an independent adversarial fact-check agent returned **ALL PASS**
  (each answer recomputed from scratch, single-correct, KaTeX-safe, no ambiguity); render-check on the Determinants quiz
  → `errs=0 | "Question 1 of 16" | rawDollars=0 kErr=0`. SW cache **v79 → v80**; README bank count 1,896 → 1,904.
- **Arc progress**: Algorithms ✓ (7/7). Linear Algebra now **3/7** (foundations, matrices, structure). Remaining LA:
  eigen(3), orthogonality(2), svd-applications(2), matrix-calculus(3); then Calc/DL/RL/LLM/PS.

## iter 136 — Optimizer Race viz: SGD vs Momentum vs RMSProp vs Adam (visualization)
The **34th** interactive widget (`dl-optimizers`), embedded in *Optimizers: SGD, Momentum, RMSProp, and Adam* — which
until now only embedded the weak 1-D `calc-gradient-descent` ball. Drops all four optimizers from the **same** start on
an **ill-conditioned** loss valley ($f=0.06x^2+1.8y^2$, condition number 30 — steep across, shallow along) and animates
their paths simultaneously, each a distinct colour, with a live legend (step count, ✓ converged, ✗ diverged) and a global
*learning-rate ×* slider. The lesson is in the picture: plain **SGD** (rust) zig-zags across the steep walls while it
crawls along the floor; **Momentum** (gold) builds velocity along the consistent direction and cancels the oscillation;
**RMSProp** (violet) and **Adam** (sage) rescale each coordinate by its own gradient history and step almost straight to
the minimum. All four optimizer updates are the textbook formulas (incl. Adam's bias-corrected $\hat m,\hat v$).
- **Numerically pre-tuned**: simulated all four in Node before writing any canvas code — per-optimizer learning rates
  chosen so the race is correct *and* legible (SGD lr=0.50 gives a persistent visible decaying zig-zag −2.08, 1.66,
  −1.33, …; all paths stay in-viewport at every multiplier 0.4–1.6; diverging runs are caught and flagged, not drawn off-canvas).
- **Verified**: `node gate.js` ALL GREEN (now **34 widgets**, `data-viz` id resolves); Lab route + lesson embed render
  with **errs=0**; all-routes smoke errs=0; desktop (race to convergence — Momentum first at 25 steps, SGD still zig-zagging)
  + 390px mobile screenshots read. SW cache **v78 → v79**. README viz count 33 → 34 (+ list updated with beam-search,
  cross-entropy, and the new optimizer race).

## iter 135 — MCQ arc → Linear Algebra · Matrices 12 → 16 (content — owner's #1 ask)
The 12→16 growth arc advances to LA's **Matrices** module. **+4 new MCQs each** to *Matrices as Linear Transformations*,
*Matrix Multiplication*, and *Inverses & Systems* (**+12, bank 1,884 → 1,896**), all foundational angles the existing
12 (mostly compute-and-trap) left unstated: the identity / reflection-across-x-axis matrices, the must-hold property
$T(\mathbf{0})=\mathbf{0}$, the shear $\begin{bmatrix}1&k\\0&1\end{bmatrix}$; the transpose rule $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$,
the row·column entry definition, when $A^2$ is even defined, matrix zero-divisors ($AB=0\not\Rightarrow A=0$ or $B=0$);
a concrete shear inverse, $(AB)^{-1}=B^{-1}A^{-1}$, the 0/1/∞ solution trichotomy, and why a homogeneous system is
always consistent. Correct-answer positions shuffled across the batch ([1,2,0,3]/[2,3,1,0]/[3,0,2,1]).
- **Verified**: byte-stable JSON round-trip (diff is +132 localized insertions only); `node gate.js` ALL GREEN (1,896 MCQs);
  direct key-dump confirms the shuffled answer indices; an independent adversarial fact-check agent returned **ALL PASS**
  (each answer recomputed from scratch, single-correct, KaTeX-safe, no duplication); render-check on the Matrices lesson
  quiz → `errs=0 | QPROG="Question 1 of 16" | rawDollars=0 kErr=0` + screenshot read (matrices typeset). SW cache **v77 → v78**.
- **Arc progress**: Algorithms ✓ (7/7 modules). Linear Algebra now **2/7** (foundations, matrices). Remaining LA:
  structure(2), eigen(3), orthogonality(2), svd-applications(2), matrix-calculus(3); then Calc/DL/RL/LLM/PS.

## iter 134 — Dashboard "closest achievement" nudge (gamification)
A gentle motivation hook on the dashboard: a gold-accented card that surfaces the **single locked achievement you're
nearest to unlocking** — its icon, name, `cur / target`, a one-line description, and a thin progress bar — linking
straight to `#/achievements`. Picks the highest-fraction *started-but-incomplete* achievement (e.g. flashcards 22/25 →
"Card Sharp" at 88%), so it only appears once you've made real progress toward something and never nags a brand-new user
or shows an already-met badge. Turns the 40-achievement collection from a page you visit into a goal that pulls you back.
- **app.js**: extracted `achProgressMap()` (the per-achievement `[current, target]` table, previously inline in
  `viewAchievements`) and added `nearestAchievement()`; `viewDashboard` renders `nearHtml` before the bookmarks block.
- **styles.css**: `.ach-nudge` + parts — clickable card, gold border that brightens + lifts on hover, mono `cur / target`,
  ellipsised description, gold progress fill; 480px breakpoint wraps the description and shrinks the icon.
- **Verified**: `node gate.js` ALL GREEN; seeded near-complete-but-locked state → DOM dump confirms
  `errs=0 | NUDGE name="Almost there — Card Sharp" num="22 / 25" href=#/achievements fill=88%`; all-routes smoke `errs=0`;
  desktop + 390px mobile screenshots read (nudge legible and on-aesthetic at both). SW cache bumped **atlas-v76 → v77**.

## iter 133 — MCQ arc → topic 2: Linear Algebra · Foundations 12 → 16 (content — owner's #1 ask)
The 12→16 arc moves to its second topic. **+4 new MCQs each** to Vectors & Operations, Dot Product & Norms, Span &
Independence, and Basis & Dimension (**+16, bank 1,868 → 1,884**) — foundational angles the existing 12 (mostly compute-
and-trap questions) didn't state plainly: what a vector <em>is</em> / the zero vector as additive identity / negative-
scalar geometry / component-wise operations; dot product = sum of componentwise products / norm = $\sqrt{\mathbf v\cdot
\mathbf v}$ / $\mathbf u\cdot\mathbf v=\lVert\mathbf u\rVert\lVert\mathbf v\rVert\cos\theta$ / positive dot ⇒ angle <90°;
linear combination / definition of dependence / max independent in $\mathbb R^n$ is $n$ / what "spans $\mathbb R^n$"
means; basis = independent + spanning / dimension = size of a basis / the standard basis of $\mathbb R^3$ / why no basis
exceeds $n$ vectors. Pipeline: authored avoiding existing stems → **adversarial-verify agent → ALL 16 PASS** (with a
duplicate check vs the existing 12 — only one acceptable reinforcement overlap, no fix needed; reported keys matched the
shuffle) → positions shuffled (1302 / 2031 / 3120 / 0213). The gate's position-bias note dropped 21 → 19 (the shuffled
batch de-biased span & basis). SW cache → `atlas-v76`; README 1,868 → 1,884. Verified: `node gate.js` ALL GREEN; quiz
renders **"of 16"**, `.katex-error`=0, errs=0. **Arc: Algorithms ✓ · Linear Algebra 1/7 modules.**

## iter 132 — Keyboard-shortcuts help overlay (press ?) (understandability / accessibility)
The app has lots of keyboard shortcuts (1–4 to answer, Space to flip cards, ⌘K to search, arrow keys to roam the map)
but no in-app reference — so they were undiscoverable. Added a **shortcuts overlay**: press **`?`** anywhere (or click the
new sidebar **⌨ Shortcuts** button) for a grouped, styled cheat-sheet — Global · Quizzes & Tests · Flashcards · Knowledge
Map. It's a proper modal: opens once (guarded against duplicates), closes on Esc / backdrop / "Got it", and — applying
the iter-114 lesson — **removes its Esc `keydown` listener on close** (no leak). The `?` trigger ignores typing in
inputs and stands down when another modal owns the keys, and `.sc-ov` was added to the study-keys guard so quiz/flashcard
shortcuts don't fire behind it. SW cache → `atlas-v75`; README keyboard bullet updated. Verified: `node gate.js` ALL
GREEN; an in-browser run is **errs=0** — `?` opens it (4 groups · 10 rows · 13 `kbd` chips), Esc and the button both
close it, the sidebar button opens it, and a second `?` doesn't duplicate (one overlay); desktop + 390px screenshots
confirm the grouped cheat-sheet reads cleanly (chips wrap, card scrolls) with no overflow.

## iter 131 — MCQ arc phase 7: Algorithms · Advanced Techniques 12 → 16 — ★ ALGORITHMS NOW FULLY AT 16 (content — owner's #1 ask)
The final Algorithms module. **+4 new MCQs each** to Amortized Analysis, Network Flow, and Union-Find & Range Queries
(**+12, bank 1,856 → 1,868**) — and with it **every one of the 23 Algorithms lessons is now at 16 MCQs**, the first of the
seven topics fully migrated in the 12→16 arc. New foundational angles: amortized's three methods (aggregate/accounting/
potential), the accounting-credit idea, the potential-method formula (actual + ΔΦ), and the multipop amortized argument;
the max-flow integrality theorem, the capacity constraint $0\le f\le c$, the augmenting-path loop, and Edmonds-Karp's
$O(VE^2)$; union-find's find+union, the $O(\alpha(n))$ inverse-Ackermann bound, path compression, and the Fenwick-tree
$O(\log n)$. Pipeline: authored avoiding existing stems → **adversarial-verify agent → ALL 12 PASS** (it also ran a
duplicate check and flagged one soft thematic overlap — a max-flow-min-cut restatement vs an existing question — which I
then **swapped for the integrality theorem** to keep the pool non-redundant, re-injecting and re-confirming) → positions
shuffled (1302 / 2031 / 3120). SW cache → `atlas-v74`; README 1,856 → 1,868. Verified: `node gate.js` ALL GREEN; a Node
check confirms all 23 Algorithms lessons == 16 MCQs; quiz renders **"of 16"**, `.katex-error`=0, errs=0. **Arc status:
Algorithms ✓ (7/7 modules). NEXT: roll the arc through Linear Algebra, Calculus, Deep Learning, RL, LLMs, Prob & Stats.**

## iter 130 — Cross-Entropy Loss & Perplexity visualization — a 33rd widget (visualizations) — ★ 130-iteration checkpoint
No viz existed for the loss function at the heart of every classifier and language model. Added **`dl-cross-entropy`**,
embedded in the DL "Loss Functions: MSE, Cross-Entropy, and the Softmax Link" lesson. Slide the probability the model
assigns to the <em>true</em> class and watch two things move together: the **−ln(p) loss curve** (with a marker + dashed
guides) and a **5-class distribution bar chart** (the true class in sage). The payoff is visceral — at p=0.5 the loss is
0.69 nats, but as the truth's probability falls the loss <strong>explodes</strong> (p=0.05 → 3.00 nats), showing exactly
why a confident-but-wrong prediction is punished so hard; perplexity = 1/p is shown alongside ("how many options the
model is effectively torn between"). Canvas widget, synchronous draw, no loops, plain-unicode note. SW cache →
`atlas-v73`; README 32 → 33 widgets (+Lab blurb). Verified: `node gate.js` ALL GREEN (33 widgets); an in-browser run is
**errs=0** — the Lab renders the canvas + slider, sliding p recomputes loss/perplexity correctly (0.69 → 3.00 nats), and
it hydrates inline in the lesson; desktop + 390px screenshots confirm the layout (a label-overlap caught and fixed
mid-iteration) reads cleanly.
**★ 130-iteration checkpoint (iters 120–129).** A clean rhythm: the owner's #1 ask — the **12→16 MCQ arc** — advanced
across five content iterations (Algorithms now 6/7 modules at 16, bank 1,776 → 1,856), each interleaved with a distinct
compass move: achievement progress bars, flashcard juice, the Beam-Search viz, the Daily-Mix "redeem mistakes" phase, a
hardened gate (which surfaced pre-existing answer-position bias), and now this viz. All four owner directives stay
delivered/served. NEXT: finish Algorithms (advanced-techniques, 3 lessons) → fully at 16, then roll the arc through the
other six topics; keep interleaving. Carry-forward debt: original-content answer-position skew (~21 lessons; needs
careful per-MCQ de-skew because some explanations cite positions — each shuffled batch chips at it).

## iter 129 — MCQ arc phase 6: Algorithms · Complexity, Strings & ML Connections 12 → 16 (content — owner's #1 ask)
Continuing the 12→16 arc (interleaved — iter 128 was dev-flow). This module has **4** lessons → **+16 (bank 1,840 →
1,856)**. **+4 new MCQs each** to NP-Completeness, Approximation & Randomized Algorithms, String Matching & Tries, and
Algorithmic Foundations of ML — deliberately more <em>foundational/conceptual</em> than the existing dense, specific 12,
to broaden coverage: what NP means (verifiable certificate) / NP-complete = in-NP-and-NP-hard / the NP-complete practical
takeaway / SAT as the first NP-complete (Cook–Levin); why we approximate at all / randomized-quicksort's rare
input-independent $O(n^2)$ worst case / what "expected time" really means / approximation-vs-heuristic; naive matching
$O(nm)$ / KMP $O(n{+}m)$ / what a trie is / when to pick KMP; gradient descent on a convex loss → global min /
why ML code vectorizes / why complexity matters at ML scale / SGD = mini-batch gradient. Pipeline: authored avoiding
existing stems → **adversarial-verify agent → ALL 16 PASS** (it also ran a duplicate check vs the existing 12 and found
no true duplicates, only acceptable thematic overlap; reported keys matched the injector's shuffle) → positions shuffled
(1302 / 2031 / 3120 / 0213). The hardened gate (iter 128) now also showed the position-bias note drop 22 → 21 lessons —
each batch of shuffled MCQs de-biases its lessons. SW cache → `atlas-v72`; README 1,840 → 1,856. Verified: `node gate.js`
ALL GREEN; quiz renders **"of 16"**, `.katex-error`=0, errs=0. **Algorithms now has 6 of 7 modules at 16 MCQs; 1 to go
(advanced-techniques) — then Algorithms is fully at 16 and the arc moves to the other six topics.**

## iter 128 — Hardened the content gate with MCQ-quality checks (workflow / dev-flow — "evolve the loop")
Mid-MCQ-arc, the loop's QA tool `gate.js` only checked answer-index range + ≥2 choices. Hardened it to catch real
authoring bugs across all **1,840** MCQs: new **failures** for <strong>duplicate choices within an MCQ</strong> (an
ambiguity bug), <strong>empty choices</strong>, and <strong>empty stems</strong>; plus non-blocking **warnings** for
<strong>duplicate question stems within a lesson</strong> and a summarized **note** on egregious correct-answer-position
bias. Running it was itself the verification — and it surfaced two things: (1) the content is <strong>structurally
clean</strong> — zero duplicate/empty choices, zero out-of-range keys, zero duplicate stems across 1,840 questions; and
(2) a genuine pre-existing quality issue — **22 lessons (>70%, ~66 at >55%) have most correct answers at the same index**
(the original authoring fixed the position; the arc's newer MCQs are shuffled). I deliberately did <em>not</em>
auto-shuffle to fix it: an audit found many explanations cite positions ("option A", "the third option", "choice (a)"),
so a blind reorder would corrupt them — de-skewing needs per-MCQ care and is queued as careful future content work. No
user-facing asset changed (gate.js is dev-only), so no SW-cache bump. Verified: `node gate.js` → ALL GREEN with the new
checks active and the skew note printed.

## iter 127 — MCQ arc phase 5: Algorithms · Graph Algorithms 12 → 16 (content — owner's #1 ask)
Continuing the 12→16 arc (interleaved — iter 126 was workflow). **+4 new MCQs each** to Graph Representations & Traversal,
Shortest Paths & Topological Sort, and MST & Union-Find (**+12, bank 1,828 → 1,840**). New questions cover the
fundamentals the existing 12 hadn't stated directly: BFS uses a queue / DFS uses a stack-or-recursion / adjacency matrix
is $\Theta(V^2)$ space / a directed cycle ⟺ a DFS back edge; binary-heap Dijkstra is $O((V+E)\log V)$ / a topological
order exists iff the graph is a DAG / a reachable negative cycle makes shortest paths $-\infty$ / negative edges (no
negative cycle) ⇒ use Bellman-Ford; Kruskal's strategy (sort + add cheapest non-cycle edge) / Prim's strategy (grow one
tree) / union-find's role (cycle/same-component test) / an MST minimizes the total edge weight of a spanning tree. Same
pipeline: authored avoiding existing stems → **adversarial-verify agent → ALL 12 PASS** (and this time its reported
answer indices matched the injector's shuffle exactly, independently confirming the keys) → positions shuffled (2130 /
1302 / 3021). SW cache → `atlas-v71`; README 1,828 → 1,840. Verified: `node gate.js` ALL GREEN; quiz renders **"of 16"**,
`.katex-error`=0, errs=0. **Algorithms now has 5 of 7 modules at 16 MCQs; 2 to go (complexity/strings/ML, advanced
techniques).**

## iter 126 — Daily Mix now redeems your mistakes too (workflow / new functionality)
The Daily Mix guided session chained due flashcards → a weak-spot quiz → a "learn next" lesson, but ignored the
**mistakes deck** (iter 104) — so the daily ritual never re-drilled the questions you'd actually gotten wrong. Added a
**"🎯 Redeem" phase**: when ≥3 of your missed questions are still outstanding, the session inserts a short mastery-mode
drill of up to 5 of them (re-queued until each is right, clearing them from the deck) between the quiz and the finish
screen. It appears in the step indicator, is skipped when you have fewer than 3 mistakes, and the completion summary now
tallies it ("you cleared N cards, took a quiz and redeemed M mistakes"). Implementation: reused `missedItems()` +
`runMasteryDrill`, and gave `runMasteryDrill` a backward-compatible `opts.onDone`/`continueLabel` so it can chain into
the session (mirrors how `runTest` already does) — when run normally it still shows its "New drill / Done" buttons. SW
cache → `atlas-v70`; README Daily Mix bullet updated. Verified: `node gate.js` ALL GREEN; an in-browser walk through a
seeded session is **errs=0**, the step bar shows **Review · Redeem · Done**, and the run chains from the flashcard phase
into the live mistakes drill (`.mastery-track` reached, +XP); a screenshot confirms the new step in the indicator. This
closes the daily-study loop: due cards (remember) → weak-spot quiz (test) → redeem mistakes (fix) → learn next (grow).

## iter 125 — MCQ arc phase 4: Algorithms · Algorithm Design 12 → 16 (content — owner's #1 ask)
Continuing the 12→16 arc (interleaved — iter 124 was a viz). This module has **4** lessons, so **+16 (bank 1,812 →
1,828)** completes it. **+4 new MCQs each** to Divide & Conquer, Greedy, Dynamic Programming, and Backtracking &
Branch-and-Bound — covering the paradigm fundamentals the existing 12 hadn't pinned down: D&C's three phases / binary
search as one-sided D&C / merge-vs-quicksort work split / parallelism via independent subproblems; greedy's two required
properties / Dijkstra as greedy / greedy-vs-DP trade-off / greedy never reconsiders; DP's two hallmarks / memoization
(top-down) vs tabulation (bottom-up) / the LCS match recurrence $dp[i{-}1][j{-}1]{+}1$ / DP-vs-D&C (overlapping vs
independent subproblems); backtracking's dead-end undo / what branch-and-bound adds (a bounding function) / its CSP fit /
and that pruning helps in practice but the worst case stays exponential. Same pipeline: authored avoiding existing stems
→ **adversarial-verify agent → ALL 16 PASS** → direct key-dump confirmation (the agent again mis-numbered one index;
the dump verified all 16 keys) → positions shuffled (1302 / 2031 / 3120 / 0213). SW cache → `atlas-v69`; README 1,812 →
1,828. Verified: `node gate.js` ALL GREEN; quiz renders **"of 16"**, `.katex-error`=0, errs=0. **Algorithms now has 4 of
7 modules at 16 MCQs; 3 to go (graphs, complexity/strings/ML, advanced techniques).**

## iter 124 — Beam Search decoding tree — a 32nd visualization (visualizations)
The decoding lesson had a temperature/top-p <em>sampling</em> viz but nothing for <strong>beam search</strong> — a core
decoding method it explicitly teaches. Added **`llm-beam-search`**, embedded in "Decoding Strategies and Sampling" at the
end of its Beam Search section, and a visually fresh shape for the Lab (a left-to-right search <em>tree</em>, not a grid
or plot). A small deterministic toy LM gives 3 candidate next-tokens per context; the widget runs beam search for a few
steps and shows, per step column, every candidate with its cumulative log-prob — the **top-k kept** (gold, with edges
from their parent beam) and the rest **pruned** (faded). Controls: **k = 1 / 2 / 3** and a **steps** slider. The caption
contrasts the beam result with greedy (k=1) and, because beam's candidate set always includes greedy's path, shows beam
$\ge$ greedy — usually strictly better, illustrating how greedy's locally-best first token can lead to a worse sentence.
Built per the viz landmines (synchronous draw, no loops, plain-unicode note). SW cache → `atlas-v68`; README 31 → 32
widgets (+Lab blurb). Verified: `node gate.js` ALL GREEN (32 widgets); an in-browser run is **errs=0** — the Lab item
renders the canvas + 3 width buttons + steps slider, switching k updates the readout, and it hydrates inline in the
lesson; desktop + 390px screenshots show the gold kept-beam tree with faded pruned branches and no overflow; stray
Chrome cleaned up.

## iter 123 — MCQ arc phase 3: Algorithms · Sorting & Searching 12 → 16 (content — owner's #1 ask)
Continuing the 12→16 arc (interleaved — iter 122 was animations). **+4 new MCQs each** to Comparison Sorts, Linear-Time
Sorts & Selection, and Binary Search (**+12, bank 1,800 → 1,812**). New angles beyond the existing 12: merge sort's
$\Theta(n)$ aux space (and that it's stable), quicksort's $\Theta(n^2)$ worst case, insertion sort's $\Theta(n)$ best
case, the definition of a stable sort; counting sort beating the comparison bound by <em>indexing not comparing</em>,
quickselect's expected $O(n)$, LSD radix's $O(d(n+k))$, and when counting sort is a poor choice ($k\gg n$); binary
search's $O(\log n)$, its sorted precondition, ~20 comparisons for a million elements, and the halve-by-comparing-the-
middle mechanism. Same verified pipeline: authored avoiding existing stems → **adversarial-verify agent → ALL 12 PASS**
(keys correct, one defensible answer each, accurate explains, valid KaTeX; I also dumped all 12 directly to confirm keys
after the agent's prose mislabeled an index) → correct-choice positions shuffled off A (3120 / 2031 / 1302). SW cache →
`atlas-v67`; README 1,800 → 1,812. Verified: `node gate.js` ALL GREEN; quiz renders **"of 16"**, `.katex-error`=0,
errs=0. **Algorithms now has 3 of 7 modules at 16 MCQs; 4 to go.**

## iter 122 — Flashcard grade juice: the card sails away in its grade colour (animations)
Animations/juice was the most-neglected compass area (since iter 106). The flashcard <em>grade</em> action — the core
spaced-repetition loop, done dozens of times a session — had no feedback: the card just swapped instantly. Now grading
plays a brief **fly-out**: the card sails up-and-away with a scale-down + fade and a **grade-coloured glow** (Again →
rust, Hard → gold, Good/Easy → sage), then the next card rises in via the existing reveal. Implemented on the outer
`.card3d` so it doesn't disturb the inner 3-D flip (the answer face stays showing as it leaves). The advance is gated so
the `animationend` handler and a `setTimeout` fallback can't double-fire (verified it lands on 2/6, not 3/6), buttons
lock during the ~0.4 s fly-out, and <strong>reduced-motion falls back to instant</strong>. Works for both mouse grading
and the 1–4 keyboard shortcuts (they click the same buttons). SW cache → `atlas-v66`. Verified: `node gate.js` ALL GREEN;
an in-browser run is **errs=0** — flip works, grading applies the `card-graded` class, advances 1/6 → 2/6, and awards XP;
a frozen mid-animation screenshot confirms the sage glow + displacement for a "Good" grade.

## iter 121 — MCQ arc phase 2: Algorithms · Core Data Structures 12 → 16 (content — owner's #1 ask)
Continuing the 12→16 question-growth arc (interleaved — iter 120 was gamification). **+4 new MCQs each** to Arrays/Linked
Lists/Stacks/Queues, Hash Tables, and BSTs/Heaps (**+12, site bank 1,788 → 1,800**). New questions hit the fundamentals
the existing 12 hadn't pinned down directly: stack LIFO pop order, $O(1)$ indexed access (contiguous array vs linked
list), FIFO-queue modelling, the $\Theta(n)$ worst case of a single doubling-array append; how hashing gives $O(1)$
lookup, what a collision is, the hash table's weakness at sorted/range queries vs a BST, and why a chained table resizes
to bound $\alpha$; BST in-order = ascending sorted, max-heap max at the root, $O(\log n)$ extract-max, and heap = priority
queue. Same verified pipeline: authored avoiding existing stems → **adversarial-verify agent (verdict: ALL 12 PASS** —
keys correct, one defensible answer each, explains accurate, KaTeX valid) → correct-choice positions shuffled off A
(2130 / 1302 / 3021). SW cache → `atlas-v65`; README 1,788 → 1,800. Verified: `node gate.js` ALL GREEN; quiz renders
**"Question 1 of 16"** with `.katex-error`=0 and errs=0. **Algorithms now has 2 of 7 modules at 16 MCQs; 5 to go.**

## iter 120 — Per-achievement progress bars on the Hall of Achievements (gamification) — ★ 120-iteration checkpoint
The Achievements page showed each badge as a binary locked/unlocked tile — motivating once earned, but silent about
*how close* you are. Added **live progress bars** to every locked, threshold-based achievement: a gold fill + "cur /
target" (e.g. "90 / 100" cards, "22 / 25 Redeemer", "8 / 10 lessons"), computed on the fly from existing state for the
22 countable achievements (streaks, cards, correct answers, lessons, XP, homework, tests, bookmarks, notes, perfect
quizzes, mistakes-redeemed, concepts-mastered). Achievements at **≥80%** get a **"near" highlight** (brighter card + gold
border + gold count) so the next unlock pops out — a concrete "you're almost there" nudge. Pure UI over existing state;
no new save fields. SW cache → `atlas-v64`. Verified: `node gate.js` ALL GREEN; an in-browser run with seeded progress
is **errs=0** — 40 cards render, 20 progress bars on the locked countable ones, 6 "near" highlights, and the values are
correct (8/10 lessons, 90/100 cards, 6/7 streak…); desktop + 390px screenshots confirm the bars read cleanly.
**★ 120-iteration checkpoint (iters 110–119).** Broad, healthy diversification: a11y ×2 (cards + the 148-node map →
whole UI keyboard-operable), examples (LA → 148/148 coverage), 2 new viz (LR schedules, Q-learning gridworld → 31),
Notebook, onboarding refresh, deeper-dives ×4 (→ 9), the Progress "Activity" panel, and — finally — the start of the
owner's #1 ask, the 12→16 MCQ arc. All four owner directives remain delivered/served. NEXT: keep interleaving the MCQ
arc (Algorithms has 6 modules left, then the other six topics) with compass variety; thin areas now are
animations/juice (since 106) and a fresh content/viz idea (MDP policy-iteration, VAE latent space). Perf/mobile remain
confirmed-tight (iter 113).

## iter 119 — More questions: Algorithms-foundations lessons 12 → 16 MCQs (content — owner's #1 ask) — phase 1 of a 12→16 arc
The owner's single most-repeated request is *"more and more and more questions."* Every lesson has sat at exactly 12 MCQs
since iter 100; the mistakes deck (104) addressed "re-think until you pass," but the literal *more questions* ask hadn't
been honored in ~19 iterations — the loop's classic timidity. Started a deliberate **12 → 16 growth arc**, phase 1 = the
**Algorithms · Foundations** module: **+4 new MCQs each** to Asymptotic Analysis, Recurrences & the Master Theorem, and
Correctness/Loop-Invariants (**+12, site bank 1,776 → 1,788**). New questions cover angles the existing 12 didn't: the
big-O sum rule for sequential phases, log-base irrelevance, polynomial-vs-exponential growth, quadratic time-scaling;
Master-Theorem Case 1 ($8T(n/2)+n^2=\Theta(n^3)$), recognizing the $\Theta(n\log n)$ case, recursion-tree depth, and
unequal-split inapplicability; and naming the three invariant-proof parts, the induction base case, a concrete
linear-search invariant, and what "maintenance" proves. **Correctness is non-negotiable for MCQs**, so every item went
through an **adversarial-verify agent** (read the lessons, recompute each key, check for ambiguous/duplicate choices) →
**verdict: ALL 12 PASS**; I also **shuffled the correct choice off position A** (it was authored at index 0) to varied
positions (e.g. 1302 / 2031 / 3120) so there's no "always A" tell. SW cache → `atlas-v63`; README 1,776 → 1,788.
Verified: `node gate.js` ALL GREEN (answer indices in range); the quiz renders **"Question 1 of 16"** with KaTeX
(`.katex-error`=0) and answering works; errs=0. NEXT: continue the arc — the remaining Algorithms modules, then the other
six topics, one module/topic per content iteration (interleave with the rest of the compass).

## iter 118 — "Activity" panel on the Progress page — surface what you've actually done (UI / gamification)
The Progress page showed mastery, accuracy, and a heatmap, but none of the rich engagement state the loop has added
since — so a learner couldn't see, at a glance, how much they've *done*. Added an **Activity** section: a responsive
grid of **12 lifetime-stat tiles** — Questions answered, Correct answers, Perfect quizzes (the Flawless-Five metric),
**Mistakes redeemed** and **Still to redeem**, Flashcards reviewed, Homework solved, Tests taken, Notes written,
Bookmarks, Achievements (got/total), and Day streak. It's pure self-view that turns scattered tracked numbers into a
"look how far I've come" dashboard — a quiet motivation/return hook. Three tiles are **actionable** (Still to redeem →
`#/mistakes`, Notes written → `#/notes`, Achievements → `#/achievements`) with a gold-arrow affordance, keyboard-operable
via the iter-110 `bindGo` upgrade. All values read from existing state (`mcq`, `perfectQuizzes`, `missed`/`missedFixed`,
`cardsReviewed`, `hwRevealed`, `tests`, `notes`, `bookmarks`, `achievements`, `streak`) — no new save fields. SW cache →
`atlas-v62`. Verified: `node gate.js` ALL GREEN; an in-browser run with seeded progress is **errs=0**, all 12 tiles
render with correct values (e.g. 420 answered · 340 correct · 7 perfect · 18 redeemed · 2 to-redeem), 3 link tiles
present, and clicking "Still to redeem" routes to `#/mistakes`; desktop (4×3) and 390px (2-per-row) screenshots confirm
clean layout with no overflow; stray Chrome cleaned up.

## iter 117 — Q-Learning Gridworld — a 31st visualization: an agent that LEARNS (visualizations)
The RL topic had a gridworld viz, but it ran **value iteration** — model-based dynamic programming that computes the
answer offline. There was nothing showing the heart of RL: an agent **learning from its own experience**. Added
**`rl-q-learning`**, embedded in the "SARSA, Q-Learning, and On- vs Off-Policy" lesson. The agent starts knowing
nothing, explores **ε-greedily**, and updates Q-values from each transition with the off-policy TD target
$Q(s,a)\leftarrow Q(s,a)+\alpha[r+\gamma\max_{a'}Q(s',a')-Q(s,a)]$ — no model of the world. Controls: **Play/Pause**
(auto-steps the agent so you can watch it stumble around), **Step**, **⚡ Train 200** (fast-trains, then redraws the
converged policy), **Reset**, and **ε / α / γ** sliders. Cells show the learned state-value max$_a$Q with a heat colour;
gold arrows show the greedy policy; after training they snap into a path from START to the goal that routes around the
wall and the −1 pit. Reuses the existing gridworld drawing conventions; animation runs through a single `VIZUtil.loop`
(Play), so nothing leaks across navigations. SW cache → `atlas-v61`; README 30 → 31 widgets (+Lab blurb). Verified:
`node gate.js` ALL GREEN (31 widgets); an in-browser run is **errs=0** — the Lab item renders a canvas + 3 sliders + 4
buttons, **Train 200 advances episodes 0 → 200**, Step moves the agent, and the widget also hydrates inline in the
lesson; desktop + 390px screenshots show the trained value gradient (0.62 → 1.00 toward the goal) and policy arrows with
no overflow; stray Chrome cleaned up.

## iter 116 — Knowledge-Map keyboard navigation (accessibility) — closes the last mouse-only surface
The radial Knowledge Constellation (148 concept nodes) was the one major interactive surface still **mouse-only** —
iter 110 made the clickable cards keyboard-operable but explicitly deferred the SVG map (148 raw tab stops would be
hostile). Implemented the ARIA-recommended **roving-tabindex composite-widget** pattern instead: you **Tab into the map
once** (only one node is in the tab order at a time), then **arrow keys** move between concepts, **Home/End** jump to
first/last, and **Enter/Space** opens the focused one. Each node now carries `role="link"` + an `aria-label`
("‹concept›, ‹subject›, ‹mastery›[, completed/ready]"), the `<svg>` is `role="application"` with usage instructions,
and focusing a node mirrors the hover behaviour — it lights its prerequisite chain and shows the caption — with a
distinct **gold focus ring** (`.kbfocus`) that stays bright while the rest dim. The focused node also `scrollIntoView`s
so it's visible in the scrollable map. SW cache → `atlas-v60`; README a11y bullet updated. Verified: `node gate.js`
ALL GREEN; an in-browser run is **errs=0** — 148 nodes, first node `tabindex=0` and the rest `-1`, ArrowRight moves
focus and **transfers the roving `tabindex` (node1→0, node0→-1)**, focus adds `.kbfocus` + the dim/lit highlight, and
**Enter opens** the focused node's lesson (navigated to "Dot Product, Norms, and Angles"); a screenshot confirms the
gold focus ring + lit dependency chain over the dimmed map; stray Chrome cleaned up.

## iter 115 — Three more "Deeper dive" intuitions on hard concepts (understandability — owner directive 3)
Continued directive 3 (an *extra*, different-angle explanation for genuinely hard ideas). Added **3 more deeper-dives
(6 → 9 site-wide)**, each deliberately offering a lens its lesson does *not* already lead with:
• **Vanishing/exploding gradients** (`dl-initialization-and-vanishing-gradients`) — the lesson teaches variance-
preservation mechanics; the dive gives the unifying intuition: backprop <em>multiplies</em>, so the gradient is an
<em>exponential</em> product of per-layer factors ($0.9^{50}\approx0.005$ vanishes, $1.1^{50}\approx117$ explodes) —
and init, normalization, and residuals are all <em>one</em> fix: keep each factor ≈ 1.
• **BatchNorm: two competing stories** (`dl-dropout-and-normalization`) — the original "internal covariate shift" pitch
vs. the later evidence (Santurkar et al.) that the real mechanism is a <em>smoother loss landscape</em>; a technique can
be right for reasons other than its origin story.
• **KKT & complementary slackness** (`c-lagrange-multipliers`) — expands the lesson's one-line "glimpse of KKT" into the
"you only pay for the fences you lean on" intuition ($\lambda_i g_i(\mathbf{x}^\star)=0$: inactive ⇒ price 0, active ⇒
may bind), tied to why SVM support vectors are exactly the active constraints.
Collapsed by default, KaTeX inside, print-expands (existing component). SW cache → `atlas-v59`. Verified: `node gate.js`
ALL GREEN; an in-browser run opens each `<details>` and confirms math renders (vanishing-gradients 10 · KKT 7 KaTeX
elements; the BatchNorm dive is intentionally prose-only) with **errs=0 and per-lesson `.katex-error`=0**; a screenshot
confirms the KKT dive renders cleanly; stray Chrome cleaned up.

## iter 114 — Onboarding refresh: dynamic counts (fixes a stale "122 lessons"), modernized copy, leak fix (understandability / fix)
The first-visit tour (also replayable via the sidebar "Guide / tour" button) claimed **"122 lessons"** — stale and
wrong; the site has **148**. Rather than hardcode a new number that will re-stale, the intro now **computes its counts
live** from `window.COURSES` / `window.VIZ_CATALOG`: "Learn — 148 lessons across 7 subjects — rendered math, worked
examples & 30 interactive visualizations." Also modernized the pillar copy to reflect the mature feature set — **Master**
now names the redeem-your-mistakes loop ("Spawn tests in Mastery mode, then redeem every wrong answer until it sticks"),
**Navigate** mentions flashcards + the daily review, and the tip notes that **⌘K searches inside lessons**. Fixed a
small bug: the Escape-to-close `keydown` listener was added on every `showIntro()` but only removed when you actually
pressed Escape — so replaying the tour (or closing via the button) leaked a listener each time; `close()` now always
removes it. SW cache → `atlas-v58`. Verified: `node gate.js` ALL GREEN; an in-browser run is **errs=0**, the tour
auto-shows with the correct live counts ("148 lessons across 7 subjects … 30 interactive visualizations"), the Guide
button **replays it as exactly one overlay** (no duplicate), and it closes cleanly; desktop + 390px screenshots confirm
the card renders (2×2 grid → single column on mobile) with no overflow; stray Chrome cleaned up.

## iter 113 — Notebook: all your lesson notes in one place (new functionality)
Lessons already had a per-lesson "My notes" box (auto-saved to `localStorage`), but those notes were scattered — there
was no way to see them together. Added a **Notebook** at **`#/notes`**: it gathers every note you've written into one
page, ordered by the curriculum, each on a course-tinted card that links back to its lesson. Your own words are the best
revision material, so this turns scattered jottings into a personal study deck (and pairs with the iter-109 *Annotator*
achievement). Reachable three ways — a **📓 My Notes** quick-action on the dashboard (shown only when you have notes), a
**My Notes** entry in **⌘K**, and an **"all notes →"** link in each lesson's notes box. Read-only and **uses the
existing `notes` state — no new save fields**; it resolves each note's lesson through the memoized `index()` and
**gracefully skips notes whose lesson no longer exists** (verified: a stale key is silently dropped, count stays
accurate). Notes render with `white-space: pre-wrap` so multi-line jottings keep their shape. SW cache → `atlas-v57`;
README +feature bullet. Verified: `node gate.js` ALL GREEN; an 8-route smoke is **errs=0** with the Notebook rendering
its cards, the dashboard action present (only when notes exist), and ⌘K surfacing "My Notes"; desktop + 390px
screenshots confirm the cards (course accent, title link, body) read cleanly with no overflow; stray Chrome cleaned up.

## iter 112 — Learning-Rate Schedule explorer — a 30th visualization (visualizations)
Learning-rate schedules are one of the highest-leverage, least-intuitive training knobs — the DL lesson "Learning Rates,
Schedules, and the Training Loop" and the LLM "AdamW, Schedules, and Stability" lesson both teach them in prose, but
there was no way to *see* a schedule's shape. Added **`dl-lr-schedules`**, embedded in that DL lesson right before its
warmup+cosine worked example. Pick a schedule — **constant · step decay · exponential · cosine annealing · linear** —
add **linear warmup** (shaded band), set the **peak** and the **floor**, and a sage marker sweeps the curve showing
"at step X% → lr ≈ …". The info line names the schedule and gives a one-sentence when-to-use (cosine = the modern
Transformer/LLM default; step = the classic ImageNet recipe; etc.). Canvas widget with a synchronous first paint and a
single `VIZUtil.loop` for the sweeping marker (no stray loops). Blurb/note use plain unicode (not `$…$`), per the Lab
convention. SW cache → `atlas-v56`; README 29 → 30 widgets (+Lab blurb). Verified: `node gate.js` ALL GREEN (30 widgets);
an in-browser run is **errs=0** — the Lab item renders a canvas + the schedule selector + 3 sliders, changing the
schedule and warmup updates the readout ("Step decay · 15% warmup · peak 3.0e-4 …"), and the widget also hydrates inline
in the lesson; desktop + 390px screenshots confirm the cosine curve with its warmup band, floor, marker and axes render
cleanly with no overflow; stray Chrome cleaned up.

## iter 111 — Worked examples for the 5 remaining Linear-Algebra lessons (examples — owner ask)
A coverage check found examples had quietly stalled at 143/148 lessons since the iter 47–52 sweep — and the 5 gaps were
**all computational LA lessons** (Four Fundamental Subspaces/Rank, Diagonalization, Symmetric/Spectral, SVD,
Low-Rank/PCA). An old note had written these off as "purely conceptual," but eigendecomposition and SVD are exactly
worked-example material; their Examples tab (the try-then-reveal practice mode) was simply empty. Added **2 fresh
practice examples to each (×5 = +10, 288 → 298)**, with *different* numbers than the inline lecture walkthroughs so they
work as real practice: diagonalize $\begin{psmallmatrix}2&1\\1&2\end{psmallmatrix}$ and take $A^4$; a triangular
diagonalization + $B^3$; orthogonally diagonalize + classify definiteness; classify a quadratic form; a full $2\times2$
SVD; a rank-deficient SVD/outer-product; PCA on a 3-point dataset; explained-variance + Eckart–Young error; rank/null
space of a $3\times3$; rank–nullity of a wide $2\times4$.
**Correctness:** every matrix claim was **numerically verified** in the generator before writing — each $PDP^{-1}=A$,
power ($A^4$, $B^3$), $Q\Lambda Q^{\top}=A$, $U\Sigma V^{\top}=A$ reconstruction, null-space $A\mathbf{x}=0$, and
rank–nullity identity is asserted (15 checks, all green). Injected by loading the course, attaching `examples`, and
rewriting the file's JSON body in place (header/suffix preserved). SW cache → `atlas-v55`; README 288 → 298. Verified:
`node gate.js` ALL GREEN (298 examples); an in-browser run opens each lesson's Examples tab and **reveals every
solution** — errs=0 and **per-lesson `.katex-error`=0** with the matrix-heavy solutions rendering (svd 35 · diag 36 ·
four-subspaces 30 · spectral 23 · pca 19 KaTeX elements); desktop + 390px screenshots confirm the matrices typeset with
no overflow; stray Chrome cleaned up. **Examples coverage is now 148/148.**

## iter 110 — Keyboard accessibility for clickable cards (accessibility) — ★ 110-iteration checkpoint
Accessibility hadn't been touched since iter 81. Audit found grade buttons and lesson tabs were already accessible, but
the site's many **clickable `<div data-go>` cards were mouse-only** — not in the Tab order and not operable by keyboard
or screen reader: Concept of the Day, the "Continue where you left off" resume card, every course card on the dashboard,
every lesson row on a course page, and the "Redeem your mistakes" CTA. Fixed it **centrally in `bindGo()`** (the one
helper that binds every `[data-go]`): non-native-interactive elements (not `<a>`/`<button>`, not inside an `<svg>`) now
get `role="link"` + `tabindex="0"` and an Enter/Space `keydown` handler, so they're reachable by Tab and activate like a
link. Added a matching focus ring (`.cotd`/`.miss-cta`/`.lesson-row:focus-visible`); the global `:focus-visible` rule
already covered them, this just gives the nicer 3px card offset. SVG Knowledge-Map nodes are deliberately left for a
separate pass (focusing 148 `<g>` nodes needs its own UX thought; every lesson is already reachable by keyboard via the
sidebar, course pages, and ⌘K). SW cache → `atlas-v54`; README accessibility bullet updated. Verified: `node gate.js`
ALL GREEN; an in-browser run is **errs=0**, a course card now reports `role="link"` + `tabindex="0"`, takes focus, and
**pressing Enter navigates** to the course page; lesson rows are focusable too; a dashboard screenshot confirms zero
visual regression (attribute-only change); stray Chrome cleaned up.
**★ 110-iteration checkpoint (iters 100–109).** Cleanly diversified across the compass after the long content/viz arc:
bookmarks (101) · glossary (102) · mastery bars (103) · mistakes deck (104) · BPE viz (105) · quiz juice (106) ·
full-text search (107) · deeper-dives ×4 (108) · achievements ×5 (109) · a11y (110). All four owner directives are
delivered or actively served (PS subject ✓, deepen-the-six ✓, hard-concept support ongoing, new functionality ✓).
Compass areas still thin and worth rotating toward next: **performance** (untouched since iter 58), **examples**
(since 52), **mobile-specific** polish, and **workflow/dev-flow**. Content cadence note: every lesson still sits at
exactly 12 MCQs — the owner's "more and more questions" ask could justify a future bounded growth pass (one topic 12→15)
if it returns, but the uniform-12 property is worth keeping unless committing to a full multi-iteration sweep.

## iter 109 — Five new achievements covering bookmarks, notes, quiz skill & the deeper-dives (gamification)
The owner explicitly loves "more achievements," and several now-shipped features had no reward hook. Added **5 (35 → 40)**,
each tied to a distinct behavior so the collection rewards the *breadth* of how you use the site:
• **Curator** 📌 — bookmark 5 lessons · **Annotator** 🖊️ — write your own notes on 5 lessons · **Flawless Five** 💎 —
ace 5 quizzes at 100% · **Crack Shot** 🎖️ — answer 1,000 quiz questions correctly (feeds the owner's "more questions"
love with a real long-term goal) · **Deep Thinker** 🧩 — expand a "Deeper dive" intuition (rewards the directive-3
component built across iters 95/108). Curator/Annotator hook existing state (`bookmarks`, `notes`); Crack Shot hooks the
existing `mcq.correct`; Deep Thinker fires from a `toggle` listener on `details.deep-dive` in the lecture view; Flawless
Five adds one new counter, `perfectQuizzes`, added to `blank()` AND the `load()` merge (`num()`-guarded) so old saves
migrate cleanly. Also added `flushAchievements()` to the bookmark and notes handlers so those unlocks toast immediately.
SW cache → `atlas-v53`; README 35 → 40. Verified: `node gate.js` ALL GREEN; a Node test confirms migration (old save →
`perfectQuizzes:0`, no false unlocks) and that each new badge unlocks at its exact threshold (Curator@5, Annotator@5,
Crack Shot when `mcq.correct` crosses 1000, Flawless Five@5, Deep Thinker via `unlock()`); an in-browser run is
**errs=0**, the Achievements page renders **40** cards, and opening a lesson's deeper-dive unlocks Deep Thinker live;
desktop + 390px screenshots confirm the Hall of Achievements (progress bar reads "4 of 40 · 10%" with a seeded mix);
stray Chrome cleaned up.

## iter 108 — Four new "Deeper dive" alternative explanations on hard concepts (understandability — owner directive 3)
The owner's standing directive 3 asks for hard concepts to get an *extra* place/way to explain — a different angle, not a
restatement. iter 95 built the collapsible `<details class="deep-dive">` component and seeded two (Bayes, the VAE
reparameterization trick); this adds **four more**, each on a genuinely tricky idea and each taking a *different lens*
than its lesson's main treatment:
• **Eigenvectors** (`la-eigenvalues-eigenvectors`) — the **power-iteration / long-run** view: apply the matrix
repeatedly and any vector swings toward the top eigenvector, which is why PageRank, PCA, and dynamical stability are all
the same trick ("$Av=\lambda v$" ↔ "what repeated multiplication converges to").
• **Why the CLT gives a *bell*** (`ps-sampling-distributions`) — two intuitions the formal theorem omits:
convolution-smoothing (the Gaussian is the **fixed-point/attractor** of repeated averaging) and **maximum entropy**
(the least-committal shape given only a mean and variance).
• **Self-attention** (`l-self-attention`) — attention as a **soft, differentiable key–value dictionary lookup**:
softmax replaces the non-differentiable argmax so retrieval becomes trainable by gradient descent.
• **Policy gradients** (`rl-policy-gradient-theorem`) — **training by trial** (the score-function trick turns an
un-differentiable environment into a sampled expectation; "treats for what worked") and the **baseline as grading on a
curve** (subtract $V^\pi(s)$ so only better-than-average actions are reinforced — unbiased, lower variance).
Collapsed by default, KaTeX works inside, and they print expanded (the existing component's CSS). SW cache → `atlas-v52`.
Verified: `node gate.js` ALL GREEN (7·148·1776); a 4-lesson smoke run opens each `<details>` and confirms the math
renders inside (LA 8 · LLM 8 · RL 5 KaTeX elements; the PS one is intentionally prose-only) with **errs=0 and
per-lesson `.katex-error`=0** on all four; desktop + mobile screenshots confirm the collapsible renders with clean math;
stray Chrome cleaned up. Site now carries **6 deeper-dives**.

## iter 107 — Full-text lesson search in the command palette (new functionality / understandability)
The ⌘K palette searched concept titles, viz, pages, glossary, and references — but **not the text inside lessons**, so
"where did I read about vanishing gradients?" was unanswerable. Now the palette also runs **full-text search across
every lesson's body**: type a query (≥3 chars) and any lesson whose prose contains *all* the query words surfaces with a
🔎 icon and a **highlighted context snippet** showing the match in situ. Title/glossary/page matches still rank first;
body matches follow, ordered by how early in the lesson the term appears. This turns the whole 148-lesson corpus into a
findable index — e.g. "vanishing gradient" returns 14 lessons (zero of which have it in the title), "bellman" finds it
across Dynamic Programming, Shortest Paths, and MDPs. Implementation: a lazily-built, cached plaintext index (HTML
stripped, common entities decoded) over `l.content`; per-keystroke substring match per word; snippet built around the
first hit with the term wrapped in `<mark>` (snippet text is `esc()`-escaped before the mark is injected, so lesson
content can't break the markup). Snippets/titles truncate to one line. SW cache → `atlas-v51`; README ⌘K bullet updated.
Verified: `node gate.js` ALL GREEN; a Node replica confirms the body-only hit counts (chain rule 36, overfitting 10,
vanishing gradient 14, bellman 12, p-value 1) with title matches correctly excluded; an in-browser run opens the
palette, types three queries, finds 🔎 body results with `<mark>` highlights, and clicking one routes to the lesson —
**errs=0**; desktop + **390px** screenshots confirm the highlighted snippets read cleanly with no overflow; stray Chrome
cleaned up.

## iter 106 — Answer-feedback juice on every MCQ (animations / juice)
Put tactile feedback on the single most-used interaction in the app — answering a quiz question. Until now picking an
answer just swapped colours; now the **correct** choice gives a satisfying **pop + a soft sage glow ring**, its letter
badge does a little **spring-rotate (keyPop)**, and a **wrong** pick **shakes** side-to-side in rust. Because the
correct choice always lights up (even when you missed it), every answer ends with your eye pulled to the right one. The
feedback rides on the existing `.choice.correct` / `.choice.wrong` classes, so it fires everywhere those are used —
**lesson quizzes and the mastery/redeem drills** alike — with zero JS changes. Three CSS keyframes (`choicePop`,
`keyPop`, `choiceShake`); all transforms/box-shadow only (no layout shift), and the existing global reduced-motion rule
neutralizes them automatically. SW cache → `atlas-v50`. Verified: synthetic-element checks confirm `.choice.correct`→
`choicePop` and `.choice.wrong`→`choiceShake` are wired; a live lesson-quiz answer shows the correct choice carrying
`choicePop` + the sage glow box-shadow + the `keyPop` badge; a 13-route smoke run is **errs=0**; desktop and **390px**
screenshots confirm the green-glow / red states read clearly with no overflow; stray Chrome cleaned up.

## iter 105 — Byte-Pair Encoding (BPE) trainer — a 29th visualization for LLM tokenization (visualizations)
The LLM topic had three viz (embeddings, attention, decoding) but **no tokenization viz** — yet "Tokenization and
Subword Vocabularies (BPE)" is one of the most-asked-about, least-intuitive LLM topics, and its lesson had only a
*static* worked example. Added **`llm-bpe`**, an interactive BPE trainer embedded right above that lesson's worked
example: starting from the raw character alphabet, each press **merges the single most frequent adjacent pair** across
the whole corpus into a new token. The learner watches, live: the **gold pending pair** about to merge, merged tokens
turning **sage**, the **vocabulary growing by one each step**, the **corpus token count shrinking**, and the **learned
merge-rule list** (which *is* the tokenizer). Controls: *Merge next pair · Run all merges · Reset*. Uses the
HuggingFace-tutorial toy corpus (`hug`×10, `pug`×5, `pun`×12, `bun`×4, `hugs`×5) which has decisive winners — the merges
come out **ug (20×) → un (16×) → hug (15×)** exactly, vocabulary 7→14, corpus 113→36 tokens at convergence. Pure-DOM
widget (no canvas), so it's crisp and fully responsive (columns stack at 390px). No background timers — step/run are
synchronous, so nothing leaks across navigations. SW cache → `atlas-v49`; README 28→29 widgets (+Lab blurb). Verified:
`node gate.js` ALL GREEN (29 widgets); a standalone logic test reproduces the HF merge order, vocab growth, and corpus
shrink; an 18-route smoke run is **errs=0** with probes confirming 16 token chips render in BOTH the lesson embed and
the Lab item, and that two simulated merge-clicks produce 5 merged chips + 2 history rows + the correct next-pair
("h + ug = hug 15×"); desktop + 390px screenshots confirm the design (stats 3/10/62 and 2/9/77 match the algorithm
step-for-step); stray Chrome cleaned up.
**Bug caught in verification:** the first pair-key used an empty-string separator, and `indexOf('')` is always 0 — the
split point was lost. Fixed to a `` control-char delimiter (the live widget already had this; only the throwaway
test had the typo, which is exactly how it surfaced).

## iter 104 — "Redeem your mistakes" deck: every wrong answer becomes drillable (new functionality + gamification)
Directly serves the owner's most-repeated ask — *"more questions so that failing means re-thinking until you pass."*
Now **every MCQ you answer incorrectly** — in a lesson quiz, a spawned test, or a mastery drill — is logged to a
**persistent mistakes deck**, and a one-click **Redeem your mistakes** flow re-drills *exactly those questions* in
mastery mode (re-queued until each one sticks). A question **leaves the deck the moment you get it right** anywhere,
so the deck always reflects "what I currently get wrong." Surfaces in three places: a rust **🎯 Redeem N mistakes**
quick-action on the dashboard (only when N>0), a prominent **Redeem your mistakes** card atop the Test page, and the
dedicated **`#/mistakes`** drill (mastery-style, with the existing progress track + per-question lesson links). Added a
**35th achievement — ♻️ Redeemer** (turn 25 missed questions into correct ones), tracked by a lifetime `missedFixed`
counter.
**State:** new `missed` (`"lessonId#qIdx"→1`) and `missedFixed` fields added to `blank()` AND the `load()` merge
(`Number.isFinite`-guarded), so any prior save still loads (verified: an old save with no `missed`/`missedFixed` loads
with `missed:{}`, `missedFixed:0`, bookmarks preserved). Store API: `recordMiss` / `clearMiss` (returns whether it
removed one; increments `missedFixed` + unlocks Redeemer at 25) / `missedKeys` / `missedCount`. `allQuestions()` now
carries `qIdx` so test/drill engines can record-and-clear; `missedItems()` resolves the deck back to live question
objects (stale keys are skipped). SW cache → `atlas-v48`; README +feature +"35 achievements". Verified: `node gate.js`
ALL GREEN (7·148·1776); a Node test confirms migration + dedup + fix-counting (no inflation on no-op clear) + null
guards + Redeemer-at-25 + persistence across reload; an 18-route smoke run is **errs=0** and probes confirm the
dashboard nudge, the Test card, and the `#/mistakes` mastery drill (4 choices, "mastered" progress, KaTeX rendering);
both the Test card and the drill are legible at **390px**; stray Chrome cleaned up.

## iter 103 — Per-topic mastery-composition bars on the Progress page (UI / understandability)
Upgraded the Progress page's "By topic" section from a plain completion bar to a **segmented mastery-distribution bar**
per topic — each subject now shows its composition across mastered / proficient / learning / seen / new (the same
five-colour `.co-bar` used on course pages), alongside the existing "done/total · mastery %" and the topic icon. So
instead of just "how much have I covered," a learner sees at a glance "how *well* do I know each of the seven subjects"
— coverage and depth in one view. Reuses the existing course-page distribution styling; each bar is screen-reader
labelled (`role="img"` + per-segment counts). SW cache → `atlas-v47`. Verified: `node gate.js` ALL GREEN; the Progress
page renders all 7 per-topic mastery bars (segments appear as lessons are practiced; simulated progress produced the
expected multi-colour segments) with errs=0; screenshot confirms the new composition bars; stray Chrome cleaned up.

## iter 102 — Glossary expansion: 48 → 75 terms (understandability)
The glossary had fallen far behind the curriculum — most glaringly, the entire **Probability & Statistics** topic had
**zero** terms, and the advanced modules added since (matrix calculus, convex optimization, generative models, advanced
algorithms, frontier RL) were absent. Added **27 terms (48 → 75)**: a full Probability & Statistics set (16: probability,
conditional probability, Bayes, independence, random variable, expectation, variance, normal distribution, CLT, LLN,
covariance/correlation, standard error, confidence interval, p-value, hypothesis test, estimator/bias) plus key advanced
terms across the six (Jacobian, convex function, Lagrange multiplier, amortized analysis, max-flow/min-cut, union-find,
autoencoder/VAE, GAN, diffusion model, policy gradient, model-based RL). Every topic is now genuinely covered
(LA 9 · calc 10 · algo 11 · DL 11 · RL 10 · LLM 8 · PS 16). Because the glossary powers BOTH ⌘K search AND the inline
`.gloss` hover/tap tooltips, these definitions automatically light up across all 148 lessons wherever the terms appear.
Plain-language defs in the existing concise style with KaTeX. SW cache → `atlas-v46`; README 48→75. Verified: `node gate.js`
ALL GREEN; glossary page renders all new terms (katex=61, katex-error=0; p-value/VAE/Jacobian/CLT all present); inline
tooltips activate on lessons (gloss spans present, errs=0); a Node check confirms 75 valid entries across the 7 real
topics; stray Chrome cleaned up.

## iter 101 — Bookmarks: save lessons for later (new functionality) — first ship of the post-curriculum "experience" arc
With the curriculum now complete (148 lessons across 7 topics), navigation matters — so this adds a **bookmarks**
feature. A **☆/★ toggle** in every lesson's action bar saves it (with a toast), and saved lessons appear in a new
**★ Bookmarks** section on the dashboard (only when non-empty) as quick-launch chips. New state field `bookmarks` (id→true)
added to `blank()` and the `load()` merge — so any prior save still loads cleanly (verified: an old save with no
bookmarks field loads with `bookmarks: {}`). Store API: `toggleBookmark` / `isBookmarked` / `bookmarkIds`. The
bookmark button is accessible (`aria-pressed`), and the dashboard chips reuse the existing `.conn-chip` styling. This is
the first ship of the new arc the 100-iteration checkpoint set — returning from curriculum-building to experience
polish. SW cache → `atlas-v45`. Verified: `node gate.js` ALL GREEN; a Node test confirms toggle/persist + old-save
migration; in-browser the button flips ☆ Bookmark → ★ Bookmarked and the dashboard shows the ★ Bookmarks section with
the chip; 14-route smoke errs=0; stray Chrome cleaned up.

## iter 100 — RL frontier module → 12 MCQs per lesson (content; owner "more questions" ask) — ★ 100-iteration milestone + checkpoint
Completed the RL frontier module: all three lessons (model-based, offline, imitation) brought from 0 → 12 MCQs each via
the author→adversarial-verify pipeline — **+36 fact-checked questions**, all ok=true. **★ With this, EVERY one of the
148 lessons site-wide carries exactly 12 MCQs** — full, uniform quiz coverage across all seven topics. Site bank
**1,740 → 1,776**. SW cache → `atlas-v44`; README 1,740→1,776.
**100-iteration checkpoint (iters 90–99 reflection).** The arc since the last checkpoint delivered the entire
"deepen the existing six" directive: a 7th frontier module for each original topic (DL generative models, Calculus
convex optimization, LA matrix calculus, Algorithms advanced, RL frontier) plus three new visualizations (convex
landscape, diffusion, p-value) and the reusable "deeper dive" component — interleaving content / MCQs / viz to honor
anti-monotony. Site grew from ~125 to **148 lessons, 1,776 MCQs, 28 widgets**. Both of the owner's headline directives
(new subject + deepen the six) are now fully delivered with complete card/quiz/homework/example coverage. NEXT ARC:
return to the broad compass — UI/UX & animation polish, onboarding, more deeper-dives & achievements, new functionality
— since pure content/viz has dominated for ~30 iterations. Verified: `node gate.js` ALL GREEN (7 topics · 148 lessons ·
**1,776 MCQs**); all three RL quizzes render "of 12" with errs=0 and katex-error=0; stray Chrome cleaned up.

## iter 99 — Reinforcement Learning — NEW frontier module: Model-Based, Offline & Imitation RL (3 lessons) — COMPLETES the deepen-the-six arc (content; "deepen the existing six")
The final topic of the deepen-the-six rotation. RL ended at exploration/practice with no model-based, offline, or
imitation learning — its three biggest frontier gaps. New 7th module:
**(1) Model-Based RL & Planning** — model-free vs model-based, learning $\hat p(s'\mid s,a)$ & $\hat r$, planning/rollouts,
Dyna-Q (learn+plan+act), MCTS (AlphaGo/AlphaZero), and the sample-efficiency-vs-model-bias / compounding-error tradeoff.
**(2) Offline (Batch) RL** — learning from a fixed logged dataset with no interaction; distributional shift &
overestimation of OOD actions (why $\max_{a'}Q$ is dangerous); why naive off-policy diverges offline; conservatism
(policy constraints / CQL value penalization); healthcare/driving applications; pessimism-under-uncertainty.
**(3) Imitation Learning & Inverse RL** — behavioral cloning, the covariate-shift / compounding-error flaw (quadratic in
horizon), DAgger, inverse RL (recover the reward → generalizes), GAIL, and the RLHF connection.
Each is a full lecture + 6 flashcards + 3 homework + 2 worked examples; MCQs deferred to the pipeline. RL is now a
**7-module, 20-lesson** course. **★ With this, ALL SIX original topics now carry a 7th frontier/advanced module —
the owner's "deepen the existing six" directive is COMPLETE** (DL generative models, Calculus convex optimization, LA
matrix calculus, Algorithms advanced, RL frontier — and Probability & Statistics was built as a full 5-module subject).
Site: **148 lessons · 889 flashcards · 442 homework · 288 examples**. SW cache → `atlas-v43`; README counts refreshed
(lessons/concepts 145→148). Verified: `node gate.js` ALL GREEN (7 topics · 148 lessons); all three lessons render with
**katex-error=0**; course/cheatsheet/map + lessons smoke errs=0; legible at 390px; stray Chrome cleaned up.

## iter 98 — Hypothesis-testing / p-value visualization (visualizations; understandability)
A new interactive widget (`ps-hypothesis-test`, the 28th) that makes the most-misunderstood idea in statistics
*operational*, and fills the one PS module that had no viz (Hypothesis Testing). On a standard-normal null distribution
it shades the <span>p-value</span> as the gold tail area beyond the observed statistic and the <span>rejection region</span>
as the rust tails of total area α; you **drag the observed z**, switch **one-/two-sided**, and change **α** — and the
readout flips between REJECT / fail-to-reject exactly when the gold tail crosses the rust threshold ($p\le\alpha$).
p-values are computed via the standard-normal CDF (Abramowitz–Stegun erf); critical values are the standard
$z^{*}$ table. Embedded in the *P-values & Statistical Significance* lesson right after the decision-rule section, and in
the Lab. SW cache → `atlas-v42`; README viz counts 27→28. Verified: Lab renders (curve + gold/rust tails + observed/critical
lines); math correct (two-sided z=1.95 → p=5.12% → fail; z=2.20 → p=2.78% → REJECT; z=1.0 → p=31.73% → fail); slider/selects
drive it with errs=0; embedded canvas hydrates in-lesson (katex-error=0); legible at 390px; `node gate.js` ALL GREEN (28
widgets); stray Chrome cleaned up.

## iter 97 — Algorithms Advanced module — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Advanced Algorithms module: all three lessons (amortized analysis, network flow, union-find & range
queries) brought from 0 → 12 MCQs each via the author→adversarial-verify pipeline — **+36 fact-checked questions**, all
three ok=true. Every algorithms lesson (23) is back to exactly 12 MCQs (276 in the topic), and **every lesson site-wide
once again has a full 12-question quiz**. Site bank **1,704 → 1,740**. Distractors target the recurring traps (amortized
≠ average-case; amortized $O(1)$ bounds the total not any single op; a cut gives only an upper bound; path compression
alone is $O(\log n)$ not $O(\alpha(n))$; Fenwick vs segment-tree trade-offs). SW cache → `atlas-v41`; README 1,704→1,740.
Verified: `node gate.js` ALL GREEN (7 topics · 145 lessons · **1,740 MCQs**); all three quizzes render "of 12" with
errs=0 and katex-error=0; stray Chrome cleaned up.

## iter 96 — Algorithms — NEW advanced module: Advanced Algorithms & Analysis (3 lessons) (content; "deepen the existing six")
Continued the deepen-the-six rotation into **Algorithms**, which ended at NP-completeness/strings with no amortized
analysis, network flow, or advanced data structures — three classic gaps. New 7th module:
**(1) Amortized Analysis** — average cost over a worst-case <em>sequence</em> (a guarantee, not average-case); the
aggregate, accounting/banker's, and potential ($\hat c_i=c_i+\Phi_i-\Phi_{i-1}$) methods; the dynamic-array doubling
($O(1)$ amortized append, and why geometric not constant growth) and binary-counter examples; the hash-table-resize tie-in.
**(2) Network Flow: Max-Flow & Min-Cut** — flow networks, residual graphs & augmenting paths, Ford–Fulkerson /
Edmonds–Karp ($O(VE^2)$), the max-flow min-cut theorem (with the residual reachable set as a certifying cut), bipartite
matching by reduction, and why backward edges are essential.
**(3) Advanced Data Structures: Union-Find & Range Queries** — DSU with union-by-rank + path compression ($O(\alpha(n))$,
inverse Ackermann), Kruskal/connectivity uses; prefix sums (static) → Fenwick/BIT (dynamic prefix sums, $O(\log n)$) →
segment tree (any associative op + range updates via lazy propagation), with a tool-selection guide.
Each is a full lecture + 6 flashcards + 3 homework + 2 worked examples; MCQs deferred to the pipeline. Algorithms is now
a **7-module, 23-lesson** course. Site: **145 lessons · 871 flashcards · 433 homework · 282 examples**. SW cache →
`atlas-v40`; README counts refreshed (lessons/concepts 142→145). Verified: `node gate.js` ALL GREEN (7 topics · 145
lessons); all three lessons render with **katex-error=0**; course/cheatsheet/map + lessons smoke errs=0; legible at 390px;
stray Chrome cleaned up. Only **RL** remains for the deepen-the-six arc.

## iter 95 — "Deeper dive" collapsible for hard-concept support (new functionality / understandability; owner directive 3)
Addressed a long-neglected owner directive (item 3: "for concepts that are hard to understand, add an EXTRA place/way
to explain — a deeper-dive / intuition expandable — an alternative explanation"). Added a reusable **`<details class="deep-dive">`**
component: a native, JS-free, accessible collapsible (keyboard-operable, focus-visible) styled in the violet
deep-dive accent, collapsed by default so it never clutters the main flow, with a print rule that forces it open in
cheatsheets/PDF. KaTeX inside renders fine (the global typeset pass covers hidden content). Demonstrated it on two
genuinely hard concepts with *alternative-angle* explanations: **Bayes' base-rate trap** recast in natural frequencies
("imagine 10,000 people: ~10 sick → ~10 true positives vs ~100 false alarms → 10/110 ≈ 9%", Gigerenzer's framing), and
the **VAE reparameterization trick** explained as rerouting the randomness / a pathwise derivative ("you can't
differentiate a coin flip; draw ε first, then z=μ+σ⊙ε is plain arithmetic"). Authors can now drop a deeper dive into any
lesson for an alternative explanation. SW cache → `atlas-v39`. Verified: `node gate.js` ALL GREEN; both deep-dives are
collapsed by default and open on click (PS: 14 KaTeX inside / DL: 12, katex-error=0 in both); errs=0; legible at 390px;
print rule added; stray Chrome cleaned up.

## iter 94 — Linear Algebra Matrix-Calculus module — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Matrix Calculus module: all three lessons (gradients/Jacobians, derivative identities, backprop)
brought from 0 → 12 MCQs each via the author→adversarial-verify pipeline — **+36 fact-checked questions**. Every
Linear Algebra lesson (19) is back to exactly 12 MCQs (228 in the topic), and **every lesson site-wide once again has a
full 12-question quiz**. Site bank **1,668 → 1,704**. The adversarial pass again proved its worth: in the
derivative-identities lesson it caught a distractor that was *mathematically identical* to the correct answer (for
symmetric $B$, $B+B^\top=2B$) and rewrote it to a genuinely-wrong "forgot the factor of 2" option; the other two lessons
verified clean. Distractors target the recurring matrix-calculus traps (missing transpose, row-vs-column layout, the
factor of 2, undefined-shape products). SW cache → `atlas-v38`; README 1,668→1,704. Verified: `node gate.js` ALL GREEN
(7 topics · 142 lessons · **1,704 MCQs**); all three quizzes render "of 12" with errs=0 and katex-error=0; stray Chrome cleaned up.

## iter 93 — Linear Algebra — NEW advanced module: Matrix Calculus for ML (3 lessons) (content; "deepen the existing six")
Continued the deepen-the-six rotation into **Linear Algebra**, which ended at SVD/PCA with no matrix calculus — the
language every gradient-based learner is written in. New 7th module:
**(1) Gradients, Jacobians & the Layout Convention** — the scalar gradient, the $m\times n$ Jacobian, the denominator-
vs-numerator layout fork (why a gradient has the same shape as its parameter), the Hessian, and shape-bookkeeping as
the core bug-defense.
**(2) Differentiating Vector & Matrix Expressions** — the five identities you reuse forever: $\nabla(\mathbf{a}^\top\mathbf{x})=\mathbf{a}$,
$\nabla(\mathbf{x}^\top A\mathbf{x})=(A+A^\top)\mathbf{x}$, $\nabla\lVert\mathbf{x}\rVert^2=2\mathbf{x}$, the least-squares
gradient $2A^\top(A\mathbf{x}-\mathbf{b})$ → normal equations, and the vector chain rule (Jacobian-transpose pullback).
**(3) Matrix Calculus Behind Backpropagation** — backprop = the vector chain rule layer by layer: $\partial L/\partial\mathbf{x}=W^\top\boldsymbol{\delta}$,
$\partial L/\partial W=\boldsymbol{\delta}\mathbf{x}^\top$ (outer product), why forward uses $W$ and backward uses $W^\top$,
shape-checks, and the vanishing/exploding-gradient explanation.
Each is a full KaTeX lecture + 6 flashcards + 3 homework + 2 worked examples; MCQs deferred to the pipeline. Linear
Algebra is now a **7-module, 19-lesson** course. Site: **142 lessons · 853 flashcards · 424 homework · 276 examples**.
SW cache → `atlas-v37`; README counts refreshed (lessons/concepts 139→142). Verified: `node gate.js` ALL GREEN (7
topics · 142 lessons); all three lessons render math with **katex-error=0** (the $\mathbf{z}=W\mathbf{x}+\mathbf{b}$ /
layer notation confirmed visually); course/cheatsheet/map + lessons smoke errs=0; legible at 390px; stray Chrome cleaned up.

## iter 92 — Convex vs. non-convex gradient-descent landscape visualization (visualizations; "deepen the existing six")
A new interactive widget (`calc-convex-landscape`, the 27th) that makes the convexity lesson's central payoff *visible*.
Pick a landscape — a **convex bowl** ($0.25x^2$) or a **bumpy non-convex** curve ($0.12x^2+0.8\cos 1.8x$ with several
local valleys) — set a **start x**, choose a **learning rate η**, and press **Drop ball** to animate gradient descent
($x_{k+1}=x_k-\eta f'(x_k)$) rolling downhill, leaving a trail. On the convex bowl it reaches the global minimum from
*any* start; on the bumpy landscape it settles into whichever local valley it started above — frequently missing the
global minimum (a dashed green marker), which is precisely the trap convexity eliminates. Embedded in the *Convex Sets
& Functions* lesson right after the "marble in a bowl" intuition callout, and in the Lab. SW cache → `atlas-v36`; README
viz counts 26→27. Verified: Lab hydrates (canvas + select + 2 sliders + 2 buttons, errs=0); the demo run on the bumpy
landscape started at x=−3.2 and **settled (trapped) at x=−1.60 while the global min is at x=+1.60** — the intended
"aha"; embedded canvas hydrates in-lesson (katex-error=0); legible at 390px; blurb/note use plain text (Lab isn't
KaTeX-typeset); `node gate.js` ALL GREEN (27 widgets); stray Chrome cleaned up.

## iter 91 — Calculus Convex-Optimization module — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Convex & Constrained Optimization module: all three lessons (convexity, GD convergence, Lagrange
multipliers) brought from 0 → 12 MCQs each via the author→adversarial-verify pipeline — **+36 fact-checked questions**,
all three returning ok=true (the verifier re-derived the Hessian-PSD bound $|b|\le 2\sqrt6$, the Jensen→$\operatorname{Var}\ge0$
result, and both Lagrange optima symbolically). Every calculus lesson (25) is back to exactly 12 MCQs (300 in the topic),
and **every lesson site-wide once again has a full 12-question quiz**. Site bank **1,632 → 1,668**. Distractors target
canonical traps (convexity needs $f''\ge0$ <em>throughout</em>; union of convex sets need not be convex; Lagrange
conditions are necessary not sufficient; the multiplier is a shadow price). SW cache → `atlas-v35`; README 1,632→1,668.
Verified: `node gate.js` ALL GREEN (7 topics · 139 lessons · **1,668 MCQs**); all three quizzes render "of 12" with
errs=0 and katex-error=0; stray Chrome cleaned up.

## iter 90 — Calculus — NEW advanced module: Convex & Constrained Optimization (3 lessons) (content; "deepen the existing six") — 10-iter checkpoint
Checkpoint review (iters 81–89): heavily content (PS Modules 4–5 + their MCQs, DL generative module + MCQs) plus two
viz and one accessibility ship; the deepen-the-six rotation had only touched Deep Learning. This iteration continues
that rotation into **Calculus**, whose curriculum ended at the multivariable bridge with no optimization *theory* — the
foundation of all of ML. New 7th module:
**(1) Convex Sets, Convex Functions & Why They Matter** — convex sets, the chord definition, the $f''\ge0$ / PSD-Hessian
tests, the headline payoff (every local min is global), Jensen's inequality, and convex vs non-convex ML losses.
**(2) Gradient Descent on Convex Functions** — why convexity makes GD's output trustworthy, $L$-smoothness and the
$\eta\le1/L$ step ceiling, strong convexity, convergence rates ($O(1/k)$ vs linear), the condition number $\kappa=L/\mu$,
and why deep nets work despite non-convexity.
**(3) Constrained Optimization & Lagrange Multipliers** — the tangency condition $\nabla f=\lambda\nabla g$, the
Lagrangian, the multiplier as a shadow price, a glimpse of KKT (complementary slackness), and the SVM / regularization
connections.
Each is a full KaTeX lecture + 6 flashcards + 3 homework + 2 worked examples; MCQs deferred to the pipeline. Calculus is
now a **7-module, 21-lesson** course. Site: **139 lessons · 835 flashcards · 415 homework · 270 examples**. SW cache →
`atlas-v34`; README counts refreshed (lessons/concepts 136→139). Verified: `node gate.js` ALL GREEN (7 topics · 139
lessons); all three lessons render math with **katex-error=0** (the $\nabla f=\lambda\nabla g$ condition confirmed
visually); course/cheatsheet/map + lessons smoke errs=0; legible at 390px; stray Chrome cleaned up.

## iter 89 — Diffusion noising/denoising visualization (visualizations; owner depth direction)
A new interactive widget (`dl-diffusion`, the 26th) that makes the diffusion forward/reverse process *visible* and
pairs with the new Generative Models module. 700 points form structured "data" (an Archimedean spiral); each carries a
frozen noise vector ε, and at step t the widget draws $x_t=\sqrt{\bar\alpha_t}\,x_0+\sqrt{1-\bar\alpha_t}\,\varepsilon$
using a cosine schedule ($\sqrt{\bar\alpha_t}=\cos(\tfrac{\pi}{2}\tfrac{t}{T})$). **Run** animates the round trip —
the spiral dissolves into a Gaussian blob (forward) then reassembles (reverse) — and the **step** slider scrubs to any
intermediate $x_t$, with the signal/noise weights and the signal-energy percentage shown live. Because ε is frozen,
scrubbing back exactly reconstructs, honestly illustrating "if you knew the noise you could undo it" — which is what the
network learns to predict. Points shift gold→violet as noise grows. Embedded in the *Diffusion Models* lesson after the
reverse-process section, and in the Lab. SW cache → `atlas-v33`; README viz counts 25→26. Verified: renders in Lab
(spiral mid-dissolve at t=24 → √ᾱ=0.81, √(1−ᾱ)=0.59, 65% signal — cosine-schedule math correct); slider drives it with
errs=0; embedded canvas hydrates in-lesson (katex-error=0); legible at 390px; blurb/note use plain unicode (the Lab
doesn't typeset KaTeX); `node gate.js` ALL GREEN (26 widgets); stray Chrome cleaned up.

## iter 88 — Deep Learning Generative Models — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Generative Models module: all three lessons (Autoencoders/VAEs, GANs, Diffusion) brought from
0 → 12 MCQs each via the author→adversarial-verify pipeline — **+36 fact-checked questions**, all three returning
ok=true (the verifier re-derived numeric items such as the optimal discriminator $D^{*}=0.6/0.8=0.75$ and the
$\bar\alpha_t=0.36$ signal-energy fraction). Every Deep Learning lesson (22) is back to exactly 12 MCQs (264 in the
topic), and **every lesson site-wide once again has a full 12-question quiz**. Site bank **1,596 → 1,632**.
Distractors target the canonical generative-model misconceptions (autoencoder = supervised, posterior collapse from
over-weighting KL, "predict the noise" vs "predict $x_0$", diffusion's slow-inference tradeoff). SW cache → `atlas-v32`;
README 1,596→1,632. Verified: `node gate.js` ALL GREEN (7 topics · 136 lessons · **1,632 MCQs**); all three
Generative-Models quizzes render "of 12" with errs=0 and katex-error=0; stray Chrome cleaned up.

## iter 87 — Deep Learning — NEW advanced module: Generative Models (3 lessons) (content; owner "deepen the existing six" directive)
Rotated off the long Probability & Statistics arc to honor the owner's directive item 2 — *deepen the existing six with
advanced/frontier lessons*. Deep Learning ended at transformers with no coverage of generative modeling, the engine of
the current AI explosion; this adds a 7th module that fills exactly that gap:
**(1) Autoencoders & Variational Autoencoders** — encoder/bottleneck/decoder, the PCA connection, why a plain
autoencoder can't generate, the VAE's probabilistic latent, the ELBO (reconstruction − KL), and the reparameterization
trick $z=\mu+\sigma\odot\varepsilon$.
**(2) Generative Adversarial Networks** — generator vs discriminator, the minimax value function, the $D\equiv\tfrac12$
optimum, alternating training & the non-saturating loss, mode collapse / instability, and the WGAN fix.
**(3) Diffusion Models** — the fixed forward noising process (incl. the one-shot $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\varepsilon$),
the learned reverse denoising, the "just predict the noise" MSE objective, sampling cost, why it overtook GANs, and
latent diffusion (Stable Diffusion = VAE + denoising + cross-attention — fusing all three lessons).
Each is a full KaTeX lecture + 6 flashcards + 3 homework (hint+solution) + 2 worked examples; MCQs deferred to the
pipeline. Deep Learning is now a **7-module, 21-lesson** course. Site: **136 lessons · 817 flashcards · 406 homework ·
264 examples**. SW cache → `atlas-v31`; README counts refreshed (lessons/concepts 133→136). Verified: `node gate.js`
ALL GREEN (7 topics · 136 lessons); all three lessons render math with **katex-error=0** (GAN generator/discriminator
notation confirmed visually); course/cheatsheet/map + lessons smoke errs=0; legible at 390px; stray Chrome cleaned up.

## iter 86 — Probability & Statistics Module 5 — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the Hypothesis Testing module: all four lessons (testing logic, p-values, errors & power, t-tests) brought
from 0 → 12 MCQs each via the author→adversarial-verify pipeline — **+48 fact-checked questions**. Every one of the
**20** Probability & Statistics lessons now sits at exactly 12 MCQs (240 in the topic); the site bank reaches
**1,548 → 1,596**. The adversarial pass earned its keep this round: it **caught and fixed two flawed items** in the
testing-logic lesson — an ambiguous court-analogy MCQ with two defensible "correct" answers (a distractor was
rewritten so the key is unique), and a numerically broken fill-machine MCQ whose author had left a self-contradictory
answer key and a rambling explanation (rewritten with self-consistent numbers: n=100, σ=5, x̄=501 → z=2.0 → reject).
The other three lessons verified clean. Every PS lesson now has a Quiz tab. SW cache → `atlas-v30`; README 1,548→1,596.
Verified: `node gate.js` ALL GREEN (7 topics · 133 lessons · **1,596 MCQs**); all four Module-5 quizzes render "of 12"
with errs=0 and katex-error=0 (including the two fixed items); stray Chrome cleaned up.

## iter 85 — Probability & Statistics — Module 5: Hypothesis Testing (4 lessons) (content; owner depth direction)
Added the fifth Probability & Statistics module, completing the inference arc (estimate → test). Four lessons that
build on each other:
**(1) The Logic of Hypothesis Testing** — null/alternative hypotheses, the test statistic and its null distribution,
proof-by-contradiction ("innocent until proven guilty"), the significance level $\alpha$ and rejection region,
one- vs two-sided tests, and the CI–test duality.
**(2) P-values & Statistical Significance** — the precise definition $P(\text{data at least as extreme}\mid H_0)$, the
$p\le\alpha$ rule, the four canonical misinterpretations (it is *not* $P(H_0\text{ true})$), statistical vs practical
significance, and p-hacking / multiple comparisons.
**(3) Type I & II Errors and Statistical Power** — the 2×2 decision table, $\alpha$/$\beta$, power $=1-\beta$, the four
power levers, the $\alpha$–$\beta$ tradeoff, and power analysis for sample-size planning.
**(4) t-Tests in Practice** — one-sample and two-sample (and paired) $t$-tests, why $t$ not $z$ when $\sigma$ is unknown,
assumptions/robustness, CI–test duality, and the paired-test-across-CV-folds connection for comparing ML models.
Each is a full KaTeX lecture + 6 flashcards + 3 homework (hint+solution) + 2 worked examples; MCQs deferred to the
pipeline next iteration. Probability & Statistics is now a **five-module, 20-lesson** course. Site: **133 lessons ·
799 flashcards · 397 homework · 258 examples**. SW cache → `atlas-v29`; README counts refreshed (lessons/concepts 129→133).
Verified: `node gate.js` ALL GREEN (7 topics · 133 lessons); all four lessons render math with **katex-error=0**
(t-statistic formula confirmed visually); course/cheatsheet/map + lessons smoke errs=0; legible at 390px; Chrome cleaned.

## iter 84 — Confidence-Interval coverage simulator (visualizations; owner depth direction)
A new interactive widget (`ps-ci-coverage`, the 25th) that makes the single most-misunderstood idea in statistics
*visible*: what "95% confidence" actually means. Each press of **Run** / **+1** draws a fresh sample, builds its
confidence interval, and stacks it as a horizontal bar against a dashed "true μ" line — intervals that capture μ are
<span>green</span>, the ones that miss are <span>red</span>. A live cumulative tally ("captured X / missed Y of N →
Z%") converges toward the chosen confidence level, so the learner *sees* that ~1 in 20 of the 95% intervals misses μ
entirely — the procedural meaning the lesson stresses. Controls: confidence level (80/90/95/99%), sample size n
(which only changes the bar <em>width</em> — the capture rate is set by the confidence level, not n, a key insight),
and Run/+1/Reset. Sample means are drawn exactly as $\bar X = \mu + (\sigma/\sqrt n)Z$. Embedded in the
*Confidence Intervals* lesson right after the interpretation section, and in the Lab. SW cache → `atlas-v28`;
README viz counts 24→25. Verified: renders in Lab (green/red bars + true-μ line + dots); 120 draws gave 93.3% capture
near the 95% target (finite-sample noise); embedded canvas hydrates in-lesson (katex-error=0); slider/buttons drive
it with errs=0; legible at 390px; `node gate.js` ALL GREEN (25 widgets); stray Chrome cleaned up.

## iter 83 — Probability & Statistics Module 4 — 12 MCQs per lesson (content; owner "more questions" ask)
Completed the new Statistical Inference module by bringing all four lessons (LLN, sampling distributions,
point estimation, confidence intervals) from 0 → 12 MCQs each via the author→adversarial-verify pipeline:
**+48 fact-checked questions**. Every one of the **16** Probability & Statistics lessons now sits at exactly 12 MCQs
(192 in the topic); the site bank reaches **1,500 → 1,548**. The adversarial verifier independently re-derived every
answer and validated subtle traps — e.g. the Cauchy distribution (no finite mean → the classical LLN simply does not
apply, and $\bar X_n$ stays Cauchy), the deliberately *vacuous* Chebyshev bound of 1 at small $n$, $\operatorname{MSE}=\operatorname{Var}+\operatorname{Bias}^2$
(not Var+Bias), and the correct procedural reading of a confidence level. All four lessons returned ok=true,
unchanged. Distractors target the canonical misconceptions (gambler's fallacy, confusing $\sigma$ with $\sigma/\sqrt n$,
"95% probability $\mu$ is in this interval"). Now every PS lesson has a Quiz tab. SW cache → `atlas-v27`; README 1,500→1,548.
Verified: `node gate.js` ALL GREEN (7 topics · 129 lessons · **1,548 MCQs**); all four Module-4 quizzes render
"of 12" with errs=0 and katex-error=0; stray Chrome cleaned up.

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
