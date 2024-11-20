import axios from "axios";
import { useEffect, useState } from "react";

const useGetShortlistedFeeds = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [shortlistedFeeds, setShortlistedFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShortlistedFeeds = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3001/api/v1/shortlist/shortlisted-feeds`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setShortlistedFeeds(res.data.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setShortlistedFeeds([]); // Fallback to empty array
        }
      } catch (error) {
        console.error(
          "Something went wrong while fetching shortlisted feeds:",
          error
        );
        setShortlistedFeeds([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchShortlistedFeeds();
  }, [authToken]);

  return { shortlistedFeeds, loading };
};

export default useGetShortlistedFeeds;
