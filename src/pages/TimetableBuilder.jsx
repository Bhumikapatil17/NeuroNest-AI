import React, { useState } from 'react';
import { generateTimetable } from '../services/gemini';

const TimetableBuilder = () => {
  const [data, setData] = useState({
    subjects: '',
    weakSubjects: '',
    examDates: '',
    hoursPerDay: '',
    examGaps: ''
  });
  
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!data.subjects || !data.hoursPerDay) return;
    setLoading(true);
    try {
      const generated = await generateTimetable(data);
      if (generated && generated.schedule) {
        setSchedule(generated.schedule);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate timetable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">Smart Timetable</div>
        <div className="page-sub">Your AI-generated weekly study schedule</div>
      </div>

      {!schedule && (
        <div className="quiz-setup">
          <div className="form-group">
            <label className="form-label">Subjects to Study (comma separated)</label>
            <input className="form-input" placeholder="Physics, Math, CS" value={data.subjects} onChange={e => setData({...data, subjects: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Weak Subjects</label>
            <input className="form-input" placeholder="Math" value={data.weakSubjects} onChange={e => setData({...data, weakSubjects: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Exam Dates</label>
            <input className="form-input" placeholder="May 20th" value={data.examDates} onChange={e => setData({...data, examDates: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Hours Per Day</label>
            <input className="form-input" type="number" placeholder="4" value={data.hoursPerDay} onChange={e => setData({...data, hoursPerDay: e.target.value})} />
          </div>
          <button className="gen-btn" onClick={handleGenerate} disabled={loading || !data.subjects}>
            {loading ? 'Building Schedule...' : 'Generate Timetable →'}
          </button>
        </div>
      )}

      {schedule && (
        <div className="tt-grid" style={{ marginTop: '20px', gridTemplateColumns: '120px 1fr 1fr' }}>
          <div className="tt-header">Day</div>
          <div className="tt-header">Focus</div>
          <div className="tt-header">Duration (Hours)</div>
          
          {schedule.map((item, i) => (
            <React.Fragment key={i}>
              <div className="tt-time" style={{ justifyContent: 'center', alignItems: 'center' }}>{item.day}</div>
              <div className="tt-cell" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="tt-block" style={{ width: '100%' }}>{item.focus}</div>
              </div>
              <div className="tt-cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', fontSize: '14px', fontWeight: 'bold' }}>
                {item.duration}h
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {schedule && (
        <button className="view-link" onClick={() => setSchedule(null)} style={{ background: 'none', border: 'none', marginTop: '20px' }}>
          Reset Schedule <i className="ti ti-arrow-right"></i>
        </button>
      )}
    </>
  );
};

export default TimetableBuilder;
