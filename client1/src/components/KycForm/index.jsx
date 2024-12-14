import useKyc from "@/context/useKyc";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AreaDetails from "./subForms/AreaDetails";
import { Card } from "../ui/card";
import Proximity from "./subForms/Proximity";
import PropertyCharges from "./subForms/PropertyCharges";
import Amenities from "./subForms/Amenities";

const index = () => {
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

  console.log("KYC PROPERTY: ", propertyId);

  return (
    <div>
      <h1 className="font-semibold">KYC FORM</h1>
      <Card>
        <h4 className="font-semibold">AREA DETAILS</h4>
        <AreaDetails />
      </Card>

      <Card>
        <h4 className="font-semibold">PROXIMITY</h4>
        <Proximity />
      </Card>
      <Card>
        <h4 className="font-semibold">PROPERTY CHARGES</h4>
        <PropertyCharges />
      </Card>
      <Card>
        <h4 className="font-semibold">AMENITIES</h4>
        <Amenities />
      </Card>
    </div>
  );
};

export default index;
