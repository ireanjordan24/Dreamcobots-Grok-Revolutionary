export type BotStatus = 'Online' | 'Ready' | 'Planning' | 'Beta';

export type BotTask = {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  benchmark: string;
  priority: 'High' | 'Medium' | 'Low';
};

export type Bot = {
  id: string;
  name: string;
  status: BotStatus;
  platform: string;
  mission: string;
  description: string;
  nextAction: string;
  color: string;
  customButtons: { label: string; action: string; prompt: string }[];
  questions: string[];
  keywords: string[];
  /** What the bot already does well */
  capabilities: string[];
  /** Tools / integrations this bot needs to reach full power */
  toolsNeeded: string[];
  /** Personal performance benchmarks */
  benchmarks: { label: string; target: string; current: string }[];
  /** Planned learning curriculum */
  learningPlan: string[];
  /** Active / staged tasks owned by this bot */
  tasks: BotTask[];
};

export const bots: Bot[] = [
  {
    id: 'buddyai',
    name: 'BuddyAI',
    status: 'Online',
    platform: 'Orchestration Hub',
    mission: 'Routes ideas, prompts, memory, and tasks into the right workflow.',
    description:
      'BuddyAI is the central brain of DreamCoBots. Tell Buddy what you need in plain language and it will route you to the right specialist bot, log the request, and keep context across conversations.',
    nextAction: 'Connect saved chat history, knowledge files, and action logging.',
    color: '#69e8bf',
    customButtons: [
      { label: 'Route my idea', action: 'route', prompt: 'I have an idea — help me pick the right bot and next steps.' },
      { label: 'What can each bot do?', action: 'overview', prompt: 'Give me a quick overview of every bot and when to use them.' },
      { label: 'Start a workflow', action: 'workflow', prompt: 'Help me start a full workflow from idea to launch.' },
      { label: 'Log an action', action: 'log', prompt: 'Log this action and assign the best bot to own it.' },
    ],
    questions: [
      'Which bot should handle my current project?',
      'How do I get started with DreamCoBots?',
      'Can you remember context from previous chats?',
      'What is the best first action for a new idea?',
      'How does Buddy decide which bot to send me to?',
      'Can you create a multi-bot workflow for me?',
      'What information do you need to route me accurately?',
      'How do I connect my chat history and files?',
    ],
    keywords: ['route', 'help', 'which bot', 'orchestrat', 'workflow', 'start', 'buddy', 'general', 'idea', 'what should'],
    capabilities: [
      'Natural-language intent detection',
      'Bot routing by keyword + name match',
      'Workflow staging across specialists',
      'Guided-question orchestration',
      'Hand-off of prompts between pages',
    ],
    toolsNeeded: [
      'Grok / xAI API key for live replies',
      'Persistent chat history store',
      'Knowledge-file indexer',
      'Action logging backend',
      'Optional vector memory',
    ],
    benchmarks: [
      { label: 'Routing accuracy', target: '≥ 90%', current: 'Keyword baseline' },
      { label: 'Time-to-correct-bot', target: '< 3s', current: 'Instant (frontend)' },
      { label: 'Context retention', target: 'Session + history', current: 'Session only' },
    ],
    learningPlan: [
      'Improve multi-intent detection (split one message into several bots)',
      'Learn user preference history (who they prefer for certain tasks)',
      'Ingest exported Grok chat archives from /chats',
      'Map action outcomes back into better routing scores',
      'Support voice-style short commands',
    ],
    tasks: [
      { id: 'b1', title: 'Wire real Grok reply endpoint', status: 'todo', benchmark: 'First live reply < 5s', priority: 'High' },
      { id: 'b2', title: 'Load /chats exports into context', status: 'todo', benchmark: 'Parse at least 1 archive format', priority: 'High' },
      { id: 'b3', title: 'Persist routing decisions', status: 'doing', benchmark: 'Log last 50 routes locally', priority: 'Medium' },
      { id: 'b4', title: 'Add confidence score UI', status: 'todo', benchmark: 'Show match strength to user', priority: 'Low' },
    ],
  },
  {
    id: 'dealanalyzer',
    name: 'DealAnalyzer',
    status: 'Ready',
    platform: 'Business Intelligence',
    mission: 'Scores opportunities, flags risks, and turns leads into next moves.',
    description:
      'DealAnalyzer evaluates business opportunities, partnerships, products, and leads. It scores upside, risk, urgency, fit, and recommends clear next actions so you stop guessing and start deciding.',
    nextAction: 'Add deal intake fields, scoring rules, and exportable summaries.',
    color: '#ffbf69',
    customButtons: [
      { label: 'Score a deal', action: 'score', prompt: 'Help me score this opportunity with upside, risk, and next steps.' },
      { label: 'Risk check', action: 'risk', prompt: 'Run a risk analysis on this deal or idea.' },
      { label: 'Compare options', action: 'compare', prompt: 'Compare these two or more opportunities side by side.' },
      { label: 'Next move', action: 'next', prompt: 'What is the single best next action for this opportunity?' },
    ],
    questions: [
      'How do you score a new business opportunity?',
      'What are the biggest risks I should watch for?',
      'Is this deal worth pursuing right now?',
      'How urgent is this opportunity?',
      'What information do you need to score accurately?',
      'Can you turn a lead into a clear action plan?',
      'How do I compare two different deals?',
      'What does a high-upside low-risk deal look like?',
    ],
    keywords: ['deal', 'score', 'opportunity', 'risk', 'lead', 'business', 'analyze', 'compare', 'upside', 'partner'],
    capabilities: [
      'Structured opportunity scoring',
      'Risk flag generation',
      'Side-by-side comparison framing',
      'Next-action recommendation',
      'Lead → action plan conversion',
    ],
    toolsNeeded: [
      'Deal intake form + schema',
      'Scoring rule engine (weights)',
      'Export to PDF / CSV',
      'CRM or spreadsheet connector',
      'Historical deal outcome feedback',
    ],
    benchmarks: [
      { label: 'Score consistency', target: 'Same inputs → same score', current: 'Prompt-based' },
      { label: 'Risk coverage', target: '≥ 5 risk dimensions', current: 'Prompt-guided' },
      { label: 'Time to next-action', target: '< 2 min', current: 'Manual' },
    ],
    learningPlan: [
      'Learn your preferred scoring weights (upside vs risk)',
      'Ingest past wins/losses to calibrate',
      'Recognize industry-specific risk patterns',
      'Auto-suggest missing data fields before scoring',
      'Track which recommendations were actually followed',
    ],
    tasks: [
      { id: 'd1', title: 'Design deal intake fields', status: 'doing', benchmark: '8–12 clear fields', priority: 'High' },
      { id: 'd2', title: 'Define default scoring weights', status: 'todo', benchmark: 'Documented rule set', priority: 'High' },
      { id: 'd3', title: 'Add compare-two-deals UI', status: 'todo', benchmark: 'Side-by-side view', priority: 'Medium' },
      { id: 'd4', title: 'Exportable summary card', status: 'todo', benchmark: 'Copy + download', priority: 'Medium' },
    ],
  },
  {
    id: 'buildbot',
    name: 'BuildBot',
    status: 'Planning',
    platform: 'GitHub & Engineering',
    mission: 'Keeps the app buildable with type checks, previews, and release notes.',
    description:
      'BuildBot owns code quality, TypeScript safety, Vite builds, GitHub Actions, and deployment readiness. Use it when you want clean builds, automated checks, and a reliable path to production.',
    nextAction: 'Add automated build checks and deployment workflow in Stage 2.',
    color: '#9cc9ff',
    customButtons: [
      { label: 'Check build health', action: 'health', prompt: 'Review the current project for build and type safety issues.' },
      { label: 'Suggest CI workflow', action: 'ci', prompt: 'Draft a GitHub Actions workflow for typecheck, build, and deploy.' },
      { label: 'Release notes', action: 'release', prompt: 'Help me write clear release notes for the latest changes.' },
      { label: 'Deploy checklist', action: 'deploy', prompt: 'Give me a pre-deploy checklist for GitHub Pages or production.' },
    ],
    questions: [
      'Is the project currently buildable?',
      'What TypeScript issues should I fix first?',
      'How do I set up GitHub Actions for this repo?',
      'What is the best way to deploy to GitHub Pages?',
      'Can you review my package.json scripts?',
      'How do I keep builds fast and reliable?',
      'What should be in a Stage 2 automation plan?',
      'How do I generate clean release notes?',
    ],
    keywords: ['build', 'deploy', 'github', 'typescript', 'ci', 'action', 'release', 'code', 'vite', 'typecheck'],
    capabilities: [
      'TypeScript + Vite build path ownership',
      'GitHub Actions workflow authoring',
      'Deploy-to-Pages readiness',
      'Release note drafting',
      'Pre-deploy checklists',
    ],
    toolsNeeded: [
      'npm / Node 20 CI runners',
      'GitHub Actions secrets (if any)',
      'Optional preview environment',
      'Source maps for debugging',
      'Dependabot or Renovate (later)',
    ],
    benchmarks: [
      { label: 'Clean typecheck', target: '0 errors', current: 'Strict mode on' },
      { label: 'Build time', target: '< 60s CI', current: 'Local Vite' },
      { label: 'Deploy success rate', target: '100% on main', current: 'Workflow added' },
    ],
    learningPlan: [
      'Learn repo-specific lint / style rules',
      'Track flaky CI steps and auto-suggest fixes',
      'Map common TypeScript errors in this codebase',
      'Improve release-note templates from real commits',
      'Detect missing env / secret requirements early',
    ],
    tasks: [
      { id: 'bb1', title: 'Verify Pages workflow green', status: 'doing', benchmark: 'Successful deploy job', priority: 'High' },
      { id: 'bb2', title: 'Add typecheck-only CI job', status: 'todo', benchmark: 'Fails on TS error', priority: 'High' },
      { id: 'bb3', title: 'Document local build steps', status: 'done', benchmark: 'README section', priority: 'Medium' },
      { id: 'bb4', title: 'Stage 2 automation plan', status: 'todo', benchmark: 'Written checklist', priority: 'Medium' },
    ],
  },
  {
    id: 'contentbot',
    name: 'ContentBot',
    status: 'Planning',
    platform: 'Marketing Ops',
    mission: 'Turns top ideas into posts, offers, scripts, and launch assets.',
    description:
      'ContentBot transforms strategy into ready-to-ship content: social posts, landing copy, scripts, email sequences, and launch assets while staying on-brand and conversion-focused.',
    nextAction: 'Define brand voice, content calendar, and approval checkpoints.',
    color: '#ff8a80',
    customButtons: [
      { label: 'Write a post', action: 'post', prompt: 'Write a high-engagement social post for this idea or offer.' },
      { label: 'Create an offer', action: 'offer', prompt: 'Turn this idea into a clear, compelling offer.' },
      { label: 'Script it', action: 'script', prompt: 'Write a short video or voiceover script for this topic.' },
      { label: 'Launch assets', action: 'launch', prompt: 'Generate a full set of launch assets for this project.' },
    ],
    questions: [
      'What is the brand voice for DreamCoBots content?',
      'Can you turn this idea into a social post?',
      'How do I create a content calendar?',
      'What makes a strong offer page?',
      'Can you write a short launch script?',
      'How should I structure an email sequence?',
      'What content should I create first for a new product?',
      'How do I keep content consistent across channels?',
    ],
    keywords: ['content', 'post', 'write', 'script', 'offer', 'marketing', 'social', 'launch', 'copy', 'email'],
    capabilities: [
      'Social post generation',
      'Offer / landing framing',
      'Short video & voiceover scripts',
      'Launch asset packs',
      'Brand-voice consistency prompts',
    ],
    toolsNeeded: [
      'Brand voice guide document',
      'Content calendar (sheet or Notion)',
      'Approval checkpoint checklist',
      'Asset export formats',
      'Optional Canva / design handoff notes',
    ],
    benchmarks: [
      { label: 'On-brand rate', target: '≥ 95%', current: 'Prompt-guided' },
      { label: 'Time to first draft', target: '< 3 min', current: 'Manual' },
      { label: 'Reuse of winning formats', target: 'Template library', current: 'None yet' },
    ],
    learningPlan: [
      'Lock DreamCoBots brand voice and tone',
      'Learn which post formats get best response',
      'Build a reusable offer template library',
      'Ingest past winning posts / scripts',
      'Support multi-channel variants from one idea',
    ],
    tasks: [
      { id: 'c1', title: 'Write brand voice one-pager', status: 'todo', benchmark: '1-page guide', priority: 'High' },
      { id: 'c2', title: 'Create first content calendar', status: 'todo', benchmark: '2-week plan', priority: 'High' },
      { id: 'c3', title: 'Define approval checkpoints', status: 'todo', benchmark: 'Checklist of 5', priority: 'Medium' },
      { id: 'c4', title: 'Ship 3 launch asset templates', status: 'todo', benchmark: 'Post + email + script', priority: 'Medium' },
    ],
  },
];

