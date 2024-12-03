import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import { API_URL } from "./api";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const authToken = localStorage.getItem("goodplotsAuthToken");

  const sendMessage = async (text) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/chat/send-message/${selectedConversation._id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages([...messages, response.data.data]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
