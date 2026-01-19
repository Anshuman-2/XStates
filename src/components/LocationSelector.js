import React, { useEffect, useState } from 'react';
import './LocationSelector.css';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries on mount
  useEffect(() => {
    fetch('https://location-selector.labs.crio.do/countries')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/states`)
        .then(res => res.json())
        .then(data => {
          setStates(data);
          setSelectedState('');
          setCities([]);
          setSelectedCity('');
        });
    }
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(res => res.json())
        .then(data => {
          setCities(data);
          setSelectedCity('');
        });
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="location-selector">
      <h1>Location Selector</h1>

      <div className="dropdown-container">
        <div className="dropdown-group">
          <label htmlFor="country-select">Select Country</label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="state-select">Select State</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label htmlFor="city-select">Select City</label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCity && selectedState && selectedCountry && (
        <div className="selection-message">
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
