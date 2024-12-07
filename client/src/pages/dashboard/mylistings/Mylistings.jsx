import React from "react";
import MyListingPropertyCard from "../../../components/ui/MyListingPropertyCard";
import useMyListings from "../../../services/useMyListings";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myListings[0]?.listings?.length === 0 ? (
          <div>No listings available</div>
        ) : (
          myListings[0]?.listings.map((listing) => (
            <MyListingPropertyCard key={listing._id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyListings;
