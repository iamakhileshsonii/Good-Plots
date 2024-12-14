import PropertyCard from "@/components/property-card";
import { getUserVerifiedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const VerifiedProperties = () => {
  const [properties, setProperties] = useState(); // Initialize with an empty array

  useEffect(() => {
    const fetchVerifiedProperties = async () => {
      const res = await getUserVerifiedProperties();

      if (res) {
        // Ensure res is an array
        console.log("VERIFIED PROPERTIES: ", res);
        setProperties(res);
      } else {
        setProperties([]); // Set as an empty array if no data found
      }
    };

    fetchVerifiedProperties();
  }, []);

  return (
    <div className="flex flex-wrap">
      {/* {properties.length > 0
        ? properties.map((property, index) => (
            <div>
              <p key={index}>Property</p>
            </div>
          )) // Added a key for list items
        : "No properties found"} */}

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

export default VerifiedProperties;
