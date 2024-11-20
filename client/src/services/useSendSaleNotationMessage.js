import axios from "axios";
import { useState } from "react";
import useSaleNotationConversation from "../zustand/useSaleNotationConversation";

const useSendSaleNotationMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    selectedNotationConversation,
    setSelectNotationConversation,
    notationMessage,
    setNotationMessage,
  } = useSaleNotationConversation();

  const sendMessage = async (offerData) => {
    console.log("OFFER DATA RECEIVED ON FRONTEND: ", offerData);
    try {
      setLoading(true);
      const authToken = localStorage.getItem("goodplotsAuthToken"); // Ensure token is up-to-date

      // Send the formData using axios
      const res = await axios.post(
        `http://localhost:3001/api/v1/saleNotation/send-message`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("SEND/RECEIVED SALE NOTATION MESSAGE", res.data.data);
        setNotationMessage([...notationMessage, res.data.data]);
      }
    } catch (error) {
      console.error("Unable to send message", error);
      // Additional error handling could be added here
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendSaleNotationMessage;
