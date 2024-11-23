import React, { useEffect, useState } from "react";
import ShortlistedCard from "./components/ShortlistedCard";

import shortlistImg from "../../assets/images/shortlist.svg";
import toast from "react-hot-toast";
import { shortlistedFeeds } from "../../services/shortlistApi";

const Shortlisted = () => {
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        const res = await shortlistedFeeds();
        if (res) {
          setFeedList(res.data); // Use the correct property from the API response
        }
      } catch (error) {
        toast.error("Unable to fetch shortlisted feeds");
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []); // Ensure no infinite loop by removing `feedList` dependency

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  return (
    <div className="py-6">
      <h4 className="text-center font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
        Shortlisted Properties
      </h4>

      <div className="flex flex-row gap-4 justify-start">
        {feedList.length === 0 ? ( // Use `feedList` for length check
          <div
            className="personalized-content flex flex-col justify-center p-10 rounded-md w-full"
            style={{ boxShadow: "0px 0px 10px rgb(223, 223, 223)" }}
          >
            <div className="grid justify-center my-5">
              <img
                src={shortlistImg}
                alt="No Shortlist"
                className="w-52 h-52"
              />
            </div>
            <p className="text-red font-semibold text-xl">
              It looks like you don't have any shortlisted properties
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
          feedList.map((feed) => (
            <ShortlistedCard
              key={feed?._id} // Always add a unique key in map
              feedId={feed?.listingId}
              id={feed?._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Shortlisted;
