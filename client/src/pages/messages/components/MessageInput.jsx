import React, { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import useConversation from "../../../zustand/useConversation";

const MessageInput = ({ selectedUser, senderId }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center px-5 gap-2 justify-center border border-black-light rounded-lg">
        <input
          type="text"
          placeholder="Send message..."
          className="w-full border-none focus:border-none active:border-none active:outline-none focus:outline-none h-10 overflow-y-scroll outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        {message && (
          <button type="submit" disabled={loading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
