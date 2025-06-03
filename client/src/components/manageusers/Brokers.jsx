import { allbrokers } from "@/services/manageUser";
import React, { useEffect } from "react";

export default function Brokers() {
  const fetchUsers = async () => {
    const res = await allbrokers();
    console.log("ALL BROKERS: ", res);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>Brokers</div>;
}
