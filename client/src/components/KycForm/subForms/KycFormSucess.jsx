import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useKyc from "@/context/useKyc";

const KycFormSuccess = () => {
  const navigate = useNavigate();
  const { kycData } = useKyc();

  console.log("KYC FORM READY TO SUBMIT: ", kycData);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-background px-4">
      <div className="p-6 text-center bg-card rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600">
          KYC Submission Successful!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for submitting your KYC details. We will process your
          information and notify you shortly.
        </p>

        <div className="mt-6 space-x-4">
          <Button onClick={() => navigate("/account/verified-properties")}>
            My Verified Properties
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/account/publish-property")}
          >
            Publish a New Property
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KycFormSuccess;
