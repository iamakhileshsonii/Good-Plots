import React from "react";

const Filter = () => {
  const Amenities = [
    { id: 1, labelName: "Gas Pipeline" },
    { id: 2, labelName: "Swimming Pool" },
    { id: 3, labelName: "Gym" },
    { id: 4, labelName: "Lift" },
    { id: 5, labelName: "Gated Society" },
    { id: 6, labelName: "Parking" },
  ];
  const BHKType = [
    { id: 1, labelName: "1 BHK" },
    { id: 2, labelName: "2 BHK" },
    { id: 3, labelName: "3 BHK " },
    { id: 4, labelName: "3+ BHK" },
  ];
  const Possession = [
    { id: 1, labelName: "Ready to move" },
    { id: 2, labelName: "In 1 year" },
    { id: 3, labelName: "In 3 year " },
    { id: 4, labelName: "Beyond 3 Years" },
  ];
  const FurnishingType = [
    { id: 1, labelName: "Unfurnished" },
    { id: 2, labelName: "Semi Furnished" },
    { id: 3, labelName: "Fully Furnished" },
  ];
  const SaleType = [
    { id: 1, labelName: "Rent", value: "rent" },
    { id: 2, labelName: "Sale", value: "sale" },
  ];
  const PropertyType = [
    { id: 1, labelName: "House" },
    { id: 2, labelName: "Apartment" },
    { id: 3, labelName: "Plot/ Land" },
    { id: 4, labelName: "Builder Floor" },
    { id: 5, labelName: "Studio" },
    { id: 6, labelName: "Duplex" },
    { id: 7, labelName: "Penthouse" },
    { id: 8, labelName: "Villa" },
  ];
  const Facing = [
    { id: 1, labelName: "North", value: "North" },
    { id: 2, labelName: "East" },
    { id: 3, labelName: "West" },
    { id: 4, labelName: "South" },
    { id: 5, labelName: "North- East" },
    { id: 6, labelName: "North - West" },
    { id: 7, labelName: "South - East" },
    { id: 8, labelName: "South – West" },
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

  return (
    <div className="sm:w-full">
      <div className="mt-1">
        <h6 className="font-semibold py-1">Type</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {PropertyType.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10">
        <h6 className="font-semibold py-1">Sale Type</h6>
        <ul className="items-center justify-evenly w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {SaleType.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0  dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10">
        <h6 className="font-semibold py-1">Furnishing Type:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {FurnishingType.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10">
        <h6 className="font-semibold py-1">Possession:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {Possession.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10">
        <h6 className="font-semibold py-1">Facing:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {Facing.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10">
        <h6 className="font-semibold py-1">BHK Type:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {BHKType.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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

      <div className="mt-10 mb-20">
        <h6 className="font-semibold py-1">Amenities:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {Amenities.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.labelName}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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
      <div className="mt-10 mb-20">
        <h6 className="font-semibold py-1">Parking:</h6>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-wrap">
          {Parking.map((option) => (
            <li className="w-1/3 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div className="flex items-center pl-3">
                <input
                  id={`${option.labelName}`}
                  type="checkbox"
                  value={`${option.value}`}
                  className="w-4 h-4 text-red-dark bg-gray-100 border-gray-300 rounded focus:ring-red dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
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

      <div
        className="mt-2 pt-5 flex justify-center absolute bottom-0 right-0 left-0 z-50 "
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(4,4,4,0.32))",
        }}
      >
        <button className="bg-red-dark text-white py-1 px-4 rounded-md mb-4">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
