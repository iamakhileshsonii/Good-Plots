import React, { useEffect, useState } from "react";

export default function PropertyProximity({ proximity }) {
  const proximityIcons = {
    barAndRestaurants: { title: "Bars & Restaurants", icon: "fa-utensils" },
    cinema: { title: "Cinema", icon: "fa-film" },
    club: { title: "Club", icon: "fa-glass-martini" },
    fireStation: { title: "Fire Station", icon: "fa-fire-extinguisher" },
    golfCourse: { title: "Golf Course", icon: "fa-golf-ball-tee" },
    interStateBusTerminal: {
      title: "ISBT",
      icon: "fa-bus",
    },
    liquorShop: { title: "Liquor Shop", icon: "fa-wine-bottle" },
    market: { title: "Market", icon: "fa-shopping-basket" },
    militaryContonment: { title: "Military Cantonment", icon: "fa-shield-alt" },
    publicSwimmingPool: { title: "Public Swimming Pool", icon: "fa-swimmer" },
    shoppingMall: { title: "Shopping Mall", icon: "fa-store" },
    srSecondarySchool: { title: "Sr Secondary School", icon: "fa-school" },
    townPark: { title: "Town Park", icon: "fa-tree" },
    university: { title: "University", icon: "fa-university" },
  };

  const [filteredProximities, setFilteredProximities] = useState([]);

  const fetchProximity = () => {
    if (proximity) {
      const validProximities = Object.entries(proximity)
        .filter(([_, value]) => parseFloat(value) > 0) // Keep only non-zero values
        .map(([key]) => key); // Extract only the proximity names

      setFilteredProximities(validProximities);
    }
  };

  useEffect(() => {
    fetchProximity();
  }, [proximity]); // Run whenever `proximity` changes

  return (
    <div className="mt-14 border rounded-2xl p-4">
      <h4 className="text-lg font-semibold text-left mb-2">Nearby Places</h4>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filteredProximities.map((place, index) => (
          <div
            className="flex flex-col items-start justify-center "
            key={index}
          >
            <div className="flex gap-2">
              <i
                className={`fa-solid ${proximityIcons[place]?.icon} text-lg`}
              ></i>
              <span className="self-baseline font-semibold text-lg">
                {proximity[place]} km
              </span>
            </div>
            <p className="self-baseline text-gray-600 text-left">
              {proximityIcons[place]?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
