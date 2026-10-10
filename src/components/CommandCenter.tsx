import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PAGES = 'https://dreamco-technologies.github.io/Dreamcobots';

const CommandCenter: React.FC = () => {
  const [status, setStatus] = useState<string>('Loading Pages backend...');
  const [bots, setBots] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${PAGES}/backend-status.json`)
      .then((r) => r.json())
      .then((data) => {
        setBots(data.backends?.commandCenter?.bots ?? null);
        setStatus(data.replit ? 'Replit still required' : 'Connected. Replit is off.');
      })
      .catch(() => setStatus('Pages backend not reachable yet. Link is still wired.'));
  }, []);

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="eyebrow">Empire HQ · Command Center</p>
        <h1>Connected to GitHub Pages</h1>
        <p className="heroCopy">{status}{bots ? ` ${bots} bots on the Pages catalog.` : ''}</p>
        <div className="heroActions">
          <a className="primaryBtn" href={`${PAGES}/command-center.html`} target="_blank" rel="noreferrer">
            Open live Command Center
          </a>
          <a className="secondaryBtn" href={`${PAGES}/backend-status.json`} target="_blank" rel="noreferrer">
            Backend status JSON
          </a>
          <Link to="/" className="secondaryBtn">Back to HQ</Link>
        </div>
      </header>
    </main>
  );
};

export default CommandCenter;
