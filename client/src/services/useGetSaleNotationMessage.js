import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import useSaleNotationConversation from "../zustand/useSaleNotationConversation";

const useGetSaleNotationMessage = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);

  const {
    selectedNotationConversation,
    setSelectNotationConversation,
    notationMessage,
    setNotationMessage,
  } = useSaleNotationConversation();

  // Define the function outside useEffect
  const fetchSaleNotationMessages = useCallback(async () => {
    setLoading(true); // Set loading to true before making the API call
    try {
      const res = await axios.get(
        `http://localhost:3001/api/v1/saleNotation/get-message/${selectedNotationConversation}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.status === 200) {
        setConversation(res.data.data);

        setNotationMessage(res.data.data.messagesDetails);
      }
    } catch (error) {
      console.error("Unable to get messages:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call finishes
    }
  }, [selectedNotationConversation, authToken, setNotationMessage]); // Add dependencies

  // Call the function inside useEffect
  useEffect(() => {
    if (selectedNotationConversation) {
      fetchSaleNotationMessages();
    }
  }, [fetchSaleNotationMessages]);

  return { fetchSaleNotationMessages, conversation, messages, loading };
};

export default useGetSaleNotationMessage;
