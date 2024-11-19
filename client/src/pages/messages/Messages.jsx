import React, { useState, useContext } from "react";
import defaultAvatar from "../../assets/images/userAvatar.png";
import Users from "./components/Users";
import MessagesContainer from "./components/MessagesContainer";
import chatImg from "../../assets/images/chat.svg";
import useGetConversations from "../../hooks/useGetConversation";
import MessageInput from "./components/MessageInput";
import useConversation from "../../zustand/useConversation";
import { authContext } from "../../context/authContext";
import { useSocketContext } from "../../context/SocketContext";

const Messages = () => {
  const { authUser } = useContext(authContext);
  const { socket, onlineUsers } = useSocketContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, conversations, error } = useGetConversations();

  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages } = useConversation();

  const handleUserClick = (user) => {
    setSelectedConversation(user);
  };

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center py-10">
      {loading ? (
        <span className="loading loading-infinity loading-md bg-none"></span>
      ) : error ? (
        <p>Error fetching conversations: {error.message}</p>
      ) : conversations.length > 0 ? (
        <>
          <div
            className="w-full sm:w-2/12 px-2 py-5 rounded-md"
            style={{ boxShadow: "0px 0px 10px rgb(207, 207, 207)" }}
          >
            <h4 className="font-semibold underline underline-offset-4 text-sm">
              Messages
            </h4>
            {conversations.map((user) => (
              <div key={user._id} onClick={() => handleUserClick(user)}>
                <Users user={user} isOnline={isUserOnline(user._id)} />
              </div>
            ))}
          </div>
          <div
            className="w-full sm:w-9/12 px-2 pb-5 rounded-md"
            style={{ boxShadow: "0px 0px 10px rgb(207, 207, 207)" }}
          >
            {selectedConversation && (
              <>
                <div className="flex items-center mb-4 p-5">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={selectedConversation.avatar || defaultAvatar}
                    alt="User avatar"
                  />
                  <div className="ml-2">
                    <h5 className="font-semibold">
                      {selectedConversation.fullname}
                    </h5>
                    <p className="text-xs text-gray-600">
                      {selectedConversation.email}
                    </p>
                  </div>
                </div>
                {loading ? (
                  <p>Loading messages...</p>
                ) : (
                  <MessagesContainer
                    messages={messages}
                    userId={authUser?._id}
                    selectedUser={selectedConversation}
                    setSelectedUser={setSelectedConversation}
                  />
                )}
                <div>
                  <MessageInput
                    messages={messages}
                    senderId={authUser?._id}
                    selectedUser={selectedUser}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div
          className="personalized-content p-10 rounded-md"
          style={{ boxShadow: "0px 0px 10px rgb(223, 223, 223)" }}
        >
          <div className="grid justify-center my-5">
            <img src={chatImg} alt="Chat" className="w-52 h-52" />
          </div>
          <p className="text-red font-semibold text-xl">
            It looks like you don't have any chats yet. Here are some things you
            can do:
          </p>
          <ul className="py-4 px-4">
            <li>
              <i className="fa-solid fa-caret-right"></i> Start a new
              conversation
            </li>
            <li>
              <i className="fa-solid fa-caret-right"></i> Explore user profiles
            </li>
            <li>
              <i className="fa-solid fa-caret-right"></i> Learn how to use our
              chat features
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Messages;
