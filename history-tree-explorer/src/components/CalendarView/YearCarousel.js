import React from 'react';

const YearCarousel = ({ selectedYear, onYearChange, availableYears }) => {
  const handlePrevYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      onYearChange(availableYears[currentIndex - 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = availableYears.indexOf(selectedYear);
    if (currentIndex < availableYears.length - 1) {
      onYearChange(availableYears[currentIndex + 1]);
    }
  };

  const currentIndex = availableYears.indexOf(selectedYear);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < availableYears.length - 1;

  return (
    <div className="year-carousel">
      <button 
        className="carousel-button prev"
        onClick={handlePrevYear}
        disabled={!canGoPrev}
      >
        ◄
      </button>

      <div className="year-display">
        <div className="year-value">{selectedYear}</div>
        <div className="year-range">
          {currentIndex + 1} of {availableYears.length}
        </div>
      </div>

      <button 
        className="carousel-button next"
        onClick={handleNextYear}
        disabled={!canGoNext}
      >
        ►
      </button>
    </div>
  );
};

export default YearCarousel;
