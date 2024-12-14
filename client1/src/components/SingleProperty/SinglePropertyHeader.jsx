import React from "react";
import DefaultProperty from "@/assets/Property.jpg";

const SinglePropertyHeader = ({ propertyImage, propertyTitle }) => {
  return (
    <div className="relative w-full h-[60vh] rounded-2xl">
      {/* Property Image */}
      <img
        src={DefaultProperty}
        alt="Property"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 rounded-2xl"></div>

      {/* Title Section */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
          {propertyTitle}
        </h1>
      </div>
    </div>
  );
};

export default SinglePropertyHeader;
