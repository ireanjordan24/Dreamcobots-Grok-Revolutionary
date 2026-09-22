import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBotById, bots } from '../data/bots';
import { actionsForBot } from '../data/actions';

const LEARN_KEY = (id: string) => `dreamco-learn-${id}`;
const PLACE_KEY = 'dreamco-memory-place';

const PLACES = [
  { id: 'browser_only', label: 'This browser only' },
  { id: 'this_computer', label: 'This computer (export to buddy/memory/vault)' },
  { id: 'chats_folder', label: 'Chats folder' },
  { id: 'project_notes', label: 'Project notes' },
  { id: 'github_export', label: 'GitHub export file (you send it up)' },
];

const BotPage: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();
  const bot = getBotById(botId || '');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [extraLearning, setExtraLearning] = useState<string[]>([]);
  const [newLearn, setNewLearn] = useState('');
  const [place, setPlace] = useState('browser_only');

  useEffect(() => {
    if (!bot) return;
    try {
      const raw = localStorage.getItem(LEARN_KEY(bot.id));
      if (raw) setExtraLearning(JSON.parse(raw) as string[]);
      else setExtraLearning([]);
      setPlace(localStorage.getItem(PLACE_KEY) || 'browser_only');
    } catch {
      setExtraLearning([]);
    }
  }, [bot?.id]);

  if (!bot) {
    return (
      <main className="dashboard">
        <div className="contentPanel">
          <h2>Bot not found</h2>
          <p>That bot does not exist in the fleet.</p>
          <Link to="/" className="primaryBtn">
            Back to Empire HQ
          </Link>
        </div>
      </main>
    );
  }

  const botActions = actionsForBot(bot.id);

  const persistLearning = (items: string[]) => {
    setExtraLearning(items);
    try {
      localStorage.setItem(LEARN_KEY(bot.id), JSON.stringify(items));
      localStorage.setItem(PLACE_KEY, place);
    } catch {
      /* ignore quota */
    }
  };

  const addLearning = (e: React.FormEvent) => {
    e.preventDefault();
    const t = newLearn.trim();
    if (!t) return;
    if (/api[_-]?key|secret|token|password/i.test(t)) {
      setNewLearn('');
      return;
    }
    if (extraLearning.includes(t) || bot.learningPlan.includes(t)) {
      setNewLearn('');
      return;
    }
    persistLearning([...extraLearning, t]);
    setNewLearn('');
  };

  const removeLearning = (item: string) => {
    persistLearning(extraLearning.filter((x) => x !== item));
  };

  const exportMemory = () => {
    const payload = extraLearning.map((text) =>
      JSON.stringify({
        bot: bot.id,
        kind: 'learn',
        text,
        place_id: place,
        at: new Date().toISOString(),
      }),
    );
    const blob = new Blob([payload.join('\n')], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${bot.id}-memory.jsonl`;
    a.click();
  };

  const handleButton = (prompt: string) => {
    setActivePrompt(prompt);
    setSelectedQuestion(null);
  };

  const handleQuestion = (q: string) => {
    setSelectedQuestion(q);
    setActivePrompt(q);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      setActivePrompt(customPrompt.trim());
      setSelectedQuestion(null);
    }
  };

  return (
    <main className="dashboard">
      <header className="hero" style={{ borderColor: bot.color }}>
        <div className="navRow">
          <Link to="/" className="backLink">
            ← Empire HQ
          </Link>
          <Link to="/chat" className="backLink">
            Text Buddy →
          </Link>
        </div>
        <p className="eyebrow" style={{ color: bot.color }}>
          {bot.platform}
        </p>
        <h1>{bot.name}</h1>
        <p className="heroCopy">{bot.description}</p>
        <div className="botMetaRow">
          <span className="statusPill">{bot.status}</span>
          <span className="cardMeta">Next: {bot.nextAction}</span>
        </div>
      </header>

      <section className="contentPanel twoCol">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2>What {bot.name} already does</h2>
          <ul className="bulletList">
            {bot.capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Tools needed</p>
          <h2>To reach full power</h2>
          <ul className="bulletList">
            {bot.toolsNeeded.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contentPanel">
        <p className="eyebrow">Personal benchmarks</p>
        <h2>How we measure {bot.name}</h2>
        <div className="benchGrid">
          {bot.benchmarks.map((b) => (
            <article className="benchCard" key={b.label}>
              <strong>{b.label}</strong>
              <p className="cardMeta">Target: {b.target}</p>
              <p>Current: {b.current}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contentPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Task section</p>
            <h2>{bot.name} task bench</h2>
          </div>
          <span className="statusPill">{bot.tasks.length} tasks</span>
        </div>
        <div className="actionList">
          {bot.tasks.map((task) => (
            <article className="actionCard" key={task.id}>
              <div>
                <p className="cardMeta">
                  {task.status.toUpperCase()} · Benchmark: {task.benchmark}
                </p>
                <h3>{task.title}</h3>
              </div>
              <span className={`priority priority${task.priority}`}>{task.priority}</span>
            </article>
          ))}
        </div>
        {botActions.length > 0 && (
          <p className="cardMeta" style={{ marginTop: 12 }}>
            Also linked on the Actions page ({botActions.length} empire actions owned by this bot).
          </p>
        )}
      </section>

      <section className="contentPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Learning prompt section</p>
            <h2>What {bot.name} plans to learn</h2>
          </div>
        </div>
        <ul className="bulletList">
          {bot.learningPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 style={{ marginTop: 20 }}>Where to store new lessons</h3>
        <p className="cardMeta">
          Pick a place. Browser notes stay on this device. Other places use an export file you can drop into that folder or send up.
        </p>
        <select
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
            try {
              localStorage.setItem(PLACE_KEY, e.target.value);
            } catch {
              /* ignore */
            }
          }}
        >
          {PLACES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        <h3 style={{ marginTop: 20 }}>Add something you want {bot.name} to learn</h3>
        <form className="promptForm inlineForm" onSubmit={addLearning}>
          <input
            type="text"
            value={newLearn}
            onChange={(e) => setNewLearn(e.target.value)}
            placeholder={`e.g. Learn my preferred ${bot.name === 'DealAnalyzer' ? 'risk weights' : 'style'}…`}
          />
          <button type="submit" className="primaryBtn">
            Add to learning plan
          </button>
        </form>
        <button type="button" className="secondaryBtn" onClick={exportMemory}>
          Download memory for the chosen place
        </button>
        {extraLearning.length > 0 && (
          <ul className="bulletList userLearnList">
            {extraLearning.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <button type="button" className="tinyBtn" onClick={() => removeLearning(item)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="contentPanel" aria-label="Custom actions">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Custom Buttons</p>
            <h2>One-click actions for {bot.name}</h2>
          </div>
        </div>
        <div className="buttonGrid">
          {bot.customButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              className="actionBtn"
              style={{ borderColor: bot.color }}
              onClick={() => handleButton(btn.prompt)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      <section className="contentPanel" aria-label="Guided questions">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Guided Questions</p>
            <h2>Click a question to focus the bot</h2>
          </div>
        </div>
        <div className="questionGrid">
          {bot.questions.map((q) => (
            <button
              key={q}
              type="button"
              className={selectedQuestion === q ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => handleQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      <section className="contentPanel" aria-label="Talk to bot">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Talk to {bot.name}</p>
            <h2>Or type your own request</h2>
          </div>
        </div>
        <form className="promptForm" onSubmit={handleCustomSubmit}>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder={`Ask ${bot.name} anything...`}
            rows={3}
          />
          <button type="submit" className="primaryBtn">
            Send to {bot.name}
          </button>
        </form>

        {activePrompt && (
          <div className="responseBox" style={{ borderColor: bot.color }}>
            <p className="cardMeta">Active prompt for {bot.name}</p>
            <p className="promptText">"{activePrompt}"</p>
            <p>
              In a live integration this prompt would be sent to the bot engine
              (Grok / xAI / your backend). For now it is staged here so you can
              copy it, refine it, or hand it off to BuddyAI for routing and logging.
            </p>
            <div className="responseActions">
              <Link to={`/chat?prompt=${encodeURIComponent(activePrompt)}`} className="primaryBtn">
                Hand off to Buddy
              </Link>
              <button
                type="button"
                className="secondaryBtn"
                onClick={() => navigator.clipboard?.writeText(activePrompt)}
              >
                Copy prompt
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="contentPanel">
        <p className="eyebrow">Other bots</p>
        <div className="botNavGrid">
          {bots
            .filter((b) => b.id !== bot.id)
            .map((b) => (
              <Link key={b.id} to={`/bots/${b.id}`} className="botNavCard">
                <strong style={{ color: b.color }}>{b.name}</strong>
                <span className="cardMeta">{b.platform}</span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

export default BotPage;
