import axios from "axios";
import React, { useState } from "react";

const useAssignBrokerPincode = () => {
  const [brokerloading, setBrokerLoading] = useState(false);
  const [brokerError, setBrokerError] = useState(null);

  const assignPincodeToBroker = async (selectedPincodes, user) => {
    if (selectedPincodes.length === 0) {
      alert("Please select at least one pincode to assign.");
      return;
    }

    setBrokerLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/user/assign-pincode-to-broker/${user?._id}`,
        { pincodes: selectedPincodes } // Assuming you need to send pincodes in the request body
      );
      setBrokerLoading(false);
      return res.data; // Return response if needed
    } catch (error) {
      setBrokerLoading(false);
      setBrokerError("Something went wrong while adding pincodes.");
      console.log(error);
    }
  };

  return { assignPincodeToBroker, brokerloading, brokerError };
};
export default useAssignBrokerPincode;
