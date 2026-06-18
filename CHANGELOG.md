# Atlas — Changelog

Prepend new entries under this header. Include the loop-iteration number in the heading.

## iter 400 — ★ Step-back at iteration 400: full audit (clean) + three worked examples (examples)
**Round-number step-back — the 400th iteration (100 since the iter-300 step-back).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **105 non-lesson routes** (courses, Lab + 87 widgets, every utility page) → errs=0, kErr=0. **253 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**382**), ≥8 MCQs (2368), ≥1 flashcard (889),
  ≥1 homework (442) — **0 structurally-thin lessons**. Plus 148 deep-dives (100%), 90 code lessons, 151 glossary terms.
**Reflection — 100 iters since the 300 step-back:** deep-dives 117 → **148 (100%, milestone at iter 384)**, viz ~75 → **87**,
examples ~290 → **385**, code lessons ~60 → **90 (computational coverage complete, 392)**, glossary → **151 (397)**; one owner bug
fixed (streak/stat count-up, 381); the gate hardened twice (unsupported-KaTeX-env 330; bare-`<`-letter-in-math 391). No red gate
or broken push in 100 iterations. Depth/viz/code are saturated; worked examples (distinct flagship angles) are the active runway.
**The paired ship — three worked examples** across calc/PS/algo (examples 382 → **385**):
- **c-intro-differential-equations** — **separable ODE → exponential**: `dy/dx=2y, y(0)=3` ⇒ `y=3e^{2x}` (verified `y'=2y`); "rate ∝ amount"
  always gives `y₀e^{kx}`.
- **ps-joint-distributions** — **testing independence**: `P(X=0)P(Y=0)=0.12 ≠ 0.1 = P(X=0,Y=0)`, so dependent — one failing cell suffices.
- **a-linear-sorts-selection** — **quickselect**: the median of `[7,2,9,4,1]` is `4`, found in `O(n)` average (partition toward the
  target rank) vs `O(n log n)` to sort.
