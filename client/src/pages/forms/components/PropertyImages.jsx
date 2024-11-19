import React from "react";

const PropertyImages = (props) => {
  const {
    setSiteView,
    setMaterPlan,
    setLocation,
    setMap,
    setOtherPhoto,
    setExteriorView,
    setLivingRoom,
    setBedroomsImage,
    setKitchen,
    setFloorPlan,
  } = props;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="siteView"
          >
            Site View
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="siteView"
            name="siteView"
            type="file"
            onChange={(e) => setSiteView(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="masterPlan"
          >
            Mater Plan
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="materPlan"
            name="materPlan"
            type="file"
            onChange={(e) => setMaterPlan(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="location"
            name="location"
            type="file"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="map"
          >
            Map
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="map"
            name="map"
            type="file"
            onChange={(e) => setMap(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="otherPhoto"
          >
            Other Photo
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="otherPhoto"
            name="otherPhoto"
            type="file"
            onChange={(e) => setOtherPhoto(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="exteriorView"
          >
            Exterior View
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="exteriorView"
            name="exteriorView"
            type="file"
            onChange={(e) => setExteriorView(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="livingRoom"
          >
            Living Room
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="livingRoom"
            name="livingRoom"
            type="file"
            onChange={(e) => setLivingRoom(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="bedroomsImage"
          >
            Bedrooms
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="bedroomsImage"
            name="bedroomsImage"
            type="file"
            onChange={(e) => setBedroomsImage(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="kitchen"
          >
            Kitchen
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="kitchen"
            name="kitchen"
            type="file"
            onChange={(e) => setKitchen(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="floorPlan"
          >
            Floor Plan
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="floorPlan"
            name="floorPlan"
            type="file"
            onChange={(e) => setFloorPlan(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyImages;
