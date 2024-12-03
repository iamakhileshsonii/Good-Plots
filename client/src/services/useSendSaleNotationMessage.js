import axios from "axios";
import { useState } from "react";
import useSaleNotationConversation from "../zustand/useSaleNotationConversation";
import { API_URL } from "./api";

const useSendSaleNotationMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    selectedNotationConversation,
    setSelectNotationConversation,
    notationMessage,
    setNotationMessage,
  } = useSaleNotationConversation();

  const sendMessage = async (offerData) => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("goodplotsAuthToken"); // Ensure token is up-to-date

      // Send the formData using axios
      const res = await axios.post(
        `${API_URL}/saleNotation/send-message`,
        offerData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
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
