import React, { useContext } from "react";
import defaultAvatar from "../../../assets/images/userAvatar.png";

import useConversation from "../../../zustand/useConversation";
import { authContext } from "../../../context/authContext";

const Message = ({ message }) => {
  const { authUser } = useContext(authContext);
  const isCurrentUser = message?.senderId === authUser?._id;
  const { selectedConversation } = useConversation();
  const profilePic = isCurrentUser
    ? defaultAvatar
    : selectedConversation?.avatar;
  return (
    <div
      className={`flex my-2 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div class="flex items-start gap-2.5">
        <img
          class="w-8 h-8 rounded-full"
          src={profilePic}
          alt={`${selectedConversation.fullname} avatar`}
        />
        <div class="flex flex-col gap-1 w-full max-w-[320px]">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">
              {isCurrentUser
                ? authUser?.fullname
                : selectedConversation.fullname}
            </span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              {message.time}
            </span>
          </div>
          <div
            class={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700  ${
              isCurrentUser ? "bg-red" : ""
            }`}
          >
            <p
              class={`text-sm font-normal text-gray-900 dark:text-white ${
                isCurrentUser ? "text-white" : ""
              }`}
            >
              {" "}
              {message.text}
            </p>
          </div>
          <span class="text-xs font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
