import React, { useState } from 'react';
import GlobeComponent from './components/Globe/Globe';
import Timeline from './components/Timeline/Timeline';
import DetailView from './components/DetailView/DetailView';
import mockData from './data/mockData';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
    // Reset selected event when changing countries
    setSelectedEvent(null);
    setSelectedYear(null);
  };

  const handleBackToGlobe = () => {
    setSelectedCountry(null);
    setSelectedEvent(null);
    setSelectedYear(null);
  };

  const handleSelectEvent = (year, event) => {
    setSelectedEvent(event);
    setSelectedYear(year);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
    setSelectedYear(null);
  };

  return (
    <div className="App">
      {!selectedCountry ? (
        <GlobeComponent onCountrySelect={handleCountrySelect} />
      ) : (
        <Timeline 
          country={selectedCountry}
          data={mockData[selectedCountry] || {}}
          onBack={handleBackToGlobe}
          onSelectEvent={handleSelectEvent}
        />
      )}
      
      {selectedEvent && (
        <DetailView 
          event={selectedEvent}
          year={selectedYear}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;