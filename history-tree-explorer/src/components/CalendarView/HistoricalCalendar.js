import React from 'react';

const HistoricalCalendar = ({ year, month, selectedDay, onDaySelect, eventsByDate }) => {
  // Get first day of month and number of days in month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array of day cells
  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const getDayEvents = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventsByDate[dateString] || [];
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="historical-calendar">
      <div className="weekday-headers">
        {weekDays.map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          }

          const dayEvents = getDayEvents(day);
          const isSelected = selectedDay === day;

          return (
            <div
              key={day}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
              onClick={() => onDaySelect(day)}
            >
              <div className="day-number">{day}</div>
              
              {dayEvents.length > 0 && (
                <div className="day-preview">
                  <div className="event-count">{dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}</div>
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div key={idx} className="event-preview-text">
                      {event.shortDescription}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoricalCalendar;
