import Header from "@/components/Header";
import MenuBar from "@/components/menu-bar";
import OffCanvas from "@/components/menu-bar";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  const options = [
    {
      id: 1,
      title: "Residential",
      categories:
        "House | Appartment | Cottages Plot Land | Builder Floor Studio | Duplex Penthouse",
    },
    {
      id: 2,
      title: "Commercial",
      categories:
        "Shop | Showroom | Plot Land | Builder Bareshell Office Space Warehouse Co-Working | Hotel | Hospital",
    },
    {
      id: 3,
      title: "Industrial",
      categories:
        "Plot | Shed | Warehouse Factory | Unit | Land Cold Storage | Zoning Buy | Rent",
    },
    {
      id: 4,
      title: "Agriculture",
      categories:
        "Shop | Showroom | Plot Bareshell | Office Space Warehouse| Co-working | Buy | Rent",
    },
    {
      id: 5,
      title: "Riverbed",
      categories:
        "Silt & Mining Sites | Fishery Hotel | Pond | Land Builder Bareshell Office Space Warehouse",
    },
    {
      id: 6,
      title: "Island",
      categories:
        "Shop | Showroom | Plot Land | Builder Bareshell Office Space Warehouse School",
    },
  ];

  return (
    <div>
      <MenuBar />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20">
        {options.map((option, index) => (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6"
            key={index}
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {option.title}
            </h2>
            <p className="text-gray-600 mt-2">{option.categories}</p>
            <div className="flex justify-between mt-4">
              <Button variant="default" className="w-full mr-2">
                Buy
              </Button>
              <Button variant="outline" className="w-full ml-2">
                Sell
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
