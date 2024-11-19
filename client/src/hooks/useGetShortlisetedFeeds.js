import React, { useEffect, useState } from "react";
import { shortlistedFeedsApi } from "../services/api";

const useGetShortlisetedFeeds = () => {
  const [shortlistedFeeds, setShortlistedFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortlistedFeeds = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await shortlistedFeedsApi();
        if (!response) {
          console.log("Unable to fetch shortlisted feeds");
        }
        setShortlistedFeeds(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchShortlistedFeeds(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  return { shortlistedFeeds, loading, error };
};

export default useGetShortlisetedFeeds;
