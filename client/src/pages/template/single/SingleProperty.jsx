import React from "react";
import { useParams } from "react-router-dom";
import propertyImg from "../../../assets/images/property.jpg";
import Amenities from "./fields/Amenities";
import Sidebar from "./fields/Sidebar";
import TopFacilities from "./fields/TopFacilities";
import Proximity from "./fields/Proximity";
import useGetPropertyData from "../../../hooks/useGetPropertyData";

const SingleProperty = () => {
  const params = useParams(); // Correctly extract propertyId
  const propertyId = params.params;
  const { property, loading, error } = useGetPropertyData(propertyId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!property) {
    return <div>No property data available</div>;
  }

  return (
    <div className="sm:py-10 sm:px-80">
      <div>
        <img
          src={property.propertyData?.photos?.siteView || propertyImg}
          alt="Property"
          className="object-cover w-full h-60 rounded-md"
        />
      </div>
      <div className="flex flex-wrap justify-between p-5">
        <div className="w-3/5">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {property.title}
          </h1>
          <div className="py-8">
            <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2">
              About Property
            </h4>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {property.description || "Property description goes here."}
            </p>
          </div>
          <div>
            <Amenities />
          </div>
          <TopFacilities />
          <Proximity proximity={property?.propertyData?.proximity || {}} />
        </div>
        <div className="w-1/4">
          <Sidebar propertyData={property} />
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
