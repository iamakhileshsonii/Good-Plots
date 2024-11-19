import React, { useEffect, useState } from "react";
import defaultAvatar from "../../../../assets/images/userAvatar.png";

const AuthInfo = ({ owner }) => {
  const ownerId = owner?._id;
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border border-black-light">
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
        Owner Information
      </h4>
      <div>
        <figcaption class="flex items-center justify-start ">
          <img
            class="rounded-full w-9 h-9"
            src={owner?.avatar || defaultAvatar}
            alt="profile picture"
          />
          <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
            <div>{owner?.fullname || "Owner name not mentioned"}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 ">
              {owner?.email || "Owner email not mentioned"}
            </div>
          </div>
        </figcaption>
        <div className="flex flex-wrap justify-center gap-5 py-2">
          <p className="font-normal text-xs flex items-center gap-2 border border-black-light rounded-md p-1 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Email
          </p>
          <p>|</p>
          <p className="font-normal text-xs flex items-center gap-2 border border-black-light rounded-md p-1 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            Call
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthInfo;
