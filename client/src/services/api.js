import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";
const authToken = localStorage.getItem("goodplotsAuthToken");

//REFRESH ACCESS TOKEN
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/user/refresh-access-token`,
      {},
      {
        withCredentials: true, // Use this if your refresh token is in cookies
      }
    );

    if (response.status === 200) {
      const { accessToken } = response.data;

      // Store new token in localStorage
      localStorage.setItem("goodplotsAuthToken", accessToken);

      // Update the global authToken variable if needed
      // authToken = accessToken;

      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
    // Optional: redirect to login or handle token refresh failure
    return null;
  }
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("goodplotsAuthToken")}`, // Initialize with stored token
  },
});

// Axios interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to expired token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Attempt to refresh the token
      const newAuthToken = await refreshAccessToken();

      if (newAuthToken) {
        // Update the headers with the new token
        apiClient.defaults.headers.Authorization = `Bearer ${newAuthToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } else {
        // Handle cases where refreshing the token failed (e.g., redirect to login)
        // window.location.href = '/login'; // Uncomment if you want to redirect
      }
    }

    return Promise.reject(error);
  }
);

// // LOGIN API
const loginUserAPI = async ({ email, password }) => {
  // Send a POST request
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    if (!response) {
      console.error("Something went wrong while logging the user", response);
    }
    // if (response.data.statusCode === 200) {
    //   console.log("User logged in successfully");
    // }

    console.log("LOGIN RESPONSE: ", response);
    console.log("LOGIN ACCESS TOKEN: ", response.data.data.accessToken);
    localStorage.setItem("goodplotsAuthToken", response.data.data.accessToken);

    return response;
  } catch (error) {
    console.log("Something went wrong with Login api!!!");
    return null;
  }
};

// const loginUserAPI = async ({ email, password }) => {
//   try {
//     const response = await axios.post(`${API_URL}/user/login`, {
//       email,
//       password,
//     });

//     // Return the complete response to handle status codes
//     return response;
//   } catch (error) {
//     if (error.response) {
//       // Return the error response object so the status can be handled
//       return error.response;
//     } else {
//       console.error("Unexpected error during login API call:", error);
//       return { status: 500, data: { message: "Internal Server Error" } }; // Fallback for unexpected errors
//     }
//   }
// };

// REGISTER API
const registerUserAPI = async (userData) => {
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
        window.alert("User already exists");
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
//UPDATE AVATAR
const updateAvatarAPI = async (formData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/user/update-avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response) {
      console.error("Failed to update avatar");
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while updating new avatar", error);
  }
};

// Get Current User Data
const currentUserProfileAPI = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/user-profile`, {
      withCredentials: true, // Ensure cookies are sent with the request
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("Status Code:", response.status);
    console.log("User Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

// LOGOUT USER
const userLogoutAPI = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/logout`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error logging out the user", error);
  }
};

//SUBMIT INITIAL FORM
const submitInitialForm = async (fields) => {
  try {
    const response = await axios.post(`${API_URL}/form/initial-form`, fields, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response) {
      console.log("No response from server while submitting form");
    }
    console.log("Form Submitted Successfully", response);
    return response;
  } catch (error) {
    console.log("Unable to submit the form", error);
  }
};

// Initial Form Submitted Details
const getPropertyInitialFormDetails = async (formid) => {
  if (!formid) {
    console.log("Formid is not provided!!!");
  }

  try {
    const response = await axios.get(`${API_URL}/form/initial-form/${formid}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) {
      console.log("No response");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching initial form data", error);
  }
};

// SUBMIT KYC FORM
const submitPropertyKycFormDetails = async (kycFormFields) => {
  try {
    const formData = new FormData();

    // Append form fields
    for (const [key, value] of Object.entries(kycFormFields)) {
      if (value instanceof File) {
        formData.append(key, value, value.name); // Append file with its name
      } else {
        formData.append(key, value); // Append regular form field
      }
    }

    // Make POST request using axios
    const response = await axios.post(
      `${API_URL}/form/submit-kyc-form`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error submitting KYC form:", error);
    throw new Error(`Error submitting KYC form: ${error.message}`);
  }
};

// GET CURRENT PROPERTY DATA
const getCurrentPropertyData = async (propertyId) => {
  try {
    console.log("getting data for property id: ", propertyId);
    const response = await axios.get(`${API_URL}/property/${propertyId}`);

    if (!response) {
      console.log("Couldn't fetch current property data");
      return null;
    }

    return response.data.data[0]; // Accessing data property of response
  } catch (error) {
    console.log(
      "Something went wrong while fetching current property data!!!",
      error.response?.data || error.message
    );
    return null;
  }
};

// TEST KYC FORM
const submitTestKycForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/form/test-form`, formData);

    if (response.status !== 200) {
      console.error("Something went wrong, Unable to submit the form");
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Unable to submit the form", error);
    return null;
  }
};

// GET PROPERTY OWNER DETAILS
const getPropertyOwnerDetails = async (ownerId) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/propertyowner-detail/${ownerId}`
    );

    if (!response) {
      console.log("Couldn't fetch property owner details");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching owner details");
  }
};

