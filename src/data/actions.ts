import { bots } from './bots';

export type Priority = 'High' | 'Medium' | 'Low';
export type StageId = 'stage-0' | 'stage-1' | 'stage-2' | 'stage-3';

export type ActionItem = {
  id: string;
  title: string;
  ownerId: string; // bot id or 'empire'
  ownerLabel: string;
  stage: StageId;
  stageLabel: string;
  priority: Priority;
  result: string;
  status: 'todo' | 'doing' | 'done';
};

/** Canonical staged plan — designed so a focused operator can finish in one day */
export const stages = [
  {
    id: 'stage-0' as StageId,
    label: 'Stage 0 — Foundation',
    hours: '0–2h',
    goal: 'Repo boots, TypeScript + Vite path exists, nothing erased.',
  },
  {
    id: 'stage-1' as StageId,
    label: 'Stage 1 — Operator UI',
    hours: '2–5h',
    goal: 'Bot pages, Buddy routing, 30 questions, custom buttons live.',
  },
  {
    id: 'stage-2' as StageId,
    label: 'Stage 2 — Bot systems',
    hours: '5–8h',
    goal: 'Learning plans, tasks, benchmarks, capabilities, Actions wired to real bot data.',
  },
  {
    id: 'stage-3' as StageId,
    label: 'Stage 3 — Live intelligence',
    hours: '8–12h (next day optional)',
    goal: 'Real Grok calls, persistence, chat history, exportable deals.',
  },
];

function deriveActionsFromBots(): ActionItem[] {
  const items: ActionItem[] = [
    {
      id: 'a-preserve',
      title: 'Preserve all existing folders & cert files',
      ownerId: 'empire',
      ownerLabel: 'Empire HQ',
      stage: 'stage-0',
      stageLabel: 'Stage 0',
      priority: 'High',
      result: 'bots/, chats/, .devcontainer, GROK_CERTIFIED.md remain untouched.',
      status: 'done',
    },
    {
      id: 'a-pages',
      title: 'Ship dedicated bot pages + HashRouter',
      ownerId: 'empire',
      ownerLabel: 'Empire HQ',
      stage: 'stage-1',
      stageLabel: 'Stage 1',
      priority: 'High',
      result: 'Every bot has /bots/:id with buttons and questions.',
      status: 'done',
    },
    {
      id: 'a-buddy',
      title: 'BuddyAI routing + 30 guided questions',
      ownerId: 'buddyai',
      ownerLabel: 'BuddyAI',
      stage: 'stage-1',
      stageLabel: 'Stage 1',
      priority: 'High',
      result: 'Natural language routes to the correct specialist.',
      status: 'done',
    },
    {
      id: 'a-learning',
      title: 'Learning plan section on every bot page',
      ownerId: 'empire',
      ownerLabel: 'Empire HQ',
      stage: 'stage-2',
      stageLabel: 'Stage 2',
      priority: 'High',
      result: 'Planned learning + user can add custom learn items (localStorage).',
      status: 'doing',
    },
    {
      id: 'a-tasks',
      title: 'Task + benchmark panels per bot',
      ownerId: 'empire',
      ownerLabel: 'Empire HQ',
      stage: 'stage-2',
      stageLabel: 'Stage 2',
      priority: 'High',
      result: 'Personal tasks, benchmarks, capabilities, tools needed visible.',
      status: 'doing',
    },
    {
      id: 'a-actions-live',
      title: 'Actions page fed by real bot task data',
      ownerId: 'empire',
      ownerLabel: 'Empire HQ',
      stage: 'stage-2',
      stageLabel: 'Stage 2',
      priority: 'High',
      result: 'Actions tab aggregates bot tasks + staged plan items.',
      status: 'doing',
    },
    {
      id: 'a-pages-deploy',
      title: 'GitHub Pages workflow green',
      ownerId: 'buildbot',
      ownerLabel: 'BuildBot',
      stage: 'stage-2',
      stageLabel: 'Stage 2',
      priority: 'Medium',
      result: 'Deploy from Actions succeeds on main.',
      status: 'doing',
    },
    {
      id: 'a-grok',
      title: 'Connect live Grok / xAI replies',
      ownerId: 'buddyai',
      ownerLabel: 'BuddyAI',
      stage: 'stage-3',
      stageLabel: 'Stage 3',
      priority: 'High',
      result: 'Prompts leave the browser and return real model answers.',
      status: 'todo',
    },
    {
      id: 'a-history',
      title: 'Ingest /chats archives into Buddy context',
      ownerId: 'buddyai',
      ownerLabel: 'BuddyAI',
      stage: 'stage-3',
      stageLabel: 'Stage 3',
      priority: 'Medium',
      result: 'Past Grok exports influence routing and memory.',
      status: 'todo',
    },
    {
      id: 'a-deal-schema',
      title: 'Deal intake + scoring rules',
      ownerId: 'dealanalyzer',
      ownerLabel: 'DealAnalyzer',
      stage: 'stage-3',
      stageLabel: 'Stage 3',
      priority: 'High',
      result: 'Structured fields, weights, exportable summary.',
      status: 'todo',
    },
  ];

  // Pull live tasks from each bot so Actions always reflects bot state
  for (const bot of bots) {
    for (const task of bot.tasks) {
      items.push({
        id: `bot-${bot.id}-${task.id}`,
        title: task.title,
        ownerId: bot.id,
        ownerLabel: bot.name,
        stage: task.status === 'done' ? 'stage-1' : task.priority === 'High' ? 'stage-2' : 'stage-3',
        stageLabel: task.status === 'done' ? 'Stage 1' : task.priority === 'High' ? 'Stage 2' : 'Stage 3',
        priority: task.priority,
        result: `Benchmark: ${task.benchmark}`,
        status: task.status,
      });
    }
  }

  return items;
}

export const actionItems: ActionItem[] = deriveActionsFromBots();

export function actionsForBot(botId: string): ActionItem[] {
  return actionItems.filter((a) => a.ownerId === botId);
}

export function countByStatus(status: ActionItem['status']): number {
  return actionItems.filter((a) => a.status === status).length;
}
