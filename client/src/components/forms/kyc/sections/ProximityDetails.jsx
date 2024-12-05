import React, { useEffect, useState } from "react";
import { isFormComplete, validateField } from "../../../../utils/validation";
import useKyc from "../../../../zustand/useKyc";

const ProximityDetails = ({ data }) => {
  const { updateKycFormData, nextStep, kycData } = useKyc();
  const [localData, setLocalData] = useState(data || "");
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formData, setFormData] = useState(
    kycData.proximityDetails || {
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

    setErrors((prevError) => ({
      ...prevError,
      [name]: !isValidField,
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Next Form
  const nextForm = async (e) => {
    updateKycFormData("proximityDetails", formData);
    nextStep(e); // Proceed to the next step
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
              value={formData[field.name]}
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

export default ProximityDetails;
