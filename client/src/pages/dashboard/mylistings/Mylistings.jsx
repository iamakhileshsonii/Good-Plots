import React from "react";
import SingleListingCard from "./components/SingleListingCard";
import useMyListings from "../../../hooks/useMyListings";

const MyListings = () => {
  const { myListings, loading, error } = useMyListings(); // Use the hook

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="font-semibold sm:text-base underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
        My Listings {`(${myListings[0]?.listings?.length || 0})`}
      </h2>

      <div className="flex flex-wrap my-5 gap-2">
        {myListings[0]?.listings?.length === 0 ? (
          <div>No listings available</div>
        ) : (
          myListings[0]?.listings.map((listing) => (
            <SingleListingCard key={listing._id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyListings;
