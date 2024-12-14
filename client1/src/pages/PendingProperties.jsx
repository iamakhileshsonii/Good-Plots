import PropertyCard from "@/components/property-card";
import { getUserPendingProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const PendingProperties = () => {
  const [properties, setProperties] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchPendingProperties = async () => {
      const res = await getUserPendingProperties();

      if (res) {
        // Ensure res is an array
        console.log("PENDING PROPERTIES: ", res);
        setProperties(res);
      } else {
        setProperties([]); // Set as an empty array if no data found
      }
    };

    fetchPendingProperties();
  }, []);

  return (
    <div className="flex flex-wrap">
      {properties &&
        properties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.expectedPrice}
            description={property.description}
            saleType={property.saleType}
            propertySubtype={property.propertySubtype}
          />
        ))}
    </div>
  );
};

export default PendingProperties;
