import React, { useState } from "react";
import { validateField } from "../../../../utils/validation";

const ProximityDetails = ({ data }) => {
  const [localData, setLocalData] = useState(data || "");
  const [error, setError] = useState({});
  const [proximity, setProximity] = useState({
    market: "",
    interStateBusTerminal: "",
    srSecondarySchool: "",
    university: "",
    militaryContonment: "",
    fireStation: "",
    barAndRestaurants: "",
    shoppingMall: "",
    cinema: "",
    publicSwimmingPool: "",
    club: "",
    townPark: "",
    golfCourse: "",
    liquorShop: "",
  });

  // Fields for the area details with a shared options array
  const fields = [
    { label: "Market", name: "market", type: "select" },
    {
      label: "Inter State Bus Terminal",
      name: "interStateBusTerminal",
      type: "select",
    },
    { label: "Sr Secondary School", name: "srSecondarySchool", type: "select" },
    { label: "University", name: "university", type: "select" },
    {
      label: "Military Contonment",
      name: "militaryContonment",
      type: "select",
    },
    { label: "Fire Station", name: "fireStation", type: "select" },
    { label: "Bar And Restaurants", name: "barAndRestaurants", type: "select" },
    { label: "Shopping Mall", name: "shoppingMall", type: "select" },
    { label: "Cinema", name: "cinema", type: "select" },
    {
      label: "Public Swimming Pool",
      name: "publicSwimmingPool",
      type: "select",
    },
    { label: "Club", name: "club", type: "select" },
    { label: "Town Park", name: "townPark", type: "select" },
    { label: "Golf Course", name: "golfCourse", type: "select" },
    { label: "Liquor Shop", name: "liquorShop", type: "select" },
  ];

  // Shared options for all select fields
  const options = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isValidField = validateField(
      value,
      fields.find((field) => field.name === name).type
    );

    setError((prevError) => ({
      ...prevError,
      [name]: !isValidField,
    }));

    setProximity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h4 className="font-semibold text-lg text-center">Proximity Details</h4>

      <div className="flex justify-between flex-wrap gap-4 mt-4">
        {/* Loop through the fields and create input elements */}
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5">
            <label htmlFor={field.name} className="text-sm mb-1">
              {field.label}:
            </label>
            <select
              name={field.name}
              value={proximity[field.name]}
              id={field.name}
              className="p-2 text-sm rounded-md border bg-gray-100"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a value
              </option>
              {options.map((option) => (
                <option key={`${field.name}-option-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        {}
      </div>
    </div>
  );
};

export default ProximityDetails;
