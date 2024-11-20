import { useEffect, useState } from "react";
import axios from "axios";

const useMyListings = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/user/my-listings`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setMyListings(response.data.data);
          setLoading(false);
        } else {
          throw new error("Unable to fetch property data");
        }
      } catch (error) {
        console.log(
          "Something went wrong while fetching pending listings",
          error
        );
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  return { myListings, loading };
};

export default useMyListings;
