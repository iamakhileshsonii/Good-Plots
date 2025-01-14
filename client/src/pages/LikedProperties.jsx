import LikedPropertyCard from "@/components/liked-property-card";
import { likedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const LikedProperties = () => {
  const [properties, setProperties] = useState(null);

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
      {/* STATIC CARD */}
      <LikedPropertyCard
        id={1}
        featuredImage={null}
        title={"asdasd"}
        saleType={"asdasd"}
        price={"1231"}
        propertySubtype={"1asdasd"}
        description={"loremsda asd asdasdasdasd"}
      />
    </div>
  );
};

export default LikedProperties;
