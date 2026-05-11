import React, { useMemo } from 'react';
import mockData from '../../data/mockData';
import './TimelineMode.css';

const TimelineMode = ({ country }) => {
  const regionTimelines = useMemo(() => {
    if (country === 'Nigeria') {
      return {
        regions: mockData.Nigeria_regions,
        timelines: mockData.Nigeria_timeline
      };
    }
    return { regions: [], timelines: {} };
  }, [country]);

  const regions = regionTimelines.regions.slice(0, 4); // Show first 4 regions

  const getThemeColor = (theme) => {
    const colors = {
      governance: 'governance',
      independence: 'independence',
      conflict: 'conflict',
      development: 'development',
      culture: 'culture',
      economic: 'economic',
      agriculture: 'agriculture',
      recovery: 'recovery',
      unity: 'unity'
    };
    return colors[theme] || 'default';
  };

  return (
    <div className="timeline-mode">
      <h3 className="timeline-title">📊 Regional Timelines</h3>
      <p className="timeline-subtitle">Explore how regions evolved over time</p>

      <div className="timelines-container">
        {regions.map((region) => {
          const timeline = regionTimelines.timelines[region.id];
          if (!timeline) return null;

          return (
            <div key={region.id} className="region-timeline">
              <h4 className="timeline-region-name">{region.name}</h4>
              
              <div className="timeline-events">
                {timeline.map((event, index) => (
                  <div key={index} className={`timeline-event theme-${getThemeColor(event.theme)}`}>
                    <div className="event-marker"></div>
                    <div className="event-content">
                      <div className="event-year">{event.year}</div>
                      <h5 className="event-title">{event.event}</h5>
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="timeline-legend">
        <p className="legend-title">Theme Legend:</p>
        <div className="legend-items">
          <div className="legend-item governance">
            <span className="legend-dot"></span>
            <span>Governance</span>
          </div>
          <div className="legend-item independence">
            <span className="legend-dot"></span>
            <span>Independence</span>
          </div>
          <div className="legend-item conflict">
            <span className="legend-dot"></span>
            <span>Conflict</span>
          </div>
          <div className="legend-item economic">
            <span className="legend-dot"></span>
            <span>Economic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineMode;
