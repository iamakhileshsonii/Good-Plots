import React from "react";
// import defaultLogo from "@/assets/property.jpg";
import defaultLogo from "@/assets/property1.webp";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoResults({
  mainTitle,
  mainDesc,
  mainLink,
  card1logo,
  card1title,
  card1desc,
  card1link,
  card2logo,
  card2title,
  card2desc,
  card2link,
  card3logo,
  card3title,
  card3desc,
  card3link,
  card1linkText,
  card2linkText,
  card3linkText,
}) {
  return (
    <div className="flex flex-col w-[90%] sm:w-4/5">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col items-baseline w-full md:w-1/4 ">
          <h2 className="text-2xl font-semibold text-left">{mainTitle}</h2>
          <p className="text-lg text-left">{mainDesc}</p>
          <Link to={mainLink}>
            <button className="bg-primary text-white px-4 py-1 text-sm rounded mt-4">
              Properties
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/4">
          <img src={defaultLogo} alt="Not Found" className="" />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-evenly gap-6 md-gap-2">
        <div className="md:w-1/4 w-full flex flex-col items-baseline shadow drop-shadow-sm p-4 rounded gap-4">
          <div className="flex gap-2 items-center">
            {/* <Search className="size-4" /> */}

            {card1logo}

            <h2 className="text-md font-semibold text-left">{card1title}</h2>
          </div>
          <p className="text-md text-left">{card1desc}</p>
          <Link to={card1link} className="text-primary">
            {card1linkText}
          </Link>
        </div>
        <div className="md:w-1/4 w-full flex flex-col items-baseline shadow drop-shadow-sm p-4 rounded gap-4">
          <div className="flex gap-2 items-center">
            {card2logo}
            <h2 className="text-md font-semibold text-left">{card2title}</h2>
          </div>
          <p className="text-md text-left">{card2desc}</p>
          <Link to={card2link} className="text-primary">
            {card2linkText}
          </Link>
        </div>
        <div className="md:w-1/4 w-full flex flex-col items-baseline shadow drop-shadow-sm p-4 rounded gap-4">
          <div className="flex gap-2 items-center">
            {card3logo}
            <h2 className="text-md font-semibold text-left">{card3title}</h2>
          </div>
          <p className="text-md text-left">{card3desc}</p>
          <Link to={card3link} className="text-primary">
            {card3linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
