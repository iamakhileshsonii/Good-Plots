import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultProperty from "../../../assets/images/property.jpg";
import useExcerpt from "../../../hooks/useExcerpt";
import useShortTitle from "../../../hooks/useShortTitle";
import { getCurrentPropertyData } from "../../../services/api";

const ShortlistedCard = ({ feedId }) => {
  const [feed, setFeedData] = useState();
  const excerpt = useExcerpt(feed?.description);
  const title = useShortTitle(feed?.title);

  useEffect(() => {
    async function fetchFeedData() {
      const response = await getCurrentPropertyData(feedId);
      console.log("LIKED CARDS", response);
      setFeedData(response);
    }
    fetchFeedData();
  }, []);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ShortlistedCard;
