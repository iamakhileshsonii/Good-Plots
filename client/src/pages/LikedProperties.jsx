import { likedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const LikedProperties = () => {
  const [properties, setProperties] = useState(null);

  useEffect(() => {
    const fetchLikedProperties = async () => {
      try {
        const res = await likedProperties();

        if (res) {
          setProperties(res);
        }
      } catch (error) {
        console.error("Unable to fetch liked properties", error);
      }
    };

    fetchLikedProperties();
  }, []);

  return <div>LikedProperties</div>;
};

export default LikedProperties;
