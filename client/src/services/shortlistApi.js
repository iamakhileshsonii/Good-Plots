import axios from "axios";
import React, { useEffect, useState } from "react";

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

// Fetch Shortlisted Feeds
export const shortlistedFeeds = async () => {
  if (!authToken) {
    console.log("Authorization token is missing.");
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/shortlist/shortlisted-feeds`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200 && Array.isArray(response.data?.data)) {
      return response.data;
    } else if (response.status === 401) {
      console.log("Unauthorized Request");

      return null;
    } else {
      console.log("Something went wrong while fetching shortlisted feeds");
      return null;
    }
  } catch (error) {
    console.error("Error fetching shortlisted feeds:", error.message);
    return null;
  }
};
