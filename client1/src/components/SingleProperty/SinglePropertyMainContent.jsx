import React from "react";

const SinglePropertyMainContent = ({ title, description }) => {
  return (
    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-left text-xl font-semibold mb-4">{title}</h2>
      <p className="text-left">{description}</p>
    </div>
  );
};

export default SinglePropertyMainContent;
