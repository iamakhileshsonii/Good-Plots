// frontend/src/services/authService.js
import useAuthStore from "@/context/useAuthStore";
import axios from "axios";

import Cookies from "js-cookie";
import { apiClient } from "./apiClient";

// Set up the API base URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "";

const AuthToken = localStorage.getItem("goodPlots-auth");

// Login
export const login = async (email, password) => {
  try {
    const res = await apiClient.post(`/user/login`, {
      email,
      password,
    });

    if (res.data) {
      // Save the token to localStorage
      localStorage.setItem(
        "goodPlots-auth",
        JSON.stringify(res.data.data.accessToken)
      );

      return res.data.data; // Returning the user data or access token
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong logging in the user", error);
    throw new Error("Login failed");
  }
};

// Signup
export const signup = async (email, password, username) => {
  try {
    const res = await axios.post(`${API_URL}/user/signup`, {
      email,
      password,
      username,
    });
    if (res.data) {
      return res.data; // Returning user data or success message
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong signing up the user", error);
    throw new Error("Signup failed");
  }
};

// Logout
export const logout = async () => {
  try {
    const res = await apiClient.post(`/user/logout`);

    return res.data;
  } catch (error) {
    console.error("Unable to logout the user", error);
  }
};

// Example of using axiosInstance for other API calls
export const getUserData = async () => {
  try {
    const res = await axiosInstance.get("/user/data");
    return res.data; // Return user data
  } catch (error) {
    console.error("Error fetching user data", error);
    throw new Error("Failed to fetch user data");
  }
};

// Check Auth Authentication
export const checkAuth = async () => {
  try {
    const res = await apiClient.post("/user/check-auth");

    if (res.status === 200) {
      return res.data;
    }

    return res.data;
  } catch (error) {
    console.error("Unable to check auth", error);
  }
};
