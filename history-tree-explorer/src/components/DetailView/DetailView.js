import React from 'react';
import styled from 'styled-components';
import './DetailView.css';

const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DetailCard = styled.div`
  background-color: white;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 30px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
  
  &:hover {
    color: #000;
  }
`;

const ImageContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const EventImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const DetailView = ({ event, year, onClose }) => {
  if (!event) return null;

  return (
    <DetailContainer onClick={onClose}>
      <DetailCard onClick={(e) => e.stopPropagation()}>
        <DetailHeader>
          <div>
            <h2>{event.name}</h2>
            <h3>{year}</h3>
          </div>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DetailHeader>
        
        <ImageContainer>
          <EventImage src={event.image} alt={event.name} />
        </ImageContainer>
        
        <div className="event-description">
          <p>{event.description}</p>
        </div>
        
        {event.significance && (
          <div className="event-significance">
            <h4>Historical Significance</h4>
            <p>{event.significance}</p>
          </div>
        )}
      </DetailCard>
    </DetailContainer>
  );
};

export default DetailView;