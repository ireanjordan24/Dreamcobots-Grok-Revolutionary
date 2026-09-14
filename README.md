# DreamCoBots Empire HQ

Central command for Grok-powered bots. **Nothing from the original repo was erased** (`bots/`, `chats/`, `.devcontainer`, `GROK_CERTIFIED.md` all remain).

## Live features

- **Empire Dashboard** — status, live Actions, stages
- **Dedicated bot pages** — BuddyAI, DealAnalyzer, BuildBot, ContentBot
- **Custom buttons** + **30 guided questions**
- **BuddyAI Orchestrator** — natural language → correct bot
- **Learning prompt section** on every bot page (planned + add your own, saved in browser)
- **Task section** with personal benchmarks, capabilities, tools needed
- **Actions page connected to real bot task data**
- **1-day build stages** documented and shown in the UI
- **GitHub Pages** workflow included

## 1-day build system

| Stage | Hours | Goal |
|-------|-------|------|
| **0 Foundation** | 0–2h | Boots, nothing erased |
| **1 Operator UI** | 2–5h | Bot pages, Buddy, questions |
| **2 Bot systems** | 5–8h | Learning, tasks, Actions live data |
| **3 Live intelligence** | optional | Real Grok API, history, deal schema |

Details: `src/data/stages.md`

## Quick start

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Routes

- `/` — Empire HQ (Dashboard · Actions · Bots · Stages · Orchestrator)
- `/chat` — BuddyAI + all 30 questions
- `/bots/buddyai` · `/bots/dealanalyzer` · `/bots/buildbot` · `/bots/contentbot`

## Repo layout (organized, non-destructive)

```
├── bots/              # original Replit / bot drop folder (kept)
├── chats/             # chat archive drop folder (kept)
├── .devcontainer/     # kept
├── .github/workflows/ # Pages deploy
├── src/
│   ├── components/    # EmpireHQ, BotPage, BuddyChat
│   ├── data/          # bots.ts, actions.ts, stages.md
│   ├── App.tsx
│   └── index.css
├── GROK_CERTIFIED.md
└── package.json
```

## GitHub Pages

1. Settings → Pages → Source: **GitHub Actions**
2. Push to `main` (or run the workflow manually)
3. Site: `https://ireanjordan24.github.io/Dreamcobots-Grok-Revolutionary/`

Uses HashRouter + relative base so static hosting works without a custom 404 server.

## Issue scan note

This repository is small (few formal GitHub issues). A full structural audit was applied instead: data model completeness, Actions↔bot linkage, learning persistence, stage documentation, CSS coverage for new panels, and preservation of all pre-existing paths. Potential issues (missing fields, disconnected Actions, no learning UI) were fixed in Stage 2.

Grok xAI certified · DreamCoBots Empire
