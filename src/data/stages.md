# DreamCoBots — 1-Day Build System

Realistic stages so one focused operator (or a short pair session) can ship a strong version in a day.

## Stage 0 — Foundation (0–2 hours) ✅
- Vite + React + TypeScript boots
- Nothing from previous work erased (`bots/`, `chats/`, `.devcontainer`, `GROK_CERTIFIED.md`)
- Basic Empire HQ shell

## Stage 1 — Operator UI (2–5 hours) ✅
- HashRouter for GitHub Pages
- Dedicated page per bot
- Custom action buttons
- 30 guided questions
- BuddyAI keyword router + chat UI

## Stage 2 — Bot systems (5–8 hours) ← current focus
- Learning plan section on every bot page (with add-your-own)
- Task section + personal benchmarks
- Capabilities + tools needed
- Actions page driven by real bot task data
- Repo organized; stages documented
- Pages deploy workflow present

## Stage 3 — Live intelligence (next session / optional same day)
- Real Grok / xAI API replies
- Persist learning items + routing history
- Ingest `/chats` archives
- Deal intake schema + scoring weights
- Exportable summaries

## How to run a 1-day push
1. Morning: confirm Stage 0–1 green (`npm run typecheck && npm run build`)
2. Midday: finish Stage 2 UI (learning + tasks + Actions)
3. Afternoon: turn on GitHub Pages, smoke-test every bot page
4. Optional evening: Stage 3 API key + first live Buddy reply

## Non-goals for day one
- Full multi-user auth
- Mobile native apps
- Perfect scoring ML model
- 1000-bot fleet (focus on the four certified specialists)
