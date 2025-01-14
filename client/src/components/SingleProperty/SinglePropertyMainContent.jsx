import React from "react";

const SinglePropertyMainContent = ({ title, description }) => {
  return (
    <div className="md:col-span-2 bg-white dark:bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-left text-xl text-black font-semibold mb-4 dark:text-white">
        {title}
      </h2>
      <p className="text-left text-black dark:text-white">{description}</p>
    </div>
  );
};

export default SinglePropertyMainContent;
