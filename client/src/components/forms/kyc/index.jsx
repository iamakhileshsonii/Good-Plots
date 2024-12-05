// Index.js
import React from "react";
import AreaDetails from "./sections/AreaDetails";
import ProximityDetails from "./sections/ProximityDetails";
import PropertyCharges from "./sections/PropertyCharges";
import ParkingAndSociety from "./sections/ParkingAndSociety";
import useKyc from "../../../zustand/useKyc.js";
import Amenities from "./sections/Amenities.jsx";
import PropertyImages from "./sections/PropertyImages.jsx";

const Index = () => {
  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  const steps = [1, 2, 3, 4, 5, 6];

  const stepTitles = {
    1: "Area Details",
    2: "Proximity Details",
    3: "Property Charges",
    4: "Parking & Society",
    5: "Amenities",
    6: "Property Images",
  };

  function stepCount(step) {
    switch (step) {
      case 1:
        return <AreaDetails />;
      case 2:
        return <ProximityDetails />;
      case 3:
        return <PropertyCharges />;
      case 4:
        return <ParkingAndSociety />;
      case 5:
        return <Amenities />;
      case 6:
        return <PropertyImages />;
      default:
        return <AreaDetails />;
    }
  }

  const submitKycForm = async () => {
    console.log("Kyc form submitted", kycData);
  };

  return (
    <div className="m-2 p-5 w-full ">
      <div className="flex flex-col space-y-4">
        {/* Step Navigation */}
        <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
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
        <div className="border border-black p-2 rounded-lg ">
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

          {/* {currentStep === steps.length ? (
            <button
              className="w-20 h-8 text-sm text-white px-4 py-2 rounded-md bg-red-dark"
              onClick={submitKycForm}
            >
              Submit
            </button>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Index;
