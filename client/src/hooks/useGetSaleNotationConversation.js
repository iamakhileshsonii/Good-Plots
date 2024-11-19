import React, { useEffect, useState } from "react";
import axios from "axios";

const useGetSaleNotationConversation = (
  propertyId,
  sellerId,
  brokerId,
  lawyerId
) => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [saleNotationConvo, setSaleNotationConvo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCon = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3001/api/v1/saleNotation/get-conversation`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (res.status === 200) {
          setSaleNotationConvo(res.data.data);
        } else {
          console.log("Failed to fetch conversations");
        }
      } catch (error) {
        console.log("Unable to fetch conversations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCon();
  }, [propertyId, sellerId, brokerId, lawyerId, authToken]);

  return { saleNotationConvo, loading };
};

export default useGetSaleNotationConversation;
