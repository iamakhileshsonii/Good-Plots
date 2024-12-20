import PropertyCard from "@/components/property-card";
import { getUserVerifiedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const VerifiedProperties = () => {
  const [properties, setProperties] = useState(); // Initialize with an empty array

  useEffect(() => {
    const fetchVerifiedProperties = async () => {
      const res = await getUserVerifiedProperties();

      if (res) {
        setProperties(res);
      } else {
        setProperties([]); // Set as an empty array if no data found
      }
    };

    fetchVerifiedProperties();
  }, []);

  return (
    <div className="flex flex-wrap">
      {properties &&
        properties.map((property) => (
          <PropertyCard
            key={property?._id}
            id={property?._id}
            title={property?.title}
            price={property?.expectedPrice}
            description={property?.description}
            saleType={property?.saleType}
            propertySubtype={property.propertySubtype}
            featuredImage={property?.details[0]?.photos?.siteView}
          />
        ))}
    </div>
  );
};

export default VerifiedProperties;
