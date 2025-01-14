import ShortlistedPropertyCard from "@/components/shortlisted-property-card";
import React from "react";

const ShortlistedProperties = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <ShortlistedPropertyCard
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

export default ShortlistedProperties;
