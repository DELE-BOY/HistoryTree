import React from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  return (
    <div className="month-selector">
      <label>Select Month:</label>
      <select 
        value={selectedMonth} 
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="month-dropdown"
      >
        {MONTHS.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <span className="selected-month">{MONTHS[selectedMonth]}</span>
    </div>
  );
};

export default MonthSelector;
