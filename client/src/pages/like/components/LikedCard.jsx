import React, { useEffect, useState } from "react";
import { getCurrentPropertyData } from "../../../services/api";
import defaultProperty from "../../../assets/images/property.jpg";
import useExcerpt from "../../../hooks/useExcerpt";
import useShortTitle from "../../../hooks/useShortTitle";
import { Link } from "react-router-dom";

const LikedCard = ({ feedId }) => {
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
            class="size-6 text-red"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default LikedCard;
