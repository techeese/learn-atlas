# Atlas — Personal Learning Codex

**Live: https://techeese.github.io/learn-atlas/**

A gamified, self-hosted study site for the topics you're learning alongside a full-time job:
**Linear Algebra, Calculus, Algorithms, Deep Learning, Reinforcement Learning, and LLMs**.

Currently **113 lessons · 897 fact-checked MCQs · 678 flashcards · 337 homework problems · 218 worked
examples · 18 interactive visualizations**, each lesson with rendered math, step-by-step worked examples, and
spaced-repetition cards — wrapped in an XP / level / streak / mastery / achievement system designed to make
hard ideas *click* and *stick*.

Zero build step (pure HTML/CSS/JS, all progress in `localStorage`); auto-deploys to GitHub Pages on push.

## Features

- **Lectures** — readable lessons with KaTeX-rendered math, callouts, and code.
- **Examples** — an optional per-lesson tab of worked examples with revealable working.
- **Quizzes** — instant feedback + explanations; earns XP, perfect-score bonus.
- **Flashcards** — SM-2-style spaced repetition. A global **Daily Review** surfaces every card that's due across all topics.
- **Homework** — practice problems with progressive hints and full solutions.
- **Visualization Lab — 18 interactive widgets**: drag vectors, morph space with a 2×2 matrix, eigenvectors, the derivative, gradient descent (1-D and a 2-D contour map), sorting, Big-O growth, activation functions, a neural-net forward pass, an attention heatmap, PCA, convolution & feature maps, RNN unrolling, a gridworld solved by value iteration, embedding arithmetic, Bayes & base rates, and k-means clustering. Each is embedded inline in the lesson it illustrates, and embeddable anywhere with `<div data-viz="ID"></div>`.
- **Spawn a Test (Mastery mode)** — build a custom exam from the 897-question bank; scope it to *only what you've completed*, your *weak spots*, a topic, or everything; 5/10/20/40 questions. **Mastery mode (default on)** re-queues every wrong answer until you get it right — no casual remembering.
- **Mastery model** — every concept tracks a decaying mastery score (from quizzes, flashcards, tests). Drives per-lesson mastery bars, a mastery distribution, "weak spots", smarter tests, and the Knowledge Map colors. Turns "I read it" into "I know it."
- **Knowledge Constellation** — a radial map of all 113 concepts branching out from a central hub (foundations near the core, advanced toward the rim), cross-topic prerequisites arcing through the middle, nodes colored by mastery; hover to trace dependencies, click to open. Fits-to-width on mobile.
- **Learning paths + per-lesson Connections** — every lesson knows its prerequisites; open a concept's path for the ordered chain from the beginning, and each lecture ends with "Builds on / Leads to" chips to navigate the graph while reading.
- **Code Playground** — run real **Python** (via Pyodide, incl. numpy) and **JavaScript** in the browser; in-lesson exercises self-check with `<div data-code="python" data-expected="...">starter</div>`.
- **Glossary** — 48 plain-language definitions of the core terms across all six topics, searchable (and in ⌘K).
- **Command palette (⌘K / Ctrl+K)** — relevance-ranked search across concepts, visualizations, pages, glossary terms, and references.
- **Keyboard shortcuts** — 1–4 to answer any MCQ, Space to flip flashcards (then 1–4 to grade), Enter to advance.
- **Spaced repetition done right** — SM-2 scheduling with Anki-style interval previews on the grade buttons, a global **Daily Review** with a due-load forecast (now / 24h / 7 days), and weak concepts that resurface automatically.
- **Concept of the Day** + **"Continue where you left off"** resume card on the dashboard.
- **Daily goal + activity heatmap + streak freezes**; **Cheatsheets** (print/PDF); **Placement diagnostic** to skip ahead; **Progress export/import**; **Library** of curated references.
- **Gamification** — XP, 10 named levels (Novice → Polymath) shown as a ranks ladder, daily streak, **20 achievements**, and a level-up confetti celebration.
- **Accessible** — reduced-motion support, focus-visible, ARIA + live regions, a skip link, and an adjustable reading text size.
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
