import React from "react";
import SinglePropertyOwnerInfo from "./SinglePropertyOwnerInfo";
import SinglePropertyQuickInfo from "./SinglePropertyQuickInfo";
import SinglePropertyInitiatePurchase from "./SinglePropertyInitiatePurchase";
import SinglePropertyImageSlider from "./SinglePropertyImageSlider";

const SinglePropertySidebar = ({ property, propertyImg }) => {
  return (
    <div className="w-full">
      <SinglePropertyImageSlider images={property?.kycDetails[0]?.photos} />
      <SinglePropertyInitiatePurchase
        totalPaymentAmount={property?.expectedPrice}
        earnestMoney={property?.earnestMoney}
        totalTime={property?.totalTime}
        totalArea={property?.totalArea}
        title={property?.title}
        propertySubtype={property?.saleType}
        owner={property?.owner}
        propertyId={property?._id}
      />
      <SinglePropertyQuickInfo />
      <SinglePropertyOwnerInfo />
    </div>
  );
};

export default SinglePropertySidebar;
