# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 883, 2026-06-23)
**11 topics · 188 lessons · 165 visualizations · 422 glossary terms · 168 code exercises** (Game Theory fully built out: 3 lessons + deep-dives on mechanism design/auctions, evolutionary GT/ESS, cooperative games/Shapley, and Bayesian games/signaling — integrated with viz, glossary, code, refs, prereqs)
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory · Time Series & Forecasting · Game Theory.
`node gate.js` is ALL GREEN; it machine-checks data + render-hazards (proseInMath money-garble lint, sparse-array holes, unbalanced tags/`$`, unsupported KaTeX envs), runs every JS code-exercise, and warns on any lesson below content-parity.
Every major UI flow (dashboard · daily review · spawn-a-test · library · cheatsheet · placement · playground · knowledge map) has been fresh-eyes screenshot-reviewed (iters 733–752) and is polished; bugs found were fixed (test first-run dead-end iter 744; quiz-accuracy "—" iter 733; deep-dive title-case iter 734).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671); **PS Module 7 — Causal Inference** (679–689); **Calculus M7 — Optimization backbone** (693–699) — each with lessons, viz, glossary, refs, prereq edges.
- **Modern AI stack (711–740):** MoE, SSM/Mamba (deep-dive), ViT/multimodal, Dimensionality Reduction, **GNNs**, **Self-Supervised/Contrastive learning** — DL M6 modern stack complete (MLP·CNN·RNN·Transformer·ViT·GNN); each fully built + integrated (lesson · 16 MCQ · code · viz · 3 deep-dives · prereqs · glossary · Library refs).
- **Over-parameterization trilogy (741–749):** double descent (deep-dive + viz), grokking, lottery ticket — the "why big nets work" story, with `implicit regularization` as the thread.
- **Gate/pipeline hardening:** proseInMath money-garble lint (732), sparse-array-hole check across all data arrays (750–751), faster boot math-normalizer (746, byte-identical +40%).
- **Content sweeps (long done):** worked examples (all lessons), 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (129 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast/keyboard), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks, placement, playground (all 11 topics), 63 achievements.

