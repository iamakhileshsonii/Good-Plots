import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/authContext";
import { API_URL } from "./api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useContext(authContext);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      setError(null); // Reset error state before making the API call
      try {
        const response = await axios.post(
          `${API_URL}/chat/users`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response) {
          console.log("Unable to fetch conversations");
          return null;
        }
        setConversations(response.data.data); // Update the state with the fetched conversations
        console.log("SETCONVERSATIONS :", response.data.data);
      } catch (error) {
        setError(error);
        console.log(
          "Something went wrong while fetching conversations:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      getConversations();
    } else {
      console.log("No auth token available");
    }
  }, [authToken]);

  return { loading, conversations, error, setConversations };
};

export default useGetConversations;
