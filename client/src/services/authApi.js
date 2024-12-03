import axios from "axios";
import { API_URL, getMessagesApi } from "./api";

//REGISTER USER
export const registerUser = async (userData) => {
  console.log("API URL: ", API_URL);
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 409) {
        console.error("Error 409: User already exists");
        return { error: "User already exists" };
      } else {
        const errorMessage =
          error.response.data.message || error.response.statusText;
        console.error(`Error ${statusCode}: ${errorMessage}`);
      }
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error in setting up the request:", error.message);
    }

    return null;
  }
};

//LOGIN USER
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    if (!response) {
      console.error("Something went wrong while logging the user", response);
    }
    localStorage.setItem("goodplotsAuthToken", response.data.data.accessToken);

    return response;
  } catch (error) {
    console.log("Something went wrong with Login api!!!", API_URL);
    return null;
  }
};

//LOGOUT USER
// export const logoutUser = async () => {
//   try {
//     const response = await axios.post(`${API_URL}/user/logout`);
//     if (response.status === 0) {
//       return response.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log("Error logging out the user", error);
//   }
// };
