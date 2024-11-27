//Property API's

import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";
const authToken = localStorage.getItem("goodplotsAuthToken");

const getVerifiedProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/property/verified-properties`);

    if (response.status === 200) {
      return response.data.data; // Return only the data for simplicity
    } else {
      throw new Error("Failed to fetch verified properties");
    }
  } catch (error) {
    console.error("Error while fetching verified properties:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const getPendingProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/property/pending-properties`);

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch verified properties");
    }
  } catch (error) {
    console.log(
      "Something went wrong while fetching verified properties",
      error
    );
  }
};

const filterProperties = async (filters) => {
  try {
    // Remove filters with empty or default values
    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0; // Include if the array has values
        }
        return value !== ""; // Include if the value is not an empty string
      })
    );

    // Construct query string from cleaned filters
    const queryString = new URLSearchParams(cleanedFilters).toString();

    // Make the API call
    const response = await axios.get(
      `${API_URL}/property/filter?${queryString}`
    );

    return response.data.data; // Return the filtered properties
  } catch (error) {
    console.error("Something went wrong while filtering the properties", error);
  }
};

export { getVerifiedProperties, getPendingProperties, filterProperties };
