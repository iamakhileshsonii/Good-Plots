import React, { useState } from "react";

const Proximity = ({ proximity }) => {
  const [viewAll, setViewAll] = useState(false);
  const handleViewToggle = () => {
    setViewAll(!viewAll);
  };

  return (
    <div className="py-10">
      <div className="flex gap-2 items-center">
        <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2">
          Location Advantages
        </h4>{" "}
        <p
          onClick={handleViewToggle}
          className="self-center text-xs font-semibold cursor-pointer text-blue-default bg-black-light px-2 rounded-sm"
        >
          {viewAll ? "View Less" : "View All"}
        </p>
      </div>

      <div className="py-2 flex flex-wrap">
        <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
          <i className="fa-solid fa-truck-medical text-2xl"></i>
          <div className="grid">
            <p className="sm:text-base font-semibold pt-1">Hospital</p>
            <p className="sm:text-base text-black-default pt-1 text-left">
              6.0km
            </p>
          </div>
        </div>
        <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
          <i className="fa-solid fa-shop text-2xl"></i>
          <div className="grid">
            <p className="sm:text-base font-semibold pt-1">Market</p>
            <p className="sm:text-base text-black-default pt-1 text-left">
              {proximity?.market}Km
            </p>
          </div>
        </div>
        <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
          <i className="fa-solid fa-fire-extinguisher text-2xl"></i>
          <div className="grid">
            <p className="sm:text-base font-semibold pt-1">Fire Station</p>
            <p className="sm:text-base text-black-default pt-1 text-left">
              {proximity?.fireStation}Km
            </p>
          </div>
        </div>
        {viewAll && (
          <>
            <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
              <i className="fa-solid fa-film text-2xl"></i>
              <div className="grid">
                <p className="sm:text-base font-semibold pt-1">Cinema</p>
                <p className="sm:text-base text-black-default pt-1 text-left">
                  {proximity?.cinema}Km
                </p>
              </div>
            </div>
            <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
              <i className="fa-solid fa-school text-2xl"></i>
              <div className="grid">
                <p className="sm:text-base font-semibold pt-1">
                  Sr Secondary School
                </p>
                <p className="sm:text-base text-black-default pt-1 text-left">
                  {proximity?.srSecondarySchool}Km
                </p>
              </div>
            </div>
            <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
              <i className="fa-solid fa-utensils text-2xl"></i>
              <div className="grid">
                <p className="sm:text-base font-semibold pt-1">
                  Bar & Restaurant
                </p>
                <p className="sm:text-base text-black-default pt-1 text-left">
                  {proximity?.barAndRestaurants}Km
                </p>
              </div>
            </div>
            <div className="border border-black-light flex justify-start text-center p-3 rounded-md m-2 items-center gap-2">
              <i className="fa-solid fa-person-swimming text-2xl"></i>
              <div className="grid">
                <p className="sm:text-base font-semibold pt-1">Swimming Pool</p>
                <p className="sm:text-base text-black-default pt-1 text-left">
                  {proximity?.publicSwimmingPool}Km
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Proximity;
