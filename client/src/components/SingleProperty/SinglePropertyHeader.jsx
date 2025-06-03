import React from "react";
import DefaultProperty from "@/assets/Property.jpg";

const SinglePropertyHeader = ({ propertyImage, propertyTitle }) => {
  console.log(propertyImage);
  return (
    <div className="flex justify-center mt-14">
      {/* Rounded Container */}
      <div className="w-[78%] h-[400px] flex gap-1 rounded-2xl overflow-hidden">
        {/* Left Side: Large Image */}
        <div className="w-2/3 h-full">
          <img
            src={propertyImage?.siteView || DefaultProperty}
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: 2x2 Grid of Small Images */}
        <div className="w-1/3 grid grid-cols-2 grid-rows-2 gap-1">
          {propertyImage?.additionalImages?.length >= 4
            ? propertyImage.additionalImages
                .slice(0, 4)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ))
            : // Fallback in case there are not enough images
              Array(4)
                .fill(DefaultProperty)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Placeholder ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyHeader;
