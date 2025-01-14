import React, { useState } from "react";
import { Button } from "../ui/button";
import { acceptOffer } from "@/services/saleNotation";

export default function AcceptOffer({ conversationId }) {
  const [loading, setLoading] = useState(false);

  const handleOfferAccept = async () => {
    if (!conversationId) {
      console.error("Conversation ID is required");
      return;
    }

    setLoading(true);
    try {
      const res = await acceptOffer(conversationId);
      if (res) {
        console.log("OFFER ACCEPTED: ", res);
      }
    } catch (error) {
      console.error("Failed to accept offer: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleOfferAccept} disabled={loading}>
      {loading ? "Processing..." : "Accept Offer"}
    </Button>
  );
}
