import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { bots } from '../data/bots';
import { actionItems, stages, countByStatus } from '../data/actions';
import { registry, systemRule, handoffFields } from '../data/system';

type TabId = 'dashboard' | 'actions' | 'bots' | 'stages' | 'orchestrator' | 'system';

const tabs: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'actions', label: 'Actions' },
  { id: 'bots', label: 'Bots' },
  { id: 'stages', label: 'Stages' },
  { id: 'orchestrator', label: 'Orchestrator' },
  { id: 'system', label: 'System' },
];

const EmpireHQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [filterOwner, setFilterOwner] = useState<string>('all');

  const highPriorityCount = useMemo(
    () => actionItems.filter((item) => item.priority === 'High' && item.status !== 'done').length,
    [],
  );

  const doneCount = countByStatus('done');
  const doingCount = countByStatus('doing');
  const todoCount = countByStatus('todo');

  const filteredActions = useMemo(() => {
    if (filterOwner === 'all') return actionItems;
    return actionItems.filter((a) => a.ownerId === filterOwner);
  }, [filterOwner]);

  const faces = registry.filter((r) => r.kind === 'face');
  const agents = registry.filter((r) => r.kind === 'agent');
  const notes = registry.filter((r) => r.kind === 'note');

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="eyebrow">DreamCoBots Empire HQ</p>
        <h1>Command center for bots, ideas, and actions</h1>
        <p className="heroCopy">
          Organized 1-day build stages. Every bot has learning plans, tasks,
          benchmarks, capabilities, and tools needed. Grok, GitHub agents, and
          ChatGPT now share one plugin registry. Nothing from the original repo was erased.
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
            <span className="statValue">{registry.length}</span>
            <span className="statLabel">System plugins</span>
          </article>
          <article className="statPanel">
            <span className="statValue">{highPriorityCount}</span>
            <span className="statLabel">Open high priority</span>
          </article>
          <article className="widePanel">
            <h2>Shared system is on the board</h2>
            <p>
              Done: {doneCount} · Doing: {doingCount} · Todo: {todoCount}. {systemRule}
              Open the System tab for the full Grok + GitHub + ChatGPT map.
            </p>
            <div className="heroActions" style={{ marginTop: 16 }}>
              <Link to="/chat" className="primaryBtn">
                Start with Buddy
              </Link>
              <button type="button" className="secondaryBtn" onClick={() => setActiveTab('system')}>
                Open system map
              </button>
            </div>
          </article>
        </section>
      )}

      {activeTab === 'actions' && (
        <section className="contentPanel" aria-label="Actions page">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Actions Page — live bot data</p>
              <h2>Empire plan + every bot task</h2>
            </div>
            <span className="statusPill">Connected</span>
          </div>

          <div className="filterRow">
            <button
              type="button"
              className={filterOwner === 'all' ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => setFilterOwner('all')}
            >
              All
            </button>
            {bots.map((b) => (
              <button
                key={b.id}
                type="button"
                className={filterOwner === b.id ? 'questionChip activeChip' : 'questionChip'}
                onClick={() => setFilterOwner(b.id)}
              >
                {b.name}
              </button>
            ))}
            <button
              type="button"
              className={filterOwner === 'empire' ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => setFilterOwner('empire')}
            >
              Empire HQ
            </button>
          </div>

          <div className="actionList">
            {filteredActions.map((item) => (
              <article className="actionCard" key={item.id}>
                <div>
                  <p className="cardMeta">
                    {item.stageLabel} · {item.ownerLabel} · {item.status.toUpperCase()}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.result}</p>
                  {item.ownerId !== 'empire' && (
                    <Link to={`/bots/${item.ownerId}`} className="backLink" style={{ marginTop: 8, display: 'inline-block' }}>
                      Open {item.ownerLabel} page →
                    </Link>
                  )}
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
              <h2>Learning · tasks · benchmarks · tools</h2>
            </div>
            <span className="statusPill">Full system</span>
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
                <strong>Tasks</strong>
                <p>
                  {bot.tasks.filter((t) => t.status !== 'done').length} open ·{' '}
                  {bot.benchmarks.length} benchmarks · {bot.learningPlan.length} learning items
                </p>
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

      {activeTab === 'stages' && (
        <section className="contentPanel">
          <p className="eyebrow">1-day build system</p>
          <h2>Realistic stages to ship in a day</h2>
          <div className="actionList" style={{ marginTop: 16 }}>
            {stages.map((s) => (
              <article className="actionCard" key={s.id}>
                <div>
                  <p className="cardMeta">{s.hours}</p>
                  <h3>{s.label}</h3>
                  <p>{s.goal}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="cardMeta" style={{ marginTop: 16 }}>
            Full write-up lives in <code>src/data/stages.md</code> and the repo README.
          </p>
        </section>
      )}

      {activeTab === 'orchestrator' && (
        <section className="contentPanel">
          <p className="eyebrow">BuddyAI Orchestrator</p>
          <h2>Central routing for files, bots, and decisions</h2>
          <p>
            Text Buddy in plain language. Buddy reads your intent and routes you to
            the right bot — or keeps the conversation for multi-step workflows.
            Grok and ChatGPT must use the same names.
          </p>
          <div className="heroActions" style={{ marginTop: 16 }}>
            <Link to="/chat" className="primaryBtn">
              Text BuddyAI now
            </Link>
          </div>
        </section>
      )}

      {activeTab === 'system' && (
        <section className="contentPanel" aria-label="Shared plugin system">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Grok · GitHub · ChatGPT</p>
              <h2>One plugin system</h2>
            </div>
            <span className="statusPill">Registry live</span>
          </div>
          <p>{systemRule}</p>
          <p className="cardMeta" style={{ marginTop: 8 }}>
            Handoff line every worker uses: {handoffFields.join(' / ')}
          </p>

          <h3 style={{ marginTop: 24 }}>Operator faces</h3>
          <div className="botGrid">
            {faces.map((item) => (
              <article className="botCard" key={item.id}>
                <div className="botHeader">
                  <h3>{item.name}</h3>
                  <span className="statusPill">{item.engine}</span>
                </div>
                <p>{item.useWhen}</p>
                {bots.some((b) => b.id === item.id) && (
                  <Link to={`/bots/${item.id}`} className="backLink">
                    Open page →
                  </Link>
                )}
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>Grok / GitHub agents</h3>
          <div className="actionList">
            {agents.map((item) => (
              <article className="actionCard" key={item.id}>
                <div>
                  <p className="cardMeta">{item.engine} · {item.path}</p>
                  <h3>{item.name}</h3>
                  <p>{item.useWhen}</p>
                </div>
              </article>
            ))}
          </div>

          <h3 style={{ marginTop: 24 }}>ChatGPT</h3>
          <div className="actionList">
            {notes.map((item) => (
              <article className="actionCard" key={item.id}>
                <div>
                  <p className="cardMeta">{item.engine}</p>
                  <h3>{item.name}</h3>
                  <p>{item.useWhen}</p>
                  <p className="cardMeta">Copy from system/CHATGPT_CUSTOM_GPTS.md into ChatGPT. Ai-bots repo is empty on purpose.</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default EmpireHQ;
