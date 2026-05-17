import React, { useState, useRef, useEffect } from 'react';
import { solveDoubt } from '../services/gemini';

const DoubtSolver = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "👋 Hi there! I'm your AI tutor. Ask me anything — equations, concepts, problems. I'll break it down step by step." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(null);
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setActiveAnswer(null);

    try {
      const answer = await solveDoubt(userMsg.content);
      
      const aiReply = { role: 'ai', content: "Great question! Here's a detailed explanation with step-by-step breakdown. Check the Answer Canvas on the right for the full solution. →" };
      setMessages(prev => [...prev, aiReply]);
      setActiveAnswer({ question: userMsg.content, answer: answer });
      
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error while processing that request." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">AI Doubt Solver</div>
        <div className="page-sub">Ask any question — get step-by-step AI explanations instantly</div>
      </div>
      <div className="chat-shell">
        <div className="chat-panel">
          <div className="chat-panel-header">Conversation</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role === 'user' ? 'user' : ''}`}>
                <div className={`msg-avatar ${msg.role === 'ai' ? 'ai' : 'user-av'}`}>
                  {msg.role === 'ai' ? '🧠' : 'U'}
                </div>
                <div>
                  <div className={`msg-bubble ${msg.role === 'ai' ? 'ai' : 'user-b'}`}>{msg.content}</div>
                  {msg.role === 'user' && <div className="msg-time">Just now</div>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input 
              className="chat-input" 
              placeholder="Ask a question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend} disabled={loading}>
              <i className="ti ti-send"></i>
            </button>
          </div>
        </div>
        <div className="answer-panel">
          <div className="chat-panel-header">Answer Canvas</div>
          <div className="answer-content">
            {loading ? (
              <div className="answer-placeholder">
                <i className="ti ti-loader" style={{ animation: 'spin 1s linear infinite' }}></i>
                <p>Processing your question...</p>
              </div>
            ) : activeAnswer ? (
              <div style={{ padding: '4px 0' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>AI Response</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text1)', marginBottom: '12px' }}>Answer to: "{activeAnswer.question}"</div>
                <div style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.8', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                  {activeAnswer.answer}
                </div>
              </div>
            ) : (
              <div className="answer-placeholder">
                <i className="ti ti-sparkles"></i>
                <p>Your AI answer will appear here<br />with rich formatting and step-by-step breakdowns</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoubtSolver;
