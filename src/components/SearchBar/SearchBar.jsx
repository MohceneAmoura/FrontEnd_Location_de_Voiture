// src/components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import './searchBar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, pickupDate, returnDate });
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Trouvez votre voiture idéale</h1>
      <p className="search-subtitle">Des véhicules de qualité aux meilleurs prix</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            type="text"
            placeholder="Lieu de prise en charge"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="form-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="date"
            placeholder="Date de début"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="form-group">
          <FaCalendarAlt className="input-icon" />
          <input
            type="date"
            placeholder="Date de retour"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="search-input"
          />
        </div>
        
        <button type="submit" className="search-button">
          <FaSearch className="button-icon" />
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default SearchBar;