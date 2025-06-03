import axios from "axios";
import { apiClient } from "./apiClient";

//GET COUNTRY
export const fetchCountry = async (country) => {
  console.log("API KEY: ", import.meta.env.VITE_GEOPINCODE_API_KEY);

  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${country}/states`,
      {
        headers: {
          "X-CSCAPI-KEY": import.meta.env.VITE_GEOPINCODE_API_KEY, // Use VITE_ prefix in Vite
        },
      }
    );

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Something went wrong while fetching country:", error);
    return [];
  }
};

//GET STATES
export const fetchStates = async ({ country, state }) => {
  console.log("API KEY: ", import.meta.env.VITE_GEOPINCODE_API_KEY);

  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${country}`,
      {
        headers: {
          "X-CSCAPI-KEY": import.meta.env.VITE_GEOPINCODE_API_KEY, // Use VITE_ prefix in Vite
        },
      }
    );

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Something went wrong while fetching states:", error);
    return [];
  }
};

//GET CITIES
export const fetchCities = async (country, state) => {
  try {
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": import.meta.env.VITE_GEOPINCODE_API_KEY, // Use VITE_ prefix in Vite
        },
      }
    );

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Something went wrong while fetching cities:", error);
    return [];
  }
};

//GET PINCODES
export const fetchPincodes = async (country, state, city) => {
  try {
    const response = await axios.get(
      `https://api.zippopotam.us/${country}/${state}/${city}`
      // {
      //   headers: {
      //     "X-CSCAPI-KEY": import.meta.env.VITE_GEOPINCODE_API_KEY, // Use VITE_ prefix in Vite
      //   },
      // }
    );

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Something went wrong while fetching pincodes:", error);
    return [];
  }
};

// router.route("/assign-pincode-to-broker/:userId").post(assignPincodeToBroker);
// router.route("/assign-pincode-to-lawyer/:userId").post(assignPincodeToLawyer);
// router.route("/assigned-lawyers-pins").get(assignedPincodesForLawyers);
// router.route("/assigned-brokers-pins").get(assignedPincodesForBrokers);

// Assign Pincode to Lawyer
export const assignPincodeToLawyer = async (userId, pincodes) => {
  try {
    const pins = Object.keys(pincodes);
    const res = await apiClient.post(
      `/user/assign-pincode-to-lawyer/${userId}`,
      pins
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while assinging pincode to lawyer");
  }
};

// Assign Pincode to Broker
export const assignPincodeToBroker = async (userId, pincodes) => {
  try {
    const pins = Object.keys(pincodes);
    const res = await apiClient.post(
      `/user/assign-pincode-to-broker/${userId}`,
      pins
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Something went wrong while assinging pincode to broker");
  }
};

//Assigned Pins to Broker
export const assignedBrokerPins = async () => {
  try {
    const res = await apiClient.get(`/user/assigned-brokers-pins`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Something went wrong while fetching Broker assigned pins");
  }
};

//Assigned Pins to Lawyer
export const assignedLawyerPins = async () => {
  try {
    const res = await apiClient.get(`/user/assigned-lawyers-pins`);

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error("Something went wrong while fetching Lawyer assigned pins");
  }
};
