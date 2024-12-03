import React, { useState } from "react";

const ParkingAndSociety = () => {
  const [parkingAndSociety, setParkingAndSociety] = useState({
    reservedParking: "",
    coveredParking: "",
    openParking: "",
    whetherInCooperativeSociety: "",
    whetherInGatedComplex: "",
    isThisCornerHouse: "",
  });

  // Fields for the area details
  const fields = [
    {
      label: "Reserved Parking",
      name: "reservedParking",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Covered Parking",
      name: "coveredParking",
      type: "text",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Open Parking",
      name: "openParking",
      type: "text",
      type: "select",
      options: ["yes", "no"],
    },

    {
      label: "Whether In Co-opertaive Society",
      name: "whetherInCooperativeSociety",
      type: "text",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Whether In Gated Complex",
      name: "whetherInGatedComplex",
      type: "text",
      type: "select",
      options: ["yes", "no"],
    },

    {
      label: "Is This Corener House",
      name: "isThisCornerHouse",
      type: "text",
      type: "select",
      options: ["yes", "no"],
    },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParkingAndSociety((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <h4 className="font-semibold text-lg text-center ">
        Parking & Society Details
      </h4>

      <div className="flex justify-between flex-wrap gap-2 mt-4">
        {/* Loop through the fields and create input elements */}
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5 justify-evenly">
            <label className="text-sm">{field.label}:</label>

            <select
              name={field.name}
              value={field.value}
              id={field.name}
              className="p-1 text-sm rounded-md border-none bg-black"
            >
              {field.options.map((option) => (
                <option key={`${field.name}-option-${option}`}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingAndSociety;
