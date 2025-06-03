import React, { useEffect, useState } from "react";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const useGetConversation = async () => {
      setLoading(true);

      try {
        const res = await getSaleNotationConversations();
        if (res) {
          setConversations(res);
        } else {
          setConversations([]);
        }
      } catch (error) {
        console.error("Something went wrong while fetching conversations");
      } finally {
        setLoading(false);
      }
    };

    useGetConversation();

    return { loading, conversations };
  }, []);
};

export default useGetConversation;
