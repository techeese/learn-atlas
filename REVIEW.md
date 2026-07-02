# REVIEW.md — Review & Refine phase ledger (iters 1158–~1257)

Owner-directed (2026-07-02): review and refine all existing content and visualizations.
**Standing audit (iter 1172):** 88 MCQ explains reference answer options by index/letter; numbering conventions are mixed (0-based/1-based/letters) and the quiz UI shows no numbers. The 6 worst (out-of-range or answer-maligning: la-matrix-derivative-identities q10, ps-random-variables q7, l-peft-lora q1, c-area-volume q7, rl-policies-values q8, rl-value-approximation q0) are fixed content-first as of iter 1172; the rest get verified/de-indexed when each lesson's review turn arrives.

Status legend: `pending` · `✔ iter-N — what changed` · `✔ iter-N clean`

**Progress: 45/193 lessons · 11/177 widgets**

## linear-algebra — lessons
- [x] la-vectors-operations — ✔ iter-1158 — added magnitude/norm preview section (examples used it before it was defined); aligned q11 terminology (tip-to-tail); all 16 MCQs + 3 hw + 3 examples arithmetic re-verified
- [x] la-dot-product-norms — ✔ iter-1158 clean — every number re-verified (worked example, cosines, 16 MCQs, hw, examples incl. arccos values); no changes needed
- [x] la-span-independence — ✔ iter-1159 — rewrote q10 muddled explain (counterexample now actually refutes the claims); all row-reductions/relations/code re-verified
- [x] la-basis-dimension — ✔ iter-1159 — q5+q7 had only 3 choices (added 4th distractors); inline determinant gloss at first use (was an unexplained forward ref to lesson 9); all coord/det computations re-verified
- [x] la-matrices-as-transformations — ✔ iter-1160 — e2 was an exact duplicate of the in-content worked example (same matrices, vector, answer); replaced with a rotation×reflection composition showing order picks the mirror (RF = y=x, FR = y=−x, Node-verified); everything else re-verified clean
- [x] la-matrix-multiplication — ✔ iter-1160 clean — all products/powers/examples re-verified (AB/BA worked example, R^2=−I ladder, non-square e1, matmul code 19 22 43 50); no changes
- [x] la-inverse-and-systems — ✔ iter-1161 clean — 3×3 Gauss-Jordan inverse re-multiplied, h1 inverse spot-checked on 3 entries, Cramer + CG code outputs re-derived, all 17 MCQs verified; no changes
- [x] la-four-subspaces-rank — ✔ iter-1161 — code exercise was trivial (nullity = n − rank, one subtraction); replaced with a real computation verifying row-space ⊥ null-space on the lesson's own worked bases (4 dot products → 0,0,0,0); all subspace computations re-verified
- [x] la-determinants — ✔ iter-1162 clean — worked det=60 double-checked via column expansion, h2 cubic factored correctly, all MCQs/code verified; no changes
- [x] la-eigenvalues-eigenvectors — ✔ iter-1162 — all 3 examples were duplicates (e0+e1 redid the in-content worked example on the same matrix; e2 shear appears in content+h2+q2); replaced with fresh complementary trio: non-symmetric full analysis, Markov λ=1 + mixing rate, complex 1±i rotation-scale — all hand-verified
- [x] la-diagonalization — ✔ iter-1163 — e2 duplicated the in-content defective-shear example (same matrix; h1 already does the variant); replaced with a matrix-exponential stability example (decoupled modes, e^{λt}, x(t)→0) that gives the e^{At} dive worked numbers; A⁵/h0-A³/e0/e1 all re-multiplied
- [x] la-symmetric-spectral — ✔ iter-1163 clean — spectral proofs, worked example, rank-1 reconstruction, h2 Gram product, all MCQs (incl. Rayleigh, 1/√λ axes) re-verified; no changes
- [x] la-orthonormal-gram-schmidt — ✔ iter-1164 — q1 explain referenced a nonexistent "choice 4" (rewritten content-first); worked QR, q8 (0.64/−0.48), h1 det=−27, h2 least-squares cross-checked via normal equations — all verified
- [x] la-projection-least-squares — ✔ iter-1164 — q9 explain misnumbered its choice references (rewritten content-first); worked 7/6+t/2 fit, e1 4-point fit (det=20, C=D=9/10), projections, h2 projector proof — all verified
- [x] la-svd — ✔ iter-1165 clean — worked 2×2 SVD fully re-derived (u₁=(1,3)/√10, σ₁σ₂=|det|=15), h0 sign-absorption, h2 eigenvalue-sharing proof, e0/e1/e2, all 17 MCQs verified; no changes
- [x] la-low-rank-pca — ✔ iter-1165 clean — worked PCA (λ=8/3, 80%, reconstruction error 2=σ₂² matching Eckart–Young exactly), h0 energy budget 146.16, h1 diag(6,2/3), pseudoinverse h2, all 17 MCQs verified; no changes
- [x] la-gradients-jacobians — ✔ iter-1166 clean — code grad (8,7), q6 JΔ, q9 shape reasoning, e0 PD Hessian det=7, all verified; no changes
- [x] la-matrix-derivative-identities — ✔ iter-1166 — q6 explain had misnumbered choice references (3rd occurrence of the index disease; rewritten content-first); all identities/ridge/norm gradients/code verified
- [x] la-matrix-calculus-backprop — ✔ iter-1167 clean — code [3,4,6,8], q11 outer product, e0 (7,4), e2 two-layer chain (2,3), all 16 MCQs verified; no changes. ALL 19 LA LESSONS DONE.

