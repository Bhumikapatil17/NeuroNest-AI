import React, { useState } from 'react';
import { generateQuiz } from '../services/gemini';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [qCount, setQCount] = useState(5); // Fixed to 5 because gemini.js prompt specifies 5
  
  const [quizState, setQuizState] = useState('setup'); // setup, loading, playing, results
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setQuizState('loading');
    try {
      const generated = await generateQuiz(topic);
      if (generated && generated.length > 0) {
        setQuestions(generated);
        setQuizState('playing');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        throw new Error('Empty quiz returned');
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate quiz. Try again.');
      setQuizState('setup');
    }
  };

  const handleSelectOption = (opt) => {
    if (showAnswer) return;
    setSelectedOption(opt);
    setShowAnswer(true);
    
    if (opt === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setQuizState('results');
      }
    }, 1500);
  };

  if (quizState === 'setup') {
    return (
      <>
        <div className="page-header">
          <div className="page-title">Quiz Generator</div>
          <div className="page-sub">Generate custom quizzes from any topic or chapter</div>
        </div>
        <div className="quiz-setup">
          <div className="form-group">
            <label className="form-label">Subject / Topic</label>
            <input 
              className="form-input" 
              placeholder="e.g. Physics, Mathematics, Molecular Biology..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Difficulty</label>
            <div className="diff-btns">
              {['Beginner', 'Intermediate', 'Expert'].map(d => (
                <button 
                  key={d}
                  className={`diff-btn ${difficulty === d ? 'active-diff' : ''}`} 
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Number of Questions</label>
            <div className="num-stepper">
              <div className="stepper-val">5</div>
              <span style={{fontSize: '12px', color: 'var(--text3)'}}>Currently fixed to 5 by AI prompt</span>
            </div>
          </div>
          <button className="gen-btn" onClick={handleGenerate} disabled={!topic.trim()}>Generate My Quiz →</button>
        </div>
      </>
    );
  }

  if (quizState === 'loading') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '20px' }}>
        <i className="ti ti-loader" style={{ fontSize: '40px', color: 'var(--teal)', animation: 'spin 1s linear infinite' }}></i>
        <div style={{ color: 'var(--text2)' }}>Crafting your questions using AI...</div>
      </div>
    );
  }

  if (quizState === 'results') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>Quiz Complete!</h2>
        <div style={{ fontSize: '48px', color: 'var(--teal)', fontWeight: 'bold' }}>{score} / {questions.length}</div>
        <button className="gen-btn" style={{ maxWidth: '200px' }} onClick={() => setQuizState('setup')}>Take Another</button>
      </div>
    );
  }

  // Playing state
  const q = questions[currentIdx];
  return (
    <>
      <div className="page-header" style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '14px', color: 'var(--text3)', marginBottom: '10px' }}>Question {currentIdx + 1} of {questions.length}</div>
        <div className="page-title" style={{ fontSize: '22px', lineHeight: '1.4' }}>{q.question}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
        {q.options.map((opt, i) => {
          let bgColor = 'var(--surface1)';
          let borderColor = 'var(--border)';
          let textColor = 'var(--text1)';

          if (showAnswer) {
            if (opt === q.correctAnswer) {
              bgColor = 'var(--teal-dim)';
              borderColor = 'var(--teal)';
            } else if (opt === selectedOption) {
              bgColor = 'rgba(255, 107, 53, 0.1)';
              borderColor = 'var(--ember)';
            }
          } else if (selectedOption === opt) {
            bgColor = 'var(--surface2)';
          }

          return (
            <button 
              key={i}
              style={{
                width: '100%', textAlign: 'left', padding: '16px 20px',
                background: bgColor, border: `1px solid ${borderColor}`,
                borderRadius: '12px', color: textColor, fontSize: '15px', cursor: showAnswer ? 'default' : 'pointer'
              }}
              onClick={() => handleSelectOption(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </>
  );
};

export default QuizGenerator;
