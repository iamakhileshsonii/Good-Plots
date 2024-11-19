import React, { useContext } from "react";
import UserCard from "./components/UserCard";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import RightSidebar from "./components/RightSidebar";
import { authContext } from "../../context/authContext";

const Dashboard = () => {
  const { loading } = useContext(authContext);

  return (
    <div>
      {loading ? (
        <span className="loading loading-infinity loading-md bg-none"></span>
      ) : (
        <>
          <div className="block sm:flex gap-10 justify-evenly bg-white">
            <div className="sm:w-1/5">
              <UserCard />
              <Sidebar />
            </div>
            <div className="sm:w-7/12">
              <Outlet />
            </div>
            <div className="sm:w-1/5 ">
              <RightSidebar />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
