import React, { useState } from 'react';
import DetailView from '../DetailView/DetailView';
import './DateEventsModal.css';

const DateEventsModal = ({ events, date, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
  };

  // If a detail event is selected, show detail view
  if (selectedEvent) {
    return (
      <DetailView 
        event={selectedEvent}
        year={date.split('-')[0]}
        onClose={handleBackToList}
      />
    );
  }

  return (
    <div className="date-events-modal-overlay" onClick={onClose}>
      <div className="date-events-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formattedDate}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-events-list">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="modal-event-item"
              onClick={() => handleEventClick(event)}
            >
              <h3>{event.name}</h3>
              <p>{event.shortDescription}</p>
              <span className="event-click-hint">Click to view details</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateEventsModal;