## linear-algebra — widgets
- [x] la-vector-add — ✔ iter-1167 clean — drag widget, 540px, note renders, errs=0 under drive
- [x] la-linear-transform — ✔ iter-1167 clean — 6 buttons + 4 sliders driven to extremes, errs=0
- [x] la-eigen — ✔ iter-1168 clean — 4 buttons, note 87ch, errs=0
- [x] la-pca — ✔ iter-1168 clean — 1 button + 2 sliders driven, note 119ch, errs=0
- [x] la-svd — ✔ iter-1168 clean — stage buttons + 4 sliders driven; constructive widget (ellipse-semi-axes claim true by construction), errs=0
- [x] la-projection — ✔ iter-1168 clean — drag widget, 520px, note 345ch, errs=0
- [x] la-dot-product — ✔ iter-1167 clean — 4 buttons hammered, note 138ch, errs=0
- [x] la-determinant — ✔ iter-1167 clean — 5 buttons hammered, note 148ch, errs=0
- [x] la-gram-schmidt — ✔ iter-1168 clean — 2 buttons, note 165ch, errs=0
- [x] la-power-iteration — ✔ iter-1168 clean — numeric honesty verified — note claims 43.9° after 3 iters from v0=(cos .3, sin .3); Node re-derivation gives 43.88° exactly
- [x] la-phase-portrait — ✔ iter-1168 clean — 2 sliders driven, 360px, note 114ch, errs=0

