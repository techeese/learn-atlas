# Atlas — Roadmap

**North star:** the best *personal* learning site ever — for one motivated self-learner studying
linear algebra, calculus, algorithms, deep learning, reinforcement learning, and LLMs.
Optimize for: understanding faster, remembering longer, and *wanting* to come back.

The autonomous loop (`/improve-atlas`) reads this file first. Keep it the live queue:
done items move to CHANGELOG and out; new ideas land in the backlog.

## Now (highest priority)
- **QUESTION BANK — phase 1 DONE (iters 7–9): all 6 topics at ~8 MCQs/lesson, bank 452 → 897.** Mastery mode
  (iter 6) recycles misses until passed. Standing low-priority job: keep topping up weak/thin lessons toward
  ~10/lesson over time, but this is no longer the lead — INTERLEAVE it with the rest of the compass now.
- **NOW INTERLEAVE (bank goal met):** rotate the compass each iteration — don't repeat an area twice running.
  - New visualizations for concepts that lack one: PCA/eigenbasis, convolution, MDP policy iteration, Bayes,
    RNN unrolling. (DONE: neural-net forward pass, attention heatmap, + the original 10.)
  - UI/animation polish & juice (confetti on level-up, XP-gain float, smoother transitions).
  - Onboarding/first-visit tour, better empty states, a hover-glossary of key terms.
  - (DONE iter 11: accessibility — reduced-motion, focus-visible, ARIA, skip link, live-region toasts.)

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

## Backlog (ideas — mine these; add as you discover more)
- AI tutor / infinite practice (opt-in, bring-your-own Claude API key). [owner deferred for now]
- Glossary with hover-definitions of key terms across lessons.
- "Explain it back" — free-text recall with self/AI grading (Feynman technique).
- Per-concept difficulty rating + adaptive question selection in tests.
- Interleaved review sessions (mix topics) beyond the SRS queue.
- More viz: PCA/eigenbasis, convolution, backprop graph, attention heatmap, MDP policy-iteration, Bayes.
- Lesson-embedded code exercises (`data-code` with `data-expected`) tied to each algorithm/DL lesson.
- Reduced-motion + high-contrast accessibility modes.
- Search ranking improvements (fuzzy, recency, mastery-weighted) in ⌘K.
- Onboarding tour for first visit; better empty states everywhere.
- Audio: optional ambient focus soundscape (generative WebAudio, mute by default).
- Print/PDF a full lesson (not just cheatsheets).

## Cadence / anti-monotony (binding)
- Don't pick the **same compass area two iterations running** unless it's broken or owner-asked.
- Prefer the **biggest-value** move; a bold swing (new pillar, overhaul) beats a tidy tweak when warranted.
- **Broken always wins**: a real bug / console error / broken render preempts everything.

## Owner priority — worked examples sweep (in progress)
"Examples when we need it." Adding 2 verified worked examples to every lesson that lacks them, topic by topic
via the author→adversarial-verify workflow. DONE: Linear Algebra (iter 47, 9), Calculus (iter 48, all 20), Algorithms (iter 49, all 18),
Deep Learning (iter 50, all 17), Reinforcement Learning (iter 51, all 16). NEXT: LLMs — the LAST topic;
after it the sweep is COMPLETE and the loop rotates back to the broader compass (UI/viz/new features have
been quiet since iter 46). Reuse
`/tmp/gen_examples_wf.js <topicId> <noun>` → `Workflow({scriptPath})` →
`/tmp/inject_examples.js <topicId> <outputFile>` → gate → all-routes → 390px. Re-running the generator
after a partial inject re-bakes ONLY the still-missing lessons (handy for retrying failures).
Skip purely-conceptual lessons (the verify step returns none for them, as 5 LA lessons correctly did).
**Landmine (iter 50):** a few very matrix/token-heavy lessons (DL RNN + attention) reliably STALLED the
workflow author agent on all 6 retries (~3h wasted, 180s no-progress each). If a lesson fails twice, don't
re-run the workflow — author those 1–2 examples DIRECTLY in the main loop (use a node script with
`String.raw` so LaTeX backslashes stay literal) and have ONE Agent adversarially re-derive the numbers.

## Notes / discoveries
- **Architecture review (iter 36):** layer discipline is clean — content in `data/*.js`, visualizations in
  `js/viz.js` (818 ln, cohesive registry of 18 widgets), playground in `js/playground.js`, state + SM-2 +
  mastery in `js/store.js` (374 ln), all app/router/views in `js/app.js` (1381 ln), styles in `css/styles.css`.
  `js/app.js` is the only large file; it's ONE IIFE whose ~40 view/helper functions share closure vars
  (`app`, `esc`, `C`, `index`, `bindGo`, `typeset`, `flushAchievements`, …), so a split needs a shared-context
  object — high-coupling, partially unverifiable (render behavior), low immediate value. **Verdict: healthy;
  no clean+safe+worthwhile extraction now. Defer the shared-context split until app.js becomes painful** (the
  overlay layer — confetti/levelup/intro/palette/studyKeys — is the cleanest future leaf). `node gate.js`
  guards the data layer.
- (loop appends findings here)
