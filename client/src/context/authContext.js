import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [authRole, setAuthRole] = useState("Broker");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("goodplotsAuthToken");
    if (token) {
      setIsLogged(true);
      setAuthToken(token);
      fetchAuthUser(token);
    }
  }, []);

  const fetchAuthUser = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/user-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAuthUser(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Unable to fetch auth user", error);
    }
  };

  // Login User
  const login = (token) => {
    localStorage.setItem("goodplotsAuthToken", token);
    setAuthToken(token);
    fetchAuthUser(token);
    setIsLogged(true);
  };

  // Logout User
  const logout = () => {
    setAuthToken(null);
    setAuthUser(null);
    setIsLogged(false);
    localStorage.removeItem("goodplotsAuthToken");
  };

  //Set user role
  useEffect(() => {
    if (authUser?.role === "0" || authUser?.role === 0) {
      setAuthRole("Buyer/ Seller");
    } else if (authUser?.role === "1" || authUser?.role === 1) {
      setAuthRole("Broker");
    } else if (authUser?.role === "2" || authUser?.role === 2) {
      setAuthRole("User/Client");
    } else if (authUser?.role === "3" || authUser?.role === 3) {
      setAuthRole("Lawyer");
    } else if (authUser?.role === "5" || authUser?.role === 5) {
      setAuthRole("Admin");
    }
  }, [authUser]);

  return (
    <authContext.Provider
      value={{
        authToken,
        authUser,
        login,
        logout,
        isLogged,
        authRole,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider, authContext };
