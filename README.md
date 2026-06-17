# Atlas — Personal Learning Codex

**Live: https://techeese.github.io/learn-atlas/**

A gamified, self-hosted study site for the topics you're learning alongside a full-time job:
**Linear Algebra, Calculus, Algorithms, Deep Learning, Reinforcement Learning, LLMs, and Probability & Statistics**.

Currently **148 lessons · 2,032 fact-checked MCQs · 889 flashcards · 442 homework problems · 298 worked
examples · 36 interactive visualizations**, each lesson with rendered math, step-by-step worked examples, and
spaced-repetition cards — wrapped in an XP / level / streak / mastery / achievement system designed to make
hard ideas *click* and *stick*.

Zero build step (pure HTML/CSS/JS, all progress in `localStorage`); auto-deploys to GitHub Pages on push.

## Features

- **Lectures** — readable lessons with KaTeX-rendered math, callouts, and code, each opening with an auto-generated **"On this page"** table of contents that jumps to any section and **highlights the section you're currently reading** as you scroll (every lesson has 4–11).
- **Examples** — an optional per-lesson tab of worked examples with revealable working.
- **"Deeper dive" expandables** — for genuinely hard concepts, an inline collapsible offers an *alternative* explanation or extra intuition (e.g. Bayes recast as natural frequencies; the reparameterization trick as a pathwise derivative; cross-entropy as a KL divergence to the true distribution) — kept out of the main flow until you want it.
- **Quizzes** — instant feedback + explanations; earns XP, perfect-score bonus; the result screen lands with a count-up score reveal (and confetti on a flawless run).
- **Flashcards** — SM-2-style spaced repetition. A global **Daily Review** surfaces every card that's due across all topics.
- **Recall ("explain it back")** — a free-recall study mode per lesson: write the whole concept from a blank page, then self-check against the lesson's key points and score yourself. Active recall done right — it feeds mastery and earns XP. (The Feynman technique, built in.)
- **Homework** — practice problems with progressive hints and full solutions.
- **Daily Mix** — one click assembles a short guided session: due flashcards → a weak-spot quiz → **redeem a few of your past mistakes** → a "learn next" lesson, with a step indicator. Adapts to skip phases with nothing to do. The "open the app, study for 15 minutes" button.
- **Visualization Lab — 36 interactive widgets**: drag vectors, morph space with a 2×2 matrix, eigenvectors, the derivative, gradient descent (1-D and a 2-D contour map), sorting, Big-O growth, activation functions, a neural-net forward pass, an attention heatmap, PCA, convolution & feature maps, RNN unrolling, a gridworld solved by value iteration, embedding arithmetic, Bayes & base rates, k-means clustering, an overfitting / bias–variance polynomial-fit demo, a backpropagation computational-graph walkthrough, a decoding playground (temperature + top-p nucleus), a Central Limit Theorem demo (watch sample means converge to a bell), a Normal-distribution explorer (μ/σ sliders with empirical-rule bands and live interval probabilities), a Covariance & Correlation scatter (drag ρ to tilt a point cloud, with best-fit line, covariance ellipse, and live sample correlation), a Confidence-Interval coverage simulator (draw many CIs and watch ~95% capture the true mean while ~5% miss), a Diffusion noising/denoising animation (structured data dissolves into Gaussian noise and reassembles), a Convex-vs-non-convex gradient-descent landscape (drop a ball: it finds the global minimum on a convex bowl but gets trapped in a local valley on a bumpy one), a Hypothesis-testing / p-value explorer (drag the observed statistic to see the p-value as a tail area against the rejection region), a Byte-Pair Encoding (BPE) trainer (step a tokenizer through merges — start from characters, merge the most frequent adjacent pair each press, and watch the vocabulary grow while the corpus token count shrinks), a Learning-Rate Schedule explorer (compare constant / step / exponential / cosine / linear schedules with warmup, peak, and floor, and watch the rate trace its path across training), and a Q-Learning Gridworld (watch an agent learn a policy from experience — it explores ε-greedily and updates Q-values from its own transitions; press Train and the greedy arrows snap toward the goal while avoiding the pit), a Beam-Search decoding tree (watch beam search keep the *k* most-probable partial sequences and beat greedy), a Cross-Entropy Loss & Perplexity explorer (slide the probability on the true class and watch −ln(p) and perplexity blow up), and an **Optimizer Race** (drop SGD, Momentum, RMSProp, and Adam on the same ill-conditioned loss valley and watch plain SGD zig-zag across the steep walls while momentum and the adaptive methods cut straight to the minimum), and a **Riemann Sum** visualizer (approximate the area under a curve with rectangles — pick the function and the left/right/midpoint rule, then add more rectangles and watch the sum converge to the exact definite integral while the over-/under-estimate error shrinks), and a **Taylor Polynomial** approximator (overlay a function and its degree-n Taylor polynomial about 0 — degree 1 is exactly the tangent-line linearization, and each added term widens the interval where the polynomial hugs the true curve before it peels away). Each is embedded inline in the lesson it illustrates, and embeddable anywhere with `<div data-viz="ID"></div>`.
- **Spawn a Test (Mastery mode)** — build a custom exam from the 2,032-question bank; scope it to *only what you've completed*, your *weak spots*, a topic, or everything; 5/10/20/40 questions. **Mastery mode (default on)** re-queues every wrong answer until you get it right — no casual remembering.
- **Mastery model** — every concept tracks a decaying mastery score (from quizzes, flashcards, tests). Drives per-lesson mastery bars, a mastery distribution, "weak spots", smarter tests, and the Knowledge Map colors. Turns "I read it" into "I know it."
- **Knowledge Constellation** — a radial map of all 148 concepts branching out from a central hub (foundations near the core, advanced toward the rim), cross-topic prerequisites arcing through the middle, nodes colored by mastery; hover to trace dependencies, click to open. Fits-to-width on mobile.
- **Learning paths + per-lesson Connections** — every lesson knows its prerequisites; open a concept's path for the ordered chain from the beginning, and each lecture ends with "Builds on / Leads to" chips to navigate the graph while reading.
- **Code Playground** — run real **Python** (via Pyodide, incl. numpy) and **JavaScript** in the browser; in-lesson exercises self-check with `<div data-code="python" data-expected="...">starter</div>`.
- **Glossary** — 75 plain-language definitions of the core terms across all seven topics, searchable (and in ⌘K). Key terms are also **hover/tap tooltips inline in lessons**, so a definition is one glance away without leaving the page.
- **Command palette (⌘K / Ctrl+K)** — relevance-ranked, typo-tolerant (fuzzy) search across concepts, visualizations, pages, glossary terms, and references — **plus full-text search inside every lesson's body**, returning the matching lessons with a highlighted context snippet so you can find *where* you read something, not just which lesson it was. It's also a true **command palette**: open it empty for curated quick actions (resume where you left off, start the Daily Mix, review due cards, spawn a test) and **runnable commands** (toggle the theme, cycle the reading text size, restart the tour) — no navigating to settings.
- **Keyboard shortcuts** — 1–4 to answer any MCQ, Space to flip flashcards (then 1–4 to grade), Enter to advance, arrow keys to roam the Knowledge Map. Press **`?`** (or the sidebar's ⌨ Shortcuts) any time for a full in-app reference.
- **Spaced repetition done right** — SM-2 scheduling with Anki-style interval previews on the grade buttons, a global **Daily Review** with a due-load forecast (now / 24h / 7 days), and weak concepts that resurface automatically.
- **Bookmarks** — star any lesson (☆/★) to save it; bookmarked lessons surface in a dashboard section for one-tap return.
- **Notebook** — every note you write in a lesson's "My notes" box is gathered into one **`#/notes`** page (newest concepts ordered by the curriculum), each linking back to its lesson — your own words become a personal revision deck. Reachable from the dashboard, ⌘K, and each lesson's notes box.
- **Redeem your mistakes** — every MCQ you answer wrong (in any quiz or test) is logged to a persistent deck; one click drills *exactly those questions* in mastery mode (re-queued until each one sticks), and they leave the deck the moment you get them right. A finished test also offers an immediate **"Redrill the N you missed"** button right on the results screen — fix them while they're fresh, no detour. Turn failure into the thing you study. (The "think again until you pass" loop.)
- **Concept of the Day** + **"Continue where you left off"** resume card on the dashboard.
- **Daily goal + activity heatmap + streak freezes**; **Cheatsheets** (print/PDF); **Placement diagnostic** to skip ahead; **Progress export/import**; **Library** of curated references.
- **Gamification** — XP (with a floating "+XP" reward burst and an animated level ring), 10 named levels (Novice → Polymath) shown as a ranks ladder, daily streak, **43 achievements** (grouped into themed categories — Lessons, Quizzes, Streaks, Flashcards, Mastery, Levels, Exploration — each with its own unlocked count) with a collection-progress bar, and a level-up confetti celebration.
- **Accessible** — reduced-motion support, focus-visible, ARIA + live regions, a skip link, an adjustable reading text size, keyboard/screen-reader-friendly glossary tooltips, every clickable card (Concept of the Day, course cards, lesson rows, the resume + mistakes CTAs) reachable by Tab and activatable with Enter/Space (`role`/`tabindex`/focus ring), the **Knowledge-Map constellation fully keyboard-navigable** (Tab in, arrow keys to move between the 148 concept nodes with a gold focus ring + live dependency highlight, Enter to open; roving tabindex + per-node ARIA labels), and every interactive visualization labeled for screen readers (canvas `role="img"` + description, named sliders).
- **Installable PWA / offline** — add to home screen; app shell + content cached; a graceful "new version available" prompt on updates.
- **First-visit tour**, **two themes** (Ink / Parchment).
- **Tooling** — `node gate.js` validates the whole data layer (no dup ids, MCQ answer ranges, flashcards, `data-viz` ids, prereq ids).
- **Zero build step.** Pure HTML/CSS/JS; all progress in your browser's `localStorage`.

This platform is maintained by an autonomous improvement loop (`/improve-atlas`); see `CHANGELOG.md` for the per-iteration history and `ROADMAP.md` for the queue.

## Run it locally

Just open `index.html` in a browser. (Math fonts/quizzes need an internet connection
for the KaTeX + Google Fonts CDNs.)

## Deploy to GitHub Pages

1. Create a repo and push these files (the site lives at the repo root).
2. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, branch `main` / `/root`.
3. Visit `https://<you>.github.io/<repo>/`.

No Jekyll config needed — there are no underscore-prefixed folders.

## Add or edit content

All content lives in **`data/courses.js`** — no build step, just edit and reload. Structure:

```js
{
  id: "my-topic", title: "My Topic", icon: "∑", color: "#e0a458",
  blurb: "One-line description shown on the card.",
  modules: [{
    id: "m1", title: "Module name",
    lessons: [{
      id: "unique-lesson-id", title: "Lesson title", minutes: 12,
      content: "HTML string. Use $inline$ and $$display$$ for math.",
      mcq:        [{ q, choices:[...], answer:<0-based index>, explain }],
      flashcards: [{ front, back }],
      homework:   [{ prompt, hint, solution }],
      examples:   [{ title, body, solution }],   // optional Examples tab
      prereqs:    ["other-lesson-id", ...]        // optional cross-topic prerequisites
    }]
  }]
}
```

Every field except `id`/`title` is optional, so partial lessons are fine. Math uses
`$...$` (inline) and `$$...$$` (display). To add a whole new subject, append another
course object to the `window.COURSES` array.

To embed an interactive visualization inside a lesson's `content`, drop in
`<div data-viz="la-linear-transform"></div>` (any id from the Visualization Lab).

### Other data files

- `data/references.js` — `window.REFERENCES` maps each topic id (plus `"general"`) to a
  curated list of `{ title, by, kind, url, note }`. `kind` ∈ video/course/book/paper/article/interactive/reference.
- `js/viz.js` — interactive widgets. Add one with `VIZUtil.register({id, topic, title, blurb}, fn)`;
  `fn(container)` builds the widget using the `VIZUtil` helpers (canvas, sliders, buttons, animation loop).
- Prerequisites: a lesson's learning path is its `prereqs` closure **plus** every lesson before it
  in its own course, so paths work even before you add explicit `prereqs` edges.

## Project layout

```
learn-atlas/
├── index.html          # shell: sidebar, topbar, script tags
├── css/styles.css      # the whole theme
├── js/store.js         # localStorage state: XP, levels, streak, SRS, achievements
├── js/app.js           # SPA router + all views + quiz/flashcard/homework engines
└── data/courses.js     # ← all the learning content (edit this)
```

## Tweak the game feel

- XP awards and level thresholds: top of `js/store.js` (`XP`, `LEVELS`).
- Achievements: `ACHIEVEMENTS` array in `js/store.js`.
- Colors/fonts/spacing: CSS variables at the top of `css/styles.css`.
