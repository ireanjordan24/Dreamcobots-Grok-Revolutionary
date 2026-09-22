import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bots } from '../data/bots';
import { MEMORY_PLACES } from '../data/memoryPlaces';

type Note = {
  at: string;
  kind: 'learn' | 'teach';
  bot: string;
  text: string;
  place_id: string;
};

const NOTES_KEY = 'dreamco-memory-notes';
const PLACE_KEY = 'dreamco-memory-place';

const MemoryPage: React.FC = () => {
  const [place, setPlace] = useState('browser_only');
  const [bot, setBot] = useState('buddyai');
  const [kind, setKind] = useState<'learn' | 'teach'>('teach');
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setPlace(localStorage.getItem(PLACE_KEY) || 'browser_only');
      const raw = localStorage.getItem(NOTES_KEY);
      if (raw) setNotes(JSON.parse(raw) as Note[]);
    } catch {
      setNotes([]);
    }
  }, []);

  const persist = (next: Note[], nextPlace = place) => {
    setNotes(next);
    setPlace(nextPlace);
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      localStorage.setItem(PLACE_KEY, nextPlace);
    } catch {
      /* quota */
    }
  };

  const saveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    if (/api[_-]?key|secret|token|password/i.test(body)) {
      setError('That looks like a secret key. Not saved.');
      return;
    }
    setError('');
    persist(
      [
        ...notes,
        {
          at: new Date().toISOString(),
          kind,
          bot,
          text: body,
          place_id: place,
        },
      ],
      place,
    );
    setText('');
  };

  const download = () => {
    const blob = new Blob([notes.map((n) => JSON.stringify(n)).join('\n')], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `buddy_memory_${place}.jsonl`;
    a.click();
  };

  const chosen = MEMORY_PLACES.find((p) => p.id === place) || MEMORY_PLACES[3];

  return (
    <main className="dashboard">
      <header className="hero">
        <div className="navRow">
          <Link to="/" className="backLink">
            ← Empire HQ
          </Link>
          <Link to="/chat" className="backLink">
            Text Buddy →
          </Link>
        </div>
        <p className="eyebrow">Buddy memory · 20 places</p>
        <h1>Choose where learning and teaching live</h1>
        <p className="heroCopy">
          Includes this computer, Google Drive, Google Cloud Storage, iCloud Drive,
          Apple iCloud, Dropbox, OneDrive, and more. Cloud picks download a file.
          Buddy does not log into your cloud for you.
        </p>
      </header>

      <section className="contentPanel">
        <p className="eyebrow">Storage place</p>
        <h2>Pick one of 20 places</h2>
        <div className="filterRow" style={{ marginTop: 12 }}>
          {MEMORY_PLACES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={place === p.id ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => persist(notes, p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="cardMeta" style={{ marginTop: 12 }}>
          {chosen.hint}
        </p>
      </section>

      <section className="contentPanel">
        <p className="eyebrow">Add a note</p>
        <h2>Teach or learn</h2>
        <form className="promptForm" onSubmit={saveNote}>
          <div className="filterRow">
            <button
              type="button"
              className={kind === 'teach' ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => setKind('teach')}
            >
              Teaching
            </button>
            <button
              type="button"
              className={kind === 'learn' ? 'questionChip activeChip' : 'questionChip'}
              onClick={() => setKind('learn')}
            >
              Learning
            </button>
          </div>
          <select value={bot} onChange={(e) => setBot(e.target.value)}>
            {bots.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Example: Give short answers. Ask for downside first."
          />
          <button type="submit" className="primaryBtn">
            Save to {chosen.label}
          </button>
        </form>
        {error && <p className="cardMeta">{error}</p>}
        <div className="heroActions" style={{ marginTop: 16 }}>
          <button type="button" className="secondaryBtn" onClick={download}>
            Download memory file for {chosen.label}
          </button>
        </div>
      </section>

      <section className="contentPanel">
        <p className="eyebrow">Saved notes</p>
        <h2>{notes.length} in this browser</h2>
        {notes.length === 0 ? (
          <p className="cardMeta">Nothing saved yet.</p>
        ) : (
          <div className="actionList" style={{ marginTop: 16 }}>
            {[...notes].reverse().map((n, i) => (
              <article className="actionCard" key={`${n.at}-${i}`}>
                <div>
                  <p className="cardMeta">
                    {n.kind} · {n.bot} · {n.place_id}
                  </p>
                  <h3>{n.text}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MemoryPage;
