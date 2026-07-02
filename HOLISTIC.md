# HOLISTIC.md — site-wide findings & radical-change backlog

Owner mandate (2026-07-02): "review massively the site content, structures, visualization quality —
better holistic view, more radical changes." Phase: iters ~1216–1315.

Source: 13-agent audit workflow (iter 1215–1216) — one auditor per topic + a cross-site structure
auditor + a visualization-pedagogy auditor; 686k tokens, 197 tool calls, zero failed agents. Raw
findings: workflow `wf_953cf34e-30b`. This file is the prioritized synthesis; check items off with
the shipping iteration number. REVIEW.md remains the per-unit verification ledger.

Verification discipline for every item: byte-stable injectors, g()-guards, `node gate.js` ALL
GREEN, SW bump on served-asset changes, headless smoke, explicit staging, push.

---

## P0 — Structural (site-level, highest leverage)

- [ ] **S1 · Reorder the canonical course sequence** to `la → calc → ps → algos → it → ml → dl →
  rl → llm → ts → gt`. Current order is script-tag accretion order (index.html:146–156, never
  revisited as a curriculum decision); 17 of 107 cross-topic prereq edges point FORWARD under it
  (all 9 dl/rl/llm→ps edges, 8 →it edges). The ideal order flips every edge backward (verified by
  the auditor against data/prereqs.js). Zero content cost: reorder the `<script defer>` tags + SW
  bump. Grid order, map gating, and path banners then agree instead of contradicting.
- [ ] **S2 · Tier the dashboard Topics grid** into a visible numbered path — Foundations (la,
  calc, ps, algos, it) · Core ML (ml, dl) · Frontier & applications (rl, llm, ts, gt) — surfacing
  at topic level the order signal PREREQS already encodes at lesson level. Today no "start here"
  signal exists anywhere.
- [ ] **S3 · One-sweep data-shape hygiene + gate enforcement**: (a) add missing `id` fields to
  probability-statistics modules 6–7 (only shape deviation sitewide — latent breakage risk);
  (b) bring the 5 sub-parity lessons up to 16 MCQs (dl-generalization-mysteries 8,
  ps-estimation-theory 8, ml-trustworthy-models 8, gt-auctions-mechanism-design 8,
  gt-cooperative-games 9 — spawn-a-test/mastery sampling under-cover them); (c) add gate.js checks
  for module-id presence + MCQ parity so neither regresses.
- [ ] **S4 · Wire missing foundation prereq edges** so "ready to learn" gating stops
  over-promising: a-approximation-randomized → ps-expectation-variance (uses expectation 6×,
  Monte Carlo 14×, zero declared edges); audit dl/rl/llm for similar silent reliances
  (dl-loss-functions' MLE framing → ps-point-estimation).
- [ ] **S5 · Merge information-theory's five singleton modules** into 2–3 real ones (module
  headers currently imply structure that doesn't exist); same for ml-ensembles / ts-modern
  singletons where natural.
- [ ] **S6 · (design decision, owner-visible)** Consider deriving topic order at boot via
  toposort over PREREQS (or an explicit `order` field) so future topics self-place and the
  curriculum can't silently regress. Also on the table: splitting probability-statistics (28
  lessons) into Probability (~12, the dl/rl/llm prereq spine) + Statistics/Bayes/Causality (~16).

## P1 — Weakest-lesson rewrites (rewrite to house standard, not patch)

Per-topic weakest lessons, each named by its auditor with concrete reasons (thin content vs topic
norm, no worked computation, missing dives/MCQs/widget). Rewrite ~1–2 per iteration:

