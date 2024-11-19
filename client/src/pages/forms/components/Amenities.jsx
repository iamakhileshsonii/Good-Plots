import React, { useState, useEffect } from "react";

const Amenities = ({ amenities, setAmenities }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    // Update the amenities state with selected amenities separated by commas
    setAmenities(selectedAmenities.join(", "));
  }, [selectedAmenities, setAmenities]);

  const handleCheckboxChange = (option) => {
    if (selectedAmenities.includes(option)) {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== option));
    } else {
      setSelectedAmenities([...selectedAmenities, option]);
    }
  };

  const amenitiesOptions = [
    "Gas pipeline",
    "Swimming pool",
    "Gym",
    "Lift",
    "Gated Society",
    "Parking",
    "Club House",
    "Rain Water Harvesting",
    "Intercom",
    "Maintenance Staff",
    "Vastu Compliant",
    "Security/ Fire Alarm",
    "Cafeteria",
    "Sports Facility",
    "Staff Quarter",
    "Water Purifier",
    "Waste Disposal",
    "Shopping Mall",
    "Visitor parking",
    "Water Storage",
    "Central Air Condition",
    "Private Garden/ Terrace",
    "Street Lighting",
  ];

  return (
    <div>
      <h6 className="font-semibold mt-5">Amenities</h6>
      <div className="flex flex-wrap">
        {amenitiesOptions.map((option, index) => (
          <div key={index} className="flex items-center me-4 mb-2">
            <input
              id={`checkbox-${index}`}
              type="checkbox"
              value={option}
              checked={selectedAmenities.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`checkbox-${index}`}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
