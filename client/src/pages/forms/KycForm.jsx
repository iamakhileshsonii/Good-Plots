import React, { useEffect, useState } from "react";
import {
  getPropertyInitialFormDetails,
  submitTestKycForm,
} from "../../services/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FurnishedAmenities from "./components/FurnishedAmenities";
import Amenities from "./components/Amenities";

const KycForm = () => {
  const param = useParams();
  const initialFormId = param.params;
  const navigate = useNavigate();

  const [initialFormData, setInitialFormData] = useState(null); // Initialize with null instead of an empty array
  const [forProperty, setForProperty] = useState(null);
  useEffect(() => {
    async function getInitialFormData() {
      try {
        const response = await getPropertyInitialFormDetails(initialFormId);
        setInitialFormData(response);
        setForProperty(initialFormId);
      } catch (error) {
        console.error("Failed to fetch initial form data", error);
      }
    }

    if (initialFormId) {
      getInitialFormData();
    }
  }, [initialFormId]);

  const API_URL = "http://localhost:3001/api/v1";

  // State variables for images
  const [siteView, setSiteView] = useState(null);
  const [materPlan, setMaterPlan] = useState(null);
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [otherPhoto, setOtherPhoto] = useState(null);
  const [exteriorView, setExteriorView] = useState(null);
  const [livingRoom, setLivingRoom] = useState(null);
  const [bedroomsImage, setBedroomsImage] = useState(null);
  const [kitchen, setKitchen] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);

  // Property area details
  const [superArea, setSuperArea] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [facing, setFacing] = useState("EAST");
  const [carpetArea, setCarpetArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [yearOfConstruction, setYearOfConstruction] = useState("");
  const [ageOfTheProperty, setAgeOfTheProperty] = useState("");

  //Property proximity
  const [market, setMarket] = useState("0.1");
  const [interStateBusTerminal, setInterStateBusTerminal] = useState("0.1");
  const [srSecondarySchool, setSrSecondarySchool] = useState("0.1");
  const [university, setUniversity] = useState("0.1");
  const [militaryContonment, setMilitaryContonment] = useState("0.1");
  const [fireStation, setFireStation] = useState("0.1");
  const [barAndRestaurants, setBarAndRestaurants] = useState("0.1");
  const [shoppingMall, setShoppingMall] = useState("0.1");
  const [cinema, setCinema] = useState("0.1");
  const [publicSwimmingPool, setPublicSwimmingPool] = useState("0.1");
  const [club, setClub] = useState("0.1");
  const [townPark, setTownPark] = useState("0.1");
  const [golfCourse, setGolfCourse] = useState("0.1");
  const [liquorShop, setLiquorShop] = useState("0.1");

  //Amenities and Other info
  const [reservedParking, setReservedParking] = useState("yes");
  const [coveredParking, setCoveredParking] = useState("yes");
  const [openParking, setOpenParking] = useState("yes");
  const [whetherInCooperativeSociety, setWhetherInCooperativeSociety] =
    useState("yes");
  const [whetherInGatedComplex, setWhetherInGatedComplex] = useState("yes");
  const [isThisCornerHouse, setIsThisCornerHouse] = useState("yes");
  const [amenities, setAmenities] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxSleepingCapacity, setMaxSleepingCapacity] = useState("");
  const [isPrivateOrGroupAllowed, setIsPrivateOrGroupAllowed] = useState("");
  const [maxPrivateOrGroupAllowed, setMaxPrivateOrGroupAllowed] = useState("");
  const [balconies, setBalconies] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyOnFloor, setPropertyOnFloor] = useState("");
  const [otherRooms, setOtherRooms] = useState("");
  const [furnishedStatus, setFurnishedStatus] = useState("");
  const [lights, setLights] = useState("0");
  const [ac, setAc] = useState("0");
  const [fans, setFans] = useState("0");
  const [tv, setTv] = useState("0");
  const [beds, setBeds] = useState("");
  const [wardrobe, setWardrobe] = useState("0");
  const [geyser, setGeyser] = useState("0");
  const [other, setOther] = useState("0"); // Sofa, Washing Machine, Stove, Fridge, Water Purifier, Microwave, Modular Kitchen, Chimney, Dining Table, Curtains, Exhaust Fan
  const [propertyHasFireSafetyLicense, setPropertyHasFireSafetyLicense] =
    useState("");

  const [propertySubtype, setPropertySubtype] = useState("Test Subtype");
  const [willingToRentOutTo, setWillingToRentOutTo] = useState("Family");
  const [totalFlatsInSociety, setTotalFlatsInSociety] = useState("100");
  const [nameOfProjectSociety, setNameOfProjectSociety] =
    useState("Galaxy Apartment");
  const [availableFrom, setAvailableFrom] = useState("23-12-2000");
  const [forfeiture, setForfeiture] = useState(false);
  //Property Charges

  const [expectedRent, setExpectedRent] = useState("");
  const [securityAmount, setSecurityAmount] = useState("");
  const [priceIncludes, setPriceIncludes] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [maintenanceCharges, setMaintenanceCharges] = useState("");
  const [brokerage, setBrokerage] = useState("");

  // Short Dropdown options
  const shortDropdownOption = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10+",
  ];

  // Floor Options
  const floorOptions = [];
  for (let i = 1; i <= 200; i++) {
    floorOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleTestFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("forProperty", forProperty);
    formData.append("propertySubtype ", propertySubtype);
    formData.append("siteView", siteView);
    formData.append("materPlan", materPlan);
    formData.append("location", location);
    formData.append("map", map);
    formData.append("otherPhoto", otherPhoto);
    formData.append("exteriorView", exteriorView);
    formData.append("livingRoom", livingRoom);
    formData.append("bedroomsImage", bedroomsImage);
    formData.append("kitchen", kitchen);
    formData.append("floorPlan", floorPlan);
    formData.append("superArea", superArea);
    formData.append("length", length);
    formData.append("breadth", breadth);
    formData.append("facing", facing);
    formData.append("carpetArea", carpetArea);
    formData.append("builtUpArea", builtUpArea);
    formData.append("yearOfConstruction", yearOfConstruction);

    // Append property proximity fields
    formData.append("market", market);
    formData.append("interStateBusTerminal", interStateBusTerminal);
    formData.append("srSecondarySchool", srSecondarySchool);
    formData.append("university", university);
    formData.append("militaryContonment", militaryContonment);
    formData.append("fireStation", fireStation);
    formData.append("barAndRestaurants", barAndRestaurants);
    formData.append("shoppingMall", shoppingMall);
    formData.append("cinema", cinema);
    formData.append("publicSwimmingPool", publicSwimmingPool);
    formData.append("club", club);
    formData.append("townPark", townPark);
    formData.append("golfCourse", golfCourse);
    formData.append("liquorShop", liquorShop);

    formData.append("reservedParking", reservedParking);
    formData.append("coveredParking", coveredParking);
    formData.append("openParking", openParking);
    formData.append("whetherInCooperativeSociety", whetherInCooperativeSociety);
    formData.append("whetherInGatedComplex", whetherInGatedComplex);
    formData.append("isThisCornerHouse", isThisCornerHouse);

    formData.append("expectedRent", expectedRent);
    formData.append("securityAmount", securityAmount);
    formData.append("priceIncludes", priceIncludes);
    formData.append("otherCharges", otherCharges);
    formData.append("maintenanceCharges", maintenanceCharges);
    formData.append("brokerage", brokerage);

    try {
      const response = await axios.post(`${API_URL}/form/test-form`, formData);

      if (response.status !== 200) {
        console.error(
          "Something went wrong, Unable to submit the form. Status code:",
          response.status
        );
      }

      console.log(response.data);
      navigate("/dashboard/explore-listings");
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error(
          "Server error:",
          error.response.data,
          "Status code:",
          error.response.status
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something else caused the error
        console.error("Error:", error.message);
      }
      return null;
    }
  };

  const handleForfeiture = (event) => {
    setForfeiture(event.target.checked); // this will set it based on whether it's checked or not
  };

  // Optional: useEffect to log the updated value after it changes
  useEffect(() => {
    console.log("FOREFEITURE STATUS: ", forfeiture);
  }, [forfeiture]);
  return (
    <div>
      <div className="sm:py-5 sm:mb-5">
        <h2 className="sm:text-xl text-center font-bold text-red capitalize">
          KYC - {initialFormData?.title}
        </h2>

        <div className="border border-cardbg p-5 rounded-md mt-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            KYC FOR:
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Your {initialFormData?.propertySubtype} expecting amount Rs:{" "}
            {initialFormData?.expectedPrice} from it's{" "}
            {initialFormData?.saleType}
          </p>
        </div>
      </div>
      <form className="" onSubmit={handleTestFormSubmit}>
        {/* Property Area Details */}
        <div className="p-4 bg-cardbg rounded-md my-3 grid grid-cols-3 gap-4 mb-5">
          <div className="mb-5">
            <label
              htmlFor="superArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Super Area
            </label>
            <input
              type="number"
              id="superArea"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter super area"
              required
              value={superArea}
              onChange={(e) => setSuperArea(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="length"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Length
            </label>
            <input
              type="number"
              id="length"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter length"
              required
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="breadth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Breadth
            </label>
            <input
              type="number"
              id="breadth"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter breadth"
              required
              value={breadth}
              onChange={(e) => setBreadth(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="carpetArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Carpet Area
            </label>
            <input
              type="number"
              id="carpetArea"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter carpet area"
              required
              value={carpetArea}
              onChange={(e) => setCarpetArea(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="builtUpArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Built-Up Area
            </label>
            <input
              type="number"
              id="builtUpArea"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter built-up area"
              required
              value={builtUpArea}
              onChange={(e) => setBuiltUpArea(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="yearOfConstruction"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Year of Construction
            </label>
            <input
              type="number"
              id="yearOfConstruction"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter year of construction"
              required
              value={yearOfConstruction}
              onChange={(e) => setYearOfConstruction(e.target.value)}
            />
          </div>
        </div>
        {/* Furnished Amenities */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <FurnishedAmenities
            lights={lights}
            setLights={setLights}
            ac={ac}
            setAC={setAc}
            fans={fans}
            setFans={setFans}
            tv={tv}
            setTV={setTv}
            beds={beds}
            setBeds={setBeds}
            wardrobe={wardrobe}
            setWardrobe={setWardrobe}
          />
        </div>

        {/* Property proximity */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <h4 className="font-semibold text-lg">Property Proximity</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="mb-5">
              <label
                htmlFor="market"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Market
              </label>
              <input
                type="text"
                id="market"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter market"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="interStateBusTerminal"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Inter State Bus Terminal
              </label>
              <input
                type="text"
                id="interStateBusTerminal"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter inter state bus terminal"
                value={interStateBusTerminal}
                onChange={(e) => setInterStateBusTerminal(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="srSecondarySchool"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sr Secondary School
              </label>
              <input
                type="text"
                id="srSecondarySchool"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter sr secondary school"
                value={srSecondarySchool}
                onChange={(e) => setSrSecondarySchool(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="university"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                University
              </label>
              <input
                type="text"
                id="university"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="militaryContonment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Military Contonment
              </label>
              <input
                type="text"
                id="militaryContonment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter military contonment"
                value={militaryContonment}
                onChange={(e) => setMilitaryContonment(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fireStation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fire Station
              </label>
              <input
                type="text"
                id="fireStation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter fire station"
                value={fireStation}
                onChange={(e) => setFireStation(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="barAndRestaurants"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bar and Restaurants
              </label>
              <input
                type="text"
                id="barAndRestaurants"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter bar and restaurants"
                value={barAndRestaurants}
                onChange={(e) => setBarAndRestaurants(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="shoppingMall"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shopping Mall
              </label>
              <input
                type="text"
                id="shoppingMall"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter shopping mall"
                value={shoppingMall}
                onChange={(e) => setShoppingMall(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="cinema"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cinema
              </label>
              <input
                type="text"
                id="cinema"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter cinema"
                value={cinema}
                onChange={(e) => setCinema(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="publicSwimmingPool"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Public Swimming Pool
              </label>
              <input
                type="text"
                id="publicSwimmingPool"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter public swimming pool"
                value={publicSwimmingPool}
                onChange={(e) => setPublicSwimmingPool(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="club"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Club
              </label>
              <input
                type="text"
                id="club"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter club"
                value={club}
                onChange={(e) => setClub(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="townPark"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Town Park
              </label>
              <input
                type="text"
                id="townPark"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter town park"
                value={townPark}
                onChange={(e) => setTownPark(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="golfCourse"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Golf Course
              </label>
              <input
                type="text"
                id="golfCourse"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter golf course"
                value={golfCourse}
                onChange={(e) => setGolfCourse(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="liquorShop"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Liquor Shop
              </label>
              <input
                type="text"
                id="liquorShop"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter liquor shop"
                value={liquorShop}
                onChange={(e) => setLiquorShop(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Property Charges */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <h4 className="font-semibold text-lg">Property Charges</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-5">
              <label
                htmlFor="expectedRent"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expected Rent
              </label>
              <input
                type="number"
                id="expectedRent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter expected rent"
                required
                value={expectedRent}
                onChange={(e) => setExpectedRent(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="securityAmount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Security Amount
              </label>
              <input
                type="number"
                id="securityAmount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter security amount"
                required
                value={securityAmount}
                onChange={(e) => setSecurityAmount(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="priceIncludes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price Includes
              </label>
              <input
                type="number"
                id="priceIncludes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter price includes"
                required
                value={priceIncludes}
                onChange={(e) => setPriceIncludes(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="otherCharges"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Other Charges
              </label>
              <input
                type="number"
                id="otherCharges"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter other charges"
                required
                value={otherCharges}
                onChange={(e) => setOtherCharges(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="maintenanceCharges"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Maintenance Charges
              </label>
              <input
                type="number"
                id="maintenanceCharges"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter maintenance charges"
                required
                value={maintenanceCharges}
                onChange={(e) => setMaintenanceCharges(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="brokerage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brokerage
              </label>
              <input
                type="number"
                id="brokerage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter brokerage"
                required
                value={brokerage}
                onChange={(e) => setBrokerage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center mb-4">
              <input
                id="Forfeiture-checkbox"
                type="checkbox"
                checked={forfeiture} // bind this to state
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={handleForfeiture}
              />
              <label
                for="Forfeiture-checkbox"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Forfeiture in case of default by the buyer <br /> Double the
                amount to be returned in case of default by the seller
              </label>
            </div>
          </div>
        </div>

        {/* Amenities & Others */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <h4 className="font-semibold text-lg">Amenities</h4>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center w-1/3">
              <label className="mr-2">Reserved Parking</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={reservedParking === "yes"}
                    onChange={() => setReservedParking("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={reservedParking === "no"}
                    onChange={() => setReservedParking("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center w-1/3">
              <label className="mr-2">Covered Parking</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={coveredParking === "yes"}
                    onChange={() => setCoveredParking("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={coveredParking === "no"}
                    onChange={() => setCoveredParking("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center w-1/3">
              <label className="mr-2">Open Parking</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={openParking === "yes"}
                    onChange={() => setOpenParking("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={openParking === "no"}
                    onChange={() => setOpenParking("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center w-1/3">
              <label className="mr-2">In Cooperative Society</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={whetherInCooperativeSociety === "yes"}
                    onChange={() => setWhetherInCooperativeSociety("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={whetherInCooperativeSociety === "no"}
                    onChange={() => setWhetherInCooperativeSociety("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center w-1/3">
              <label className="mr-2">In Gated Complex</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={whetherInGatedComplex === "yes"}
                    onChange={() => setWhetherInGatedComplex("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={whetherInGatedComplex === "no"}
                    onChange={() => setWhetherInGatedComplex("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex items-center w-1/3">
              <label className="mr-2">Corner House</label>
              <div className="flex justify-between">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    value="yes"
                    checked={isThisCornerHouse === "yes"}
                    onChange={() => setIsThisCornerHouse("yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={isThisCornerHouse === "no"}
                    onChange={() => setIsThisCornerHouse("no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Radio Buttons */}
        <div className="sm:py-10 grid grid-cols-3 gap-4">
          <div>
            <h6 className="font-semibold mt-5">Reserved Parking</h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="reservedParking-yes"
                  type="radio"
                  value="yes"
                  name="reservedParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={reservedParking === "yes"}
                  onChange={(e) => setReservedParking(e.target.value)}
                />
                <label
                  htmlFor="reservedParking-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="reservedParking-no"
                  type="radio"
                  value="no"
                  name="reservedParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={reservedParking === "no"}
                  onChange={(e) => setReservedParking(e.target.value)}
                />
                <label
                  htmlFor="reservedParking-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mt-5">Covered Parking</h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="coveredParking-yes"
                  type="radio"
                  value="yes"
                  name="coveredParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={coveredParking === "yes"}
                  onChange={(e) => setCoveredParking(e.target.value)}
                />
                <label
                  htmlFor="coveredParking-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="coveredParking-no"
                  type="radio"
                  value="no"
                  name="coveredParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={coveredParking === "no"}
                  onChange={(e) => setCoveredParking(e.target.value)}
                />
                <label
                  htmlFor="coveredParking-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mt-5">Open Parking</h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="openParking-yes"
                  type="radio"
                  value="yes"
                  name="openParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={openParking === "yes"}
                  onChange={(e) => setOpenParking(e.target.value)}
                />
                <label
                  htmlFor="openParking-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="openParking-no"
                  type="radio"
                  value="no"
                  name="openParking"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={openParking === "no"}
                  onChange={(e) => setOpenParking(e.target.value)}
                />
                <label
                  htmlFor="openParking-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mt-5">
              Whether in a Co-operative Society
            </h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="whetherInCooperativeSociety-yes"
                  type="radio"
                  value="yes"
                  name="whetherInCooperativeSociety"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={whetherInCooperativeSociety === "yes"}
                  onChange={(e) =>
                    setWhetherInCooperativeSociety(e.target.value)
                  }
                />
                <label
                  htmlFor="whetherInCooperativeSociety-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="whetherInCooperativeSociety-no"
                  type="radio"
                  value="no"
                  name="whetherInCooperativeSociety"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={whetherInCooperativeSociety === "no"}
                  onChange={(e) =>
                    setWhetherInCooperativeSociety(e.target.value)
                  }
                />
                <label
                  htmlFor="whetherInCooperativeSociety-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mt-5">Whether in a Gated Complex</h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="whetherInGatedComplex-yes"
                  type="radio"
                  value="yes"
                  name="whetherInGatedComplex"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={whetherInGatedComplex === "yes"}
                  onChange={(e) => setWhetherInGatedComplex(e.target.value)}
                />
                <label
                  htmlFor="whetherInGatedComplex-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="whetherInGatedComplex-no"
                  type="radio"
                  value="no"
                  name="whetherInGatedComplex"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={whetherInGatedComplex === "no"}
                  onChange={(e) => setWhetherInGatedComplex(e.target.value)}
                />
                <label
                  htmlFor="whetherInGatedComplex-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mt-5">Is this corner house</h6>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="isThisCornerHouse-yes"
                  type="radio"
                  value="yes"
                  name="isThisCornerHouse"
                  className="w-4 h-4 text-blue-600 bg-gray-100
100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={isThisCornerHouse === "yes"}
                  onChange={(e) => setIsThisCornerHouse(e.target.value)}
                />
                <label
                  htmlFor="isThisCornerHouse-yes"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="isThisCornerHouse-no"
                  type="radio"
                  value="no"
                  name="isThisCornerHouse"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={isThisCornerHouse === "no"}
                  onChange={(e) => setIsThisCornerHouse(e.target.value)}
                />
                <label
                  htmlFor="isThisCornerHouse-no"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-cardbg rounded-md my-3">
          <Amenities amenities={amenities} setAmenities={setAmenities} />
        </div>

        {/* Furnished Status */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <div className="mb-5">
            <label
              htmlFor="nameOfProjectSociety"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name of project/Society
            </label>
            <input
              type="text"
              id="nameOfProjectSociety"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="John Doe"
              required
              onChange={(e) => setNameOfProjectSociety(e.target.value)}
              value={nameOfProjectSociety}
            />
          </div>

          <h6 className="font-semibold mt-5">Facing</h6>
          <div className="flex">
            <div className="flex items-center me-4 facingRadios">
              <input
                id="facing-east"
                type="radio"
                value="EAST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "EAST"}
              />
              <label
                htmlFor="facing-east"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                EAST
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-west"
                type="radio"
                value="WEST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "WEST"}
              />
              <label
                htmlFor="facing-west"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                WEST
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-north"
                type="radio"
                value="NORTH"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "NORTH"}
              />
              <label
                htmlFor="facing-north"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                NORTH
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-south"
                type="radio"
                value="SOUTH"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "SOUTH"}
              />
              <label
                htmlFor="facing-south"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SOUTH
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-northeast"
                type="radio"
                value="NORTH-EAST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "NORTH-EAST"}
              />
              <label
                htmlFor="facing-northeast"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                NORTH-EAST
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-northwest"
                type="radio"
                value="NORTH-WEST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "NORTH-WEST"}
              />
              <label
                htmlFor="facing-northwest"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                NORTH-WEST
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-southeast"
                type="radio"
                value="SOUTH-EAST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "SOUTH-EAST"}
              />
              <label
                htmlFor="facing-southeast"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SOUTH-EAST
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="facing-southwest"
                type="radio"
                value="SOUTH-WEST"
                name="facing"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setFacing(e.target.value)}
                checked={facing === "SOUTH-WEST"}
              />
              <label
                htmlFor="facing-southwest"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                SOUTH-WEST
              </label>
            </div>
          </div>
          <h6 className="font-semibold mt-5">Willing To Rent Out To</h6>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="rent-family"
                type="radio"
                value="Family"
                name="willingToRentOutTo"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setWillingToRentOutTo(e.target.value)}
                checked={willingToRentOutTo === "Family"}
              />
              <label
                htmlFor="rent-family"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Family
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="rent-single-men"
                type="radio"
                value="Single Men"
                name="willingToRentOutTo"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setWillingToRentOutTo(e.target.value)}
                checked={willingToRentOutTo === "Single Men"}
              />
              <label
                htmlFor="rent-single-men"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Single Men
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="rent-single-women"
                type="radio"
                value="Single Women"
                name="willingToRentOutTo"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setWillingToRentOutTo(e.target.value)}
                checked={willingToRentOutTo === "Single Women"}
              />
              <label
                htmlFor="rent-single-women"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Single Women
              </label>
            </div>
          </div>
          <h6 className="font-semibold mt-5">
            Total no. of flats in your society
          </h6>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="flats-less-than-50"
                type="radio"
                value="Less than 50"
                name="totalFlatsInSociety"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setTotalFlatsInSociety(e.target.value)}
                checked={totalFlatsInSociety === "Less than 50"}
              />
              <label
                htmlFor="flats-less-than-50"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Less than 50
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="flats-50-100"
                type="radio"
                value="50-100"
                name="totalFlatsInSociety"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setTotalFlatsInSociety(e.target.value)}
                checked={totalFlatsInSociety === "50-100"}
              />
              <label
                htmlFor="flats-50-100"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                50-100
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="flats-more-than-100"
                type="radio"
                value="More than 100"
                name="totalFlatsInSociety"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setTotalFlatsInSociety(e.target.value)}
                checked={totalFlatsInSociety === "More than 100"}
              />
              <label
                htmlFor="flats-more-than-100"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                More than 100
              </label>
            </div>
          </div>

          <h6 className="font-semibold mt-5">Group/Private Stay Allowed</h6>
          <div className="flex">
            <div className="flex items-center me-4">
              <input
                id="isPrivateOrGroupAllowed-yes"
                type="radio"
                value="yes"
                name="isPrivateOrGroupAllowed"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setIsPrivateOrGroupAllowed(e.target.value)}
                checked={isPrivateOrGroupAllowed === "yes"}
              />
              <label
                htmlFor="isPrivateOrGroupAllowed-yes"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Yes
              </label>
            </div>
            <div className="flex items-center me-4">
              <input
                id="isPrivateOrGroupAllowed-no"
                type="radio"
                value="no"
                name="isPrivateOrGroupAllowed"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => setIsPrivateOrGroupAllowed(e.target.value)}
                checked={isPrivateOrGroupAllowed === "no"}
              />
              <label
                htmlFor="isPrivateOrGroupAllowed-no"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                No
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-1/5">
              <label
                htmlFor="availableFrom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Available from
              </label>
              <input
                type="date"
                id="availableFrom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setAvailableFrom(e.target.value)}
                value={availableFrom}
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="bedrooms"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No. of Bedrooms
              </label>
              <select
                id="bedrooms"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setBedrooms(e.target.value)}
                value={bedrooms}
              >
                {shortDropdownOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="maxSleepingCapacity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Maximum sleeping capacity
              </label>
              <select
                id="maxSleepingCapacity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setMaxSleepingCapacity(e.target.value)}
                value={maxSleepingCapacity}
              >
                {shortDropdownOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="maxPrivateOrGroupAllowed"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Maximum People allowed for Group/Private Stay
              </label>
              <input
                type="text"
                id="maxPrivateOrGroupAllowed"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="10"
                required
                onChange={(e) => setMaxPrivateOrGroupAllowed(e.target.value)}
                value={maxPrivateOrGroupAllowed}
              />
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="balconies"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No. of balconies
              </label>
              <select
                id="balconies"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setBalconies(e.target.value)}
                value={balconies}
              >
                {shortDropdownOption.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="propertyOnFloor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Property On Floor
              </label>
              <select
                id="propertyOnFloor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setPropertyOnFloor(e.target.value)}
                value={propertyOnFloor}
              >
                <option value="basement">Basement</option>
                <option value="lower ground">Lower Ground</option>
                <option value="ground">Ground</option>
                {floorOptions}
              </select>
            </div>

            <div className="flex flex-col w-1/5">
              <label
                htmlFor="otherRooms"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Other rooms
              </label>
              <select
                id="otherRooms"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setOtherRooms(e.target.value)}
                value={otherRooms}
              >
                <option value="puja room">Puja Room</option>
                <option value="study room">Study Room</option>
                <option value="store room">Store Room</option>
                <option value="servant room">Servant Room</option>
              </select>
            </div>
          </div>
          <h6 className="font-semibold mt-5">Furnished Status</h6>
          <div class="flex">
            <div class="flex items-center me-4">
              <input
                id="flats-less-than-50"
                type="radio"
                value="furnished"
                name="furnishedStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="flats-less-than-50"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Furnished
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="flats-50-100"
                type="radio"
                value="unfurnished"
                name="furnishedStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked
              />
              <label
                for="flats-50-100"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Unfurnished
              </label>
            </div>
            <div class="flex items-center me-4">
              <input
                id="flats-more-than-100"
                type="radio"
                value="semi-furnished"
                name="furnishedStatus"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="flats-more-than-100"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Semi-furnished
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="p-4 bg-cardbg rounded-md my-3">
          <h4 className="font-semibold text-lg">Property Images</h4>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="siteView"
                >
                  Site View
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="siteView"
                  name="siteView"
                  type="file"
                  onChange={(e) => setSiteView(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="materPlan"
                >
                  Mater Plan
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="materPlan"
                  name="materPlan"
                  type="file"
                  onChange={(e) => setMaterPlan(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="location"
                  name="location"
                  type="file"
                  onChange={(e) => setLocation(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="map"
                >
                  Map
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="map"
                  name="map"
                  type="file"
                  onChange={(e) => setMap(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="otherPhoto"
                >
                  Other Photo
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="otherPhoto"
                  name="otherPhoto"
                  type="file"
                  onChange={(e) => setOtherPhoto(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="exteriorView"
                >
                  Exterior View
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="exteriorView"
                  name="exteriorView"
                  type="file"
                  onChange={(e) => setExteriorView(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="livingRoom"
                >
                  Living Room
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="livingRoom"
                  name="livingRoom"
                  type="file"
                  onChange={(e) => setLivingRoom(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="bedroomsImage"
                >
                  Bedrooms
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="bedroomsImage"
                  name="bedroomsImage"
                  type="file"
                  onChange={(e) => setBedroomsImage(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="kitchen"
                >
                  Kitchen
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="kitchen"
                  name="kitchen"
                  type="file"
                  onChange={(e) => setKitchen(e.target.files[0])} // Update to get file object
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="floorPlan"
                >
                  Floor Plan
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="floorPlan"
                  name="floorPlan"
                  type="file"
                  onChange={(e) => setFloorPlan(e.target.files[0])} // Update to get file object
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KycForm;
