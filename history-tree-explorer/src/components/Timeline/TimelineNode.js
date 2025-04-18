import React from 'react';
import styled from 'styled-components';

const NodeContainer = styled.li`
  list-style-type: none;
  position: relative;
  padding-left: 30px;
  margin: 15px 0;
  font-size: 18px;
`;

const NodeLabel = styled.div`
  cursor: pointer;
  font-weight: ${props => props.isYear ? 'bold' : 'normal'};
  color: ${props => props.isYear ? '#1E3F66' : '#333'};
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:before {
    content: '${props => props.isExpanded ? '▼' : '►'}';
    font-size: 12px;
    margin-right: 10px;
    color: ${props => props.isYear ? '#1E3F66' : '#666'};
  }
`;

const Children = styled.ul`
  padding-left: 20px;
  margin-top: 10px;
`;

const EventItem = styled.li`
  list-style-type: none;
  margin: 8px 0;
  cursor: pointer;
  
  &:before {
    content: '└─ ';
    color: #555;
  }
  
  &:hover {
    color: #1E3F66;
    font-weight: 500;
  }
`;

const TimelineNode = ({ label, isExpanded, onToggle, items, onSelectEvent, isYear = true }) => {
  return (
    <NodeContainer>
      <NodeLabel 
        onClick={onToggle} 
        isExpanded={isExpanded}
        isYear={isYear}
      >
        {label}
      </NodeLabel>
      
      {isExpanded && items && (
        <Children>
          {items.map((item, index) => (
            <EventItem 
              key={index} 
              onClick={() => onSelectEvent(label, item)}
            >
              {item.name} - {item.shortDescription}
            </EventItem>
          ))}
        </Children>
      )}
    </NodeContainer>
  );
};

export default TimelineNode;