import React, { useEffect, useState } from "react";
import { likedFeedsApi } from "../../services/api";
import LikedCard from "./components/LikedCard";
import likeImg from "../../assets/images/like.svg";
import useGetLikedFeeds from "../../hooks/useGetLikedFeeds";

const Liked = () => {
  const { loading, likedFeeds } = useGetLikedFeeds();

  console.log("LIKED FEEDS", likedFeeds);

  return (
    <div className="py-6">
      <h4 className=" font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4 text-center">
        Liked Properties
      </h4>

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-row gap-4 justify-start">
          {likedFeeds.length === 0 ? (
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
                  <i class="fa-solid fa-caret-right"></i> Explore properties
                </li>
                <li>
                  <i class="fa-solid fa-caret-right"></i> About goodplots
                </li>
              </ul>
            </div>
          ) : (
            likedFeeds.map((feed) => (
              <LikedCard feedId={feed?.listingId} key={feed?._id} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Liked;
