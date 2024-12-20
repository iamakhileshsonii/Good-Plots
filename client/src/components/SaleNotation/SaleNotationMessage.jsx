import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/property.jpg";
import SaleNotationOfferTemplate from "./offer-template";

const SaleNotationMessage = ({ sender, offerDetails, avatar }) => {
  const { authUser } = useAuthContext();

  // Ensure IDs are strings for accurate comparison
  const isSender = authUser?._id?.toString() === sender?._id?.toString();

  return (
    <div
      className={`flex my-5 ${
        isSender ? "justify-end" : "justify-start"
      } px-2 py-1 md:px-4`}
    >
      {/* Message Card */}
      <Card
        className={`w-[70%] sm:w-[70%] md:w-[40%] shadow-md rounded-lg ${
          isSender
            ? "bg-gray-200 text-black dark:text-white dark:bg-gray-200"
            : "bg-gray-100 text-black dark:text-white dark:bg-gray-800"
        }`}
      >
        <CardContent className="flex flex-col items-start gap-3 p-4">
          {/* Avatar */}
          {!isSender && (
            <div className="flex gap-4 items-center">
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage src={avatar || defaultAvatar} alt="User Avatar" />
                <AvatarFallback>{sender?.fullname}</AvatarFallback>
              </Avatar>
              {/* Sender Name */}
              <p className="text-sm font-semibold mb-2">{sender?.fullname}</p>
            </div>
          )}
          {/* Message Content */}
          <div className="">
            {/* Offer Details */}
            {offerDetails ? (
              <SaleNotationOfferTemplate
                expectedByBuyer_earnestMoney={
                  offerDetails?.expectedByBuyer_earnestMoney
                }
                expectedByBuyer_totalPaymentAmount={
                  offerDetails?.expectedByBuyer_totalPaymentAmount
                }
                expectedByBuyer_totalTime={
                  offerDetails?.expectedByBuyer_totalTime
                }
                expectedBySeller_totalPaymentAmount={
                  offerDetails?.expectedBySeller_totalPaymentAmount
                }
                expectedBySeller_totalTime={
                  offerDetails?.expectedBySeller_totalTime
                }
                expectedBySeller_earnestMoney={
                  offerDetails?.expectedBySeller_earnestMoney
                }
              />
            ) : (
              <p className="text-sm">No Offer Details</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaleNotationMessage;
