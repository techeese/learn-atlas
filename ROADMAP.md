# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 708, 2026-06-22)
**9 topics · 179 lessons (all at the 16 MCQ / 6 cards / 3 examples / 3 homework / 3 deep-dives standard) · 127 visualizations (all embedded) · 279 glossary terms · cross-topic prereq graph · Library references · code exercises.** Last full sweep: iter 718 (errs=0/bad=none).
- ✅ iter 721: `ml-dimensionality-reduction` topped to 16 MCQ + prereq edge. ✅ iter 722: +5 DR glossary terms (t-SNE, UMAP, whitening, explained-variance, manifold; glossary 268→273). DR lesson fully integrated across every surface. NOTE: learning paths are derived dynamically (new lessons auto-integrate — no curation needed).
- ✅ iter 717: `dl-vision-transformers` topped to 16 MCQ. ✅ iter 719: **NEW viz dl-vit-patchify** (124th — image→patches→tokens; DL viz 23/23). Recent current-gap fills (iters 711–719): MoE (lesson+viz), SSM/Mamba (deep-dive), ViT/multimodal (lesson+viz) — all fully built & integrated.
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory.
`node gate.js` is ALL GREEN and machine-checks content-parity (warns on any lesson below the standard). Last full 174-lesson regression sweep: iter 708, errs=0/bad=none.
Lesson (iters 709–710): a fresh-eyes screenshot review caught stale "original-6-topics" literals — "6 paths" on the Knowledge Map (fixed) and `store.js` well-rounded `>=6` (→`>=3`, fixed); SKILL.md "Six topics"→"Nine" too. When the site grows, grep for frozen topic counts (`6`/`six`) in UI copy AND logic; prefer `C().length`/`window.COURSES.length`. Visual review of all major pages (dashboard/map/achievements/progress) = polished & consistent (achievements 62/62, all categorized).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671): 4 lessons + ps-beta-update viz + refs.
- **PS Module 7 — Causal Inference** (679–689): 3 lessons (confounding→DAGs/backdoor→estimation) + causal-dag viz + glossary + refs.
- **Calculus M7 — Optimization backbone** (693–699): added duality/KKT + projected/proximal to convexity·GD-convergence·Lagrange; calc-duality viz; ml-svm→c-duality-kkt edge; refs.
- **Content sweeps (long done):** worked examples (47–52, all lessons), question bank → 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (122 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks.

## Now / live queue
- ⏳ Top `dl-self-supervised-contrastive` 8→16 MCQ (iter 737; gate parity-warns). DL M6 modern stack: ViT · GNN · self-supervised/contrastive (+ MoE/SSM in LLM).
- ✅ iter 728: `dl-graph-neural-networks` topped to 16 MCQ (full parity). DL architecture coverage now complete: MLP·CNN·RNN/LSTM·Transformer·ViT·GNN. Recent architecture gap-fills (iters 711–728): MoE, SSM/Mamba, ViT/multimodal, dim-reduction, GNN.
- ✅ iter 712: `l-mixture-of-experts` topped to 16 MCQ. ✅ iter 713: **NEW viz llm-moe-router** (123rd; LLM 19/20). MoE fully built. ✅ iter 714: **SSM/Mamba frontier deep-dive** added to l-self-attention (the last absent modern LLM paradigm). LLM current-topic coverage: MoE, RAG, LoRA, quantization, CoT, KV-cache, speculative decoding, SSMs — all present.
- **Maturity plateau:** the autonomous high-value backlog is largely exhausted — every major area is comprehensive and fully integrated (verified repeatedly). Recent iterations = fine-grained, genuinely-additive polish (hard-concept deep-dives, accurate prereq edges, glossary/reference completeness, new viz for the last genuine gaps), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **10th topic** (everything in-scope is currently covered, so this needs owner appetite); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer` (parallel fetch, ordered exec); fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 9 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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
- Step back every ~10 iterations (full 174-lesson regression sweep); is the site measurably better, any compass area neglected?

## Backlog (ideas — mine these; add as you discover more)
- ✅ iter 732: money/prose-in-math garble is now caught by gate.js (`proseInMath` lint) AND was audited clean across 178 lessons at runtime. The iter-200/731 class is closed (lint + clean corpus).

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 708, 2026-06-22)
**9 topics · 179 lessons (all at the 16 MCQ / 6 cards / 3 examples / 3 homework / 3 deep-dives standard) · 127 visualizations (all embedded) · 279 glossary terms · cross-topic prereq graph · Library references · code exercises.** Last full sweep: iter 718 (errs=0/bad=none).
- ✅ iter 721: `ml-dimensionality-reduction` topped to 16 MCQ + prereq edge. ✅ iter 722: +5 DR glossary terms (t-SNE, UMAP, whitening, explained-variance, manifold; glossary 268→273). DR lesson fully integrated across every surface. NOTE: learning paths are derived dynamically (new lessons auto-integrate — no curation needed).
- ✅ iter 717: `dl-vision-transformers` topped to 16 MCQ. ✅ iter 719: **NEW viz dl-vit-patchify** (124th — image→patches→tokens; DL viz 23/23). Recent current-gap fills (iters 711–719): MoE (lesson+viz), SSM/Mamba (deep-dive), ViT/multimodal (lesson+viz) — all fully built & integrated.
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory.
`node gate.js` is ALL GREEN and machine-checks content-parity (warns on any lesson below the standard). Last full 174-lesson regression sweep: iter 708, errs=0/bad=none.
Lesson (iters 709–710): a fresh-eyes screenshot review caught stale "original-6-topics" literals — "6 paths" on the Knowledge Map (fixed) and `store.js` well-rounded `>=6` (→`>=3`, fixed); SKILL.md "Six topics"→"Nine" too. When the site grows, grep for frozen topic counts (`6`/`six`) in UI copy AND logic; prefer `C().length`/`window.COURSES.length`. Visual review of all major pages (dashboard/map/achievements/progress) = polished & consistent (achievements 62/62, all categorized).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671): 4 lessons + ps-beta-update viz + refs.
- **PS Module 7 — Causal Inference** (679–689): 3 lessons (confounding→DAGs/backdoor→estimation) + causal-dag viz + glossary + refs.
- **Calculus M7 — Optimization backbone** (693–699): added duality/KKT + projected/proximal to convexity·GD-convergence·Lagrange; calc-duality viz; ml-svm→c-duality-kkt edge; refs.
- **Content sweeps (long done):** worked examples (47–52, all lessons), question bank → 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (122 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks.

## Now / live queue
- ✅ iter 728: `dl-graph-neural-networks` topped to 16 MCQ (full parity). DL architecture coverage now complete: MLP·CNN·RNN/LSTM·Transformer·ViT·GNN. Recent architecture gap-fills (iters 711–728): MoE, SSM/Mamba, ViT/multimodal, dim-reduction, GNN.
- ✅ iter 712: `l-mixture-of-experts` topped to 16 MCQ. ✅ iter 713: **NEW viz llm-moe-router** (123rd; LLM 19/20). MoE fully built. ✅ iter 714: **SSM/Mamba frontier deep-dive** added to l-self-attention (the last absent modern LLM paradigm). LLM current-topic coverage: MoE, RAG, LoRA, quantization, CoT, KV-cache, speculative decoding, SSMs — all present.
- **Maturity plateau:** the autonomous high-value backlog is largely exhausted — every major area is comprehensive and fully integrated (verified repeatedly). Recent iterations = fine-grained, genuinely-additive polish (hard-concept deep-dives, accurate prereq edges, glossary/reference completeness, new viz for the last genuine gaps), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **10th topic** (everything in-scope is currently covered, so this needs owner appetite); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer` (parallel fetch, ordered exec); fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 9 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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
- Step back every ~10 iterations (full 174-lesson regression sweep); is the site measurably better, any compass area neglected?

 money in PROSE (no nearby closing `# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 708, 2026-06-22)
**9 topics · 179 lessons (all at the 16 MCQ / 6 cards / 3 examples / 3 homework / 3 deep-dives standard) · 127 visualizations (all embedded) · 279 glossary terms · cross-topic prereq graph · Library references · code exercises.** Last full sweep: iter 718 (errs=0/bad=none).
- ✅ iter 721: `ml-dimensionality-reduction` topped to 16 MCQ + prereq edge. ✅ iter 722: +5 DR glossary terms (t-SNE, UMAP, whitening, explained-variance, manifold; glossary 268→273). DR lesson fully integrated across every surface. NOTE: learning paths are derived dynamically (new lessons auto-integrate — no curation needed).
- ✅ iter 717: `dl-vision-transformers` topped to 16 MCQ. ✅ iter 719: **NEW viz dl-vit-patchify** (124th — image→patches→tokens; DL viz 23/23). Recent current-gap fills (iters 711–719): MoE (lesson+viz), SSM/Mamba (deep-dive), ViT/multimodal (lesson+viz) — all fully built & integrated.
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory.
`node gate.js` is ALL GREEN and machine-checks content-parity (warns on any lesson below the standard). Last full 174-lesson regression sweep: iter 708, errs=0/bad=none.
Lesson (iters 709–710): a fresh-eyes screenshot review caught stale "original-6-topics" literals — "6 paths" on the Knowledge Map (fixed) and `store.js` well-rounded `>=6` (→`>=3`, fixed); SKILL.md "Six topics"→"Nine" too. When the site grows, grep for frozen topic counts (`6`/`six`) in UI copy AND logic; prefer `C().length`/`window.COURSES.length`. Visual review of all major pages (dashboard/map/achievements/progress) = polished & consistent (achievements 62/62, all categorized).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671): 4 lessons + ps-beta-update viz + refs.
- **PS Module 7 — Causal Inference** (679–689): 3 lessons (confounding→DAGs/backdoor→estimation) + causal-dag viz + glossary + refs.
- **Calculus M7 — Optimization backbone** (693–699): added duality/KKT + projected/proximal to convexity·GD-convergence·Lagrange; calc-duality viz; ml-svm→c-duality-kkt edge; refs.
- **Content sweeps (long done):** worked examples (47–52, all lessons), question bank → 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (122 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks.

## Now / live queue
- ✅ iter 728: `dl-graph-neural-networks` topped to 16 MCQ (full parity). DL architecture coverage now complete: MLP·CNN·RNN/LSTM·Transformer·ViT·GNN. Recent architecture gap-fills (iters 711–728): MoE, SSM/Mamba, ViT/multimodal, dim-reduction, GNN.
- ✅ iter 712: `l-mixture-of-experts` topped to 16 MCQ. ✅ iter 713: **NEW viz llm-moe-router** (123rd; LLM 19/20). MoE fully built. ✅ iter 714: **SSM/Mamba frontier deep-dive** added to l-self-attention (the last absent modern LLM paradigm). LLM current-topic coverage: MoE, RAG, LoRA, quantization, CoT, KV-cache, speculative decoding, SSMs — all present.
- **Maturity plateau:** the autonomous high-value backlog is largely exhausted — every major area is comprehensive and fully integrated (verified repeatedly). Recent iterations = fine-grained, genuinely-additive polish (hard-concept deep-dives, accurate prereq edges, glossary/reference completeness, new viz for the last genuine gaps), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **10th topic** (everything in-scope is currently covered, so this needs owner appetite); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer` (parallel fetch, ordered exec); fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 9 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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
- Step back every ~10 iterations (full 174-lesson regression sweep); is the site measurably better, any compass area neglected?

) mis-pairs with the next `# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 708, 2026-06-22)
**9 topics · 179 lessons (all at the 16 MCQ / 6 cards / 3 examples / 3 homework / 3 deep-dives standard) · 127 visualizations (all embedded) · 279 glossary terms · cross-topic prereq graph · Library references · code exercises.** Last full sweep: iter 718 (errs=0/bad=none).
- ✅ iter 721: `ml-dimensionality-reduction` topped to 16 MCQ + prereq edge. ✅ iter 722: +5 DR glossary terms (t-SNE, UMAP, whitening, explained-variance, manifold; glossary 268→273). DR lesson fully integrated across every surface. NOTE: learning paths are derived dynamically (new lessons auto-integrate — no curation needed).
- ✅ iter 717: `dl-vision-transformers` topped to 16 MCQ. ✅ iter 719: **NEW viz dl-vit-patchify** (124th — image→patches→tokens; DL viz 23/23). Recent current-gap fills (iters 711–719): MoE (lesson+viz), SSM/Mamba (deep-dive), ViT/multimodal (lesson+viz) — all fully built & integrated.
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory.
`node gate.js` is ALL GREEN and machine-checks content-parity (warns on any lesson below the standard). Last full 174-lesson regression sweep: iter 708, errs=0/bad=none.
Lesson (iters 709–710): a fresh-eyes screenshot review caught stale "original-6-topics" literals — "6 paths" on the Knowledge Map (fixed) and `store.js` well-rounded `>=6` (→`>=3`, fixed); SKILL.md "Six topics"→"Nine" too. When the site grows, grep for frozen topic counts (`6`/`six`) in UI copy AND logic; prefer `C().length`/`window.COURSES.length`. Visual review of all major pages (dashboard/map/achievements/progress) = polished & consistent (achievements 62/62, all categorized).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671): 4 lessons + ps-beta-update viz + refs.
- **PS Module 7 — Causal Inference** (679–689): 3 lessons (confounding→DAGs/backdoor→estimation) + causal-dag viz + glossary + refs.
- **Calculus M7 — Optimization backbone** (693–699): added duality/KKT + projected/proximal to convexity·GD-convergence·Lagrange; calc-duality viz; ml-svm→c-duality-kkt edge; refs.
- **Content sweeps (long done):** worked examples (47–52, all lessons), question bank → 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (122 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks.

## Now / live queue
- ✅ iter 728: `dl-graph-neural-networks` topped to 16 MCQ (full parity). DL architecture coverage now complete: MLP·CNN·RNN/LSTM·Transformer·ViT·GNN. Recent architecture gap-fills (iters 711–728): MoE, SSM/Mamba, ViT/multimodal, dim-reduction, GNN.
- ✅ iter 712: `l-mixture-of-experts` topped to 16 MCQ. ✅ iter 713: **NEW viz llm-moe-router** (123rd; LLM 19/20). MoE fully built. ✅ iter 714: **SSM/Mamba frontier deep-dive** added to l-self-attention (the last absent modern LLM paradigm). LLM current-topic coverage: MoE, RAG, LoRA, quantization, CoT, KV-cache, speculative decoding, SSMs — all present.
- **Maturity plateau:** the autonomous high-value backlog is largely exhausted — every major area is comprehensive and fully integrated (verified repeatedly). Recent iterations = fine-grained, genuinely-additive polish (hard-concept deep-dives, accurate prereq edges, glossary/reference completeness, new viz for the last genuine gaps), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **10th topic** (everything in-scope is currently covered, so this needs owner appetite); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer` (parallel fetch, ordered exec); fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 9 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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
- Step back every ~10 iterations (full 174-lesson regression sweep); is the site measurably better, any compass area neglected?

 and renders prose as italic KaTeX — kErr/gate stay green (iter-200 class; one live instance fixed in l-prompting iter 731). A static `# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
the math and ideas behind modern AI. Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the **live queue**: done items
move to CHANGELOG and out; new ideas land in the Backlog. (Full per-iteration history lives in `CHANGELOG.md`.)

## Current state (iter 708, 2026-06-22)
**9 topics · 179 lessons (all at the 16 MCQ / 6 cards / 3 examples / 3 homework / 3 deep-dives standard) · 127 visualizations (all embedded) · 279 glossary terms · cross-topic prereq graph · Library references · code exercises.** Last full sweep: iter 718 (errs=0/bad=none).
- ✅ iter 721: `ml-dimensionality-reduction` topped to 16 MCQ + prereq edge. ✅ iter 722: +5 DR glossary terms (t-SNE, UMAP, whitening, explained-variance, manifold; glossary 268→273). DR lesson fully integrated across every surface. NOTE: learning paths are derived dynamically (new lessons auto-integrate — no curation needed).
- ✅ iter 717: `dl-vision-transformers` topped to 16 MCQ. ✅ iter 719: **NEW viz dl-vit-patchify** (124th — image→patches→tokens; DL viz 23/23). Recent current-gap fills (iters 711–719): MoE (lesson+viz), SSM/Mamba (deep-dive), ViT/multimodal (lesson+viz) — all fully built & integrated.
Topics: Linear Algebra · Calculus · Algorithms · Deep Learning · Reinforcement Learning · LLMs · Probability & Statistics · Machine Learning · Information Theory.
`node gate.js` is ALL GREEN and machine-checks content-parity (warns on any lesson below the standard). Last full 174-lesson regression sweep: iter 708, errs=0/bad=none.
Lesson (iters 709–710): a fresh-eyes screenshot review caught stale "original-6-topics" literals — "6 paths" on the Knowledge Map (fixed) and `store.js` well-rounded `>=6` (→`>=3`, fixed); SKILL.md "Six topics"→"Nine" too. When the site grows, grep for frozen topic counts (`6`/`six`) in UI copy AND logic; prefer `C().length`/`window.COURSES.length`. Visual review of all major pages (dashboard/map/achievements/progress) = polished & consistent (achievements 62/62, all categorized).

## ★ OWNER DIRECTIVE (standing, 2026-06-17)
1. **Deepen with genuinely ADVANCED lessons/modules**, not just more basics.
2. **Hard-concept support** — for hard concepts, add an extra deeper-dive / alternative explanation; split or merge lessons where it helps.
3. **New learning functionality is welcome.**
4. New topics welcome (loop pre-blessed; additive/reversible — owner may rename/redirect/kill).
Owner steers by *reacting* to the live site. Key past steers (detail in `CHANGELOG.md` + memory `learn-atlas-direction`): backprop deep-focus (iter 426), UI/UX as a first-class lane, custom domain `atlascodex.io` + SEO prerender (owner's `prerender.js`/`.github/`/`dist/` — **never edit**).

## Completed major arcs (loop-initiated; detail in CHANGELOG)
- **7th–9th topics:** Probability & Statistics (iters 71+), Machine Learning (514–544), Information Theory (575–583).
- **PS Module 6 — Bayesian Inference** (652–671): 4 lessons + ps-beta-update viz + refs.
- **PS Module 7 — Causal Inference** (679–689): 3 lessons (confounding→DAGs/backdoor→estimation) + causal-dag viz + glossary + refs.
- **Calculus M7 — Optimization backbone** (693–699): added duality/KKT + projected/proximal to convexity·GD-convergence·Lagrange; calc-duality viz; ml-svm→c-duality-kkt edge; refs.
- **Content sweeps (long done):** worked examples (47–52, all lessons), question bank → 16 MCQ/lesson, 3 deep-dives/lesson, embedded code exercises, viz frontier (122 widgets), cross-topic prereq graph, inline glossary tooltips, a11y (ARIA/reduced-motion/high-contrast), activity heatmap, Daily Mix, Knowledge Map, search, notes, bookmarks.

## Now / live queue
- ✅ iter 728: `dl-graph-neural-networks` topped to 16 MCQ (full parity). DL architecture coverage now complete: MLP·CNN·RNN/LSTM·Transformer·ViT·GNN. Recent architecture gap-fills (iters 711–728): MoE, SSM/Mamba, ViT/multimodal, dim-reduction, GNN.
- ✅ iter 712: `l-mixture-of-experts` topped to 16 MCQ. ✅ iter 713: **NEW viz llm-moe-router** (123rd; LLM 19/20). MoE fully built. ✅ iter 714: **SSM/Mamba frontier deep-dive** added to l-self-attention (the last absent modern LLM paradigm). LLM current-topic coverage: MoE, RAG, LoRA, quantization, CoT, KV-cache, speculative decoding, SSMs — all present.
- **Maturity plateau:** the autonomous high-value backlog is largely exhausted — every major area is comprehensive and fully integrated (verified repeatedly). Recent iterations = fine-grained, genuinely-additive polish (hard-concept deep-dives, accurate prereq edges, glossary/reference completeness, new viz for the last genuine gaps), rotating the compass.
- **Owner-steer big levers (the real next jumps):** (1) a brand-new **10th topic** (everything in-scope is currently covered, so this needs owner appetite); (2) the **lazy-load data perf refactor** (see Backlog) — high-risk, LOW real urgency (the SW caches everything for the single repeat learner), so deferred pending owner steer.

## Perf notes
First-load path is optimized: all data/logic scripts are `defer` (parallel fetch, ordered exec); fonts via `<link>`; `preconnect` to jsdelivr + Google Fonts. The 9 topic data files (~7MB) are parsed eagerly; Pages gzips them so the real cost is parse/execute, paid only on first visit (SW caches after). Lazy-loading per-topic content is the big swing but RISKY — see Backlog.

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
- Step back every ~10 iterations (full 174-lesson regression sweep); is the site measurably better, any compass area neglected?

+digit scan is too noisy (legit math starts with digits). Proper detector: headless-load each lesson, flag `.katex` spans whose textContent holds 3+ English words (collapsed prose). One targeted sweep over 178 lessons.
- **(big but risky) Lazy-load topic data.** The 9 `data/*.js` files (~7MB) all load eagerly via `<script defer>`. The dashboard/search/glossary/prereqs only need course+lesson *metadata* (id/title/icon/color/blurb/minutes/module structure), not the heavy per-lesson `content`/`mcq`/etc. A real first-load win would split each topic into a tiny manifest (eager) + heavy content (lazy per-topic on first lesson open). Sizable architecture change — the app assumes `window.COURSES` is fully populated synchronously everywhere (gate.js, search, prereqs, glossary, map, daily picks) — so do it as a carefully-staged phase with its own gate, NOT a casual iteration. LOW urgency (SW caches for the repeat user); owner-steer.
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred]
- Per-concept difficulty rating + adaptive question selection in tests.
- Recency/mastery-weighted search ranking in ⌘K (fuzzy already done).
- Onboarding tour for first visit; richer empty states.
- Audio: optional ambient focus soundscape (generative WebAudio, mute by default).
- Print/PDF a full lesson (cheatsheets already printable).
- Candidate 10th-topic / module ideas IF owner wants more breadth: Graph ML/GNNs; Time-Series/forecasting; a deeper Numerical-Methods/conditioning thread. (Generative models, optimization, causal inference are already covered.)
- **Authoring notes:** JS code-exercises are gate-verified (`node gate.js` runs every `data-code="javascript"` block, asserts output===`data-expected`); Python (Pyodide) still needs a manual browser check. Viz blurbs/notes are NOT KaTeX-typeset — use plain unicode (xₜ, √, ε, ᾱ), not `$...$`.

## Notes / discoveries (LANDMINES — keep)
- **★ mathtools-only LaTeX envs silently fail KaTeX (iter 329):** `\begin{psmallmatrix}` / `bsmallmatrix` / `Bmatrix*` etc. are `mathtools` (not in the bundled KaTeX) — they raise `No such environment` at typeset time (a real `.katex-error` the static lints miss; only the `--dump-dom` kErr count catches it). KaTeX DOES support `matrix/pmatrix/bmatrix/vmatrix/smallmatrix`. For an inline small matrix use `\left(\begin{smallmatrix}…\end{smallmatrix}\right)`. ALWAYS run the dump-dom kErr check after adding math.
- **★ `**` in code-exercise source fails the gate (iter 309):** the `rawMarkdown` lint flags `**` as bold, so JS `x ** 2` in a `data-code` block trips it. Use `x * x` or `Math.pow`, never `**`.
- **★ literal `<` inside math breaks rendering (iter 189):** math is injected via `innerHTML` before `typeset()`; a `<` immediately followed by a letter (e.g. `x_{<t}`, `\alpha<1`) is parsed as an HTML tag-open, truncating the text node and breaking the `$…$` pair → raw `$` shows. FIXED centrally by `escapeMathLt`/`normalizeMath()` in app.js (escapes `<`→`&lt;` inside math at boot). You don't hand-escape `<` in data — but a NEW innerHTML+math render path or data field must flow through `normalizeMath()`. `>` is safe; only `<`+letter breaks. (Authoring `.cjs` injectors guard this too: use `\lt`/`\gt`/`\le`/`\ge`.)
- **★ bare escaped money `\$` in prose garbles nearby math (iter 200):** a `\$` in prose leaves a stray `$` that KaTeX auto-render mis-pairs with the next real `$…$`, rendering the prose between them as garbled italic math (kErr stays 0 — you must LOOK at the screenshot). FIXED in the boot normalizer (`\$`→ literal-$ span outside math). NEVER use a bare `$` for money in lesson strings (breaks `$…$` parity) — reword dollar-free.
- **Verification harness:** for any math view assert **rawDollars=0** (`body.innerText.match(/\$[^$\s]/g)`) AND **katex>0** AND **kErr=0** (count `.katex-error`); for quizzes check the CHOICES render, not just the stem. For money content, also screenshot (garble renders without raising kErr).
- **Byte-stable injection (binding):** author content via a `.cjs` script — `objStart=raw.indexOf("{")`, `objEnd=raw.lastIndexOf("}")`, round-trip guard `head+JSON.stringify(course,null,2)+tail===raw`, mutate, write back. The render-safety `g()` guard (even-`$` parity, no `**`, no bad envs, no bare-`<` in `$…$`, no raw `&`) earns its keep — it has caught bad keys and raw `&` pre-commit.
- **MCQ de-skew + key-assertion:** author correct choice first, `targets=[0,1,2,3,0,1,2,3]`, swap into target slot, assert `choices[answer].includes(key)`; new 8 + existing 8 = 16 at 4/4/4/4. (Spot-QA iter 706: 80 recent-arc answers all correct.)
- **Don't overstate prereq edges:** only add an edge when the dependency is genuine (SVM truly derives from duality ✓; "ml-regularization builds on proximal" ✗ — backwards). LA/calc/algos are intentionally unwired foundation-roots.
- **SW cache:** bump `CACHE` (`atlas-vN`→`vN+1`) on ANY change to a served asset (index.html, css, js/*, data/*). NOT for gate.js, ROADMAP.md, CHANGELOG.md (not served).
- **Git hygiene (binding):** never blind `git add -A` — owner's `prerender.js`/`.github/`/`dist/` must not be swept in; stage your own paths explicitly. Always `pkill -9 -f "Google Chrome.*--headless"` after verify runs (zombie Chrome → black screenshots).
- **Architecture:** `js/app.js` is one large IIFE (shared closure vars) — a split needs a shared-context object; healthy, defer until painful. Layer discipline clean: content in `data/*.js`, viz in `js/viz.js`, state/SM-2/mastery in `js/store.js`.
- (loop appends durable findings here)
