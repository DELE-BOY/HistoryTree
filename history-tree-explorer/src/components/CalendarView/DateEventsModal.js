import React, { useState } from 'react';
import DetailView from '../DetailView/DetailView';
import SubmissionForm from './SubmissionForm';
import ExplorationPanel from './ExplorationPanel';
import RandomJourneyModal from './RandomJourneyModal';
import './DateEventsModal.css';

const DateEventsModal = ({ events, date, onClose, country }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showExploration, setShowExploration] = useState(false);
  const [showRandomJourney, setShowRandomJourney] = useState(false);

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

  // If submission form is shown
  if (showSubmissionForm) {
    return (
      <SubmissionForm 
        selectedDate={date}
        country={country}
        onClose={() => setShowSubmissionForm(false)}
      />
    );
  }

  // If exploration panel should be shown
  if (showExploration) {
    return (
      <ExplorationPanel 
        country={country}
        date={date}
        onClose={() => setShowExploration(false)}
      />
    );
  }

  // If random journey modal should be shown
  if (showRandomJourney) {
    return (
      <RandomJourneyModal 
        country={country}
        date={date}
        onClose={() => setShowRandomJourney(false)}
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

        <div className="modal-footer">
          <div className="modal-action-buttons">
            <button 
              className="modal-action-btn explore-btn"
              onClick={() => setShowExploration(true)}
            >
              🌍 Explore
            </button>
            <button 
              className="modal-action-btn randomize-btn"
              onClick={() => setShowRandomJourney(true)}
            >
              🎲 Randomize
            </button>
          </div>
          
          <button 
            className="modal-submit-btn"
            onClick={() => setShowSubmissionForm(true)}
          >
            + Submit Entry for This Date
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateEventsModal;
