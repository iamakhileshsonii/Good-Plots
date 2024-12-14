import React from "react";
import SinglePropertyOwnerInfo from "./SinglePropertyOwnerInfo";
import SinglePropertyQuickInfo from "./SinglePropertyQuickInfo";
import SinglePropertyInitiatePurchase from "./SinglePropertyInitiatePurchase";
import SinglePropertyImageSlider from "./SinglePropertyImageSlider";

const SinglePropertySidebar = ({ propertyDetails }) => {
  const { propertySubtype, saleType, price, ownerName, ownerContact } =
    propertyDetails || {};

  const propertyImages = [
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x401",
    "https://via.placeholder.com/600x402",
  ];

  return (
    <div className="w-full">
      <SinglePropertyImageSlider images={propertyImages} />
      <SinglePropertyInitiatePurchase />
      <SinglePropertyQuickInfo />
      <SinglePropertyOwnerInfo />
    </div>
  );
};

export default SinglePropertySidebar;
