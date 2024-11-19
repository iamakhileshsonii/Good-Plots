import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/userAvatar.png";

const ChatMembers = ({ user }) => {
  const [userRole, setUserRole] = useState();

  //Set user role
  useEffect(() => {
    if (user?.role === "0") {
      setUserRole("Buyer/ Seller");
    } else if (user?.role === "1") {
      setUserRole("Broker");
    } else if (user?.role === "2") {
      setUserRole("User/Client");
    } else {
      setUserRole("Admin");
    }
  }, [user]);
  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.avatar || defaultAvatar}
        alt="Avatar"
        className="rounded-full w-8 h-8"
      />

      <div>
        {" "}
        <p className="text-base font-semibold">{user?.fullname}</p>
        <p className="text-red font-semibold text-xs">{userRole}</p>
      </div>
    </div>
  );
};

export default ChatMembers;
