import { allBuyerSeller } from "@/services/manageUser";
import React, { useEffect } from "react";

export default function BuyerSeller() {
  const fetchUsers = async () => {
    const res = await allBuyerSeller();
    console.log("ALL BUYER SELLER: ", res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>BuyerSeller</div>;
}
