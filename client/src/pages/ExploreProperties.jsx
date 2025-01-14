import PropertyCard from "@/components/property-card";
import {
  exploreProperties,

} from "@/services/propertyApi";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PropertyFilter from "@/components/property-filter";

const ExploreProperties = () => {
  const [verifiedProperties, setVerifiedProperties] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  //Fetch verified properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await exploreProperties();

        if (res) {
          console.log("RES EXPLORE PROPERTIES: ", res);
          setVerifiedProperties(res);
        }
      } catch (error) {
        console.error("Unable to fetch verified properties", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between px-10">
        <p className="text-black dark:text-white underline underline-offset-8">
          Showing <span>{verifiedProperties.length}</span> Properties
        </p>
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
          <DialogTrigger asChild>
            <Button>Filter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Your Property Search</DialogTitle>
            </DialogHeader>
            <PropertyFilter setFilterOpen={setFilterOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="py-6 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {verifiedProperties.map((property) => (
          <PropertyCard
            key={property._id} // Using the property id for unique key
            id={property._id}
            owner={property.owner}
            featuredImage={property?.details[0]?.photos.siteView}
            title={property.title}
            price={property.expectedPrice}
            description={property.description.slice(0, 100) + "..."}
            saleType={property.saleType}
            propertySubtype={property.propertySubtype}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreProperties;