## Now / live queue
- **✅ Time Series & Forecasting (10th topic) — DONE:** 6 lessons (what-is-a-TS, stationarity & differencing, moving averages & exponential smoothing, ARIMA, forecast evaluation/backtesting, deep forecasting) + viz (decomposition, AR process, exp-smoothing, ACF, forecast cone, backtesting), glossary, prereqs, refs.
- **✅ Game Theory (11th topic) — DONE:** 3 lessons (foundations, mixed/zero-sum, repeated games & cooperation) deeply built out with deep-dives on mechanism design/auctions, evolutionary GT/ESS, cooperative games/Shapley→SHAP, and Bayesian games/signaling; viz (Nash 2×2, minimax, IPD, replicator, Shapley), glossary, code, refs, cross-links to GANs/RL self-play/ML interpretability.
- **Maturity plateau (deep):** the autonomous high-value backlog is exhausted — every major area is comprehensive, current, deeply-explained, fully integrated, and regression-clean (verified by repeated kErr-aware full sweeps). Recent iterations = fine-grained genuinely-additive polish (occasional real concept gap — e.g. Gaussian processes, adversarial examples, the bootstrap — plus the cross-topic web: KL, kernels, MLE, PCA, explore-exploit threaded across topics), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **12th topic** (everything in-scope is currently covered, so this needs owner appetite — see Backlog candidates); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer`; fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 11 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). The boot math-normalizer is batched (iter 746). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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

## Cadence / anti-monotony (binding)
- Don't pick the **same compass area two iterations running** unless it's broken or owner-asked.
- Prefer the **biggest-value** move; a bold swing (new pillar, overhaul) beats a tidy tweak when warranted.
- **Broken always wins**: a real bug / console error / broken render preempts everything.
- Step back every ~10 iterations (full all-lessons regression sweep); is the site measurably better, any compass area neglected?

## Backlog (ideas — mine these; add as you discover more)
- **(big but risky) Lazy-load topic data.** The 11 `data/*.js` files (~7MB) all load eagerly via `<script defer>`. The dashboard/search/glossary/prereqs only need course+lesson *metadata* (id/title/icon/color/blurb/minutes/module structure), not the heavy per-lesson `content`/`mcq`/etc. A real first-load win would split each topic into a tiny manifest (eager) + heavy content (lazy per-topic on first lesson open). Sizable architecture change — the app assumes `window.COURSES` is fully populated synchronously everywhere (gate.js, search, prereqs, glossary, map, daily picks) — so do it as a carefully-staged phase with its own gate, NOT a casual iteration. LOW urgency (SW caches for the repeat user); owner-steer.
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred]
- Per-concept difficulty rating + adaptive question selection in tests.
- Recency/mastery-weighted search ranking in ⌘K (fuzzy already done).
- Onboarding tour for first visit; richer empty states.
- Audio: optional ambient focus soundscape (generative WebAudio, mute by default).
- Candidate 10th-topic / module ideas IF owner wants more breadth: Graph ML/GNNs (note: a GNN *lesson* now exists in DL); Time-Series/forecasting; a deeper Numerical-Methods/conditioning thread. (Generative models, optimization, causal inference, self-supervised learning are already covered.)
- **Authoring notes:** JS code-exercises are gate-verified (`node gate.js` runs every `data-code="javascript"` block, asserts output===`data-expected`); Python (Pyodide) still needs a manual browser check. Viz blurbs/notes are NOT KaTeX-typeset — use plain unicode (xₜ, √, ε, ᾱ), not `$...$`.

## Notes / discoveries (LANDMINES — keep)
- **★ mathtools-only LaTeX envs silently fail KaTeX (iter 329):** `\begin{psmallmatrix}` / `bsmallmatrix` / `Bmatrix*` etc. are `mathtools` (not in the bundled KaTeX) — they raise `No such environment` at typeset time (a real `.katex-error` the static lints miss; only the `--dump-dom` kErr count catches it). KaTeX DOES support `matrix/pmatrix/bmatrix/vmatrix/smallmatrix`. For an inline small matrix use `\left(\begin{smallmatrix}…\end{smallmatrix}\right)`. ALWAYS run the dump-dom kErr check after adding math.
- **★ `**` in code-exercise source fails the gate (iter 309):** the `rawMarkdown` lint flags `**` as bold, so JS `x ** 2` in a `data-code` block trips it. Use `x * x` or `Math.pow`, never `**`.
- **★ literal `<` inside math breaks rendering (iter 189):** math is injected via `innerHTML` before `typeset()`; a `<` immediately followed by a letter (e.g. `x_{<t}`, `\alpha<1`) is parsed as an HTML tag-open, truncating the text node and breaking the `$…$` pair → raw `$` shows. FIXED centrally by `escapeMathLt`/`normalizeMath()` in app.js (escapes `<`→`&lt;` inside math at boot). You don't hand-escape `<` in data — but a NEW innerHTML+math render path or data field must flow through `normalizeMath()`. `>` is safe; only `<`+letter breaks. (Authoring `.cjs` injectors guard this too: use `\lt`/`\gt`/`\le`/`\ge`.)
- **★ bare/escaped money near math garbles silently (iter 200/731):** a stray `$` in prose (bare money like "$5", or a `\$`) mis-pairs with the next real `$…$`, rendering the prose between them as garbled italic math — kErr stays 0, so LOOK at the screenshot. FIXED in the boot normalizer (`\$`→ literal-$ span outside math), and **gate.js `proseInMath` now flags prose-inside-`$…$` statically (iter 732).** Write money as `\$`; never a bare `$` for money in lesson prose.
- **★ sparse-array holes from a stray `,,` (iter 750/751):** a double comma in any data-file array literal leaves an `undefined` slot that `.forEach`/`.map` SKIP (so per-element checks miss it) but index/`.find` access hits → broken render. gate.js `noHoles()` now audits COURSES (+ mcq/choices/cards/examples/homework), GLOSSARY, REFERENCES, PREREQS with a `for`-loop (`i in arr`).
- **Verification harness:** for any math view assert **rawDollars=0** (`body.innerText.match(/\$[^$\s]/g)`) AND **katex>0** AND **kErr=0** (count `.katex-error`); for quizzes check the CHOICES render, not just the stem. For money content, also screenshot (garble renders without raising kErr).
- **Byte-stable injection (binding):** author content via a `.cjs` script — `objStart=raw.indexOf("{")`, `objEnd=raw.lastIndexOf("}")`, round-trip guard `head+JSON.stringify(course,null,2)+tail===raw`, mutate, write back. The render-safety `g()` guard (even-`$` parity, no `**`, no bad envs, no bare-`<` in `$…$`, no raw `&`, proseInMath) earns its keep — it has caught bad MCQ keys, a raw `&`, and money garble pre-commit.
- **MCQ de-skew + key-assertion:** author correct choice first, `targets=[0,1,2,3,0,1,2,3]`, swap into target slot, assert `choices[answer].includes(key)`; new 8 + existing 8 = 16 at 4/4/4/4.
- **Don't overstate prereq edges:** only add an edge when the dependency is genuine (SVM truly derives from duality ✓; "ml-regularization builds on proximal" ✗ — backwards). LA/calc/algos are intentionally unwired foundation-roots.
- **SW cache (binding):** bump `CACHE` (`atlas-vN`→`vN+1`) on ANY change to a served asset (index.html, css, js/*, data/*). NOT for gate.js, ROADMAP.md, CHANGELOG.md. **After committing, verify `sw.js` is in the commit with the new value (`git show --stat HEAD`) — a local bump can be lost before commit (iter 752→753).**
- **Git hygiene (binding):** never blind `git add -A` — owner's `prerender.js`/`.github/`/`dist/` must not be swept in; stage your own paths explicitly. Always `pkill -9 -f "Google Chrome.*--headless"` after verify runs (zombie Chrome → black screenshots).
- **Architecture:** `js/app.js` is one large IIFE (shared closure vars) — a split needs a shared-context object; healthy, defer until painful. Layer discipline clean: content in `data/*.js`, viz in `js/viz.js`, state/SM-2/mastery in `js/store.js`, playground in `js/playground.js`.
- (loop appends durable findings here)
