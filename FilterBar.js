import React from 'react';

function FilterBar({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="filter-bar">
      {/* Existing Filters */}
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="minBedrooms"
        placeholder="Min Bedrooms"
        value={filters.minBedrooms}
        onChange={handleFilterChange}
      />
      <input
        type="number"
        name="minBathrooms"
        placeholder="Min Bathrooms"
        value={filters.minBathrooms}
        onChange={handleFilterChange}
      />

      {/* University Filter Dropdown */}
      <select
        name="university"
        value={filters.university}
        onChange={handleFilterChange}
      >
        <option value="">All Universities</option>
        <option value="University of Arizona">University of Arizona</option>
        <option value="Arizona State University">Arizona State University</option>
        <option value="Northern Arizona University">Northern Arizona University</option>
      </select>

      {/* Reset Button */}
      <button onClick={() => setFilters({ minPrice: '', maxPrice: '', minBedrooms: '', minBathrooms: '', university: '' })}>
        Reset
      </button>
    </div>
  );
}

export default FilterBar;
