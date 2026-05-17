import React, { useState } from 'react';
import { generateFlashcards } from '../services/gemini';

const Flashcards = () => {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState([]);
  const [ci, setCi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const generated = await generateFlashcards(topic);
      if (generated && generated.length > 0) {
        setCards(generated);
        setCi(0);
        setFlipped(false);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCi((ci + 1) % cards.length);
    }, 300);
  };

  if (cards.length === 0) {
    return (
      <>
        <div className="page-header">
          <div className="page-title">Flashcards Generator</div>
          <div className="page-sub">Create smart flashcards instantly via AI</div>
        </div>
        <div className="quiz-setup">
          <div className="form-group">
            <label className="form-label">Subject / Topic</label>
            <input 
              className="form-input" 
              placeholder="e.g. Newton's Laws, Cell Biology..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <button className="gen-btn" onClick={handleGenerate} disabled={!topic.trim() || loading}>
            {loading ? 'Generating...' : 'Generate Flashcards →'}
          </button>
        </div>
      </>
    );
  }

  const currentCard = cards[ci];

  return (
    <>
      <div className="page-header">
        <div className="page-title">Flashcards: {topic}</div>
        <div className="page-sub">Click the card to flip it and reveal the answer. Card {ci + 1} of {cards.length}</div>
      </div>
      <div className="flashcard-area">
        <div className={`fc-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="fc-inner">
            <div className="fc-front">
              <div className="fc-badge">Question</div>
              <div className="fc-question">{currentCard.front}</div>
              <div className="fc-hint">Click to reveal answer</div>
            </div>
            <div className="fc-back">
              <div className="fc-badge">Answer</div>
              <div className="fc-answer">{currentCard.back}</div>
            </div>
          </div>
        </div>
        <div className="fc-actions" style={{ maxWidth: '560px', width: '100%' }}>
          <button className="fc-btn again" onClick={nextCard}>Again</button>
          <button className="fc-btn good" onClick={nextCard}>Good</button>
          <button className="fc-btn easy" onClick={nextCard}>Easy</button>
        </div>
        <button 
          className="view-link" 
          onClick={() => { setCards([]); setTopic(''); }} 
          style={{ background: 'none', border: 'none', marginTop: '20px' }}
        >
          Generate New Topic <i className="ti ti-arrow-right"></i>
        </button>
      </div>
    </>
  );
};

export default Flashcards;
