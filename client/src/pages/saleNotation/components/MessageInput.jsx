import React, { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Handle sending message logic here
      console.log("Message sent:", message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-300">
      <input
        type="text"
        className="flex-grow p-2 border rounded-lg border-gray-300 focus:border-white"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
