import React, { useEffect, useState } from "react";
import { filterProperties } from "../../services/propertyApi";
import { initFlowbite } from "flowbite";

const Filter = ({ setFeedList }) => {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [filters, setFilters] = useState({
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

  const Amenities = [
    { id: 1, labelName: "Gas Pipeline", value: "Gas Pipeline" },
    { id: 2, labelName: "Swimming Pool", value: "Swimming Pool" },
    { id: 3, labelName: "Gym", value: "Gym" },
    { id: 4, labelName: "Lift", value: "Lift" },
    { id: 5, labelName: "Gated Society", value: "Gated Society" },
    { id: 6, labelName: "Parking", value: "Parking" },
  ];
  const BHKType = [
    { id: 1, labelName: "1 BHK", value: "1 BHK" },
    { id: 2, labelName: "2 BHK", value: "2 BHK" },
    { id: 3, labelName: "3 BHK", value: "3 BHK" },
    { id: 4, labelName: "3+ BHK", value: "3+ BHK" },
  ];
  const Possession = [
    { id: 1, labelName: "Ready to move", value: "Ready to move" },
    { id: 2, labelName: "In 1 year", value: "In 1 year" },
    { id: 3, labelName: "In 3 year ", value: "In 3 year " },
    { id: 4, labelName: "Beyond 3 Years", value: "Beyond 3 Years" },
  ];
  const FurnishingType = [
    { id: 1, labelName: "Unfurnished", value: "Unfurnished" },
    { id: 2, labelName: "Semi Furnished", value: "Semi Furnished" },
    { id: 3, labelName: "Fully Furnished", value: "Fully Furnished" },
  ];
  const SaleType = [
    { id: 1, labelName: "Rent", value: "rent" },
    { id: 2, labelName: "Sale", value: "sale" },
  ];
  const PropertyType = [
    { id: 1, labelName: "House", value: "House" },
    { id: 2, labelName: "Apartment", value: "Apartment" },
    { id: 3, labelName: "Plot/ Land", value: "Plot/ Land" },
    { id: 4, labelName: "Builder Floor", value: "Builder Floor" },
    { id: 5, labelName: "Studio", value: "Studio" },
    { id: 6, labelName: "Duplex", value: "Duplex" },
    { id: 7, labelName: "Penthouse", value: "Penthouse" },
    { id: 8, labelName: "Villa", value: "Villa" },
  ];
  const Facing = [
    { id: 1, labelName: "North", value: "North" },
    { id: 2, labelName: "East", value: "East" },
    { id: 3, labelName: "West", value: "West" },
    { id: 4, labelName: "South", value: "South" },
    { id: 5, labelName: "North-East", value: "North-East" },
    { id: 6, labelName: "North-West", value: "North-West" },
    { id: 7, labelName: "South-East", value: "South-East" },
    { id: 8, labelName: "South–West", value: "South–West" },
  ];

  const Parking = [
    {
      id: 1,
      labelName: "Reserved Parking",
      value: "yes",
    },
    { id: 2, labelName: "Covered Parking", value: "yes" },
    { id: 3, labelName: "Open parking", value: "yes" },
  ];

  const filterConfig = [
    { title: "Type", field: "propertySubtype", options: PropertyType },
    { title: "Sale Type", field: "saleType", options: SaleType },
    {
      title: "Furnishing Type",
      field: "furnishingType",
      options: FurnishingType,
    },
    { title: "Possession", field: "possession", options: Possession },
    { title: "Facing", field: "facing", options: Facing },
    { title: "BHK Type", field: "bhkType", options: BHKType },
    { title: "Amenities", field: "amenities", options: Amenities },
  ];

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => {
      // Handle multi-select checkboxes
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item) => item !== value),
        };
      }
      // Handle other input types
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const applyFilter = async (e) => {
    e.preventDefault();
    const res = await filterProperties(filters);
    setFeedList(res);
  };

  const clearFilter = async (e) => {
    e.preventDefault();
    setFilters({
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

    const res = await filterProperties({
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
    setFeedList(res);
  };

  return (
    <div className="sm:w-full">
      {filterConfig.map((filter, index) => (
        <div className="mt-1 mb-14" key={index}>
          <h6 className="font-semibold py-1">{filter.title}</h6>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
            {filter.options.map((option, index) => (
              <li
                className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                key={`${option.labelName}-${index}`}
              >
                <div className="flex items-center pl-3">
                  <input
                    id={`${option.labelName}`}
                    type="checkbox"
                    value={`${option.value}`}
                    name={filter.field}
                    checked={filters[filter.field]?.includes(option.value)}
                    className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleFilterChange}
                  />
                  <label
                    htmlFor={`${option.labelName}`}
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {`${option.labelName}`}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div
        className="mt-5 pt-5 flex gap-5 justify-center absolute bottom-0 right-0 left-0 z-50 "
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(4,4,4,0.32))",
        }}
      >
        <button
          className="text-black-dark underline underline-offset-4 py-1 px-4 rounded-md mb-4"
          data-modal-hide="filter-modal"
          onClick={clearFilter}
        >
          Clear Filters
        </button>
        <button
          className="bg-red-dark text-white py-1 px-4 rounded-md mb-4 hover:bg-red-700 transition duration-400 ease-in-out"
          onClick={applyFilter}
          data-modal-hide="filter-modal"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
