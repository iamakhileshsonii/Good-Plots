import React from "react";

const FurnishedAmenities = ({
  lights,
  setLights,
  ac,
  setAC,
  fans,
  setFans,
  tv,
  setTV,
  beds,
  setBeds,
  wardrobe,
  setWardrobe,
}) => {
  const numberDropdown = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  const handleLightsChange = (event) => {
    setLights(event.target.value);
  };

  const handleACChange = (event) => {
    setAC(event.target.value);
  };

  const handleFansChange = (event) => {
    setFans(event.target.value);
  };

  const handleTVChange = (event) => {
    setTV(event.target.value);
  };

  const handleBedsChange = (event) => {
    setBeds(event.target.value);
  };

  const handleWardrobeChange = (event) => {
    setWardrobe(event.target.value);
  };

  return (
    <div className="sm:py-5 grid grid-cols-6 gap-4">
      <div className="col-span-1 flex items-center">
        <label htmlFor="lightsDropdown" className="mr-2">
          Lights:
        </label>
        <select
          id="lightsDropdown"
          value={lights}
          onChange={handleLightsChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1 flex items-center">
        <label htmlFor="acDropdown" className="mr-2">
          AC:
        </label>
        <select
          id="acDropdown"
          value={ac}
          onChange={handleACChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1 flex items-center">
        <label htmlFor="fansDropdown" className="mr-2">
          Fans:
        </label>
        <select
          id="fansDropdown"
          value={fans}
          onChange={handleFansChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1 flex items-center">
        <label htmlFor="tvDropdown" className="mr-2">
          TV:
        </label>
        <select
          id="tvDropdown"
          value={tv}
          onChange={handleTVChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1 flex items-center">
        <label htmlFor="bedsDropdown" className="mr-2">
          Beds:
        </label>
        <select
          id="bedsDropdown"
          value={beds}
          onChange={handleBedsChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-1 flex items-center">
        <label htmlFor="wardrobeDropdown" className="mr-2">
          Wardrobe:
        </label>
        <select
          id="wardrobeDropdown"
          value={wardrobe}
          onChange={handleWardrobeChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700"
        >
          {numberDropdown.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FurnishedAmenities;
