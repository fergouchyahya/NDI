# La-nuit-de-l-info — Carte des Talents (NDI)

**Project Overview**
- **Purpose:** A small client-side interactive quiz that maps participants to one of several "islands" representing digital skills (hardware reuse, free software, digital sobriety, education/community). The project stores quiz attempts in `localStorage` and provides a simple islands map view showing participants per island.
- **Stack:** Plain HTML/CSS/JavaScript (ES modules). No server required for basic operation; a static file server is sufficient. There is an optional `backend/server.js` for API-like behavior during development.

**Pages (NDI folder)**
- **`index.html`**: Landing / introduction page. Contains a button that now points to the quiz entry page.
- **`quiz.html`**: Quiz shell — loads `js/main.js` as a module and injects the quiz UI into `<main id="app">`.
- **`carte.html`**: Islands / map page — displays island images and per-island participant lists in modals. Reads per-island attempt lists from `localStorage`.

**How the quiz flow works**
- Landing (`index.html`) → Click "Découvrir..." → opens `quiz.html`.
- The quiz logic is in `js/main.js`. It renders intro, questions (via `js/ui/quizView.js`), profile screen, and results (via `js/ui/resultView.js`).
- When the user finishes the quiz and confirms their name, the quiz computes scores using `js/core/scoring.js` and saves the attempt using `js/core/api.js`.
- The result screen has a "Retour à la page principale" button that navigates to `carte.html` (islands map).

**LocalStorage keys / data format**
- Global attempts list: `villageTechno_attempts_v1` — an array of full attempt objects with fields:
	- `id` (string), `personName`, `personBio`, `mainIslandId`, `mainIslandName`, `topSkills` (array), `createdAt` (ISO string)
- Per-island lists: `attempts_<islandId>` (e.g. `attempts_free_software_autonomy`) — arrays of simplified entries with fields:
	- `personName`, `personBio`, `islandName`, `topSkills` (array of `{id, level}`)
- These per-island keys are used by `carte.html`'s `loadAttempts` function to populate the island modals.

**Developer notes & files of interest**
- `js/main.js`: main flow and rendering; records initial scroll position and handles navigation.
- `js/core/state.js`: quiz state management (current index, answers, persistence to `localStorage`).
- `js/core/scoring.js`: computes island scores from answers and selects the main island.
- `js/core/api.js`: currently stores attempts in `localStorage` (function `sendAttemptToServer`). It mirrors attempts into per-island keys.
- `js/ui/quizView.js`, `js/ui/resultView.js`: UI fragments for quiz and results.
- `js/data/quizData.js`: islands, competences and generated `questions` array.

**Run locally (quick)**
1. From the `NDI` folder start a static server:
```bash
../run.sh
```
2. Open the landing page: "https://fergouchyahya.github.io/NDI/" .



**License & Attribution**
- This repository contains educational/demo code.Open License