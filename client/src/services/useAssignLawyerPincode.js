import axios from "axios";
import React, { useState } from "react";

const useAssignLawyerPincode = () => {
  const [lawyerLoading, setlawyerLoading] = useState(false);
  const [lawyerError, setError] = useState(null);

  const assignPincodeToLawyer = async (selectedPincodes, user) => {
    if (selectedPincodes.length === 0) {
      alert("Please select at least one pincode to assign.");
      return;
    }

    console.log("Frontend - Received Pincodes:", selectedPincodes);
    console.log("Frontend - User ID:", user?._id);
    setlawyerLoading(true);
    setError(null); // Clear any existing error

    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/user/assign-pincode-to-lawyer/${user?._id}`,
        { pincodes: selectedPincodes } // Sending as an object with 'pincodes' key
      );
      setlawyerLoading(false);
      return res.data;
    } catch (error) {
      setlawyerLoading(false);
      setError(error); // Capture error for further handling if needed
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  return { assignPincodeToLawyer, lawyerLoading, lawyerError };
};

export default useAssignLawyerPincode;
