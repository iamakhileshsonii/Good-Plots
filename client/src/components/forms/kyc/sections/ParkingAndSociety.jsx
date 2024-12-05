import React, { useState, useEffect } from "react";
import useKyc from "../../../../zustand/useKyc";
import { isFormComplete } from "../../../../utils/validation";

const ParkingAndSociety = () => {
  const { nextStep, kycData, updateKycFormData } = useKyc();
  const [errors, setErrors] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formData, setFormData] = useState(
    kycData.parkingAndSociety || {
      reservedParking: "",
      coveredParking: "",
      openParking: "",
      whetherInCooperativeSociety: "",
      whetherInGatedComplex: "",
      isThisCornerHouse: "",
    }
  );

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
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Open Parking",
      name: "openParking",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Whether In Cooperative Society",
      name: "whetherInCooperativeSociety",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Whether In Gated Complex",
      name: "whetherInGatedComplex",
      type: "select",
      options: ["yes", "no"],
    },
    {
      label: "Is This Corner House",
      name: "isThisCornerHouse",
      type: "select",
      options: ["yes", "no"],
    },
  ];

  //Check is the form is completed
  useEffect(() => {
    const checkFormCompletion = async () => {
      const complete = await isFormComplete(formData);
      const error = Object.values(errors).some((error) => error);
      setIsFormFilled(complete && !error);
    };

    checkFormCompletion();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Next Form
  const nextForm = async (e) => {
    updateKycFormData("parkingAndSociety", formData);
    nextStep(e); // Proceed to the next step
  };
  return (
    <div>
      <h4 className="font-semibold text-lg text-center ">
        Parking & Society Details
      </h4>

      <div className="flex justify-between flex-wrap gap-2 mt-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col w-2/5 justify-evenly">
            <label className="text-sm">{field.label}:</label>
            <select
              name={field.name}
              value={formData[field.name]}
              id={field.name}
              className="p-1 text-sm rounded-md border-none bg-black"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select
              </option>
              {field.options.map((option) => (
                <option key={`${field.name}-option-${option}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <span className="text-red-500 text-xs">
                Invalid {field.label}
              </span>
            )}
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

export default ParkingAndSociety;
