import React, { useEffect, useState } from "react";
import useAssignNewPincode from "../../services/useAssignNewPincode";
import useGetLawyerAssignedPins from "../../services/useGetLawyerAssignedPins";
import useAssignBrokerPincode from "../../services/useAssignBrokerPincode";
import useAssignLawyerPincode from "../../services/useAssignLawyerPincode";
import toast from "react-hot-toast";

const LawyerLocationSelector = ({ user, setIsModalOpen }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [selectedPincodes, setSelectedPincodes] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { assignPincode, loading, error } = useAssignNewPincode();

  useAssignBrokerPincode();
  const { assignPincodeToLawyer, lawyerLoading, lawyerError } =
    useAssignLawyerPincode();

  const { lawyerPins } = useGetLawyerAssignedPins();

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: {
              "X-CSCAPI-KEY":
                "dkR5WExuT2ZnZGhnSGhwSEhJUmp3UkNmMlRmS0I5UmEzVThsSXRRTA==",
            },
          }
        );
        const data = await response.json();
        setCountries(
          data.map((country) => ({
            value: country.iso2,
            label: country.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
            {
              headers: {
                "X-CSCAPI-KEY":
                  "dkR5WExuT2ZnZGhnSGhwSEhJUmp3UkNmMlRmS0I5UmEzVThsSXRRTA==",
              },
            }
          );
          const data = await response.json();
          setStates(
            data.map((state) => ({
              value: state.iso2,
              label: state.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching states:", error);
          setStates([]);
        }
      };

      fetchStates();
      setSelectedState("");
      setCities([]);
      setPincodes([]);
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
            {
              headers: {
                "X-CSCAPI-KEY":
                  "dkR5WExuT2ZnZGhnSGhwSEhJUmp3UkNmMlRmS0I5UmEzVThsSXRRTA==",
              },
            }
          );
          const data = await response.json();
          setCities(
            data.map((city) => ({
              value: city.id,
              label: city.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      };

      fetchCities();
      setSelectedCity("");
      setPincodes([]);
    }
  }, [selectedState]);

  // Fetch pincodes when a city is selected
  useEffect(() => {
    if (selectedCity) {
      const cityObject = cities.find(
        (city) => city.value === parseInt(selectedCity)
      );

      if (cityObject) {
        const cityName = cityObject.label;

        const fetchPincodes = async () => {
          try {
            const response = await fetch(
              `https://api.zippopotam.us/${selectedCountry}/${selectedState}/${cityName}`
            );

            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            }

            const data = await response.json();

            if (data && data.places) {
              setPincodes(
                data.places.map((place) => ({
                  value: place["post code"],
                  label: place["post code"],
                  postCode: place["post code"],
                  placeName: place["place name"],
                }))
              );
            } else {
              setPincodes([]);
              console.error("No pincodes found for the selected location.");
            }
          } catch (error) {
            console.error("Error fetching pincodes:", error);
            setPincodes([]);
          }
        };

        fetchPincodes();
      } else {
        console.log("City not found for the selected ID.");
        setPincodes([]);
      }
    }
  }, [selectedCity, cities, selectedCountry, selectedState]);

  // Handle pincode selection
  const handlePincodeSelection = (event, pincode) => {
    const isChecked = event.target.checked;
    const pincodeNumber = pincode; // Convert pincode to a number

    if (isChecked) {
      setSelectedPincodes((prev) => [...prev, pincodeNumber]);
    } else {
      setSelectedPincodes((prev) =>
        prev.filter((pin) => pin !== pincodeNumber)
      );
    }
  };

  // Handle Assign Pincode to Lawyer
  const handleAssignPinTolawyer = async (e) => {
    e.preventDefault();
    const result = await assignPincodeToLawyer(selectedPincodes, user);
    if (result) {
      console.log("Pincodes assigned to lawyer successfully:", result);
      setIsModalOpen(false);
      toast.success("Pincode assigned successfully");
    } else {
      toast.error("Unable to assign pincode");
    }
  };

  return (
    <div className="p-1">
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {/* Country Dropdown */}
        <div className="sm:w-1/4 w-full">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.label} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <div className="sm:w-1/4 w-full">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
            className="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div className="sm:w-1/4 w-full">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className="block w-full p-2.5 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pincode Table */}
      {selectedCity &&
        (pincodes.length > 0 ? (
          <div className="overflow-x-auto h-96 overflow-y-scroll">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Place
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Post Code
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                {pincodes.map((place) => {
                  const isAssigned = lawyerPins.includes(
                    Number(place.postCode)
                  );

                  return (
                    <tr
                      key={`${place.placeName}-table-row`}
                      className="border-t border-gray-200"
                    >
                      <td className="p-3 text-gray-700">
                        {place.placeName || "N/A"}
                      </td>
                      <td className="p-3 text-gray-700">{place.postCode}</td>
                      <td className="p-3">
                        {isAssigned ? (
                          "Taken"
                        ) : (
                          <input
                            type="checkbox"
                            value={place.postCode}
                            onChange={(e) =>
                              handlePincodeSelection(e, place.postCode)
                            }
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                            disabled={isAssigned} // Disable if the pincode is already assigned
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-2 text-gray-500">
            No pincodes found for this city.
          </p>
        ))}

      <button
        disabled={loading || selectedPincodes.length === 0}
        className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        onClick={handleAssignPinTolawyer}
      >
        {loading ? "Assigning..." : "Assign Selected Pincodes to Lawyer"}
      </button>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LawyerLocationSelector;
