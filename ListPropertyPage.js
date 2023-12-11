import React, { useState, useEffect } from 'react';
import './ListPropertyPage.css';

function ListPropertyPage() {
  const [propertyType, setPropertyType] = useState('Full Property');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [utilitiesIncluded, setUtilitiesIncluded] = useState('No');
  const [distanceToUniversity, setDistanceToUniversity] = useState('');
  const [amenities, setAmenities] = useState('');
  const [availableUnits, setAvailableUnits] = useState('');
  const [totalBedrooms, setTotalBedrooms] = useState(1);
  const [rooms, setRooms] = useState([{ size: '', status: 'Open', bathroom: 'Shared', image: null },]);
  const [displayAddress, setDisplayAddress] = useState('No');
  const [propertyImages, setPropertyImages] = useState([]);
  const [floorplanImages, setFloorplanImages] = useState([]);
  const [parkingIncluded, setParkingIncluded] = useState('No');
  const [leaseStartDate, setLeaseStartDate] = useState('');
  const [leaseEndDate, setLeaseEndDate] = useState('');
  const [petsAllowed, setPetsAllowed] = useState('No');
  const [airConditioning, setAirConditioning] = useState('No');
  const [heating, setHeating] = useState('No');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [unit, setUnit] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [displayEmail, setDisplayEmail] = useState('No');
  const [displayPhone, setDisplayPhone] = useState('No');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [nearestUniversity, setNearestUniversity] = useState('');
  const [customUniversity, setCustomUniversity] = useState('');
  const [laundry, setLaundry] = useState('');
  const [bedroomImage, setBedroomImage] = useState(null);

  
  useEffect(() => {
    // Initialize rooms with securityDeposit key and retain the sharedWith key
    setRooms(Array.from({ length: totalBedrooms }, (_, index) => ({
      size: '',
      status: 'Open',
      bathroom: 'Shared',
      rent: '',
      sharedWith: [],
      securityDeposit: '', // Added this to track security deposits for rooms
    })));
  }, [totalBedrooms]);

  const resetForm = () => {
    // Reset all state values to their initial states
    setPropertyType('Full Property');
    setTitle('');
    setDescription('');
    setPrice('');
    setUtilitiesIncluded('No');
    setDistanceToUniversity('');
    setAmenities('');
    setAvailableUnits('');
    setTotalBedrooms(1);
    setRooms([{ size: '', status: 'Open', bathroom: 'Shared' }]);
    setDisplayAddress('No');
    setPropertyImages([]);
    setFloorplanImages([]);
    setParkingIncluded('No');
    setLeaseStartDate('');
    setLeaseEndDate('');
    setPetsAllowed('No');
    setAirConditioning('No');
    setHeating('No');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setUnit('');
    setEmail('');
    setPhoneNumber('');
    setContactMessage('');
    setDisplayEmail('No');
    setDisplayPhone('No');
    setSecurityDeposit('');
    setBedrooms('');
    setBathrooms('');
    setNearestUniversity('');
    setCustomUniversity('');
    setLaundry('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      propertyType,
      title,
      description,
      price,
      utilitiesIncluded,
      distanceToUniversity,
      amenities: amenities.split(',').map(a => a.trim()),
      availableUnits,
      rooms: propertyType === 'Individual Room' ? rooms : [],
      email,
      phoneNumber,
      contactMessage,
      displayEmail,
      displayPhone,
      propertyImages,
      floorplanImages,
      parkingIncluded,
      leaseStartDate,
      leaseEndDate,
      petsAllowed,
      airConditioning,
      heating,
      securityDeposit
      
    };
    console.log(formData);
    // TODO: Implement your submission logic here
    resetForm();
  };

  const handleRoomChange = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], [field]: value };
    setRooms(newRooms);
  };

  const handleRoomImageChange = (index, file) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], image: file };
    setRooms(updatedRooms);
  };

  const handleBedroomImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setBedroomImage(file);
    }
  };

  const handleTotalBedroomsChange = (e) => {
    const newTotal = Math.max(1, Math.min(20, Number(e.target.value)));
    setTotalBedrooms(newTotal);
  };

  const handleUtilitiesChange = (value) => {
    setUtilitiesIncluded(value);
  };

  const handleDisplayAddressChange = (value) => {
    setDisplayAddress(value);
  };

  const handlePropertyImagesChange = (e) => {
    // Create a new array with old files plus the new ones
    setPropertyImages([...propertyImages, ...Array.from(e.target.files)]);
  };

  const handleFloorplanImagesChange = (e) => {
    // Append new files to the existing files
    setFloorplanImages([...floorplanImages, ...Array.from(e.target.files)]);
  };

  const handleParkingChange = (e) => {
    setParkingIncluded(e.target.value);
  };

  const handleRoomStatusChange = (index, value) => {
    const updatedRooms = rooms.map((room, roomIndex) =>
      roomIndex === index ? { ...room, status: value, rent: value === 'Full' ? 'N/A' : room.rent } : room
    );
    setRooms(updatedRooms);
  };
  
  const handleRoomRentChange = (index, value) => {
    const updatedRooms = rooms.map((room, roomIndex) =>
      roomIndex === index ? { ...room, rent: value } : room
    );
    setRooms(updatedRooms);
  };

  const handleSharedBathroomCheckbox = (currentRoomIndex, targetRoomIndex) => {
    setRooms(rooms.map((room, index) => {
      if (index === currentRoomIndex) {
        const sharedWithUpdated = room.sharedWith.includes(targetRoomIndex)
          ? room.sharedWith.filter(idx => idx !== targetRoomIndex)
          : [...room.sharedWith, targetRoomIndex];
        return { ...room, sharedWith: sharedWithUpdated };
      }
      return room;
    }));
  };
  const handleSharedWithChange = (index, roomIndexToShareWith) => {
    setRooms(rooms.map((room, idx) => {
      if (idx === index) {
        const isAlreadyShared = room.sharedWith.includes(roomIndexToShareWith);
        return {
          ...room,
          sharedWith: isAlreadyShared
            ? room.sharedWith.filter(num => num !== roomIndexToShareWith)
            : [...room.sharedWith, roomIndexToShareWith],
          bathroom: 'Shared',
        };
      }
      return room;
    }));
  };

  const handleBathroomTypeChange = (index, value) => {
    setRooms(rooms.map((room, idx) => {
      if (idx === index) {
        return {
          ...room,
          bathroom: value,
          sharedWith: value === 'Private' ? [] : room.sharedWith
        };
      }
      return room;
    }));
  };
  


  return (
    <div className="list-property-page">
      <h1>List Your Property</h1>
      <form onSubmit={handleSubmit} className="list-property-form">

        <div className="list-property-form-group">
          <p>Are you listing an entire property or individual room(s)?</p>
          <label>Property Type:</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="Full Property">Full Property</option>
            <option value="Individual Room">Room by Room</option>
          </select>
        </div>

        <div className="list-property-form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
           placeholder="Ex: Modern 2-BR Apartment Downtown" />
        </div>

        <div className="list-property-form-group">
          <label>Description: (max 500 characters)</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} 
          placeholder="Ex: A large house with a shared kitchen, living area, and garden."/>
          <div className="character-count">{description.length} / 500</div>
        </div>

        {propertyType === 'Full Property' && (
        <>
          <div className="list-property-form-group">
            <label>Number of Bedrooms:</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="Enter number of bedrooms"
            />
          </div>
          <div className="list-property-form-group">
            <label>Number of Bathrooms:</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="Enter number of bathrooms"
            />
          </div>
        </>
      )}

        {propertyType === 'Full Property' && (
          <div className="list-property-form-group">
            <label>Monthly Rent:</label>
            <div className="input-with-dollar-sign">
              <input
                type="text"
                className="rent-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                maxLength="10"
              />
            </div>
          </div>
        )}

        <div className="list-property-form-group">
          <label>Utilities Included in Rent?</label>
          <div className="utilities-included-container">
            <label htmlFor="utilities-yes">
              <input type="radio" id="utilities-yes" name="utilities" value="Yes" checked={utilitiesIncluded === 'Yes'} onChange={() => handleUtilitiesChange('Yes')} />
              Yes
            </label>
            <label htmlFor="utilities-no">
              <input type="radio" id="utilities-no" name="utilities" value="No" checked={utilitiesIncluded === 'No'} onChange={() => handleUtilitiesChange('No')} />
              No
            </label>
          </div>
        </div>

        {propertyType === 'Full Property' && (
        <div className="list-property-form-group">
          <label htmlFor="security-deposit">Security Deposit:</label>
          <div className="input-with-dollar-sign">
            <input 
              type="number" 
              id="security-deposit"
              className="rent-input"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              placeholder="Enter security deposit for the property"
            />
          </div>
        </div>
      )}

