import React, { useContext, useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/userAvatar.png";
import useSendSaleNotationMessage from "../../../hooks/useSendSaleNotationMessage";
import { authContext } from "../../../context/authContext";
import OfferForm from "./OfferForm";
import useFormattedDateTime from "../../../hooks/useFormattedDateTime";
import useSaleNotationConversation from "../../../zustand/useSaleNotationConversation";

const Message = ({ message, conversation, last_isBroker }) => {
  const { authUser } = useContext(authContext);
  const isSender = authUser._id === message?.sender._id;

  const totalPaymentAmount = message?.offerDetails.totalPaymentAmount;
  const totalTime = message?.offerDetails.totalTime;
  const earnestMoney = message?.offerDetails.earnestMoney;
  const totalTime_expectedBySeller =
    message?.offerDetails.expectedBySeller.totalTime;
  const earnestMoney_expectedBySeller =
    message?.offerDetails.expectedBySeller.earnestMoney;
  const totalPaymentAmount_expectedBySeller =
    message?.offerDetails.expectedBySeller.totalTime;

  // Use the custom hook to format the updatedAt timestamp
  const formattedUpdatedAt = useFormattedDateTime(message.updatedAt, {
    year: "numeric",
    month: "short", // e.g., Aug
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: '2-digit', // Uncomment if you want to include seconds
    hour12: true, // Use 12-hour format (AM/PM)
  });

  // Formate message deliver date & time
  const agreementDate_message = new Date(
    message?.agreementDate
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Check user role
  const [isBroker, setIsBroker] = useState(false);
  const [isLawyer, setIsLawyer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBuyerOrSeller, setIsBuyerOrSeller] = useState(false);
  const [isUserOrClient, setIsUserOrClient] = useState(false);
  const [isSystem, setIsSystem] = useState(false);

  useEffect(() => {
    if (message.type === 1) {
      setIsSystem(true);
      setIsBuyerOrSeller(false);
      setIsBroker(false);
      setIsUserOrClient(false);
      setIsLawyer(false);
      setIsAdmin(false);
    } else {
      if (message.sender.role === "0" || message.sender.role === 0) {
        setIsBuyerOrSeller(true);
        setIsBroker(false);
        setIsUserOrClient(false);
        setIsLawyer(false);
        setIsAdmin(false);
        setIsSystem(false);
      } else if (message.sender.role === "1" || message.sender.role === 1) {
        setIsBuyerOrSeller(false);
        setIsBroker(true);
        setIsUserOrClient(false);
        setIsLawyer(false);
        setIsAdmin(false);
        setIsSystem(false);
      } else if (message.sender.role === "2" || message.sender.role === 2) {
        setIsBuyerOrSeller(false);
        setIsBroker(false);
        setIsUserOrClient(true);
        setIsLawyer(false);
        setIsAdmin(false);
        setIsSystem(false);
      } else if (message.sender.role === "3" || message.sender.role === 3) {
        setIsBuyerOrSeller(false);
        setIsBroker(false);
        setIsUserOrClient(false);
        setIsLawyer(true);
        setIsAdmin(false);
        setIsSystem(false);
      } else if (message.sender.role === "5" || message.sender.role === 5) {
        setIsBuyerOrSeller(false);
        setIsBroker(false);
        setIsUserOrClient(false);
        setIsLawyer(false);
        setIsSystem(false);
        setIsAdmin(true);
      }
    }
  }, [message, authUser]);

  console.log("MESSAGED USER NAME: ", message?.sender.username);

  return (
    <>
      {isSystem ? (
        <div className="flex justify-center">
          <span>{message.systemMessage}</span>
        </div>
      ) : isBroker ? (
        <div>
          <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message?.sender.avatar || defaultAvatar}
                />
              </div>
            </div>
            <div className="chat-header">
              <p className="font-semibold capitalize">
                {isSender ? "You" : message?.sender.username}
              </p>
              <time className="text-xs opacity-50">{formattedUpdatedAt}</time>
            </div>
          </div>
          <div
            className={`flex  ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                isSender ? "border-red" : "border-black-dark"
              } p-5 border border-dotted rounded-2xl sm:w-4/5`}
            >
              <p
                className={`${
                  isSender ? "text-black-dark" : "text-black-dark"
                } text-sm`}
              >
                Token agreement will be signed on{" "}
                <span className="underline font-semibold">
                  {agreementDate_message}
                </span>{" "}
                at{" "}
                <span className="font-semibold underline">
                  Broker Office address
                </span>{" "}
                office. Both the parties are required to bring:
              </p>
              <ol
                className={`${
                  isSender ? "text-black-dark" : "text-black-dark"
                } text-sm py-5`}
              >
                <li
                  className={`${
                    isSender ? "text-black-dark" : "text-black-dark"
                  } text-sm`}
                >
                  1. Adhaar Card
                </li>
                <li
                  className={`${
                    isSender ? "text-black-dark" : "text-black-dark"
                  } text-sm`}
                >
                  2. Pan Card
                </li>
                <li
                  className={`${
                    isSender ? "text-black-dark" : "text-black-dark"
                  } text-sm`}
                >
                  3. Cheque Book
                </li>
              </ol>
              <br />
              <p>Hi Mr Akhilesh & Mr Jimmy,</p>
              <br />
              <p>
                Congratulations on finding yourself a tentative deal. Based on
                your mutual understanding and acceptance, Its time to help
                parties navigate through requisite sale-purchase nuances, legal
                processes, and documentation. I will be joined by Advocate Mr.
                _____________ and we shall act impartially to secure the mutual
                interest of the parties. Please read goodplots terms and
                conditions carefully to understand how it works and how we can
                help secure transactions between the parties. Please also read
                the terms and conditions in relation to good plots guarantee,
                and please be compliant at all times.
              </p>{" "}
              <br />
              <p>
                For added transparency and security, the parties can download
                the sale notation being recorded here, which shall remain
                legally valid and binding, and can be produced by any party
                before a learned court/ authority in future for adjudication.
              </p>
              <p>
                Please also welcome Advocate ________________ whose services
                will be utilized for documentation and paperwork. You can reach
                out to him in this window for any concerns/ clarifications. A
                request has been sent to ______________ to join this notation.
                You will be updated as soon as ____________ joins.
              </p>
            </div>
          </div>
        </div>
      ) : isLawyer ? (
        <div
          className={`${
            isSender ? "bg-red-dark" : "bg-black-light"
          } p-5 rounded-md flex justify-center gap-3`}
        >
          <div className="sm:w-3/12">
            <p className="font-semibold text-sm">Sale Deed Document:</p>
            <a
              href={message.agreementDoc.token}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View/Download Sale Deed Document
            </a>
          </div>

          <div className="sm:w-3/12">
            <p className="font-semibold text-sm">Sale Deed Document:</p>
            <a
              href={message.agreementDoc.token}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View/Download Sale Deed Document
            </a>
          </div>
          <div className="sm:w-3/12">
            <p className="font-semibold text-sm">Sale Deed Document:</p>
            <a
              href={message.agreementDoc.token}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View/Download Sale Deed Document
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message?.sender.avatar || defaultAvatar}
                />
              </div>
            </div>
            <div className="chat-header">
              <p className="font-semibold capitalize">
                {isSender ? "You" : message?.sender.username}
              </p>
              <time className="text-xs opacity-50">{formattedUpdatedAt}</time>
            </div>
          </div>
          <div
            className={`flex  ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${
                isSender ? "border-red" : "border-black-dark"
              } p-5 border border-dotted rounded-2xl sm:w-4/5`}
            >
              <p className="text-sm pb-2">
                {" "}
                {isSender ? "You" : message?.sender.username} made an offer
              </p>
              <div className="flex justify-between">
                <div className="sm:w-1/2">
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${isSender ? "text-black-dark" : ""}`}
                    >
                      Total Payment Amount
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      ₹{totalPaymentAmount}
                    </p>
                  </div>
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${
                        isSender ? "text-black-dark" : "text-black-dark"
                      }`}
                    >
                      Expected by seller
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      ₹{totalPaymentAmount_expectedBySeller}
                    </p>
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${isSender ? "text-black-dark" : ""}`}
                    >
                      Total time
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      {totalTime}
                    </p>
                  </div>
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${
                        isSender ? "text-black-dark" : "text-black-dark"
                      }`}
                    >
                      Expected by seller
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      {totalTime_expectedBySeller}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="sm:w-1/2">
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${isSender ? "text-black-dark" : ""}`}
                    >
                      Earnest money
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      ₹{earnestMoney}
                    </p>
                  </div>
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${
                        isSender ? "text-black-dark" : "text-black-dark"
                      }`}
                    >
                      Expected by seller
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      ₹{earnestMoney_expectedBySeller}
                    </p>
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <div className="flex gap-2 m-2">
                    <p
                      className={`text-sm ${isSender ? "text-black-dark" : ""}`}
                    >
                      Date of payment
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        isSender ? "text-black-dark" : ""
                      }`}
                    >
                      {totalTime}
                    </p>
                  </div>
                  <div
                    className={`flex gap-2 m-2 ${
                      isSender ? "text-black-dark" : ""
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isSender ? "text-black-dark" : "text-black-dark"
                      }`}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
