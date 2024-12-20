import PropertyCard from "@/components/property-card";
import { getAllVerifiedProperties } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";

const ExploreProperties = () => {
  const [verifiedProperties, setVerifiedProperties] = useState([]);

  //Fetch verified properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllVerifiedProperties();

        if (res) {
          console.log("FECTHED PROPERTIZES TOS ET", res);
          setVerifiedProperties(res);
        }
      } catch (error) {
        console.error("Unable to fetch verified properties", error);
      }
    };

    fetchProperties();
  }, []);

  // Sample property data
  const properties = [
    {
      id: "1",
      imageUrl:
        "https://via.placeholder.com/500x300?text=Cozy+Downtown+Apartment",
      title: "Cozy Downtown Apartment",
      price: "$250,000",
      description:
        "A beautiful 2-bedroom apartment in the heart of the city. Features modern amenities and a stunning view.",
      saleType: "sale",
      propertySubtype: "Apartment",
    },
    {
      id: "2",
      imageUrl: "https://via.placeholder.com/500x300?text=Modern+Loft",
      title: "Modern Loft",
      price: "$320,000",
      description:
        "Spacious loft with high ceilings and large windows offering amazing natural light.",
      saleType: "sale",
      propertySubtype: "Loft",
    },
    {
      id: "3",
      imageUrl: "https://via.placeholder.com/500x300?text=Luxury+Villa",
      title: "Luxury Villa",
      price: "$1,200,000",
      description:
        "A luxurious villa with 5 bedrooms, a pool, and breathtaking views of the ocean.",
      saleType: "sale",
      propertySubtype: "Villa",
    },
    {
      id: "4",
      imageUrl: "https://via.placeholder.com/500x300?text=Charming+Cottage",
      title: "Charming Cottage",
      price: "$180,000",
      description:
        "A charming cottage with a large garden, perfect for a family getaway.",
      saleType: "sale",
      propertySubtype: "Cottage",
    },
    {
      id: "5",
      imageUrl: "https://via.placeholder.com/500x300?text=Urban+Studio",
      title: "Urban Studio",
      price: "$120,000",
      description:
        "A compact yet stylish studio apartment in a vibrant downtown neighborhood.",
      saleType: "sale",
      propertySubtype: "Studio",
    },
  ];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {verifiedProperties.map((property) => (
        <PropertyCard
          key={property._id} // Using the property id for unique key
          id={property._id}
          imageUrl={property.imageUrl}
          title={property.title}
          price={property.expectedPrice}
          description={property.description.slice(0, 100) + "..."}
          saleType={property.saleType}
          propertySubtype={property.propertySubtype}
        />
      ))}
    </div>
  );
};

export default ExploreProperties;
