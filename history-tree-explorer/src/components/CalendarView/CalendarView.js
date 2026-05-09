import React, { useState, useMemo } from 'react';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import HistoricalCalendar from './HistoricalCalendar';
import DateEventsModal from './DateEventsModal';
import './CalendarView.css';

const CalendarView = ({ country, data, onBack }) => {
  const [selectedYear, setSelectedYear] = useState(() => {
    // Get the earliest year from data
    const years = Object.keys(data).map(Number).sort((a, b) => a - b);
    return years.length > 0 ? years[0] : new Date().getFullYear();
  });

  const [selectedMonth, setSelectedMonth] = useState(0); // 0-11
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Flatten all events into a date map for quick lookup
  const eventsByDate = useMemo(() => {
    const map = {};
    Object.entries(data).forEach(([year, events]) => {
      if (Array.isArray(events)) {
        events.forEach((event) => {
          if (event.date) {
            if (!map[event.date]) {
              map[event.date] = [];
            }
            map[event.date].push(event);
          }
        });
      }
    });
    return map;
  }, [data]);

  const getEventsForDate = (date) => {
    return eventsByDate[date] || [];
  };

  const selectedDateString = selectedDay 
    ? `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null;

  const selectedDayEvents = selectedDateString ? getEventsForDate(selectedDateString) : [];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (eventsByDate[dateStr] && eventsByDate[dateStr].length > 0) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="calendar-view">
      <button className="back-button" onClick={onBack}>← Back to Globe</button>
      
      <h1 className="country-title">{country} Historical Timeline</h1>

      <div className="calendar-container">
        <div className="calendar-controls">
          <YearSelector 
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />

          <MonthSelector 
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>

        <div className="calendar-main">
          <HistoricalCalendar
            year={selectedYear}
            month={selectedMonth}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            eventsByDate={eventsByDate}
          />
        </div>
      </div>

      {showModal && selectedDateString && selectedDayEvents.length > 0 && (
        <DateEventsModal 
          events={selectedDayEvents}
          date={selectedDateString}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CalendarView;
