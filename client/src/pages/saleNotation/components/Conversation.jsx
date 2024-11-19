import React from "react";
import defaultAvatar from "../../../assets/images/userAvatar.png";
import useSaleNotationConversation from "../../../zustand/useSaleNotationConversation.js";

const Conversation = ({ conversation, members }) => {
  const { selectedNotationConversation, setSelectNotationConversation } =
    useSaleNotationConversation();

  const setSelectedNotation = async () => {
    setSelectNotationConversation(conversation?._id);
  };

  const isSelected = selectedNotationConversation === conversation?._id;
  return (
    <div
      className={`p-2 cursor-pointer rounded-md flex ${
        isSelected ? "bg-red" : ""
      }`}
      onClick={setSelectedNotation}
    >
      <div className="avatar-group -space-x-8 rtl:space-x-reverse w-1/3 flex justify-center items-center">
        {members.map((user) => (
          <div className="avatar">
            <div className="w-5">
              <img
                src={user?.avatar || defaultAvatar}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className={`w-2/3 flex justify-center items-center`}>
        <p
          className={`text-sm font-semibold  ${
            isSelected ? "text-white" : ""
          } `}
        >
          {conversation?.property?.title}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