Every value node-verified; injected byte-stably with the full guard set.
Verified: gate ALL GREEN (**385 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (69 / 39 / 132 spans) and **kErr=0,
rawDollar=0**; both step-back sweeps clean; embed-route smoke **errs=0/kErr=0 (8 routes)**. No save-shape change. SW cache
`atlas-v339` → `atlas-v340`.

## iter 399 — Three more worked examples across DL/RL/algo (examples)
A **3rd worked example** on three flagship lessons across DL/RL/algo (examples 379 → **382**, all ⌘K-searchable):
- **dl-pooling-and-cnn-architectures** — **the conv output-size formula** `⌊(W−K+2P)/S⌋+1`: `7,3,0,1 → 5`; `7,3,1,2 → 4` —
  padding preserves, stride downsamples, kernel shrinks; the three knobs that set a CNN's spatial geometry.
- **rl-monte-carlo** — **the discounted return** `G₀ = r₁+γr₂+γ²r₃ = 2.62` (γ=0.9): MC uses the *actual complete* return (no
  bootstrapping) — unbiased but high-variance, the mirror of TD.
- **a-backtracking-branch-bound** — **n-Queens solution count**: 4-Queens has exactly `2` solutions; backtracking prunes the
  `4⁴=256` (or `4!=24`) space by abandoning a partial board the instant it conflicts.
Every value node-verified (conv 5/4; G₀=2.62; 4-Queens=2); injected byte-stably with the full guard set.
Verified: gate ALL GREEN (**382 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (80 / 81 / 149 spans) and **kErr=0,
rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v338` → `atlas-v339`.

## iter 398 — Three more worked examples across calc/LA/PS (examples)
A **3rd worked example** on three flagship lessons across calc/LA/PS (examples 376 → **379**, all ⌘K-searchable):
- **c-integration-techniques** — **definite integral by substitution**: `∫₀¹ 2x e^{x²} dx`, `u=x²` converts the bounds (`0→1`), giving
  `∫₀¹ eᵘ du = e−1 ≈ 1.718`; change the limits and you never back-substitute.
- **la-dot-product-norms** — **Cauchy–Schwarz**: `|a·b| ≤ ‖a‖‖b‖` → `11 ≤ 11.18`, equality iff parallel; the algebraic shadow of
  `|cos θ| ≤ 1`, behind the triangle inequality and `−1 ≤ ρ ≤ 1`.
- **ps-covariance-correlation** — **correlation is scale-free**: `ρ = Cov/(σₓσ_y) = 0.6`; rescale `Y→10Y` and covariance jumps
  `6→60` but `ρ` stays `0.6` — units cancel.
Every value node-verified (e−1; 11≤11.18; ρ invariant); injected byte-stably with the full guard set.
Verified: gate ALL GREEN (**379 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (58 / 67 / 47 spans) and **kErr=0,
rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v337` → `atlas-v338`.

## iter 397 — Thirteen flagship glossary terms (content / reference — fresh modality)
Varying from three examples-iters in a row, filled a genuine **glossary gap**: audited 92 flagship concepts against the 138-term
glossary and added the **13 that were genuinely missing** (most candidates were already covered under other names) → **151 terms**:
- **DL**: ReLU, Momentum, **Adam**, Vanishing gradient, Residual connection, Batch / mini-batch.
- **LLM**: Temperature (`T<1` sharpen / `T>1` flatten), Self-attention (vs the general Attention entry).
- **Stats**: Monte Carlo method (`1/√n` error), Entropy (`H=−Σ pᵢ log pᵢ`).
- **LA**: Spectral theorem (`A=QΛQᵀ`), Condition number.
- **Algo**: Graph (the data structure).
These power the **inline glossary tooltips** (auto-linked in lecture prose) as well as the Glossary page. Concise one-liners in the
existing house style; math uses `\lt`/`\gt` to stay safe.
Verified: gate ALL GREEN; **via `--dump-dom`** the Glossary page shows all 13 (11/11 searchable names found), KaTeX 130 typeset,
**kErr=0, rawDollar=0**; injected byte-stably (append before the closing `]`, JSON-escaped defs, dup-term + even-`$` +
`<`-letter-in-math pre-guards); all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v336` → `atlas-v337`.

## iter 396 — Three more worked examples across algo/RL/LLM (examples)
A **3rd worked example** on three flagship lessons across algo/RL/LLM (examples 373 → **376**, all ⌘K-searchable), each a distinct
angle from the lesson's existing two (read first to avoid overlap):
- **a-shortest-paths-topo** — **why Dijkstra needs non-negative edges**: on `S→A(1), S→B(2), B→A(−2)` the true dist to A is `0`
  (via B) but Dijkstra finalizes A at `1` and never revisits — the greedy "finalize and forget" rule needs Bellman-Ford when
  weights can be negative. (Complements the existing BF + critical-path examples.)
- **rl-what-is-rl** — **explore vs exploit (ε-greedy)**: with `ε=0.1, k=3`, `P(greedy)=1−ε+ε/k≈0.933`, `P(other)=ε/k≈0.033`;
  exploration is the price of learning from evaluative feedback.
- **l-self-attention** — **from scores to weights (the softmax step)**: scores `[2,1,0]` → softmax `[0.665,0.245,0.090]` → output
  `14.25`; the existing example was *given* the weights, this one derives them and explains why softmax (smooth, differentiable).
Every value node-verified; injected byte-stably with the full guard set (round-trip + even-`$` + tag-balance + unsupported-env +
bare-`<`-letter-in-math).
Verified: gate ALL GREEN (**376 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (209 / 62 / 18 spans) and **kErr=0,
rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v335` → `atlas-v336`.
Also confirmed saturated (no build): flashcards uniform (6/lesson), viz achievements + bias-variance/overfitting viz already exist.

## iter 395 — Three more worked examples across LA/DL/PS (examples)
A **3rd worked example** on three flagship lessons across LA/DL/PS (examples 370 → **373**, all ⌘K-searchable):
- **la-gradients-jacobians** — **the Jacobian stacks gradients**: for `F=(x²y, x+y)`, `J(2,3)=[[12,4],[1,1]]`; it's the best linear
  approximation `F(p+δ)≈F(p)+Jδ`, and chaining maps multiplies Jacobians (the chain rule behind backprop).
- **dl-rnn-lstm-gru** — **why vanilla RNN gradients vanish/explode**: the multiplicative recurrence scales by `wᵀ` — `0.5¹⁰≈0.001`
  (vanish), `1.5¹⁰≈57.7` (explode); only `w=1` is stable, and the LSTM's *additive* cell-state highway fixes it.
- **ps-point-estimation** — **MLE for a coin is the sample frequency**: maximizing `log L = k log p + (n−k)log(1−p)` gives `p̂=k/n`
  → `0.7` for 7/10; the binomial coefficient drops out.
Every value node-verified (J=[[12,4],[1,1]]; 0.5¹⁰/1.5¹⁰; MLE 0.7); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env + bare-`<`-letter-in-math pre-guards.
Verified: gate ALL GREEN (**373 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (41 / 58 / 62 spans — `bmatrix` + `\binom`
render clean) and **kErr=0, rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v334` → `atlas-v335`.
Also checked (no build): the symmetric-stretch and BFS/DFS viz ideas are already covered by `la-eigen` and `algo-graph-traversal` —
viz coverage is saturated, so this iter went to examples.

## iter 394 — Three more worked examples across DL/PS/calc (examples)
A **3rd worked example** on three flagship lessons across DL/PS/calc (examples 367 → **370**, all ⌘K-searchable):
- **dl-gradient-descent-and-optimizers** — **Adam's first step normalizes itself**: bias-corrected `m̂/√v̂ = 1` regardless of the
  gradient's size (`= sign(g)` at t=1); Adam = momentum + RMSProp + bias correction, robust to badly-scaled losses.
- **ps-sampling-distributions** — **the 1/√n law**: `SE = σ/√n` → `2` at n=100, `1` at n=400; 4× the data halves the error
  (diminishing returns of precision).
- **c-gradient-descent-convergence** — **the learning-rate window**: GD on `½ax²` multiplies x by `(1−ηa)`, converging iff
  `0 < η < 2/a` (=1 for a=2), fastest at `η=1/a` (one step); curvature bounds the safe rate.
Every value node-verified (Adam ratio 1; SE 2→1; threshold 2/a=1); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env + bare-`<`-letter-in-math pre-guards (GD-convergence uses `\lt`/`\ge`).
Verified: gate ALL GREEN (**370 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (26 / 45 / 53 spans) and **kErr=0,
rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v333` → `atlas-v334`.

## iter 393 — Curve-sketching visualizer — 87th widget (visualizations)
`c-extrema-curve-sketching` had no widget. Added the **87th Lab widget `calc-curve-sketch`**, embedded there: the cubic
`f(x) = x³ − a·x` drawn **green where f′ > 0** (rising) and **rust where f′ < 0** (falling), with gold dots at the **max** and
**min**. Slide **a**: the critical points `x = ±√(a/3)` slide toward each other (`a=3 → ±1.00`) and at **a=0 merge and vanish** —
with no sign change in f′ there are no turning points, just an inflection. The "aha": the *sign* of the first derivative is the
graph's shape, and a turning point needs f′ to actually cross zero, not merely touch it. Plain-HTML note (no `$`). app.js
`viz-complete` fallback 86 → 87.
Verified: gate ALL GREEN (**87 widgets**, embed resolves); **node** prototype matched (`a=3 → ±1`, `a=0 → none`); **via
`--dump-dom`** the slider drives crit `±1.00 → none` and the a=0 "merged" message, `rawDollar=0`, `errs=0`, the lesson embed
hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v332` → `atlas-v333`.

## iter 392 — Three more code exercises across LA/DL/LLM — computational coverage complete (new functionality)
Added **3 gate-verified JavaScript exercises** across LA/DL/LLM (lessons-with-code 87 → **90**; the gate now runs **85**) — and
with these, **every computational lesson now has a runnable code exercise**:
- **la-symmetric-spectral** — **eigenvalues of a symmetric 2×2** via the characteristic equation `λ=(tr±√(tr²−4det))/2`:
  `[[2,1],[1,2]]` → `3 1` (real eigenvalues, orthogonal eigenvectors — the spectral theorem).
- **dl-transformer-architecture** — **parameters per block** `≈12·d²` (attention `4d²` + FFN `8d²`): `d=512` → `3,145,728` (~3.1M;
  the FFN is ⅔ of the block).
- **l-multihead-and-causal-masking** — **head splitting** `head_dim = d_model/h`: `512/8` → `64`; the Q/K/V projections stay
  `d×d` total, so multi-head is *almost free*.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**85 code-exercises verified**); **via `--dump-dom`** the transformer-params widget runs → `3145728`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v331` → `atlas-v332`.

## iter 391 — Three more worked examples across DL/calc/algo (examples)
A **3rd worked example** on three flagship lessons across DL/calc/algo (examples 364 → **367**, all ⌘K-searchable):
- **dl-the-artificial-neuron-and-mlp** — **a single neuron is logistic regression**: `σ(w·x+b)` → `0.5` at the boundary, `0.881`
  off it; the decision boundary is the line `w·x+b=0` — one neuron draws only a *linear* split (why a single unit can't do XOR).
- **c-definite-integral-riemann** — **left/right/midpoint sums**: for `∫₀²x²` (true `2.667`), `L=1`, `R=5`, `M=2.5`; midpoint's
  over/under-shoot cancels per strip, so its error shrinks as `O(1/n²)` vs `O(1/n)`.
- **a-asymptotic-analysis** — **n log n vs n² at scale**: at `n=1000`, `≈9,966` vs `1,000,000` (100×); growth rate, not the
  constant, decides feasibility — the crossover Big-O captures.
Every value node-verified; injected byte-stably with round-trip + even-`$` + tag-balance + unsupported-env + **a new bare-`<`-letter-in-math
pre-guard** (the neuron example uses `\lt`/`\gt`/`\lVert` to stay safe).
Verified: gate ALL GREEN (**367 examples**); **via `--dump-dom`** all 3 reveal with KaTeX (65 / 67 / 93 spans) and **kErr=0,
rawDollar=0**; smoke + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v330` → `atlas-v331`.

## iter 390 — Step-back: full kErr/route + coverage audit (clean) + recursion-tree visualizer — 86th widget (visualizations)
**Round-number step-back (iter 390).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **103 non-lesson routes** (courses, Lab + 85 widgets, every utility page) → errs=0, kErr=0. **251 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**364**), ≥8 MCQs (2368), ≥1 flashcard (889),
  ≥1 homework (442) — **0 structurally-thin lessons**. Plus **148 deep-dive lessons (100%)** and 87 code lessons.
**Reflection (381–389):** bug-fix → viz → content×2 (the 148/148 deep-dive milestone at 384) → examples → code → viz → examples
→ code; all verified and pushed, no bugs; the gate hardening (330) + kErr-audit discipline have held across 90 iterations since the
300 step-back. Depth is saturated; breadth (viz/examples/code) is rotating cleanly.
**The paired ship — 86th Lab widget `algo-recursion-tree`** (embedded in viz-free `a-divide-and-conquer`): a stack of bars, one per
recursion level, each spanning the **full width = n total work** but split into `2^L` pieces deeper down — `log₂ n + 1` levels in all.
Slide n and the tree deepens by exactly **one level** each time n doubles, with the note comparing `n·log₂ n` against `n²`
(`n=16 → 5 levels, 64 vs 256`; `n=64 → 7 levels, 384 vs 4096`). The "aha": balanced splitting makes a shallow tree of cheap merges.
Plain-unicode note (no `$`). app.js `viz-complete` fallback 85 → 86.
Verified: gate ALL GREEN (**86 widgets**, embed resolves); **via `--dump-dom`** the slider drives levels `5 → 7` and `n log n`
`64 → 384`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; both step-back sweeps clean; embed-route smoke **errs=0/kErr=0 (12
routes)**. No save-shape change. SW cache `atlas-v329` → `atlas-v330`.

## iter 389 — Three more code exercises across LA/algo/calc (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across LA/algo/calc (lessons-with-code 84 → **87**; the gate now runs **82**):
- **la-diagonalization** — **eigenvalue from an eigenpair**: `Av=λv` recovers `λ=3` for `[[2,1],[1,2]]·[1,1]` — and then `Aⁿv=λⁿv`,
  the payoff of diagonalization.
- **a-union-find-range** — **connected components**: merge (0,1),(2,3),(1,2) among 5 → count distinct roots = `2` (`{0,1,2,3}`, `{4}`).
- **c-improper-integrals** — **the p-test**: `∫₁^∞ x^(−p) = 1/(p−1)` for `p>1` → `1` at p=2 (and `Infinity` to signal divergence at p≤1).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**82 code-exercises verified**); **via `--dump-dom`** the union-find widget runs → `2`,
"✓ Output matches expected" (the `<` loops work); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v328` → `atlas-v329`.

## iter 388 — Three more worked examples across LA/PS/calc (examples)
A **3rd worked example** on three flagship lessons across LA/PS/calc (examples 361 → **364**, all ⌘K-searchable):
- **la-projection-least-squares** — **projecting a vector onto a line**: `proj_a b = (a·b/a·a)a = (3.5,3.5)`; residual `(−0.5,0.5)` is
  ⊥ to `a` — exactly why least squares projects `b` onto the column space (normal equations make the residual orthogonal).
- **ps-expectation-variance** — **Var = E[X²]−(E[X])²**: for `{1,2,3}` with `[0.2,0.3,0.5]`, `E[X]=2.3`, `E[X²]=5.9` → `Var=0.61`,
  `σ≈0.781` — "mean of the square minus square of the mean," derived in one pass.
- **c-linearization-lhopital** — **linear approximation**: `√4.1 ≈ L(4.1) = 2 + 0.25·0.1 = 2.025` (true `2.0248…`); the error shrinks
  like `(x−a)²` — "differentiable" means "locally linear."
Every value node-verified (proj ⊥ residual; Var 0.61 / SD 0.781; 2.025 vs 2.0248); injected byte-stably with round-trip +
even-`$` + tag-balance + unsupported-env pre-guards.
Verified: gate ALL GREEN (**364 examples**); **via `--dump-dom`** the math-heavy two render (ps-variance KaTeX 58 with
`\mathbb`/`\operatorname`, la-projection 78 with `\dfrac`/`\top`), **kErr=0, rawDollar=0**; smoke revealing all 3 + 8 pages
**errs=0/kErr=0, bad=none**. No save-shape change. SW cache `atlas-v327` → `atlas-v328`.

## iter 387 — Monte Carlo convergence visualizer — 85th widget (visualizations)
`rl-monte-carlo` had no widget. Added the **85th Lab widget `rl-mc-convergence`**, embedded there: the **running average of sampled
returns** plotted against episode count, settling onto the **true value** (gold dashed) inside a **standard-error band** that
narrows like `±σ/√n` (violet). Slide the **episode count N** and watch the estimate converge — `N=50 → 2.280 (±0.155)`,
`N=500 → 1.988 (±0.049)` toward the true `2.0`. The "aha": Monte Carlo needs *no model* — just average observed returns — and the
error shrinks as `1/√n`, so halving it costs 4× the episodes. Seeded LCG for a reproducible run; plain-unicode note (no `$`).
app.js `viz-complete` fallback 84 → 85.
Verified: gate ALL GREEN (**85 widgets**, embed resolves); **node** prototype matched the in-browser values exactly; **via
`--dump-dom`** the slider drives the estimate `2.280 → 1.988` and SE `0.155 → 0.049`, `rawDollar=0`, `errs=0`, the lesson embed
hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v326` → `atlas-v327`.

## iter 386 — Three more code exercises across algo/PS/calc (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across algo/PS/calc (lessons-with-code 81 → **84**; the gate now runs **79**):
- **a-shortest-paths-topo** — **Bellman-Ford edge relaxation**: relax every edge a few passes; `dist.D → 4` (`A→B→C→D` beats the
  alternatives) — shortest paths as repeated "found a shorter route?" updates.
- **ps-random-variables-distributions** — **expected value** `E[X]=Σ x·p(x)`: `{1,2,3}` with `[0.2,0.3,0.5]` → `2.30`.
- **c-lagrange-multipliers** — **constrained minimization**: minimize `x²+y²` on `x+y=S` (`∇f=λ∇g ⇒ x=y=S/2`) → `8` at S=4 (the
  point on the line nearest the origin).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**79 code-exercises verified**); **via `--dump-dom`** the shortest-path widget runs → `4`,
"✓ Output matches expected" (the `<` relax comparison works); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v325` → `atlas-v326`.

## iter 385 — Three more worked examples across calc/RL/LLM (examples)
A **3rd worked example** on three flagship lessons across calc/RL/LLM (examples 358 → **361**, all ⌘K-searchable):
- **c-partial-derivatives** — **the gradient points uphill (directional derivatives)**: `∇f=(2,4)` at (1,2); rate toward `(3,4)` is
  `∇f·û = 4.4`; steepest ascent is `∇f` itself at rate `|∇f|=√20≈4.47` — why gradient descent steps along `−∇f`.
- **rl-dqn** — **the DQN target**: `y = r + γ·maxₐ Q(s′,a) = 1+0.9·5 = 5.5`; terminal drops the bootstrap (`y=r=1`); the `max`
  is what makes Q-learning off-policy.
- **l-decoding-strategies** — **top-p (nucleus) sampling**: grow the nucleus to cover `p=0.9` → keep `{0.5,0.25,0.15}`, renormalize
  to `[0.556,0.278,0.167]`; a dynamic cutoff that adapts to the model's confidence (unlike fixed top-k).
Every value node-verified (4.4 / 4.47; 5.5 / 1.0; nucleus renorm); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards.
Verified: gate ALL GREEN (**361 examples**); **via `--dump-dom`** the math-heavy two render (l-decoding KaTeX 101 with `\underbrace`,
rl-dqn 90 with `\max_{a'}`), **kErr=0, rawDollar=0**; smoke revealing all 3 + 8 pages **errs=0/kErr=0, bad=none**. No save-shape
change. SW cache `atlas-v324` → `atlas-v325`.

## iter 384 — ★ MILESTONE: every lesson now has a deeper-dive (148/148) (content / understandability)
The final 3 "Deeper dive" expandables — deep-dive coverage **145 → 148/148**. **Every lesson in the codex now carries a
deeper-dive**, completing the owner's #1 directive (depth / hard-concept extra explanations):
- **c-functions-and-graphs** — **a function is a machine, a graph is its fingerprint**: the single-valued rule, the vertical line
  test, and reading slope/roots/turning-points off the curve; formula transformations as rigid motions (`f(x)+c`, `f(x-c)`, `-f(x)`, `f(ax)`).
- **la-span-independence** — **independence is non-redundancy; span is reach**: the link via `c₁v₁+…+c_kv_k=0` (only trivial
  solution ⇒ independent); a basis as the balance point — maximal reach, zero redundancy.
- **la-matrix-derivative-identities** — **matrix calculus is the chain rule, bookkept by shapes**: the layout convention forces
  the result (`∇ₓ(xᵀAx)=(A+Aᵀ)x` is the only vector that fits) — the same machinery backprop runs in reverse.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; **via `--dump-dom`** la-matrix (riskiest: `\operatorname{tr}`, `\nabla`, `\top`) renders KaTeX 9, kErr=0;
smoke opening all 3 deep-dives + 8 pages **errs=0/kErr=0, bad=none**, rawDollar=0. No save-shape change. SW cache `atlas-v323` → `atlas-v324`.

## iter 383 — Four more deeper-dives — deep-dive coverage now 145/148 (content / understandability)
4 "Deeper dive" expandables across LLM/calc/LA/RL (deep-dives 141 → **145**; only **3 of 148** lessons left without one):
- **l-pretraining-objective-data** — **scaling laws**: test loss falls as a power law in params `N`, data `D`, compute `C`;
  Chinchilla's ~20-tokens-per-parameter compute-optimal split — capability is bought predictably, if you split compute right.
- **c-derivatives-special-functions** — **eˣ is its own derivative**: the defining property of `e`; why `dy/dx=ky → Ce^{kx}` models
  all proportional growth, `ln` linearizes products, and the trig derivatives close a 4-cycle.
- **la-basis-dimension** — **a basis is a coordinate system you choose**: spanning + independent ⇒ unique coordinates; dimension is
  the invariant; most of applied LA is switching to the basis where the problem is easy (eigen/PCA/SVD).
- **rl-connections-frontiers** — **RL is the training signal behind aligned LLMs**: RLHF treats the LLM as a policy + a learned
  reward model (PPO); RL on verifiable rewards is how models are trained to reason — capability from pretraining, behaviour from RL.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 5 / 13 / 1 / 0 spans — RL is intentionally prose)
with **kErr=0, rawDollar=0**; smoke opening all 4 deep-dives + 8 pages **errs=0/kErr=0, bad=none**. No save-shape change.
SW cache `atlas-v322` → `atlas-v323`.

## iter 382 — Intermediate Value Theorem visualizer — 84th widget (visualizations)
`c-continuity` had no widget. Added the **84th Lab widget `calc-ivt`**, embedded there: a continuous curve on `[a, b]` with a
**draggable target level k** (slider). The IVT guarantees that for any k between f(a) and f(b) there's a point c with f(c)=k — the
curve is marked (violet dot + drop-line) wherever it crosses k. A **"Add a jump" toggle** introduces a discontinuity: now a level
inside the gap has **0 crossings**, visibly breaking the theorem — continuity is exactly what forbids skipping a value. Plain-unicode
note (no `$`). app.js `viz-complete` fallback 83 → 84.
Verified: gate ALL GREEN (**84 widgets**, embed resolves); **node** prototype confirmed the crossing logic (jump gap `[3.0, 4.7]`,
`k=3.8` → 1 crossing continuous, 0 with the jump); **via `--dump-dom`** the slider/toggle drive crossings `1 → 1 → 0` and the
button relabels, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v321` → `atlas-v322`.

## iter 381 — Fix: streak (and all stat numbers) could display 0 instead of the real value (bug — owner report)
**Owner bug report:** the "N-day streak" display was rendering wrong. **Root cause:** the `countUp` animation (dashboard
stat-strip, Progress-page tiles) wrote `el.textContent = "0"` *synchronously*, then restored the real value only via a deferred
`setTimeout` + `requestAnimationFrame` chain. If that async path stalled — a backgrounded tab (rAF pauses), a slow device, or
navigating before the deferred timer fired — the number was **left stuck at "0"**. This explains the exact symptom: the header
streak counter (set directly in `renderChrome`, no animation) always showed the right value, while the **dashboard and Progress
"Day streak" (count-up'd) could show 0**. Seeded headless repro: with `streak=12`, header=12 but dashboard/stats="0" (and *every*
count-up number — Total XP, Cards, accuracy — was 0, confirming it's the shared count-up, not streak-specific).
**Fix (`js/app.js` `countUp`):**
- Moved the `"0"` zero-state *inside* `run()` so it's written only when the animation actually starts — a deferred-but-never-run
  element keeps its real value (and there's no pre-delay 0-flash).
- Added a **safety net**: a `setTimeout` after the animation window (`delay + dur + 260ms`) that forces the final real value if
  rAF hasn't landed it — so a stalled/throttled animation can never leave a number stuck at 0.
- Reduced-motion path unchanged (returns early, real value never zeroed).
Verified (seeded headless, `--dump-dom`): post-fix every count-up resolves to its real value — **Day streak 12** (was 0), Total XP
1,200, Cards 7, accuracy 90%. Across `streak = 1 / 12 / 100`: header, dashboard, the `cs-label` ("🔥 N-day streak …"), and the
Progress tile all show the correct value with correct flame tiers (lit / hot / inferno). All-routes smoke **errs=0/kErr=0**; gate
ALL GREEN. SW cache `atlas-v320` → `atlas-v321` (app.js is a cached asset).

## iter 380 — Step-back: full kErr/route + coverage audit (clean) + four deeper-dives toward full coverage (content)
**Round-number step-back (iter 380).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **101 non-lesson routes** (courses, Lab + 83 widgets, every utility page) → errs=0, kErr=0. **249 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**358**), ≥8 MCQs (2368), ≥1 flashcard (889),
  ≥1 homework (442) — **0 structurally-thin lessons**. Now 81 code lessons and (after this ship) **141 deep-dive lessons**.
**Reflection (371–379):** steady code/viz/content/examples rotation — all verified and pushed, no bugs; the gate hardening (330)
and kErr-audit discipline have held across 80 iterations since the 300 step-back. Deep-dive coverage is approaching completeness.
**The ship (content — toward "every lesson has a deeper-dive").** 4 more deep-dives (137 → **141**; only **7 of 148** left)
across RL/calc/LA/algo:
- **rl-practical-rl** — **why RL is notoriously hard**: a target that moves as the policy generates its own data; sparse/delayed
  rewards; the deadly triad — so practical RL is mostly stabilization machinery.
- **c-limits-intuition** — **a limit is about approach, not arrival**: it says nothing about `f(a)`; `sin x / x → 1` at 0 though
  `0/0` is undefined.
- **la-vectors-operations** — **a vector is both an arrow and a list**: geometry for intuition, components to compute — the duality
  that scales linear algebra to 768-dim data.
- **a-algorithms-for-ml** — **ML is optimization wrapped in linear algebra**: gradient descent + matmuls + the standard
  search/aggregation toolkit; no new kind of computation.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 20 / 1 / 1 spans) with **kErr=0, rawDollar=0**;
both step-back sweeps clean; embed-route smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v319` → `atlas-v320`.

## iter 379 — Three more code exercises across LA/DL/calc (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across LA/DL/calc (lessons-with-code 78 → **81**; the gate now runs **76**):
- **la-matrix-calculus-backprop** — **the weight gradient is an outer product** `dL/dW = (dL/dy)·xᵀ`: upstream `[1,2]`, input `[3,4]`
  → `3 4 6 8` (each `dL/dW_ij = dL/dy_i · x_j`).
- **dl-autoencoders-vae** — **the reparameterization trick** `z = μ + σ·ε`: `μ=2, σ=0.5, ε=1` → `2.50`; the noise sits outside the
  differentiable path so gradients flow.
- **c-implicit-related-rates** — **implicit differentiation** of `x²+y²=25` (`y'=−x/y`): at `(3,4)` → `-0.75`, the circle's slope.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**76 code-exercises verified**); **via `--dump-dom`** the weight-gradient widget runs → `3 4 6 8`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v318` → `atlas-v319`.

## iter 378 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across LA/calc/RL (examples 355 → **358**, all ⌘K-searchable):
- **la-matrices-as-transformations** — **composition = matrix product**: scale-then-rotate is `RS=[[0,−2],[2,0]]`, sending `(1,0)→(0,2)`;
  matrix multiply *is* function composition (right-to-left), which is why products don't commute.
- **c-multivariable-optimization** — **Lagrange multipliers**: maximize `xy` s.t. `x+y=10` via `∇f=λ∇g` → `x=y=5`, `f=25`; the
  optimum is where the gradient points straight out of the feasible set.
- **rl-eligibility-traces** — **the λ-return blends every n-step return**: `G^λ=(1−λ)G₁+λG₂ = 2` at `λ=0.5`; `λ=0` is TD(0),
  `λ=1` is Monte Carlo — the bias-variance dial.
Every value node-verified (RS·(1,0)=(0,2); xy=25; λ-return 2); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards (bmatrix is KaTeX-supported).
Verified: gate ALL GREEN (**358 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX (84 / 78 / 128
spans) and **kErr=0, rawDollar=0** (the matrix example renders clean); all-routes smoke **errs=0/kErr=0 (12 routes)**. No
save-shape change. SW cache `atlas-v317` → `atlas-v318`.

## iter 377 — Four more deeper-dives — toward full coverage (content / understandability)
4 "Deeper dive" expandables on foundational lessons across RL/LLM/calc/PS (deep-dives 133 → **137**; only **11 of 148** lessons
now lack one):
- **rl-what-is-rl** — **RL learns from evaluation, not instruction**: a scalar reward, not the right answer — hence explore-vs-exploit
  and delayed credit assignment, which supervised learning never faces.
- **l-what-is-a-language-model** — **a next-token probability machine**: `P(next|context)`, applied autoregressively; competence
  *emerges* from doing that one thing well at scale.
- **c-area-volume** — **slice, approximate, integrate**: one template (`dx` strips, disks `πr²`, shells `2πx·h`) behind every
  area/volume formula — set up one representative slice and integrate.
- **ps-geometric-waiting** — **the discrete memoryless wait**: the *only* discrete distribution with `P(X>m+n|X>m)=P(X>n)` —
  constant hazard, the gambler's fallacy made true for independent trials; the exponential's discrete twin.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 1 / 12 / 5 spans — the RL/LM ones are
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v316` → `atlas-v317`.

## iter 376 — KV-cache visualizer — 83rd widget (visualizations)
`l-inference-efficiency` had no widget. Added the **83rd Lab widget `llm-kv-cache`**, embedded there: per-token generation work
vs token position, plotting **no-cache `O(t²)`** (rust, reprocessing the whole prefix each step) against **with-cache `O(t)`**
(sage, reusing stored keys/values). Slide the **context length N** and the quadratic curve pulls away — over `N` tokens the
cumulative work is `Σt` (cached) vs `Σt²` (uncached), a gap that grows with N (`7× at N=10 → 20× at 30 → 40× at 60`). The cache
is what makes long-context decoding feasible. Plain-unicode note (no `$`). app.js `viz-complete` fallback 82 → 83.
Verified: gate ALL GREEN (**83 widgets**, embed resolves); **node** prototype confirmed the cumulative totals + gap ratio
`(2N+1)/3`; **via `--dump-dom`** the slider grows the gap `20× → 40×`, `rawDollar=0`, `errs=0`, the lesson embed hydrates;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v315` → `atlas-v316`.

## iter 375 — Three more code exercises across calc/PS/LA (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across calc/PS/LA (lessons-with-code 75 → **78**; the gate now runs **73**):
- **c-convexity** — **the chord-above-curve check**: `gap = (f(a)+f(b))/2 − f((a+b)/2) ≥ 0` for convex `f` — `x²` on `[1,3]` → `1.00`.
- **ps-joint-distributions** — **marginalizing**: sum the joint over the other variable — `P(X=0)` from `[[0.1,0.2],[0.3,0.4]]` → `0.30`.
- **la-four-subspaces-rank** — **rank-nullity**: `nullity = n − rank` — a 3×5 rank-2 matrix → `3`-dimensional null space.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**73 code-exercises verified**); **via `--dump-dom`** the convexity-gap widget runs → `1.00`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v314` → `atlas-v315`.

## iter 374 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across PS/algo/LA (examples 352 → **355**, all ⌘K-searchable):
- **ps-law-of-large-numbers** — **LLN says it converges; CLT says how fast**: for n=100 the proportion `→0.5` (LLN) with SE
  `√(0.25/100)=0.05` (CLT); LLN gives the limit, CLT the `1/√n` Gaussian wobble — both needed for error bars.
- **a-string-algorithms** — **why KMP beats naive**: "aaaa" in "aaaaaaaaaa" costs naive `(n−m+1)·m = 28` (re-checking) vs KMP
  `O(n+m)=14` — the prefix function avoids re-reading text characters.
- **la-span-independence** — **do these span ℝ³?**: `v₃=v₁+v₂` ⇒ dependent (`det=0`), so they span only the `xy`-plane, not `ℝ³`;
  you need `n` independent vectors to span `ℝⁿ`.
Every value node-verified (SE 0.05; 28 vs 14; det 0); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards.
Verified: gate ALL GREEN (**355 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX (41 / 116 / 66
spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v313` → `atlas-v314`.

## iter 373 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables across LLM/calc/algo/PS (deep-dives 129 → **133**; only 15 of 148 lessons now lack one):
- **l-embeddings-and-prediction-head** — **the prediction head is a similarity search** (dot the hidden state against every
  token's embedding → softmax); often weight-tied to the input embedding.
- **c-differentiation-rules** — **rules = linearity + product/chain structure**: `(af+bg)'`, `(fg)'`, `(f∘g)'`, plus a few atoms,
  compose to differentiate anything — a mechanical descent through the expression tree.
- **a-linear-sorts-selection** — **beating n log n by not comparing**: counting/radix sort use keys as *array indices* (`O(n+k)`),
  sidestepping the comparison-sort lower bound — at the cost of needing bounded integer-like keys.
- **ps-errors-and-power** — **the two ways a test can be wrong**: Type I (`α`, false alarm) vs Type II (`β`, miss); lowering one
  raises the other at fixed `n` — which is worse is a domain choice (smoke alarm vs criminal trial).
Authored with `String.raw` LaTeX (`\lt` for the comparison sign); injected byte-stably with round-trip +
even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 12 / 8 / 12 spans — the prediction-head one is
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v312` → `atlas-v313`.

## iter 372 — Cross-entropy / perplexity visualizer — 82nd widget (visualizations)
`l-pretraining-objective-data` (the next-token objective) had no widget. Added the **82nd Lab widget `llm-cross-entropy`**,
embedded there: a bar chart of the model's predicted distribution over 5 candidate tokens with the **true token highlighted**.
Slide the probability mass on the true token and the **cross-entropy loss `−log(p)`** and **perplexity `e^loss = 1/p`** update
live — `p=0.2 → loss 1.61 / ppl 5`, `p=0.9 → loss 0.11 / ppl 1.11`. The "aha": the loss depends *only* on the mass on the true
token — confident-and-right costs almost nothing, confident-and-wrong (`p→0`) is punished without bound. Plain-unicode note
(no `$`). app.js `viz-complete` fallback 81 → 82.
Verified: gate ALL GREEN (**82 widgets**, embed resolves); **node** prototype confirmed loss=−ln(p), ppl=1/p; **via `--dump-dom`**
the slider drives loss `1.61 → 0.11` and ppl `5.00 → 1.11`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v311` → `atlas-v312`.

## iter 371 — Three more code exercises across LLM/algo/calc (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across LLM/algo/calc (lessons-with-code 72 → **75**; the gate now runs **70**):
- **l-rlhf-and-preference-optimization** — **Bradley-Terry preference** `σ(r_A−r_B)`: scores 2 vs 1 → `0.73` (a 1-point reward edge
  ≈ 73% preference) — the reward model's training target.
- **a-np-completeness** — **brute-force Subset-Sum**: enumerate all `2ⁿ` subsets, count those hitting the target — `[3,5,2]→7`
  gives `1` (only `{5,2}`); the exponential scan that makes it hard.
- **c-extrema-curve-sketching** — **finding critical points** (`f'=0`): for `x³−3x`, solve `3x²−3=0` → `-1 1` (a max and a min).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**70 code-exercises verified**); **via `--dump-dom`** the subset-sum widget runs → `1`
("✓ Output matches expected"; nested bitmask `<` loops work); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v310` → `atlas-v311`.

## iter 370 — Step-back: full kErr/route + coverage audit (clean) + three worked examples (examples)
**Round-number step-back (iter 370).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **99 non-lesson routes** (courses, Lab + 81 widgets, every utility page) → errs=0, kErr=0. **247 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**352**), ≥8 MCQs (2368), ≥1 flashcard (889),
  ≥1 homework (442) — **0 structurally-thin lessons**. Now **129 deep-dive lessons** (87% of the codex) and 72 code lessons.
**Reflection (361–369):** steady content/examples/code/viz rotation — all verified and pushed, no bugs; the gate hardening (330)
and kErr-audit discipline have held across 70 iterations since the 300 step-back. Deep-dive coverage is nearly complete.
**The ship (paired examples).** A **3rd worked example** on three flagship lessons across PS/LA/algo (examples 349 → **352**):
- **ps-sample-spaces-events** — **inclusion-exclusion**: `P(♥∪face)=13/52+12/52−3/52=11/26≈0.423` — "or" is addition minus the overlap.
- **la-vectors-operations** — **distance = magnitude of the difference**: `‖Q−P‖=‖(3,4)‖=5` — the norm is Pythagoras in any dimension.
- **a-approximation-randomized** — **randomized MAX-CUT**: each edge cut w.p. ½ → `E[cut]=m/2=5 ≥ OPT/2`, a 2-approx from one
  coin flip per vertex (linearity of expectation, no independence needed).
Every value node-verified; injected byte-stably with round-trip + even-`$` + tag-balance + unsupported-env pre-guards.
Verified: gate ALL GREEN (**352 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX (33 / 57 / 101
spans) and **kErr=0, rawDollar=0**; both step-back sweeps clean; embed-route smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v309` → `atlas-v310`.

## iter 369 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables on foundational lessons across algo/LA/calc/DL (deep-dives 125 → **129**):
- **a-trees-heaps** — **heap property vs BST property**: `left<node<right` buys searchability (`O(log n)` *if balanced*); a heap's
  parent-dominates-children buys only `O(1)` top-element access (priority queue) — different invariants, different jobs.
- **la-dot-product-norms** — **the dot product measures alignment**: `a·b = |a||b|cos θ` — sign gives direction, magnitude gives
  projection; normalized, it's cosine similarity. The bridge between algebra and geometry.
- **c-computing-limits** — **indeterminate forms are questions**: `x/x→1`, `x²/x→0`, `x/x²→∞` are all "0/0" — the form doesn't
  determine the answer; what matters is the *rate* each part approaches its limit.
- **dl-ml-recap-and-the-learning-problem** — **learning minimizes an unseen expected loss**: you optimize empirical loss as a
  proxy for true risk; overfitting is the gap, and every ML technique keeps the proxy honest.
Authored with `String.raw` LaTeX (`\lt` for the angle/order signs); injected byte-stably with round-trip +
even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 4 / 9 / 12 / 0 spans — the learning-problem one is
intentionally prose; the `&lt;` BST ordering renders clean) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12
routes)**. No save-shape change. SW cache `atlas-v308` → `atlas-v309`.

## iter 368 — Transformer-block schematic — 81st widget (visualizations)
`l-transformer-block` had no widget — and the transformer block is *the* architecture in modern ML. Added the **81st Lab widget
`llm-transformer-block`**, embedded there: a labeled schematic of the **residual stream** rising from token+positional
embeddings through **Multi-Head Self-Attention** (Add & Norm) then a **Feed-Forward MLP** (Add & Norm) to the next block, with
gold dashed **residual skip** arrows around each sublayer. A **toggle** highlights each sublayer and explains its role —
attention *communicates* across tokens, the FFN *computes* per token (≈⅔ of the parameters). Pairs with the
"mix-then-think" deep-dive on the same lesson. Plain-unicode note (no `$`). app.js `viz-complete` fallback 80 → 81.
Verified: gate ALL GREEN (**81 widgets**, embed resolves); **via `--dump-dom`** the toggle drives the attention/FFN notes
(communicate ↔ compute), `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**.
No save-shape change. SW cache `atlas-v307` → `atlas-v308`.

## iter 367 — Three more code exercises across LLM/LA/algo (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across LLM/LA/algo (lessons-with-code 69 → **72**; the gate now runs **67**):
- **l-positional-encoding** — **sinusoidal PE** `sin(pos/10000^(2i/d))`: position 1, dim 0 → `0.84` (= `sin(1)`; low dims wiggle
  fast, high dims slowly).
- **la-matrix-derivative-identities** — **the quadratic-form gradient** `∇(xᵀAx) = 2Ax` (A symmetric): `[[2,1],[1,2]]`, `[1,1]`
  → `6 6`.
- **a-network-flow** — **the augmenting-path bottleneck** (Ford-Fulkerson): `min[4,7,3,5]` → `3`, the most flow a path can push
  in one step.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**67 code-exercises verified**); **via `--dump-dom`** the quadratic-gradient widget runs → `6 6`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v306` → `atlas-v307`.

## iter 366 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across algo/calc/LA (examples 346 → **349**, all ⌘K-searchable):
- **a-np-completeness** — **verify-vs-solve is the heart of NP**: a Subset-Sum certificate checks in `O(n)`, but brute force tries
  `2ⁿ` subsets (`2⁴⁰ ≈ 1.1×10¹²`); P = solvable, NP = verifiable, and the gap is the open P-vs-NP question.
- **c-functions-and-graphs** — **composition shrinks the domain**: `(f∘g)(x)=√(x−4)`, domain `[4,∞)`, `(f∘g)(8)=2`; the output of
  `g` must be a legal input to `f` — the same nesting the chain rule differentiates.
- **la-basis-dimension** — **why dimension is well-defined**: every basis of `ℝ³` has exactly 3 vectors — 2 can't span, 4 must be
  dependent; a basis is the "Goldilocks" set, so dimension is unambiguous and coordinates unique.
Every value node-verified (`2⁴⁰`; `(f∘g)(8)=2`; span/independence counts); injected byte-stably with round-trip + even-`$` +
tag-balance + unsupported-env pre-guards.
Verified: gate ALL GREEN (**349 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX (91 / 71 / 63
spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v305` → `atlas-v306`.

## iter 365 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables on foundational lessons across algo/LA/PS/calc (deep-dives 121 → **125**):
- **a-hash-tables** — **O(1) lookup by turning keys into addresses**: a hash function maps key → slot; collisions are inevitable
  (pigeonhole) so chaining/probing + the load factor `α=n/m` (`O(1+α)`) govern the speed-space tradeoff.
- **la-matrices-as-transformations** — **a matrix's columns are where the basis vectors land**: read the transformation off the
  columns; linearity does the rest — `[[0,−1],[1,0]]` is a 90° rotation.
- **ps-t-tests** — **why t, not z, for small samples**: plugging sample `s` for `σ` adds uncertainty → heavier tails set by the
  degrees of freedom `n−1`; as `n→∞`, t → normal. An honesty adjustment, not a rule.
- **c-derivative-definition** — **the derivative is a secant in the limit**: `f'(a)=lim (f(a+h)−f(a))/h`; the secant pivots to
  the tangent as `h→0`, resolving the "instantaneous rate" paradox without dividing by zero.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 6 / 11 / 13 / 10 spans) with **kErr=0, rawDollar=0**;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v304` → `atlas-v305`.

## iter 364 — PPO clipped-surrogate visualizer — 80th widget (visualizations)
`rl-trpo-ppo` had no widget. Added the **80th Lab widget `rl-ppo-clip`**, embedded there: PPO's objective
`min(r·A, clip(r,1−ε,1+ε)·A)` plotted against the policy ratio `r` (ε=0.2), with the raw `r·A` line faint behind it and the
clip boundaries marked. Toggle the **advantage sign**: for a good action (`A>0`) the objective rises then **flattens at r=1.2**
(capping the update); for a bad action (`A<0`) it's **floored at r=0.8** but keeps falling past r=1.2, **unclipped** — the
deliberate asymmetry that still pushes hard to undo a mistake. Plain-unicode/entity note (no `$`). app.js `viz-complete`
fallback 79 → **80**.
Verified: gate ALL GREEN (**80 widgets**, embed resolves); **node** prototype confirmed the clip (A=+1 caps at 1.20; A=−1 floors
at −0.80 yet reaches −1.60 at r=1.6); **via `--dump-dom`** the toggle drives the positive-clip and negative-asymmetry notes,
`rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v303` → `atlas-v304`.

## iter 363 — Three more code exercises across RL/PS/DL (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across RL/PS/DL (lessons-with-code 66 → **69**; the gate now runs **64**):
- **rl-actor-critic** — **the advantage (TD error)** `A = r + γ·V(s′) − V(s)`: `1 + 0.9·5 − 4` → `1.50` (better than expected →
  reinforce the action).
- **ps-t-tests** — **the one-sample t-statistic** `(x̄−μ₀)/(s/√n)` (sample std `s`): `(52−50)/(8/4)` → `1.00`.
- **dl-rnn-lstm-gru** — **one RNN time-step** `h = tanh(w_h·h_prev + w_x·x + b)`: from h=0, x=1 → `tanh(1) = 0.76` (hidden state
  carries memory).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**64 code-exercises verified**); **via `--dump-dom`** the RNN-step widget runs → `0.76`
("✓ Output matches expected"; `Math.tanh` works in-browser); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v302` → `atlas-v303`.

## iter 362 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across algo/calc/PS (examples 343 → **346**, all ⌘K-searchable):
- **a-recurrences-master-theorem** — **Case 2 (mergesort)**: `T(n)=2T(n/2)+O(n)`, `a=b^d` (2=2¹) → work spreads evenly across
  `log n` levels → `Θ(n log n)` — the balanced regime behind every optimal comparison sort.
- **c-continuity** — **a jump discontinuity can't be patched**: a piecewise `f` with left-limit `1 ≠` right-limit `3` — the
  two-sided limit doesn't exist, so no `f(1)` value fixes it (vs a removable hole, which one redefinition mends).
- **ps-p-values** — **multiple comparisons**: 20 tests at `α=0.05`, all nulls true → `1−0.95²⁰ ≈ 0.642`, a 64% chance of a
  false "discovery"; the engine of p-hacking, why Bonferroni (`α/m`) exists.
Every value node-verified (Case 2 a=b^d; `1≠3` jump; `0.642`); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards (the `cases` env is KaTeX-supported; `\lt`/`\ge` inside it).
Verified: gate ALL GREEN (**346 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX (87 / 78 / 30
spans) and **kErr=0, rawDollar=0** (the `cases` env renders clean); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v301` → `atlas-v302`.

## iter 361 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables across DL/RL/LA/calc (deep-dives 117 → **121**):
- **dl-pretraining-and-finetuning-paradigm** — **pretrain once, adapt cheaply**: generic features are amortized across tasks, so
  fine-tuning needs far less data/compute — representations transfer (the foundation-model recipe).
- **rl-mdp-formalism** — **the Markov property makes RL tractable**: the present state being a sufficient statistic is what lets
  `V(s)` depend on `s` alone and the Bellman equations exist; bad RL is often a non-Markov state.
- **la-diagonalization** — **`A^k = PD^kP⁻¹` makes powers trivial**: in the eigenvector basis a matrix is a diagonal scaling, so
  `A^k v = Σλᵢᵏcᵢvᵢ` — largest `|λ|` dominates (PageRank, steady states, stability).
- **c-fundamental-theorem** — **the two halves of calculus are inverses**: `d/dx ∫ₐˣf = f` and `∫ₐᵇf = F(b)−F(a)` — accumulating
  a rate recovers the total, turning an infinite-sum into an algebra problem.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 3 / 17 / 4 spans — pretraining is intentionally
prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v300` → `atlas-v301`.

## iter 360 — Step-back: full kErr/route + coverage audit (clean) + precision-recall threshold viz — 79th widget (visualizations)
**Round-number step-back (iter 360).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **96 non-lesson routes** (courses, Lab + 79 widgets, every utility page) → errs=0, kErr=0. **244 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**343**), ≥8 MCQs (2368 total), ≥1 flashcard (889),
  ≥1 homework (442) — **0 structurally-thin lessons**. (117 deep-dive lessons, 66 code-exercise lessons.)
**Reflection (351–359):** steady code/content/examples/viz rotation — all verified and pushed, no bugs; the gate hardening (330)
and kErr-audit discipline have held across 60 iterations since the 300 step-back.
**The ship.** `dl-practical-training-and-debugging` (covers evaluation) had no widget — added the **79th Lab widget
`ml-threshold`**: two overlapping score distributions (negatives `N(−1,1)`, positives `N(+1,1)`) with a movable decision
threshold. Slide it and watch **precision climb as recall drops** — `t=−1`: R `0.98` / P `0.66`; `t=0`: `0.84/0.84`; `t=1`:
`0.50/0.96` — with F1 peaking at the balance point. The fundamental classification tradeoff, made tangible. erf-based normal CDF;
plain-unicode note (no `$`). app.js `viz-complete` fallback 78 → 79. SW cache hits **`atlas-v300`**.
Verified: gate ALL GREEN (**79 widgets**, embed resolves); **node** prototype confirmed the metrics; **via `--dump-dom`** the
slider drives recall `0.98→0.84→0.50` and precision `0.66→0.84→0.96`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; both
step-back sweeps clean; embed-route smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v299` → `atlas-v300`.

## iter 359 — Three more code exercises across algo/DL/RL (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across algo/DL/RL (lessons-with-code 63 → **66**; the gate now runs **61**):
- **a-recurrences-master-theorem** — **the critical exponent** `log_b(a)`: `a=8, b=2` → `3.00`; compare to `d` to pick the case.
- **dl-embeddings-and-tokenization** — **cosine similarity** `a·b/(|a||b|)`: `[3,4]·[4,3]` → `0.96` (nearly the same direction).
- **rl-value-approximation** — **linear value approximation** `V(s)=w·φ(s)`: weights `[0.5,−0.2,1.0]` · features `[2,3,1]` → `1.40`.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**61 code-exercises verified**); **via `--dump-dom`** the value-approx widget runs → `1.40`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v298` → `atlas-v299`.

## iter 358 — Chain-rule visualizer — 78th widget (visualizations)
`c-chain-rule` had no widget — and it's the foundation of backprop. Added the **78th Lab widget `calc-chain`**, embedded
there: the curve `y = sin²x = f(g(x))` with `g(x)=sin x`, `f(u)=u²`. Slide **x** and the gold tangent's slope `dy/dx` is shown
to equal the **product of the rates** — the inner rate `g′=cos x` times the outer rate `f′(g)=2·sin x` — live, with both
factors and the product matching the slope. The "aha": a nudge in x is scaled by `g′` into u, then by `f′` into y, so the
rates multiply (exactly how backprop chains them). Plain-unicode note (no `$`). app.js `viz-complete` fallback 77 → 78.
Verified: gate ALL GREEN (**78 widgets**, embed resolves); **node** prototype confirmed `dy/dx = (2 sin x)(cos x) = sin 2x`;
**via `--dump-dom`** at x=0.78 the tangent slope `1.000` equals the rate product `1.000`, `rawDollar=0`, `errs=0`, the lesson
embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v297` → `atlas-v298`.

## iter 357 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across PS/calc/DL (examples 340 → **343**, all ⌘K-searchable):
- **ps-uniform-exponential** — **the exponential is memoryless**: `P(X>5|X>3) = e⁻¹ ≈ 0.368`, identical to a fresh `P(X>2)`;
  constant hazard rate, the only continuous distribution with this property.
- **c-antiderivatives** — **the power rule's n=−1 exception**: `x^(n+1)/(n+1)` hits `÷0` at `n=−1`, filled by `∫(1/x)dx = ln|x|+C`
  — why `ln` appears throughout calculus.
- **dl-activation-functions** — **why sigmoid saturates**: `σ'(0)=0.25` vs `σ'(5)≈0.0066` (38× smaller); multiplied through depth
  → the vanishing gradient, which ReLU (gradient 1) dodges.
Every value node-verified (e⁻¹; ÷0 → ln; 0.25 vs 0.0066); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards (`\lt`/`\gt`).
Verified: gate ALL GREEN (**343 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(32 / 68 / 92 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v296` → `atlas-v297`.

## iter 356 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables across algo/calc/RL/LA (deep-dives 113 → **117**):
- **a-arrays-lists-stacks-queues** — **array vs linked list = a memory-layout tradeoff**: contiguous gives `O(1)` access +
  cache speed but `O(n)` mid-edits; linked gives `O(1)` edits but `O(n)` access + pointer-chasing.
- **c-optimization** — **∇f=0 is necessary, not sufficient**: it flags minima, maxima, *and* saddles; the second-order
  condition + boundary checks (or convexity) finish the job.
- **rl-imitation** — **why behavioural cloning drifts**: per-step error compounds (≈`T²`) as the agent strays into states the
  expert never visited; DAgger + inverse RL restore the broken i.i.d. assumption.
- **la-matrix-calculus-backprop** — **backprop = chain rule in the cheap multiplication order**: a scalar loss makes
  right-to-left (reverse-mode) Jacobian-vector products vastly cheaper — all gradients at ~one forward pass.
Authored with `String.raw` LaTeX (`\lt`/`\gt` for the second-order signs); injected byte-stably with round-trip +
even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 7 / 4 / 3 / 2 spans) with **kErr=0, rawDollar=0**;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v295` → `atlas-v296`.

## iter 355 — Three more code exercises across DL/LLM lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** across DL/LLM (lessons-with-code 60 → **63**; the gate now runs **58**):
- **dl-attention-mechanism** — **scaled dot-product attention weights** `softmax(q·kᵢ/√d)`: a query aligned with the first key
  → `0.67 0.33` (more weight on the matching key).
- **dl-overfitting-and-regularization** — **L2 / weight-decay loss** `loss + λΣwᵢ²`: `1.0 + 0.01·25` → `1.25`.
- **l-tokenization-bpe** — **the BPE merge step**: count adjacent pairs, return the most frequent → `ab` (the next merge).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**58 code-exercises verified**); **via `--dump-dom`** the attention widget runs → `0.67 0.33`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v294` → `atlas-v295`.

## iter 354 — Gradient-descent convergence visualizer — 77th widget (visualizations)
`c-gradient-descent-convergence` had no widget. Added the **77th Lab widget `calc-gd`**, embedded there: gradient descent on
`f(x)=x²` from x=2, with the update `x ← x(1−2η)` drawn as a trajectory walking the parabola. Slide the **learning rate η**
and watch the four regimes the convergence condition `|1−2η| < 1` predicts: **η<0.5** converges slowly, **η=0.5** lands in one
jump, **0.5<η<1** oscillates inward, **η≥1** diverges outward — the same blow-up that wrecks real training at too-high LR. The
note reports `|1−2η|` and the regime. Plain-unicode/entity note (no `$`). app.js `viz-complete` fallback 76 → 77.
Verified: gate ALL GREEN (**77 widgets**, embed resolves); **node** prototype confirmed the trajectories (lr 0.1 slow, 0.5
one-step, 0.9 oscillating, 1.1 diverging); **via `--dump-dom`** the slider drives the regime `slow → one-step → oscillate →
diverge`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v293` → `atlas-v294`.

## iter 353 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across calc/LLM/PS (examples 337 → **340**, all ⌘K-searchable):
- **c-derivatives-special-functions** — **logarithmic differentiation of `xˣ`**: `ln y = x ln x` → `y'/y = ln x + 1` →
  `y' = xˣ(ln x + 1)`, `≈ 6.77` at `x=2` — the move for variable base-and-exponent.
- **l-pretraining-objective-data** — **perplexity** `= e^H`: a cross-entropy of `2.0` nats → `≈ 7.39`, the *effective branching
  factor* (choosing among ~7.4 equally likely tokens); why exponentiate log-space loss to a linear "number of choices."
- **ps-errors-and-power** — **power = 1−β and its four levers**: `β=0.20` → power `0.80`; raise it via larger `n`, bigger effect,
  higher `α`, or less noise — with the `α`/`β` tension that only more data resolves.
Every value node-verified (6.77; e²≈7.39; 0.80); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards.
Verified: gate ALL GREEN (**340 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(65 / 67 / 37 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v292` → `atlas-v293`.

## iter 352 — Four more deeper-dives on flagship hard lessons (content / understandability)
4 "Deeper dive" expandables across algo/DL/PS/calc (deep-dives 109 → **113**):
- **a-graph-representations-traversal** — **BFS vs DFS = queue vs stack**: a FIFO queue fans out level-by-level (shortest
  paths); a LIFO stack dives deep (topo sort, cycle detection, components) — one traversal, swap the frontier; both `O(V+E)`.
- **dl-learning-rate-schedules-and-tuning** — **why warmup then decay**: warmup avoids early blow-up on noisy random-init
  gradients (and unreliable Adam variance estimates); decay settles into the minimum — cautious → confident → gentle.
- **ps-bernoulli-binomial** — **where `C(n,k)p^k(1−p)^(n−k)` comes from**: `p^k(1−p)^(n−k)` is one ordering's probability,
  `C(n,k)` counts the orderings — the coefficient exists only because we count *how many* successes, not *which*.
- **c-linearization-lhopital** — **why L'Hôpital works**: near a `0/0` point each function ≈ its tangent line, the `(x−a)`
  factors cancel, leaving the ratio of slopes `f'(a)/g'(a)` — `0/0` just means "depends how fast each goes to zero."
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 1 / 0 / 12 / 14 spans — BFS/DFS & warmup are
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v291` → `atlas-v292`.

## iter 351 — Three more code exercises — lessons-with-code past 60 (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across LA/DL/RL (lessons-with-code
57 → **60**; the gate now runs **55**):
- **la-svd** — **singular values from `AᵀA`**: `σ = √eigenvalues` — `[16,9]` → `4 3`, the stretch factors of the map.
- **dl-initialization-and-vanishing-gradients** — **He initialization**: weight std `√(2/fan_in)` — `fan_in=128` → `0.1250`
  (wider layers get a smaller std to keep signal variance stable).
- **rl-policy-gradient-theorem** — **REINFORCE gradient**: scale the score by the return, `G·∇log π` — `G=2`, score `[0.5,−0.3]`
  → `1.0 -0.6`.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**55 code-exercises verified**); **via `--dump-dom`** the He-init widget runs → `0.1250`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v290` → `atlas-v291`.

## iter 350 — Step-back: full kErr/route + coverage audit (clean) + critical-point viz — 76th widget (visualizations)
**Round-number step-back (iter 350).** Two health audits, both clean:
- **Runtime kErr+route sweep**: all **148 lessons** (revealing every example, opening every deep-dive) → errs=0, kErr=0, 0 bad;
  all **93 non-lesson routes** (courses, Lab + 76 widgets, every utility page) → errs=0, kErr=0. **241 routes green.**
- **Structural coverage audit**: every one of 148 lessons has ≥2 examples (**337** total), a uniform **16 MCQs** (2368), ≥1
  flashcard (889) and ≥1 homework (442) — **zero gaps**. The codex is structurally complete and uniform.
**Reflection (341–349):** steady 3-per-modality across examples/code/content/viz — all verified and pushed, no bugs; the gate
hardening (330) and kErr-audit discipline have held. Non-content compass areas remain saturated, so the loop's value is now
incremental depth + the occasional fresh viz.
**The ship.** `c-multivariable-optimization` had no widget — added the **76th Lab widget `calc-saddle`**: a heatmap of `f(x,y)`
around the origin critical point with three presets — **Bowl** (`x²+y²`, Hessian eigenvalues +,+ → minimum), **Saddle**
(`x²−y²`, +,− → saddle), **Dome** (`−x²−y²`, −,− → maximum). The note ties the classification to the sign pattern of the
Hessian's eigenvalues. Plain-unicode note (no `$`). app.js `viz-complete` fallback 75 → 76.
Verified: gate ALL GREEN (**76 widgets**, embed resolves); **via `--dump-dom`** the presets drive the classification
`saddle → min (Bowl) → max (Dome)`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; both step-back sweeps clean;
embed-route smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v289` → `atlas-v290`.

## iter 349 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across calc/PS/RL (examples 334 → **337**, all ⌘K-searchable):
- **c-implicit-related-rates** — **the expanding balloon**: `dV/dt = 4πr² dr/dt` → at `r=5`, `dr/dt = 100/(100π) = 1/π ≈ 0.318`
  cm/s; constant inflation means the radius grows *slower* as the balloon enlarges (`dr/dt ∝ 1/r²`).
- **ps-geometric-waiting** — **expected wait & survival**: `E[X] = 1/p = 6` rolls for a six; `P(X>3) = (5/6)³ ≈ 0.579`; the
  one-line `E[X] = 1 + (1−p)E[X]` derivation.
- **rl-value-iteration** — **value iteration as a contraction**: on a self-loop `V = 1 + 0.9V`, sweeps `0→1→1.9→2.71 → 10`,
  the error shrinking `×γ` each pass (`10,9,8.1,7.29`) — Banach guarantees the unique fixed point `V*=10`.
Every value node-verified (1/π; E[X]=6 & 0.579; error ×0.9 to V*=10); injected byte-stably with round-trip + even-`$` +
tag-balance + unsupported-env pre-guards (`\lt` for `γ<1`).
Verified: gate ALL GREEN (**337 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(56 / 34 / 22 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v288` → `atlas-v289`.

## iter 348 — Bias-variance tradeoff visualizer — 75th widget (visualizations)
`ps-point-estimation` had no widget. Added the **75th Lab widget `ps-estimator`**, embedded there: for a shrinkage estimator
`θ̂=(1−λ)X` (true θ=5, var=4), it plots **bias²** (rust, rising), **variance** (violet, falling), and their sum **MSE** (gold,
U-shaped) against the shrinkage λ. Slide λ and the decomposition updates; a marker sits on the **MSE minimum**. The payoff is
visible: the unbiased estimator (λ=0) has MSE `4.00`, but the minimum at λ≈`0.14` reaches `3.45` — a little bias buys a big
cut in variance. Plain-unicode note (no `$`). app.js `viz-complete` fallback 74 → 75.
Verified: gate ALL GREEN (**75 widgets**, embed resolves); **node** prototype confirmed the curve (min MSE 3.45 < 4 at
λ*=8/58≈0.138); **via `--dump-dom`** the slider drives MSE `4.00 (λ=0) → 3.45 (λ=.14) → 7.25 (λ=.5)`, minimum below unbiased,
`rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v287` → `atlas-v288`.

## iter 347 — Four more deeper-dives on flagship hard lessons (content / understandability)
4 "Deeper dive" expandables across RL/algo/LLM/calc (deep-dives 105 → **109**):
- **rl-eligibility-traces** — **TD(λ) dials between TD and Monte Carlo**: a fading trace decaying by `γλ` spreads credit
  backward; `λ=0` is TD(0), `λ=1` is MC — a bias-variance knob built into credit assignment.
- **a-comparison-sorts** — **quicksort vs mergesort, same Θ(n log n)**: quicksort in-place + cache-friendly (but `O(n²)`
  worst case); mergesort stable + guaranteed `O(n log n)` (but `O(n)` space) — the tie breaks on constants/memory/stability.
- **l-safety-and-frontier** — **alignment is a proxy problem**: we optimize a reward-model proxy, not true intent; Goodhart →
  reward hacking, sycophancy, fluent falsehoods — no malice needed, just a misspecified objective.
- **c-extrema-curve-sketching** — **f' and f'' draw the whole shape**: `f'` sign gives rise/fall + critical points, `f''` sign
  gives concavity + inflection points — calculus as a recipe for sketching curves.
Authored with `String.raw` LaTeX (`\lt`/`\gt` for the derivative-sign inequalities); injected byte-stably with round-trip +
even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 5 / 5 / 0 / 13 spans — the proxy one is
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v286` → `atlas-v287`.

## iter 346 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across LA/calc/PS (lessons-with-code
54 → **57**; the gate now runs **52**):
- **la-low-rank-pca** — **PCA explained variance**: top-k eigenvalues over total — `[5,3,1,1]`, k=2 → `0.80` (2 of 4 components
  keep 80% of the variance).
- **c-gradient-directional** — **directional derivative** `∇f·û`: in the gradient's own direction `[3,4]` → `5.00` = `|∇f|`,
  the steepest-ascent rate.
- **ps-sampling-distributions** — **standard error of the mean** `σ/√n`: σ=20, n=100 → `2.00` (the √n law — 4× data to halve it).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**52 code-exercises verified**); **via `--dump-dom`** the PCA widget runs → `0.80`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v285` → `atlas-v286`.

## iter 345 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across LA/calc/RL (examples 331 → **334**, all ⌘K-searchable):
- **la-four-subspaces-rank** — **the four subspaces fit together by the numbers**: a `3×5` rank-2 matrix → col/row dim `2`,
  null dim `3`, left-null dim `1`; row+null `= 5 = n`, col+left-null `= 3 = m` (orthogonal complements filling each space).
- **c-differentiation-rules** — **the product rule** `(uv)' = u'v + uv'` (not `u'v'`): `x²sin x → 2x sin x + x² cos x`, with the
  rectangle-area intuition for why the two strips add.
- **rl-exploration** — **UCB: optimism under uncertainty**: `x̄ + c√(ln t / nₐ)` scores arm 2 (`1.615`) over arm 1 (`1.099`)
  despite a lower mean, because its bonus from few pulls is larger — regret grows only like `ln t`.
Every value node-verified (dims sum to n,m; product-rule derivative; UCB 1.615 > 1.099); injected byte-stably with round-trip +
even-`$` + tag-balance + unsupported-env pre-guards.
Verified: gate ALL GREEN (**334 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(58 / 46 / 122 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v284` → `atlas-v285`.

## iter 344 — Hypothesis-test visualizer — 74th widget (visualizations)
`ps-hypothesis-testing-logic` had no widget. Added the **74th Lab widget `ps-hyptest`**, embedded there: the standard-normal
null distribution with the two-tailed **rejection region** `|z| > 1.96` (α=0.05) shaded in rust. Slide the **observed z** and
the **p-value** — the violet tail area `P(|Z| ≥ |z|)` — updates live, along with the **reject / fail-to-reject** decision.
The note hammers the correct reading: the p-value is the chance of data this extreme *if* H₀ were true, not the chance H₀ is
true. Standard-normal CDF computed via an erf approximation (Φ(1.96)=0.975 → p=0.05). Plain-unicode/entity note (no `$`).
app.js `viz-complete` fallback 73 → 74.
Verified: gate ALL GREEN (**74 widgets**, embed resolves); **node** prototype confirmed the CDF (p(1.96)=0.050, p(2.58)=0.010);
**via `--dump-dom`** the slider drives p `0.317 (z=1) → 0.051 (z→1.95, fail) → 0.009 (z=2.58)`, z=3 → **REJECT**, `rawDollar=0`,
`errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v283` → `atlas-v284`.

## iter 343 — Four more deeper-dives on foundational lessons (content / understandability)
4 "Deeper dive" expandables across DL/algo/PS/calc (deep-dives 101 → **105**):
- **dl-the-artificial-neuron-and-mlp** — **one neuron is logistic regression; many are a universal approximator**: each unit is
  weighted-sum-then-squash; composition (not a new kind of arithmetic) is what makes a hidden layer approximate any function.
- **a-asymptotic-analysis** — **why Big-O throws away constants**: the fastest-growing term dominates for large `n`, so
  `5n²+100n+9000 = O(n²)`; an `O(n log n)` sort eventually beats `O(n²)` whatever the constants.
- **ps-expectation-variance** — **expectation always adds; variance is pickier**: `E[X+Y]=E[X]+E[Y]` always, but
  `Var(X+Y)` needs `Cov=0` and `Var(aX+b)=a²Var(X)` — the asymmetry behind the `1/n` shrinkage of an average's variance.
- **c-definite-integral-riemann** — **the integral is a limit of rectangles**: `∫ = lim Σ f(xᵢ)Δx`; the `∫` is a stretched "S"
  for sum — addition taken to a limit, which is why the Fundamental Theorem is so surprising.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 3 / 18 / 9 / 13 spans) with **kErr=0, rawDollar=0**;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v282` → `atlas-v283`.

## iter 342 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across PS/calc/LLM (lessons-with-code
51 → **54**; the gate now runs **49**):
- **ps-confidence-intervals** — **margin of error** `z·(σ/√n)`: z=1.96, σ=10, n=100 → `1.96` (the CI is `x̄ ± 1.96`).
- **c-multivariable-optimization** — **Hessian second-derivative test** `D = f_xx·f_yy − f_xy²`: for `x²+xy+y²` → `3`
  (`D>0`, `f_xx>0` ⇒ local minimum).
- **l-optimization-and-stability** — **gradient clipping by norm**: a gradient of norm 5 capped at 1 → `0.6 0.8` (same
  direction, magnitude rescaled).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**49 code-exercises verified**); **via `--dump-dom`** the gradient-clip widget runs → `0.6 0.8`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v281` → `atlas-v282`.

## iter 341 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across algo/calc/LA (examples 328 → **331**, all ⌘K-searchable):
- **a-trees-heaps** — **a heap needs no pointers**: 0-indexed array, node `i` → parent `⌊(i−1)/2⌋`, children `2i+1`, `2i+2`;
  for `i=3` that's parent `1`, children `7, 8` — a complete tree maps to memory as pure arithmetic.
- **c-computing-limits** — **limits at infinity**: divide by the highest power → `(3x²+2x)/(x²−5) → 3` (ratio of leading
  coefficients for equal degrees); lower-degree top → `0`, higher → `±∞`.
- **la-symmetric-spectral** — **spectral decomposition as a sum of rank-1 projections**: `A = Σλᵢqᵢqᵢᵀ`; for `[[2,1],[1,2]]`,
  `3·½[[1,1],[1,1]] + 1·½[[1,−1],[−1,1]]` reconstructs `A` — the engine behind PCA and matrix functions.
Every value node-verified (parent 1/children 7,8; limit 3; matrix reconstructs); injected byte-stably with round-trip +
even-`$` + tag-balance + unsupported-env pre-guards (the matrix displays use `bmatrix`, which KaTeX supports).
Verified: gate ALL GREEN (**331 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(109 / 44 / 43 spans) and **kErr=0, rawDollar=0** (the matrix-heavy spectral example renders clean); all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v280` → `atlas-v281`.

## iter 340 — Step-back: full kErr+route sweep (clean) + greedy activity-selection viz — 73rd widget (visualizations)
**Round-number step-back (iter 340).** Health sweep (the kErr audit the 329/330 landmine made routine):
- **All 148 lessons** — revealing every example, opening every deep-dive → **errs=0, kErr=0, 0 bad**.
- **All 90 non-lesson routes** (courses, Lab + 73 widgets, every utility page) → **errs=0, kErr=0, bad=none**. **238 routes green.**
**Reflection (331–339):** content/dd ×3 (deep-dives crossed **100**), examples ×2, code ×2, viz, + a discoverability amplify
(examples searchable) — healthy rotation; all verified and pushed; the 330 gate-hardening held (zero kErr escapes). Most-neglected
compass area was **animations/viz interactivity** (last fresh viz mechanic a while back), so the paired ship is an interactive
algo viz.
**The ship.** `a-greedy` had no widget — added the **73rd Lab widget `algo-greedy`** (greedy activity selection), embedded
there: five activities as bars on a timeline, **Step** through them in finish-time order — each is selected (sage) if it starts
at/after the last pick's finish (the gold line), else skipped (rust). The greedy earliest-finish rule selects the maximum **3**
non-overlapping activities, visibly rejecting the tempting long interval `E[1,9]` that alone would block everything. Plain-unicode
note (no `$`). app.js `viz-complete` fallback 72 → 73.
Verified: gate ALL GREEN (**73 widgets**, embed resolves); **node** prototype confirmed the selection (A,C,D = 3); **via
`--dump-dom`** Step→1, Run→3 selected, `rawDollar=0`, `errs=0`, the lesson embed hydrates; both step-back sweeps clean;
embed-route smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v279` → `atlas-v280`.

## iter 339 — Four more deeper-dives — past 100 (content / understandability)
4 "Deeper dive" expandables across DL/RL/algo/PS take the codex past a milestone (deep-dives 97 → **101**):
- **dl-activation-functions** — **without nonlinearity, depth is an illusion**: stacked linear layers collapse to one affine
  map (`W₂W₁`); the activation between them is the entire reason depth buys expressiveness.
- **rl-value-approximation** — **the deadly triad**: function approximation + bootstrapping + off-policy together can make the
  update a non-contraction and diverge; DQN's target network + replay buffer defuse exactly those three.
- **a-binary-search** — **the invariant and the bugs that ignore it**: target stays in `[lo,hi]`; `lo=mid` (not `mid+1`) loops
  forever, and `(lo+hi)/2` overflows — `lo+(hi−lo)/2` doesn't.
- **ps-normal-distribution** — **why the normal is everywhere**: the CLT (additive randomness), maximum entropy (least-assuming
  for a given mean/variance), and convenience (closed under sums, the 68–95–99.7 rule).
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 6 / 0 / 9 / 10 spans — the deadly-triad one is
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v278` → `atlas-v279`.

## iter 338 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across LA/PS/RL (lessons-with-code
48 → **51**; the gate now runs **46**):
- **la-orthonormal-gram-schmidt** — **Gram-Schmidt**: subtract `v2`'s projection onto `u1` → `[1,0]` vs `[1,1]` gives
  `u2 = 0.5 -0.5`, now orthogonal (`u1·u2 = 0`).
- **ps-hypothesis-testing-logic** — **z-test statistic** `(x̄−μ₀)/(σ/√n)`: sample mean 52 under H₀ μ=50, σ=10, n=100 → `2.00`
  (two SEs above, beyond ±1.96 → reject at 5%).
- **rl-policy-iteration** — **greedy policy improvement**: pick `argmax Q(s,a)` over `[3,7,2,5]` → `1`.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**46 code-exercises verified**); **via `--dump-dom`** the greedy-action widget runs → `1`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v277` → `atlas-v278`.

## iter 337 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across DL/calc/RL (examples 325 → **328**, all now ⌘K-searchable):
- **dl-convolution-operation** — **two 3×3 convs beat one 5×5**: same `5×5` receptive field, but `2×9=18` weights vs `25`
  (and a ReLU between them adds nonlinearity) — the VGG insight behind `3×3` as the default.
- **c-derivative-definition** — **a corner where the derivative fails**: `|x|` at `0` has right-limit `+1`, left-limit `−1`;
  the two-sided limit disagrees, so `f'(0)` doesn't exist — continuity isn't enough for differentiability.
- **rl-td-learning** — **TD vs Monte Carlo targets** on one step: MC aims at the actual return `G=3` (unbiased, high-variance);
  TD bootstraps `r+γV(s')=5.5` (lower-variance, biased) — same update form, different target.
Every value node-verified (18<25; ±1 corner; 5.5 vs 3); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards (`\lt`/`\gt` for the one-sided limits).
Verified: gate ALL GREEN (**328 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(119 / 57 / 74 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v276` → `atlas-v277`.

## iter 336 — Worked examples are now searchable + tab deep-linking (workflow / discoverability)
The ⌘K palette indexed lessons, viz, glossary, and full-text lesson *bodies* — but worked examples live in `l.examples`
(rendered in the Examples tab), not `l.content`, so **all 325 examples were invisible to search**. Fixed two ways:
- **Lesson tabs are now deep-linkable** via a 4th hash segment — `#/lesson/<course>/<lesson>/<tab>` (e.g. `…/examples`,
  `…/quiz`). The router passes it through and the lesson view opens that tab instead of always defaulting to the lecture
  (falls back to lecture for an unknown/absent segment).
- **All 325 worked examples are indexed** in ⌘K (`📐 Example · <lesson>`), each linking to `…/examples` so picking one
  lands directly on the lesson's Examples tab — surfacing a large asset that was previously only reachable by opening a
  lesson and clicking the tab.
Verified: gate ALL GREEN; **via `--dump-dom`** `#/lesson/calculus/c-optimization/examples` opens with `activeTab=examples`
and 3 example items; the ⌘K palette typing "Maximizing area" returns an `Example`-labelled result; all-routes smoke incl.
`/examples` + `/quiz` deep-links **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v275` → `atlas-v276`.

## iter 335 — Four more deeper-dives on flagship hard lessons (content / understandability)
4 "Deeper dive" expandables across DL/DL/LLM/algo (deep-dives 93 → **97**):
- **dl-convolution-operation** — **weight-sharing + locality**: a conv layer is a restricted matmul (`3×3` = 9 weights, not
  millions); the local+shared restriction is the inductive bias that makes it translation-equivariant and data-efficient.
- **dl-practical-training-and-debugging** — **the order to debug**: overfit a tiny batch first (isolates code bugs), check the
  initial loss (`≈ ln C`), *then* tune the learning rate — top-down (code → data → optimization → capacity).
- **l-decoding-strategies** — **temperature/top-k/top-p as three knobs on one trade-off**: `T` reshapes the whole distribution,
  top-k/top-p truncate its tail; they compose along the coherence-vs-diversity dial.
- **a-shortest-paths-topo** — **why Dijkstra needs non-negative edges**: greedy settling is valid only if no detour can
  shorten a settled distance; negatives break it → Bellman-Ford relaxes `V−1×` at `O(VE)` (DAGs: one topo pass, `O(V+E)`).
Authored with `String.raw` LaTeX (`\lt`/`\gt` for the temperature inequalities); injected byte-stably with round-trip +
even-`$`/no-`**`/tag-balance + unsupported-env guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 2 / 2 / 9 / 4 spans) with **kErr=0, rawDollar=0**;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v274` → `atlas-v275`.

## iter 334 — Area-between-curves visualizer — 72nd widget (visualizations)
`c-area-volume` had no widget. Added the **72nd Lab widget `calc-area`**, embedded there: the line `y=2x` above the parabola
`y=x²` on `[0,2]`, with the region between them **shaded from 0 to a movable right edge b**. Slide `b` and the accumulated
area updates live as `∫₀ᵇ(2x−x²)dx = b²−b³/3` — `0.864` at b=1.2, `0.667` at b=1, reaching the full enclosed `4/3 ≈ 1.333`
at b=2 (where the curves meet). The note drives home the one rule: subtract the lower curve from the upper, then integrate.
Plain-unicode note (no `$`). app.js `viz-complete` fallback 71 → 72.
Verified: gate ALL GREEN (**72 widgets**, embed resolves); **node** prototype confirmed the area formula (full = 4/3); **via
`--dump-dom`** the slider drives the area `0.864 → 1.333 (b=2) → 0.667 (b=1)`, `rawDollar=0`, `errs=0`, the lesson embed
hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v273` → `atlas-v274`.

## iter 333 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across LA/RL/PS (lessons-with-code
45 → **48**; the gate now runs **43**):
- **la-projection-least-squares** — **vector projection** `(v·u/u·u)·u`, the foundation of least-squares: `[2,3]` onto
  `[1,1]` → `2.5 2.5` (the closest point on the line).
- **rl-monte-carlo** — **Monte-Carlo value estimate**: average the full-episode returns from a state (no bootstrapping) —
  `[2,0,4,2]` → `2.00`.
- **ps-conditional-expectation** — **law of total expectation** (tower rule): `E[X]=Σ E[X|group]·P(group)` — group means
  `10`/`20` with weights `0.6`/`0.4` → `14.00`.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**43 code-exercises verified**); **via `--dump-dom`** the Monte-Carlo widget runs → `2.00`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v272` → `atlas-v273`.

## iter 332 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons across calc/algo/RL (examples 322 → **325**):
- **c-optimization** — **max area, fixed perimeter**: `20 m` of fence → `A(x)=x(10−x)`, `A'=0 ⇒ x=5`, a `5×5` square with
  area `25 m²` — constraint-optimization pushes toward symmetry (existing: minimize a quadratic + a GD step).
- **a-comparison-sorts** — **the Ω(n log n) lower bound from counting leaves**: a sort's decision tree needs `n!` leaves, so
  height `≥ log₂(n!)`; for `n=4`, `log₂24 ≈ 4.58` → **≥5** comparisons; Stirling gives `Θ(n log n)` (existing: 3-element
  decision tree + merge-vs-insertion).
- **rl-mdp-formalism** — **why discounting bounds the return**: `G=Σγᵗ·1 = 1/(1−γ)`, so `γ=0.9 → 10` (finite though rewards
  never stop); `|G| ≤ r_max/(1−γ)` makes value functions well-defined (existing: model an MDP + compute a return).
Every value node-verified (25; log₂24≈4.58→5; 10 & 2); injected byte-stably with round-trip + even-`$` + tag-balance +
unsupported-env pre-guards (`\lt` used for the `<1`/`<0` to fully respect the `<`-in-math landmine).
Verified: gate ALL GREEN (**325 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(23 / 132 / 114 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v271` → `atlas-v272`.

## iter 331 — Four more deeper-dives on flagship hard lessons (content / understandability)
4 "Deeper dive" expandables across LLM/algo/PS/LA (deep-dives 89 → **93**):
- **l-transformer-block** — **mix-then-think, wrapped in residuals**: attention communicates across tokens, the FFN computes
  per-token; residual `x + Sublayer(x)` + layer-norm make depth trainable (≈⅔ of params live in the FFNs).
- **a-union-find-range** — **near-O(1) by being lazy and flat**: union-by-rank keeps trees shallow, path compression flattens
  them on every `find`; together `O(α(n))`, effectively constant.
- **ps-covariance-correlation** — **correlation = covariance with units divided out**: `ρ = Cov/(σₓσ_y) ∈ [−1,1]`; covariance
  gives direction, correlation strength — both see only *linear* structure (`ρ=0` ≠ independent).
- **la-matrix-multiplication** — **it's function composition**: `AB` = "do B then A", forced by `(AB)x=A(Bx)`; hence
  non-commutativity, the shape-matching rule, and associativity all fall out — no rule to memorize.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance + the new
unsupported-env guard.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 1 / 4 / 7 / 23 spans) with **kErr=0, rawDollar=0**;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v270` → `atlas-v271`.

## iter 330 — Step-back: full kErr + route sweep (clean) + gate hardened vs mathtools envs (workflow / broken-proofing)
**Round-number step-back (iter 330),** triggered by the iter-329 discovery that a `psmallmatrix` KaTeX error had shipped
unnoticed (static lints miss it; only `--dump-dom` kErr catches it). So this step-back's sweep was a **kErr audit**:
- **Full kErr sweep — all 148 lessons**, revealing *every* example and opening *every* deep-dive → **errs=0, kErr=0, 0 bad
  lessons**. The psmallmatrix was the *only* KaTeX error in the entire codex; all math now renders clean.
- **All non-lesson routes** (courses, Lab + all 71 widgets, review/test/map/glossary/achievements/stats/playground/library/
  notes) → **errs=0, kErr=0, bad=none**. Total **237 routes** green.
**Reflection (321–329):** content(dd) · UI/UX · code · viz · examples · content(dd) · code · viz · examples+fix — healthy
rotation across every modality plus two "amplify" UI/UX moves; all verified and pushed; one real bug found and fixed. Codex
is mature and exhaustively complete (148 lessons · 71 viz · 89 deep-dives · 322 examples · 45 code lessons · 138 glossary).
**The ship (broken-proofing the loop).** Hardened `gate.js` with an **`UNSUPPORTED_KATEX_ENV` lint** so the exact class of
bug can't recur: it flags the `[pbBvV]smallmatrix` family and starred `matrix*/cases*` variants (mathtools envs this KaTeX
build can't parse), which previously raised a real `.katex-error` invisible to the static $-parity/tag lints. Now caught at
the cheap `node gate.js` step, no Chrome needed.
Verified: gate ALL GREEN (zero false positives across the corpus — it only uses supported envs); **self-test** — reintroducing
a `psmallmatrix` makes the gate FAIL with the new message, and removing it returns to green; `gate.js` is dev-only (not in
`sw.js`), so no cache bump. The two runtime sweeps above confirm the live site is clean. No save-shape change, no asset change.

## iter 329 — Three more worked examples + a KaTeX render-bug fix (examples / broken)
A **3rd worked example** on three flagship lessons across LA/algo/calc (examples 319 → **322**):
- **la-inverse-and-systems** — **when there's no unique solution**: a singular `A=[[1,1],[2,2]]` (`det=0`); `x+y=2, 2x+2y=5`
  has **no** solution (parallel distinct lines), `x+y=2, 2x+2y=4` has **infinitely many** (same line) — the det=0 dichotomy.
- **a-graph-representations-traversal** — **cycle detection with DFS**: a gray (on-stack) vertex reached by an edge is a
  **back edge** → cycle (`A→B→C→A`); a DAG has none, so topological sort succeeds.
- **c-convexity** — **Jensen's inequality**: convex `f`, `f(E[X]) ≤ E[f(X)]`; with `x²` on `{1,3}`, `f(2)=4 ≤ 5=E[f(X)]`,
  and the gap `1` is exactly `Var(X)` — convexity turns spread into upward bias.
**Bonus fix (broken render).** While verifying, found a **pre-existing KaTeX error** in the existing MSE-convexity example:
`\begin{psmallmatrix}` needs the mathtools package, which this KaTeX build lacks (`No such environment: psmallmatrix`).
Replaced both with `\left(\begin{smallmatrix}…\end{smallmatrix}\right)` (supported, keeps the parentheses) — c-convexity
now renders **kErr=0**.
Every value node-verified; injected byte-stably with round-trip + even-`$` + tag-balance pre-guards.
Verified: gate ALL GREEN (**322 examples**); **via `--dump-dom`** each Examples tab shows 3, reveals with KaTeX
(62 / 137 / 41 spans) and **kErr=0, rawDollar=0** (the psmallmatrix error gone); all-routes smoke **errs=0/kErr=0 (12 routes)**.
No save-shape change. SW cache `atlas-v269` → `atlas-v270`.

## iter 328 — Newton's-method visualizer — 71st widget (visualizations)
No widget showed Newton's method, a flagship numerical root-finder — and it's *iterated linearization*, so it fits the
linear-approximation lesson perfectly. Added the **71st Lab widget `calc-newton`** (a 2nd viz on `c-linearization-lhopital`):
on `f(x)=x²−2`, **Step** draws the tangent at the current guess down to where it crosses the x-axis — that crossing is the
next guess `x ← x − f(x)/f′(x)` — and **Run** iterates to the root. The guesses `2 → 1.5 → 1.4167 → 1.41421` rocket toward
**√2** (gold marker), with the note explaining the **quadratic** convergence (correct digits roughly double per step).
Plain-unicode note (no `$`). app.js `viz-complete` fallback 70 → 71.
Verified: gate ALL GREEN (**71 widgets**, embed resolves); **node** prototype confirmed the iterates converge to √2; **via
`--dump-dom`** Step gives `x = 1.500000` and Run reaches `1.414214` (within 1e-4 of √2), `rawDollar=0`, `errs=0`, the lesson
embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v268` → `atlas-v269`.

## iter 327 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons across calc/DL/algo (lessons-with-code
42 → **45**; the gate now runs **40**):
- **c-fundamental-theorem** — a **definite integral via the FTC**: `∫₀² 3x² dx = F(2)−F(0)` with `F(x)=x³` → `8`, no limit
  of sums needed.
- **dl-dropout-and-normalization** — **batch normalization**: recenter/rescale `[1,2,3,4,5]` to mean 0, variance 1 → the
  post-norm `mean var` is `0.00 1.00`.
- **a-hash-tables** — **hashing** `h(k)=k mod m`: keys `[10,22,31,4,15]` mod 7 → buckets `3,1,3,4,1` (10 & 31 collide, 22 & 15 collide).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**40 code-exercises verified**); **via `--dump-dom`** the batch-norm widget runs → `0.00 1.00`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v267` → `atlas-v268`.

## iter 326 — Four more deeper-dives on flagship hard lessons (content / understandability)
4 "Deeper dive" expandables across DL/RL/LA/calc (deep-dives 85 → **89**):
- **dl-embeddings-and-tokenization** — embeddings turn **symbols into geometry**: a *trainable* lookup table where proximity
  = learned similarity ("king − man + woman ≈ queen"); meaning stored as positions, not definitions.
- **rl-policy-iteration** — a **monotone two-step dance**: evaluate `Vᵖ`, then act greedily w.r.t. it; the policy-improvement
  theorem makes every step uphill, so it reaches optimal in finitely many iterations.
- **la-gradients-jacobians** — the **Jacobian is the derivative generalized**: an `m×n` matrix of all partials, best linear
  approx `f(x+δ)≈f(x)+Jδ`; the gradient is its `m=1` case, layout = a transpose-consistency choice for backprop.
- **c-partial-derivatives** — a partial **freezes every axis but one**; assembled, the partials give the gradient, the tangent
  plane, and (Clairaut) commuting mixed partials — multivariable calculus = one-variable calculus per axis.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 3 / 7 / 7 spans — embeddings is intentionally
prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v266` → `atlas-v267`.

## iter 325 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons, each a new technique across algo/PS/calc (examples 316 → **319**):
- **a-divide-and-conquer** — **Karatsuba**: multiply `12 × 34` with **three** products not four (`ac=3, bd=8, (a+b)(c+d)=21`
  → cross term `10` by subtraction) → `408`; recursively this is `O(n^1.585)` (existing: merge-sort trace + a recurrence).
- **ps-bernoulli-binomial** — **mean & variance of a binomial** as a sum of Bernoullis: `np = 6`, `np(1−p) = 4.2`,
  `sd ≈ 2.05`; why `p(1−p)` peaks at `p=0.5` (existing: heads-in-5-flips PMF + defective bulbs).
- **c-extrema-curve-sketching** — **closed-interval extreme values**: `x³−3x` on `[0,2]` → check the critical point `x=1`
  *and* the endpoints; the max `2` is at the **endpoint** `x=2`, which the derivative test alone would miss (existing:
  first- and second-derivative classification).
Every value node-verified (408; mean 6 / var 4.2; max 2 / min −2); injected byte-stably with round-trip + even-`$` +
tag-balance pre-guards.
Verified: gate ALL GREEN (**319 examples**); **via `--dump-dom`** each Examples tab shows 3, the new solution reveals with
KaTeX (93 / 41 / 101 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v265` → `atlas-v266`.

## iter 324 — Geometric-distribution visualizer — 70th widget (visualizations)
`ps-geometric-waiting` had no widget. Added the **70th Lab widget `ps-geometric`**, embedded there: a bar chart of the
geometric PMF `P(X=k) = (1−p)^(k−1)·p` — the probability the first success lands on trial `k`. Slide the **success
probability p** (0.1–0.9): the bars decay geometrically (each is `(1−p)×` the previous), and a dashed line marks the
**mean 1/p**. The note explains it's **memoryless** — past failures don't bring success closer, the discrete twin of the
exponential. Plain-unicode note (no `$`). app.js `viz-complete` fallback 69 → 70.
Verified: gate ALL GREEN (**70 widgets**, embed resolves); **node** prototype confirmed the PMF sums to 1 and mean = 1/p;
**via `--dump-dom`** the p slider drives the mean `3.33 (p=.3) → 1.25 (p=.8) → 10.00 (p=.1)`, `rawDollar=0`, `errs=0`, the
lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v264` → `atlas-v265`.

## iter 323 — Three more code exercises across computational lessons (new functionality / active learning)
Added **3 gate-verified JavaScript exercises** on flagship computational lessons that still lacked one, across LA/algo/PS
(lessons-with-code 39 → **42**; the gate now runs **37**):
- **la-gradients-jacobians** — the **gradient** of `f(x,y)=x²+3xy+y²`: `[∂f/∂x, ∂f/∂y] = [2x+3y, 3x+2y]` → `8 7` at (1,2),
  the direction of steepest ascent.
- **a-linear-sorts-selection** — **counting sort** (tally values, emit in order, no comparisons): `[2,5,3,0,2,3,0,3]`
  → `0,0,2,2,3,3,3,5` — O(n + range), linear when the range is small.
- **ps-normal-distribution** — the **z-score** `(x−μ)/σ`: `(130−100)/15` → `2.00`, i.e. two standard deviations above the mean.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` + `**`-free guards.
Verified: gate ALL GREEN (**37 code-exercises verified**); **via `--dump-dom`** the counting-sort widget runs →
`0,0,2,2,3,3,3,5`, "✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v263` → `atlas-v264`.

## iter 322 — Inline-extras icons in the course lesson list (UI/UX)
Extending the "amplify what exists" theme from iter 320: the course page's lesson rows already show MCQ/cards/HW pill
counts, but nothing flagged which lessons carry an inline **visualization, deeper-dive, or code exercise** — you only found
out by opening the lesson. Added compact icons to each row's meta line — `🎛️` (interactive visualization), `🧩` (deeper dive),
`💻` (code exercise) — computed from the lesson's own content, with an `aria-label`/`title` ("Includes …") for screen readers
and hover. Now a learner scanning a course can spot the hands-on lessons at a glance. Pairs with the in-lesson "In this
lesson" strip (320) so the depth is advertised both before and inside a lesson.
Verified: gate ALL GREEN; **via `--dump-dom`** the Prob & Stats course shows extras icons on **19 of 20** lesson rows (the
extras-rich topic), with a sample `aria-label` "Includes deeper dive"; `errs=0`; all-courses smoke across all 7 courses
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v262` → `atlas-v263`.

## iter 321 — Four more deeper-dives on flagship hard lessons (content / understandability)
Back to the owner's depth directive — 4 "Deeper dive" expandables across LLM/algo/PS/calc (deep-dives 81 → **85**):
- **l-finetuning-and-instruction-tuning** — SFT shapes **behaviour, not knowledge**: the objective stays next-token
  prediction; only the *data* changes (helpful-assistant demonstrations), so "follow the instruction" becomes the likely
  continuation.
- **a-correctness-invariants** — a **loop invariant is induction**: initialization (base case), maintenance (inductive step),
  termination ⟹ correctness — testing shows a bug's presence, an invariant shows its absence.
- **ps-random-variables-distributions** — a **random variable is a function** $X$ from outcomes to numbers; its distribution
  is the pushforward of the sample-space probabilities onto the number line — what makes probability quantitative.
- **c-antiderivatives** — why the **+C**: differentiation kills constants ($\frac{d}{dx}C=0$), so antidifferentiation recovers
  a whole *family* of curves, pinned down only by an initial condition — and why integration is harder than differentiation.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards (incl. `<code>`).
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 0 / 9 / 8 spans — instruction-tuning & loop
invariants are intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v261` → `atlas-v262`.

## iter 320 — Step-back: full-site sweep (clean) + "In this lesson" extras strip (UI/UX)
**Round-number step-back (iter 320).** Health check of 311–319: examples · viz · content · a11y · code · viz · content ·
examples · viz — all verified, no bugs shipped (two tooling landmines — `**`-in-code, `node -e` apostrophes — were caught
pre-commit and recorded). The stretch leaned content/viz; the reflection: the codex is **exhaustively complete** (148
lessons · 69 viz · 81 deep-dives · 316 examples · 39 code-exercise lessons · 138 glossary · 58 achievements), so the
higher-leverage move is to **surface the depth already built** rather than add the 70th of something.
**Comprehensive route sweep** (first full one since iter 310): drove **all 235 routes** → **errs=0, kErrTotal=0, bad=none**.
**The ship (UI/UX — amplify the library).** Many lessons now carry an inline visualization, deeper-dive, or code exercise
that a learner only discovers by scrolling. Added an **"In this lesson" badge strip** at the top of every lecture that has
any of them — `🎛️ interactive`, `🧩 deeper dive`, `💻 code exercise` — and each badge is **clickable**: it scrolls to that
element (and opens the deep-dive, which also fires the Deep Thinker achievement). Computed from the lesson's own content, so
it appears only when those extras exist; reduced-motion-safe scroll. One small strip that advertises 69 viz + 81 deep-dives
+ 39 code exercises that were previously below the fold.
Verified: gate ALL GREEN; **via `--dump-dom`** ps-conditional-expectation shows `[🎛️ interactive, 🧩 deeper dive]`, dl-pooling
shows `[🧩 deeper dive, 💻 code exercise]`, la-vectors shows `[🎛️ interactive]`; clicking the deeper-dive badge **opens** it
(`open false→true`); `errs=0`; the 235-route sweep is clean; lesson-heavy smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v260` → `atlas-v261`.

## iter 319 — Joint-distribution visualizer — 69th widget (visualizations)
`ps-joint-distributions` had no widget, and the joint → marginals → independence chain is core probability. Added the
**69th Lab widget `ps-joint`**, embedded there: a 5×5 **P(X,Y) heatmap** (cell shade ∝ probability, value shown) with
**marginal bars** — `P(X)` summed down each column (below), `P(Y)` summed across each row (left). Two presets: **Independent**
(the joint is exactly `P(X)·P(Y)`, an outer product → independence error **0**) and **Correlated** (mass clusters on the
diagonal → the joint no longer factors, error **0.083**). The note explains marginals = summing the joint, and independence
⟺ joint = product of marginals. Plain-unicode note (no `$`). app.js `viz-complete` fallback 68 → 69.
Verified: gate ALL GREEN (**69 widgets**, embed resolves); **node** prototype confirmed both joints sum to 1 and the
independence error is 0 (independent) vs 0.083 (correlated); **via `--dump-dom`** the toggle drives the error `0.000 ↔ 0.083`
and back, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v259` → `atlas-v260`.

## iter 318 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons, each a new technique across DL/PS/algorithms (examples 313 → **316**):
- **dl-attention-mechanism** — **why divide by √dₖ**: unscaled scores `[16,20]` → `softmax ≈ [0.018, 0.982]` (saturated,
  dead gradient); scaled by 8 → `[2,2.5]` → `[0.378, 0.622]` (healthy) — dot products grow like `√dₖ`, so the divide holds
  the scale steady (existing: single-query attention + causal self-attention).
- **ps-poisson** — **P(at least one)** via the complement: `1 − e^(−λ)` with `λ=3` → `1 − 0.0498 ≈ 0.950` (existing:
  defects + binomial-to-Poisson).
- **a-hash-tables** — **load factor & resizing**: `α = 6/8 = 0.75`, resize-and-rehash to `m=16` → `α = 0.375`, with the
  amortized-`O(1)` accounting behind the rare `O(n)` resize (existing: chaining insert + linear-probing deletion).
Every value node-verified; injected byte-stably with round-trip + even-`$` + `<strong>`/`<em>`/`<b>` tag-balance pre-guards.
Verified: gate ALL GREEN (**316 examples**); **via `--dump-dom`** each Examples tab shows 3, the new solution reveals with
KaTeX (57 / 25 / 57 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v258` → `atlas-v259`.

## iter 317 — Four more deeper-dives on flagship hard lessons (content / understandability)
Steering to the topics the last few dd batches skipped (RL/calc/LA/DL) — 4 "Deeper dive" expandables (deep-dives 77 → **81**):
- **rl-offline** — offline RL fights **distribution shift**: value estimates extrapolate wildly on actions the dataset never
  tried, so the fix is conservatism (CQL/BCQ) — don't trust values where you have no data.
- **la-projection-least-squares** — least squares **is** an orthogonal projection: `Ax̂` is `b`'s shadow on the column space,
  the residual ⊥ the columns gives `AᵀAx̂ = Aᵀb` — dropping a perpendicular, not curve-fitting magic.
- **c-continuity** — the **IVT** guarantees a root exists (sign change → `f(c)=0` somewhere) before you find it — the basis
  of bisection.
- **dl-transfer-learning** — why pretrained features transfer: early layers learn **general** representations (edges,
  syntax), so reuse the backbone + retrain the head — amortizing the expensive part once.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards (used `\lt`/`\gt`
for the IVT sign inequalities to dodge the `<`-in-math landmine).
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 10 / 10 / 0 spans — offline-RL & transfer
are intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v257` → `atlas-v258`.

## iter 316 — Kruskal's MST visualizer — 68th widget (visualizations)
`a-mst-union-find` had no widget, and Kruskal's algorithm is a perfect visual: greedy + a union-find cycle test. Added the
**68th Lab widget `algo-kruskal`**, embedded there: a 6-node weighted graph where **Step** considers edges cheapest-first —
adding one in **sage** if its ends are in different components, or **rejecting** it in dashed **rust** when union-find finds
they're already connected (a cycle). **Run** completes it, **Reset** restarts. The note narrates each decision and the
running tree weight, which climbs to the minimum **13** (5 edges). Plain-unicode note (no `$`). app.js `viz-complete`
fallback 67 → 68.
Verified: gate ALL GREEN (**68 widgets**, embed resolves); **node** prototype confirmed the MST (edges 1-2,1-3,3-4,0-2,3-5;
weight 13; 4 cycle-edges rejected); **via `--dump-dom`** Step adds the lightest edge (1–2, w=1), **Run → weight 13, 5 edges,
complete**, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v256` → `atlas-v257`.
(Tooling landmine: `node -e '…'` inline breaks on apostrophes — e.g. "Kruskal's" closes the quote and zsh glob-errors on the
rest; use a heredoc script file for README/doc edits with apostrophes. Re-did the README update that way.)

## iter 315 — Three more code exercises across the 4-count topics (new functionality / active learning)
With code exercises evenly spread (most topics at 4), added **3 more gate-verified JavaScript exercises** across LA/RL/PS
(lessons-with-code 36 → **39**; the gate now runs **34**), each a flagship one-liner of a concept:
- **la-eigenvalues-eigenvectors** — **2×2 eigenvalues** from trace & determinant (roots of `λ² − tr·λ + det`): `[[2,1],[1,2]]`
  → `3 1`.
- **rl-td-learning** — one **TD(0) update** `V(s) ← V(s) + α[r + γV(s′) − V(s)]`: V=5, r=1, γ=0.9, V′=10, α=0.1 → `5.50`
  (TD error +5, scaled by α).
- **ps-point-estimation** — **sample standard deviation** dividing by `n−1` (Bessel): `[2,4,6,8]` → `2.58` — ties to that
  lesson's deeper-dive on why it's `n−1`.
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` guards + the `**`-free guard from
the iter-309 landmine.
Verified: gate ALL GREEN (**34 code-exercises verified**); **via `--dump-dom`** the la-eigenvalues widget runs → `3 1`,
"✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v255` → `atlas-v256`.

## iter 314 — In-app "reduce motion" toggle (accessibility)
Every animation already respected the OS `prefers-reduced-motion` setting, but a user who wants calmer motion had **no in-app
control** — they'd have to change a system-wide OS preference. Added a **"Reduce motion" toggle in Settings** (a11y best
practice: offer motion control in the app itself). It sets `data-reduce-motion="on"` on `<html>`, which (a) makes the shared
`reducedMotion()` helper return true — so every JS-driven animation already gated on it (confetti, sweep-bars, cascades,
count-ups, the map reveal, card flips, fly-outs) is suppressed — and (b) triggers a **CSS guard mirroring the OS-pref block**
(`[data-reduce-motion="on"] *` zeroes animation/transition durations; `.reveal` shows instantly). Persisted to localStorage
and re-applied on boot; the button is `aria-pressed` and relabels on toggle. Independent of (and additive to) the OS setting.
Verified: gate ALL GREEN; **via `--dump-dom`** the toggle is off by default (`data-reduce-motion=null`), turning it on sets
the attribute + persists (`localStorage.reduceMotion=1`, `aria-pressed=true`, label "🌿 Reduced motion: on"); with the pref
**preset, boot re-applies it** (`data-reduce-motion=on`); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v254` → `atlas-v255`.

## iter 313 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the depth directive — 4 "Deeper dive" expandables across LLM/DL/algo/PS (deep-dives 73 → **77**):
- **l-optimization-and-stability** — why LLM training needs **warmup** (early gradients are huge/noisy), **AdamW's decoupled
  decay** (decay shouldn't be scaled by the adaptive step), and **gradient clipping** (one bad batch can't blow up) — it's
  about *stability*, not just speed.
- **dl-pooling-and-cnn-architectures** — pooling buys **translation invariance** (a feature anywhere in the window survives)
  *and* a **growing receptive field**: convolution detects *what*, pooling forgets *exactly where*.
- **a-approximation-randomized** — when "exact and fast" is impossible for NP-hard problems, keep a **guarantee**:
  provably-near-optimal (a `c`-approximation) or probably-correct (randomized).
- **ps-sample-spaces-events** — probability is **set theory with a measure**: sample space `Ω`, events as subsets, three
  axioms; "or/and/not" are union/intersection/complement, and inclusion-exclusion is just no-double-counting.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 0 / 0 / 2 / 7 spans — the LLM-opt & pooling
dives are intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v253` → `atlas-v254`.

## iter 312 — Conditional-expectation visualizer — 67th widget (visualizations)
`ps-conditional-expectation` had a deeper-dive but no widget, and E[Y|X] is the bridge from probability to ML (regression
*is* conditional expectation). Added the **67th Lab widget `ps-conditional-expectation`**, embedded there: a scatter of Y
against X (here `y = 3 + 2sin(x)` + noise), with X sliced into 12 bins — the **average Y per slice** is plotted as the
**E[Y|X] curve** (violet), threading the noisy cloud and tracing the true relationship (dashed, toggleable). A **noise
slider** shows the slice-averages still recover the curve as noise grows (averaging cancels it). The note's takeaway:
regression learns exactly this curve, and a straight-line fit is just its best linear approximation. Deterministic
reproducible jitter (no `Math.random`), plain-unicode note (no `$`). app.js `viz-complete` fallback 66 → 67.
Verified: gate ALL GREEN (**67 widgets**, embed resolves); **node** prototype confirmed binned means track `f(x)` (max
`|mean−f|` ≈ 0.26, noise averaging out); **via `--dump-dom`** the viz renders, the note shows `E[Y|X]`, the noise slider and
true-curve toggle both update, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0
(12 routes)**. No save-shape change. SW cache `atlas-v252` → `atlas-v253`.

## iter 311 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons, each a new technique across LA/PS/calc (examples 310 → **313**):
- **la-svd** — **best rank-1 approximation** (Eckart-Young): with singular values 5 and 3, the rank-1 truncation keeps
  `25/34 ≈ 73.5%` of the energy and drops only `σ₂` — the basis of SVD/PCA compression (existing: a full 2×2 SVD + a
  rank-deficient one).
- **ps-t-tests** — the **paired t-test** as a one-sample test on the differences: `d=[2,4,3]` → `d̄=3, s=1, t≈5.20` on 2 df,
  and why pairing cancels between-subject variation for more power (existing: one-sample + two-sample).
- **c-area-volume** — **volume by cylindrical shells**: `y=x²` on `[0,2]` about the y-axis → `∫2πx·x² dx = 8π ≈ 25.13`,
  and when shells beat washers (no inversion needed) (existing: area-between-curves + a washer volume).
Every value node-verified (73.5%; t=5.196; 8π); injected byte-stably with round-trip + even-`$` + tag-balance pre-guards.
Verified: gate ALL GREEN (**313 examples**); **via `--dump-dom`** each Examples tab shows 3, the new solution reveals with
KaTeX (49 / 40 / 72 spans) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v251` → `atlas-v252`.

## iter 310 — Step-back: full-site sweep (clean) + screen-reader-complete Playground (a11y)
**Round-number step-back (iter 310).** Health check of 301–309: UI/UX · viz · content · examples · animation · viz · content ·
UI/UX · code — a diverse rotation across every modality, the long-stale **animation** area finally refreshed (305, map
reveal), and no bugs shipped (the `**`-vs-gate snag in 309 was caught pre-commit and recorded as a landmine).
**Comprehensive route sweep** (first full one since iter 300): drove **all 232 routes** (148 lessons + 66 Lab widgets +
7 courses + 11 pages) trapping JS + KaTeX errors → **errs=0, kErrTotal=0, bad=none**. The codex at 310: 148 lessons ·
2,368 MCQs · 889 cards · 442 homework · 310 examples · 66 viz · 73 deep-dives · 36 code-exercise lessons · 138 glossary ·
58 achievements. Mature, healthy, fully green end-to-end.
**The ship (accessibility).** The code-exercise / Playground widget rendered its **output and the ✓/✗ "matches expected"
result with no live region** — so screen-reader users couldn't hear whether their code passed (the core feedback), and the
editor + selects were unlabeled. Made it SR-complete: the output wrapper is now **`role="status" aria-live="polite"`** (so
the output *and* the dynamically-appended check are announced), the code `<textarea>` gets `aria-label="Code editor"`, and the
language / examples selects + the status line are labeled. One template edit, covering **all 36 lesson code exercises + the
full Code Playground**.
Verified: gate ALL GREEN; **via `--dump-dom`** the output wrapper is `role=status aria-live=polite`, the editor is labeled,
and after Run the **✓ check renders inside the live region** (`checkInLiveRegion=true`), `errs=0`; the 232-route sweep is
clean; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v250` → `atlas-v251`.

## iter 309 — Three more code exercises across the thinnest topics (new functionality / active learning)
DL and PS were the thinnest code-exercise topics (3 each); added **3 gate-verified JavaScript exercises** (lessons-with-code
33 → **36**; the gate now runs **31**), each a flagship operation:
- **dl-convolution-operation** — a **1-D convolution** with an edge-detector kernel `[-1,1]` on a step `[0,0,5,5,5]` → `0,5,0,0`
  (a spike exactly at the edge).
- **dl-pooling-and-cnn-architectures** — **max-pooling** (window 2, stride 2) on `[1,3,2,5,4,1]` → `3,5,4` (each pair's peak survives).
- **ps-covariance-correlation** — **Pearson correlation** (covariance ÷ both spreads) on two series → `0.60` (moderate positive).
Every output node-verified; injected byte-stably with round-trip + no-existing-`data-code` guards.
**Landmine recorded:** code exercises must avoid the JS exponentiation operator `**` — the gate's raw-markdown lint flags `**`
as bold and fails. First draft of the correlation exercise used `dx ** 2`; the gate caught it, and I reverted + re-injected
with `Math.pow`-style `dx * dx`. (Use multiplication or `Math.pow`, never `**`, in exercise code.)
Verified: gate ALL GREEN (**31 code-exercises verified** — all outputs match `data-expected`); **via `--dump-dom`** the
dl-convolution widget runs → `0,5,0,0`, "✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No
save-shape change. SW cache `atlas-v249` → `atlas-v250`.

## iter 308 — ⌘K glossary terms deep-link to their definition (UI/UX / workflow)
The ⌘K palette already indexes everything (lessons, the 66 viz, pages, all 138 glossary terms, references, commands), but
**every glossary hit just opened `#/glossary`** — dropping you in a 138-item list to hunt for the term you literally just
picked. Now each glossary entry deep-links to `#/glossary/<term>`: the router passes the (decoded) term to `viewGlossary`,
which **pre-fills the search box** so you land on a focused, definition-visible view. The bare `#/glossary` route is unchanged
(all 138, empty box). One-line change at each of three points (search index, router, view).
Verified: gate ALL GREEN; **via `--dump-dom`** `#/glossary/Posterior` pre-fills the search ("Posterior") and narrows to the
3 posterior-related entries (definition visible), while `#/glossary` still lists all **138** with an empty box; `errs=0`;
all-routes smoke **errs=0/kErr=0 (12 routes, incl. a deep-linked term)**. No save-shape change. SW cache `atlas-v248` → `atlas-v249`.

## iter 307 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the depth directive, deliberately steering to the **less-recently-covered topics** (PS/RL/algo/calc) — 4 "Deeper
dive" expandables (deep-dives 69 → **73**):
- **ps-uniform-exponential** — the exponential **forgets**: `P(X>s+t | X>s)=P(X>t)` because `e^{-λ(s+t)}/e^{-λs}=e^{-λt}` —
  the only memoryless continuous law (no aging, no internal clock).
- **rl-model-based** — a model lets you **plan**: learn `P(s'|s,a)` and `R(s,a)`, then simulate rollouts / tree-search
  (AlphaZero) for sample efficiency — at the cost of compounding model error.
- **a-divide-and-conquer** — why **balanced splits** win: halving makes the recursion tree `log₂n` deep, so linear combines
  total `O(n log n)`; uneven splits collapse to `O(n²)` — the win is geometric shrinkage, decided by the master theorem.
- **c-integration-techniques** — the tricks are **derivative rules reversed**: substitution is the chain rule backward,
  integration by parts is the product rule backward — "what was this the derivative of?"
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 6 / 2 / 6 / 7 spans) with **kErr=0,
rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v247` → `atlas-v248`.

## iter 306 — Binary Min-Heap visualizer — 66th widget (visualizations)
`a-trees-heaps` had no widget, and the heap is one of the most important data structures — its array↔tree duality is a
classic "click" moment. Added the **66th Lab widget `algo-heap`**, embedded there: the same values drawn **as a binary tree
above and the contiguous array below**, with the **minimum at the root** (index 0). **+ Insert** pushes a random value and
**sifts it up** (the swap path lights gold); **Extract min** removes the root, moves the last leaf up, and **sifts it down**;
**Reset** restores. The note carries the live array (`[3, 7, 5, …]`) — verifiable *and* screen-reader-readable, since the
canvas array row isn't. Confirmed the gamification achievement set is already exhaustive (58 across every behavior), so this
viz is the higher-value ship.
Verified: gate ALL GREEN (**66 widgets**, embed resolves); **node** prototype confirmed siftUp/siftDown keep the min-heap
property; **via `--dump-dom`** after 3 inserts (9 elts) and an extract (8 elts) the array parsed from the note is a **valid
min-heap with root = min** both times, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0
(12 routes)**. No save-shape change. SW cache `atlas-v246` → `atlas-v247`.

## iter 305 — The Knowledge Map draws its constellation on landing (animation)
The flagship Knowledge Map rendered its ~148-node SVG constellation **instantly** — no reveal. Added a **one-time staged
"draw-in"** when you land on the map: the colored **sector wedges + rings** fade first, then the **prerequisite edges**, then
the **nodes** pop in last (a structure → connections → concepts reveal). Pure CSS opacity animation (the nodes carry an SVG
`transform`, so opacity-only avoids clobbering their positions). The `drawing` class is added **before first paint** (set
synchronously right after `innerHTML`, so no flash) and **removed after ~1s** so the hover/keyboard-dim opacity control
resumes cleanly. Reduced-motion safe (the global guard zeroes animation durations; the JS also skips it under
`prefers-reduced-motion`). Confirmed it never strands the map invisible: even if the animation didn't run, fill-mode and the
1s class-removal leave every node at the default opacity 1.
Verified: gate ALL GREEN; **via `--dump-dom`** the map adds `drawing` on load and **removes it after 1s** (`drawingEarly=true`,
`drawingLate=false`), all **148 nodes** render and end at **opacity 1**, `errs=0`; all-routes smoke **errs=0/kErr=0
(12 routes)**. No save-shape change. SW cache `atlas-v245` → `atlas-v246`.

## iter 304 — Three more worked examples on flagship hard lessons (examples)
A **3rd worked example** on three flagship lessons at two, each a new technique across LA/algo/RL (examples 307 → **310**):
- **la-matrix-multiplication** — `Ax` two ways: the row view (dot products → `[4,10]`) *and* the column view (`2·[1,3]+1·[2,4]`),
  the picture that explains column space, span, and when `Ax=b` is solvable (existing: composing maps + non-square products).
- **a-binary-search** — the **`lower_bound`** variant traced on `[1,3,3,5,7]` for `3`: the half-open window converges to the
  **first** index `≥` target (index 1), the deterministic workhorse behind insertion points, counts, and ranges (existing:
  a plain trace + the O(log n) argument).
- **rl-policies-values** — **V from Q**: `V_π(s)=Σ π(a|s)·Q(s,a)` — greedy `π=[1,0]` → 10, stochastic `[0.7,0.3]` → 8.2, so
  exploring lowers value and the `1.8` gap is the price of randomness (existing: policy eval on a chain + greedy selection).
Every value node-verified ([4,10]; lower_bound=1; V=8.2/gap=1.8); injected byte-stably with round-trip + even-`$` +
`<strong>`/`<em>`/`<code>` tag-balance pre-guards.
Verified: gate ALL GREEN (**310 examples**); **via `--dump-dom`** each Examples tab shows 3, the new solution reveals with
KaTeX (117 / 28 / 97 spans — matrices render) and **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**.
No save-shape change. SW cache `atlas-v244` → `atlas-v245`.

## iter 303 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the owner's depth directive with **4 "Deeper dive" expandables** across four topics (deep-dives 65 → **69**):
- **la-orthonormal-gram-schmidt** — why orthonormal bases are computationally golden: `QᵀQ=I` makes the inverse free
  (`Q⁻¹=Qᵀ`), coordinates mere dot products, and maps length-preserving (numerically stable) — the payoff for Gram-Schmidt's work.
- **dl-overfitting-and-regularization** — regularization as a vote for simpler explanations: L2 (`λ‖w‖²`) makes big weights
  expensive, dropout spreads bets, early-stopping halts before memorization — all the same "prefer the simplest fit" prior.
- **l-rag-and-tools** — RAG separates *what a model knows* (a retrievable, updatable, citable store) from *how it reasons*
  (the frozen weights) — turning a closed-book exam into an open-book one.
- **c-gradient-descent-convergence** — why GD zigzags: the condition number `κ=λ_max/λ_min` mismatches curvature across
  directions, so one learning rate can't serve all — the problem momentum/Adam/preconditioning fix.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each renders (KaTeX 6 / 2 / 0 / 6 spans — RAG is intentionally
prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v243` → `atlas-v244`.

## iter 302 — The ε–δ limit visualizer — 65th widget (visualizations)
`c-limits-intuition` had no widget, and the ε–δ definition is the single most-feared idea in early calculus. Added the
**65th Lab widget `calc-limit-epsilon`**, embedded in that lesson: pick a tolerance **ε** (a sage horizontal band around the
limit **L**) and the widget computes the **δ** interval around **a** (violet) that keeps the whole curve inside the band.
Shrink ε and δ shrinks with it — but a δ always exists, which *is* the definition (∀ε ∃δ). Two presets: the classic
`(x²−1)/(x−1)` (a line with a **removable hole** at a — an open circle, showing the limit ignores `f(a)` entirely, here
δ = ε) and `x²` (where δ < ε and is asymmetric). δ is found numerically by scanning outward from a until the curve leaves
the band. Plain-unicode note (no `$`, viz-note landmine). app.js `viz-complete` fallback 64 → 65.
Verified: gate ALL GREEN (**65 widgets**, embed resolves); **node** prototype confirmed δ ≈ ε for the hole (0.60→0.60,
0.10→0.10) and δ < ε for x² (0.6→0.26, 0.1→0.05); **via `--dump-dom`** the ε slider drives δ (`0.60→0.10`), the function
toggle switches presets (x², δ=0.05 at ε=0.10), `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v242` → `atlas-v243`.

## iter 301 — Topic filter for the Glossary + a stale-copy fix (UI/UX)
With the glossary now **138 terms** across 7 subjects + general, it had search but **no way to browse by topic**. Added
**per-topic filter chips** (All topics + one per subject present), mirroring the Lab's filter (iter 286): each chip filters
the list and **composes with the search box** (no re-render of the page). Also fixed a **stale copy bug** — the page still
said definitions span "all **six** subjects" (Prob & Stats is the 7th, long since added) → now "all **seven** subjects."
Chips reuse the existing `.lab-topics`/`.lab-tbtn` pill styling, are `aria-pressed`, and wrap on mobile.
Verified: gate ALL GREEN; **via `--dump-dom`** — **9 chips** render; clicking **Calculus** shows exactly its **17** terms
(every visible item's topic tag reads "Calculus"); **All topics** restores all **138**; `errs=0`; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v241` → `atlas-v242`.

## iter 300 — Step-back: full-site sweep (clean) + 5 glossary terms (understandability)
**Milestone step-back (iter 300).** Health check of 291–299: viz · mobile-fix · mobile-fix · examples · gamification · viz ·
content · a11y · code — a genuinely diverse rotation spanning all four content modalities, two **real mobile bugs caught and
fixed** (squished canvases, Progress-page overflow), plus gamification, a11y, and a new viz. No bugs shipped.
**Comprehensive route sweep** (first full one since iter 290): drove **all 230 routes** (148 lessons + 64 Lab widgets +
7 courses + 11 pages) trapping JS + KaTeX errors → **errs=0, kErrTotal=0, bad=none** across every route. State of the codex
at 300: 148 lessons · 2,368 MCQs · 889 cards · 442 homework · 307 examples · 64 viz · 65 deep-dives · 33 code-exercise
lessons · **138 glossary** · 58 achievements. Mature, healthy, fully green end-to-end.
**The ship (understandability).** Audited the glossary against ~56 core terms — impressively complete, with **5 genuine gaps**
now filled (`133 → 138`): **Prior**, **Posterior**, **Expected value**, **Stationary distribution**, **Taylor series**. The
last two have near-synonyms already ("Expectation", "Taylor approximation"), but the exact phrases now auto-link in lesson
prose via `linkGlossary` and get hover-definitions. Defs carry KaTeX (`p(\theta\mid x)\propto p(x\mid\theta)\,p(\theta)`,
`\pi=\pi P`, the Taylor sum). Injected byte-stably (append before the closing `];`) with even-`$` + duplicate-term pre-guards.
Verified: gate ALL GREEN (**138 glossary**, render-hazard lint passes on every def); **via `--dump-dom`** the glossary page
shows all **5/5** new terms with KaTeX (120 spans), **kErr=0, rawDollar=0**; the 230-route sweep is clean; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v240` → `atlas-v241`.

## iter 299 — Three more interactive code exercises across thin topics (new functionality / active learning)
Rebalancing the gate-verified code exercises (LA/calc/DL/RL/PS were all tied at the floor of 3): added **3 JavaScript
exercises** (lessons-with-code 30 → **33**; the gate now runs **28**), each a flagship numerical method:
- **la-inverse-and-systems** — **Cramer's rule** for a 2×2 system: `2x+y=5, x+3y=10` → each unknown is a determinant ratio
  → `1 3`.
- **rl-value-iteration** — one **Bellman optimality update** `V(s)=max_a[r+γ·V(next)]`: the patient action `0+0.9·10` beats
  the greedy `1+0.9·5` → `9.0`.
- **c-intro-differential-equations** — **Euler's method** stepping the slope field for `y'=y`, `y(0)=1`, `h=0.5` → `2.25`
  (undershooting the true `e≈2.718`) — pairs with the slope-field deeper-dive from iter 289.
Every output node-verified; injected byte-stably with a round-trip guard + the injector refusing any lesson with existing
`data-code`.
Verified: gate ALL GREEN (**28 code-exercises verified** — all three outputs match `data-expected`); **via `--dump-dom`** the
rl-value-iteration widget hydrates, runs → `9.0`, "✓ Output matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**.
No save-shape change. SW cache `atlas-v239` → `atlas-v240`.

## iter 298 — Accessible flashcard flip (accessibility)
A real a11y bug in the core study mode: both faces of the 3-D flashcard were always in the DOM with **no `aria-hidden`**,
so a screen reader read the **answer aloud before you flipped** — leaking the answer and defeating the whole point of
retrieval practice — while the card itself wasn't announced as interactive. Fixed:
- The card is now a proper **`role="button"` `tabindex="0"`** with an `aria-label` ("Flashcard — activate to reveal the
  answer", updated to "Answer revealed — grade how well you recalled it" on flip). Enter/Space already flipped it via the
  global handler; now SR users are told it's interactive and can focus it.
- The hidden face is kept **out of the accessibility tree**: `aria-hidden` toggles by flip state (back hidden until you
  flip, front hidden after), so SR users get the prompt first and the answer only on reveal — same as sighted users.
- The card's inner is an **`aria-live="polite"`** region, so flipping announces the revealed answer.
Verified: gate ALL GREEN; **via `--dump-dom`** the card renders as `role=button tabindex=0` with `aria-live=polite`; before
flip front is visible / back `aria-hidden=true`, after a click front `aria-hidden=true` / back visible and the label updates;
`errs=0`; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v238` → `atlas-v239`.

## iter 297 — Four more deeper-dives on flagship hard lessons (content / understandability)
First confirmed an existing-feature suspicion was already handled: **number-key/A–D quiz selection and 1–4 flashcard grading
already exist** (global keydown), documented in the `?` shortcuts overlay and via inline "1–4 to answer" hints — so no work
there. Shipped instead **4 "Deeper dive" expandables** on flagship hard lessons that lacked one, across four topics
(deep-dives 61 → **65**):
- **a-np-completeness** — why NP-complete problems stand or fall together: NP = *verifiable* fast (not solvable), and a
  polynomial reduction maps every NP problem onto any NP-complete one, so one fast algorithm would crack them all (P = NP).
- **c-implicit-related-rates** — related rates are the chain rule wearing a clock: differentiate a constraint w.r.t. the
  hidden variable (time) and each quantity contributes its rate, so the ladder's `2x x' + 2y y' = 0` links the two speeds.
- **l-prompting-and-in-context-learning** — in-context learning isn't learning: no weights change; the prompt *conditions*
  a frozen model, and chain-of-thought works by buying forward-pass compute + a scratchpad.
- **ps-hypothesis-testing-logic** — testing as proof by contradiction with a dial: assume `H₀`, reject if the data are too
  surprising (p < α); you never *prove* H₀, and α is the false-alarm rate you accept.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders (KaTeX 0 / 13 / 0 / 9 spans — NP & ICL are
intentionally prose) with **kErr=0, rawDollar=0**; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v237` → `atlas-v238`.

## iter 296 — Student's-t vs. normal visualizer — 64th widget (visualizations)
`ps-t-tests` had no widget, and the t-distribution's fatter tails are exactly *why* small-sample tests differ from
z-tests. Added the **64th Lab widget `ps-t-dist`**, embedded in that lesson: it overlays the **t-distribution** (violet) on
the **standard normal** (dashed), shades the `|t| > 2` tails, and shows the live tail probability **`P(t > 2)`**. Slide the
**degrees of freedom** (1–40) and the t-curve rises while its fat tails pull in — `P(t>2)` falls **14% (df 1) → 5.2%
(df 5) → ~2.5% (df 40)**, converging to the normal's 2.3% by about df = 30. The PDF is **numerically normalized** (no gamma
function needed — integrate the `(1+t²/ν)^(−(ν+1)/2)` shape over a wide range). Plain-unicode note (no `$`, viz-note
landmine). app.js `viz-complete` fallback 63 → 64.
Verified: gate ALL GREEN (**64 widgets**, embed resolves); **node** prototype confirmed the peak rises `0.346 → 0.396 →
0.399` and tail mass shrinks `0.118 → 0.028 → 0.023` toward the normal as df grows; **via `--dump-dom`** the df slider drives
`P(t>2)` `14% → 5.2% → 2.x%`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0
(12 routes)**. No save-shape change. SW cache `atlas-v236` → `atlas-v237`.

## iter 295 — "Deep Work" achievement ties the focus timer into progression (gamification)
The focus timer (iter 279) was the one feature with **no reward tie-in** — completing sessions counted toward nothing.
Added a **"🧘 Deep Work" achievement** (complete 5 focus-timer sessions), so the timer now feeds the progression loop and
rewards the exact behavior the busy-learner persona needs: sustained, distraction-free study blocks. Each completed
session calls a new `Store.addFocusSession()` (increments the persisted `focusSessions` count, unlocks the achievement at
5), wired into `stopFocusTimer(done=true)` beside the existing chime/toast. Added to the "Exploration & Practice" Hall
category and the locked-achievement progress map (`[focusSessions, 5]`), so it shows a live progress bar before unlocking.
New persisted field `focusSessions` in `blank()` + the `load()` `Number.isFinite` merge. Achievement total **57 → 58**.
Verified: gate ALL GREEN (achievement-reachability passes — it's in a Hall category); **via `--dump-dom`** the Hall shows
"Deep Work" (locked) on an old-shape save with no `focusSessions` (loads as 0); after 5 `addFocusSession()` calls
`focusSessions=5`, the achievement unlocks, and both **persist** to localStorage; all-routes smoke **errs=0/kErr=0
(12 routes)**. SW cache `atlas-v235` → `atlas-v236`.

## iter 294 — Three more worked examples on flagship hard lessons (examples)
Pivoting off the two-iteration mobile pass back to content: a **3rd worked example** on three flagship lessons at two, each
a new technique across calc/PS/DL (examples 304 → **307**):
- **c-fundamental-theorem** — the **average value of a function**: `f̄ = (1/(b−a))∫f`; for `x²` on `[0,3]`, the integral is 9
  → average **3**, the height of the equal-area rectangle (existing examples were a definite integral + differentiating an integral).
- **ps-conditional-independence-bayes** — the **Monty Hall problem**: the host's *non-random* reveal funnels the 2/3 onto the
  one unopened door, so switching wins **2/3** vs 1/3 — the 100-door intuition pump (existing: rare-disease base rates + two-coins).
- **dl-loss-functions** — **binary cross-entropy**: confident-right `−ln(0.9)≈0.105`, hedging `−ln(0.5)≈0.693`, confident-wrong
  `−ln(0.1)≈2.303` — loss explodes as `p→0`, punishing false confidence (existing: 3-class softmax CE + MSE).
Every value node-verified (avg = 3; BCE 0.105 / 0.693 / 2.303); injected byte-stably with round-trip + even-`$` +
`<strong>`/`<em>` tag-balance pre-guards.
Verified: gate ALL GREEN (**307 examples**); **via `--dump-dom`** each lesson's Examples tab shows 3, the new solution reveals
with KaTeX (59 / 35 / 69 spans) and **kErr=0, rawDollar=0** (the FTC answer is inside rendered KaTeX; "switch"/"2.303" appear
in prose); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v234` → `atlas-v235`.

## iter 293 — Fix: Progress page overflowed horizontally on mobile (mobile / bug)
Continuing the mobile re-audit started in 292: a 390px overflow sweep across 14 key views found **one offender** — the
**Progress page (`#/stats`) scrolled horizontally** (scrollWidth 539 > 390). Traced to the **mastery-distribution strip**
(`.dist-strip`), a `grid-template-columns: repeat(5, 1fr)` — five fixed columns whose content (a 30px number + 16px padding)
can't shrink below ~88px each, so five never fit in 390px. Fix: `repeat(auto-fit, minmax(88px, 1fr))` — the row wraps to
2 rows on a phone and stays a single row of 5 on desktop (within its 700px max-width). CSS-only.
Verified (iframe @ 390px + `postMessage`): `#/stats` now `sw=390, overflow=false`, the 5 cells in **2 rows**; at 760px
they're a **single row of 5** (desktop unchanged); the full 14-view 390px audit returns **over=NONE** (was `#/stats(539)`);
gate ALL GREEN; desktop smoke **errs=0/kErr=0**. No save-shape change. SW cache `atlas-v233` → `atlas-v234`.

## iter 292 — Fix: visualizations were squished on mobile (mobile / bug)
A real, longstanding mobile bug found by re-measuring the recent widgets at 390px: `.viz-canvas` had `max-width: 100%`
(so the **width** shrank to fit a narrow screen) but `canvas()` also set a **fixed inline `height`** (e.g. 350px), so the
height *didn't* shrink — every one of the 63 widgets rendered **squished horizontally** on phones (a 540×350 drawing
crammed into ~316×350, ratio 0.90 instead of 1.54 — circles became tall ellipses, labels compressed). Fix: stop setting the
inline height in `canvas()` and add `height: auto` to `.viz-canvas`, so the canvas scales **proportionally** from its own
intrinsic width:height attribute ratio. The pointer/drag helper already maps via `getBoundingClientRect()`, so dragging
stays correct at any display size — no widget logic changed.
Verified (iframe @ 390px + `postMessage`, the mobile gate): the scaling and master-theorem widgets now render **316×205,
ratio 1.54** (was 316×350, ratio 0.90); **desktop is unchanged at 540×350**; gate ALL GREEN; all-routes smoke
**errs=0/kErr=0 (12 routes)** including several Lab widgets + a viz-embedding lesson. One-line CSS + one-line JS change,
fixes all **63** visualizations on mobile. No save-shape change. SW cache `atlas-v232` → `atlas-v233`.

## iter 291 — Scaling-laws visualizer — 63rd widget (visualizations)
`l-scaling-laws` had no widget, and scaling laws are one of the most abstract — and most consequential — ideas in the
LLM course. Added the **63rd Lab widget `llm-scaling`**, embedded in that lesson: for a fixed compute budget `C = 6ND`,
it plots **loss vs. model size** as a **U-curve** (Chinchilla-style `L = E + A/Nᵃ + B/Dᵃ`) and marks the **compute-optimal
size N\*** at the dip. Slide the compute budget (10¹⁸–10²⁴ FLOPs) and `N*` marches up the curve — `91M → 2.9B → 91B` — while
the optimum stays at **~20 tokens per parameter** (the famous Chinchilla rule; constants tuned so `(B/A)^(1/a) ≈ 20`,
giving a constant optimal ratio). The note names `N*`, `D*`, the tokens/param ratio, and the predicted loss live — the
visceral "bigger isn't better at fixed compute; you'd starve it of tokens" lesson. Plain-unicode note + unicode-superscript
axis labels (no `$`, viz-note landmine). app.js `viz-complete` fallback 62 → 63.
Verified: gate ALL GREEN (**63 widgets**, embed resolves); **node** prototype confirmed the U-curve, ~21 tokens/param
constant across budgets, and N\* growing ~√C with loss dropping along a power law; **via `--dump-dom`** the slider grows
`N*` `91M → 2.9B → 91.2B` across `10¹⁸/10²¹/10²⁴`, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v231` → `atlas-v232`.

## iter 290 — Step-back: full-site sweep (clean) + two LLM code exercises (new functionality / active learning)
**Step-back (every ~10 iters).** Health check of 281–289: code · viz · content · examples · viz · UI/UX · gamification ·
a11y · content — a genuinely diverse rotation (four distinct non-content areas in the last four iters: UI/UX, gamification,
a11y, content), no bugs shipped. **Comprehensive route sweep** (first full one since iter 280): drove **all 228 routes**
(148 lessons + 62 Lab widgets + 7 courses + 11 pages) in one session trapping JS + KaTeX errors → **errs=0, kErrTotal=0,
bad=none** across every route; the 281–289 injections (code, viz, deep-dives, examples) broke nothing. State of the codex:
148 lessons · 2,368 MCQs · 889 cards · 442 homework · 304 examples · 62 viz · 61 deep-dives · 30 code-exercise lessons ·
133 glossary · 57 achievements. Mature and healthy; performance settled (iter 265).
**The ship (active learning).** LLM was the **thinnest code-exercise topic** (2) despite being full of computable ideas.
Added **2 gate-verified JavaScript exercises** (lessons-with-code 28 → **30**; gate now runs **25**):
- **l-self-attention** — scaled dot-product attention: query scores each key (`q·k/√d`), softmax → weights, weighted blend
  of values; the query matches key 1, so weights `0.731,0.269` and output `7.31,2.69`.
- **l-pretraining-objective-data** — **perplexity** = `exp(cross-entropy)`: `[0.5×4]` → `2.00` (branching factor 2), a
  confident `[0.9,0.8,0.7,0.95]` → `1.20`.
Every output node-verified; injected byte-stably with a round-trip guard + the injector refusing any lesson with existing
`data-code`.
Verified: gate ALL GREEN (**25 code-exercises verified** — both new outputs match `data-expected`); **via `--dump-dom`** the
l-self-attention widget hydrates, runs → `0.731,0.269 | 7.31,2.69`, "✓ Output matches expected"; the 228-route sweep is
clean; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v230` → `atlas-v231`.

## iter 289 — Four more deeper-dives on flagship hard lessons (content / understandability)
Back to the owner's depth directive with **4 "Deeper dive" expandables** on flagship hard lessons that lacked one,
spread across four topics (deep-dives 57 → **61**; RL gets one for the first time since iter 277):
- **dl-rnn-lstm-gru** — why LSTMs remember and vanilla RNNs forget: the gradient picks up a factor of $W^{\top}$ at every
  step (so it scales like $\|W\|^{T}$ and vanishes/explodes), while the LSTM's *additive* cell-state highway has gradient 1
  — the same trick residual connections later reused.
- **c-intro-differential-equations** — an ODE as a *slope field*: $y'=f(x,y)$ prescribes the slope at every point, a solution
  threads tangent to it, and the initial condition just says where to drop your pencil (why a family of solutions, why IC picks one).
- **a-backtracking-branch-bound** — backtracking as DFS over *partial* solutions that prunes the instant a partial can't
  work; branch-and-bound adds a numeric bound to prune branches that can't beat the best-so-far.
- **rl-exploration** — exploration as the price of information: $\varepsilon$-greedy explores bluntly, UCB adds an optimism
  bonus $\sqrt{2\ln t / N(a)}$ so uncertainty itself draws exploration and fades as estimates firm up.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders with its summary, KaTeX typesets
(4 / 4 / 0 / 5 spans — backtracking is intentionally prose) and **kErr=0, rawDollar=0** on all four; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v229` → `atlas-v230`.

## iter 288 — Screen-reader polish for the app chrome (accessibility)
An audit of the persistent chrome (confirmed route-change focus management + `reducedMotion()` guards on every
animation/confetti are already solid) surfaced three real gaps, now fixed:
- **The logo was a mouse-only `<div onclick>`** — not keyboard-focusable and not announced. Converted to a proper
  `<a class="brand" href="#/" data-route>` (canonical accessible home link; Enter works natively), with the decorative
  "A" glyph `aria-hidden` so its name reads cleanly as "Atlas Learning Codex"; added `:focus-visible` ring + `color: inherit`.
- **7 of 10 sidebar nav icons lacked `aria-hidden`** — screen readers announced the emoji ("high voltage", "memo"…)
  before each link's text. All 10 decorative nav icons are now consistently hidden, so SR reads just "Daily Review", etc.
- **The streak flame 🔥 was read aloud** — now `aria-hidden`, while the count + "day streak" label stay exposed
  (verified the number itself is NOT hidden, so SR still says "N day streak").
Verified: gate ALL GREEN; **via `--dump-dom`** — brand is a focusable anchor that navigates home from `#/lab`
(dashboard renders), glyph hidden, **10/10** nav icons hidden, flame hidden, streak number kept, `errs=0`; all-routes
smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v228` → `atlas-v229`.

## iter 287 — "Whole subject complete" celebration, once per topic (gamification)
Completing an **entire subject** is one of the biggest milestones a multi-topic learner hits — but it passed almost
silently: finishing the last lesson only fired the "📗 Module complete!" burst for the final module, and the `topic-clear`
achievement unlocks just *once* (the first topic you finish, not the 2nd–7th). Added a distinct, **per-topic** celebration:
when a lesson completes and its whole course is now done, fire confetti + a "🎓 *Topic* complete! All N lessons done…"
toast — gated to fire **once per topic** so each of the seven subjects gets its own moment. The bigger beat supersedes the
module toast when both land at once. New persisted field `topicDoneCelebrated` (courseId → timestamp) in `blank()` + the
`load()` typeof-merge, with a `Store.celebrateTopicOnce(cid)` guard (returns true the first time, then false).
Verified: gate ALL GREEN; **via `--dump-dom`** — seeded all 19 Linear-Algebra lessons done *except the last*, clicked
**Mark complete**, and the "🎓 Linear Algebra complete! All 19 lessons done…" toast fired with `topicDoneCelebrated['linear-algebra']`
persisted (`errs=0`); an **old-shape save with no `topicDoneCelebrated`** loads and upgrades cleanly; all-routes smoke
**errs=0/kErr=0 (12 routes)**. SW cache `atlas-v227` → `atlas-v228`.

## iter 286 — Topic filter for the Visualization Lab (UI/UX)
With **62 widgets** across 7 subjects, the Lab gallery had search + an All/Unexplored toggle but **no way to filter by
topic** — to browse just the linear-algebra or RL widgets you had to scroll past everything. Added **per-topic filter
chips** (All topics + one per subject) below the existing tools. Each lab card now carries a `data-topic`, and the
client-side `apply()` filter composes topic with the existing text search and explored/unexplored mode (no re-render).
The chips are pill-styled, `aria-pressed`, keyboard-focusable, and wrap on mobile.
Verified: gate ALL GREEN; **via `--dump-dom`** — 8 chips render; clicking **Calculus** shows exactly its 9 widgets
(every visible card's `data-topic` is `calculus`); **All topics** restores all 62; `errs=0`; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v226` → `atlas-v227`.

## iter 285 — Master Theorem visualizer — 62nd widget (visualizations)
`a-recurrences-master-theorem` ("Recurrences and the Master Theorem") had **no widget** — and the master theorem is one of
the most abstract results in the algorithms course. Added the **62nd Lab widget `algo-master-theorem`**, embedded in that
lesson: a bar chart of the **total work at each level** of the recursion tree for `T(n) = a·T(n/b) + nᵈ`. Since per-level
work is geometric with ratio **r = a/bᵈ**, the bar profile *is* the case — sliders for **a, b, d** tip it root-heavy
(r<1 → Θ(nᵈ)), flat (r=1 → Θ(nᵈ log n)), or leaf-heavy (r>1 → Θ(n^log_b a)), with the dominant level highlighted and the
resulting Θ(·) named live. Presets: Merge sort (2,2,1), Strassen (7,2,2), Binary search (1,2,0). Plain-unicode note (no
`$`, viz-note landmine). app.js `viz-complete` fallback 61 → 62.
Verified: gate ALL GREEN (**62 widgets**, embed resolves); **node** log₂7 = 2.81; **via `--dump-dom`** the presets give the
right verdicts — Merge `r=2/2=1.00 balanced`, Strassen `r=7/4=1.75 leaf-heavy` (→ Θ(n^2.81)), Binary search
`r=1/1=1.00 balanced`; `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**.
No save-shape change. SW cache `atlas-v225` → `atlas-v226`.

## iter 284 — Three more worked examples on flagship hard lessons (examples)
First, a quality check: confirmed MCQ **answer positions are well-balanced** (0 lessons exceed the 70%-at-one-index
threshold) — quizzes aren't gameable by pattern-matching. For the ship, a fresh *content type* (worked examples, last
271): added a **3rd worked example** to three flagship lessons at two, each a new technique across DL/PS/algorithms
(examples 301 → **304**):
- **dl-backpropagation** — backprop through a *two-step* chain `y=(wx+b)³` (existing examples were single-weight): forward
  caches `z=3, y=27`; backward `∂y/∂z·∂z/∂w = 27·2 = 54`.
- **ps-confidence-intervals** — a 95% CI for a *proportion* (existing were for a mean): `p̂=0.6, n=100` → SE≈0.049,
  margin≈0.096 → `[0.504, 0.696]`.
- **a-greedy** — *fractional* knapsack, where greedy *is* optimal (existing: activity-selection + coin-change): sort by
  value density, take densest first, fraction the last → **240** — and why 0/1 (all-or-nothing) breaks greedy.
Every value node-verified; injected byte-stably with round-trip + even-`$` + `<strong>`/`<em>` tag-balance pre-guards.
Verified: gate ALL GREEN (**304 examples**); **via `--dump-dom`** each lesson's Examples tab now shows 3, the new
solution reveals with KaTeX (26 / 45 / 131 spans) and **kErr=0, rawDollar=0**, and the answer (54 / 0.696 / 240) appears;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v224` → `atlas-v225`.

## iter 283 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the owner's depth directive, added **4 "Deeper dive" expandables** on flagship hard lessons that lacked one,
across four topics (deep-dives 53 → **57**):
- **a-string-algorithms** — KMP never re-reads the text: a failure function on the pattern lets it skip ahead on a
  mismatch, turning the naive $O(nm)$ into $O(n+m)$.
- **l-hallucination-and-evaluation** — hallucination is what fluency optimizes for: the next-token objective rewards
  *plausible*, never *true*, and there's no built-in "I don't know."
- **ps-point-estimation** — why sample variance divides by $n-1$: deviations from the sample mean run small (it
  minimizes them), so Bessel's correction restores an unbiased estimator ($\mathbb{E}[s^2]=\sigma^2$).
- **dl-diffusion-models** — a diffusion model just learns to denoise: a fixed forward corruption, a learned one-step
  reverse; generation = denoise repeatedly from pure noise.
Authored with `String.raw` LaTeX; injected byte-stably with round-trip + even-`$`/no-`**`/tag-balance pre-guards.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders with its summary, KaTeX typesets
(5 / 0 / 12 / 0 spans — hallucination + diffusion are intentionally prose) and **kErr=0, rawDollar=0** on all four (content
re-read to confirm integrity); all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v223` → `atlas-v224`.

## iter 282 — Law of Large Numbers visualizer — 61st widget (visualizations)
`ps-law-of-large-numbers` had a deeper-dive but **no widget**, and the LLN is one of the most fundamental — and most
mis-felt — ideas in probability. Added the **61st Lab widget `ps-lln`**, embedded in that lesson: sample **a fair die**
(or a coin) and the **running average** is plotted as the count climbs — wandering wildly early, then **settling onto the
true mean** (μ = 3.5 for the die), staying inside a shaded **±2σ/√n band** that visibly narrows. Controls: **Play** (rAF
animation), **+ 100** (a synchronous batch), **Reset**, and **Fair die / Coin** sources — so you watch convergence happen
for two different distributions. Distinct from the CLT viz (which shows the sample-mean *distribution*); this shows a
single average *converging*. Plain-unicode note (no `$`, viz-note landmine). app.js `viz-complete` fallback 60 → 61.
Verified: gate ALL GREEN (**61 widgets**, embed resolves); **node** — 400 die rolls average to ~3.41 (within 0.25 of 3.5);
**via `--dump-dom`** four "+ 100" clicks bring n to 400 with a running average of ~3.38 (converging to 3.5), `rawDollar=0`,
`errs=0`, lesson embed hydrates; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v222` → `atlas-v223`.

## iter 281 — Three interactive code exercises for the thinnest topics (new functionality / active learning)
Code exercises (write → **Run** → instant ✓/✗ vs expected, +15 XP on first solve) are top-tier active learning but were
lopsided: **deep learning had only 1** despite being the biggest topic, with RL next-thinnest. Added **3 gate-verified
JavaScript exercises** (lessons-with-code 25 → 28; the gate now runs **23** each build, up from 20):
- **dl-activation-functions** — a neuron's forward pass: weighted sum + bias → **ReLU**; one neuron's pre-activation is
  negative (→ 0.00), the other survives (→ 1.70).
- **dl-gradient-descent-and-optimizers** — one **gradient-descent step** `x ← x − lr·2x` on `f(x)=x²`, iterated three
  times from 5 → **2.56**, sliding toward the minimum.
- **rl-mdp-formalism** — the **discounted return** `G = Σ γᵏrₖ` via Horner's rule: `[1,0,0,1]` at γ=0.9 → `1 + 0.9³` = **1.729**.
Every output node-verified before authoring; injected byte-stably with a round-trip guard and the injector refusing any
lesson that already has `data-code`.
Verified: gate ALL GREEN (**23 code-exercises verified** — every new output matches its `data-expected`); **via
`--dump-dom`** the dl-activation widget hydrates, runs → `0.00 1.70`, and shows "✓ Output matches expected"; all-routes
smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v221` → `atlas-v222`.

## iter 280 — Step-back: full-site health sweep (clean) + Hall progress-bar sweep (animation)
**Step-back (every ~10 iters).** Health check of 270–279: workflow · examples · UI/UX · content · viz · a11y · gamification
· content · viz · new-functionality — a healthy, fully-diverse rotation; no bugs shipped (caught the focus-timer debris and
the viz-note `$` landmine before commit). **Comprehensive route sweep** (first full one since 250): drove **all 226 routes**
— 148 lessons, 60 Lab widgets, 7 course pages, 11 top-level pages — in one session trapping JS + KaTeX errors. Result:
**errs=0, kErr=0 across every route** — 30 iterations of byte-stable injections (deep-dives, examples, viz, code) broke
nothing. State of the codex: 148 lessons · 2,368 MCQs · 889 cards · 442 homework · 301 examples · 60 viz · 53 deep-dives ·
25 code exercises · 133 glossary · 57 achievements. The site is mature and healthy; performance is settled (iter 265).
**The ship (animation, stalest area).** The achievement-Hall progress bars were the one place the "bars sweep up from
empty on landing" flourish was missing — `.a-prog-fill` had no transition and `viewAchievements` never called `sweepBars`,
so the Hall's per-achievement progress + collection bar snapped in while course/Progress pages animated. Fixed: added the
`width` transition to `.a-prog-fill`, extended `sweepBars` to also target `.a-prog-fill` / `.ach-progress-fill`, and called
`sweepBars(app)` in `viewAchievements` — so the Hall now fills its bars on landing, consistent with everywhere else
(reduced-motion safe via the existing `sweepBars` guard).
Verified: gate ALL GREEN; **via `--dump-dom`** the Hall's `.a-prog-fill` bars carry their target widths + a `0.7s` width
transition (20/33 in-progress on the seed) and `errs=0`; the 226-route sweep is clean; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v220` → `atlas-v221`.

## iter 279 — Focus timer: optional time-boxed study sessions (new functionality)
The site's whole premise is "studying alongside a full-time job," where time is scarce and a focused block beats a vague
intention — but there was no study-session tool (new-functionality was the stalest area, last 264). Added a **focus
timer**: launch a **25- or 50-minute** session from the command palette (⌘K → "focus"), and a small **persistent
countdown pill** appears in the corner (⏳ MM:SS · pause · stop). It's a fixed element + a module-level interval, so it
**rides along as you navigate** lessons. On completion it plays a **gentle three-note Web-Audio chime** (the AudioContext
is created on the start click so the delayed chime is allowed to play), **flashes the browser-tab title** ("✓ Focus
complete" — so it reaches you even in a background tab), and toasts the result. No XP for time (ungameable by design) —
just a calm nudge. Transient state only — **no save-shape change**; hidden in print.
Verified: gate ALL GREEN; **via `--dump-dom`** driving the real flow — ⌘K → "focus" surfaces both commands at the top;
clicking the 25-min one shows the pill at **25:00**, which ticks to **24:59**; the pause button toggles to ▶; the stop
button removes the pill; `errs=0`; all-routes smoke **errs=0/kErr=0 (12 routes)**. (Completion chime/toast is the trivial
`remaining≤0 → stop(done)` branch; not headless-timed at 25 min.) SW cache `atlas-v219` → `atlas-v220`.

## iter 278 — SVD "rotate · stretch · rotate" visualizer — 60th widget (visualizations)
`la-svd` ("The Singular Value Decomposition") had a deeper-dive ("the SVD as rotate-stretch-rotate") but **no widget** —
and the SVD is the most geometric idea in linear algebra. Added the **60th Lab widget `la-svd`**, embedded in that lesson:
the unit circle and standard basis are pushed through **A = UΣVᵀ** in four steppable stages — ① the circle, ② after the
**Vᵀ** rotation (the shape is unchanged but the colored tick-dots and basis spin), ③ after the **Σ** stretch (the circle
becomes an **axis-aligned ellipse** with semi-axes σ₁, σ₂), ④ after the **U** rotation (the final tilted ellipse). Four
sliders set the two rotation angles and the two singular values; the note shows that the ellipse's semi-axes *are* the
singular values and that `det A = ±σ₁σ₂` is the area-scaling factor. Note is **plain unicode** (no `$`, viz-note landmine).
app.js `viz-complete` fallback 59 → 60.
**Also:** re-audited the recent additions at **390px** (the new viz + dashboard) — `docOver=0` everywhere, no mobile
regression after 12 iters of UI changes.
Verified: gate ALL GREEN (**60 widgets**, embed resolves); **node** — the constructed `A = UΣVᵀ` (35°, σ=2.4/1.0, 20°)
has singular values exactly **2.400, 1.000** and `det = 2.400` (a genuine SVD, not a fudge); **via `--dump-dom`** stage
buttons switch the note correctly, `rawDollar=0`, `errs=0`, the lesson embed hydrates; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v218` → `atlas-v219`.

## iter 277 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the owner's depth directive, added **4 "Deeper dive" expandables** on flagship hard lessons that lacked one,
across four topics (deep-dives 49 → **53**):
- **dl-attention-mechanism** — attention as a *soft, differentiable dictionary lookup*: query·key → softmax → weighted
  values; content-addressable memory made continuous (scaled by $1/\sqrt{d_k}$).
- **c-improper-integrals** — an improper integral as a *limit in disguise*: $\int_1^{\infty}=\lim_{b\to\infty}\int_1^{b}$;
  $\int_1^{\infty}x^{-p}$ converges iff $p>1$ ($1/x^2$ converges, $1/x$ diverges).
- **rl-actor-critic** — actor-critic as *REINFORCE with a baseline*: act on the advantage $A=G_t-V(s)$ — same expectation
  (no bias), far less variance.
- **la-inverse-and-systems** — why you *almost never* form $A^{-1}$: solving $A\mathbf{x}=\mathbf{b}$ by $LU$/elimination
  is ~3× cheaper and numerically safer; the inverse is the right mental model, the wrong computation.
Authored with `String.raw` LaTeX; injected byte-stably with a round-trip guard + even-`$`, no-`**`, and tag-balance
pre-guards (incl. `<code>`).
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders with its summary, KaTeX typesets
(1 / 7 / 3 / 11 spans) and **kErr=0, rawDollar=0** on all four; all-routes smoke **errs=0/kErr=0 (12 routes)**. No
save-shape change. SW cache `atlas-v217` → `atlas-v218`.

## iter 276 — "Best study day yet!" — completing the personal-bests celebration trio (gamification)
The Personal Bests panel tracks three lifetime records — longest streak, best test score, and **biggest single-day XP**.
Two of the three already celebrate *in the moment* (🏆 record streak, 🎯 best test), but beating your best-ever day was
shown only statically. Added the missing **"⚡ Best study day yet!"** toast: the instant today's running XP total crosses
your previous best-ever day, it fires once. Detected cleanly inside `addXP` by catching the *crossing* (today's total was
≤ the prior best before this gain, and exceeds it after) — so it fires **exactly once per day, never on your very first
active day** (no prior record to beat), and needs **no new persisted state** (a transient `_bestDaySet` signal, drained by
the UI in `flushAchievements()` right beside the existing goal/streak toasts).
Verified: gate ALL GREEN; **node test** — a save with a prior best of 200 stays quiet at today=150, fires `230` when a
gain crosses to 230, then stays quiet on further same-day gains, and a first-ever active day never fires; **in-browser**
completing a lesson (today 0→50, prior best 30) raises "⚡ Best study day yet! 50 XP today — a new single-day record"
alongside the normal completion toasts; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v216` → `atlas-v217`.

## iter 275 — Screen-reader fixes: live quiz feedback + labeled test selects (accessibility)
An a11y pass (the stalest area, last 263) caught two real gaps. **(1) Quiz feedback was silent to screen readers.** When
you answer a question, "Correct ✓ / Not quite" plus the explanation is injected into a slot — but those slots weren't
live regions, so a screen-reader user heard *nothing* and had to go hunting for the result. Added `aria-live="polite"` to
all three instant-feedback slots: the per-lesson **Quiz** (`#explain-slot`), the inline **Quick Check**
(`.qc-explain-slot`), and the **Daily-Mix / mastery drill** (`#md-explain`) — so the verdict and explanation are now
announced the moment they appear. **(2) The test-config selects were unlabeled.** The "Scope" and "Length" `<label>`s sat
next to `#t-scope` / `#t-len` with no `for=`, so they weren't programmatically associated — a screen reader announced the
dropdowns with no name. Added `for="t-scope"` / `for="t-len"` (which also makes the label text click-to-focus the select).
Verified: gate ALL GREEN; **via `--dump-dom`** — answering a quiz question leaves `#explain-slot` with
`aria-live="polite"` and the "Correct/Not quite" text inside it; on `#/test` both `label[for="t-scope"]` and
`label[for="t-len"]` resolve to their selects; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW
cache `atlas-v215` → `atlas-v216`.

## iter 274 — Statistical-power visualizer — 59th widget (visualizations)
Probability & Statistics was the thinnest viz topic (6), and `ps-errors-and-power` ("Type I & II Errors and Statistical
Power") — one of the most-misunderstood topics in stats — had **no widget**. Added the **59th Lab widget `ps-power`**,
embedded in that lesson: two overlapping normal curves, the null **H₀** (mean 0) and an alternative **H₁** (mean = effect
size *d*), with a draggable **decision threshold**. The shaded tails make the whole logic concrete — **α** (Type I /
false positive: H₀ right of the threshold, rust), **β** (Type II / miss: H₁ left of it, gold), and **power = 1 − β** (H₁
right of it, sage) — with live numbers. Two sliders (threshold, effect size) and presets (α=0.05, large effect,
underpowered) let you *feel* the trade-offs: move the threshold right → α shrinks but β grows; push the curves apart →
power climbs. Uses an erf-based Φ; note is **plain text** (no `$`, per the viz-note landmine). app.js `viz-complete`
fallback 58 → 59.
Verified: gate ALL GREEN (**59 widgets**, embed resolves); **via `--dump-dom`** the note computes correctly — at
threshold z=1.65, d=2: **α=0.050 · β=0.361 · power=0.639** (and rawDollar=0, confirming no un-rendered `$`); sliders +
presets update it; the lesson embed hydrates (canvas present); all-routes smoke **errs=0/kErr=0 (12 routes)**. No
save-shape change. SW cache `atlas-v214` → `atlas-v215`.

## iter 273 — Four more deeper-dives on flagship hard lessons (content / understandability)
Continuing the owner's depth directive, added **4 "Deeper dive" expandables** on flagship hard lessons that lacked one,
spread across four topics 265 didn't deepen (deep-dives 45 → **49**):
- **dl-gans** — a GAN is a two-player <em>minimax game</em>, not an optimization; the target is a Nash equilibrium, which
  is why training oscillates and mode-collapses.
- **ps-poisson** — the Poisson distribution as the <em>law of rare events</em>: the binomial limit as $n\to\infty$,
  $p\to 0$, $np=\lambda$ fixed; one parameter is both mean and variance.
- **a-mst-union-find** — Kruskal's MST as greed made safe by the <em>cut property</em>, with Union-Find as the
  near-constant-time cycle test (pure prose, no math).
- **l-peft-lora** — LoRA as a low-rank patch $\Delta W = BA$ ($r \ll d$): why fine-tuning needs well under 1% of the
  weights, and why $W$ stays exact.
Authored with `String.raw` LaTeX; injected byte-stably with a round-trip guard + even-`$`, no-`**`, and `<details>`/
`<b>`/`<em>` tag-balance pre-guards (now also caught by the gate).
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders with its summary, KaTeX typesets
(9 / 11 / 0 / 22 spans — MST is intentionally prose) and **kErr=0, rawDollar=0** on all four; all-routes smoke
**errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v213` → `atlas-v214`.

## iter 272 — One-tap search on mobile (UI/UX)
Global search / the command palette is a flagship feature, but on mobile it was effectively hidden: the only tap target
(`🔎 Search`) lives in the **sidebar footer** — behind the hamburger, requiring tap-☰ → scroll → tap — and its on-screen
hint is the meaningless-on-touch "⌘K". Added a **search icon in the topbar** (`#topbar-search`, 🔎) wired to the same
`openPalette()`, shown **only when the sidebar collapses** (≤900px, mirroring the existing `.menu-btn` hamburger) so it
costs one tap on mobile and stays out of the way on desktop (which keeps the sidebar button + ⌘K). Also hidden in print.
Verified: **390px via dump-dom** — the icon computes `display: grid` (visible) and a click opens the palette
(`.palette-scrim` present), `errs=0`; **desktop 1200px** — it computes `display: none` (no desktop redundancy/clutter);
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v212` → `atlas-v213`.

## iter 271 — Three more worked examples on flagship hard lessons (examples)
Content is uniform (every lesson: 16 MCQs, ≥2 worked examples), so there were no thin spots to fill — but worked examples
are top-tier active learning and a fresher content type than my last two deep-dive iterations. Added a **3rd worked
example** to three flagship lessons that were at two, each covering a *new* technique the existing pair didn't (worked
examples 298 → **301**):
- **la-determinants** — a **3×3 determinant by cofactor expansion** (the existing two are 2×2 + singularity): expand along
  the first row, three signed $2\times2$ minors, $\det = 8 + 33 + 8 = 49 \ne 0 \Rightarrow$ invertible.
- **a-dynamic-programming** — **0/1 knapsack**, the flagship 2-D DP table (existing examples are 1-D Fibonacci + coin
  change): the skip-or-take recurrence, why greedy fails, max value $= 9$ (items 2+3) in $O(nW)$.
- **ps-normal-distribution** — a **z-score beyond the empirical rule** (existing examples cover σ-aligned cases): $P(X\le
  120)$ for $N(100,15)$, $z = 20/15 \approx 1.33$, $\Phi(1.33) \approx 0.9082 \approx 91\%$ — the general CDF/table case.
Every computed value was **node-verified** before authoring; injected byte-stably with a round-trip guard and pre-guards
for even-`$` parity and `<strong>` balance (the latter now also enforced by iter-270's gate lint).
Verified: gate ALL GREEN (**301 examples**); **via `--dump-dom`** each lesson's Examples tab now shows 3 items, the new
solution reveals with KaTeX (14 / 43 / 53 spans) and **kErr=0, rawDollar=0**, and the correct answer (49 / 9 / 0.9082)
appears; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v211` → `atlas-v212`.

## iter 270 — Gate strengthening: unbalanced-HTML-tag lint + step-back review (workflow)
**Step-back (every ~10 iters).** Health check of 260–269: content · UI/UX · viz · a11y · new-func · content · mobile-bugfix
· gamification · viz · animation — a healthy, fully-diverse rotation; a real mobile bug caught+fixed (266) and the
performance question settled (265). Most-neglected compass area: **workflow** (the gate, last touched 250) — so this
step-back hardens it.
**The ship:** added a **tag-balance lint** to `node gate.js`. An unclosed `<details>`/`<b>`/`<div>` (the kind of slip a
byte-stable HTML injection can introduce) renders silently-wrong — swallowing or mis-styling the rest of a lesson — and
the gate previously only caught `$`-parity and raw-markdown hazards. The new check counts opens vs closes for the paired
tags that do **not** auto-close (`details, b, strong, em, span, sup, sub, ul, ol, table, div, blockquote, code, pre`),
on math/code-stripped content so a `<` inside `$…$` or a code block can't be miscounted (an *unclosed* `<pre>`/`<code>`
still survives the strip and is caught).
Scoping was deliberate: a first pass that included flow tags flagged 5 lessons with an "unbalanced" `<p>` — but those are
`<p>…<h4>` cases where HTML **implicitly closes `<p>` before a block**, so they render correctly (false positives).
Excluding auto-closing tags (`p, li, td, th, tr, h3–h5, summary, …`) gives **zero false positives** while still catching
the dangerous classes. Left the 5 valid auto-closed `<p>` as-is.
Verified: `node gate.js` **ALL GREEN** across all 148 lessons with the new lint; an **8-case unit test** of the lint logic
passes — it catches unclosed `details`/`b`/`div`/`ul`, and correctly ignores `<` inside `$…$` and code, and benign
`<p>…<h4>` auto-closing. Only `gate.js` changed (a dev tool, not in the SW asset list) — the shipped site is byte-identical,
so no cache bump and no runtime risk.

## iter 269 — Consistency-strip cells pop in on landing (animation)
The dashboard's forecast bars sweep up and the hero stats count up on landing, but the **14-day consistency strip
appeared instantly** — the static odd-one-out. Added `sweepStrip()`: the strip's cells now **scale-in left-to-right** in a
staggered chronological wave (oldest → today), a small "your history builds up to today" beat that matches the forecast
sweep. Implemented as a CSS `@keyframes csPop` (scale+opacity) with `animation-fill-mode: both` and a per-cell inline
`animation-delay` (i·38ms, capped 540ms) — chosen over a transition+rAF because fill-mode guarantees the cells settle at
scale(1) and **can never get stuck hidden**. Reduced-motion safe twice over: the JS guard skips it, and the global
reduced-motion rule collapses the animation to ~instant (still ending visible).
Verified: gate ALL GREEN; **via `--dump-dom`** all 14 cells receive the `cs-pop` class with `animation-name: csPop` and a
correct staggered delay (cell 5 = 190ms = 5×38), `errs=0`; all-routes smoke **errs=0/kErr=0 (12 routes)**. (CSS
animations don't faithfully advance under headless virtual-time, so end-state is verified structurally + by the fill-mode
guarantee; it animates in-browser.) No save-shape change. SW cache `atlas-v209` → `atlas-v211`.

## iter 268 — Lagrange-multipliers visualizer — 58th widget (visualizations)
`c-lagrange-multipliers` ("Constrained Optimization & Lagrange Multipliers") is a flagship hard lesson that had a
deeper-dive but **no widget** — and constrained optimization is intensely visual. Added the **58th Lab widget
`calc-lagrange`**, embedded in that lesson: maximize `f(x,y)=x+y` on the unit circle `g: x²+y²=1`. A point slides around
the constraint (angle slider, keyboard-accessible) while the **level line of f** through it sweeps along, with **∇f**
(constant, diagonal, gold) and **∇g** (radial, violet) drawn from the point. When the line is **tangent** to the circle
the two gradients line up — the level line and point turn sage and the note reads "Tangent! … ∇f = λ∇g" — making the
Lagrange condition (parallel gradients at the constrained optimum) visible rather than abstract. Animated **▲ Maximize**
(→ θ=45°, f=√2) and **▼ Minimize** (→ θ=225°, f=−√2) buttons use `VIZUtil.loop` (smoothstep). app.js `viz-complete`
fallback 57 → 58.
Verified: gate ALL GREEN (**58 widgets**, embed resolves); **via `--dump-dom`** the slider-driven compute is correct —
θ=45° → (0.71, 0.71)=**1.414 "Tangent!" (maximum)**, θ=225° → −1.414 "Tangent!" (minimum), θ=100° → 0.811 "the line cuts
the circle" (not optimal); the lesson embed hydrates (canvas present); all-routes smoke **errs=0/kErr=0 (12 routes)**. (The
animated buttons use the standard rAF loop, which doesn't advance under headless virtual-time but works in-browser — the
slider exercises the same draw path.) No save-shape change. SW cache `atlas-v208` → `atlas-v209`.

## iter 267 — Weekly momentum on the dashboard — the missing medium-term horizon (gamification)
The motivation loop had a **daily** horizon (goal, streak) and a **lifetime** one (XP, levels, achievements) but nothing
in between — no answer to *"was this a good week?"* Added a **weekly-momentum line** to the existing consistency-strip card
(no new widget, no clutter): "📈 **N** XP this week · ▲/▼ X% vs last week", comparing the last 7 days of earned XP to the
7 before. Computed inside the strip's existing 14-day loop from the `activity` map — **no new state, no extra passes**.
Trend states: ▲ green when up, ▼ rust when down, "even with last week" when flat, and "▲ building momentum" when there's
no prior week to compare; the whole line hides for a brand-new user with zero activity (no "0 XP" noise). Thousands are
comma-formatted.
Verified: gate ALL GREEN; **via `--dump-dom`** all branches render correctly — up `320 XP · ▲ 19%` (320 vs 270), down
`50 XP · ▼ 83%`, new `150 XP · ▲ building momentum` (no prior week), none → line absent (zero activity), and comma
formatting `2,000 XP · ▲ 300%`; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v207` → `atlas-v208`.

## iter 266 — Fix: inline glossary tooltips caused sideways scroll on mobile (bugfix / mobile)
A 390px re-audit (first since iter 253, after ~10 UI iterations) found **lessons scrolling horizontally on mobile** —
la-determinants overflowed the viewport by 97px, c-chain-rule by 116px, while code-free lessons were clean. Bisected with
a per-element bounding-box probe (the `katex-mathml` a11y node was a red herring): the culprit is **`.gloss-pop`**, the
inline glossary tooltips. Each is `position:absolute; left:0; ~270px` wide and — crucially — **laid out even while hidden**
(`visibility:hidden`), so a glossary term in the right half of a line pushes its (invisible) popup past the right edge and
adds persistent horizontal page scroll. Long pre-existing (every lesson with a right-side term; first surfaced now because
my new code-exercise lessons happened to have such terms).
Fix: a `placeGlossPops()` pass that shifts any popup left just enough to fit inside the viewport (clamped so it never
leaves the left edge) — tooltips stay **fully visible**, no clipping, and the page stops scrolling sideways. Runs after the
lecture lays out (rAF + a post-KaTeX timeout) and on a debounced resize. Pure JS; no save-shape or CSS change beyond it.
Verified: **390px via dump-dom** — the four worst lessons went from docOver 97–125px → **0**, with popups now clamped to a
right edge of 380 (viewport−10) and still on-screen; **desktop** (1200px) smoke unaffected (docOver=0, no popups shifted
when there's room); all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v206` → `atlas-v207`.

## iter 265 — Five more deeper-dives + a performance verdict (content / understandability)
**Performance check (logged so the loop stops re-flagging it).** Measured the asset weights: data is ~5.3 MB raw but
**~1.5 MB gzipped** (GitHub Pages serves gzip), JS ~0.5 MB raw / ~0.13 MB gzipped, and the service worker caches
everything after the first visit — so the only recurring cost is JS parse at app-open, paid once per session by a single
user. Lazy-loading the topic data would break the global search / knowledge-map / daily-concept paths (they iterate all
COURSES), and minifying breaks the byte-stable inject pipeline. **Verdict: performance is fine for this single-user,
SW-cached site; no safe high-value win exists** — stop treating it as a must-do (recorded in ROADMAP notes).
**The ship:** 5 more "Deeper dive" expandables on flagship hard lessons that lacked one, deliberately covering the two
topics iter-260 missed (algorithms, calculus) plus three more (deep-dives 40 → **45**):
- **a-network-flow** — max-flow = min-cut: a maximization and a minimization that are the same number (LP duality).
- **c-multivariable-optimization** — the Hessian's eigenvalues classify every critical point (min / max / saddle).
- **la-symmetric-spectral** — a symmetric matrix as a pure stretch along perpendicular axes ($S = Q\Lambda Q^{\top}$).
- **rl-dqn** — experience replay (decorrelate data) + target network (stabilize the objective) as fixes for the two ways
  deep Q-learning diverges.
- **l-positional-encoding** — attention is permutation-invariant (a bag of words); RoPE makes the dot product depend on
  relative distance $m - n$.
Authored with `String.raw` LaTeX, injected byte-stably with a no-op round-trip guard per topic file.
Verified: gate ALL GREEN; per-lesson **via `--dump-dom`** each dive renders with its summary, KaTeX typesets
(8/6/7/2/4 spans) and **kErr=0, rawDollar=0** on all five; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape
change. SW cache `atlas-v205` → `atlas-v206`.

## iter 264 — Four interactive code exercises for the thinnest topics (new functionality / active learning)
Code exercises (write code → **Run** → instant ✓/✗ vs expected output, +15 XP on first solve) are some of the strongest
active-learning on the site, but were lopsided: algorithms had 9 while **calculus and linear algebra had just 1 each**.
Added **4 gate-verified JavaScript exercises** (21 → **25** lessons with code; gate now runs **20** JS exercises each
build, up from 16) in those two topics, each computing a core idea so the concept becomes runnable:
- **la-determinants** — `det` of a 2×2 as `ad − bc`, printing `5` (the area you drag above) and `0` (parallel columns →
  singular). Ties directly to iter-262's determinant-as-area viz in the same lesson.
- **la-dot-product-norms** — the dot product, showing orthogonality falls out as exactly `0` and `v·v = |v|²`.
- **c-derivative-definition** — the secant-slope limit `(f(x+h)−f(x))/h → f'(x)`, homing in on `6.00` for `f(x)=x²` at 3.
- **c-chain-rule** — central-difference vs analytic `f'(g)·g'`, both printing `54` (numeric == analytic).
Injected byte-stably with a no-op round-trip guard; each placed in a lesson that had **no** code (verified — see the
self-correction).
SELF-CORRECTION: my first pass dropped a Riemann-sum exercise into `c-definite-integral-riemann`, which **already had
one** (the count said "calculus: 1" but didn't say *where*) — so the lesson briefly held two near-identical Riemann
exercises. Caught by listing per-lesson `data-expected` values post-inject (saw `0.3333` and `0.333` side by side),
reverted `calculus.js`, and re-injected into code-free lessons instead (`c-derivative-definition`, `c-chain-rule`), with
the injector now refusing any lesson that already contains `data-code`. Lesson: a per-*topic* count isn't enough — check
the per-*lesson* target is actually empty before adding.
Verified: gate ALL GREEN (**20 code-exercises verified** — every new one's output matches its `data-expected`); **via
`--dump-dom`** the la-determinants widget runs → `5 0` and the c-chain-rule widget runs → `54 54`, both showing "✓ Output
matches expected"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v204` → `v205`.

## iter 263 — Finish the keyboard-viz a11y story: projection + discoverability (accessibility)
Closed the two loose ends logged after iter 259's keyboard-viz work. (1) **la-projection is now keyboard-operable** — it
was the one draggable widget left out because its target `b` is stored as scalars `bx/by`, not an `{x,y}` object. Wired it
to the shared `VIZUtil.dragKeys` helper via a tiny getter/setter wrapper that maps `.x/.y` onto `bx/by` *and keeps the
same drag clamp* (x∈[−3,5], y∈[−3,4]); arrow keys now move `b` (canvas focusable, `role="img"` + aria updated). (2) **The
`?` shortcuts overlay now documents the viz controls** — a new "Interactive visualizations" group (Tab to focus · arrows
move the first vector/point · Shift+arrows the second), so the iter-259/262 keyboard support is discoverable instead of
hidden in aria-labels. All five draggable widgets (dot-product, vector-add, Gram-Schmidt, determinant, projection) are now
keyboard-operable and surfaced.
Verified: gate ALL GREEN; **via `--dump-dom`** la-projection reports `tabIndex=0`, ArrowRight+ArrowUp move `b`
(2.30,2.50)→(3.00,3.00), and 20×ArrowRight clamps x at 5.00 (drag range preserved); pressing `?` opens an overlay
containing "Interactive visualizations" and "Shift"; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change.
SW cache `atlas-v203` → `atlas-v204`.

## iter 262 — Determinant-as-signed-area visualizer — 57th widget (visualizations)
Linear algebra had the fewest widgets (7), and the determinants lesson ("Volume, Orientation, and Invertibility") only
embedded the *generic* transform viz — nothing showing the determinant itself, even though a deep-dive already leans on
"det = volume-scaling." Added the **57th Lab widget `la-determinant`**, embedded in `la-determinants` alongside the
transform viz: drag the **two columns of a 2×2 matrix** and the parallelogram they span updates live — its **area is
|det|**, the fill is **sage when det > 0** (orientation preserved) and **rust when det < 0** (flipped), and it
**collapses to a line exactly when det = 0** (columns parallel → singular, no inverse). A faint dashed unit square anchors
the "area-scaling factor" reading; preset buttons (Identity, Shear area=1, Scale ×2 area=4, Reflect, Singular) make the
key cases one tap away. Built keyboard-accessible from the start via the iter-259 `VIZUtil.dragKeys` helper (arrows move
column 1, Shift+arrows column 2) + `role="img"` aria description. Note is plain HTML (no `$`, per the viz-note landmine).
app.js `viz-complete` achievement fallback 56 → 57.
Verified: gate ALL GREEN (**57 widgets**, embed resolves); **via `--dump-dom`** the live note computes correctly across
presets — default `det=(2)(2)−(-1)(1)=5`, Singular `(2)(2)−(4)(1)=0` ("collapses to a line → singular"), Identity `=1`,
and a keyboard ArrowRight on Identity moves column 1 → `det=1.5`; lesson `la-determinants` embeds it and renders clean;
all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v202` → `atlas-v203`.

## iter 261 — Resume-reading position for long lessons (UI/UX)
The step-back (260) flagged UI/UX as overdue. Long lessons are easy to leave half-read, but reopening one always dropped
you back at the top. Now Atlas **remembers how far you scrolled in each lesson** and offers a one-tap jump back. Saved on
scroll (throttled, piggybacking the existing reading-progress rAF) into its own `atlas.readPos` localStorage map — UI
state like `textScale`, so **no main-save shape change**; bounded to the 40 most-recent lessons. On reopening a lesson
with a saved spot, a dismissible **"⤓ Resume where you left off"** pill fades in bottom-center; clicking smooth-scrolls
there. Deliberately **not** an auto-scroll — that's jarring and unreliable while KaTeX/viz layout settles late; the pill
lets the reader choose, and only appears once the page is actually tall enough for the target (so a layout mismatch never
strands the pill). Guards: only saves depth > 200px; only offers a resume > 400px; skips if you've already scrolled in;
auto-dismisses after 9s; cleared on navigation.
SELF-CORRECTION: first wired the call as `offerResume(lid)` inside `renderLecture(body, course, lesson, …)` — which has
no `lid` (its id is `lesson.id`), so the call threw "lid is not defined" *after* the lecture's innerHTML had already
painted (so content looked fine but the tail silently died). Caught only because the pill never appeared and step-through
instrumentation (`--dump-dom` + `window.__vlErr`) localized it. Lesson: when adding a call at the end of a render fn,
confirm which function you're in and its actual param names — a thrown tail step won't surface as a blank screen.
Verified: gate ALL GREEN; **via `--dump-dom`** (+ a `scrollTo` spy, since headless can't really scroll) — with a seeded
`readPos` of 1200 the pill renders ("⤓ Resume where you left off") and clicking scrolls to exactly 1200 then dismisses;
**negative cases** confirmed silent (empty map → no pill; saved 150px < threshold → no pill); entrance is pure-CSS
`@keyframes` with base `opacity:1` (robust even if reduced-motion disables the animation); all-routes smoke
**errs=0/kErr=0 (12 routes)**. SW cache `atlas-v201` → `atlas-v202`.

## iter 260 — Five deeper-dives on flagship hard concepts + step-back review (content / understandability)
**Step-back (every ~10 iters).** Health check of 250–259: workflow → viz → content → animation → new-function → viz →
bugfix → understandability → gamification → accessibility — a healthy, varied rotation, plus an owner-reported streak bug
fixed (256). Surfaces spot-checked clean this turn: flashcard sessions already show "label · i/N"; lesson tabs `flex-wrap`
on mobile; fonts load with `display=swap` + preconnect. Most-neglected areas remain **performance** (no clean win —
minify breaks the byte-stable inject pipeline; lazy-load risks the all-COURSES search/map/daily-concept paths) and
**UI/UX** (last 244) — both queued, neither broken. The ship leaned into the owner's deepest love (concept depth).
**The ship:** added **5 "Deeper dive" expandables** to flagship hard lessons that lacked one, each an *alternative "aha"
framing* rather than a rehash (deep-dives 35 → **40**):
- **dl-transformer-architecture** — a block is just "mix across tokens (attention), then think per token (MLP)" over a
  residual stream you read/write but never overwrite.
- **l-tokenization-bpe** — BPE *is* greedy compression (merge the most frequent pair, repeat); why models can't spell.
- **rl-monte-carlo** — MC vs TD as "wait for the truth" (unbiased/high-variance) vs "trust your own guess"
  (bootstrapped/low-variance); the whole spectrum is just how far you look before trusting your value function.
- **ps-p-values** — what a p-value is *not*: it is P(data | H0), never P(H0 | data) — the prosecutor's fallacy, plus
  why significance ≠ effect size.
- **la-low-rank-pca** — PCA is just the SVD of centered data; "max-variance directions," "best rank-k fit"
  (Eckart-Young), and "covariance eigenvectors" are three views of one decomposition.
Authored with `String.raw` LaTeX, injected byte-stably with a no-op round-trip guard before mutating each of 5 topic
files (so a serialization drift can't corrupt data).
Verified: gate ALL GREEN (148 lessons · 2368 MCQs · 56 widgets · 133 glossary); per-lesson **via `--dump-dom`** each new
deep-dive renders with its summary, KaTeX typesets (11/5/1/11/9 spans) and **kErr=0, rawDollar=0** on all five; all-routes
smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache `atlas-v200` → `atlas-v201`.

## iter 259 — Keyboard-operable draggable-vector visualizers (accessibility)
The signature draggable-vector widgets were **mouse/touch-only** — a keyboard or screen-reader user couldn't change the
inputs at all. Made the three `{x,y}`-vector canvases keyboard-operable via a shared `VIZUtil.dragKeys(c, getItems,
redraw)` helper: the canvas becomes focusable (`tabindex=0`, with a gold `:focus-visible` ring), **arrow keys nudge the
first vector and Shift+arrows the second** (same ½-grid snap as dragging, clamped to ±7). `getItems()` returns the live
vectors so it survives widgets that *reassign* them on a preset (e.g. dot-product's Acute/Obtuse buttons). Applied to
**la-dot-product, la-vector-add, la-gram-schmidt**, each with an updated `aria-label` telling the user about the keys
(and vector-add gained a `role="img"` label it previously lacked).
Verified: gate ALL GREEN; **via `--dump-dom`** (screenshots were hitting the known black-PNG profile-lock flakiness) —
all three report `tabIndex=0` and focusable, and key events move the right vector: dot-product `a (3,1)→(3.5,1)` on
ArrowRight + `b (1,2.5)→(1,3)` on Shift+ArrowUp; vector-add `u→(2.5,1)`, `v→(-1,1.5)` with `u+v` recomputed; gram-schmidt
`v1→(3.5,0.5)`, `v2→(1.5,2)`; all-routes smoke **errs=0/kErr=0 (12 routes)**. No save-shape change. SW cache
`atlas-v199` → `atlas-v200`.

## iter 258 — Two reward moments that used to pass silently (gamification)
Two genuine rewards happened with **no feedback**: you'd *earn a streak-freeze* at a 7-day milestone (set silently in
`touchStreak`) and *beat your best test score* with nothing to mark it. Surfaced both as celebratory toasts, matching the
existing daily-goal / record-streak moments:
- **❄️ "Streak freeze earned!"** — fires at boot when a 7-day milestone actually grants a freeze (new `freezeEarned()`
  signal, set only when the count rises *below the cap of 3*, so it never lies when you're already maxed).
- **🎯 "New best test score!"** — fires from the test result when your percentage strictly beats every prior test
  (≥5-question tests only; first-ever test stays quiet). Computed from the existing `tests` history — **no new state**.
No save-shape change (`freezeEarned` is a runtime signal; `freezes`/`tests` already existed).
Verified: gate ALL GREEN; **node tests** — `touchStreak` taking streak 6→7 grants a freeze and signals `freezeEarned`
(true once, then consumed; and *not* signalled when already at the 3-freeze cap); the best-test firing logic passes all 6
cases (first-test silent, beat→fires, tie/worse/short/prior-only-short→silent); **in-browser** the boot freeze toast shows
"❄️ Streak freeze earned! … (you have 1)" on a 6→7 streak; all-routes smoke **errs=0/kErr=0 (12 routes)**.
SW cache `atlas-v198` → `atlas-v199`.

## iter 257 — Deepen the inline glossary for the two thinnest topics (understandability)
The glossary powers inline hover/tap tooltips on the first occurrence of each term in lecture prose, so coverage shapes
how much a reader can decode without leaving the page. **Algorithms and reinforcement learning were the two thinnest (11
each)** despite dense vocabulary. Added **16 high-value terms** (glossary 117 → **133**):
- **Algorithms (+8)**: binary search, recursion, memoization, binary search tree, heap, topological sort, shortest path,
  loop invariant.
- **Reinforcement learning (+8)**: discounted return, temporal-difference learning, SARSA, advantage function,
  actor-critic, off-policy, experience replay, eligibility trace.
Per-topic counts are now balanced (16–22 across all seven). Skipped over-generic terms that would false-match in prose
(e.g. "return", "advantage", "stack" → used "discounted return", "advantage function" instead). Definitions carry KaTeX
math; the injector guards even-`$` parity and bans raw `**`; the gate independently re-lints every def + flags dup terms.
No save-shape change (static data).
Verified: gate ALL GREEN; the **Glossary page renders all 133** (new terms present); on the SARSA lesson the new terms
**wrap inline (6 tooltips)** with their definition math **KaTeX-rendered in the popup** (5 `.katex`); all-routes smoke
**errs=0/kErr=0 (12 routes)**. SW cache `atlas-v197` → `atlas-v198`.

## iter 256 — Fix: consistency-strip squares now match the streak (bugfix — owner report)
**Owner-reported:** the dashboard's 14-day consistency strip "always shows [empty] squares" despite a running streak.
Root cause: the **streak and the strip measured different things.** The streak advances whenever you *open the app*
(`touchStreak` at boot sets `lastActive`), but the strip lit a square only on days you *earned XP* (`activity[day] > 0`).
So a user who kept a streak by visiting daily — without completing a lesson/quiz some days — saw a positive streak above
a row of empty squares. (Verified: a fresh boot gives `streak=1` but `activity-days=0`; earning XP *does* light today's
cell, confirming the strip itself worked — the inputs just diverged.)
Fix: record **active days** and light the strip on *active-or-XP* days, so the squares reflect the same days the streak
counts. New `activeDays` map in state (`blank()` + `load()` typeof-merge; old saves load as `{}`); `touchStreak` marks
today on every open (even a no-XP visit, even a same-day repeat); and a **one-time backfill in `load()` reconstructs the
current streak's N days** (a streak of N ⇒ the N consecutive days ending at `lastActive` were active) so the strip
*immediately* matches the streak the header shows. The consistency strip now lights a cell when `activity[day] > 0` **or**
`activeDays[day]`. No change to XP/heatmap/best-day semantics.
Verified: gate ALL GREEN; **node test** — a 5-day-streak/zero-XP save backfills exactly the last 5 days, today stays
marked after a same-day repeat-touch, and an old streakless save loads `activeDays={}`; **in-browser** — a 4-day streak
with *zero* XP now lights the last 4 squares (today ringed, "studied 4 of the last 14 days") where before they were all
empty; all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v196` → `atlas-v197`.

## iter 255 — Policy-gradient (REINFORCE) visualizer — 56th widget (visualizations)
RL was the thinnest viz topic (5). Its advanced lessons (policy gradients, actor-critic, DQN) had no visuals because
they're abstract — so the policy-gradient *update* never became concrete. Added the **56th Lab widget
`rl-policy-gradient`** in `rl-policy-gradient-theorem` (after its "one-step bandit" worked example, which it mirrors): a
softmax policy over three actions A/B/C with fixed rewards (−1, +2, +0.5). Each **step / play** does exact gradient ascent
on `J = Σ πᵢRᵢ` (`∂J/∂θⱼ = πⱼ(Rⱼ − J)`): bars rise for actions whose reward beats the running average (positive
**advantage**, ▲ sage) and fall for the rest (▼ rust), so probability concentrates on **B** and the expected-return
sparkline climbs toward +2. Deterministic (exact expected gradient, no sampling); `VIZUtil.loop` for play (stopAll-safe);
plain-HTML note (no `$`, per the viz-note landmine). app.js viz-complete fallback `|| 55` → `|| 56`.
Verified: gate ALL GREEN (**56 widgets**, embed resolves); after 40 steps B → **98%**, expected return **J = 1.969**
climbing toward +2 with the sparkline rising; all-routes smoke **errs=0/kErr=0 (12 routes)**; 390px mobile scales.
SW cache `atlas-v195` → `atlas-v196`.

## iter 254 — Adjustable new-cards-per-session pace (new functionality)
The Daily Review introduced new flashcards at a **fixed `NEW_CARDS_PER_SESSION = 30`** — fine as a default, but a power
user wants to learn faster and a stretched one wants lighter sessions, with no way to choose. Made it a **personalization
setting**: a "New flashcards / review session" control in Settings (5–100), backed by a new `newPerSession` state field
(`blank()` + `load()` with a `Number.isFinite` clamp to 5–100; old saves default to 30 — a prior-shape save still loads).
The Daily Review now caps new-card intake at `Store.raw.newPerSession` (falling back to the constant). This directly tunes
the core "remember longer" loop to the learner's bandwidth.
Verified: gate ALL GREEN; **node test** — default 30, `setNewPerSession` clamps (999→100, 1→5, NaN→30), and a save lacking
the field loads as 30; **in-browser** — with the cap seeded to 8, the Daily Review shows exactly **8 "new this session"**
(out of 889 new cards), the Settings input reflects the stored value and saving it updates `Store.newPerSession` to 15
with a toast (`errs=0`); all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v194` → `atlas-v195`.

## iter 253 — Smoother page-entrance cascade + mobile re-verified (animation / juice)
The `.reveal` entrance stagger only assigned per-item delays to `nth-child(1–8)`; on content-rich pages (the dashboard,
Progress, and Hall all render 15–18 `.reveal` sections) **every item from the 9th on inherited `animation-delay: 0` and
popped in at once** — actually *before* the staggered ones finished, a visible double-beat. Reworked it: a snappier
**.04s step extended through 14 items**, with everything past `nth-child(14)` sharing a single **capped .60s** delay, so
long pages keep cascading smoothly and never feel sluggish. Reduced-motion still disables it entirely.
Paired it with a **fresh 390px mobile audit** of the ~14 features shipped since the last dedicated pass (iter 239) —
the in-module navigator, personal-bests panel, review forecast, lesson-complete stamp, and the new Gram-Schmidt/Dijkstra/
DP widgets — all render cleanly at 390px (breadcrumb wraps, dot strip + forecast bars fit, no overflow). Nothing to fix.
CSS-only change (+ SW bump).
Verified: gate ALL GREEN; on the 18-section Progress page the computed `animation-delay` now climbs (`.08 → .36 → .44`)
and **caps at `.60s` past item 14 — no `delay:0` items beyond the 8th** (the bug); all-routes smoke **errs=0/kErr=0
(12 routes)**; dashboard + lesson screenshots clean at 390px. SW cache `atlas-v193` → `atlas-v194`.

## iter 252 — Five more deeper-dives on hard concepts (content depth)
Content depth was the least-recently-touched substantive learner-facing area (last at iter 241) and is the owner's most-
stated love. Added **5 new "Deeper dive" expandables**, one per topic for breadth, each a genuine *aha* (deep-dive
coverage ~30 → **~35**):
- **Deep learning · Optimizers** — Adam decomposed: first moment = momentum, second moment = RMSProp's per-parameter
  scale, plus the bias correction that keeps the first steps from being tiny.
- **RL · Trust Regions & PPO** — *why clip?* The data is collected by the current policy, so one bad step poisons all
  future rollouts; the clipped surrogate flattens the objective past 1±ε so there's no incentive to leap — a pessimistic
  lower bound on improvement.
- **Algorithms · Greedy** — when greedy is *provably* optimal: the exchange argument + greedy-choice property, and why
  0/1 knapsack breaks it (so it needs DP).
- **Calculus · Convexity** — why convexity makes optimization easy: the segment-above-the-graph definition ⇒ every local
  min is global ⇒ `∇f=0` flips from necessary to sufficient.
- **Prob & stats · Joint distributions** — independent (`p(x,y)=p(x)p(y)`) vs uncorrelated (`Cov=0`, linear only), with
  the `Y=X²` counterexample (perfectly dependent yet uncorrelated) and the jointly-Gaussian exception.
Authored with `String.raw` single-backslash LaTeX; byte-stable injector with a per-file no-op guard; content-append only,
no save-shape change.
Verified: gate ALL GREEN — its render-hazard lint covers the appended deep-dive content (`$`-parity, no raw markdown);
the Adam dive renders with **6 KaTeX expressions, kErr=0, rawDollar=0** (both display equations correct); a smoke across
all 5 lessons found **all 5 deep-dives present**, **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v192` → `atlas-v193`.

## iter 251 — Gram-Schmidt visualizer (55th widget) + focus-ring fix (visualizations)
Linear algebra had `la-projection` (project onto a line) but not the process that *builds an orthogonal basis*. Added the
**55th Lab widget `la-gram-schmidt`** in `la-orthonormal-gram-schmidt` (after the Gram-Schmidt section): drag two vectors
and watch the algorithm keep **u₁ = v₁**, then **subtract v₂'s projection onto u₁** (drawn as the gold bar + the dashed
perpendicular drop) so the remainder **u₂ = v₂ − proj** is perpendicular — a right-angle marker and a live **u₂·u₁ = 0**
readout prove it. A **normalize** toggle snaps to the orthonormal basis ê₁, ê₂ on a unit circle. Deterministic; plain-HTML
note; app.js viz-complete fallback `|| 54` → `|| 55`.
**Also fixed a focus-ring regression from iter 248:** the router's focus-the-heading-for-screen-readers move was
painting a visible gold `:focus-visible` ring on the `<h2>` after *every* navigation (the programmatic focus matched
`:focus-visible` in Chrome). Added `#app:focus, #app .page-head h2:focus { outline: none }` — the focus is for SR
announcement, not a keyboard landing, so it shouldn't draw a ring. Focus still moves (a11y intact); the ring is gone.
Verified: gate ALL GREEN (**55 widgets**, embed resolves); default state renders u₁/v₂/proj/u₂ with the right-angle
marker and **u₂·u₁ = 0** (hand-checked: v₁=(3,0.5), v₂=(1.5,2.5) → u₂=(−0.36, 2.19)); the normalize toggle shows ê₁/ê₂ on
the unit circle; the heading **outlineStyle is now `none` with focus still on the H2** (ring fix confirmed, before/after);
all-routes smoke **errs=0/kErr=0 (12 routes)**; 390px mobile scales. SW cache `atlas-v191` → `atlas-v192`.

## iter 250 — Step-back: whole-site health sweep + two more gate guards (workflow / dev-flow)
The round-number reflection. **Loop health (240–249):** a genuinely diverse rotation — workflow, content, viz×2,
gamification×2, UI/UX, new-functionality, animation, accessibility — no area starved. The site is measurably richer and
more polished than at iter 240 (viz 52→54, glossary 117, code exercises now rewarded with XP+achievements, lesson-complete
celebration, SPA focus management, notes export, in-module navigator, personal bests). **Most-neglected:** performance
(still deferred — minifying the data breaks the byte-stable inject pipeline; lazy-loading is risky; first-load parse is
cached after visit one, so it doesn't yet hurt enough to justify the risk).

Shipped a **dev-flow** ship in the iter-240 spirit (protect all the work to come):
1. **Comprehensive health sweep** (verification): drove **all 202 routes — every one of the 148 lessons + all 54 lab
   widgets** — trapping `error`/`unhandledrejection`/`.katex-error` per route. Result: **errs=0, kErr=0, zero problems on
   any route.** The whole surface renders clean, not just the usual ~12-route smoke.
2. **Two new gate guards** (`gate.js`): (a) **dangling internal links** — any hand-authored `#/lesson/<topic>/<id>` in
   content must resolve to a real lesson (future-proofs deep-dive cross-references; 0 today); (b) **achievement
   reachability** — loads `store.js` (localStorage-stubbed) for the `ACHIEVEMENTS` ids and cross-checks app.js's
   `ACH_CATEGORIES`, failing if any achievement is in `store.js` but no Hall category (would be invisible) or if a
   category names a non-existent id. Summary line gains `· N internal links ok`.
Verified: gate ALL GREEN with the new checks (57 achievements all reachable); **negative-tested** the achievement guard
(injecting an orphan achievement made the gate FAIL with a precise message + exit 1; restoring → GREEN). `gate.js` is a
dev tool (not served), so no SW-cache bump and no app change.

## iter 249 — Solving a code exercise now rewards XP + achievements (gamification / new functionality)
The 21 embedded code exercises were *disconnected from the progression loop* — getting one right showed a green "✓
matches" and nothing else (no XP, no achievement), so a whole pillar didn't "count." Wired solving into the reward system:
- The Playground's `check()` now fires an **`onSolve` callback** when output matches; `hydrateCode` passes one keyed by a
  stable hash of `lang|expected|code`, so each exercise is **rewarded once**: **+15 XP** + a "🧪 +15 XP — Exercise solved!"
  toast on the first solve, deduped via a new `solvedCode` map in state (added to `blank()` + the `load()` typeof-merge).
- Two new achievements: **🧪 "It Runs!"** (solve your first exercise) and **⌨️ "Code Adept"** (solve 10), wired into the
  Hall's *Exploration & Practice* category and the nearest-achievement progress map (**55 → 57 achievements**).
No data change (store/app/playground only).
Verified: gate ALL GREEN; **node unit test** — first solve +15 XP, re-solving the same exercise awards nothing (dedup),
distinct solves increment the count, `code-solver` then `code-adept` unlock at 1 and 10; **end-to-end in-browser** —
clicking Run on the expectation/variance exercise took XP 0→15, `solvedCode`=1, unlocked `code-solver`, showed the
`pg-check.ok` + the toast (`errs=0`); the Hall renders "It Runs!"; all-routes smoke **errs=0/kErr=0 (12 routes)**.
SW cache `atlas-v190` → `atlas-v191`.

## iter 248 — SPA focus management on route change (accessibility)
Accessibility was the most-overdue lane (last at iter 234). A classic single-page-app gap: the router updated the page
`<title>` and scrolled to top, but **never moved focus** — after navigating, a keyboard or screen-reader user was
stranded on the (now-removed) element they clicked, with no announcement of the new view. Fixed it the standard way:
after each route renders, **move focus to the new view's main `<h2>` heading** (falling back to the `#app` main region),
so screen readers announce the page name and keyboard focus lands at the top of the new content.
- Guarded against modals (`.intro-ov`/`.palette-scrim`/`.levelup-ov`/`.sc-ov` keep their own focus), uses
  `focus({preventScroll:true})` so there's **no scroll jump**, and sets `tabindex="-1"` on the heading so programmatic
  focus produces **no visible focus ring** for mouse users (only keyboard `:focus-visible` would).
No new state, no data change (app.js only).
Verified: gate ALL GREEN; navigating to a lesson moved focus to its H2 ("Vectors and Vector Operations") and to Progress
moved it to "Your Progress", with **scrollTop=0** and the heading's `outlineStyle=none`; the **modal guard holds** (with
the intro tour open, focus stays on its "Start learning" button, `focusInsideIntro=true`); an all-routes pass showed
**14/14 routes move focus to the heading**, `errs=0/kErr=0`. SW cache `atlas-v189` → `atlas-v190`.

## iter 247 — A "you did it" beat when you complete a lesson (animation / juice)
Juice was the most-overdue lane (last at iter 237). The most *frequent meaningful* action — marking a lesson complete
(done up to 148 times across the journey) — was flat: a toast + a button text swap. Gave it a celebration proportional to
its meaning: on completion a **sage ✓ stamps in the center of the screen** (scale-pop with a soft glow, ~0.9s) and the
**Mark-complete button pops** and turns sage. It escalates naturally — a lesson that *also* finishes its module still
fires the bigger "📗 Module complete!" confetti on top, so single-lesson vs whole-module read as distinct tiers.
New `celebrateLessonDone(btn)` helper (a transient `.lesson-stamp` element + a `.lesson-done-pop` button class), called
from the complete handler; **reduced-motion safe** (the stamp is skipped under `prefers-reduced-motion`, and the global
rule stills the button pop). No new state, no data change (app.js + css only).
Verified: gate ALL GREEN; in-browser clicking Mark-complete adds the stamp (char `✓`, `animationName=lessonStamp`),
applies `lesson-done-pop` to the button, and swaps the text to "✓ Completed" (`errs=0`); a static render confirms the
big sage glowing ✓ centers on screen; all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v188` → `atlas-v189`.

## iter 246 — Notes export to Markdown (new functionality)
Rotating off viz (which had run 231/236/242/245) to a fresh, learner-facing pillar. The Notebook gathers every
"My notes" entry, but they were **trapped in localStorage** — no way to back them up or take them elsewhere. Added a
one-tap **"⬇ Export all as Markdown"** button on `#/notes` (shown only when notes exist): it builds a clean `.md`
document — a `# Atlas — My Notes` title + a "*N notes across M subjects · exported YYYY-MM-DD*" line, then notes grouped
by subject in **curriculum order**, each under its lesson `###` heading — and downloads it as `atlas-notes-<date>.md`
(reusing the existing Blob/`createObjectURL` download path, with `revokeObjectURL` cleanup + a confirmation toast).
Your own words become a portable revision deck. No new state, no data change (app.js only).
Verified: gate ALL GREEN; in-browser, clicking Export with 3 seeded notes produced the **exact expected Markdown**
(intercepted the Blob) — title, `*3 notes across 3 subjects · exported 2026-06-18*`, the three subjects in curriculum
order (Linear Algebra → Algorithms → Probability & Statistics) with the right lesson headings and note bodies — and the
filename `atlas-notes-2026-06-18.md`, `errs=0`; the **empty-state guard holds** (no button when there are no notes);
all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v187` → `atlas-v188`.

## iter 245 — Dijkstra's shortest-path visualizer — the 54th widget (visualizations)
The graph-traversal widget only covers *unweighted* BFS/DFS; **weighted shortest paths** — a hard, fundamental idea —
had no visual. Added the **54th Lab widget `algo-dijkstra`** in `a-shortest-paths-topo` (after the Dijkstra worked
example), on a 6-node weighted graph from source A:
- **step / play / skip / reset** drive the algorithm one settlement at a time. Each step **settles the closest unsettled
  node** (gold ring), then **relaxes its edges** — a neighbour's tentative distance drops only when a shorter route is
  found; distance badges tick from ∞ downward live.
- Settled nodes go **sage**; reached-but-unsettled (frontier) nodes get a gold border with their current tentative
  distance; the **shortest-path-tree edges (`prev`) light up sage and thicken** as the tree grows.
- A live note narrates each step ("Settle C at distance 2 … Relax its neighbours: B→3, D→10, E→12") and the final
  distances (A0 B3 C2 D8 E10 F13).
The run is precomputed into per-settlement events so stepping is exact; auto-play uses `VIZUtil.loop` (so `stopAll()`
kills it on nav); synchronous first paint; plain-HTML note. app.js viz-complete fallback `|| 53` → `|| 54`.
Verified: gate ALL GREEN (**54 widgets**, embed resolves); skip-to-end shows the **correct distances and tree** (matches a
hand trace: A→C→B→D→E→F = 13); a mid-run step (settle C) shows the right relaxations (B 4→3, D→10, E→12) and highlights;
all-routes smoke **errs=0/kErr=0 (12 routes)**; 390px mobile the canvas scales to width. SW cache `atlas-v186` → `atlas-v187`.

## iter 244 — Keyboard lesson navigation: [ / ] (UI/UX)
Rotating off gamification. With the content layer exhaustive (every lesson ≥2 worked examples, ~30 deep-dives, 21 code
exercises, 117 glossary terms, 53 widgets), the highest-value fresh win is reading-flow polish. Added **`[` / `]` to step
to the previous / next lesson** while reading — sequential study without reaching for the footer buttons, complementing
the in-module dot navigator (iter 238).
- Self-contained in `studyKeys`: parses the lesson route, computes prev/next from `flatLessons(course)`, and navigates.
- **Guarded**: ignored mid-quiz (only fires when there are no live MCQ choices, so it can't yank you out of a test),
  **stays within the course** (no-op at the first/last lesson), and inherits the existing input/modal guards (won't fire
  while typing in the notes box or with a dialog open).
- Documented in the **`?` shortcuts overlay** under a new "Lessons" group.
No CSS/data/state change (app.js only). Verified: gate ALL GREEN; in-browser `]` advances to the next lesson and `[`
returns (heading updates, `errs=0`); the **quiz-guard holds** (on the Quiz tab with 4 live choices, `]` leaves the hash
unchanged) and the **boundary holds** (on the first lesson, `[` is a no-op); the shortcuts overlay shows the new group;
all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v185` → `atlas-v186`.

## iter 243 — Personal bests: a high score to chase (gamification)
Gamification was the most-overdue learner-facing lane (last at iter 233). Rather than pad the already-comprehensive 55
achievements, added a **"Personal bests" panel** on the Progress page — the beat-your-own-record loop that keeps a
returning learner coming back:
- **🔥 Longest streak** (with an "· at your peak!" tag when today's streak *is* the all-time high), **⚡ Best day (XP)**,
  **🎯 Best test score**, **📅 Days studied** — gold-framed record tiles set apart from the plain activity stats.
- Three of the four are computed from existing history (`activity` map, `tests` array) — only **longest streak** needed a
  new tracked field `maxStreak`, added to `blank()` + the `load()` typeof-merge (back-filled to `max(maxStreak, streak)`
  so old saves never under-report) — a prior-shape save still loads.
- Beating your longest-ever streak fires a **"🏆 New record streak!"** toast at boot (a new `Store.streakRecord()` signal
  from `touchStreak`, guarded to ≥3 days so it doesn't spam on day 1–2), alongside the existing flame flare.
Verified: gate ALL GREEN; **node unit test** — `touchStreak` takes streak 6→7 with `maxStreak→7` and `streakRecord=true`,
`personalBests()` returns the right records (longest 7, best day 120, days 3, best test 90%), and a save lacking
`maxStreak` back-fills to the current streak; the panel renders 4 correct gold tiles (23 / 140 / 92% / 7);
all-routes smoke **errs=0/kErr=0 (12 routes)** with 4 best tiles on the stats page; 390px mobile reflows cleanly.
SW cache `atlas-v184` → `atlas-v185`.

## iter 242 — Dynamic-programming visualizer: the edit-distance table (visualizations)
Rotating off content. Algorithms was the **thinnest viz topic (6)** and was missing the entire **dynamic-programming
pillar** — a notoriously hard idea that a table-fill animation makes click. Added the **53rd Lab widget
`algo-dp-editdistance`**: the Levenshtein DP table between *kitten* and *sitting*.
- **Step / play / skip / reset** fill the (7×8) grid in row-major order; each computed cell is highlighted **gold**, and
  the **single source neighbour it takes is shaded sage** (the diagonal on a character match — free — otherwise the
  argmin of top/left/diagonal, +1).
- A live note narrates the current cell ("'i' = 'i' — match, copy the diagonal for free → 4", or the 1 + min(…) choice).
- When the table is full the **bottom-right answer (3) is ringed** and an **optimal edit path is traced back in violet**,
  decoded into operations ("sub k→s · keep i · keep t · keep t · sub e→i · keep n · insert g").
Auto-play uses `VIZUtil.loop` (so `stopAll()` kills it on navigation); synchronous first paint; note is plain HTML
(viz-note landmine). Embedded after §8 (Edit Distance) of `a-dynamic-programming`; app.js viz-complete fallback `|| 52`
→ `|| 53`.
Verified: gate ALL GREEN (**53 widgets**, embed resolves); skip-to-end renders the **correct full table with answer 3**
and the right backtrace ops; a mid-fill step shows the current cell + sage source + correct match note; all-routes smoke
**errs=0/kErr=0 (12 routes)**; 390px mobile the canvas scales to width. SW cache `atlas-v183` → `atlas-v184`.

## iter 241 — Five deeper-dives on genuinely hard concepts (content depth / understandability)
Rotating off workflow, straight at the owner's most-repeated ask — "keep improve the depth of the page" + hard-concept
support. Added **5 new "Deeper dive" expandables**, one per topic where a real *aha* was missing, picked for breadth and
difficulty (deep-dive coverage ~25 → **~30**):
- **Linear algebra · Determinants** — read the determinant as volume-scaling, then $\det A=0 \iff$ dependent columns
  $\iff$ singular falls out, and $\det(AB)=\det(A)\det(B)$ and $\det(A^{-1})=1/\det(A)$ come for free.
- **Deep learning · Backpropagation** — *why backward?* The cost asymmetry of autodiff: one scalar loss, millions of
  params ⇒ reverse-mode gets every gradient in one sweep where forward-mode would need a billion.
- **Reinforcement learning · Bellman equations** — the Bellman operator as a $\gamma$-contraction whose unique fixed
  point is $V^\pi$; Banach is why policy evaluation / value iteration converge from any start, and why $\gamma<1$ matters.
- **LLMs · Scaling laws** — the Chinchilla correction: at fixed compute $C\approx 6ND$, scale $N$ and $D$ together
  (~20 tokens/param), so a smaller, longer-trained model beats a bigger under-trained one.
- **Prob & stats · Confidence intervals** — what "95% confidence" really means: $\mu$ is fixed, the *interval* is
  random; the 95% is a property of the procedure, not of the one interval you computed.
Authored with `String.raw` single-backslash LaTeX (correct runtime values); the byte-stable injector ran with a no-op
round-trip guard per file. No save-shape change (content append only).
Verified: gate ALL GREEN — and the gate's render-hazard lint now covers the appended deep-dive content ($-parity, no raw
markdown); the determinant dive renders with **15 KaTeX expressions, kErr=0, rawDollar=0** (incl. the `⟺` display line);
all-routes smoke across all 5 deep-dive lessons **errs=0/kErr=0 (12 routes)**, all 5 present. SW cache `atlas-v182` → `atlas-v183`.

## iter 240 — Step-back + a stronger safety net: the gate now runs the code exercises (workflow / dev-flow)
The round-number reflection (every ~10 iters). **Loop health:** the compass rotated well across 230–239 — UI/UX, viz,
content, gamification, accessibility, content, viz, animation, UI/UX, understandability — no area starved. The site is
measurably richer than at iter 230 (viz 50→52, code exercises 14→21 covering **all 7 topics**, glossary 89→117,
high-contrast mode, dashboard review-forecast, the living streak flame, the in-module navigator). **Most-neglected:**
*performance* (untouched since iter 58 — but minifying the data breaks the byte-stable inject pipeline and lazy-loading is
risky, so it stays deferred until it actually hurts) and *workflow* — which this iteration addresses.

Shipped a **dev-flow** improvement that makes every future iteration safer (chosen over a learner-facing tweak precisely
because it protects all the learner-facing work to come). `gate.js` gained two checks:
1. **Code-exercise verification** — the gate now *emulates the Playground's `runJS` console.log path and executes every
   embedded `data-code="javascript"` block*, asserting its output equals the (HTML-unescaped) `data-expected`. **16 JS
   exercises are now verified on every run** (the 5 Python ones need Pyodide, so they're skipped). This replaces the
   manual per-iteration browser `pg-check` ritual for JS exercises — a wrong answer key (which silently shows the learner
   "✗ Doesn't match" on correct code) can no longer ship.
2. **Glossary linting** — the gate now loads `data/glossary.js` and render-hazard-lints **all 117 definitions** (the
   iter-239 additions had a parity guard only in the one-off injector, never in the gate) and flags **duplicate terms**.
Summary line now reports `… · 117 glossary · 16 code-exercises verified`. **Negative-tested**: sabotaging one
`data-expected` made the gate FAIL with a precise `data-code expected-mismatch in ps-expectation-variance` (exit 1);
restoring it returned ALL GREEN. No user-facing assets changed → no SW-cache bump.

## iter 239 — Deepen the inline glossary: +28 terms (understandability)
Rotating off UI/UX. The glossary powers **inline hover/tap tooltips** (the first occurrence of each term in lecture
prose gets a definition), so its coverage directly shapes how much a reader can decode without leaving the page. Two
topics were thin — **LLM (9)** and **linear algebra (9)** — despite their lessons being the most jargon-dense. Added
**28 high-value terms** (glossary 89 → **117**):
- **LLM (+13)**: positional encoding, KV cache, beam search, nucleus sampling, greedy decoding, in-context learning,
  chain-of-thought, scaling laws, LoRA, quantization, retrieval-augmented generation, hallucination, autoregressive.
- **Linear algebra (+9)**: dot product, orthogonality, projection, linear transformation, column space, null space,
  diagonalization, orthonormal basis, positive definite.
- **Calculus (+6)**: continuity, critical point, saddle point, directional derivative, Riemann sum, the fundamental
  theorem of calculus.
Per-topic counts are now balanced (LA 18 · calc 16 · algos 11 · DL 22 · RL 11 · LLM 22 · prob-stats 16). Skipped
over-generic terms (e.g. "Norm" would false-match "batch norm"). Definitions are concise with KaTeX math; the injector
**guards even-`$` parity and bans raw `**`** before writing. No save-shape change (static data).
Verified: gate ALL GREEN; the **Glossary page renders all 117** (`.gloss-item` count = 117, new terms present); on the
dot-product lesson the new terms **"dot product" and "projection" now wrap inline** as tooltips and their definition math
**renders via KaTeX in the popup** (2 `.katex` in gloss popups); all-routes smoke **errs=0/kErr=0 (12 routes)**.
SW cache `atlas-v181` → `atlas-v182`.

## iter 238 — In-module navigator + module in the breadcrumb (UI/UX)
Rotating off animation. The lesson view told you the course and the lesson but **not which module you were in or where you
were within it** — and the footer prev/next silently crossed module boundaries (lessons come from a flattened list). Added
orientation to the most-visited view:
- a **jump-anywhere dot navigator** under the lesson title — one dot per lesson in the current module, **sage = completed,
  gold ring = current, empty = still to do** — each a real link, so you can hop to any lesson in the unit in one tap;
- a **"<module> · X/N" position label** beside the dots;
- the **module name now appears in the breadcrumb** (Codex › Course › *Module* › Lesson).
Pure orientation (reads existing lesson-done state; no new state field, no save-shape change). Dots carry `title` +
`aria-label` + `aria-current`; the strip is `<nav aria-label>`; hidden in the print stylesheet.
Verified: gate ALL GREEN; on a mid-module lesson (3rd of 4, first two done) the dot classes read exactly
`["done","done","cur","todo"]`, label "Foundations of Probability · 3/4", breadcrumb includes the module, `errs=0`;
**clicking the first dot navigates** (hash → ps-sample-spaces-events, heading updates); 390px mobile the breadcrumb wraps
and the dot strip fits; all-routes smoke **errs=0/kErr=0 (12 routes)**. SW cache `atlas-v180` → `atlas-v181`.

## iter 237 — The streak flame comes alive (animation / juice)
Juice was the most-overdue lane (last at iter 228). The header's streak 🔥 was a static emoji — the one always-visible
element with no life. Gave it an **ambient flicker** + **intensity that grows with the streak** + a **flare when today
extends your run** — a small "joy to watch" beat squarely on the owner's north star, reused on every screen.
- **Flicker**: a gentle, continuous `flameFlicker` (scale/rotate wobble, ~2.6s) so the ember always breathes.
- **Tiers** (set in `renderChrome` by streak length, idempotent via a `data-tier` guard): `unlit` (0, greyed) · `lit`
  (1–6) · `hot` (7–29) · `blazing` (30–99) · `inferno` (100+, bigger + double drop-shadow) — the glow literally
  intensifies as your streak grows.
- **Flare**: a one-time `flameFlare` burst (scale 1.7 + bright glow) when the streak ticks up on a new day, via a new
  `Store.streakJustUp()` signal (set in `touchStreak` on a +1 day or a freeze-save; consumed once in `boot`) → a
  welcome-back payoff that rewards the daily habit, like the daily-goal celebration.
- **Reduced-motion safe**: the global `prefers-reduced-motion` rule stills the flicker, and `flareStreak()` early-returns.
  No save-shape change (`streakJustUp` is a runtime flag).
Verified: gate ALL GREEN; node-tested the signal (streak 5→6 ⇒ `streakJustUp=true`, consumed to false, same-day ⇒
false); in-browser the tier class + `animationName=flameFlicker` apply (blazing at 45, lit at 6), the **flare fires on a
yesterday→today increment** (`flareSeen=true`, streak 40→41), and a forced `.flame-flare` resolves to the `flameFlare`
keyframe; all-routes smoke **errs=0/kErr=0 (12 routes)** with the flame classed on every page; `reducedMotion=false` in
headless confirmed. SW cache `atlas-v179` → `atlas-v180`.

## iter 236 — Dot-product & angle visualizer — the 52nd widget (visualizations)
Rotating off content. Linear algebra was the **thinnest topic** (5 widgets) and was missing the single most
foundational visual: the **dot product**. The lesson `la-dot-product-norms` ("Dot Product, Norms, and Angles")
derived `u·v = |u||v|cosθ` in prose but had no picture. Added the **52nd Lab widget `la-dot-product`**:
- two **draggable** vectors **a** (gold) and **b** (sage) from the origin (snap to ½-grid), with preset buttons
  *Acute · ⊥ Right angle · Obtuse · Aligned*;
- the **angle arc** + running `a·b` recolour by sign — **sage acute (a·b>0) · gold right-angle (a·b=0, ⊥ marker) ·
  rust obtuse (a·b<0)** — making the sign↔geometry link visceral;
- **b's scalar projection onto a** drawn as a shaded bar (with the dashed perpendicular), which correctly flips to
  point *backwards* along a once the angle exceeds 90° (negative projection);
- a live readout: `a·b = aₓbₓ + a_yb_y = … = |a||b|cosθ`, plus θ in degrees and the acute/right/obtuse classification.
Embedded after §3 ("From algebra to geometry: deriving u·v = |u||v|cosθ"). Note text is plain HTML (the viz-note
landmine). app.js viz-complete fallback `|| 51` → `|| 52`.
Verified: gate ALL GREEN (**52 widgets**, embed resolves); the three sign cases render correctly with exact math —
acute a=(3,1) b=(1,2.5) → a·b=5.5, θ=50° (sage); right a=(3,1) b=(−1,3) → a·b=0, θ=90° (gold ⊥); obtuse a=(3,1)
b=(−2,2) → a·b=−4, θ=117° (rust, projection bar reversed); all-routes smoke **errs=0/kErr=0 (12 routes)**; 390px mobile
the canvas scales to width. SW cache `atlas-v178` → `atlas-v179`.

## iter 235 — Runnable code in every topic: RL & LLM exercises (examples / new functionality)
Completes the active-coding milestone — **all seven subjects now have at least one runnable, self-checking exercise**
(RL and LLMs were the last two at zero). Added 4 deterministic JS exercises:
- **RL · Policies, Value Functions & Bellman** → the **discounted return** computed two ways (forward `Σ γᵗrₜ` and the
  backward recursion `Gₜ = rₜ + γGₜ₊₁`), shown to agree — the seed of every Bellman equation.
- **RL · SARSA, Q-Learning** → **one Q-learning update** `Q ← Q + α[r + γ·maxₐ′Q(s′,a′) − Q]`, printing the TD target,
  the TD error ("surprise"), and the stepped estimate.
- **LLM · Embeddings & the Output Head** → the **softmax** that turns logits into a next-token distribution (with the
  subtract-the-max stability trick), confirmed to sum to 1.
- **LLM · Decoding Strategies** → **temperature** reshaping one logit vector (T=0.5 sharp → T=2 flat) plus **greedy**
  argmax decoding for contrast.
Coverage 17 → **21 lessons**, **7/7 topics**. Each program is deterministic (no `Math.random`); `data-expected` was
captured by replaying the Playground `runJS` console.log path, not guessed.
Verified: gate ALL GREEN; **all 4 exercises return `pg-check ok`** with `errs=0` and exact output (RL G=3.8593 both ways;
Q-update target/error/Q = 1.72/1.72/0.86; softmax sums to 1.0000; temperature 0.844→0.481 + greedy token 0); the real
Playground renders with unicode (Σ, γᵗ, rₜ) intact and `t < rewards.length` correctly entity-decoded; 390px mobile clean
with the new "Code it…" TOC section; all-routes smoke **errs=0/kErr=0 (13 routes)**. SW cache `atlas-v177` → `atlas-v178`.

## iter 234 — High-contrast accessibility mode (accessibility)
Rotating off gamification, and closing a standing backlog item. The site had reduced-motion, ARIA, keyboard nav, two
themes and adjustable text size — but no **high-contrast** option for low-vision / bright-environment reading. Added an
**independent high-contrast toggle that layers on *either* theme** (`data-contrast="high"` on `<html>`):
- CSS = two variable-override blocks (one for ink, one for `[data-theme="parchment"][data-contrast="high"]`, each
  redefining the **same token set** so the dark block can't leak into parchment): deeper text↔background separation
  (ink→pure-white on near-black; parchment→near-black on near-white), **brightened hairline borders** (the worst
  low-contrast tokens, `--ink-mute`/`--line`), and intensified accents. Plus **+3px focus rings** and **solid-underlined
  inline lesson links / glossary terms** in HC.
- Toggle lives in the sidebar (`#contrast-toggle`, with `aria-pressed` + live label) **and** the ⌘K command palette;
  state persists in `localStorage["atlas.contrast"]` and applies at boot before first render. No change to the save shape
  (separate key) → every prior save still loads.
Verified: toggle flips normal↔high, persists, and updates label + `aria-pressed` (errs=0); all **four** theme×contrast
lesson renders are correct with visibly boosted legibility while staying in the warm palette; all-routes smoke in HC
**errs=0/kErr=0 (13 routes)** `data-contrast=high`; 390px mobile HC clean (borders visible, gloss underline applied).
SW cache `atlas-v176` → `atlas-v177`.

## iter 233 — 7-day review forecast on the dashboard (gamification / new functionality)
Rotating off content. The dashboard had a **past**-looking 14-day consistency strip but nothing **forward**-looking
for the spaced-repetition schedule — the "what's my week of reviews going to look like?" question went unanswered, so
the SRS rhythm stayed invisible between Daily-Review visits. Added a **7-day review forecast bar chart** right beside
the consistency strip: one bar per upcoming day showing how many started cards come *due that day* (today's bar in
gold, the rest in rust, empty days a baseline tick), with a header summary "**N due now** · M more this week · K later".
- New pure store fn `Store.reviewForecast(days)` → `{dueNow, upcoming, beyond, scheduled, days:[…]}`, bucketed from each
  card's existing `due` timestamp (no new state, no mutation; `Number.isFinite`-guarded; orphan/overdue-safe).
- Bars sweep up 0→height on landing via a new `sweepForecast()` (mirrors `sweepBars`; **reduced-motion early-return**).
- Shown only once you have cards in flight (`dueNow+upcoming+beyond>0`) so a brand-new dashboard stays uncluttered.
- `role="img"` + summary aria-label on the container; the bar row is `aria-hidden` (the label already conveys it).
Verified: `node` unit test of `reviewForecast` over a seeded deck (overdue/today/tomorrow/+2/+3/+4/+6/beyond) returns
exactly `dueNow=1, days=[1,2,0,0,0,0,1], upcoming=4, beyond=1` ✓, and an empty store returns all-zero → strip hidden ✓;
gate ALL GREEN; desktop + 390px mobile render correctly with accurate counts/labels (today=gold, empty day = baseline);
all-routes smoke **errs=0/kErr=0 (13 routes)** with `forecast=present bars=7`. SW cache `atlas-v175` → `atlas-v176`.

## iter 232 — Runnable code exercises open in Probability & Statistics (examples / new functionality)
Active-learning lane (rotating off two viz/UI iters). Code exercises — the most under-covered active surface (14/148
lessons, and **zero** in Prob & Stats, RL, or LLMs) — got a new home: the **first three runnable, self-checking JS
exercises in Probability & Statistics**, turning core formulas into code you Run for an instant ✓/✗:
- **Expectation, Variance & the Shape of a Distribution** → compute E[X], Var[X]=E[X²]−E[X]², and SD for a discrete RV
  from its PMF (output `E[X]=1.90 / Var[X]=0.89 / SD[X]=0.9434`).
- **Conditional Probability, Independence & Bayes' Theorem** → the famous false-alarm result in eight lines: a
  99%-accurate test for a 1%-prevalence disease gives a positive that's right only ~17% of the time
  (`P(+)=0.0594 / P(D|+)=0.1667`).
- **Bernoulli & Binomial Distributions** → build the binomial PMF from `C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ` and confirm it sums to 1.
Coverage 14 → **17 lessons**. Each is a complete, deterministic program (no `Math.random`) so the headless check is
exact; the `data-expected` strings were captured by replaying the runJS console.log path, not guessed.
Verified: gate ALL GREEN; **all three exercises return `pg-check ok`** (multi-line `data-expected` round-trips through
the HTML attribute) with `errs=0` and exact output; the real Playground component renders (code with `i < k` correctly
decoded from entities, unicode superscripts pᵏ/ⁿ⁻ᵏ intact); 390px mobile legible with the new "Code it…" TOC section;
all-routes smoke **errs=0/kErr=0/rawDollar=0 (13 routes)**. SW cache `atlas-v174` → `atlas-v175`.

## iter 231 — Causal-masking visualizer: the attention triangle (visualizations)
Visualizations lane (rotating off UI/UX). The single deepest "why decoders work the way they do" idea — **causal
masking** — had prose + a KV-cache discussion in `l-multihead-and-causal-masking` but no picture. Added the **51st Lab
widget `llm-causal-mask`**: a 7×7 attention matrix over the tokens *"The cat sat on the mat ."* with
- a **mask toggle** that flips between full **bidirectional** attention (BERT-style — every cell live, every token sees
  every token) and **causal** lower-triangular attention (decoder-LM — token *i* attends only to positions ≤ *i*, with
  **✕ on the blocked future cells**), recency-biased softmax weights shaded per allowed row;
- a **step** control that reveals query rows one at a time (autoregressive generation, left→right) plus an **all** reset,
  making visible *why* the whole matrix is computed at once under teacher-forced training while inference fills one row
  at a time — the structural reason the KV cache exists.
Embedded after the "Causal Masking: Don't Peek at the Future" section. Note text is **plain HTML** (`<i>i</i>`, ✕), not
KaTeX (viz notes aren't typeset — the viz-note landmine).
Verified: `gate.js` ALL GREEN (**51 widgets**, embed resolves); all-routes smoke (12 routes incl. `#/lab/llm-causal-mask`
+ the lesson) **errs=0/kErr=0 rawDollar=0**; desktop screenshot shows the masked lower-triangular grid (✕ future cells,
token row/col labels, current-row gold highlight) and the toggled full-bidirectional grid; **390px mobile** (iframe) the
canvas scales to width and both mask-state notes read correctly. app.js viz-complete fallback bumped `|| 50` → `|| 51`.
SW cache `atlas-v173` → `atlas-v174`.

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
