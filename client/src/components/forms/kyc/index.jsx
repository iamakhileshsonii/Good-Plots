// Index.js
import React from "react";
import AreaDetails from "./sections/AreaDetails";
import ProximityDetails from "./sections/ProximityDetails";
import PropertyCharges from "./sections/PropertyCharges";
import ParkingAndSociety from "./sections/ParkingAndSociety";
import useKyc from "../../../zustand/useKyc.js";

const Index = () => {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    submitKycForm,
  } = useKyc(); // Access state and actions from the store

  const steps = [1, 2, 3, 4];

  const stepTitles = {
    1: "Area Details",
    2: "Proximity Details",
    3: "Property Charges",
    4: "Parking & Society",
  };

  function stepCount(step) {
    switch (step) {
      case 1:
        return (
          <AreaDetails
            data={formData.areaDetails}
            updateData={(data) => updateFormData("areaDetails", data)}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <ProximityDetails
            data={formData.proximityDetails}
            updateData={(data) => updateFormData("proximityDetails", data)}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <PropertyCharges
            data={formData.propertyCharges}
            updateData={(data) => updateFormData("propertyCharges", data)}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <ParkingAndSociety
            data={formData.parkingAndSociety}
            updateData={(data) => updateFormData("parkingAndSociety", data)}
            nextStep={nextStep}
          />
        );
      default:
        return (
          <AreaDetails
            data={formData.areaDetails}
            updateData={(data) => updateFormData("areaDetails", data)}
            nextStep={nextStep}
          />
        );
    }
  }

  return (
    <div className="m-2 p-5 w-1/3">
      <div className="flex flex-col space-y-4">
        {/* Step Navigation */}
        <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          {steps.map((step) => (
            <li
              className={`flex items-center text-sm space-x-2.5 rtl:space-x-reverse ${
                currentStep === step ? "text-black-dark " : "text-gray-500"
              }`}
              key={`kyc-form-step-${step}`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${
                  currentStep === step
                    ? "text-white font-semibold bg-red-dark "
                    : "text-black "
                }`}
              >
                {step}
              </span>
              <span>
                <h3 className="font-medium leading-tight">
                  {stepTitles[step]}
                </h3>
              </span>
            </li>
          ))}
        </ol>

        {/* Step Content */}
        <div className="border border-black p-2 rounded-lg">
          {stepCount(currentStep)}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4 items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="w-8 h-8 text-sm text-white bg-red-dark rounded-full disabled:invisible"
          >
            <i class="fa-solid fa-angle-left text-lg"></i>
          </button>

          {currentStep === steps.length ? (
            <button
              className="w-20 h-8 text-sm text-white px-4 py-2 rounded-md bg-red-dark"
              onClick={submitKycForm}
            >
              Submit
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
