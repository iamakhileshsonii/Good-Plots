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

        if (res.status === 200) {
          setShortlistedFeeds(res.data.data);
          setLoading(false);
        } else {
          return null;
        }
      } catch (error) {
        console.log(
          "Something went wrong while fetching shortlisted feeds",
          error
        );
      }
    };
    fetchShortlistedFeeds();
  }, [authToken]);

  return { shortlistedFeeds, loading };
};

export default useGetShortlistedFeeds;
