import useKyc from "@/context/useKyc";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AreaDetails from "./subForms/AreaDetails";
import { Card } from "../ui/card";
import Proximity from "./subForms/Proximity";
import PropertyCharges from "./subForms/PropertyCharges";
import Amenities from "./subForms/Amenities";
import SocietyAndParking from "./subForms/Society&Parking";
import PropertyImages from "./subForms/PropertyImages";
import KycFormSuccess from "./subForms/KycFormSucess";

const index = () => {
  const [loading, setLoading] = useState(false);

  const {
    updateKycFormData,
    kycData,
    currentStep,
    nextStep,
    prevStep,
    submitKyc,
  } = useKyc();

  function stepCount(currentStep) {
    switch (currentStep) {
      case 1:
        return <AreaDetails />;
      case 2:
        return <PropertyCharges />;
      case 3:
        return <SocietyAndParking />;
      case 4:
        return <Proximity />;
      case 5:
        return <Amenities />;
      case 6:
        return <PropertyImages />;

      default:
        break;
    }
  }

  return (
    <div>
      <h1 className="font-semibold">KYC FOR </h1>

      <Card>
        <div className="border">{stepCount(currentStep)}</div>
      </Card>
    </div>
  );
};

export default index;
