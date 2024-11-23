//Property API's

import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";
const authToken = localStorage.getItem("goodplotsAuthToken");

// export const getPropertyData = async (propertyId) => {
//   const [property, setProperty] = useState(null); // Initialized with null for better clarity
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // Initialized with null for better clarity

//   try {
//     setLoading(true);
//     const response = await axios.get(
//       `http://localhost:3001/api/v1/property/${propertyId}`
//     );

//     if (response.status === 200) {
//       setProperty(response.data.data[0]);
//     } else {
//       throw new Error("Property not found");
//     }
//   } catch (error) {
//     setError(error);
//   } finally {
//     setLoading(false);
//   }

//   return { property, loading, error };
// };

export const getVerifiedProperties = async () => {
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

export const getPendingProperties = async () => {
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
