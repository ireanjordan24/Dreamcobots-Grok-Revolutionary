import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBotById, bots } from '../data/bots';

const BotPage: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();
  const bot = getBotById(botId || '');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

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
