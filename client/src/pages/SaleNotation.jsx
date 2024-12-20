import SaleNotationContainer from "@/components/SaleNotation/SaleNotationContainer";
import useSaleNotation from "@/context/useSaleNotation";
import { getSaleNotationConversations } from "@/services/saleNotation";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SaleNotation = () => {
  const [saleNotationConversation, setSaleNotationConversation] = useState();

  const { conversationId } = useParams();
  console.log("CONVERSATION ID: ", conversationId);
  const {
    conversations,
    selectedConversation,
    messages,
    setConversations,
    setSelectedConversation,
    setMessages,
  } = useSaleNotation();

  useEffect(() => {
    const fetchSaleNotations = async () => {
      const res = await getSaleNotationConversations();
      if (res) {
        setConversations(res);
        setSaleNotationConversation(res);
      } else {
        setSaleNotationConversation([]);
      }
    };

    fetchSaleNotations();
  }, []);
  return (
    <div className="min-h-screen overflow-y-scroll">
      <SaleNotationContainer />
    </div>
  );
};

export default SaleNotation;
