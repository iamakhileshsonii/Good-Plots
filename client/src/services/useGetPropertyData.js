import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

const useGetPropertyData = (propertyId) => {
  const [property, setProperty] = useState(null); // Initialized with null for better clarity
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialized with null for better clarity

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/property/${propertyId}`);

        if (response.status === 200) {
          setProperty(response.data.data[0]);
        } else {
          throw new Error("Property not found");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  return { property, loading, error };
};

export default useGetPropertyData;
