import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "./api";

const useAssignLawyerPincode = () => {
  const [lawyerLoading, setlawyerLoading] = useState(false);
  const [lawyerError, setError] = useState(null);

  const assignPincodeToLawyer = async (selectedPincodes, user) => {
    if (selectedPincodes.length === 0) {
      alert("Please select at least one pincode to assign.");
      return;
    }

    setlawyerLoading(true);
    setError(null); // Clear any existing error

    try {
      const res = await axios.post(
        `${API_URL}/user/assign-pincode-to-lawyer/${user?._id}`,
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