## calculus — lessons
- [x] c-functions-and-graphs — ✔ iter-1169 — e2 composed to the exact function e0 already analyzed (√(x−4), same domain twice in one tab); replaced with 1/(x²−9) — composition punching isolated holes vs an interval; inverse worked example, code, h0-h2 all verified
- [x] c-limits-intuition — ✔ iter-1169 clean — piecewise worked example (3 vs g(2)=7), δ=ε/2 and δ=ε/3 proofs, conjugate h0=1/4, (1+1/n)^n code table, squeeze e2 all verified; no changes
- [x] c-computing-limits — ✔ iter-1171 — q5 explain had its option numbering shifted by one (called the correct answer "option 0" and mislabeled the rest — the 4th and worst index-disease case, actively misleading); rewritten content-first; all limits/hw/examples verified (worked 6, 1/4, 2; h1=1/2; q9=3; q11=−2)
- [x] c-continuity — ✔ iter-1171 clean — three-part continuity contract, IVT examples (Dottie number h1, bisection e1 with g(1.5)=−0.125), jump classifications (h2, e2), q9 Darboux counterexample all verified; no changes
- [x] c-derivative-definition — ✔ iter-1173 — e2 duplicated the content's |x| corner analysis (4th appearance incl. q2 + card); replaced with the x^{1/3} vertical-tangent mode (sides agree on +∞ — a different failure), Node-verified; worked example, code, h0-h2, all 16 MCQs verified
- [x] c-differentiation-rules — ✔ iter-1173 — e2 used x²sin x, forward-referencing cos (taught 2 lessons later) AND duplicating that lesson's q8; replaced with √x(x²−4) differentiated two ways (product rule vs expand-first, agreeing at (5x²−4)/(2√x), spot-checked at x=4→19); h1 re-expanded, all MCQs verified
- [x] c-chain-rule — ✔ iter-1174 — q8 explain maligned its own correct answer ("Choice 0 forgets the inner derivative" — choice 0 IS 6x·e^{3x²}); de-indexed. Code exercises (54 54; dual numbers 10/7), h0-h2 (incl. (7x³+3x²)/√(2x+1)), gradient-flow arithmetic (0.7³⁰≈2e−5) all verified
- [x] c-derivatives-special-functions — ✔ iter-1174 — q8 explain blamed "choices 0 and 3" with 3 its own answer (should be the product-of-derivatives and dropped-term distractors); de-indexed. Softplus→sigmoid h2, x^x e2 (4(ln2+1)≈6.77), P′(1)=120ln2≈83.2, sec²(π/4)=2 all verified. Note: e2 overlaps lesson-6 log-diff dive (same x^x) — tolerated, the h1 x^{sin x} complement differs
- [x] c-implicit-related-rates — ✔ iter-1175 clean — ladder −1.5 ft/s, cone 9/(4π), two-cars 50 mph, folium y′, origin slope −1, circle-slope perpendicularity check, code −0.75 all verified; no changes
- [x] c-extrema-curve-sketching — ✔ iter-1175 — h0 assigned the exact function e1 fully works (x⁴−4x³, same −27/inflections); replaced with x⁴−8x² (mins ±2→−16, max 0, inflections ±2/√3→−80/9, all Node-verified, even-symmetry cross-check). h1 (max 3/2, min −3), MVT-Lipschitz h2, e0/e2 verified. Noted: e2 supersets q8 (x³−3x on [0,2]) — tolerated reinforcement
- [x] c-optimization — ✔ iter-1176 clean — river-fence 5000 m², AM-GM min 4 at x=2, gradient-descent η<2/k geometric-recursion homework, e0-e2 (incl. 5×5 square) all verified; h0 (3-sided) vs e2 (4-sided) are distinct constraint structures, not dups; no changes
- [x] c-linearization-lhopital — ✔ iter-1176 clean — tan46°≈1.0349 underestimate (concave-up justification), pendulum 1%, ∞−∞→0 with Taylor cross-check, ∛8.12≈2.01, x^x→1, √4.1≈2.025 all verified; q2 (L'Hôpital inconclusive on oscillation) is a standout question. Noted: e1(a) near-dups q10 (sphere dV, different dr) — tolerated; no changes
- [x] c-antiderivatives — ✔ iter-1177 clean — two-stage IVP s(t)=t³+4t+1, disconnected-domain q10 (per-piece constants), sec²−tan²=1 constancy check, all integrals verified; e2 (n=−1 exception) reinforces q1/q15/c2 — intentional emphasis on the lesson's central subtlety; no changes
- [x] c-definite-integral-riemann — ✔ iter-1177 clean — h0 (definition→12, trapezoid check), h1 (net 4 vs total 5), h2 (−3 m, 23/3 m), e1 (definition→14), L/R/M comparison (1/5/2.5 vs 8/3), midpoint-concavity q9 all verified. Noted: ∫₀²x² runs through e0/e2/q8 as a running example — tolerated; no changes
- [x] c-fundamental-theorem — ✔ iter-1178 — q2 explain maligned its own answer ("choices 0 and 3 are false" with 0 the answer); q0 de-indexed while editing. h0 (1, 19/6), both-limits h1, e0 (10, trapezoid check), e1 (−2√π), avg-value e2 (3) all verified
- [x] c-integration-techniques — ✔ iter-1178 — THREE defects: q15 explain misattributed "option 3"; h0 exactly duplicated q8 (∫sin·cos=½, same substitution) → replaced with ∫₁⁴ e^√x/√x dx = 2(e²−e)≈9.34 (root inner function, numerically verified); e2 duplicated e0's integrand family (xe^{x²} definite) → replaced with ∫₀^{π/4}tan x = ½ln2 (negative-du wrinkle, numerically verified). h1/h2/e0/e1 verified incl. the by-parts-twice full check
- [x] c-area-volume — ✔ iter-1179 — h0 exactly duplicated e0 (y=6−x² vs y=x, identical 125/6 solution; 3rd homework=example case); replaced with the crossing-curves x³-vs-x problem (area ½, split at 3 intersections, exposes the signed-integral-equals-0 trap that card c0 warns about but nothing practiced; Node-verified). q7 already fixed iter-1172; washer-about-y=−1 e1 (104π/15), both-methods h1 (π/2), avg-value h2 (2/π) all verified
- [x] c-improper-integrals — ✔ iter-1179 clean — Gaussian-substitution h0 (½), right-endpoint singularity h1 (2), the c=1/E[X]=∞ PDF h2, exponential-mean e1 (μ=½), Cauchy q7, comparison-direction q11 all verified. Noted: e2 supersets q10 (∫x^{−1/2}=2) but adds type-II framing — tolerated; no changes
- [x] c-intro-differential-equations — ✔ iter-1181 — e2 solved the exact function q8 verifies (y=3e^{2t}) in a lesson saturated with y′=ky (q10/q13/c2/e0); replaced with a derivation of Newton's cooling by separation (the formula card c5 records and h1 uses but nothing derived; teaches the shifted-variable trick + reclaims the excluded equilibrium). h0 (√(2t²+9)), h1 (k≈0.0673, 45.5°C), h2 (22.9 yr) all verified
- [x] c-partial-derivatives — ✔ iter-1181 clean — h0 Clairaut, h1 (0.2 vs ln1.22≈0.1989), Laplace h2, e0 (7/24), e1 (tangent plane L=y, 0.2196), e2 (D_u=4.4, |∇f|=√20) all verified. Watch: e2 teaches directional derivatives (next lesson's topic) — check for collision when reviewing c-gradient-directional
- [x] c-gradient-directional — ✔ iter-1182 clean — e0 (52/5), e1 (steepest descent −2√58, step (0.4,0.6) with loss 17→1.72 check), zero-direction e2, h0 (5√2/2), h1 (2√5), q8 (36/5) all verified. Collision check vs lesson-20 e2: that example previews this material on the canonical bowl — tolerated as motivation (q13 here is a 5-second sanity check, not a duplicate lesson); no changes
- [x] c-multivariable-optimization — ✔ iter-1182 clean — e0 ((0,3) min −9), e1 (cubic: (0,0) saddle, (1,1) min −1, det H=36xy−9), e2 (Lagrange xy→25), h0 (saddle w/ eigenvalues 6,−2), h1 (√5 on the circle), h2 (quartic: inconclusive Hessian, direct-reasoning min) all verified; e2/h1 are complementary Lagrange problems, not dups; no changes
- [x] c-convexity — ✔ iter-1183 clean — chord-definition proof of x² (the −λ(1−λ)(x−y)² identity), MSE-convexity via operations, Jensen e2 (gap = variance), E[1/X]≥1/E[X] h1, two-random-starts diagnostic h2 all verified; no changes
- [x] c-gradient-descent-convergence — ✔ iter-1183 — SEVEN explains de-indexed/fixed, densest cluster on the site: q0/q1/q5/q6/q7/q9 maligned their own correct answers under scrambled numbering, q3 self-referenced. All arithmetic verified (κ=25, x₁=0.4/3.2, η-window (0,2/a), e0's 0.8^k contraction, e1's learning-rate sweep, h0-h2)
- [x] c-lagrange-multipliers — ✔ iter-1184 — FIRST ARITHMETIC ERROR of the phase: e0's re-solve check claimed 41 m of fence gives A≈210.25; actually λ=41/4=10.25, A=2λ²=210.125 (increase 10.125 ≈ λ=10 to first order). Corrected with the full computation. h0 (min 5), h1 (13, λ=½), SVM/KKT e1, envelope-theorem e2 all verified. Noted: e2 deepens lesson-22's xy problem (envelope theorem added) — tolerated as spaced deepening
- [x] c-duality-kkt — ✔ iter-1184 clean — dual derivation h1 (g(λ)=2λ−λ²/4→d*=4=p*), the worked dual + code (gap 0), weak-duality proof h0, KKT verification e0, conjugate dive all verified; later-authored, tight throughout; no changes
- [ ] c-proximal-projected — pending

## calculus — widgets
- [ ] calc-derivative — pending
- [ ] calc-gradient-descent — pending
- [ ] calc-bayes — pending
- [ ] calc-gd2d — pending
- [ ] calc-limit-epsilon — pending
- [ ] calc-newton — pending
- [ ] calc-area — pending
- [ ] calc-saddle — pending
- [ ] calc-gd — pending
- [ ] calc-chain — pending
- [ ] calc-ivt — pending
- [ ] calc-curve-sketch — pending
- [ ] calc-convex-landscape — pending
- [ ] calc-riemann — pending
- [ ] calc-taylor — pending
- [ ] calc-lagrange — pending
- [ ] calc-ftc-accumulation — pending
- [ ] calc-slope-field — pending
- [ ] calc-duality — pending
- [ ] calc-by-parts — pending
- [ ] c-sgd-noise-ball — pending

## algorithms — lessons
- [ ] a-asymptotic-analysis — pending
- [ ] a-recurrences-master-theorem — pending
- [ ] a-correctness-invariants — pending
- [ ] a-arrays-lists-stacks-queues — pending
- [ ] a-hash-tables — pending
- [ ] a-trees-heaps — pending
- [ ] a-comparison-sorts — pending
- [ ] a-linear-sorts-selection — pending
- [ ] a-binary-search — pending
- [ ] a-divide-and-conquer — pending
- [ ] a-greedy — pending
- [ ] a-dynamic-programming — pending
- [ ] a-backtracking-branch-bound — pending
- [ ] a-graph-representations-traversal — pending
- [ ] a-shortest-paths-topo — pending
- [ ] a-mst-union-find — pending
- [ ] a-np-completeness — pending
- [ ] a-approximation-randomized — pending
- [ ] a-string-algorithms — pending
- [ ] a-algorithms-for-ml — pending
- [ ] a-amortized-analysis — pending
- [ ] a-network-flow — pending
- [ ] a-union-find-range — pending

## algorithms — widgets
- [ ] algo-sorting — pending
- [ ] algo-bigo — pending
- [ ] algo-master-theorem — pending
- [ ] algo-kmeans — pending
- [ ] algo-heap — pending
- [ ] algo-kruskal — pending
- [ ] algo-greedy — pending
- [ ] algo-recursion-tree — pending
- [ ] algo-graph-traversal — pending
- [ ] algo-hashing — pending
- [ ] algo-binary-search — pending
- [ ] algo-dp-editdistance — pending
- [ ] algo-dijkstra — pending
- [ ] algo-stack-queue — pending
- [ ] algo-trie — pending
- [ ] algo-maxflow — pending
- [ ] algo-pnp — pending
- [ ] a-reservoir-sampling — pending
- [ ] a-consistent-hashing — pending
- [ ] a-convex-hull — pending
- [ ] a-hll — pending

## deep-learning — lessons
- [ ] dl-ml-recap-and-the-learning-problem — pending
- [ ] dl-the-artificial-neuron-and-mlp — pending
- [ ] dl-activation-functions — pending
- [ ] dl-loss-functions — pending
- [ ] dl-backpropagation — pending
- [ ] dl-gradient-descent-and-optimizers — pending
- [ ] dl-learning-rate-schedules-and-tuning — pending
- [ ] dl-overfitting-and-regularization — pending
- [ ] dl-generalization-mysteries — pending
- [ ] dl-dropout-and-normalization — pending
- [ ] dl-initialization-and-vanishing-gradients — pending
- [ ] dl-convolution-operation — pending
- [ ] dl-pooling-and-cnn-architectures — pending
- [ ] dl-transfer-learning — pending
- [ ] dl-rnn-lstm-gru — pending
- [ ] dl-embeddings-and-tokenization — pending
- [ ] dl-attention-mechanism — pending
- [ ] dl-transformer-architecture — pending
- [ ] dl-pretraining-and-finetuning-paradigm — pending
- [ ] dl-practical-training-and-debugging — pending
- [ ] dl-vision-transformers — pending
- [ ] dl-graph-neural-networks — pending
- [ ] dl-self-supervised-contrastive — pending
- [ ] dl-autoencoders-vae — pending
- [ ] dl-gans — pending
- [ ] dl-diffusion-models — pending

## deep-learning — widgets
- [ ] dl-activation — pending
- [ ] dl-neural-net — pending
- [ ] dl-convolution — pending
- [ ] dl-rnn — pending
- [ ] dl-overfitting — pending
- [ ] dl-backprop — pending
- [ ] dl-backprop-graph — pending
- [ ] dl-regularization-geometry — pending
- [ ] ml-threshold — pending
- [ ] dl-diffusion — pending
- [ ] dl-lr-schedules — pending
- [ ] dl-cross-entropy — pending
- [ ] dl-optimizers — pending
- [ ] dl-dropout — pending
- [ ] dl-kl-divergence — pending
- [ ] dl-gan-training — pending
- [ ] dl-signal-propagation — pending
- [ ] dl-transfer — pending
- [ ] dl-vit-patchify — pending
- [ ] dl-gnn-message-passing — pending
- [ ] dl-reparameterization — pending
- [ ] dl-contrastive — pending
- [ ] dl-fourier-synthesis — pending
- [ ] dl-vc-shattering — pending
- [ ] dl-normalizing-flow — pending
- [ ] dl-dark-knowledge — pending
- [ ] dl-batchnorm — pending
- [ ] dl-gumbel-softmax — pending
- [ ] dl-rectified-flow — pending
- [ ] dl-double-descent — pending

## reinforcement-learning — lessons
- [ ] rl-what-is-rl — pending
- [ ] rl-mdp-formalism — pending
- [ ] rl-policies-values — pending
- [ ] rl-policy-iteration — pending
- [ ] rl-value-iteration — pending
- [ ] rl-monte-carlo — pending
- [ ] rl-td-learning — pending
- [ ] rl-sarsa-qlearning — pending
- [ ] rl-eligibility-traces — pending
- [ ] rl-value-approximation — pending
- [ ] rl-dqn — pending
- [ ] rl-policy-gradient-theorem — pending
- [ ] rl-actor-critic — pending
- [ ] rl-trpo-ppo — pending
- [ ] rl-exploration — pending
- [ ] rl-practical-rl — pending
- [ ] rl-connections-frontiers — pending
- [ ] rl-model-based — pending
- [ ] rl-offline — pending
- [ ] rl-imitation — pending

## reinforcement-learning — widgets
- [ ] rl-gridworld — pending
- [ ] rl-ppo-clip — pending
- [ ] rl-mc-convergence — pending
- [ ] rl-q-learning — pending
- [ ] rl-td-mc — pending
- [ ] rl-bandit — pending
- [ ] rl-discounting — pending
- [ ] rl-policy-gradient — pending
- [ ] rl-value-approx — pending
- [ ] rl-bc-compounding — pending

## llm — lessons
- [ ] l-what-is-a-language-model — pending
- [ ] l-tokenization-bpe — pending
- [ ] l-embeddings-and-prediction-head — pending
- [ ] l-self-attention — pending
- [ ] l-multihead-and-causal-masking — pending
- [ ] l-transformer-block — pending
- [ ] l-positional-encoding — pending
- [ ] l-mixture-of-experts — pending
- [ ] l-pretraining-objective-data — pending
- [ ] l-optimization-and-stability — pending
- [ ] l-scaling-laws — pending
- [ ] l-finetuning-and-instruction-tuning — pending
- [ ] l-rlhf-and-preference-optimization — pending
- [ ] l-peft-lora — pending
- [ ] l-decoding-strategies — pending
- [ ] l-prompting-and-in-context-learning — pending
- [ ] l-inference-efficiency — pending
- [ ] l-rag-and-tools — pending
- [ ] l-hallucination-and-evaluation — pending
- [ ] l-safety-and-frontier — pending

## llm — widgets
- [ ] llm-scaling — pending
- [ ] llm-embeddings — pending
- [ ] llm-attention — pending
- [ ] llm-decoding — pending
- [ ] llm-transformer-block — pending
- [ ] llm-cross-entropy — pending
- [ ] llm-kv-cache — pending
- [ ] llm-bpe — pending
- [ ] llm-beam-search — pending
- [ ] llm-positional-encoding — pending
- [ ] llm-causal-mask — pending
- [ ] llm-lora — pending
- [ ] llm-calibration — pending
- [ ] llm-moe-router — pending
- [ ] llm-react-loop — pending
- [ ] dl-superposition — pending

## probability-statistics — lessons
- [ ] ps-sample-spaces-events — pending
- [ ] ps-conditional-independence-bayes — pending
- [ ] ps-random-variables-distributions — pending
- [ ] ps-expectation-variance — pending
- [ ] ps-bernoulli-binomial — pending
- [ ] ps-poisson — pending
- [ ] ps-geometric-waiting — pending
- [ ] ps-uniform-exponential — pending
- [ ] ps-normal-distribution — pending
- [ ] ps-joint-distributions — pending
- [ ] ps-covariance-correlation — pending
- [ ] ps-conditional-expectation — pending
- [ ] ps-law-of-large-numbers — pending
- [ ] ps-sampling-distributions — pending
- [ ] ps-point-estimation — pending
- [ ] ps-estimation-theory — pending
- [ ] ps-confidence-intervals — pending
- [ ] ps-hypothesis-testing-logic — pending
- [ ] ps-p-values — pending
- [ ] ps-errors-and-power — pending
- [ ] ps-t-tests — pending
- [ ] ps-bayesian-inference — pending
- [ ] ps-conjugate-priors — pending
- [ ] ps-bayesian-decisions — pending
- [ ] ps-computational-bayes — pending
- [ ] ps-causation-confounding — pending
- [ ] ps-causal-graphs — pending
- [ ] ps-causal-estimation — pending

## probability-statistics — widgets
- [ ] ps-clt — pending
- [ ] ps-lln — pending
- [ ] ps-t-dist — pending
- [ ] ps-conditional-expectation — pending
- [ ] ps-joint — pending
- [ ] ps-geometric — pending
- [ ] ps-hyptest — pending
- [ ] ps-estimator — pending
- [ ] ps-normal-explorer — pending
- [ ] ps-covariance-scatter — pending
- [ ] ps-ci-coverage — pending
- [ ] ps-hypothesis-test — pending
- [ ] ps-power — pending
- [ ] ps-binomial-poisson — pending
- [ ] ps-poisson-viz — pending
- [ ] ps-exponential-viz — pending
- [ ] ps-expectation-balance — pending
- [ ] ps-set-events — pending
- [ ] ps-beta-update — pending
- [ ] causal-dag — pending
- [ ] ps-bootstrap — pending
- [ ] ps-gaussian-process — pending
- [ ] ps-fisher-information — pending
- [ ] ps-regression-discontinuity — pending
- [ ] ps-brownian-motion — pending
- [ ] ps-shrinkage — pending

## machine-learning — lessons
- [ ] ml-knn — pending
- [ ] ml-decision-trees — pending
- [ ] ml-linear-regression — pending
- [ ] ml-logistic-regression — pending
- [ ] ml-regularization — pending
- [ ] ml-svm — pending
- [ ] ml-naive-bayes — pending
- [ ] ml-kmeans — pending
- [ ] ml-dimensionality-reduction — pending
- [ ] ml-ensembles — pending
- [ ] ml-model-selection — pending
- [ ] ml-trustworthy-models — pending

## machine-learning — widgets
- [ ] ml-kmeans-viz — pending
- [ ] ml-knn-viz — pending
- [ ] ml-tree-viz — pending
- [ ] ml-linreg-viz — pending
- [ ] ml-logreg-viz — pending
- [ ] ml-bias-variance-viz — pending
- [ ] ml-bagging-viz — pending
- [ ] ml-svm-viz — pending
- [ ] ml-reg-viz — pending
- [ ] ml-nb-viz — pending
- [ ] ml-curse-dimensionality — pending
- [ ] ml-double-descent — pending
- [ ] ml-roc — pending
- [ ] ml-cross-validation — pending
- [ ] ml-information-gain — pending
- [ ] ml-gmm-responsibility — pending
- [ ] ml-conformal — pending
- [ ] ml-spectral — pending
- [ ] ml-kde — pending

## information-theory — lessons
- [ ] it-entropy — pending
- [ ] it-differential-entropy — pending
- [ ] it-cross-entropy-kl — pending
- [ ] it-mutual-information — pending
- [ ] it-source-coding — pending
- [ ] it-channel-capacity — pending
- [ ] it-information-in-ml — pending

## information-theory — widgets
- [ ] it-entropy-viz — pending
- [ ] it-mutual-info-viz — pending
- [ ] it-channel-capacity-viz — pending
- [ ] it-source-coding-viz — pending
- [ ] it-differential-entropy-viz — pending
- [ ] it-distances — pending
- [ ] it-max-entropy — pending

## time-series — lessons
- [ ] ts-what-is-a-time-series — pending
- [ ] ts-stationarity — pending
- [ ] ts-exponential-smoothing — pending
- [ ] ts-arima — pending
- [ ] ts-forecast-evaluation — pending
- [ ] ts-deep-forecasting — pending

## time-series — widgets
- [ ] ts-decomposition — pending
- [ ] ts-ar-process — pending
- [ ] ts-exp-smoothing — pending
- [ ] ts-backtesting — pending
- [ ] ts-acf — pending
- [ ] ts-forecast-cone — pending
- [ ] ts-garch-volatility — pending
- [ ] ts-cointegration — pending
- [ ] ts-periodogram — pending
- [ ] ts-cusum — pending

## game-theory — lessons
- [ ] gt-foundations — pending
- [ ] gt-auctions-mechanism-design — pending
- [ ] gt-mixed-zero-sum — pending
- [ ] gt-repeated-cooperation — pending
- [ ] gt-cooperative-games — pending

## game-theory — widgets
- [ ] gt-nash-2x2 — pending
- [ ] gt-minimax-lines — pending
- [ ] gt-ipd-match — pending
- [ ] gt-replicator — pending
- [ ] gt-shapley — pending
- [ ] gt-fictitious-play — pending

