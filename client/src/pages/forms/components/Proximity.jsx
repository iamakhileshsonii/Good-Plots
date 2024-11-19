import React from "react";

const Proximity = ({
  market,
  setMarket,
  interStateBusTerminal,
  setInterStateBusTerminal,
  srSecondarySchool,
  setSrSecondarySchool,
  university,
  setUniversity,
  militaryContonment,
  setMilitaryContonment,
  fireStation,
  setFireStation,
  barAndRestaurants,
  setBarAndRestaurants,
  shoppingMall,
  setShoppingMall,
  cinema,
  setCinema,
  publicSwimmingPool,
  setPublicSwimmingPool,
  club,
  setClub,
  townPark,
  setTownPark,
  golfCourse,
  setGolfCourse,
  liquorShop,
  setLiquorShop,
}) => {
  // Generate options from 0.1 to 25 with 0.1 increments
  const options = [];
  for (let i = 0.1; i <= 25; i += 0.1) {
    options.push(i.toFixed(1)); // toFixed to limit decimal places to 1
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Market:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Inter State Bus Terminal:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={interStateBusTerminal}
          onChange={(e) => setInterStateBusTerminal(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sr Secondary School:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={srSecondarySchool}
          onChange={(e) => setSrSecondarySchool(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          University:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Military Contonment:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={militaryContonment}
          onChange={(e) => setMilitaryContonment(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Fire Station:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={fireStation}
          onChange={(e) => setFireStation(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Bar And Restaurants:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={barAndRestaurants}
          onChange={(e) => setBarAndRestaurants(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Shopping Mall:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={shoppingMall}
          onChange={(e) => setShoppingMall(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Cinema:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Public Swimming Pool:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={publicSwimmingPool}
          onChange={(e) => setPublicSwimmingPool(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Club:</label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={club}
          onChange={(e) => setClub(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Town Park:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={townPark}
          onChange={(e) => setTownPark(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Golf Course:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={golfCourse}
          onChange={(e) => setGolfCourse(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Liquor Shop:
        </label>
        <select
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={liquorShop}
          onChange={(e) => setLiquorShop(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option} km
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Proximity;
