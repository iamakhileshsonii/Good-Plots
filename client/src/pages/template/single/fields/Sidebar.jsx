import React, { useEffect } from "react";
import PropertyImages from "./PropertyImages";
import AuthInfo from "./AuthInfo";
import { initFlowbite } from "flowbite";
import BuyProperty from "./BuyProperty";

const Sidebar = ({ propertyData }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="">
      <BuyProperty property={propertyData} />
      <PropertyImages images={propertyData?.propertyData?.photos} />
      <div className="p-4 rounded-xl my-2 bg-white shadow-lg border border-black-light">
        <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
          Pricing Details
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <h5 className="font-bold">Price:</h5>
            <p>{propertyData?.expectedPrice || "Price not available"}</p>
          </div>
          <div className="flex justify-between">
            <h5 className="font-bold">Negotiable:</h5>
            <p>{propertyData?.isNegotiable || "Not mentioned"}</p>
          </div>
          <div className="flex justify-between">
            <h5 className="font-bold">Total Area:</h5>
            <p>
              {propertyData?.propertyData?.area.superArea ||
                "Area not available"}
            </p>
          </div>
          <div className="flex justify-between">
            <h5 className="font-bold">Facing:</h5>
            <p>
              {propertyData?.propertyData?.area.facing ||
                "Facing direction not mentioned"}
            </p>
          </div>
          <div className="flex justify-between">
            <h5 className="font-bold">Type:</h5>
            <p>{propertyData?.propertySubtype || "Type not mentioned"}</p>
          </div>
        </div>
      </div>

      <AuthInfo owner={propertyData.ownerData} />
    </div>
  );
};

export default Sidebar;
