import axios from "axios";
import React from "react";

const API_URL = "http://localhost:3001/api/v1";
const authToken = localStorage.getItem("goodplotsAuthToken");

// ShortList Feed
export const shortlistfeed = async (feedId) => {
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

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      console.log("Unauthorized Request");
    } else {
      console.log("Unable to shortlist feed");
      return null;
    }
  } catch (error) {
    console.error(
      "Something went wrong while shortlisting the feed",
      error.response || error
    );
  }
};
