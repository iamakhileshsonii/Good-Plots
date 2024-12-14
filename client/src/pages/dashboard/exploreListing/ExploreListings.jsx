import React, { useEffect, useState } from "react";

import ListView from "./filter/ListView";
import GridView from "./filter/GridView";
import { getUserFeed } from "../../../services/api";
import { initFlowbite } from "flowbite";
import {
  exploreProperties,
  filterProperties,
} from "../../../services/propertyApi";
import Filter from "../../../components/ui/Filter";
import PropertyCard from "../../../components/ui/PropertyCard";

const ExploreListings = () => {
  useEffect(() => {
    initFlowbite();
  });

  const [listingView, setListingView] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);

  const listingViewToggle = () => {
    setListingView(!listingView);
  };

  //Filter Properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await filterProperties({
          facing: [],
          propertySubtype: [],
          reservedParking: "",
          coveredParking: "",
          openParking: "",
          whetherInCooperativeSociety: "",
          whetherInGatedComplex: "",
          isThisCornerHouse: "",
          saleType: [],
          bhkType: [],
          furnishingType: [],
          possession: [],
          amenities: [],
        });
        if (response) {
          setFeedList(response);
          console.log("FEEDLIST: ", response);
          setLoading(false);
        } else {
          throw new Error("Unable to fectch properties");
        }
      } catch (error) {
        console.log("Unable to fetch feed lists", error);
        return null;
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  //Explore Listings
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await exploreProperties();
        if (res) {
          setFeedList(res);
          setLoading(false);
        } else {
          setFeedList();
          setLoading(false);
        }
      } catch (error) {
        console.log("Something went wrong while fetching properties", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading === true) {
    return <div>Loading...</div>;
  }
  return (
    <div className="block">
      <div className="flex flex-wrap justify-between my-4 px-36">
        <div>
          <h2>All Listings</h2>
        </div>

        <div className="flex gap-4 items-center cursor-pointer">
          <div
            className="bg-red-dark text-white rounded-md py-1 px-2 cursor-pointer"
            data-modal-target="filter-modal"
            data-modal-toggle="filter-modal"
          >
            <span className="text-xs">
              <i class="fa-solid fa-filter"></i> Filter
            </span>
          </div>
        </div>
      </div>

      <div className=" flex flex-wrap justify-start rounded-md">
        {feedList && feedList.length > 0 ? (
          feedList.map((property) => (
            <PropertyCard
              key={property?._id}
              propertyId={property?._id}
              title={property?.title}
              description={property?.description}
              saleType={property?.saleType}
              propertySubtype={property?.propertySubtype}
              totalArea={property?.totalArea}
              property={property}
              expectedPrice={property?.expectedPrice}
              featuredImage={property?.kycDetails?.photos?.siteView}
            />
          ))
        ) : (
          <p>0 Listings found</p>
        )}
      </div>
      <div
        id="filter-modal"
        tabindex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Filter Your Property Search
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="filter-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 h-[700px] overflow-y-scroll">
              <Filter setFeedList={setFeedList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreListings;
