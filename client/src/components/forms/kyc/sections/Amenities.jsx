import React, { useState } from "react";

const Amenities = () => {
  const [amenities, setAmenities] = useState({
    gasPipeline: "",
    swimmingPool: "",
    Gym: "",
    Lift,
    gatedSociety,
    Parking,
    clubHouse: "",
    rainWaterHarvesting: "",
    Intercom: "",
    maintenanceStaff: "",
    vastuCompliant,
    securityFireAlarm: "",
    Cafeteria: "",
    sportsFacility: "",
    staffQuarter: "",
    waterPurifier: "",
    wasteDisposal: "",
    shoppingMall: "",
    visitorParking: "",
    WaterStorage: "",
    centralAirCondition: "",
    privateGardenTerrace: "",
    streetLighting: "",
  });
  return (
    <div className="">
      <h4 className="font-semibold text-lg text-center ">Amenities</h4>
      <div className="flex justify-between flex-wrap gap-2 mt-4">
        {/* Loop through the fields and create input elements */}
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5 justify-evenly">
            <label className="text-sm font-semibold">{field.label}:</label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={propertyArea[field.name]}
                onChange={handleInputChange}
                className="p-1 text-sm rounded-md border-none bg-black"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={propertyArea[field.name]}
                onChange={handleInputChange}
                className="p-1 text-sm rounded-md border-none bg-black"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
