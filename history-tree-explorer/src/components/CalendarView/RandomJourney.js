import React, { useState, useMemo } from 'react';
import mockData from '../../data/mockData';
import './RandomJourney.css';

const RandomJourney = ({ country }) => {
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
    <div className="random-journey">
      <h3 className="journey-title">🎲 Random Historical Journey</h3>
      <p className="journey-subtitle">Discover unexpected historical moments & discuss</p>

      {!journey ? (
        <div className="journey-empty">
          <p>Start a random historical journey!</p>
          <button className="journey-start-btn" onClick={generateRandomJourney}>
            🎲 Generate Journey
          </button>
        </div>
      ) : (
        <div className="journey-result">
          <div className="journey-card region-card">
            <h4>Region</h4>
            <p className="journey-value">{journey.region.name}</p>
          </div>

          <div className="journey-card figure-card">
            <h4>Historical Figure</h4>
            <p className="journey-value">{journey.figure.name}</p>
            <p className="journey-subtitle-small">{journey.figure.role}</p>
          </div>

          <div className="journey-card theme-card">
            <h4>Theme</h4>
            <p className="journey-value">{formatTheme(journey.theme)}</p>
          </div>

          <div className="journey-prompt-box">
            <p className="prompt-header">💭 Discussion Prompt:</p>
            <p className="prompt-text">"{journey.prompt}"</p>
          </div>

          <div className="journey-actions">
            <button className="journey-btn regen-btn" onClick={generateRandomJourney}>
              🔄 Generate Another
            </button>
            <button className="journey-btn share-btn" onClick={() => {
              const text = `Random Historical Journey:\nRegion: ${journey.region.name}\nFigure: ${journey.figure.name}\nTheme: ${formatTheme(journey.theme)}\nPrompt: "${journey.prompt}"`;
              navigator.clipboard.writeText(text);
              alert('Journey copied to clipboard!');
            }}>
              📋 Copy
            </button>
          </div>
        </div>
      )}

      <div className="journey-info">
        <p className="info-text">💡 Perfect for classroom icebreakers, discussion groups, or personal reflection</p>
      </div>
    </div>
  );
};

export default RandomJourney;
