import useSaleNotation from "@/context/useSaleNotation";
import {
  getSaleNotationByID,
  getSaleNotationMessages,
} from "@/services/saleNotation";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SaleNotationMessage from "./SaleNotationMessage";
import { Card } from "../ui/card";
import defaultAvatar from "@/assets/property.jpg";
import AcceptOffer from "./accept-offer";
import CounterOffer from "./counter-offer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import AgreementDate from "./agreement-date";
import AgreementDocs from "./agreement-docs";
import { useAuthContext } from "@/context/authContext";

const SaleNotationContainer = () => {
  const [messages, setMessages] = useState();
  const { conversationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saleNotation, setSaleNotation] = useState(null);

  const { authUser } = useAuthContext();

  // Inside SaleNotationContainer:
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  //Fetch messages
  const fetchMessages = async () => {
    setLoading(false);
    try {
      const res = await getSaleNotationMessages(conversationId);

      if (res) {
        setMessages(res);
      } else {
        console.log("NO MESSAGES FOUND");
      }

      setLoading(false);
    } catch (error) {
      console.error("Something went wrong while fetching messages");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //Fetch Conversation
  const fetchConversationDetails = async () => {
    try {
      const res = await getSaleNotationByID(conversationId);
      console.log("SALE NOTATION RES: ", res);
      if (res) {
        setSaleNotation(res);
      }
    } catch (error) {
      console.error("Unable to fetch Conversation");
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchConversationDetails();
  }, [conversationId]);

  if (loading) {
    return <p>Loading Conversation...</p>;
  }

  return (
    <div className="py-5 sm:py-10 px-5 sm:px-20 ">
      <div className="flex items-center mb-5 ">
        {/* Avatar */}
        <img
          src={defaultAvatar}
          alt="Conversation Avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-300 mr-4"
        />
        {/* Conversation ID */}

        <div className="flex flex-col items-start justify-start">
          {" "}
          <h1 className="text-lg capitalize  font-bold text-black truncate dark:text-white">
            {saleNotation?.propertyDetails?.title}
          </h1>
          <span className="text-left capitalize">
            {saleNotation?.propertyDetails?.propertySubtype}
          </span>
        </div>
      </div>

      {messages &&
        messages.map((message) => (
          <SaleNotationMessage
            key={message._id}
            sender={message?.senderInfo[0]}
            offerDetails={message?.offerDetails}
            avatar={message?.senderInfo[0]?.avatar}
          />
        ))}

      {/* Next Action */}
      {saleNotation?.lastUserAction?._id !== authUser?._id ? (
        <div className="flex gap-4 justify-center pt-4">
          <AcceptOffer conversationId={saleNotation?._id} />
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger>
              <Button onClick={() => setIsDialogOpen(true)}>
                Counter Offer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Send your counter offer</AlertDialogTitle>
                <CounterOffer
                  owner={saleNotation?.propertyDetails?.owner}
                  onClose={handleDialogClose} // Pass the close handler
                />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDialogClose}>
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        ""
      )}

      {/* IF OFFER ACCEPTED */}
      {saleNotation?.status === "ACCEPTED" ? <AgreementDate /> : ""}

      {/* IF BROKER HAS ASSIGNED AGREEMENT DATE */}
      {saleNotation?.lastUserAction?.role === "Broker" ? <AgreementDate /> : ""}
      {/* AGREEMENT DOC */}
    </div>
  );
};

export default SaleNotationContainer;
