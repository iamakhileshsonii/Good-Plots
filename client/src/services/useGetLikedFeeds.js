import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./api";

const useGetLikedFeeds = () => {
  const authToken = localStorage.getItem("goodplotsAuthToken");
  const [likedFeeds, setLikedFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getlikedFeeds = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/feed/liked-feeds`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.status == 200) {
          setLikedFeeds(res.data.data);
          setLoading(false);
        } else {
          return null;
        }
      } catch (error) {
        console.log("Something went wrong while fetching liked feeds", error);
        return null;
      }
    };
    getlikedFeeds();
  }, [authToken]);

  return { loading, likedFeeds };
};

export default useGetLikedFeeds;
