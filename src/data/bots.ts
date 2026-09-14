export type BotStatus = 'Online' | 'Ready' | 'Planning' | 'Beta';

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
  },
];

// Shared + extra guided questions to reach 30 total unique prompts across the system
export const allGuidedQuestions: string[] = [
  // BuddyAI
  'Which bot should handle my current project?',
  'How do I get started with DreamCoBots?',
  'Can you remember context from previous chats?',
  'What is the best first action for a new idea?',
  'How does Buddy decide which bot to send me to?',
  'Can you create a multi-bot workflow for me?',
  'What information do you need to route me accurately?',
  'How do I connect my chat history and files?',
  // DealAnalyzer
  'How do you score a new business opportunity?',
  'What are the biggest risks I should watch for?',
  'Is this deal worth pursuing right now?',
  'How urgent is this opportunity?',
  'What information do you need to score accurately?',
  'Can you turn a lead into a clear action plan?',
  'How do I compare two different deals?',
  'What does a high-upside low-risk deal look like?',
  // BuildBot
  'Is the project currently buildable?',
  'What TypeScript issues should I fix first?',
  'How do I set up GitHub Actions for this repo?',
  'What is the best way to deploy to GitHub Pages?',
  'Can you review my package.json scripts?',
  'How do I keep builds fast and reliable?',
  'What should be in a Stage 2 automation plan?',
  'How do I generate clean release notes?',
  // ContentBot
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
  let best: Bot = bots[0]; // default BuddyAI
  let bestScore = 0;

  for (const bot of bots) {
    let score = 0;
    for (const kw of bot.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    // slight boost for exact name match
    if (lower.includes(bot.name.toLowerCase()) || lower.includes(bot.id)) {
      score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      best = bot;
    }
  }

  // if almost no signal, keep BuddyAI
  if (bestScore === 0) return bots[0];
  return best;
}
