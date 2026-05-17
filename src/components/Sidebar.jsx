import React from 'react';

const Sidebar = ({ activePage, setPage, userName }) => {
  const initials = (name) => {
    if (!name) return '?';
    return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="sidebar">
      <div className="sb-brand">
        <div className="sb-brand-icon">🧠</div>
        <div className="sb-brand-name">Neuro<span>Nest</span> AI</div>
      </div>

      <div className="sb-section">
        <div className="sb-section-label">Tools</div>
        <div className={`sb-item ${activePage === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>
          <i className="ti ti-home"></i> Home
        </div>
        <div className={`sb-item ${activePage === 'doubt' ? 'active' : ''}`} onClick={() => setPage('doubt')}>
          <i className="ti ti-message-circle"></i> AI Doubt Solver
        </div>
        <div className={`sb-item ${activePage === 'quiz' ? 'active' : ''}`} onClick={() => setPage('quiz')}>
          <i className="ti ti-list-check"></i> Quiz Generator
        </div>
        <div className={`sb-item ${activePage === 'flash' ? 'active' : ''}`} onClick={() => setPage('flash')}>
          <i className="ti ti-cards"></i> Flashcards
        </div>
        <div className={`sb-item ${activePage === 'notes' ? 'active' : ''}`} onClick={() => setPage('notes')}>
          <i className="ti ti-file-text"></i> Notes Summarizer
        </div>
        <div className={`sb-item ${activePage === 'timetable' ? 'active' : ''}`} onClick={() => setPage('timetable')}>
          <i className="ti ti-calendar"></i> Timetable Builder
        </div>
      </div>

      <div className="sb-section">
        <div className="sb-section-label">Study</div>
        <div className={`sb-item ${activePage === 'plans' ? 'active' : ''}`} onClick={() => setPage('home')}>
          <i className="ti ti-clipboard-list"></i> My Plans
        </div>
        <div className={`sb-item ${activePage === 'mynotes' ? 'active' : ''}`} onClick={() => setPage('notes')}>
          <i className="ti ti-notes"></i> My Notes
        </div>
        <div className={`sb-item ${activePage === 'bookmarks' ? 'active' : ''}`} onClick={() => setPage('home')}>
          <i className="ti ti-bookmark"></i> Bookmarks
        </div>
      </div>

      <div className="sb-section">
        <div className="sb-section-label">Settings</div>
        <div className="sb-item" onClick={() => setPage('home')}><i className="ti ti-user"></i> Profile</div>
        <div className="sb-item" onClick={() => setPage('home')}><i className="ti ti-settings"></i> Settings</div>
        <div className="sb-item" onClick={() => setPage('home')}><i className="ti ti-help-circle"></i> Help & Support</div>
      </div>

      <div className="sb-bottom">
        <div className="sb-user">
          <div className="sb-avatar">{initials(userName)}</div>
          <div>
            <div className="sb-uname">{userName || '—'}</div>
            <div className="sb-urole">Student</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
