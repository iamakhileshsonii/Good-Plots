import React, { useEffect, useState } from "react";
import useKyc from "../../../../zustand/useKyc";
import { isFormComplete } from "../../../../utils/validation";

const PropertyCharges = () => {
  const { updateKycFormData, nextStep, kycData } = useKyc();
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [formData, setFormData] = useState(
    kycData.propertyCharges || {
      expectedRent: "",
      securityAmount: "",
      priceIncludes: "",
      otherCharges: "",
      maintenanceCharges: "",
      brokerage: "",
    }
  );

  //Check is the form is completed
  useEffect(() => {
    const checkFormCompletion = async () => {
      const complete = await isFormComplete(formData);
      const error = Object.values(errors).some((error) => error);
      setIsFormFilled(complete && !error);
    };

    checkFormCompletion();
  }, [formData]);

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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Next Form
  const nextForm = async (e) => {
    updateKycFormData("propertyCharges", formData);
    nextStep(e); // Proceed to the next step
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
              value={formData[field.name]}
              onChange={handleInputChange}
              className="p-1 text-sm rounded-md border-none bg-black"
            />
          </div>
        ))}
      </div>
      {isFormFilled ? (
        <div className="flex justify-end">
          <button
            className="w-20 h-8 text-sm text-white px-4 py-2 rounded-md bg-red-dark my-5"
            onClick={nextForm}
          >
            Next Step
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PropertyCharges;
