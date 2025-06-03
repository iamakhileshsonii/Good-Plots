import LikedPropertyCard from "@/components/liked-property-card";
import { likedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const LikedProperties = () => {
  const [properties, setProperties] = useState([]);

  //Fetch liked properties
  const fetchLikedProperties = async () => {
    try {
      const res = await likedProperties();
      console.log("LIKED PROPERTIES: ", res);
      if (res) {
        setProperties(res);
      } else {
        console.log("No Liked Properties Found");
      }
    } catch (error) {
      console.error("Unable to fetch liked properties", error);
    }
  };

  useEffect(() => {
    fetchLikedProperties();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {properties.length > 0
        ? properties.map((property, index) => (
            <LikedPropertyCard
              id={property?.property?._id}
              featuredImage={
                property?.property?.propertyDetails[0]?.photos?.siteView
              }
              title={property?.property?.title}
              saleType={property?.property?.saleType}
              price={property?.property?.expectedPrice}
              propertySubtype={property?.property?.propertySubtype}
              description={property?.property?.description}
            />
          ))
        : "No Properties Found"}
    </div>
  );
};

export default LikedProperties;
