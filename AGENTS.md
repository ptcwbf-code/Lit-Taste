# Goal

A small local full-stack learning project: a quiz **platform**.

The user answers short scenario questions; the app measures their answers across a
set of dimensions, draws a radar chart, and matches them to the entity whose
profile is closest. The literary/musical/animal content is the vehicle, not the
point — the real goal is understanding how frontend, backend, database and HTTP
APIs work together.

# Structure

- `frontend/` : browser UI (catalog, quiz, radar chart, results, share card) — HTML/CSS/Vanilla JS
- `backend/`  : Node.js + Express server (serves questions, computes scores & matches, stores results)
- `database/` : PostgreSQL schema (`init.sql`, applied idempotently at startup)
- `tests/`    : **content packages** — each is one quiz. The engine doesn't know what any
                test is about; it loads `tests/<id>/test.js` and uses its dims/entities/
                questions/details. Current packages: `literary-taste`, `literary-character`,
                `animal`, `music`.

# Tech Stack

- HTML, CSS, Vanilla JavaScript (frontend)
- Node.js, Express (backend)
- PostgreSQL via the `pg` module (no ORM) — `DATABASE_URL` env var, local default `localhost:5432/literary_taste`

# Data Model

- `results`: one row per completed run — `test_id`, `submission_id`, `result_json` (whole result
  serialized as JSON, since dimension counts vary per test).
- Questions, entities and their scoring vectors are **not** in SQL — they live in the JS
  content packages, because every option carries a nested scoring vector that is awkward as
  flat columns.

# How a test works (the generic engine)

1. `tests/<id>/test.js` exports: `id/title/…`, `dims` (ordered), `config` (scoring params),
   `pronouns`, `copy` (soul/readingTips/…), and `questions`/`entities`/`details`.
2. `backend/scoring.js` is generic: `computeProfile` (sum → normalize by "signal seen") and
   `matchEntities` (centered cosine similarity vs each entity).
3. `backend/server.js` loads every `tests/*/test.js` at startup and serves them all over the
   same routes — no code changes needed to add a new quiz, just a new content package.

# Development Rules

- Keep the architecture simple: frontend / backend / database clearly separated.
- Do not introduce React, Vue, Next.js, TypeScript, Docker or an ORM.
- Keep SQL visible (see `database/init.sql` and the prepared statements in `backend/server.js`).
- Prefer understandable code over production-level abstraction.
- No Controller / Service / Repository layers.
- Before introducing a new dependency, explain why it is needed.
- Scoring / matching lives in the backend; the frontend only renders UI, the radar, and the share card.

# How To Run

- Start the backend:  `cd backend && npm start`   (needs a reachable PostgreSQL; http://localhost:3001)
- Open the frontend:  http://localhost:3001/      (served by the backend)
- Smoke test:         `cd backend && npm run smoke`  (or `node tests/smoke.js` from the repo root)

# Learning Goal

Browser -> Frontend -> HTTP API -> Backend -> SQL -> Database
