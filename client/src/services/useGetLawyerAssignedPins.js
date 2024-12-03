import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

const useGetLawyerAssignedPins = () => {
  const [lawyerPins, setLawyerPins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPins = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/user/assigned-lawyers-pins`);

        if (res.status === 200) {
          setLawyerPins(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(
          "Something went wrong while fetching assigned lawyer pins",
          error
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPins();
  }, []);

  return { lawyerPins, loading };
};

export default useGetLawyerAssignedPins;
