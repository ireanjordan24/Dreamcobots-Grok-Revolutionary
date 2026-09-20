# DreamCo plugin registry

One list. Every Grok chat, GitHub agent, Custom GPT, and Empire HQ bot uses these names.

Rule from `grok-buddy-bridge`: **one Buddy runtime. Do not fork a second OS.**

## Layers

1. Operator — Empire HQ (`ireanjordan24/Dreamcobots-Grok-Revolutionary`)
2. Router — BuddyAI (always first)
3. Workers — specialist bots + GitHub/Grok agents + optional ChatGPT GPTs

Source of fleet files: `DreamCo-Technologies/Dreamcobots`
Public board: this repo

## Operator faces (Empire HQ)

| id | name | engine | use when |
|----|------|--------|----------|
| buddyai | BuddyAI | Grok first, ChatGPT ok | route, workflow, memory, “which bot” |
| dealanalyzer | DealAnalyzer | Grok or ChatGPT | score deal, risk, compare, next move |
| buildbot | BuildBot | Grok + GitHub agents | build, CI, PR, deploy, TypeScript |
| contentbot | ContentBot | ChatGPT or Grok | posts, offers, scripts, launch assets |

## GitHub / Grok worker agents

Path in org repo: `.github/agents/`

| file | use when |
|------|----------|
| grok-buddy-bridge | anything that might create a second bot OS |
| grok-repo-scanner | scan a repo |
| grok-systems-builder | build a system |
| grok-actions-operator | GitHub Actions / CI |
| grok-pr-pilot | pull requests |
| grok-fleet-debugger | fleet is broken |
| grok-md-compiler | compile docs |
| grok-legacy-placer | place old files without erasing |
| grok-research | research |
| grok-safety-gate | before merge / risky change |
| buddy-debugger | Buddy itself is wrong |
| easy-updater | simple updates in plain words |
| trusted-code-reviewer | review code |
| notes-to-code-builder | notes → code |
| manufacturer-marketplace-bot | manufacturers / marketplace |
| china-us-tech-manufacturing-scout | US–China manufacturing scout |

## ChatGPT side

Repo `DreamCo-Technologies/Ai-bots` is a placeholder. Real Custom GPTs live in ChatGPT.
Copy `system/CHATGPT_CUSTOM_GPTS.md` into each GPT.
Same names as the table above. Buddy still routes.

## Handoff contract

Every worker returns:

- **result** — what you produced
- **next_owner** — bot or agent id
- **save** — what to keep (action log, file path, deal fields)

## Routing cheat sheet

- scan / issues / CI / PR / deploy → BuildBot + grok-repo-scanner / grok-actions-operator / grok-pr-pilot
- deal / risk / compare / lead → DealAnalyzer
- post / offer / script / email → ContentBot
- which bot / start workflow → BuddyAI
- safe to merge? → grok-safety-gate
- do not invent a new headquarters → grok-buddy-bridge
