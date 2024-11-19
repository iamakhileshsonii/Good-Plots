import React, { useContext } from "react";
import avatar from "../../../assets/images/userAvatar.png";

import { authContext } from "../../../context/authContext";

const UserCard = () => {
  const { authUser, authRole } = useContext(authContext);

  return (
    <div className="sm:flex gap-3 p-5 bg-slate-100">
      <div>
        <img
          className="w-12 h-12 mb-3 rounded-full shadow-lg object-cover"
          src={authUser?.avatar || avatar}
          alt="Bonnie image"
        />
      </div>

      <div>
        <h5 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {authUser?.username}
        </h5>
        <span className="text-sm text-red font-semibold dark:text-gray-400">
          {authRole}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
