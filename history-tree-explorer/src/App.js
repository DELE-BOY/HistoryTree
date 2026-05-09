import React, { useState } from 'react';
import GlobeComponent from './components/Globe/Globe';
import CalendarView from './components/CalendarView/CalendarView';
import mockData from './data/mockData';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (countryName) => {
    setSelectedCountry(countryName);
  };

  const handleBackToGlobe = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="App">
      {!selectedCountry ? (
        <GlobeComponent onCountrySelect={handleCountrySelect} />
      ) : (
        <CalendarView 
          country={selectedCountry}
          data={mockData[selectedCountry] || {}}
          onBack={handleBackToGlobe}
        />
      )}
    </div>
  );
}

export default App;