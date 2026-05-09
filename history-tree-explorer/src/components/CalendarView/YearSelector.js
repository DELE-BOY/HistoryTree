import React from 'react';

const YearSelector = ({ selectedYear, onYearChange }) => {
  const years = Array.from({ length: 100 }, (_, i) => 1900 + i);

  return (
    <div className="year-selector">
      <label>Year:</label>
      <select 
        value={selectedYear} 
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="year-dropdown"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <span className="selected-year">{selectedYear}</span>
    </div>
  );
};

export default YearSelector;
