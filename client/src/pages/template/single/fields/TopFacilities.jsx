import React from "react";

const TopFacilities = () => {
  return (
    <div>
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 pb-3">
        Top Facilities
      </h4>
      <div className="py-2 flex flex-wrap">
        <div className="border border-black grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-dungeon"></i>
          <p className="sm:text-xs font-semibold pt-1">Gated Society</p>
        </div>
        <div className="border border-black grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-square-parking"></i>
          <p className="sm:text-xs font-semibold pt-1">Covered Parking</p>
        </div>
        <div className="border border-black grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
        <div className="border border-black grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
      </div>
    </div>
  );
};

export default TopFacilities;
