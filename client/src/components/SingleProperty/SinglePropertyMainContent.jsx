import React from "react";

import PropertyAmentities from "./PropertyAmentities";
import PropertyProximity from "./PropertyProximity";

const SinglePropertyMainContent = ({
  title,
  description,
  amenities,
  proximity,
  subtype,
  price,
  totalArea,
}) => {
  return (
    <div className="md:col-span-2 bg-white dark:bg-black p-6 rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1
            className="text-left  text-2xl text-black font-semibold mb-4 dark:text-white "
            style={{ margin: "0px" }}
          >
            {title}
          </h1>
          <p className="text-left text-black dark:text-white">{subtype}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-left text-primary text-2xl font-bold">₹{price}</p>
          <span className="text-left text-md font-semibold text-gray-600">
            {totalArea} Sq.Ft.
          </span>
        </div>
      </div>

      <PropertyAmentities amenities={amenities} />
      <PropertyProximity proximity={proximity} />
    </div>
  );
};

export default SinglePropertyMainContent;
