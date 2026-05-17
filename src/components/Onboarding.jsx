import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'English', 'Economics'];

  const toggleChip = (sub) => {
    if (selectedChips.includes(sub)) {
      setSelectedChips(selectedChips.filter(c => c !== sub));
    } else {
      setSelectedChips([...selectedChips, sub]);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    onComplete(name.trim());
  };

  return (
    <div id="onboard" style={{ opacity: 1, display: 'flex' }}>
      <div className="ob-card">
        <div className="ob-logo">
          <div className="ob-logo-icon">🧠</div>
          <div className="ob-logo-text">Neuro<span>Nest</span> AI</div>
        </div>
        <div className="ob-heading">What should we call you?</div>
        <p className="ob-sub">Personalize your AI-powered learning experience in seconds</p>

        <div className="ob-label">Your Name</div>
        <input 
          className="ob-input" 
          type="text" 
          placeholder="Enter your name..." 
          maxLength="32" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={error ? { borderColor: 'var(--ember)' } : {}}
        />
        <div className="ob-error" style={{ display: error ? 'block' : 'none' }}>Please enter your name to continue</div>

        <div className="ob-label">What are you studying?</div>
        <div className="ob-chips">
          {subjects.map(sub => (
            <div 
              key={sub} 
              className={`ob-chip ${selectedChips.includes(sub) ? 'selected' : ''}`}
              onClick={() => toggleChip(sub)}
            >
              {sub}
            </div>
          ))}
        </div>

        <button className="ob-btn" onClick={handleSubmit}>Let's Begin →</button>
      </div>
    </div>
  );
};

export default Onboarding;
