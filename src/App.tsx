import { HashRouter, Routes, Route } from 'react-router-dom';
import EmpireHQ from './components/EmpireHQ';
import BotPage from './components/BotPage';
import BuddyChat from './components/BuddyChat';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<EmpireHQ />} />
        <Route path="/chat" element={<BuddyChat />} />
        <Route path="/bots/:botId" element={<BotPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