//GET USER FEED
const getUserFeed = async () => {
  try {
    const response = await axios.get(`${API_URL}/feed/explore-feed`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) {
      console.log("Unable to fetch user feed");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching user feed");
  }
};

//LIKE FEED
const likeFeedApi = async (feedId) => {
  try {
    const response = await axios.post(
      `${API_URL}/feed/like/${feedId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to like/dislike feed");
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong with like feature", error);
    throw error;
  }
};

const likedFeedsApi = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/feed/liked-feeds`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to find liked feeds");
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching liked feeds");
  }
};
// LIKE STATUS
const feedLikeStatusApi = async (feedId) => {
  try {
    const response = await axios.get(`${API_URL}/feed/like-status/${feedId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) {
      console.log("Unable to fetch like status");
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching feed like status", error);
    return null;
  }
};

//SCHEDULE APPOINTMENT
const scheduleAppointmentApi = async (formData) => {
  try {
    console.log("FORM DATA RECEIVED TO BOOK APPOINTMENT: ", formData);

    if (!formData) {
      console.log("Form data not provided");
      return null;
    }

    const response = await axios.post(
      `http://localhost:3001/api/v1/feed/schedule-appointment`,
      formData,
      {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.log("Unable to schedule appointment", error);
  }
};

//GET SENT APPOINTMENTS
const sentAppintmentsApi = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/appointment/sent-appointments`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to fetch sent appointments");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching appointments");
    return null;
  }
};

// GET CONFIRMED APPOINTMENTS
const confirmedAppointmentsApi = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/appointment/confirmed-appointments`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to fetch sent appointments");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching appointments");
    return null;
  }
};
// GET REQUESTED APPOINTMENTS
const requestedAppointmentsApi = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/appointment/requested-appointments`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to fetch sent appointments");
    }

    return response.data.data;
  } catch (error) {
    console.log("Something went wrong while fetching appointments");
    return null;
  }
};

// REJECT APPOINTMENTS
const rejectAppointmentApi = async (appointmentId) => {
  try {
    const response = await axios.post(
      `${API_URL}/appointment/reject-appointment/${appointmentId}`
    );

    if (!response) {
      console.log("Unable to reject appointment");
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while rejecting appointment");
    return null;
  }
};

//ACCEPT APPOINTMENTS
const acceptAppointmentApi = async (appointmentId) => {
  try {
    const response = await axios.post(
      `${API_URL}/appointment/accept-appointment/${appointmentId}`
    );

    if (!response) {
      console.log("Something went wrong while accepting appointment");
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong");
  }
};

// SHORTLIST FEED
const shortlistFeedApi = async (feedId) => {
  try {
    const response = await axios.post(
      `${API_URL}/shortlist/shortlistFeed/${feedId}`,
      {}, // Empty body if no data needs to be sent in the body
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to shortlist feed");
    }

    return response.data;
  } catch (error) {
    console.error(
      "Something went wrong while shortlisting the feed",
      error.response || error
    );
  }
};

//SHORTLISTED FEEDS
const shortlistedFeedsApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/shortlist/shortlisted-feeds`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response) {
      console.log("Unable to get shortlisted feeds");
    }

    return response.data.data;
  } catch (error) {
    console.log("Could not fetch shortlisted feeds");
  }
};

//GET MESSAGES
const getMessagesApi = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/chat/${userId}`, // Replace with dynamic ID if needed
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log("Unable to get messages");
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching messages", error);
    return null; // Return null or an appropriate value in case of error
  }
};

//SEND MESSAGE
const sendMessageApi = async (receiverId, text) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/send-message/${receiverId}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error so it can be caught in the component
  }
};

// GET CONVERSATION USERS
const getConversationsApi = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/chat/users`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response) {
      console.log("Unable to fetch conversations");
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching conversations:", error);
  }
};

export {
  loginUserAPI,
  registerUserAPI,
  currentUserProfileAPI,
  userLogoutAPI,
  submitInitialForm,
  getPropertyInitialFormDetails,
  submitPropertyKycFormDetails,
  submitTestKycForm,
  getCurrentPropertyData,
  updateAvatarAPI,
  getPropertyOwnerDetails,
  getUserFeed,
  likeFeedApi,
  feedLikeStatusApi,
  scheduleAppointmentApi,
  sentAppintmentsApi,
  requestedAppointmentsApi,
  confirmedAppointmentsApi,
  rejectAppointmentApi,
  shortlistFeedApi,
  shortlistedFeedsApi,
  acceptAppointmentApi,
  likedFeedsApi,
  getMessagesApi,
  sendMessageApi,
  getConversationsApi,
};
