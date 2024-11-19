import React from "react";
import defaultAvatar from "../../../assets/images/userAvatar.png";

const Users = ({ user, isOnline }) => {
  return (
    <div
      className="flex gap-2.5 items-center my-3 rounded-md px-2 py-1 hover:bg-black-light"
      style={{ boxShadow: "0px 0px 10px rgb(223, 223, 223)" }}
    >
      <div className="relative w-12 h-12">
        <img
          className="w-full h-full rounded-full"
          src={user?.avatar || defaultAvatar}
          alt="User avatar"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <div className="flex flex-col w-full max-w-[320px] leading-1.5">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {user?.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Users;
