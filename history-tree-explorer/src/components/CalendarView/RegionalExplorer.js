import React, { useState, useMemo } from 'react';
import mockData from '../../data/mockData';
import './RegionalExplorer.css';

const RegionalExplorer = ({ country, date }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Get regions and context for the country
  const regions = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_regions;
    }
    // Add other countries' regions here in the future
    return [];
  }, [country]);

  const regionContextData = useMemo(() => {
    if (country === 'Nigeria') {
      return mockData.Nigeria_regionalContext;
    }
    return {};
  }, [country]);

  const selectedRegionData = useMemo(() => {
    if (!selectedRegion || !regionContextData[date]) {
      return null;
    }
    return regionContextData[date][selectedRegion];
  }, [selectedRegion, date, regionContextData]);

  return (
    <div className="regional-explorer">
      <div className="regions-list">
        <h3 className="regions-title">Regions of {country}</h3>
        <div className="regions-grid">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`region-card ${selectedRegion === region.id ? 'selected' : ''}`}
              onClick={() => setSelectedRegion(region.id)}
            >
              <div className="region-card-content">
                <h4 className="region-name">{region.name}</h4>
                <p className="region-description">{region.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedRegion && selectedRegionData && (
        <div className="region-context">
          <div className="context-header">
            <h3>
              {regions.find(r => r.id === selectedRegion)?.name}
            </h3>
            <p className="context-date">On this day...</p>
          </div>
          <div className="context-text">
            {selectedRegionData}
          </div>
          <div className="context-prompts">
            <p className="prompt-label">💭 Consider:</p>
            <ul>
              <li>What would daily life look like here?</li>
              <li>How did this region's interests align with national events?</li>
              <li>What local figures might have influenced this moment?</li>
            </ul>
          </div>
        </div>
      )}

      {!selectedRegion && (
        <div className="region-placeholder">
          <p>Select a region to explore its historical context on this date.</p>
        </div>
      )}
    </div>
  );
};

export default RegionalExplorer;
