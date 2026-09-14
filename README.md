# DreamCoBots Empire HQ

Central command for all Grok-powered bots. Fully revamped with dedicated bot pages, custom action buttons, 30 guided questions, and BuddyAI routing.

## Live features

- **Empire Dashboard** — status, actions, and fleet overview
- **Dedicated bot pages** — BuddyAI, DealAnalyzer, BuildBot, ContentBot
- **Custom buttons** on every bot page for one-click actions
- **30 guided questions** — available on Buddy chat and per-bot pages
- **BuddyAI Orchestrator** — type naturally; Buddy routes you to the right bot
- **GitHub Pages ready** — uses HashRouter + relative base for easy static hosting

## Quick start

```bash
npm install
npm run dev
```

## Build for production / GitHub Pages

```bash
npm run build
```

Then enable **GitHub Pages** on this repo:

1. Repo → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` (or `gh-pages`) / folder: `/docs` or use the `dist` output with an Action

Because the app uses **HashRouter**, it works on GitHub Pages out of the box when you serve the `dist` folder (or the root if you copy built assets).

Recommended simple flow:

```bash
npm run build
# copy contents of dist/ to the root of a gh-pages branch, or configure Pages to serve dist
```

Or add a GitHub Action that builds and deploys `dist` to the `gh-pages` branch.

## Bot map

| Bot | Role |
|-----|------|
| **BuddyAI** | Orchestrator — routes messages and workflows |
| **DealAnalyzer** | Scores deals, risks, and next moves |
| **BuildBot** | Builds, CI, TypeScript, deploy readiness |
| **ContentBot** | Posts, offers, scripts, launch assets |

## Stack

- React 18 + TypeScript
- Vite
- React Router (HashRouter for Pages compatibility)

Grok xAI certified · DreamCoBots Empire
