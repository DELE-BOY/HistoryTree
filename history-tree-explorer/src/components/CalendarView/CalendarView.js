import React, { useState, useMemo } from 'react';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import HistoricalCalendar from './HistoricalCalendar';
import DayEventsList from './DayEventsList';
import './CalendarView.css';

const CalendarView = ({ country, data, onBack }) => {
  const [selectedYear, setSelectedYear] = useState(() => {
    // Get the earliest year from data
    const years = Object.keys(data).map(Number).sort((a, b) => a - b);
    return years.length > 0 ? years[0] : new Date().getFullYear();
  });

  const [selectedMonth, setSelectedMonth] = useState(0); // 0-11
  const [selectedDay, setSelectedDay] = useState(null);

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
            onDaySelect={setSelectedDay}
            eventsByDate={eventsByDate}
          />
        </div>
      </div>

      {selectedDayEvents.length > 0 && (
        <DayEventsList 
          events={selectedDayEvents}
          date={selectedDateString}
          day={selectedDay}
        />
      )}
    </div>
  );
};

export default CalendarView;
