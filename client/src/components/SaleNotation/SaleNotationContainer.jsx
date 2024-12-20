import useSaleNotation from "@/context/useSaleNotation";
import { getSaleNotationMessages } from "@/services/saleNotation";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SaleNotationMessage from "./SaleNotationMessage";
import { Card } from "../ui/card";
import defaultAvatar from "@/assets/property.jpg";

const SaleNotationContainer = () => {
  const [messages, setMessages] = useState();
  const { conversationId } = useParams();
  const [loading, setLoading] = useState(true);

  //Fetch messages
  const fetchMessages = async () => {
    setLoading(false);
    try {
      const res = await getSaleNotationMessages(conversationId);

      if (res) {
        setMessages(res);
      } else {
        console.log("NO MESSAGES FOUND");
      }

      setLoading(false);
    } catch (error) {
      console.error("Something went wrong while fetching messages");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  if (loading) {
    return <p>Loading Conversation...</p>;
  }

  return (
    <div className="py-5 sm:py-10 px-5 sm:px-20 ">
      <div className="flex items-center mb-5 ">
        {/* Avatar */}
        <img
          src={defaultAvatar}
          alt="Conversation Avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 mr-4"
        />
        {/* Conversation ID */}
        <h1 className="text-lg font-semibold text-primary truncate">
          {conversationId}
        </h1>
      </div>

      {messages &&
        messages.map((message) => (
          <SaleNotationMessage
            key={message._id}
            sender={message?.senderInfo[0]}
            offerDetails={message?.offerDetails}
            avatar={message?.senderInfo[0]?.avatar}
          />
        ))}
    </div>
  );
};

export default SaleNotationContainer;
