# Intelligent Issue Cleaner

Hourly job that cleans up to **500 open issues** per run.

Built for **DreamCo-Technologies/Dreamcobots** (~7,000+ open issues, mostly auto CI failure tickets).

## Install into the org repo

Copy these paths into `DreamCo-Technologies/Dreamcobots`:

```
tools/issue_cleaner/clean_issues.py
tools/issue_cleaner/README.md
.github/workflows/intelligent-issue-cleaner.yml
```

Then enable Actions on that repo. The workflow needs `issues: write` (default `GITHUB_TOKEN` is enough if Actions permissions allow it).

### Quick copy via GitHub UI
1. Open each file in this repo
2. Raw → copy
3. In Dreamcobots: Add file → same path → commit to `main`

Or from a machine with write access:

```bash
git clone https://github.com/DreamCo-Technologies/Dreamcobots.git
cd Dreamcobots
# copy files from ireanjordan24/Dreamcobots-Grok-Revolutionary
git add tools/issue_cleaner .github/workflows/intelligent-issue-cleaner.yml
git commit -m "Add Intelligent Issue Cleaner (500/hour)"
git push
```

## What it does

| Rule | Action |
|------|--------|
| `Actions run <id> failed: <workflow>` | Keep newest **2** per workflow; close older as superseded |
| `DreamCo failure root cause [key]: ...` | Keep **1** per key; close older as duplicate |
| Human issues | Never auto-close |
| Survivors | Label `ci-failure` / `ci:workflow` |

## Schedule

- Cron: every hour at :17
- Manual: Actions → Intelligent Issue Cleaner → Run workflow
  - `dry_run=true` for a safe test

## Throughput

500 issues/hour → multi-thousand CI backlog can drain in about a day if new spam slows.

## Local dry run

```bash
export GITHUB_REPOSITORY=DreamCo-Technologies/Dreamcobots
export GH_TOKEN=ghp_xxx   # needs repo issues:write
export DRY_RUN=1
export BATCH_SIZE=100
python3 tools/issue_cleaner/clean_issues.py
```
