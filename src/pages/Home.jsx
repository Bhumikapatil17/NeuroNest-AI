import React from 'react';

const Home = ({ setPage, userName }) => {
  const getGreeting = () => {
    const h = new Date().getHours();
    const t = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
    return `Good ${t}! 👋`;
  };

  return (
    <>
      <div className="greeting-name">{getGreeting()}</div>
      <div className="greeting-sub">What do you want to learn today?</div>

      <div className="modules-grid">
        <div className="mod-card" onClick={() => setPage('doubt')}>
          <div className="mod-icon" style={{ background: 'rgba(0,229,192,0.12)' }}>💬</div>
          <div className="mod-name">Doubt Solver</div>
          <div className="mod-desc">Get instant AI help for any question</div>
          <div className="mod-arrow"><i className="ti ti-arrow-right"></i></div>
        </div>
        <div className="mod-card" onClick={() => setPage('quiz')}>
          <div className="mod-icon" style={{ background: 'rgba(124,58,237,0.12)' }}>❓</div>
          <div className="mod-name">Quiz Generator</div>
          <div className="mod-desc">Generate quizzes from your topics</div>
          <div className="mod-arrow"><i className="ti ti-arrow-right"></i></div>
        </div>
        <div className="mod-card" onClick={() => setPage('flash')}>
          <div className="mod-icon" style={{ background: 'rgba(245,158,11,0.12)' }}>🃏</div>
          <div className="mod-name">Flashcards</div>
          <div className="mod-desc">Create smart flashcards instantly</div>
          <div className="mod-arrow"><i className="ti ti-arrow-right"></i></div>
        </div>
        <div className="mod-card" onClick={() => setPage('notes')}>
          <div className="mod-icon" style={{ background: 'rgba(59,130,246,0.12)' }}>📄</div>
          <div className="mod-name">Notes Summarizer</div>
          <div className="mod-desc">Summarize long notes in seconds</div>
          <div className="mod-arrow"><i className="ti ti-arrow-right"></i></div>
        </div>
        <div className="mod-card" onClick={() => setPage('timetable')}>
          <div className="mod-icon" style={{ background: 'rgba(16,185,129,0.12)' }}>📅</div>
          <div className="mod-name">Timetable Builder</div>
          <div className="mod-desc">Build your personalized timetable</div>
          <div className="mod-arrow"><i className="ti ti-arrow-right"></i></div>
        </div>
      </div>

      <div className="row2">
        <div className="nn-card">
          <div className="card-header">
            <div className="card-title">Study Overview</div>
            <div className="week-badge">This Week <i className="ti ti-chevron-down"></i></div>
          </div>
          <div className="stats-grid">
            <div className="stat-box">
              <div>
                <div className="stat-label">Total Study Time</div>
                <div className="stat-val">12h 45m</div>
                <div className="stat-trend">↑ +18% from last week</div>
              </div>
              <div className="ring" style={{ borderTopColor: 'var(--teal)' }}></div>
            </div>
            <div className="stat-box">
              <div>
                <div className="stat-label">Topics Covered</div>
                <div className="stat-val">24</div>
                <div className="stat-trend">↑ +6 new topics</div>
              </div>
              <div className="ring" style={{ borderTopColor: 'var(--violet)' }}></div>
            </div>
            <div className="stat-box">
              <div>
                <div className="stat-label">Quizzes Taken</div>
                <div className="stat-val">18</div>
                <div className="stat-trend">↑ +4 from last week</div>
              </div>
              <div className="ring" style={{ borderTopColor: 'var(--amber)' }}></div>
            </div>
            <div className="stat-box">
              <div>
                <div className="stat-label">Flashcards Made</div>
                <div className="stat-val">56</div>
                <div className="stat-trend">↑ +12 new cards</div>
              </div>
              <div className="ring" style={{ borderTopColor: 'var(--blue)' }}></div>
            </div>
          </div>
        </div>

        <div className="nn-card">
          <div className="card-header">
            <div className="card-title">Today's Plan</div>
          </div>
          <div className="plan-list">
            <div className="plan-item">
              <div className="dot-col"><div className="dot"></div><div className="vline"></div></div>
              <div className="plan-time">09:00 AM</div>
              <div><div className="plan-subj">Kinematics</div><div className="plan-topic">Physics</div></div>
            </div>
            <div className="plan-item">
              <div className="dot-col"><div className="dot" style={{ background: 'var(--violet)' }}></div><div className="vline"></div></div>
              <div className="plan-time">11:00 AM</div>
              <div><div className="plan-subj">Organic Chemistry</div><div className="plan-topic">Chemistry</div></div>
            </div>
            <div className="plan-item">
              <div className="dot-col"><div className="dot" style={{ background: 'var(--amber)' }}></div><div className="vline"></div></div>
              <div className="plan-time">02:00 PM</div>
              <div><div className="plan-subj">Data Structures</div><div className="plan-topic">Computer Science</div></div>
            </div>
            <div className="plan-item">
              <div className="dot-col"><div className="dot" style={{ background: 'var(--blue)' }}></div></div>
              <div className="plan-time">04:00 PM</div>
              <div><div className="plan-subj">Life Processes</div><div className="plan-topic">Biology</div></div>
            </div>
          </div>
          <div className="view-link" onClick={() => setPage('timetable')}>View Full Timetable <i className="ti ti-arrow-right"></i></div>
        </div>
      </div>

      <div className="row3">
        <div className="row3-head">
          <div className="card-title">Recent Activity</div>
          <div className="view-all">View All</div>
        </div>
        <div className="activity-grid">
          <div className="act-card">
            <div className="act-icon" style={{ background: 'rgba(0,229,192,0.12)' }}>✅</div>
            <div>
              <div className="act-title">Solved: Projectile Motion</div>
              <div className="act-meta">Physics · 2m ago</div>
            </div>
          </div>
          <div className="act-card">
            <div className="act-icon" style={{ background: 'rgba(124,58,237,0.12)' }}>🧪</div>
            <div>
              <div className="act-title">Generated Quiz: Thermodynamics</div>
              <div className="act-meta">Physics · 1h ago</div>
            </div>
          </div>
          <div className="act-card">
            <div className="act-icon" style={{ background: 'rgba(245,158,11,0.12)' }}>🃏</div>
            <div>
              <div className="act-title">Created Flashcards: Cell Biology</div>
              <div className="act-meta">Biology · 3h ago</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
