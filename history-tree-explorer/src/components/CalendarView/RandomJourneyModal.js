import React, { useState, useMemo } from 'react';
import mockData from '../../data/mockData';
import './RandomJourneyModal.css';

const RandomJourneyModal = ({ country, date, onClose }) => {
  const [journey, setJourney] = useState(null);

  const regions = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_regions;
    }
    return [];
  }, [country]);

  const figures = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_figures;
    }
    return [];
  }, [country]);

  const themes = mockData.randomThemes;
  const prompts = mockData.randomPrompts;

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateRandomJourney = () => {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    const randomFigure = figures[Math.floor(Math.random() * figures.length)];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomPromptList = prompts[randomTheme];
    const randomPrompt = randomPromptList[Math.floor(Math.random() * randomPromptList.length)];

    setJourney({
      region: randomRegion,
      figure: randomFigure,
      theme: randomTheme,
      prompt: randomPrompt
    });
  };

  const formatTheme = (theme) => {
    return theme
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="random-journey-modal-overlay" onClick={onClose}>
      <div className="random-journey-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="random-modal-header">
          <div className="random-modal-header-content">
            <h2>🎲 Random Historical Journey</h2>
            <p className="random-modal-context">{country} • {formattedDate}</p>
          </div>
          <button className="random-modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="random-modal-content">
          {!journey ? (
            <div className="random-empty">
              <p className="random-empty-text">Start a random historical journey!</p>
              <button className="random-start-btn" onClick={generateRandomJourney}>
                🎲 Generate Journey
              </button>
            </div>
          ) : (
            <div className="random-result">
              <div className="random-card region-card">
                <h4>Region</h4>
                <p className="random-value">{journey.region.name}</p>
              </div>

              <div className="random-card figure-card">
                <h4>Historical Figure</h4>
                <p className="random-value">{journey.figure.name}</p>
                <p className="random-role">{journey.figure.role}</p>
              </div>

              <div className="random-card theme-card">
                <h4>Theme</h4>
                <p className="random-value">{formatTheme(journey.theme)}</p>
              </div>

              <div className="random-prompt-box">
                <p className="prompt-header">💭 Discussion Prompt:</p>
                <p className="prompt-text">"{journey.prompt}"</p>
              </div>

              <div className="random-actions">
                <button className="random-action-btn regen-btn" onClick={generateRandomJourney}>
                  🔄 Generate Another
                </button>
                <button 
                  className="random-action-btn share-btn" 
                  onClick={() => {
                    const text = `Random Historical Journey:\nRegion: ${journey.region.name}\nFigure: ${journey.figure.name}\nTheme: ${formatTheme(journey.theme)}\nPrompt: "${journey.prompt}"`;
                    navigator.clipboard.writeText(text);
                    alert('Journey copied to clipboard!');
                  }}
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomJourneyModal;
