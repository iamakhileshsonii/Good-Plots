import React, { useEffect, useState } from "react";
import likeImg from "../../assets/images/like.svg";
import { likedFeeds } from "../../services/likeFeedApi";
import LikedCard from "./components/LikedCard";

const Liked = () => {
  const [feeds, setFeed] = useState([]); // Set initial state to an empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedFeed = async () => {
      setLoading(true);
      try {
        const response = await likedFeeds();
        if (response && response.data) {
          setFeed(response.data);
        }
      } catch (error) {
        console.error("Error fetching liked feeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchedFeed();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="py-6">
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4 text-center">
        Liked Properties
      </h4>

      <div className="flex flex-row gap-4 justify-start">
        {feeds.length === 0 ? ( // Safely access `length` as `feeds` is always an array
          <div
            className="personalized-content p-10 rounded-md w-full"
            style={{ boxShadow: "0px 0px 10px rgb(223, 223, 223)" }}
          >
            <div className="grid justify-center my-5">
              <img src={likeImg} alt="Chat" className="w-52 h-52" />
            </div>
            <p className="text-red font-semibold text-xl">
              It looks like you don't have any liked properties
            </p>
            <ul className="py-4 px-4">
              <li>
                <i className="fa-solid fa-caret-right"></i> Explore properties
              </li>
              <li>
                <i className="fa-solid fa-caret-right"></i> About goodplots
              </li>
            </ul>
          </div>
        ) : (
          feeds.map((feed) => (
            <LikedCard
              feedId={feed?.listingId}
              key={feed?._id}
              feed={feed?.feed[0]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Liked;
