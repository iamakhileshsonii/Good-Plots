import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const authToken = localStorage.getItem("goodplotsAuthToken");

  const sendMessage = async (text) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/chat/send-message/${selectedConversation._id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "SENT BY SELECTED CONVERSATION MESSAGE BY HOOK: ",
        response.data.data
      );
      console.log("SENT MESSAGES IN USE CONVEERSATION: ", messages.message);
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
