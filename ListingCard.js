import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListingCard.css'; // Ensure this is the correct path to your CSS file

function ListingCard({ listing }) {
  let navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/listing/${listing.id}`);
  };

  const getPriceRange = (listing) => {
    if (listing.propertyType === 'Individual Room' && listing.availableBedrooms.length) {
      const openRooms = listing.availableBedrooms.filter(room => room.status === 'Open');
      const prices = openRooms.map(room => parseInt(room.rent, 10));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return prices.length > 1 ? `$${minPrice}-${maxPrice}/month` : `$${minPrice}/month`;
    }
    return `$${listing.price}/month`;
  };

  const priceRange = getPriceRange(listing);
  const firstImage = listing.propertyImages[0];

  return (
    <div className="card" onClick={goToDetailPage}>
      <div className="card-image">
        {firstImage && <img src={firstImage} alt={listing.title} />}
        <div className="property-type-label">
          {listing.propertyType === 'Full Property' ? 'Full Property' : 'Room'}
        </div>
      </div>
      <div className="card-content">
        <div className="card-price">{priceRange}</div>
        <h3 className="card-title">{listing.title}</h3>
        {listing.displayAddress === 'Yes' && <p className="card-address">{listing.address}</p>}
        <p className="card-description">{listing.description}</p>
      </div>
    </div>
  );
}

export default ListingCard;
