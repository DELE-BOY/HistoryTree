import React, { useState } from 'react';
import styled from 'styled-components';
import TimelineNode from './TimelineNode';
import './Timeline.css';

// Styled components for the tree structure
const TreeContainer = styled.div`
  padding: 20px;
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const CountryTitle = styled.h1`
  color: #333;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const BackButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #555;
  }
`;

const Timeline = ({ country, data, onBack, onSelectEvent }) => {
  // State to track expanded years
  const [expandedYears, setExpandedYears] = useState({});

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <TreeContainer>
      <BackButton onClick={onBack}>← Back to Globe</BackButton>
      <CountryTitle>{country} Historical Timeline</CountryTitle>
      
      <div className="tree-structure">
        <ul className="tree-root">
          {Object.keys(data).sort().map(year => (
            <TimelineNode 
              key={year}
              label={year}
              isExpanded={expandedYears[year] || false}
              onToggle={() => toggleYear(year)}
              items={data[year]}
              onSelectEvent={onSelectEvent}
            />
          ))}
        </ul>
      </div>
    </TreeContainer>
  );
};

export default Timeline;