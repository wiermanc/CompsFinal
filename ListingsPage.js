import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import mockListings from '../data/mockListings.json';
import './ListingsPage.css';

const universityColors = {
  "University of Arizona": { primary: 'red', secondary: 'blue' },
  "Arizona State University": { primary: 'maroon', secondary: 'gold' },
  "Northern Arizona University": { primary: 'blue', secondary: 'gold' },
  "default": { primary: 'white', secondary: 'grey' }
};

function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [minBathrooms, setMinBathrooms] = useState('');
  const [moveInMonth, setMoveInMonth] = useState('');
  const [moveOutMonth, setMoveOutMonth] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [headerText, setHeaderText] = useState('Listings Near Universities');
  const [hasPets, setHasPets] = useState(false);
  const [hasLaundry, setHasLaundry] = useState(false);
  const [hasAirConditioning, setHasAirConditioning] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [originalListings, setOriginalListings] = useState(mockListings);
  const [displayedListings, setDisplayedListings] = useState(mockListings);

  const toggleMoreFilters = () => {
    setShowMoreFilters(prevState => !prevState);
  };
  useEffect(() => {
    if (selectedUniversity) {
      setHeaderText(`Listings Near ${selectedUniversity}`);
    } else {
      setHeaderText('Welcome to Uni-Housing!');
    }
  }, [selectedUniversity]);

  const colors = selectedUniversity ? universityColors[selectedUniversity] : universityColors['default'];

  const backgroundStyle = {
    backgroundColor: colors.primary,
    color: colors.secondary,
  };

  const resetFilters = () => {
    setHasPets(false);
    setHasLaundry(false);
    setHasAirConditioning(false);
    setHasHeating(false);
    setHasParking(false);
    // Add other states you want to reset
  };

  const cardStyle = {
    backgroundColor: 'white', // Ensure this color works with your design
    color: 'black', // Text color for readability
    // Add other styles as necessary
  };

  const applyFilters = () => {
    // Assuming `originalListings` is the state that contains all listings
    // and `displayedListings` is the state for the listings currently displayed
    const filteredListings = originalListings.filter(listing => {
      return (!hasPets || listing.pets === 'Yes') &&
             (!hasLaundry || listing.laundry === 'In Unit' || listing.laundry === 'Shared') &&
             (!hasAirConditioning || listing.airConditioning === 'Yes') &&
             (!hasHeating || listing.heating === 'Yes') &&
             (!hasParking || listing.parking === 'Yes' || listing.parking === 'With additional fee');
    });

    localStorage.setItem('filters', JSON.stringify({
      searchQuery,
      filterType,
      minPrice,
      maxPrice,
      minBedrooms,
      minBathrooms,
      moveInMonth,
      moveOutMonth,
      // any other filters
    }));
  
    setDisplayedListings(filteredListings);
    setShowMoreFilters(false); // To close the dropdown
  };

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    if (savedFilters) {
      setSearchQuery(savedFilters.searchQuery);
      setFilterType(savedFilters.filterType);
      setMinPrice(savedFilters.minPrice);
      setMaxPrice(savedFilters.maxPrice);
      setMinBedrooms(savedFilters.minBedrooms);
      setMinBathrooms(savedFilters.minBathrooms);
      setMoveInMonth(savedFilters.moveInMonth);
      setMoveOutMonth(savedFilters.moveOutMonth);
      // set any other filters
    }
  }, []);
  
  

  const isWithinPriceRange = (price, min, max) => {
    const priceVal = parseInt(price, 10);
    const minVal = min !== '' ? parseInt(min, 10) : 0;
    const maxVal = max !== '' ? parseInt(max, 10) : Infinity;
    return priceVal >= minVal && priceVal <= maxVal;
  };

  const filteredListings = mockListings.filter(listing => {
    const universityMatch = !selectedUniversity || listing.nearestUniversity === selectedUniversity;
    const textMatch = !searchQuery || listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const typeMatch = !filterType || listing.propertyType === filterType;
    
    let priceMatch = true;
    if (listing.propertyType === 'Full Property') {
      priceMatch = isWithinPriceRange(listing.price, minPrice, maxPrice);
    } else if (listing.propertyType === 'Individual Room') {
      priceMatch = listing.availableBedrooms.some(room => 
        isWithinPriceRange(room.rent, minPrice, maxPrice)
      );
    }

    const bedroomsMatch = !minBedrooms || (listing.propertyType === 'Individual Room' ? 
    listing.totalBedrooms >= parseInt(minBedrooms, 10) : 
    listing.bedrooms >= parseInt(minBedrooms, 10));
    const bathroomsMatch = !minBathrooms || listing.bathrooms >= parseInt(minBathrooms, 10);
    const moveInMonthMatch = !moveInMonth || listing.leaseStartDate.includes(moveInMonth);
    const moveOutMonthMatch = !moveOutMonth || listing.leaseEndDate.includes(moveOutMonth);
    const petsMatch = !hasPets || listing.pets === 'Yes';
    const laundryMatch = !hasLaundry || listing.laundry === 'In Unit' || listing.laundry === 'Shared';
    const airConditioningMatch = !hasAirConditioning || listing.airConditioning === 'Yes';
    const heatingMatch = !hasHeating || listing.heating === 'Yes';
    const parkingMatch = !hasParking || listing.parking === 'Yes' || listing.parking === 'With Additional Fee';

    return universityMatch &&
           textMatch &&
           typeMatch &&
           priceMatch &&
           bedroomsMatch &&
           bathroomsMatch &&
           moveInMonthMatch &&
           moveOutMonthMatch&&
           petsMatch && 
           laundryMatch && 
           airConditioningMatch && 
           heatingMatch && 
           parkingMatch;
  });

  return (
    <div className="listings-page" style={backgroundStyle}>
      <header className="listings-page-header">
        <h1>{headerText}</h1>
        <div className="header-controls">
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="university-filter-select"
          >
            <option value="">Select Your University!</option>
            <option value="University of Arizona">University of Arizona</option>
            <option value="Arizona State University">Arizona State University</option>
            <option value="Northern Arizona University">Northern Arizona University</option>
          </select>
          <Link to="/list-property" className="list-property-link">
            List Your Property!
          </Link>
        </div>
      </header>
      <section className="search-and-filter-section">
        <div className="filters">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-type-select"
          >
            <option value="">All Listings</option>
            <option value="Full Property">Full Properties</option>
            <option value="Individual Room">Individual Rooms</option>
          </select>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="price-range-input"
          />
          <input
            type="number"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            placeholder="Minimum Beds"
            className="bedrooms-range-input"
          />
          <input
            type="number"
            value={minBathrooms}
            onChange={(e) => setMinBathrooms(e.target.value)}
            placeholder="Minimum Baths"
            className="bathrooms-range-input"
          />
          <select
            value={moveInMonth}
            onChange={(e) => setMoveInMonth(e.target.value)}
            className="move-in-month-filter"
          >
            <option value="">Move-In Month</option>
           <option value="01">January</option>
           <option value="02">February</option>
           <option value="03">March</option>
           <option value="04">April</option>
           <option value="05">May</option>
           <option value="06">June</option>
           <option value="07">July</option>
           <option value="08">August</option>
           <option value="09">September</option>
           <option value="10">October</option>
           <option value="11">November</option>
           <option value="12">December</option>

          </select>
          <select
            value={moveOutMonth}
            onChange={(e) => setMoveOutMonth(e.target.value)}
            className="move-out-month-filter"
          >
            <option value="">Move-Out Month</option>
           <option value="01">January</option>
           <option value="02">February</option>
           <option value="03">March</option>
           <option value="04">April</option>
           <option value="05">May</option>
           <option value="06">June</option>
           <option value="07">July</option>
           <option value="08">August</option>
           <option value="09">September</option>
           <option value="10">October</option>
           <option value="11">November</option>
           <option value="12">December</option>

          </select>
          <div className="more-filters-container">
 <button onClick={toggleMoreFilters} className="filter-dropdown-btn">
   More
 </button>
 {showMoreFilters && (
   <div className={`filter-dropdown-content ${showMoreFilters ? 'show' : ''}`}>
     <label htmlFor="petsCheckbox">
       <input
         type="checkbox"
         id="petsCheckbox"
         checked={hasPets}
         onChange={(e) => setHasPets(e.target.checked)}
       />
       Pets allowed
     </label>
     <label htmlFor="laundryCheckbox">
       <input
         type="checkbox"
         id="laundryCheckbox"
         checked={hasLaundry}
         onChange={(e) => setHasLaundry(e.target.checked)}
       />
       Laundry
     </label>
     <label htmlFor="acCheckbox">
       <input
         type="checkbox"
         id="acCheckbox"
         checked={hasAirConditioning}
         onChange={(e) => setHasAirConditioning(e.target.checked)}
       />
       Air Conditioning
     </label>
     <label htmlFor="heatingCheckbox">
       <input
         type="checkbox"
         id="heatingCheckbox"
         checked={hasHeating}
         onChange={(e) => setHasHeating(e.target.checked)}
       />
       Heating
     </label>
     <label htmlFor="parkingCheckbox">
       <input
         type="checkbox"
         id="parkingCheckbox"
         checked={hasParking}
         onChange={(e) => setHasParking(e.target.checked)}
       />
       Parking
     </label>
     <div className="filter-button-container">
  <button className="apply-btn" onClick={applyFilters}>Apply</button>
  <button className="reset-btn" onClick={resetFilters}>Reset</button>
</div>

     </div>
        )}
     </div>
        </div>
      </section>
      <div className="listings-container">
        {filteredListings.map((listing) => (
          <div style={cardStyle} key={listing.id}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ListingsPage;
