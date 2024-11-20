import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../../../services/useGetMessages.js";
import useListenMessages from "../../../services/useListenMessage.js";

const MessagesContainer = () => {
  const { messages, loading } = useGetMessages();
  const lastMsgRef = useRef(null);

  useListenMessages();

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 py-10 px-5 max-h-80 overflow-y-scroll">
      {messages?.length === 0
        ? "No Messages"
        : messages.map((message, index) => (
            <Message
              key={message._id}
              message={message}
              ref={index === messages.length - 1 ? lastMsgRef : null}
            />
          ))}
    </div>
  );
};

export default MessagesContainer;
