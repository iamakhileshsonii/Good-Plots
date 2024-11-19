import React, { useEffect } from "react";
import Login from "../login/Login";
import { userLogoutAPI } from "../../services/api";

const Logout = () => {
  return <div>{<Login />}</div>;
};

export default Logout;
