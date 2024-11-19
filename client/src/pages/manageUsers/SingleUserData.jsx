import React, { useEffect, useState } from "react";
import LocationSelector from "../LocationSelector";
import defaultAvatar from "../../assets/images/userAvatar.png";
import useFormattedDateTime from "../../hooks/useFormattedDateTime";
import { initFlowbite } from "flowbite";
import LawyerLocationSelector from "./LawyerLocationSelector";
import BrokerLocationSelector from "./BrokerLocationSelector";

const SingleUserData = ({ user, isDropdownOpen, onToggleDropdown }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [userRole, setUserRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  const [userActionsDropdown, setUserActionsDropdown] = useState(false);
  // Formatted Join Date
  const joinedOn = useFormattedDateTime(user?.createdAt, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Role Mapping
  useEffect(() => {
    const roleMapping = {
      0: "Buyer/Seller",
      1: "Broker",
      2: "User/Client",
      3: "Lawyer",
      4: "Admin",
    };
    setUserRole(roleMapping[user?.role] || "Unknown Role");
  }, [user]);

  const deleteUser = () => window.alert("Trying to Delete user");
  const editUser = () => window.alert("Trying to Edit user");
  const viewUser = () => window.alert("Trying to View user profile");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openUserProfileModal = () => setIsUserProfileModalOpen(true);
  const closeUserProfileModal = () => setIsUserProfileModalOpen(false);

  const toggleActionDropdown = async () => {
    setUserActionsDropdown(!userActionsDropdown);
  };

  return (
    <div className="w-full ">
      {/* User Data Row */}
      <tr className="flex justify-between odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">{user.fullname}</td>
        <td className="px-6 py-4">{user.username}</td>
        <td className="px-6 py-4">{userRole}</td>
        <td className="px-6 py-4">{user.email}</td>

        {/* Dropdown Button */}
        <td className="px-6 py-4">
          <button
            onClick={toggleActionDropdown}
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 4 15">
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {userActionsDropdown ? (
            <div
              id="dropdownDots"
              className="z-96 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    onClick={openUserProfileModal}
                    className="block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    View Profile
                  </button>
                </li>

                {(user?.role === "1" ||
                  user?.role === 1 ||
                  user?.role === "3" ||
                  user?.role === 3) && (
                  <li>
                    <button
                      onClick={openModal}
                      className="block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Pincodes
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={editUser}
                    className="block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </button>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={deleteUser}
                  className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </td>
      </tr>

      {/* Assign Pincodes Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className=" relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold">Assign Pincodes</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  &#10005;
                </button>
              </div>
              <div className="p-5">
                {user?.role === 3 || user?.role === "3" ? (
                  <LawyerLocationSelector
                    user={user}
                    setIsModalOpen={setIsModalOpen}
                  />
                ) : (
                  <BrokerLocationSelector
                    user={user}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isUserProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeUserProfileModal}
          ></div>
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold">User Profile</h3>
                <button
                  onClick={closeUserProfileModal}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  &#10005;
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={defaultAvatar}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-lg">{user?.fullname}</p>
                    <p className="text-sm">{userRole}</p>
                  </div>
                </div>
                <p className="mt-4">
                  Joined On: <strong>{joinedOn}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUserData;
