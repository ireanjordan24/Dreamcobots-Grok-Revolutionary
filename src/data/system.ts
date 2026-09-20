export type Engine = 'grok' | 'chatgpt' | 'github' | 'hq';

export type RegistryEntry = {
  id: string;
  name: string;
  kind: 'face' | 'agent' | 'note';
  engine: Engine;
  useWhen: string;
  path?: string;
};

export const systemRule =
  'One Buddy runtime. Do not fork a second OS. Same names in Grok, GitHub, and ChatGPT.';

export const registry: RegistryEntry[] = [
  {
    id: 'buddyai',
    name: 'BuddyAI',
    kind: 'face',
    engine: 'hq',
    useWhen: 'Route, workflow, memory, which bot',
  },
  {
    id: 'dealanalyzer',
    name: 'DealAnalyzer',
    kind: 'face',
    engine: 'chatgpt',
    useWhen: 'Score deal, risk, compare, next move',
  },
  {
    id: 'buildbot',
    name: 'BuildBot',
    kind: 'face',
    engine: 'github',
    useWhen: 'Build, CI, PR, deploy, TypeScript',
  },
  {
    id: 'contentbot',
    name: 'ContentBot',
    kind: 'face',
    engine: 'chatgpt',
    useWhen: 'Posts, offers, scripts, launch assets',
  },
  {
    id: 'grok-buddy-bridge',
    name: 'Grok Buddy Bridge',
    kind: 'agent',
    engine: 'grok',
    useWhen: 'Stop a second bot OS from being built',
    path: '.github/agents/grok-buddy-bridge.agent.md',
  },
  {
    id: 'grok-repo-scanner',
    name: 'Grok Repo Scanner',
    kind: 'agent',
    engine: 'github',
    useWhen: 'Scan a repository',
    path: '.github/agents/grok-repo-scanner.agent.md',
  },
  {
    id: 'grok-systems-builder',
    name: 'Grok Systems Builder',
    kind: 'agent',
    engine: 'grok',
    useWhen: 'Build a system from existing pieces',
    path: '.github/agents/grok-systems-builder.agent.md',
  },
  {
    id: 'grok-actions-operator',
    name: 'Grok Actions Operator',
    kind: 'agent',
    engine: 'github',
    useWhen: 'GitHub Actions / CI',
    path: '.github/agents/grok-actions-operator.agent.md',
  },
  {
    id: 'grok-pr-pilot',
    name: 'Grok PR Pilot',
    kind: 'agent',
    engine: 'github',
    useWhen: 'Pull requests',
    path: '.github/agents/grok-pr-pilot.agent.md',
  },
  {
    id: 'grok-safety-gate',
    name: 'Grok Safety Gate',
    kind: 'agent',
    engine: 'github',
    useWhen: 'Before merge or risky change',
    path: '.github/agents/grok-safety-gate.agent.md',
  },
  {
    id: 'grok-fleet-debugger',
    name: 'Grok Fleet Debugger',
    kind: 'agent',
    engine: 'grok',
    useWhen: 'Fleet is broken',
    path: '.github/agents/grok-fleet-debugger.agent.md',
  },
  {
    id: 'chatgpt-pack',
    name: 'ChatGPT Custom GPT pack',
    kind: 'note',
    engine: 'chatgpt',
    useWhen: 'Copy instructions into ChatGPT — no plugin files in git',
    path: 'system/CHATGPT_CUSTOM_GPTS.md',
  },
];

export const handoffFields = ['result', 'next_owner', 'save'] as const;
