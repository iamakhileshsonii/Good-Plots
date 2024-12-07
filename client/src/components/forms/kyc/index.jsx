// Index.js
import React, { useState } from "react";
import { useParams } from "react-router";
import AreaDetails from "./sections/AreaDetails";
import ProximityDetails from "./sections/ProximityDetails";
import PropertyCharges from "./sections/PropertyCharges";
import ParkingAndSociety from "./sections/ParkingAndSociety";
import useKyc from "../../../zustand/useKyc.js";
import Amenities from "./sections/Amenities.jsx";
import PropertyImages from "./sections/PropertyImages.jsx";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const propertyId = params.params;
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
        return (
          <PropertyImages setLoading={setLoading} propertyId={propertyId} />
        );
      default:
        return <AreaDetails />;
    }
  }

  const submitKycForm = async () => {
    console.log("Kyc form submitted", kycData);
  };
  if (loading) {
    return (
      <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

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
