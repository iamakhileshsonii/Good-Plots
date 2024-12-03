import React, { useState, useEffect } from "react";
import useKyc from "../../../../zustand/useKyc"; // Import the Zustand store
import { isFormComplete, validateField } from "../../../../utils/validation";

const AreaDetails = ({ data, nextStep }) => {
  const { updateFormData, formData } = useKyc(); // Access the updateFormData function from Zustand
  const [localData, setLocalData] = useState(data || "");
  const [errors, setErrors] = useState({});
  const [propertyArea, setPropertyArea] = useState({
    superArea: "",
    length: "",
    breadth: "",
    facing: "EAST", // Default value
    carpetArea: "",
    builtUpArea: "",
    yearOfConstruction: "",
    ageOfTheProperty: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

  //Check for existing values
  useEffect(() => {
    if (formData.areaDetails) {
      setPropertyArea(formData.areaDetails);
    }
  }, [formData.areaDetails]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isValid = validateField(
      value,
      fields.find((field) => field.name === name).type
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));

    const updatedArea = {
      ...propertyArea,
      [name]: value,
    };

    setPropertyArea(updatedArea);
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Optionally push updates immediately to Zustand
    updateFormData("areaDetails", updatedArea);
  };

  // Check form completion
  useEffect(() => {
    const checkCompletion = async () => {
      const complete = await isFormComplete(propertyArea);
      const hasErrors = Object.values(errors).some((error) => error);
      setIsFormFilled(complete && !hasErrors);
    };

    checkCompletion();
  }, [propertyArea, errors]);

  // Submit and push to Zustand
  const nextForm = async (e) => {
    console.log("Submitting Area Details: ", propertyArea);

    // Push the final data to Zustand
    updateFormData("areaDetails", propertyArea);

    nextStep(e); // Proceed to the next step
  };

  const fields = [
    { label: "Super Area", name: "superArea", type: "number" },
    { label: "Length", name: "length", type: "number" },
    { label: "Breadth", name: "breadth", type: "number" },
    {
      label: "Facing",
      name: "facing",
      type: "select",
      options: ["EAST", "WEST", "NORTH", "SOUTH"],
    },
    { label: "Carpet Area", name: "carpetArea", type: "number" },
    { label: "Built-Up Area", name: "builtUpArea", type: "number" },
    {
      label: "Year of Construction",
      name: "yearOfConstruction",
      type: "number",
    },
    { label: "Age of the Property", name: "ageOfTheProperty", type: "number" },
  ];

  return (
    <div className="">
      <h4 className="font-semibold text-lg text-center">Area Details</h4>
      <div className="flex justify-between flex-wrap gap-2 mt-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5 justify-evenly">
            <label className="text-sm font-semibold">{field.label}:</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={propertyArea[field.name]}
                onChange={handleInputChange}
                className={`p-1 text-sm rounded-md border-none bg-black ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
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
                className={`p-1 text-sm rounded-md border-none bg-black ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500 text-xs">
                Invalid {field.label}
              </span>
            )}
          </div>
        ))}
      </div>
      {isFormFilled ? (
        <div className="mt-4 text-center">
          <button
            onClick={nextForm}
            disabled={!isFormFilled}
            className={`w-8 h-8 text-sm text-white bg-red-dark rounded-full ${
              !isFormFilled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <i className="fa-solid fa-angle-right text-lg"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AreaDetails;
