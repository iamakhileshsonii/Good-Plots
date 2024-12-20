import KycPropertyCard from "@/components/kyc-property-card";
import { getUserPendingProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const PendingProperties = () => {
  const [properties, setProperties] = useState([]); // State to store pending properties

  // Fetch all pending properties on mount
  useEffect(() => {
    const fetchPendingProperties = async () => {
      const res = await getUserPendingProperties();

      if (res) {
        setProperties(res); // Update state with fetched properties
      } else {
        setProperties([]); // Handle no data case
      }
    };

    fetchPendingProperties();
  }, []);

  // Remove a property from state after deletion
  const handlePropertyDeleted = (propertyId) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property._id !== propertyId)
    );
  };

  return (
    <div className="flex flex-wrap">
      {properties.length > 0 ? (
        properties.map((property) => (
          <KycPropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.expectedPrice}
            description={property.description}
            saleType={property.saleType}
            propertySubtype={property.propertySubtype}
            onDeleteSuccess={handlePropertyDeleted} // Pass the callback to KycPropertyCard
          />
        ))
      ) : (
        <div>No pending properties found.</div>
      )}
    </div>
  );
};

export default PendingProperties;
