import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLogged } = useContext(authContext);

  // If the user is logged in, render the children components
  if (isLogged) {
    return children;
  }

  // Otherwise, redirect to the login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;
