//Property API's

import axios from "axios";
import { API_URL, AUTH_TOKEN } from "./api";

const authToken = localStorage.getItem("goodplotsAuthToken");

//Get all verified properties
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

//Get all pending properties
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

//Filter properties
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

//Add new property
const addNewProperty = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/form/initial-form`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    if (response.status !== 200) {
      console.log("Unable to submit the property");
      return null;
    }

    return response.data;
  } catch (error) {
    console.log("Something went wrong while adding new property", error);
  }
};

//Property KYC
const propertyKyc = async (formData, propertyId) => {
  try {
    const res = await axios.post(
      `${API_URL}/property/kyc/${propertyId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      console.log("KYC FORM SUBMITTED: ", res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while submitting kyc form", error);
  }
};

//Upload property kyc images
const uploadPropertyKycImages = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/property/kyc-images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      console.log("All images uploaded successfully", res.data);
      return res.data;
    } else {
      console.error("Error uploading kyc images", res.data);
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while uploading kyc images", error);
  }
};

export {
  getVerifiedProperties,
  getPendingProperties,
  filterProperties,
  addNewProperty,
  propertyKyc,
  uploadPropertyKycImages,
};
