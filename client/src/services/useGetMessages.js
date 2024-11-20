import { useEffect, useState } from "react";
import { getMessagesApi } from "./api";
import axios from "axios";
import useGetConversations from "../services/useGetConversation";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/chat/${selectedConversation._id}`, // Replace with dynamic ID if needed
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status !== 200) {
          console.log("Unable to get messages");
          return null;
        }
        console.log("useGetMessages message: ", response.data.data.message);
        setMessages(response.data.data.message);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
