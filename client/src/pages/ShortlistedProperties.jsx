import ShortlistedPropertyCard from "@/components/shortlisted-property-card";
import {
  isPropertyShortlisted,
  shortlistedProperties,
} from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const ShortlistedProperties = () => {
  const [properties, setProperties] = useState([]);

  //Fetch liked properties
  const fetchProperties = async () => {
    const res = await shortlistedProperties();
    console.log("SHORTLISTED PROPERTIES: ", res);
    if (res) {
      setProperties(res);
    } else {
      console.log("No Shortlisted Properties Found");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {properties.length > 0
        ? properties.map((property, index) => (
            <ShortlistedPropertyCard
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

export default ShortlistedProperties;
