import React, { useEffect, useState } from "react";
import {
  getPendingProperties,
  getVerifiedProperties,
} from "../services/propertyApi"; // Assuming this API call fetches the properties
import PropertyCard from "../components/ui/PropertyCard"; // Assuming the card component
import SearchBar from "../components/ui/SearchBar";
import Filter from "../components/ui/Filter";

const TestPage = () => {
  // Loading states for verified and pending properties
  const [loadingVerified, setLoadingVerified] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);

  // State to store the properties
  const [verifiedProperties, setVerifiedProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);

  //Search Property
  const [searchTerm, setSearchTerm] = useState("");

  // Error state to manage errors
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch verified properties
    const fetchVerifiedProperties = async () => {
      setLoadingVerified(true); // Set loading to true for verified properties
      setError(""); // Reset error before starting the fetch
      try {
        const data = await getVerifiedProperties(); // Assuming this API fetches verified properties
        setVerifiedProperties(data); // Store the fetched properties
      } catch (err) {
        setError(
          "Unable to fetch verified properties. Please try again later."
        );
      } finally {
        setLoadingVerified(false); // Ensure loading stops after the fetch
      }
    };

    // Fetch pending properties
    const fetchPendingProperties = async () => {
      setLoadingPending(true); // Set loading to true for pending properties
      setError(""); // Reset error before starting the fetch
      try {
        const data = await getPendingProperties(); // Assuming this API fetches pending properties
        setPendingProperties(data); // Store the fetched properties
      } catch (err) {
        setError("Unable to fetch pending properties. Please try again later.");
      } finally {
        setLoadingPending(false); // Ensure loading stops after the fetch
      }
    };

    // Call both fetch functions on component mount
    fetchVerifiedProperties();
    fetchPendingProperties();
  }, []);

  return (
    <div className="block">
      {/* Verified Properties Section */}
      <div className="p-5">
        <h1 className="font-bold text-2xl text-center">Verified Properties</h1>
      </div>

      {/* Verified Properties Loading or Display */}
      {loadingVerified ? (
        <div className="flex justify-center">
          <p>Loading verified properties...</p>
        </div>
      ) : verifiedProperties.length === 0 ? (
        <div className="flex justify-center">
          <p>No verified properties found.</p>
        </div>
      ) : (
        <div className="flex justify-center flex-wrap">
          {verifiedProperties.map((property, index) => (
            <PropertyCard
              key={index}
              title={property?.title}
              description={property?.description}
              propertyId={property?._id}
              property={property}
              saleType={property?.saleType}
              propertySubtype={property?.propertySubtype}
              totalArea={property?.totalArea}
              expectedPrice={property?.expectedPrice}
            />
          ))}
        </div>
      )}

      {/* Pending Properties Section */}
      <div className="flex flex-col items-center justify-center my-10">
        <div className="p-5">
          <h1 className="font-bold text-2xl text-center">
            Pending Verification Properties
          </h1>
          <div className="">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchTerm} // Controlled input
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Properties..."
                required
              />
            </div>
          </div>
        </div>

        {/* Pending Properties Loading or Display */}
        {loadingPending ? (
          <div className="flex justify-center">
            <p>Loading pending properties...</p>
          </div>
        ) : pendingProperties.length === 0 ? (
          <div className="flex justify-center">
            <p>No pending properties found.</p>
          </div>
        ) : (
          <div className="flex justify-center flex-wrap px-20 ">
            {pendingProperties
              .filter((property) => {
                return searchTerm?.toLowerCase() === ""
                  ? property
                  : property?.title?.toLowerCase().includes(searchTerm);
              })
              .map((property, index) => (
                <PropertyCard
                  key={index}
                  title={property?.title}
                  description={property?.description}
                  propertyId={property?._id}
                  property={property}
                  saleType={property?.saleType}
                  propertySubtype={property?.propertySubtype}
                  totalArea={property?.totalArea}
                  expectedPrice={property?.expectedPrice}
                />
              ))}
          </div>
        )}
      </div>

      {/* Error Handling */}
      {error && (
        <div className="flex justify-center my-5">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-center my-20 w-full">
        <Filter />
      </div>
    </div>
  );
};

export default TestPage;
