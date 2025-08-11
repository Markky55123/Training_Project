// src/components/Filter.jsx
import React from 'react';
import '../css/StarWarsComponent.css';
import '../css/Filter.css';

function Filter({ searchTerm, onSearchChange, filterType, onFilterTypeChange, filterOptions }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleSelectChange = (e) => {
    onFilterTypeChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleSelectChange}>
          {filterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="searchFilter">Search: </label>
        <input
          id="searchFilter"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={`Enter min ${filterType.replace(/_/g, ' ')}`}
        />
      </div>
    </div>
  );
}

export default Filter;