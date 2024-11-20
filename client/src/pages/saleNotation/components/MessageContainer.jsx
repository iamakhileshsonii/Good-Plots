import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import defaultAvatar from "../../../assets/images/userAvatar.png";
import OfferForm from "./OfferForm";
import useGetSaleNotationMessage from "../../../services/useGetSaleNotationMessage";
import { authContext } from "../../../context/authContext";
import { initFlowbite } from "flowbite";
import ChatMembers from "./ChatMembers";
import useAcceptSaleNotationOffer from "../../../services/useAcceptSaleNotationOffer";
import AgreementDate from "./AgreementDate";
import UploadAgreementDoc from "./UploadAgreementDoc";
import LawyerDocuments from "./LawyerDocuments";
import useSaleNotationConversation from "../../../zustand/useSaleNotationConversation";
import useListenSaleNotationMessage from "../../../services/useListenSaleNotationMessage";

const MessageContainer = () => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [offerFormVisibility, setOfferFormVisibility] = useState(false);
  const [offerForm, setOfferForm] = useState();
  const { conversation, loading } = useGetSaleNotationMessage();
  const [agreementDate, setAgreementDate] = useState(false);
  const { authUser } = useContext(authContext);
  const { acceptOffer } = useAcceptSaleNotationOffer();
  const [agreementDocs, setAgreementDocs] = useState();

  //Listen Message
  useListenSaleNotationMessage();

  const { fetchSaleNotationMessages, messages } = useGetSaleNotationMessage();

  const {
    selectedNotationConversation,
    setSelectNotationConversation,
    notationMessage,
  } = useSaleNotationConversation();

  const isBuyerOrSeller = authUser?.role === "0" || authUser?.role === "2";
  const isBroker = authUser?.role === "1" || authUser?.role === 1;
  const isLawyer = authUser?.role === "3" || authUser?.role === 3;

  const handleExportChat = () => {
    window.alert("Sale Notation Chat Exported!!!");
  };

  const handleOffer = async (action) => {
    if (action === "accept") {
      await acceptOffer(selectedNotationConversation._id);
      setOfferForm(false);
    } else if (action === "counter") {
      setOfferFormVisibility(!offerFormVisibility);
    }
  };

  //Last message
  const lastMessage = notationMessage[notationMessage.length - 1];

  // Check last message user role
  const last_isBroker =
    lastMessage?.sender?.role === "1" || lastMessage?.sender?.role === 1;
  const last_isLawyer =
    lastMessage?.sender?.role === "3" || lastMessage?.sender?.role === 3;
  const last_isBuyerSellerOrClient =
    lastMessage?.sender?.role === "0" ||
    lastMessage?.sender?.role === 0 ||
    lastMessage?.sender?.role === "2" ||
    lastMessage?.sender?.role === 2;

  const isConversationAccepted = conversation?.status === "accepted";
  const isConversationNotAccepted = conversation?.status !== "accepted";

  useEffect(() => {
    const lastMessageCondition = lastMessage?.sender._id !== authUser?._id;

    if (isBuyerOrSeller && isConversationNotAccepted && lastMessageCondition) {
      setOfferForm(true);
    } else if (isConversationAccepted && isBroker) {
      console.log("BROKER TURN TO TAKE ACTION");
      setAgreementDate(true);
    } else if (isConversationAccepted && isLawyer) {
      console.log("LAWYER TURN TO TAKE ACTION");
      setAgreementDocs(true);
      setOfferForm(false);
    } else if (isConversationAccepted) {
      setOfferForm(false);
    } else {
      setOfferForm(false);
    }
  }, [authUser, selectedNotationConversation, lastMessage, conversation]);

  return (
    <div className="flex flex-col h-full overflow-y-scroll">
      {/* User Information */}
      <div className="flex items-center justify-between space-x-4 p-2 border-b border-black-light rounded-md mb-5">
        <div className="flex items-center space-x-4">
          <div className="avatar-group -space-x-4 rtl:space-x-reverse">
            {conversation?.participantsDetails &&
              conversation.participantsDetails.map((user) => (
                <div className="avatar" key={user._id}>
                  <div className="w-8">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div>
            <h4 className="text-base font-semibold">
              {conversation?.propertyDetails
                ? conversation.propertyDetails.title
                : "No Conversation Selected"}
            </h4>
            <span className="text-sm">
              {conversation?.propertyDetails?.propertySubtype}
            </span>
          </div>
        </div>

        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="ml-auto inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>

        <div
          id="dropdownDots"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li onClick={handleExportChat}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Export Chat
              </a>
            </li>
            <li>
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block text-black"
                type="button"
              >
                Chat Members
              </button>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Media
            </a>
          </div>
        </div>
      </div>

      {/* Messages */}
      {loading
        ? "Loading Messages"
        : notationMessage &&
          notationMessage.map((msg) => (
            <div key={msg._id} className="mb-10">
              <Message
                message={msg}
                conversation={conversation}
                last_isBroker={last_isBroker}
              />
            </div>
          ))}

      {offerForm ? (
        <div className="flex gap-5 justify-center">
          <button
            className="bg-green py-1 px-2 rounded-md"
            onClick={() => handleOffer("accept")}
          >
            Accept Offer
          </button>
          <button
            className="bg-yellow-300 py-1 px-2 rounded-md"
            onClick={() => handleOffer("counter")}
          >
            Counter Offer
          </button>
        </div>
      ) : (
        ""
      )}

      <div className={`${offerFormVisibility ? "" : "hidden"}`}>
        <OfferForm
          conversation={conversation}
          setOfferFormVisibility={setOfferFormVisibility}
          setOfferForm={setOfferForm}
        />
      </div>

      {isConversationAccepted &&
      last_isBuyerSellerOrClient &&
      last_isBuyerSellerOrClient ? (
        <p className="text-center">
          Waiting for broker to share agreement date
        </p>
      ) : (
        ""
      )}

      {last_isBroker && last_isBroker ? (
        ""
      ) : (
        <div className={`${isBroker && agreementDate ? "" : "hidden"}`}>
          <AgreementDate messages={messages} conversation={conversation} />
        </div>
      )}

      {last_isBroker && last_isBroker ? (
        <p className="text-center">Waiting for lawyer to upload documents</p>
      ) : (
        ""
      )}

      {last_isLawyer && last_isLawyer ? (
        ""
      ) : (
        <div className={`${isLawyer && agreementDocs ? "" : "hidden"}`}>
          <UploadAgreementDoc />
        </div>
      )}

      {isLawyer && (
        <div>
          <LawyerDocuments />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