<div className="list-property-form-group">
  <label>Nearest University:</label>
  <select
    value={nearestUniversity}
    onChange={(e) => setNearestUniversity(e.target.value)}
  >
    <option value="">Select University</option>
    <option value="University of Arizona">University of Arizona</option>
    <option value="Arizona State University">Arizona State University</option>
    <option value="Northern Arizona University">Northern Arizona University</option>
    <option value="Other">Other</option>
  </select>

  {nearestUniversity === 'Other' && (
    <input
      type="text"
      value={customUniversity}
      onChange={(e) => setCustomUniversity(e.target.value)}
      placeholder="Type the university name"
    />
  )}
</div>


        <div className="list-property-form-group">
          <label>Distance to University (Miles):</label>
          <input type="text" value={distanceToUniversity} onChange={(e) => setDistanceToUniversity(e.target.value)} 
          placeholder="Ex: 1.7"/>
        </div>

        <div className="list-property-form-group">
          <label>Parking Included:</label>
          <select value={parkingIncluded} onChange={handleParkingChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="With additional fee">With additional fee</option>
          </select>
        </div>


      <div className="list-property-form-group">
        <label>Laundry:</label>
        <select
          value={laundry}
          onChange={(e) => setLaundry(e.target.value)}
        >
          <option value="">Select Laundry Option</option>
          <option value="In Unit">In Unit</option>
          <option value="Shared">Shared</option>
          <option value="None">None</option>
        </select>
      </div>

        <div className="list-property-form-group">
          <label>Pets Allowed:</label>
          <select value={petsAllowed} onChange={(e) => setPetsAllowed(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Discuss with owner">Discuss with owner</option>
          </select>
        </div>

        <div className="list-property-form-group">
          <label>Air Conditioning:</label>
          <select value={airConditioning} onChange={(e) => setAirConditioning(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="list-property-form-group">
          <label>Heating:</label>
          <select value={heating} onChange={(e) => setHeating(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="list-property-form-group">
          <label>Amenities (comma separated):</label>
          <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} 
          placeholder="Ex: Private Yard, Garage, Fireplace"/>
        </div>

        <div className="list-property-form-group">
          <label>Address:</label>
          <input 
            type="text" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)} 
            placeholder="Street Address"
          />
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="City"
          />
          <input 
            type="text" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            placeholder="State"
          />
          <input 
            type="text" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
            placeholder="ZIP Code"
          />
          <input 
            type="text" 
            value={unit} 
            onChange={(e) => setUnit(e.target.value)} 
            placeholder="Unit # (optional)"
          />
        </div>

        <div className="list-property-form-group">
          <label>Display Address in Listing?</label>
          <div className="utilities-included-container">
            <label htmlFor="display-address-yes">
              <input 
                type="radio" 
                id="display-address-yes" 
                name="display-address" 
                value="Yes" 
                checked={displayAddress === 'Yes'} 
                onChange={() => handleDisplayAddressChange('Yes')} 
              />
              Yes
            </label>
            <label htmlFor="display-address-no">
              <input 
                type="radio" 
                id="display-address-no" 
                name="display-address" 
                value="No" 
                checked={displayAddress === 'No'} 
                onChange={() => handleDisplayAddressChange('No')} 
              />
              No
            </label>
          </div>
        </div>

        <div className="list-property-form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email address"
          />
        </div>

        <div className="list-property-form-group">
          <label>Display Email in Listing?</label>
          <div className="utilities-included-container">
            <label htmlFor="display-email-yes">
              <input 
                type="radio" 
                id="display-email-yes" 
                name="display-email" 
                value="Yes" 
                checked={displayEmail === 'Yes'} 
                onChange={() => setDisplayEmail('Yes')} 
              />
              Yes
            </label>
            <label htmlFor="display-email-no">
              <input 
                type="radio" 
                id="display-email-no" 
                name="display-email" 
                value="No" 
                checked={displayEmail === 'No'} 
                onChange={() => setDisplayEmail('No')} 
              />
              No
            </label>
          </div>
        </div>

        <div className="list-property-form-group">
          <label>Phone Number:</label>
          <input 
            type="tel" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            placeholder="Enter phone number"
          />
        </div>

        <div className="list-property-form-group">
          <label>Display Phone Number in Listing?</label>
          <div className="utilities-included-container">
            <label htmlFor="display-phone-yes">
              <input 
                type="radio" 
                id="display-phone-yes" 
                name="display-phone" 
                value="Yes" 
                checked={displayPhone === 'Yes'} 
                onChange={() => setDisplayPhone('Yes')} 
              />
              Yes
            </label>
            <label htmlFor="display-phone-no">
              <input 
                type="radio" 
                id="display-phone-no" 
                name="display-phone" 
                value="No" 
                checked={displayPhone === 'No'} 
                onChange={() => setDisplayPhone('No')} 
              />
              No
            </label>
          </div>
        </div>

        <div className="list-property-form-group">
          <label>Contact Message:</label>
          <textarea 
            value={contactMessage} 
            onChange={(e) => setContactMessage(e.target.value)} 
            placeholder="Please write a short descriptive message with your preferred method of contact."
          />
        </div>

        <div className="list-property-form-group">
          <label>Lease Start Date:</label>
          <input 
            type="date" 
            value={leaseStartDate} 
            onChange={(e) => setLeaseStartDate(e.target.value)}
          />
        </div>

        <div className="list-property-form-group">
          <label>Lease End Date:</label>
          <input 
            type="date" 
            value={leaseEndDate} 
            onChange={(e) => setLeaseEndDate(e.target.value)}
          />
        </div>

        <div className="list-property-form-group">
          <label>Available Units:</label>
          <input type="number" value={availableUnits} onChange={(e) => setAvailableUnits(e.target.value)}
           placeholder="If listing only a single unit put 1, if listing more than 1 IDENTICAL unit put the amount you want to list." />
        </div>

        {propertyType === 'Individual Room' && (
          <div className="list-property-form-group">
            <p>
              To ensure prospective tenants have a good understanding of the property, we ask that 
              you list all rooms in the property. You will be asked to label which rooms are available 
              to rent, and which are filled along with if the bedrooms assigned bathroom is shared 
              with occupants of other bedrooms.
            </p>
            <label>Total Bedrooms in Property:</label>
            <input 
              type="number" 
              value={totalBedrooms} 
              onChange={handleTotalBedroomsChange}
              min="1" 
              max="20" 
            />
          </div>
        )}

{propertyType === 'Individual Room' && rooms.map((room, index) => (
  <div key={index} className="room-details">
    <h3>Bedroom {index + 1}</h3>
    
    {/* Room Status */}
    <div className="list-property-form-group">
      <label htmlFor={`room-status-${index}`}>Room Status:</label>
      <select 
        id={`room-status-${index}`}
        value={room.status} 
        onChange={(e) => handleRoomStatusChange(index, e.target.value)}
      >
        <option value="Open">Open</option>
        <option value="Full">Full</option>
      </select>
    </div>

    {/* Monthly Rent - only show if room is not full */}
    {room.status !== 'Full' && (
      <div className="list-property-form-group">
        <label htmlFor={`room-rent-${index}`}>Monthly Rent:</label>
        <input 
          type="number" 
          id={`room-rent-${index}`}
          value={room.rent || ''} // if room.rent is 'N/A', this will reset it to an empty string for editing
          onChange={(e) => handleRoomRentChange(index, e.target.value)}
          placeholder="Enter monthly rent"
        />
      </div>
    )}

{room.status === 'Open' && (
  <>
    <div className="list-property-form-group">
      <label htmlFor={`room-security-deposit-${index}`}>Security Deposit for Room {index + 1}:</label>
      <input 
        type="number" 
        id={`room-security-deposit-${index}`}
        value={room.securityDeposit} 
        onChange={(e) => handleRoomChange(index, 'securityDeposit', e.target.value)}
        placeholder="Enter security deposit for this room"
      />
    </div>
    <div className="list-property-form-group">
  <label>Image for Bedroom:</label>
  <input 
    type="file" 
    onChange={handleBedroomImageChange}
    accept="image/*" 
  />
  {bedroomImage && (
    <img 
      src={URL.createObjectURL(bedroomImage)}
      alt="Bedroom Preview"
      style={{ width: '100px', height: '100px' }} // Adjust the size as needed
    />
  )}
</div>
  </>
)}

    

<div className="list-property-form-group">
    <label htmlFor={`room-bathroom-${index}`}>Bathroom:</label>
    <select 
      id={`room-bathroom-${index}`}
      value={room.bathroom} 
      onChange={(e) => handleBathroomTypeChange(index, e.target.value)}
    >
      <option value="Shared">Shared</option>
      <option value="Private">Private</option>
    </select>
  </div>

  {room.bathroom === 'Shared' && (
  <div className="list-property-form-group">
    <label>Select bedrooms this bedroom shares its bathroom with:</label>
    {rooms.map((_, idx) => {
      if (index !== idx) { // Don't list the current room
        return (
          <div key={idx} className="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                checked={room.sharedWith.includes(idx)}
                onChange={() => handleSharedBathroomCheckbox(index, idx)}
              /> 
              Bedroom {idx + 1}
            </label>
          </div>
        );
      }
      return null;
    })}
  </div>
  )}


    {/* Room Size */}
    <div className="list-property-form-group">
      <label htmlFor={`room-size-${index}`}>Room Size (Square Feet):</label>
      <input 
        type="number" 
        id={`room-size-${index}`}
        value={room.size} 
        onChange={(e) => handleRoomChange(index, 'size', e.target.value)}
      />
    </div>
  </div>
))} 

<div className="list-property-form-group">
  <label>Property Images (max 50):</label>
  <p className="image-upload-instructions">Upload up to 50 images, ensure the first one uploaded is the one you would like to see displayed on your listing card.</p>
  <input 
    type="file" 
    multiple 
    onChange={handlePropertyImagesChange}
    accept="image/*"
  />
  <div className="image-preview-container">
    {propertyImages.map((file, index) => (
      <img 
        key={index}
        src={URL.createObjectURL(file)}
        alt={`Property Preview ${index}`}
        style={{ width: '100px', height: '100px' }} // Set a size for the preview images
      />
    ))}
  </div>
</div>

<div className="list-property-form-group">
  <label>Floorplan Images (max 10):</label>
  <p className="image-upload-instructions">Please ensure the floorplan images are properly labeled. If listing each room individually, ensure bedroom numbers match the numerical assignments you gave above.</p>
  <input 
    type="file" 
    multiple 
    onChange={handleFloorplanImagesChange}
    accept="image/*"
  />
  <div className="image-preview-container">
    {floorplanImages.map((file, index) => (
      <img 
        key={index}
        src={URL.createObjectURL(file)}
        alt={`Floorplan Preview ${index}`}
        style={{ width: '100px', height: '100px' }} // Set a size for the preview images
      />
    ))}
  </div>
</div>

        <div className="button-container">
          <button type="submit" className="submit-btn">
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
}

export default ListPropertyPage;
