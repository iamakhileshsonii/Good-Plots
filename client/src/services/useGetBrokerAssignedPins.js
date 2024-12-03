import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "./api";

const useGetBrokerAssignedPins = () => {
  const [brokerPins, setBrokerPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPins = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/user/assigned-brokers-pins`);

        if (res.status === 200) {
          setBrokerPins(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(
          "Something went wrong while fetching assigned broker pins",
          error
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPins();
  }, []);

  return { brokerPins, loading };
};

export default useGetBrokerAssignedPins;
