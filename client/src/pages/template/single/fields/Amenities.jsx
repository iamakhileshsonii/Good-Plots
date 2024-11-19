import React from "react";

const Amenities = () => {
  return (
    <div className="py-10">
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2">
        Amenities
      </h4>
      <div className="py-2 flex flex-wrap">
        <div className="bg-red-light-1 grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
        <div className="bg-red-light-1 grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
        <div className="bg-red-light-1 grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
        <div className="bg-red-light-1 grid justify-center text-center p-3 rounded-md m-2">
          <i class="fa-solid fa-house"></i>
          <p className="sm:text-xs font-semibold pt-1">Open Parking</p>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