/** 30 guided questions used by Buddy + bot pages */
export const allGuidedQuestions: string[] = [
  'Which bot should handle my current project?',
  'How do I get started with DreamCoBots?',
  'Can you remember context from previous chats?',
  'What is the best first action for a new idea?',
  'How does Buddy decide which bot to send me to?',
  'Can you create a multi-bot workflow for me?',
  'What information do you need to route me accurately?',
  'How do I connect my chat history and files?',
  'How do you score a new business opportunity?',
  'What are the biggest risks I should watch for?',
  'Is this deal worth pursuing right now?',
  'How urgent is this opportunity?',
  'What information do you need to score accurately?',
  'Can you turn a lead into a clear action plan?',
  'How do I compare two different deals?',
  'What does a high-upside low-risk deal look like?',
  'Is the project currently buildable?',
  'What TypeScript issues should I fix first?',
  'How do I set up GitHub Actions for this repo?',
  'What is the best way to deploy to GitHub Pages?',
  'Can you review my package.json scripts?',
  'How do I keep builds fast and reliable?',
  'What should be in a Stage 2 automation plan?',
  'How do I generate clean release notes?',
  'What is the brand voice for DreamCoBots content?',
  'Can you turn this idea into a social post?',
  'How do I create a content calendar?',
  'What makes a strong offer page?',
  'Can you write a short launch script?',
  'How should I structure an email sequence?',
];

export function getBotById(id: string): Bot | undefined {
  return bots.find((b) => b.id === id);
}

export function routeToBot(userMessage: string): Bot {
  const lower = userMessage.toLowerCase();
  let best: Bot = bots[0];
  let bestScore = 0;

  for (const bot of bots) {
    let score = 0;
    for (const kw of bot.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (lower.includes(bot.name.toLowerCase()) || lower.includes(bot.id)) {
      score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      best = bot;
    }
  }

  if (bestScore === 0) return bots[0];
  return best;
}
