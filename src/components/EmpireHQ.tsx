import React, { useMemo, useState } from 'react';

type TabId = 'dashboard' | 'actions' | 'bots' | 'analyzer' | 'orchestrator';

type Bot = {
  name: string;
  status: 'Online' | 'Ready' | 'Planning';
  platform: string;
  mission: string;
  nextAction: string;
};

type ActionItem = {
  title: string;
  owner: string;
  stage: string;
  priority: 'High' | 'Medium' | 'Low';
  result: string;
};

const bots: Bot[] = [
  {
    name: 'BuddyAI',
    status: 'Online',
    platform: 'Orchestration',
    mission: 'Routes ideas, prompts, memory, and tasks into the right workflow.',
    nextAction: 'Connect saved chat history, knowledge files, and action logging.',
  },
  {
    name: 'DealAnalyzer',
    status: 'Ready',
    platform: 'Business Intelligence',
    mission: 'Scores opportunities, flags risks, and turns leads into next moves.',
    nextAction: 'Add deal intake fields, scoring rules, and exportable summaries.',
  },
  {
    name: 'BuildBot',
    status: 'Planning',
    platform: 'GitHub Actions',
    mission: 'Keeps the app buildable with type checks, previews, and release notes.',
    nextAction: 'Add automated build checks and deployment workflow in Stage 2.',
  },
  {
    name: 'ContentBot',
    status: 'Planning',
    platform: 'Marketing Ops',
    mission: 'Turns top ideas into posts, offers, scripts, and launch assets.',
    nextAction: 'Define brand voice, content calendar, and approval checkpoints.',
  },
];

const actionItems: ActionItem[] = [
  {
    title: 'Certify bot missions',
    owner: 'BuddyAI',
    stage: 'Stage 1',
    priority: 'High',
    result: 'Every bot has a mission, next action, and quality gate before launch.',
  },
  {
    title: 'Make Actions page operational',
    owner: 'Empire HQ',
    stage: 'Stage 1',
    priority: 'High',
    result: 'Actions are visible, filterable by tab, and tied to build stages.',
  },
  {
    title: 'Add build safety rails',
    owner: 'BuildBot',
    stage: 'Stage 1',
    priority: 'Medium',
    result: 'TypeScript configuration exists so npm run build has a real path.',
  },
  {
    title: 'Prepare automation workflows',
    owner: 'BuildBot',
    stage: 'Stage 2',
    priority: 'Medium',
    result: 'GitHub Actions can later run typecheck, build, and deployment checks.',
  },
];

const tabs: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'actions', label: 'Actions' },
  { id: 'bots', label: 'Bots' },
  { id: 'analyzer', label: 'Analyzer' },
  { id: 'orchestrator', label: 'Orchestrator' },
];

const EmpireHQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const highPriorityCount = useMemo(
    () => actionItems.filter((item) => item.priority === 'High').length,
    [],
  );

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="eyebrow">DreamCoBots Empire HQ</p>
        <h1>ChatGPT-ready command center for bots, ideas, and actions</h1>
        <p className="heroCopy">
          Stage 1 turns the repo into a clearer operating system: working actions,
          certified bot missions, and a practical build path for the next stage.
        </p>
      </header>

      <nav className="tabBar" aria-label="Empire HQ sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab activeTab' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'dashboard' && (
        <section className="panelGrid" aria-label="Empire dashboard">
          <article className="statPanel">
            <span className="statValue">{bots.length}</span>
            <span className="statLabel">Bots mapped</span>
          </article>
          <article className="statPanel">
            <span className="statValue">{actionItems.length}</span>
            <span className="statLabel">Actions staged</span>
          </article>
          <article className="statPanel">
            <span className="statValue">{highPriorityCount}</span>
            <span className="statLabel">High priority</span>
          </article>
          <article className="widePanel">
            <h2>Stage 1 Status: Ready for operators</h2>
            <p>
              The first build stage focuses on clarity: what each bot does, what
              action comes next, and what must be tested before shipping.
            </p>
          </article>
        </section>
      )}

      {activeTab === 'actions' && (
        <section className="contentPanel" aria-label="Actions page">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Actions Page</p>
              <h2>Build plan by stage</h2>
            </div>
            <span className="statusPill">Operational</span>
          </div>
          <div className="actionList">
            {actionItems.map((item) => (
              <article className="actionCard" key={item.title}>
                <div>
                  <p className="cardMeta">{item.stage} | {item.owner}</p>
                  <h3>{item.title}</h3>
                  <p>{item.result}</p>
                </div>
                <span className={`priority priority${item.priority}`}>{item.priority}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'bots' && (
        <section className="contentPanel" aria-label="Bot fleet">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Bot Fleet</p>
              <h2>Every bot gets a mission and next action</h2>
            </div>
            <span className="statusPill">Certified checklist</span>
          </div>
          <div className="botGrid">
            {bots.map((bot) => (
              <article className="botCard" key={bot.name}>
                <div className="botHeader">
                  <h3>{bot.name}</h3>
                  <span className="statusPill">{bot.status}</span>
                </div>
                <p className="cardMeta">{bot.platform}</p>
                <p>{bot.mission}</p>
                <strong>Next action</strong>
                <p>{bot.nextAction}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'analyzer' && (
        <section className="contentPanel">
          <p className="eyebrow">Deal Analyzer</p>
          <h2>Best-idea scoring for every opportunity</h2>
          <p>
            Stage 2 should add structured fields for offer, audience, urgency,
            upside, risk, and next step so ideas can be compared instead of guessed.
          </p>
        </section>
      )}

      {activeTab === 'orchestrator' && (
        <section className="contentPanel">
          <p className="eyebrow">BuddyAI Orchestrator</p>
          <h2>Central routing for files, bots, and decisions</h2>
          <p>
            BuddyAI should become the traffic controller: collect context, pick the
            correct bot, record the action, and push completed work into the next stage.
          </p>
        </section>
      )}
    </main>
  );
};

export default EmpireHQ;
