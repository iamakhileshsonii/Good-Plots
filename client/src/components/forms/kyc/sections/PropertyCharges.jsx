import React, { useState } from "react";

const PropertyCharges = () => {
  // State for property area details
  const [propertyCharges, setPropertyCharges] = useState({
    expectedRent: "",
    securityAmount: "",
    priceIncludes: "",
    otherCharges: "",
    maintenanceCharges: "",
    brokerage: "",
  });

  // Fields for the area details
  const fields = [
    { label: "Expected Rent", name: "expectedRent", type: "number" },
    { label: "Security", name: "securityAmount", type: "number" },
    { label: "Price Includes", name: "priceIncludes", type: "number" },

    { label: "Other Charges", name: "otherCharges", type: "number" },
    { label: "Maintenance", name: "maintenanceCharges", type: "number" },

    { label: "Brokerage", name: "brokerage", type: "number" },
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyCharges((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <h4 className="font-semibold text-lg text-center ">Property Charges</h4>

      <div className="flex justify-between flex-wrap gap-2 mt-4">
        {/* Loop through the fields and create input elements */}
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5 justify-evenly">
            <label className="text-sm">{field.label}:</label>

            <input
              type={field.type}
              name={field.name}
              value={propertyCharges[field.name]}
              onChange={handleInputChange}
              className="p-1 text-sm rounded-md border-none bg-black"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCharges;
