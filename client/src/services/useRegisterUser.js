import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./api";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const registerUser = async (userData) => {
    setLoading(true);
    setMessage("Submitting..."); // Indicate registration process has started

    try {
      const response = await axios.post(`${API_URL}/user/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setMessage("Registration successful!"); // Indicate success
      return response.data;
    } catch (error) {
      setLoading(false);

      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 409) {
          setMessage("User already exists");
          console.error("Error 409: User already exists");
          return { error: "User already exists" };
        } else {
          const errorMessage =
            error.response.data.message || error.response.statusText;
          setMessage(`Error ${statusCode}: ${errorMessage}`);
          console.error(`Error ${statusCode}: ${errorMessage}`);
        }
      } else if (error.request) {
        setMessage("No response received from the server");
        console.error("No response received from the server:", error.request);
      } else {
        setMessage("Error in setting up the request");
        console.error("Error in setting up the request:", error.message);
      }

      return null;
    }
  };

  return { registerUser, loading, message };
};

export default useRegisterUser;
