import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../services/useGetAllUsers";
import SingleUserData from "./SingleUserData";

const ManageUsers = () => {
  const { users, loading, error } = useGetAllUsers();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeTab, setActiveTab] = useState("Broker"); // Default active tab
  const [allBrokers, setAllBrokers] = useState([]);
  const [allLawyers, setAllLawyers] = useState([]);
  const [allBuyerSeller, setAllBuyerSeller] = useState([]);
  const [allUserClient, setAllUserClient] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);

  const handleToggleDropdown = (userId) => {
    setOpenDropdownId((prevId) => (prevId === userId ? null : userId));
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Filter users by roles
  useEffect(() => {
    if (users) {
      setAllBrokers(
        users.filter((user) => user.role === "1" || user.role === 1)
      );
      setAllLawyers(
        users.filter((user) => user.role === "3" || user.role === 3)
      );
      setAllBuyerSeller(
        users.filter((user) => user.role === "0" || user.role === 0)
      );
      setAllUserClient(
        users.filter((user) => user.role === "2" || user.role === 2)
      );
      setAllAdmin(users.filter((user) => user.role === "5" || user.role === 5));
    }
  }, [users]);

  return (
    <div className="py-6">
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4 text-center">
        Manage Users
      </h4>
      <div className="relative h-96 overflow-x-scroll shadow-md sm:rounded-lg">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {["Broker", "Lawyers", "Buyer/Seller", "User/Client", "Admin"].map(
              (tabName) => (
                <li key={tabName} className="me-2">
                  <a
                    href="#"
                    onClick={() => handleTabChange(tabName)}
                    className={`inline-block p-4 border-b-2 ${
                      activeTab === tabName
                        ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    } rounded-t-lg`}
                    aria-current={activeTab === tabName ? "page" : undefined}
                  >
                    {tabName}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="p-4">
          {activeTab === "Broker" &&
            allBrokers.map((user) => (
              <SingleUserData
                key={user.id}
                user={user}
                onToggleDropdown={handleToggleDropdown}
                openDropdownId={openDropdownId}
              />
            ))}
          {activeTab === "Lawyers" &&
            allLawyers.map((user) => (
              <SingleUserData
                key={user.id}
                user={user}
                onToggleDropdown={handleToggleDropdown}
                openDropdownId={openDropdownId}
              />
            ))}
          {activeTab === "Buyer/Seller" &&
            allBuyerSeller.map((user) => (
              <SingleUserData
                key={user.id}
                user={user}
                onToggleDropdown={handleToggleDropdown}
                openDropdownId={openDropdownId}
              />
            ))}
          {activeTab === "User/Client" &&
            allUserClient.map((user) => (
              <SingleUserData
                key={user.id}
                user={user}
                onToggleDropdown={handleToggleDropdown}
                openDropdownId={openDropdownId}
              />
            ))}
          {activeTab === "Admin" &&
            allAdmin.map((user) => (
              <SingleUserData
                key={user.id}
                user={user}
                onToggleDropdown={handleToggleDropdown}
                openDropdownId={openDropdownId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
