import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { bots } from '../data/bots';

type TabId = 'dashboard' | 'actions' | 'bots' | 'analyzer' | 'orchestrator';

type ActionItem = {
  title: string;
  owner: string;
  stage: string;
  priority: 'High' | 'Medium' | 'Low';
  result: string;
};

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
    title: 'Dedicated bot pages + custom buttons',
    owner: 'Empire HQ',
    stage: 'Stage 1',
    priority: 'High',
    result: 'Each bot has its own page, action buttons, and guided questions.',
  },
  {
    title: 'BuddyAI routing + 30 questions',
    owner: 'BuddyAI',
    stage: 'Stage 1',
    priority: 'High',
    result: 'Users can text Buddy; Buddy routes to the correct specialist bot.',
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
        <h1>Command center for bots, ideas, and actions</h1>
        <p className="heroCopy">
          Fully built bot pages, custom action buttons, 30 guided questions, and
          BuddyAI routing. Text Buddy or jump straight into a specialist.
        </p>
        <div className="heroActions">
          <Link to="/chat" className="primaryBtn">
            Text BuddyAI
          </Link>
          <Link to="/bots/dealanalyzer" className="secondaryBtn">
            Open DealAnalyzer
          </Link>
        </div>
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
            <span className="statLabel">Bots live</span>
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
            <h2>Stage 1 complete — operator ready</h2>
            <p>
              Every bot now has its own page, custom buttons, and guided questions.
              BuddyAI can route natural language to the right specialist. Next:
              connect real Grok/xAI backends and deploy automation.
            </p>
            <div className="heroActions" style={{ marginTop: 16 }}>
              <Link to="/chat" className="primaryBtn">
                Start with Buddy
              </Link>
            </div>
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
                  <p className="cardMeta">
                    {item.stage} | {item.owner}
                  </p>
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
              <h2>Every bot has a full page, buttons, and questions</h2>
            </div>
            <span className="statusPill">Live pages</span>
          </div>
          <div className="botGrid">
            {bots.map((bot) => (
              <article className="botCard" key={bot.id}>
                <div className="botHeader">
                  <h3 style={{ color: bot.color }}>{bot.name}</h3>
                  <span className="statusPill">{bot.status}</span>
                </div>
                <p className="cardMeta">{bot.platform}</p>
                <p>{bot.mission}</p>
                <strong>Next action</strong>
                <p>{bot.nextAction}</p>
                <div className="botCardActions">
                  <Link to={`/bots/${bot.id}`} className="primaryBtn">
                    Open {bot.name}
                  </Link>
                </div>
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
            DealAnalyzer is ready with custom scoring buttons and guided questions.
            Open the full page to score deals, run risk checks, and get clear next moves.
          </p>
          <div className="heroActions" style={{ marginTop: 16 }}>
            <Link to="/bots/dealanalyzer" className="primaryBtn">
              Open DealAnalyzer
            </Link>
          </div>
        </section>
      )}

      {activeTab === 'orchestrator' && (
        <section className="contentPanel">
          <p className="eyebrow">BuddyAI Orchestrator</p>
          <h2>Central routing for files, bots, and decisions</h2>
          <p>
            Text Buddy in plain language. Buddy reads your intent and routes you to
            the right bot — or keeps the conversation for multi-step workflows.
            30 guided questions are available on the chat page.
          </p>
          <div className="heroActions" style={{ marginTop: 16 }}>
            <Link to="/chat" className="primaryBtn">
              Text BuddyAI now
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default EmpireHQ;