- [ ] **la module 7 rebuild**: fold la-gradients-jacobians (9.8k chars, definitions catalog) +
  its autodiff dives into la-matrix-calculus-backprop; derive (don't assert) ∇(xᵀAx)=(A+Aᵀ)x in
  la-matrix-derivative-identities; every survivor gets a full by-hand numeric example. Result: two
  beefier lessons replacing three thin ones.
- [ ] **c-duality-kkt** (7.5k vs ~16k norm, hardest material at shallowest depth): add the
  supporting-hyperplane geometric picture, a 2-D worked dual, mainline KKT-from-saddle-point.
- [ ] **c-gradient-directional**: cut the ~⅓ that re-teaches partial derivatives + the GD recap;
  spend freed space on its unique content.
- [ ] **algos module-7 dissolve/rebuild**: a-amortized-analysis is a near-total duplicate of
  a-correctness-invariants' amortized half — fold the binary counter back and delete/replace;
  rewrite a-union-find-range as a true range-structures lesson (Fenwick/segment-tree depth)
  instead of ⅔ union-find re-teach. Consider the auditor's cleaner alternative: split
  a-correctness-invariants (invariants ‖ amortized) and re-home the pieces.
- [ ] **a-network-flow**: upgrade "worked intuition" prose into a numeric Ford–Fulkerson trace on
  a concrete 6-node graph with residual states per augmentation.
- [ ] **dl-generalization-mysteries** (7.1k, 8 MCQs, zero dives): rewrite to full standard with a
  worked micro-experiment per mystery; relocate as module-3 capstone.
- [ ] **dl-graph-neural-networks** (5.5k) + **dl-vision-transformers** (6.2k): expand from
  compressed-survey to house standard (real weight-matrix message-passing example; ViT-vs-CNN
  inductive-bias treatment).
- [ ] **rl-model-based + rl-offline** (both ~10.5k, no numeric worked example, duplicated by the
  capstone's survey sections): rewrite with tabular Dyna-Q on a 4-state chain / a tiny offline
  dataset where max-Q provably extrapolates wrong; cut the capstone's duplicate sections to
  pointers and reorder module 7 before rl-connections-frontiers.
- [ ] **l-mixture-of-experts** (5.5k vs 17–27k norm): rewrite with a by-hand token→router→top-2
  gates→combined-output example; move after l-scaling-laws.
- [ ] **ps-estimation-theory** (four graduate topics in 7.2k): split — Fisher/CRLB/delta stays in
  module 4; empirical-Bayes/shrinkage moves to the Bayesian module. Pair with the new MLE lesson
  (see P4).
- [ ] **ps-bayesian-decisions**: replace the admitted-mismatch frequentist ps-ci-coverage embed.
- [ ] **ml-trustworthy-models** (5.7k, 4 sections, zero dives) — finish the half-done split:
  delete ml-model-selection's stray section 6 + misplaced code + orphaned ml-conformal widget;
  rebuild to 8-section standard.
- [ ] **ml-dimensionality-reduction**: put real projection/variance math back (PCA mechanics are
  currently outsourced to LA in one paragraph).
- [ ] **it-differential-entropy**: REORDER after it-mutual-information (it forward-references KL,
  MI, VAEs, and "the capstone" before any exist) and rewrite the plug-in-only exercises.
- [ ] **it-information-in-ml**: front half re-teaches it-cross-entropy-kl nearly verbatim with
  two recycled dl-* widgets — turn re-teach into synthesis (loss↔CE, regularization↔MDL mapping).
- [ ] **ts-forecast-evaluation** + **ts-deep-forecasting**: merge duplicated leakage dives;
  runnable pinball-loss cell; ts-deep-forecasting is the topic's hardest lesson and its only
  widget-less one (see P3 missing-viz).
- [ ] **gt-auctions-mechanism-design** (6.2k, zero dives, no widget, 8 MCQs): rewrite in house
  style — derive the first-price bid-v/2 equilibrium instead of asserting it; VCG/GSP + Braess
  dives; reorder after gt-mixed-zero-sum (its revenue-equivalence core needs equilibrium ideas).

## P2 — Redundancy consolidations (cut genuine duplication, keep spaced repetition)

- [ ] **Calculus constrained-optimization arc**: c-multivariable-optimization's Lagrange section
  is verbatim-duplicated by c-lagrange-multipliers (same xy/x+y=10 example) → cut to a trailer.
- [ ] **Calculus stutter pairs**: c-optimization re-teaches c-extrema-curve-sketching's derivative
  tests; GD's LR story is introduced as-new three times → reference-and-escalate instead.
- [ ] **LA module-7 dives**: chain-rule/autodiff taught 3× within one module; near-duplicate
  forward-vs-reverse dives; layout conventions twice; "AᵀA squares κ" warning 3× sitewide →
  one canonical statement + cross-refs each.
- [ ] **LLM loss spine**: l-pretraining-objective-data owns MLE→CE; cut
  l-optimization-and-stability's re-derivation to recap + its unique gradient contribution.
- [ ] **IT max-entropy dives**: merge it-entropy's two near-duplicates; spend freed budget on a
  Fano's-inequality dive in it-channel-capacity.
- [ ] **DL SSL arc**: reorder dl-self-supervised-contrastive next to
  dl-pretraining-and-finetuning-paradigm; trim ViT's CLIP section to a pointer.
- [ ] **Widget dup pairs** — keep the stronger, retire/repoint the other: ps-hyptest vs
  ps-hypothesis-test · ml-double-descent vs dl-double-descent · algo-kmeans vs ml-kmeans-viz ·
  dl-cross-entropy vs llm-cross-entropy.

## P3 — Visualization system

**Bugs (fix first — quick wins):**
- [ ] Four single-quoted `data-viz='…'` embeds (ts-acf, ts-forecast-cone, gt-replicator,
  gt-shapley) lose lab↔lesson backlinks because app.js lookups are double-quote-only → make
  lookups quote-agnostic (mirror the iter-1149 gate fix) or normalize the quotes.
- [ ] gt-shapley widget stranded in gt-repeated-cooperation; move to gt-cooperative-games (and
  the Vickrey try-it from gt-foundations to the auctions lesson).
- [ ] Raw `$…$` LaTeX shows in viz notes after first interaction (dl-optimizers, calc-gd2d,
  dl-rectified-flow) → re-typeset notes on update or strip math from notes.
- [ ] Touch-dead interactions: calc-gd2d (mousedown-only; its note says "click anywhere" but touch
  users can't), llm-attention (hover-only) → pointer events.
- [ ] Topic-mismatched embeds: c-improper-integrals embeds calc-bayes (unrelated); rl-dqn reuses
  rl-q-learning (replay buffer/target network never shown).

**Weak-as-teachers upgrade list (real computation > canned data; predict-then-reveal archetype):**
- [ ] llm-attention — compute softmax(QKᵀ/√d) from editable toy vectors, not a frozen 7×7 matrix.
- [ ] llm-embeddings — let the learner pick any word triple; analogies may miss (that's the real
  lesson) instead of a hand-placed grid where king−man+woman lands by construction.
- [ ] llm-kv-cache — fix the y-scale so O(t) vs O(t²) visibly diverge (currently normalized to
  look pixel-identical at every slider position).
- [ ] llm-react-loop, llm-transformer-block, algo-pnp — currently caption-switchers/slideshows;
  give each a real manipulable computation.
- [ ] dl-rnn — add the gradient view (the lesson is about vanishing gradients; the widget shows
  none); kill decorative particle loops here and in dl-neural-net.

**Missing high-value widgets (8, each named by the auditor):**
- [ ] MCMC/Metropolis-Hastings for ps-computational-bayes (highest-value missing widget sitewide)
- [ ] span/independence collapse for la-span-independence (+ four-subspaces map)
- [ ] Jacobian-as-local-linear-map zoom for la module 7
- [ ] offline-RL distribution-shift / DQN replay-buffer view
- [ ] second-price-auction truthfulness one-slider for gt-auctions
- [ ] improper-integral tail-area accumulator (1/x^p across p=1) for c-improper-integrals
- [ ] dynamic-array doubling cost-spikes-vs-flat-average for amortized analysis
- [ ] eligibility-trace decay bars for rl-eligibility-traces; ICL/RLHF preference-pair widget for
  the LLM track
- [ ] sliding-window reframing / global-vs-local pooling widget for ts-deep-forecasting

**Idiom standardization:**
- [ ] transport() helper in VIZUtil owning ▶/⏸ state + canonical labels (labels currently split
  ▶ Play/Run/Race; 5 widgets never show pause state); pointer-events + dragKeys by default.
- [ ] written color-role contract (gold=focus, sage=truth/target, rust=error/divergence,
  violet=learner probe, mute=reference) + legend chips; fix violators (calc-derivative,
  ps-clt, dl-activation).
- [ ] note placement: 4 LA widgets render note above controls vs ~170 below → unify.

## P4 — Genuine gaps (new content authorized by the audit)

- [ ] LA: "Transpose & the adjoint view" section in la-matrix-multiplication — define Aᵀ,
  (AB)ᵀ=BᵀAᵀ, (Ax)·y=x·(Aᵀy); the most-used never-taught object (pays off in four-subspaces,
  least squares, backprop). Also: matrix norms + general κ(A)=σmax/σmin (Eckart–Young is
  currently meaningless without them); change-of-basis/similarity as first-class.
- [ ] Calc: bridge lesson "Taylor Expansion & Quadratic Approximation" (tangent→Hessian→Newton→
  L-smoothness) — currently deep-dive-only yet load-bearing for module 6+.
- [ ] Algos: "DFS Applications: SCC & All-Pairs Paths" (Kosaraju/Tarjan + Floyd–Warshall) —
  promised by the traversal lesson, never delivered; a-algorithms-for-ml becomes the finale.
- [ ] RL: "Continuous Control: DDPG, TD3, SAC" after rl-actor-critic — name-dropped repeatedly as
  "the workhorses," never taught.
- [ ] LLM: "Reasoning Models & Test-Time Compute" after l-prompting-and-in-context-learning; a
  policy-gradients-in-one-page dive inside l-rlhf so it stands alone.
- [ ] PS: "Likelihood & MLE" lesson (the missing bridge before estimation theory); "Chi-square
  test" lesson in Hypothesis Testing; swap ps-conjugate-priors' embed to the underused
  ps-beta-update.
- [ ] ML: "Data preparation & pipelines" early lesson (four lessons declare scaling mandatory;
  pipelines/leakage presume it); split ml-ensembles into bagging ‖ boosting (+ boosting widget);
  extract CV/train-val-test into a short lesson right after ml-decision-trees.
- [ ] IT: Gaussian channel + Shannon–Hartley in it-channel-capacity (with capacity-vs-SNR
  slider) — the payoff differential entropy currently lacks.
- [ ] TS: "Reading the correlogram: ACF & PACF" bridge (Box–Jenkins identification currently
  depends on tools taught only in passing); "Beyond the mean" lesson absorbing the
  GARCH/Granger/spectral/cointegration dives.
- [ ] GT: "Sequential Games: Trees, Backward Induction, Credible Threats" between gt-foundations
  and repeated games (subgame perfection currently only a dive).

## Remaining verification backlog (old-phase ledger, continues under this phase)

96 lessons (rl 18 · llm 20 · ps 28 · ml 12 · it 7 · ts 6 · gt 5) + 124 widgets pending in
REVIEW.md. Accelerate with workflow fan-outs (per-lesson verifier agents, findings applied
centrally with the byte-stable injector).

## Sequencing (proposed)

1. **Iter 1217**: S1 course reorder + S2 dashboard tiers + SW bump (flagship, zero content risk).
2. **Iter 1218**: S3 shape hygiene + gate checks; P3 bug batch (quote-agnostic lookups,
   gt-shapley move, note re-typesetting, touch fixes).
3. Then interleave per iteration: one P1 rewrite OR one P2 consolidation OR one P3 widget
   upgrade/missing-widget build, alongside workflow-accelerated verification sweeps of the
   remaining 7 topics. Step-backs every 10th iteration re-run the sweep + refresh this file.
