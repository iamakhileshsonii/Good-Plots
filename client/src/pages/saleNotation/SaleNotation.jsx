import React, { useState } from "react";
import Conversation from "./components/Conversation";
import MessageContainer from "./components/MessageContainer";
import useGetSaleNotationCovnersationUsers from "../../hooks/useGetSaleNotationCovnersationUsers";
import useSaleNotationConversation from "../../zustand/useSaleNotationConversation";

const SaleNotation = () => {
  const { saleNotationConvoUsers } = useGetSaleNotationCovnersationUsers();

  const { selectedNotationConversation, setSelectNotationConversation } =
    useSaleNotationConversation();

  console.log("SELECTED CONVO ON CLICK:", selectedNotationConversation);
  return (
    <div className="p-10">
      <div
        className="flex h-screen p-1 rounded-md"
        style={{ boxShadow: "0px 0px 10px rgb(207, 207, 207)" }}
      >
        {/* Left Side - Users List */}
        <div className="w-1/4 border-r border-gray-300 p-4">
          <h4 className="font-semibold underline underline-offset-4 text-sm">
            Sale Transactions
          </h4>
          {saleNotationConvoUsers.length > 0 ? (
            saleNotationConvoUsers.map((conversation, index) => (
              <div
                key={index}
                className="my-2"
                onClick={() => setSelectNotationConversation(conversation?._id)}
              >
                <Conversation
                  conversation={conversation}
                  members={conversation?.participants || []}
                />
              </div>
            ))
          ) : (
            <p>No Conversations</p>
          )}
        </div>

        {/* Right Side - Message Container */}
        <div className="w-3/4 p-4">
          {selectedNotationConversation ? (
            <MessageContainer />
          ) : (
            <p>Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SaleNotation;
