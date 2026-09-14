import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { bots, routeToBot, allGuidedQuestions, type Bot } from '../data/bots';

type Message = {
  id: string;
  role: 'user' | 'buddy';
  text: string;
  routedTo?: Bot;
};

const BuddyChat: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';

  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'buddy',
      text: 'Hey — I\'m BuddyAI. Tell me what you need in plain language and I\'ll route you to the right specialist bot (DealAnalyzer, BuildBot, ContentBot, or stay with me). You can also tap any of the 30 guided questions below.',
    },
  ]);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const target = routeToBot(trimmed);
    const isBuddy = target.id === 'buddyai';

    const buddyText = isBuddy
      ? `Got it. I can handle this directly or keep refining. Here is what I understood: "${trimmed}". Ask a follow-up or pick a specialist if you want a deeper dive.`
      : `I matched this to **${target.name}** (${target.platform}).\n\nMission: ${target.mission}\n\nI recommend opening ${target.name}'s page and using the custom buttons or guided questions. You can also refine your request here and I will re-route.`;

    const buddyMsg: Message = {
      id: `b-${Date.now()}`,
      role: 'buddy',
      text: buddyText,
      routedTo: isBuddy ? undefined : target,
    };

    setMessages((prev) => [...prev, userMsg, buddyMsg]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuestion = (q: string) => {
    sendMessage(q);
  };

  return (
    <main className="dashboard">
      <header className="hero">
        <div className="navRow">
          <Link to="/" className="backLink">
            ← Empire HQ
          </Link>
        </div>
        <p className="eyebrow">BuddyAI Orchestrator</p>
        <h1>Text Buddy — get routed to the right bot</h1>
        <p className="heroCopy">
          Type anything. Buddy analyzes your message and sends you to DealAnalyzer,
          BuildBot, ContentBot, or keeps the conversation here for orchestration.
        </p>
      </header>

      <section className="contentPanel chatPanel">
        <div className="chatLog" aria-live="polite">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === 'user' ? 'chatBubble userBubble' : 'chatBubble buddyBubble'}
            >
              <p className="cardMeta">{m.role === 'user' ? 'You' : 'BuddyAI'}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{m.text.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
              {m.routedTo && (
                <Link
                  to={`/bots/${m.routedTo.id}`}
                  className="primaryBtn"
                  style={{ marginTop: 12, display: 'inline-flex' }}
                >
                  Open {m.routedTo.name} →
                </Link>
              )}
            </div>
          ))}
        </div>

        <form className="promptForm chatForm" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell Buddy what you need... (e.g. score this deal, write a launch post, fix the build)"
            rows={3}
          />
          <button type="submit" className="primaryBtn">
            Send to Buddy
          </button>
        </form>
      </section>

      <section className="contentPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">30 Custom Guided Questions</p>
            <h2>Tap any question — Buddy routes it for you</h2>
          </div>
        </div>
        <div className="questionGrid dense">
          {allGuidedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              className="questionChip"
              onClick={() => handleQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      <section className="contentPanel">
        <p className="eyebrow">Quick bot links</p>
        <div className="botNavGrid">
          {bots.map((b) => (
            <Link key={b.id} to={`/bots/${b.id}`} className="botNavCard">
              <strong style={{ color: b.color }}>{b.name}</strong>
              <span className="cardMeta">{b.status} · {b.platform}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BuddyChat;
