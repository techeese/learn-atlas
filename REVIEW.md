# REVIEW.md — Review & Refine phase ledger (iters 1158–~1257)

Owner-directed (2026-07-02): review and refine all existing content and visualizations.
**Standing audit (iter 1172):** 88 MCQ explains reference answer options by index/letter; numbering conventions are mixed (0-based/1-based/letters) and the quiz UI shows no numbers. The 6 worst (out-of-range or answer-maligning: la-matrix-derivative-identities q10, ps-random-variables q7, l-peft-lora q1, c-area-volume q7, rl-policies-values q8, rl-value-approximation q0) are fixed content-first as of iter 1172; the rest get verified/de-indexed when each lesson's review turn arrives.

Status legend: `pending` · `✔ iter-N — what changed` · `✔ iter-N clean`

**Progress: 89/193 lessons · 53/177 widgets**

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
- [x] c-proximal-projected — ✔ iter-1185 clean — soft-threshold code ([1.5,0,0,−0.8,0], 3 zeros), ISTA e1 ((0.6,0,−0.8)), h1 ((0.7,0,0)), ℓ1-vs-ℓ2 prox h2, Frank-Wolfe/mirror-descent dives all verified; no changes. ALL 27 CALCULUS LESSONS DONE.

## calculus — widgets
- [x] calc-derivative — ✔ iter-1185 clean — slider driven, note 79ch, errs=0 under drive
- [x] calc-gradient-descent — ✔ iter-1185 clean — 3 btns + 2 sliders, errs=0 under drive
- [x] calc-bayes — ✔ iter-1185 clean — 3 sliders, note 195ch, errs=0 under drive
- [x] calc-gd2d — ✔ iter-1185 clean — 3 btns + slider, errs=0 under drive
- [x] calc-limit-epsilon — ✔ iter-1185 clean — 2 btns + slider, note 233ch, errs=0 under drive
- [x] calc-newton — ✔ iter-1185 clean — 3 btns, note 236ch, errs=0 under drive
- [x] calc-area — ✔ iter-1185 clean — slider, note 271ch, errs=0 under drive
- [x] calc-saddle — ✔ iter-1185 clean — 3 btns, 380px, note 366ch, errs=0 under drive
- [x] calc-gd — ✔ iter-1185 clean — slider, note 379ch, errs=0 under drive
- [x] calc-chain — ✔ iter-1185 clean — slider, note 319ch, errs=0 under drive
- [x] calc-ivt — ✔ iter-1186 clean — btn+slider, note 218ch, errs=0 under drive
- [x] calc-curve-sketch — ✔ iter-1186 clean — slider, note 274ch, errs=0 under drive
- [x] calc-convex-landscape — ✔ iter-1186 clean — 2 btns + 2 sliders, 560px (container-capped), errs=0 under drive
- [x] calc-riemann — ✔ iter-1186 clean — numeric honesty verified — left rule on [0,3] n=8: note claims 7.3828 vs exact 9; Node re-derivation 0.375³·140=7.3828125 exact, errs=0 under drive
- [x] calc-taylor — ✔ iter-1186 clean — degree-1-equals-tangent claim definitionally true, note 261ch, errs=0 under drive
- [x] calc-lagrange — ✔ iter-1186 clean — 2 btns + slider, errs=0 under drive
- [x] calc-ftc-accumulation — ✔ iter-1186 clean — btn + slider, note 362ch, errs=0 under drive
- [x] calc-slope-field — ✔ iter-1186 clean — 2 sliders, errs=0 under drive
- [x] calc-duality — ✔ iter-1186 clean — slider, note 138ch, errs=0 under drive
- [x] calc-by-parts — ✔ iter-1186 clean — slider, note 124ch, errs=0 under drive
- [x] c-sgd-noise-ball — ✔ iter-1186 clean — btn + slider, 500px, errs=0 under drive

