import React, { useState } from "react";
import useKyc from "../../../../zustand/useKyc";

const Amenities = () => {
  const { updateKycFormData, nextStep, kycData } = useKyc();

  console.log("KYC DATA: ", kycData);

  const [formData, setFormData] = useState(
    kycData.amenities || {
      gasPipeline: false,
      swimmingPool: false,
      Gym: false,
      Lift: false,
      gatedSociety: false,
      Parking: false,
      clubHouse: false,
      rainWaterHarvesting: false,
      Intercom: false,
      maintenanceStaff: false,
      vastuCompliant: false,
      securityFireAlarm: false,
      Cafeteria: false,
      sportsFacility: false,
      staffQuarter: false,
      waterPurifier: false,
      wasteDisposal: false,
      shoppingMall: false,
      visitorParking: false,
      WaterStorage: false,
      centralAirCondition: false,
      privateGardenTerrace: false,
      streetLighting: false,
    }
  );

  const fields = [
    { id: 1, title: "Gas Pipeline", name: "gasPipeline", type: "checkbox" },
    { id: 2, title: "Swimming Pool", name: "swimmingPool", type: "checkbox" },
    { id: 3, title: "Gym", name: "Gym", type: "checkbox" },
    { id: 4, title: "Lift", name: "Lift", type: "checkbox" },
    { id: 5, title: "Gated Society", name: "gatedSociety", type: "checkbox" },
    { id: 6, title: "Parking", name: "Parking", type: "checkbox" },
    { id: 7, title: "Club House", name: "clubHouse", type: "checkbox" },
    {
      id: 8,
      title: "Rain Water Harvesting",
      name: "rainWaterHarvesting",
      type: "checkbox",
    },
    { id: 9, title: "Intercom", name: "Intercom", type: "checkbox" },
    {
      id: 10,
      title: "Maintenance Staff",
      name: "maintenanceStaff",
      type: "checkbox",
    },
    {
      id: 11,
      title: "Vastu Compliant",
      name: "vastuCompliant",
      type: "checkbox",
    },
    {
      id: 12,
      title: "Security Fire Alarm",
      name: "securityFireAlarm",
      type: "checkbox",
    },
    { id: 13, title: "Cafeteria", name: "Cafeteria", type: "checkbox" },
    {
      id: 14,
      title: "Sports Facility",
      name: "sportsFacility",
      type: "checkbox",
    },
    { id: 15, title: "Staff Quarter", name: "staffQuarter", type: "checkbox" },
    {
      id: 16,
      title: "Water Purifier",
      name: "waterPurifier",
      type: "checkbox",
    },
    {
      id: 17,
      title: "Waste Disposal",
      name: "wasteDisposal",
      type: "checkbox",
    },
    { id: 18, title: "Shopping Mall", name: "shoppingMall", type: "checkbox" },
    {
      id: 19,
      title: "Visitor Parking",
      name: "visitorParking",
      type: "checkbox",
    },
    { id: 20, title: "Water Storage", name: "WaterStorage", type: "checkbox" },
    {
      id: 21,
      title: "Central Air Condition",
      name: "centralAirCondition",
      type: "checkbox",
    },
    {
      id: 22,
      title: "Private Garden/Terrace",
      name: "privateGardenTerrace",
      type: "checkbox",
    },
    {
      id: 23,
      title: "Street Lighting",
      name: "streetLighting",
      type: "checkbox",
    },
  ];

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Next Form
  const nextForm = async (e) => {
    updateKycFormData("amenities", formData);
    nextStep(e); // Proceed to the next step
  };

  return (
    <div>
      <h4 className="font-semibold text-lg text-center ">Amenities</h4>
      <div className="flex flex-wrap justify-start gap-2">
        {fields.map((field, index) => (
          <div className="flex items-center me-4" key={index}>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              checked={formData[field.name]}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleChange}
            />
            <label
              id={field.name}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {field.title}
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="w-20 h-8 text-sm text-white px-4 py-2 rounded-md bg-red-dark my-5"
          onClick={nextForm}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Amenities;
