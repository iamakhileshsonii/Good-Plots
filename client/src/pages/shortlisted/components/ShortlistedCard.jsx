import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultProperty from "../../../assets/images/property.jpg";
import useExcerpt from "../../../hooks/useExcerpt";
import useShortTitle from "../../../hooks/useShortTitle";
import { getCurrentPropertyData } from "../../../services/api";
import { shortlistfeed } from "../../../services/shortlistApi.js";

const ShortlistedCard = ({ feedId }) => {
  const [feed, setFeedData] = useState();
  const [isShortlisted, setIsShortlisted] = useState(true);
  const excerpt = useExcerpt(feed?.description);
  const title = useShortTitle(feed?.title);

  useEffect(() => {
    async function fetchFeedData() {
      const response = await getCurrentPropertyData(feedId);
      setFeedData(response);
    }
    fetchFeedData();
  }, [feedId]);

  const toggleShortlist = async (e) => {
    e.preventDefault(); // Prevent navigation triggered by the Link
    const res = await shortlistfeed(feedId);
    if (res) {
      console.log("Shortlisted feed api call", res.data);
    }
    setIsShortlisted(!isShortlisted);
  };

  return (
    <Link
      to={`/property/${feedId}`}
      className="block shadow-lg border border-black-light sm:w-3/12 p-3 rounded-xl"
    >
      <div>
        <div className="grid h-36 justify-center">
          <img
            src={feed?.propertyData[0]?.photos?.siteView || defaultProperty}
            alt=""
            className="rounded-md object-cover h-36"
          />
        </div>

        <div className="grid">
          <h2 className="font-bold text-base py-2">{title}</h2>
          <p className="text-sm text-black-default">{excerpt}</p>
        </div>
        <div className="flex justify-end gap-4 mt-5">
          {isShortlisted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 cursor-pointer"
              onClick={toggleShortlist}
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={toggleShortlist}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShortlistedCard;
