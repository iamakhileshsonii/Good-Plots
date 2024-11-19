import React, { useEffect, useState } from "react";
import ShortlistedCard from "./components/ShortlistedCard";
import { shortlistedFeedsApi } from "../../services/api";
import shortlistImg from "../../assets/images/shortlist.svg";
import useGetShortlistedFeeds from "../../hooks/useGetShortlistedFeeds";

const Shortlisted = () => {
  const { shortlistedFeeds, loading } = useGetShortlistedFeeds();
  console.log("Shortlisted Feeds: ", shortlistedFeeds);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-6">
      <h4 className="text-center font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
        Shortlisted Properties
      </h4>

      <div className="flex flex-row gap-4 justify-start">
        {shortlistedFeeds.length === 0 ? (
          <div
            className="personalized-content flex flex-col justify-center p-10 rounded-md w-full"
            style={{ boxShadow: "0px 0px 10px rgb(223, 223, 223)" }}
          >
            <div className="grid justify-center my-5">
              <img src={shortlistImg} alt="Chat" className="w-52 h-52" />
            </div>
            <p className="text-red font-semibold text-xl">
              It looks like you don't have any shortlisted properties
            </p>
            <ul className="py-4 px-4">
              <li>
                <i class="fa-solid fa-caret-right"></i> Explore properties
              </li>
              <li>
                <i class="fa-solid fa-caret-right"></i> About goodplots
              </li>
            </ul>
          </div>
        ) : (
          shortlistedFeeds.map((feed) => (
            <ShortlistedCard feedId={feed?.listingId} id={feed?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Shortlisted;
