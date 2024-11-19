import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useSaleNotationConversation from "../zustand/useSaleNotationConversation";

const useListenSaleNotationMessage = () => {
  const { socket } = useSocketContext();
  const { notationMessage, setNotationMessage } = useSaleNotationConversation();

  useEffect(() => {
    socket?.on("newSaleNotationMessage", (newMessage) => {
      setNotationMessage([...notationMessage, newMessage]);
    });

    return () => socket?.off("newSaleNotationMessage");
  }, [socket, setNotationMessage, notationMessage]);
};

export default useListenSaleNotationMessage;
