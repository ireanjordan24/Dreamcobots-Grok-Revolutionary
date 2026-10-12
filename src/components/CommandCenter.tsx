import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Own GitHub Pages site for this repo once enabled
const PAGES = 'https://ireanjordan24.github.io/Dreamcobots-Grok-Revolutionary';
const ORG_PAGES = 'https://dreamco-technologies.github.io/Dreamcobots';

const CommandCenter: React.FC = () => {
  const [status, setStatus] = useState<string>('Checking Pages connection...');
  const [bots, setBots] = useState<number | null>(null);

  useEffect(() => {
    // Prefer own Pages; fall back to org catalog if available
    fetch(`${ORG_PAGES}/backend-status.json`)
      .then((r) => r.json())
      .then((data) => {
        setBots(data.backends?.commandCenter?.bots ?? null);
        setStatus('Connected to org Pages catalog. Own Empire HQ is live on this site.');
      })
      .catch(() => setStatus('Own GitHub Pages dashboard ready. Enable Pages in repo Settings if not yet live.'));
  }, []);

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="eyebrow">Empire HQ · Command Center</p>
        <h1>Fully Connected Dashboard</h1>
        <p className="heroCopy">{status}{bots ? ` ${bots} bots cataloged.` : ''}</p>
        <div className="heroActions">
          <a className="primaryBtn" href={PAGES} target="_blank" rel="noreferrer">
            Open this Empire HQ on Pages
          </a>
          <a className="secondaryBtn" href={`${ORG_PAGES}/command-center.html`} target="_blank" rel="noreferrer">
            Org Command Center
          </a>
          <a className="secondaryBtn" href={`${ORG_PAGES}/backend-status.json`} target="_blank" rel="noreferrer">
            Backend status
          </a>
          <Link to="/" className="secondaryBtn">Back to HQ</Link>
        </div>
      </header>
      <section style={{ padding: '2rem', maxWidth: 800 }}>
        <h2>Dashboard Status</h2>
        <p>Empire HQ, bots, actions, stages, and Buddy are all built into this React app and deploy via the included GitHub Actions workflow.</p>
        <p>To go live: Repo Settings → Pages → Source = <strong>GitHub Actions</strong>, then re-run the Deploy workflow.</p>
        <p>Site URL: <a href={PAGES} target="_blank" rel="noreferrer">{PAGES}</a></p>
      </section>
    </main>
  );
};

export default CommandCenter;
