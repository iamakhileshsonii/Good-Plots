import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/api/v1";
const authToken = localStorage.getItem("goodplotsAuthToken");

// Like Feed
export const like = async ({ feedId }) => {
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

    if (response.status === 200) {
      console.log("Like added successfully");
      return response.data;
    } else if (response.status === 401) {
      console.log("Unauthorized request");
      return null;
    }
  } catch (error) {
    console.log("Something went wrong while liking the feed", error);
  }
};

// Liked Feeds
export const likedFeeds = async () => {
  try {
    const response = await axios.get(`${API_URL}/feed/liked-feeds`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log("Liked feeds fetched successfully");
      return response.data;
    } else if (response.status === 401) {
      console.log("Unauthorized request");
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while fetching liked feeds");
  }
};
