import { apiClient } from "./apiClient";

// All Brokers
export const allbrokers = async () => {
  try {
    const res = await apiClient.get(`/user/all-broker`);

    if (res) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while fetching all brokers");
  }
};

// All Buyer/ Sellers
export const allBuyerSeller = async () => {
  try {
    const res = await apiClient.get(`/user/all-buyer-seller`);
    console.log(res.data);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while fetching all brokers");
  }
};

// Fetch All Users
export const fetchAllUsers = async () => {
  try {
    const res = await apiClient.get(`/user/all-users`);
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Something went wrong while fetching all users");
  }
};
