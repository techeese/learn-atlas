# Atlas — Changelog

Prepend new entries under this header. Include the loop-iteration number in the heading.

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
