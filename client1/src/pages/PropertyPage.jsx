import Header from "@/components/Header";
import SinglePropertyHeader from "@/components/SingleProperty/SinglePropertyHeader";
import SinglePropertyMainContent from "@/components/SingleProperty/SinglePropertyMainContent";
import SinglePropertySidebar from "@/components/SingleProperty/SinglePropertySidebar";
import { getProperty } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyPage = () => {
  const [property, setProperty] = useState();

  const propertyId = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      const res = await getProperty(propertyId.propertyId);
      console.log("PROPERTY DATA: ", res[0]);
      if (res) {
        setProperty(res[0]);
      } else {
        setProperty(null);
      }
    };

    fetchPropertyData();
  }, [propertyId.propertyId]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <SinglePropertyHeader
          propertyImage="https://example.com/property.jpg"
          propertyTitle={property?.title}
        />

        {/* Main Content and Sidebar */}
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <SinglePropertyMainContent
            title={property?.title}
            description={property?.description}
          />

          {/* Sidebar */}
          <SinglePropertySidebar />
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
