import React from "react";

const Overview = () => {
  return (
    <div className="py-5">
      <h2 className="font-semibold sm:text-base underline decoration-red-dark underline-offset-4 decoration-2 mb-4">
        Overview
      </h2>
      <div className="flex flex-wrap gap-4 py-5">
        <div
          className="grid justify-center rounded-md p-4"
          style={{ boxShadow: `0px 0px 4px rgb(223, 223, 223) ` }}
        >
          <span className="text-center font-bold text-xl">10</span>
          <p className="text-center">Listings</p>
        </div>{" "}
        <div
          className="grid justify-center rounded-md p-4"
          style={{ boxShadow: `0px 0px 4px rgb(223, 223, 223) ` }}
        >
          <span className="text-center font-bold text-xl">10</span>
          <p className="text-center">Liked</p>
        </div>
        <div
          className="grid justify-center rounded-md p-4"
          style={{ boxShadow: `0px 0px 4px rgb(223, 223, 223) ` }}
        >
          <span className="text-center font-bold text-xl">10</span>
          <p className="text-center">Shortlisted</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
