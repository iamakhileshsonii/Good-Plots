import React, { useEffect, useState } from "react";
import { shortlistedFeedsApi, shortlistFeedApi } from "../../../services/api";
import defaultProperty from "../../../assets/images/property.jpg";
import useGetShortlisetedFeeds from "../../../hooks/useGetShortlisetedFeeds";

const RightSidebar = () => {
  const [likedFeeds, setLikedFeeds] = useState([]);
  const { shortlistedFeeds = [], loading, error } = useGetShortlisetedFeeds(); // Default value for shortlistedFeeds

  useEffect(() => {
    async function fetchLikedFeeds() {
      try {
        const response = await shortlistFeedApi(); // Fetch liked feeds
        setLikedFeeds(response || []); // Ensure response is always an array
      } catch (err) {
        console.error("Error fetching liked feeds:", err);
      }
    }

    fetchLikedFeeds();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div>
      {likedFeeds.length > 0
        ? likedFeeds.map((feed) => (
            <>
              <div
                className="p-3 m-3 rounded-md"
                style={{ boxShadow: `0px 0px 5px #dfdfdf` }}
              ></div>
              <h4 className="font-semibold sm:text-base underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
                Liked Properties
              </h4>
              <div className="rounded-md my-2" key={feed?._id}>
                <a
                  href={`/property/${feed?.listingId}`}
                  className="flex items-center rounded-md py-2 border border-black-light"
                >
                  <div className="sm:w-4/12 sm:px-2">
                    <img
                      src={
                        feed?.feedData[0]?.kycData[0]?.photos?.siteView ||
                        defaultProperty
                      }
                      alt="Property Image"
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="sm:w-8/12 text-xs font-semibold">
                    <h6>{feed?.feedData[0]?.title}</h6>
                    <p className="font-normal text-xs text-black-default">
                      {feed?.feedData[0]?.propertySubtype}
                    </p>
                  </div>
                </a>
              </div>
            </>
          ))
        : ""}

      {shortlistedFeeds.length > 0
        ? shortlistedFeeds.map((feed) => (
            <>
              <div
                className="p-3 m-3 rounded-md"
                style={{ boxShadow: `0px 0px 5px #dfdfdf` }}
              >
                <h4 className="font-semibold sm:text-base underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
                  Shortlisted Properties
                </h4>
                <div className="rounded-md my-2" key={feed?._id}>
                  <a
                    href={`/property/${feed?.listingId}`}
                    className="flex items-center rounded-md py-2 border border-black-light"
                  >
                    <div className="sm:w-4/12 sm:px-2">
                      <img
                        src={
                          feed?.feedData[0]?.kycData[0]?.photos?.siteView ||
                          defaultProperty
                        }
                        alt="Property Image"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="sm:w-8/12 text-xs font-semibold">
                      <h6>{feed?.feedData[0]?.title}</h6>
                      <p className="font-normal text-xs text-black-default">
                        {feed?.feedData[0]?.propertySubtype}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </>
          ))
        : ""}
    </div>
  );
};

export default RightSidebar;
