import React, { useState } from 'react';
import { summarizeNotes } from '../services/gemini';

const NotesSummarizer = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    try {
      const generated = await summarizeNotes(notes);
      setSummary(generated);
    } catch (e) {
      console.error(e);
      alert('Failed to summarize notes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">Notes Summarizer</div>
        <div className="page-sub">Upload or paste your notes — AI will distill the key insights</div>
      </div>
      
      {!summary && (
        <>
          <div className="dropzone">
            <i className="ti ti-cloud-upload"></i>
            <h3>Drop your files here</h3>
            <p>Supports PDF, DOCX, TXT — or paste text below</p>
          </div>
          <textarea 
            className="notes-textarea" 
            placeholder="Or paste your notes directly here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={loading}
          ></textarea>
          <button className="gen-btn" onClick={handleGenerate} disabled={!notes.trim() || loading}>
            {loading ? 'Summarizing...' : 'Summarize My Notes →'}
          </button>
        </>
      )}

      {summary && (
        <div style={{ background: 'var(--surface1)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--teal)' }}>AI Summary</h3>
          <div style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--text1)', whiteSpace: 'pre-wrap' }}>
            {summary}
          </div>
          <button className="view-link" onClick={() => setSummary(null)} style={{ background: 'none', border: 'none', marginTop: '20px' }}>
            Summarize Another <i className="ti ti-arrow-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default NotesSummarizer;
