import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./api";

const authToken = localStorage.getItem("goodplotsAuthToken");

const usePropertyData = (feedId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(`${API_URL}/property/${feedId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProperty(response.data);
      } catch (error) {
        setError(error.message || "Unable to fetch property data");
      } finally {
        setLoading(false);
      }
    };

    if (feedId) {
      fetchPropertyData();
    }
  }, [feedId]);

  return { property, loading, error };
};

export default usePropertyData;
