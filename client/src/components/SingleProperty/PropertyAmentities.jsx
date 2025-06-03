import React, { useEffect, useState } from "react";

export default function PropertyAmentities({ amenities }) {
  const amenitiesIcons = {
    Cafeteria: { title: "Cafeteria", icon: "fa-mug-saucer" },
    Gym: { title: "Gym", icon: "fa-dumbbell" },
    Intercom: { title: "Intercom", icon: "fa-phone-volume" },
    Lift: { title: "Lift", icon: "fa-elevator" },
    Parking: { title: "Parking", icon: "fa-car" },
    WaterStorage: { title: "Water Storage", icon: "fa-water" },
    centralAirCondition: {
      title: "Central Air Conditioning",
      icon: "fa-snowflake",
    },
    clubHouse: { title: "Club House", icon: "fa-users" },
    gasPipeline: { title: "Gas Pipeline", icon: "fa-burn" },
    gatedSociety: { title: "Gated Society", icon: "fa-door-closed" },
    maintenanceStaff: {
      title: "Maintenance Staff",
      icon: "fa-screwdriver-wrench",
    },
    privateGardenTerrace: {
      title: "Private Garden & Terrace",
      icon: "fa-seedling",
    },
    rainWaterHarvesting: {
      title: "Rain Water Harvesting",
      icon: "fa-cloud-rain",
    },
    securityFireAlarm: { title: "Security & Fire Alarm", icon: "fa-bell" },
    shoppingMall: { title: "Shopping Mall", icon: "fa-store" },
    sportsFacility: { title: "Sports Facility", icon: "fa-basketball-ball" },
    staffQuarter: { title: "Staff Quarter", icon: "fa-house-user" },
    streetLighting: { title: "Street Lighting", icon: "fa-lightbulb" },
    swimmingPool: { title: "Swimming Pool", icon: "fa-person-swimming" },
    vastuCompliant: { title: "Vastu Compliant", icon: "fa-yin-yang" },
    visitorParking: { title: "Visitor Parking", icon: "fa-square-parking" },
    wasteDisposal: { title: "Waste Disposal", icon: "fa-trash" },
    waterPurifier: { title: "Water Purifier", icon: "fa-faucet-drip" },
  };

  const [filteredAmenities, setFilteredAmenities] = useState([]);

  const fetchAmenities = () => {
    if (amenities) {
      const trueAmenities = Object.entries(amenities)
        .filter(([_, value]) => value === true) // Keep only true values
        .map(([key]) => key); // Extract only the amenity names

      setFilteredAmenities(trueAmenities);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [amenities]); // Run whenever `amenities` changes

  return (
    <div className="mt-14 border rounded-2xl p-4">
      <h4 className="text-lg font-semibold text-left mb-2">Amenities</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filteredAmenities.map((amenity, index) => (
          <div className="flex items-center gap-2" key={index}>
            <i
              className={`fa-solid ${amenitiesIcons[amenity]?.icon} text-lg`}
            ></i>
            <span className="self-baseline text-left">
              {amenitiesIcons[amenity]?.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
