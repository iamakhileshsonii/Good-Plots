import axios from "axios";
import React, { useState } from "react";

const useAcceptSaleNotationOffer = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [loading, setLoading] = useState(false);

  const acceptOffer = async (coversationId) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:3001/api/v1/saleNotation/accept-offer/${coversationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Something went wrong while accepting offer");
    }
  };

  return { loading, acceptOffer };
};

export default useAcceptSaleNotationOffer;
