import { useState } from "react";
import axios from "axios";

const useAssignNewPincode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assignPincode = async (selectedPincodes, user) => {
    if (selectedPincodes.length === 0) {
      alert("Please select at least one pincode to assign.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/user/assign-pincode/${user?._id}`,
        { pincodes: selectedPincodes } // Assuming you need to send pincodes in the request body
      );
      setLoading(false);
      return res.data; // Return response if needed
    } catch (error) {
      setLoading(false);
      setError("Something went wrong while adding pincodes.");
      console.log(error);
    }
  };

  return { assignPincode, loading, error };
};

export default useAssignNewPincode;
