import React, { useState, useMemo } from 'react';
import mockData from '../../data/mockData';
import './HistoricalFigures.css';

const HistoricalFigures = ({ country }) => {
  const [expandedFigure, setExpandedFigure] = useState(null);

  const figures = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_figures;
    }
    return [];
  }, [country]);

  const toggleExpand = (figureId) => {
    setExpandedFigure(expandedFigure === figureId ? null : figureId);
  };

  return (
    <div className="historical-figures">
      <h3 className="figures-title">Key Figures from {country}</h3>
      
      <div className="figures-list">
        {figures.map((figure) => (
          <div key={figure.id} className="figure-card">
            <button
              className="figure-header"
              onClick={() => toggleExpand(figure.id)}
            >
              <div className="figure-info">
                <h4 className="figure-name">{figure.name}</h4>
                <p className="figure-role">{figure.role}</p>
                <p className="figure-era">{figure.era}</p>
              </div>
              <div className="figure-expand-icon">
                {expandedFigure === figure.id ? '▼' : '▶'}
              </div>
            </button>

            {expandedFigure === figure.id && (
              <div className="figure-detail">
                <div className="figure-bio">
                  <p className="figure-bio-text">{figure.bio}</p>
                </div>

                <div className="figure-sections">
                  <div className="figure-section">
                    <h5>Influence</h5>
                    <p>{figure.influence}</p>
                  </div>

                  <div className="figure-section">
                    <h5>Notable Quote</h5>
                    <p className="figure-quote">"{figure.quote}"</p>
                  </div>

                  <div className="figure-section">
                    <h5>Region</h5>
                    <p>{figure.region}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalFigures;
