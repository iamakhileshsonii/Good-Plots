import Header from "@/components/Header";
import SinglePropertyHeader from "@/components/SingleProperty/SinglePropertyHeader";
import SinglePropertyMainContent from "@/components/SingleProperty/SinglePropertyMainContent";
import SinglePropertySidebar from "@/components/SingleProperty/SinglePropertySidebar";
import { getProperty } from "@/services/propertyApi";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const PropertyPage = () => {
  const [property, setProperty] = useState(null); // Default to null
  const [loading, setLoading] = useState(true); // Default to true

  const { propertyId } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true); // Show loader
      try {
        const res = await getProperty(propertyId);
        console.log("PROXIMITY: ", res[0]);
        if (res?.length > 0) {
          setProperty(res[0]); // Assuming res[0] is valid
        } else {
          setProperty(null); // No property found
        }
      } catch (error) {
        console.log("Unable to fetch property data", error);
        setProperty(null);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  return (
    <>
      <Header />
      {loading ? ( // Show loader while fetching
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading Property...</p>
        </div>
      ) : property ? ( // Show property details if available
        <div className="min-h-screen bg-gray-50 dark:bg-black">
          {/* Header */}
          <SinglePropertyHeader
            propertyImage={property?.kycDetails[0]?.photos}
            propertyTitle={property?.title}
          />

          {/* Main Content and Sidebar */}
          <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <SinglePropertyMainContent
              title={property?.title}
              description={property?.description}
              subtype={property?.propertySubtype}
              price={property?.expectedPrice}
              totalArea={property?.totalArea}
              amenities={property?.kycDetails[0]?.amenities}
              proximity={property?.kycDetails[0]?.proximity}
            />

            {/* Sidebar */}
            <SinglePropertySidebar
              propertyImg={property?.kycDetails[0]?.photos}
              property={property}
            />
          </div>
        </div>
      ) : (
        // Show message if no property is found
        <div className="min-h-screen flex items-center justify-center">
          <p>Property not found.</p>
        </div>
      )}
    </>
  );
};

export default PropertyPage;