## algorithms — lessons
- [x] a-asymptotic-analysis — ✔ iter-1187 clean — witness proof e0 (c=15), crossover e1 (n=100), scale e2 (9,966 vs 10⁶), h2's three-part O/Ω logic, all 16 MCQs verified. Noted: h1 reuses e0's technique with permuted coefficients but adds the Ω/Θ extension — tolerated; no changes
- [x] a-recurrences-master-theorem — ✔ iter-1187 clean — outstanding lesson: h1's n·H_{log n}=Θ(n loglog n) harmonic recursion tree, h0's Case-3 regularity check (k=3/4), h2's substitution with non-growing constant, e0's triple-checked Θ(n^{log₂3}), e1's unequal-split squeeze all verified; every case assignment correct; no changes
- [x] a-correctness-invariants — ✔ iter-1188 — q11 explain maligned its own answer ("the claim they are unrelated (choice 3)" with 3 the correct choice); de-indexed. q9's references verified correct. h1 (1023 copies, 1.02/append), Multipop potential h2, sum-of-squares induction e1 (14 at n=3), insertion-sort trace e0, binary-search invariant e2 all verified
- [x] a-arrays-lists-stacks-queues — ✔ iter-1188 clean — address 2028/1012, ring-buffer wrap (4 elements, slots 6,7,0,1), growth-factor amortization g/(g−1) with the g→1⁺ blowup, deque index arithmetic, two-stacks trace (3 moves) all verified; no changes
- [x] a-hash-tables — ✔ iter-1189 clean — h0 probing trace (0-6 cluster), SUH indicator-variable proof h1, the hash-flooding DoS + universal-family defense h2 (superb), tombstone e1, sketches bundle (CMS/HLL/consistent-hashing) all verified; no changes
- [x] a-trees-heaps — ✔ iter-1189 clean — BST-delete-via-successor h0 (60 replaces 50), min-heap insertion trace h1 ([3,4,6,7,5], hand-verified), two-heap median h2, AVL RR-case e0, heapsort e1, second-largest q9, heap-index q4 (11/12/2) all verified; no changes
- [x] a-comparison-sorts — ✔ iter-1191 clean — Lomuto trace h0 ([1,2,3,4,6,8], p=2, hand-verified), stable-chaining h1, decision-tree proof h2 (with (n/2)^{n/2} bound), 3-element decision tree e0, Stirling q9, average-case-bound q10 all verified; no changes
- [x] a-linear-sorts-selection — ✔ iter-1191 clean — quickselect trace h1 (partition [1,2,8,6,9,3] hand-verified), groups-of-3 median-of-medians failure h2 (1/3+2/3=1), counting-sort placement walk e0 (every index checked), E[n_i²]<2 bucket analysis q5, radix r≈log n balance q9 all verified; no changes
- [x] a-binary-search — ✔ iter-1192 clean — upper_bound + range-count h0, Koko feasibility-predicate h1 (monotonicity proof + bounds), the three-bug lower_bound debugging h2 (infinite loop/overflow/convention mix), lower_bound trace e2 (index 1) all verified; no changes
- [x] a-divide-and-conquer — ✔ iter-1192 clean — audit flag q0 verified FALSE ALARM (correct 0-based reference). Strassen h0 (8→7, n^2.807), fixed-point h1 (A[i]−i monotone), inversions-via-merge h2, merge trace e0 (24 moves), Case-3 e1 (with regularity check), Karatsuba e2 (408) all verified; no changes
- [x] a-greedy — ✔ iter-1193 — q10 handed learners the exact {1,3,4}/6 counterexample h0 asks them to CONSTRUCT (hint even names the set); q10 moved to a fresh instance {1,4,5}/8 (greedy 4 coins vs optimal 2, Node-verified). q9 letter-refs verified correct (false alarm). EDF exchange h1, Huffman h2, activity-selection e0, {25,20,1}/40 e1 (16 vs 2), fractional-knapsack e2 all verified
- [x] a-dynamic-programming — ✔ iter-1193 — e1 printed h0's exact instance and table ({1,3,4}/6); retargeted to 10 (dp=3 via 3+3+4 vs greedy 4, Node-verified) so h0's hand-fill stays honest work. sunday→saturday=3 h1, LCS=4 BCAB h2, knapsack e2 verified. The {1,3,4} arc from the greedy lesson is deliberate and kept
- [x] a-backtracking-branch-bound — ✔ iter-1194 clean — audit flag q4 FALSE ALARM (correct 0-based ref). Knapsack fractional bound h1 (19.667 vs integer 18, all combos checked), prune-vs-incumbent h2, full B&B trace e1 (bounds 85/80/55, L=70, node-H subtree kill), 4-queens e0 all verified; no changes
- [x] a-graph-representations-traversal — ✔ iter-1194 clean — BFS/DFS h0 (forward edges classified), m=n single-cycle h1, dense/sparse representation h2 (2m/n=1000 vs 16), BFS layers e0, DFS timestamps e1 (0:1/8…4:9/10 with parenthesis-theorem check), gray-vertex cycle e2 all verified; no changes
- [x] a-shortest-paths-topo — ✔ iter-1195 clean — Dijkstra h0 (d[T]=8 via S→A→C→B→T), 3-edge negative counterexample h1, DAG relaxation h2 (d[E]=−4), Bellman-Ford e0 (negative cycle −5 caught by detection pass, every relaxation re-checked), critical-path e1 (10 via S→B→D→T), Dijkstra-fails e2 all verified. e2/h1 shape overlap tolerated (h1's hint reveals it anyway; its work is the explanation)
- [x] a-mst-union-find — ✔ iter-1195 clean — Kruskal h0 (MST 8, 2-3 rejected), union-by-rank+compression h1 (root 1 rank 3, chain 8→7→5 flattened), cycle-property proof h2, Kruskal e0 (MST 11), union-find + cut-property e1 (02 unique-max on 2,4,2,9 cycle → no MST), exchange-argument e2 all verified; e0/h0 and e1/h1 are parallel practice on distinct instances, not dups
- [x] a-np-completeness — ✔ iter-1196 clean — P/NPC classification h0 (2-vs-3 coloring, shortest-vs-longest), IS↔VC complement reduction h1, worst-case-vs-practice h2 (superb), subset-sum certificate e0 (11+7+14=32), 3-SAT→IS gadget e1 (triangles + conflict edges, verified) all correct. e0/e2 both touch Subset-Sum but complementarily — tolerated
- [x] a-approximation-randomized — ✔ iter-1196 clean — greedy Set Cover h0 (3 sets, ratio 1 vs H₈≈2.718), Chernoff majority-vote h1 (t≈50·ln(1/δ), 1036 runs for 10⁻⁹), tight-2 matching h2, VC 2-approx trace e0 (6 vs OPT 3), MAX-SAT e1 (all 8 assignments re-checked, mean 3.5 = 7/8·4), MAX-CUT e2 all verified; no changes
- [x] a-string-algorithms — ✔ iter-1197 — e1's title promised "a Spurious Hit" but its trace contains only a true match (the collision is an aside); retitled to match content. KMP π tables h0/e0 hand-verified ([0,1,0,1,2,0,1,2,3,4,5]; [0,0,1,2,3,0,1]), Rabin-Karp mod-13 windows h1 (10,9,7,12,2), trie h2, 28-vs-14 comparison e2 all verified
- [x] a-algorithms-for-ml — ✔ iter-1197 clean — κ=25 convergence window h0 (η<0.08, factor −1.5 divergence at 0.1), Viterbi h1 (Rainy-Rainy 0.3402, re-derived), brute-vs-HNSW h2 (2 Pflop/s vs 5.6 Gflop/s, ratio ~360k×), 0.8^t contraction e0, batch-vs-SGD e1, k-means e2 all verified; h0 cross-reinforces the calc convergence lesson — fine
- [x] a-amortized-analysis — ✔ iter-1198 clean — h0 (7<16 copies), potential h1 (ĉ=3), the honest-bound h2, three-methods e0 ($3 accounting), amortized≠average e1, binary counter e2 (15 flips for n=8, re-counted) all verified; overlap with lesson-3's amortized material is deliberate deepening on distinct instances; no changes
- [x] a-network-flow — ✔ iter-1198 — h2 asked learners to produce the exact worker-job matching reduction that e2 AND card c5 spell out (answers-in-the-example, 5th case); replaced with edge-disjoint paths via unit capacities (flow decomposition + Menger + fault-tolerance min-cut reading — same modeling skill, un-worked problem). q10 (max flow 5, cut-certified), Edmonds-Karp h1, residual-cut e0, backward-edge e1 all verified
- [x] a-union-find-range — ✔ iter-1199 clean — connectivity h0, Fenwick 2×10⁷-vs-10¹² h1, structure-selection h2 (lazy segtree/UF/sparse table), Kruskal-complexity e0, Fenwick-vs-prefix e1, inverse-Ackermann e2 all verified; overlaps with a-mst-union-find are deliberate deepening; no changes. ALL 23 ALGORITHMS LESSONS DONE.

## algorithms — widgets
- [x] algo-sorting — ✔ iter-1199 clean — 3 btns + slider, errs=0 under drive
- [x] algo-bigo — ✔ iter-1199 clean — btn + slider, errs=0 under drive
- [x] algo-master-theorem — ✔ iter-1199 clean — 3 btns + 3 sliders, note 146ch, errs=0 under drive
- [x] algo-kmeans — ✔ iter-1199 clean — 3 btns, errs=0 under drive
- [x] algo-heap — ✔ iter-1199 clean — 3 btns, note 203ch, errs=0 under drive
- [x] algo-kruskal — ✔ iter-1199 clean — 3 btns, errs=0 under drive
- [x] algo-greedy — ✔ iter-1199 clean — 3 btns, note 324ch, errs=0 under drive
- [x] algo-recursion-tree — ✔ iter-1199 clean — slider, note 310ch, errs=0 under drive
- [x] algo-graph-traversal — ✔ iter-1199 clean — 3 btns, 560px, errs=0 under drive
- [x] algo-hashing — ✔ iter-1199 clean — 4 btns + slider, note 347ch, errs=0 under drive
- [x] algo-binary-search — ✔ iter-1199 clean — 4 btns, note 251ch, errs=0 under drive
- [x] algo-dp-editdistance — ✔ iter-1201 clean — 4 btns, cell-rule note verified (1+min(1,1,0)=1), errs=0 under drive
- [x] algo-dijkstra — ✔ iter-1201 clean — 4 btns, note 123ch, errs=0 under drive
- [x] algo-stack-queue — ✔ iter-1201 clean — 3 btns, errs=0 under drive
- [x] algo-trie — ✔ iter-1201 clean — 6 btns, note 120ch, errs=0 under drive
- [x] algo-maxflow — ✔ iter-1201 clean — slider, note 183ch, errs=0 under drive
- [x] algo-pnp — ✔ iter-1201 clean — 2 btns, note 233ch, errs=0 under drive
- [x] a-reservoir-sampling — ✔ iter-1201 clean — honesty verified — ideal 1/8=0.125, spread 0.033 @2000 trials ≈ few binomial σ, errs=0 under drive
- [x] a-consistent-hashing — ✔ iter-1201 clean — 3 btns, errs=0 under drive
- [x] a-convex-hull — ✔ iter-1201 clean — btn, note 108ch, errs=0 under drive
- [x] a-hll — ✔ iter-1201 clean — slider, note 124ch, errs=0 under drive

## deep-learning — lessons
- [x] dl-ml-recap-and-the-learning-problem — ✔ iter-1202 clean — training risk e0 (2/3), memorizer 0-vs-0.2 gap e1, bias-variance U-curve e2 (6 vs 7.5), test-set-reuse protocol h1, parametric/representation h2 all verified; no changes
- [x] dl-the-artificial-neuron-and-mlp — ✔ iter-1202 — h1 asked to derive the exact collapse formulas e1's final paragraph spells out (W′=W⁽²⁾W⁽¹⁾, b′=W⁽²⁾b⁽¹⁾+b⁽²⁾ — 6th answers-in-the-example case); extended h1 with a numeric part (W′=[2,3], b′=5, both forms → 10 at (1,1), Node-verified). Forward pass h0 (ŷ=4), 115-param count h2, all examples verified
- [x] dl-activation-functions — ✔ iter-1203 — h0 was fully spoiled: its collapse proof is e0 (numeric) + the previous lesson's h1, and its XOR-impossibility part is e1's Step 1 verbatim (7th answers-in-example case). Replaced with the tanh=2σ(2z)−1 identity + max-slope-1 exercise (4× sigmoid; nothing else works tanh; Node-verified). h1 (σ′ max ¼ at 0), h2 (0.25¹⁰≈9.5×10⁻⁷), XOR tent-trace e1, saturation e2 (38×) all verified
- [x] dl-loss-functions — ✔ iter-1203 clean — h0 softmax (0.114/0.844/0.042, loss 2.17, gradient ŷ−y), BCE-gradient cancellation h1, Gaussian/Laplace MLE h2, e0 (0.705/0.259/0.035 with first-principles check), MSE-as-NLL e1 (2.0, step to 2.933), confident-mistakes e2 (0.105/0.693/2.303) all verified; h0/e0 are parallel practice (h0 adds max-subtraction) — good design; no changes
- [x] dl-backpropagation — ✔ iter-1204 clean — h0's closed-gate mirror instance (all gradients 0 except b̄₂=−1 — excellent variation design), h1's index-calculus W̄=XᵀȲ proof, h2's cached-sigmoid (0.3932/0.1966), e3's Lab-matched full pass (4/24) all verified; no changes
- [x] dl-gradient-descent-and-optimizers — ✔ iter-1204 clean — h0 (0<η<2, diverges at 2.5), momentum fixed point h1 (v*=g/(1−β)=10g), Adam first step h2 (θ₁=+0.01, sign handled), e2 (ratio exactly 1) all verified. Noted: h2/e2 share the scale-cancellation punchline (computation differs — tolerated); e0 repeats the (w−3)² instance from a-algorithms-for-ml e0 cross-topic (canonical, shallower here — tolerated); no changes
- [x] dl-learning-rate-schedules-and-tuning — ✔ iter-1205 — q11 explain maligned its own answer ("option 0 is the tempting but wrong diagnosis" — 0 IS the correct exploding-gradient choice); de-indexed. q9's reference verified correct (false alarm). Warmup-cosine h0 (6000 steps, W=300, midpoint 0.001), linear-scaling h1, LR-range-test h2, all examples verified
- [x] dl-overfitting-and-regularization — ✔ iter-1205 clean — (1−ηλ) shrinkage proof h0 (with the ηλ>1 instability), two-model diagnosis h1, early-stopping≈L2 h2 (λ≈1/(ηt)), learning-curve e0 (gaps 0.03/0.44 + the deploy-B-anyway nuance), w*=5/(1+λ) e1, L1-vs-L2 gradient e2 (0.1 vs 0.02) all verified; no changes
- [x] dl-generalization-mysteries — ✔ iter-1206 clean — double-descent regions e0 (spike ~10⁶ at p=n), grokking e1 (weight-decay mechanism), label-noise-sharpens-peak h0, lottery-ticket rewind h1, three-regimes h2, NTK/lazy-training MCQs all verified; later-authored and tight; no changes
- [x] dl-dropout-and-normalization — ✔ iter-1206 clean — inverted-dropout h0 ([2,0,6,0]) and e0 ([4,0,12,16,0] with expectation check) are parallel practice; BN forward h1 ([2.55,5.0,7.45]), batch-size-1 LayerNorm h2, full BN trap e1 (μ_B=4, σ²_B=5, running-stat update) all verified. e2's train/eval overlap with e1/h2 tolerated — its determinism/batch-mates argument is unique; no changes
- [x] dl-initialization-and-vanishing-gradients — ✔ iter-1207 clean — Xavier/He h0 (0.0395/0.0442), gain-compounding h1 (0.6¹⁹≈6.1×10⁻⁵, 1.3¹⁹≈146, both re-computed), clip-by-global-norm h2 (direction-preservation argument), Xavier derivation e0 (κ=nσ²) all verified; no changes
- [x] dl-convolution-operation — ✔ iter-1207 clean — ResNet-stem h0 ((64,64,64), 9472 params), dense-vs-conv h1 (584 vs 4.2M, ~7185×), receptive-field chain h2 (RF=11), VGG two-3×3s e2 (18 vs 25 weights + the nonlinearity point) all verified; h2/e2 receptive-field treatments are complementary; no changes
- [x] dl-pooling-and-cnn-architectures — ✔ iter-1208 clean — shape pipeline h0 (224→112→56), VGG param comparison h1 (409,600 vs 294,912 — deepens the conv lesson's e2 with full C=128 counts, cross-lesson deepening), residual-gradient h2 (∂y/∂x=∂F/∂x+I sum-of-paths), pooling grids e0 (max/avg re-computed) all verified; no changes
- [x] dl-transfer-learning — ✔ iter-1208 clean — head count 10,245, examples-per-parameter contrast (0.06 vs ~38,000 per), discriminative LR table (10⁻³ halving to 6.25×10⁻⁵), two-mistakes diagnosis h2 all verified. h0(a) repeats e0's head count but (b,c) are fresh analysis — tolerated as extension; no changes
- [x] dl-rnn-lstm-gru — ✔ iter-1209 clean — both audit flags (q9/q11) FALSE ALARMS (correct 0-based refs). 0.7⁵⁰≈1.8×10⁻⁸ h0, LSTM highway derivation h1 (∂c_t/∂c_{t−1}=diag(f_t), constant-error-carousel condition), GRU deployment argument h2, LSTM cell-step q9 (c_t=2.0 via 1.9+0.1) all verified; no changes
- [x] dl-embeddings-and-tokenization — ✔ iter-1209 clean — cosine h0 (0.96 vs 0.80), embedding≡one-hot-linear h1 (15M=15M with the 49,999-wasted-multiplies point), COVID-19 OOV h2, analogy e2 (king−man+woman=(2,4)=queen) all verified; no changes
- [x] dl-attention-mechanism — ✔ iter-1211 clean — h0 trace (weights 0.768/0.187/0.045 → output (0.813, 0.232), re-computed), softmax-saturation h1, convex-hull h2 (interpolate-never-extrapolate), e0 ([6.70, 3.30]), numeric √d_k demo e2 all verified; no changes
- [x] dl-transformer-architecture — ✔ iter-1211 — both audit flags (q8/q9) FALSE ALARMS (correct letter refs). e0 shared an identical title with the attention lesson's e0 (different instance — spaced repetition, kept); retitled for search clarity. d_k=4 trace (Z=11.107, weights 0.665/0.090/0.245), −∞ masking q9, multi-head h0, residual h2 all verified
- [x] dl-pretraining-and-finetuning-paradigm — ✔ iter-1212 clean — BERT-vs-GPT task mapping h0, LoRA h1 (131,072 vs 16,777,216 = 0.78%), Chinchilla h2 (D=5×10¹¹, the 10× overshoot to 3×10²²), all examples verified; no changes
- [x] dl-practical-training-and-debugging — ✔ iter-1212 — q9's explain contained the garbled reference "(option D/A)" (letter-consistent but noise); de-indexed. NaN-debugging plan h0, broadcasting-bug h1, Adam-memory h2 (16 B/param → 20.8 GB, lower-bound reasoning), dead-ReLU e1, gradient-check e2 all verified
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

