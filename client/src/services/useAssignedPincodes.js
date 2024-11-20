import { useEffect, useState } from "react";
import axios from "axios";

const useAssignedPincodes = () => {
  const [assignedPincodes, setAssignedPincodes] = useState();
  const [loading, setLoading] = useState(false);

  const fetchedAssignedPincodes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3001/api/v1/user/assingedPins`
      );
      if (res.status === 200 && res.data && res.data.data) {
        setAssignedPincodes(res.data.data); // Set to the correct nested data array
        setLoading(false);
      } else {
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.error("Error fetching assigned pincodes:", error);
      setAssignedPincodes();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedAssignedPincodes();
  }, []);

  return { assignedPincodes, loading };
};

export default useAssignedPincodes;
