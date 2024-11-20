import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.js";
import useConversation from "../zustand/useConversation.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("receiveSaleNotationMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("receiveSaleNotationMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
