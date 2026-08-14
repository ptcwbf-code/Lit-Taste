# Goal

A small local full-stack learning project: a "literary taste" quiz.

The user answers short literary scenario questions. The app measures their
reading preferences across 10 dimensions (叙事/抒情/心理/想象/社会/哲思/形式/轻快/幽默/欲望),
draws a radar chart, and matches them to writers whose profile is closest.

The user's real goal is to understand how frontend, backend, database and
HTTP APIs work together. The literary content is the vehicle, not the point.

# Structure

- frontend/ : browser UI (quiz, radar chart, results)
- backend/  : Node.js / Express server (serves questions & writers, computes scores & matches)
- database/ : SQLite database + SQL + seed data

# Tech Stack

- HTML, CSS, Vanilla JavaScript (frontend)
- Node.js, Express (backend)
- SQLite via the built-in `node:sqlite` module (no ORM)

# Data Model

- `writers`  : the 72 writers, each with 10 dimension scores (SQLite table)
- `results`  : each completed test's dimension scores + top matches (SQLite table)
- `questions`: literary scenarios + options + per-option scoring vectors
  (kept as a JS seed file, NOT SQLite, because every option carries a nested
  scoring vector that is awkward to express as flat columns)

# Development Rules

- Keep the architecture simple: frontend / backend / database clearly separated.
- Do not introduce React, Vue, Next.js, TypeScript, Docker or an ORM.
- Keep SQL visible (see database/init.sql and the prepared statements in backend/server.js).
- Prefer understandable code over production-level abstraction.
- No Controller / Service / Repository layers.
- Before introducing a new dependency, explain why it is needed.
- The quiz scoring / matching logic lives in the backend; the frontend only
  renders the UI and the radar chart.

# How To Run

- Seed the database once:  node database/seed.js
- Start the backend:       cd backend && npm start   (http://localhost:3001)
- Open the frontend:       http://localhost:3001/    (served by the backend)

# Learning Goal

Browser -> Frontend -> HTTP API -> Backend -> SQL -> Database
