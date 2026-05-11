import React, { useState } from 'react';
import RegionalExplorer from './RegionalExplorer';
import HistoricalFigures from './HistoricalFigures';
import TriviaMode from './TriviaMode';
import TimelineMode from './TimelineMode';
import './ExplorationPanel.css';

const ExplorationPanel = ({ country, date, onClose }) => {
  const [activeMode, setActiveMode] = useState('regions');

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="exploration-overlay" onClick={onClose}>
      <div className="exploration-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="exploration-header">
          <div className="exploration-header-content">
            <h2>🌍 Historical Exploration</h2>
            <p className="exploration-context">{country} • {formattedDate}</p>
          </div>
          <button className="exploration-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Mode Navigation */}
        <div className="exploration-nav">
          <button 
            className={`nav-item ${activeMode === 'regions' ? 'active' : ''}`}
            onClick={() => setActiveMode('regions')}
          >
            <span className="nav-icon">🏘️</span>
            <span className="nav-label">Regions/States</span>
          </button>
          <button 
            className={`nav-item ${activeMode === 'figures' ? 'active' : ''}`}
            onClick={() => setActiveMode('figures')}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-label">Significant Figures</span>
          </button>
          <button 
            className={`nav-item ${activeMode === 'trivia' ? 'active' : ''}`}
            onClick={() => setActiveMode('trivia')}
          >
            <span className="nav-icon">🧠</span>
            <span className="nav-label">Trivia</span>
          </button>
          <button 
            className={`nav-item ${activeMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveMode('timeline')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Timeline</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="exploration-content">
          {activeMode === 'regions' && (
            <RegionalExplorer country={country} date={date} />
          )}
          
          {activeMode === 'figures' && (
            <HistoricalFigures country={country} />
          )}
          
          {activeMode === 'trivia' && (
            <TriviaMode country={country} />
          )}
          
          {activeMode === 'timeline' && (
            <TimelineMode country={country} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorationPanel;
