# REVIEW.md — Review & Refine phase ledger (iters 1158–~1257)

Owner-directed (2026-07-02): review and refine all existing content and visualizations.
Status legend: `pending` · `✔ iter-N — what changed` · `✔ iter-N clean`

**Progress: 19/193 lessons · 4/177 widgets**

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
- [ ] la-eigen — pending
- [ ] la-pca — pending
- [ ] la-svd — pending
- [ ] la-projection — pending
- [x] la-dot-product — ✔ iter-1167 clean — 4 buttons hammered, note 138ch, errs=0
- [x] la-determinant — ✔ iter-1167 clean — 5 buttons hammered, note 148ch, errs=0
- [ ] la-gram-schmidt — pending
- [ ] la-power-iteration — pending
- [ ] la-phase-portrait — pending

## calculus — lessons
- [ ] c-functions-and-graphs — pending
- [ ] c-limits-intuition — pending
- [ ] c-computing-limits — pending
- [ ] c-continuity — pending
- [ ] c-derivative-definition — pending
- [ ] c-differentiation-rules — pending
- [ ] c-chain-rule — pending
- [ ] c-derivatives-special-functions — pending
- [ ] c-implicit-related-rates — pending
- [ ] c-extrema-curve-sketching — pending
- [ ] c-optimization — pending
- [ ] c-linearization-lhopital — pending
- [ ] c-antiderivatives — pending
- [ ] c-definite-integral-riemann — pending
- [ ] c-fundamental-theorem — pending
- [ ] c-integration-techniques — pending
- [ ] c-area-volume — pending
- [ ] c-improper-integrals — pending
- [ ] c-intro-differential-equations — pending
- [ ] c-partial-derivatives — pending
- [ ] c-gradient-directional — pending
- [ ] c-multivariable-optimization — pending
- [ ] c-convexity — pending
- [ ] c-gradient-descent-convergence — pending
- [ ] c-lagrange-multipliers — pending
- [ ] c-duality-kkt — pending
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

