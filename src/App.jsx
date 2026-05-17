import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Home from './pages/Home';
import DoubtSolver from './pages/DoubtSolver';
import QuizGenerator from './pages/QuizGenerator';
import Flashcards from './pages/Flashcards';
import NotesSummarizer from './pages/NotesSummarizer';
import TimetableBuilder from './pages/TimetableBuilder';

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [userName, setUserName] = useState('');
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const savedUser = localStorage.getItem('nn_user');
    if (savedUser) {
      setUserName(savedUser);
      setHasOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = (name) => {
    setUserName(name);
    localStorage.setItem('nn_user', name);
    setHasOnboarded(true);
  };

  const pages = {
    home: 'Home',
    doubt: 'AI Doubt Solver',
    quiz: 'Quiz Generator',
    flash: 'Flashcards',
    notes: 'Notes Summarizer',
    timetable: 'Timetable Builder'
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home setPage={setActivePage} userName={userName} />;
      case 'doubt': return <DoubtSolver />;
      case 'quiz': return <QuizGenerator />;
      case 'flash': return <Flashcards />;
      case 'notes': return <NotesSummarizer />;
      case 'timetable': return <TimetableBuilder />;
      default: return <Home setPage={setActivePage} userName={userName} />;
    }
  };

  return (
    <div id="app" style={{ display: 'flex' }}>
      <Sidebar activePage={activePage} setPage={setActivePage} userName={userName} />
      <div className="main">
        <Topbar title={pages[activePage] || 'Home'} />
        <div className="content">
          <div className="page active" style={{ display: 'block' }}>
            {renderPage()}
          </div>
        </div>
        <div className="footer">© 2026 NeuroNest AI. All rights reserved.</div>
      </div>
    </div>
  );
}

export default App;
