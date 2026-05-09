import React, { useState } from 'react';
import DetailView from '../DetailView/DetailView';

const DayEventsList = ({ events, date, day }) => {
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

  return (
    <>
      <div className="day-events-list">
        <h2 className="events-title">
          Events on {formattedDate}
        </h2>

        <div className="events-container">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              <div className="event-card-header">
                <h3>{event.name}</h3>
              </div>
              <p className="event-short-desc">{event.shortDescription}</p>
              <button className="view-details-btn">View Details →</button>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <DetailView 
          event={selectedEvent}
          year={date.split('-')[0]}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

export default DayEventsList;
