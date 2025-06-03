import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchCities,
  fetchCountry,
  fetchStates,
} from "@/services/getPincodesApi";
import { PincodesTable } from "./PincodesTable";

// Sample data for Country, State, City
const countryData = {
  India: ["Maharashtra", "Delhi", "Karnataka"],
};

const stateData = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Noida", "Gurgaon"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  New_York: ["New York City", "Buffalo", "Rochester"],
};

function AssignPincode({ userId, fullname, role }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const focusingCountry = "in";

  console.log("USER ID received: ", userId);

  // Fetch States
  useEffect(() => {
    const getAllStates = async () => {
      const res = await fetchCountry(focusingCountry);
      if (res) {
        setStates(res);
      }
    };

    getAllStates();
  }, []);

  //Get On change value
  useEffect(() => {
    const dropDownChange = async () => {
      console.log("STATEssssss SELECTED", selectedState);
      const res = await fetchCities(focusingCountry, selectedState);

      if (res) {
        console.log("SELECT CITY: ", res);
        setCities(res);
      }
    };

    dropDownChange();
  }, [selectedState]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <i className="fa-solid fa-map-location-dot mr-2"></i> Assign Pincode
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign Pincode</AlertDialogTitle>
          <AlertDialogDescription>
            Please select the country, state, and city to assign a pincode.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2">
          <div>
            <p>User Id: {userId}</p>
            <p> {fullname}</p>
            <p> {role}</p>
          </div>
          {/* COUNTRY */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Select defaultValue="india" disabled>
              <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* STATES */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border rounded-md py-1 px-2 w-full"
            >
              <option value="" disabled>
                Select a state
              </option>
              {states.length > 0 ? (
                states.map((state) => (
                  <option key={state?.id} value={state?.iso2}>
                    {state?.name}
                  </option>
                ))
              ) : (
                <p className="px-2 py-1 text-gray-500">Getting States...</p>
              )}
            </select>
          </div>

          {/* CITIES */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border rounded-md py-1 px-2 w-full"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city?.id} value={city?.iso2}>
                    {city?.name}
                  </option>
                ))
              ) : (
                <option disabled>Getting Cities...</option>
              )}
            </select>
          </div>
        </div>

        {/* PINCODES TABLE */}
        <div className="">
          <PincodesTable
            country={focusingCountry}
            state={selectedState}
            city={selectedCity}
            userId={userId}
            role={role}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!selectedState || !selectedCity}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AssignPincode;
