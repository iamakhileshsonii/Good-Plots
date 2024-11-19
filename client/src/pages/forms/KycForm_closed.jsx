import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPropertyInitialFormDetails,
  submitPropertyKycFormDetails,
} from "../../services/api";
import Amenities from "./components/Amenities";
import Proximity from "./components/Proximity";
import FurnishedAmenities from "./components/FurnishedAmenities";
import PropertyImages from "./components/PropertyImages";
import axios from "axios";

const KycForm = () => {
  const params = useParams();
  const formId = params.params;

  const [initialFormData, setInitialFormData] = useState(null); // Initialize with null instead of an empty array

  useEffect(() => {
    async function getInitialFormData() {
      try {
        const response = await getPropertyInitialFormDetails(formId);
        setInitialFormData(response);
      } catch (error) {
        console.error("Failed to fetch initial form data", error);
      }
    }

    if (formId) {
      getInitialFormData();
    }
  }, [formId]);

  useEffect(() => {
    console.log("FORM RESPONSE", initialFormData);
  }, [initialFormData]); // Log the initialFormData when it changes

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
  const forProperty = formId;
  const [propertySubtype, setPropertySubtype] = useState("");
  const [superArea, setSuperArea] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [facing, setFacing] = useState("EAST");
  const [carpetArea, setCarpetArea] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [yearOfConstruction, setYearOfConstruction] = useState("");
  const [willingToRentOutTo, setWillingToRentOutTo] = useState("Family");
  const [totalFlatsInSociety, setTotalFlatsInSociety] =
    useState("Less than 50");
  const [nameOfProjectSociety, setNameOfProjectSociety] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [bedrooms, setBedrooms] = useState(shortDropdownOption[0].toString());
  const [maxSleepingCapacity, setMaxSleepingCapacity] = useState("");
  const [isPrivateOrGroupAllowed, setIsPrivateOrGroupAllowed] = useState("");
  const [maxPrivateOrGroupAllowed, setMaxPrivateOrGroupAllowed] = useState("");
  const [balconies, setBalconies] = useState("");
  const [bathrooms, setBathrooms] = useState("0");
  const [totalFloors, setTotalFloors] = useState("0");
  const [propertyOnFloor, setPropertyOnFloor] = useState("");
  const [otherRooms, setOtherRooms] = useState("");
  const [furnishedStatus, setFurnishedStatus] = useState("furnished");
  const [lights, setLights] = useState("0");
  const [ac, setAC] = useState("0");
  const [fans, setFans] = useState("0");
  const [tv, setTV] = useState("0");
  const [beds, setBeds] = useState("0");
  const [wardrobe, setWardrobe] = useState("0");

  // const [other, setOther] = useState(""); currently not included
  const [reservedParking, setReservedParking] = useState("yes");
  const [coveredParking, setCoveredParking] = useState("yes");
  const [openParking, setOpenParking] = useState("yes");
  const [whetherInCooperativeSociety, setWhetherInCooperativeSociety] =
    useState("yes");
  const [whetherInGatedComplex, setWhetherInGatedComplex] = useState("yes");
  const [isThisCornerHouse, setIsThisCornerHouse] = useState("yes");
  const [amenities, setAmenities] = useState("");

  const [ageOfTheProperty, setAgeOfTheProperty] = useState("");
  const [expectedRent, setExpectedRent] = useState("");
  const [securityAmount, setSecurityAmount] = useState("");
  const [priceIncludes, setPriceIncludes] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [maintenanceCharges, setMaintenanceCharges] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [siteView, setSiteView] = useState("");
  const [materPlan, setMaterPlan] = useState("");
  const [location, setLocation] = useState("");
  const [map, setMap] = useState("");
  const [otherPhoto, setOtherPhoto] = useState(""); // Renamed 'other' to 'otherPhoto' to avoid conflict
  const [exteriorView, setExteriorView] = useState("");
  const [livingRoom, setLivingRoom] = useState("");
  const [bedroomsImage, setBedroomsImage] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [floorPlan, setFloorPlan] = useState("");

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

  // Collect state variables into an object
  const proximityProps = {
    market,
    setMarket,
    interStateBusTerminal,
    setInterStateBusTerminal,
    srSecondarySchool,
    setSrSecondarySchool,
    university,
    setUniversity,
    militaryContonment,
    setMilitaryContonment,
    fireStation,
    setFireStation,
    barAndRestaurants,
    setBarAndRestaurants,
    shoppingMall,
    setShoppingMall,
    cinema,
    setCinema,
    publicSwimmingPool,
    setPublicSwimmingPool,
    club,
    setClub,
    townPark,
    setTownPark,
    golfCourse,
    setGolfCourse,
    liquorShop,
    setLiquorShop,
  };

  const floorOptions = [];
  for (let i = 1; i <= 200; i++) {
    floorOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const generateDropdownOptions = () => {
    let options = [];
    for (let i = 0.1; i <= 25; i += 0.1) {
      options.push(i.toFixed(1) + " km");
    }
    options.push("25+ km");
    return options;
  };
  const dropdownOptions = generateDropdownOptions();

  const formFields = [
    { name: "expectedRent", label: "Expected Rent" },
    { name: "securityAmount", label: "Security Amount" },
    { name: "priceIncludes", label: "Price Includes" },
    { name: "otherCharges", label: "Other Charges" },
    { name: "maintenanceCharges", label: "Maintenance Charges" },
    { name: "brokerage", label: "Brokerage" },
  ];

  const furnishedLabels = [
    { name: "lights", label: "Lights" },
    { name: "ac", label: "AC" },
    { name: "fans", label: "Fans" },
    { name: "tv", label: "TV" },
    { name: "beds", label: "Beds" },
    { name: "wardrobe", label: "Wardrobe" },
    { name: "geyser", label: "Geyser" },
  ];

  const kycFormFields = {
    forProperty,
    propertySubtype,
    superArea,
    length,
    breadth,
    facing,
    carpetArea,
    builtUpArea,
    yearOfConstruction,
    willingToRentOutTo,
    totalFlatsInSociety,
    nameOfProjectSociety,
    availableFrom,
    bedrooms,
    maxSleepingCapacity,
    isPrivateOrGroupAllowed,
    maxPrivateOrGroupAllowed,
    balconies,
    bathrooms,
    totalFloors,
    propertyOnFloor,
    otherRooms,
    furnishedStatus,
    lights,
    ac,
    fans,
    tv,
    beds,
    wardrobe,
    // other: "", // Not included as per your comment
    reservedParking,
    coveredParking,
    openParking,
    whetherInCooperativeSociety,
    whetherInGatedComplex,
    isThisCornerHouse,
    amenities,
    ageOfTheProperty,
    expectedRent,
    securityAmount,
    priceIncludes,
    otherCharges,
    maintenanceCharges,
    brokerage,
    siteView,
    materPlan,
    location,
    map,
    otherPhoto,
    exteriorView,
    livingRoom,
    bedroomsImage,
    kitchen,
    floorPlan,
    market,
    interStateBusTerminal,
    srSecondarySchool,
    university,
    militaryContonment,
    fireStation,
    barAndRestaurants,
    shoppingMall,
    cinema,
    publicSwimmingPool,
    club,
    townPark,
    golfCourse,
    liquorShop,
  };

  //Handle KYC form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(kycFormFields).forEach((key) => {
      formData.append(key, kycFormFields[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/form/submit-kyc-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      <div className="sm:py-5">
        <h2 className="sm:text-xl text-center font-bold text-red capitalize">
          KYC - {initialFormData?.title}
        </h2>

        <a
          href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            KYC FOR:
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Your {initialFormData?.propertySubtype} expecting amount Rs:{" "}
            {initialFormData?.expectedPrice} from it's{" "}
            {initialFormData?.saleType}
          </p>
        </a>
      </div>

      <div>
        <h4 className="font-semibold text-lg mt-10 mb-5">KYC Form</h4>

        <h6 className="font-semibold text-lg mt-10 mb-5">Area Details</h6>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-3">
            <div className="w-1/6 mb-5">
              <label
                htmlFor="superArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Super Area
              </label>
              <input
                type="text"
                name="superArea"
                id="superArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Super Area"
                required
                onChange={(e) => setSuperArea(e.target.value)}
                value={superArea}
              />
            </div>

            <div className="w-1/6 mb-5">
              <label
                htmlFor="length"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Length
              </label>
              <input
                type="text"
                name="length"
                id="length"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Length"
                required
                onChange={(e) => setLength(e.target.value)}
                value={length}
              />
            </div>

            <div className="w-1/6 mb-5">
              <label
                htmlFor="breadth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Breadth
              </label>
              <input
                type="text"
                name="breadth"
                id="breadth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Breadth"
                required
                onChange={(e) => setBreadth(e.target.value)}
                value={breadth}
              />
            </div>

            <div className="w-1/6 mb-5">
              <label
                htmlFor="carpetArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Carpet Area
              </label>
              <input
                type="text"
                name="carpetArea"
                id="carpetArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Carpet Area"
                required
                onChange={(e) => setCarpetArea(e.target.value)}
                value={carpetArea}
              />
            </div>

            <div className="w-1/6 mb-5">
              <label
                htmlFor="builtUpArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Built Up Area
              </label>
              <input
                type="text"
                name="builtUpArea"
                id="builtUpArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Built Up Area"
                required
                onChange={(e) => setBuiltUpArea(e.target.value)}
                value={builtUpArea}
              />
            </div>

            <div className="w-1/6 mb-5">
              <label
                htmlFor="yearOfConstruction"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Year Of Construction
              </label>
              <input
                type="text"
                name="yearOfConstruction"
                id="yearOfConstruction"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Year Of Construction"
                required
                onChange={(e) => setYearOfConstruction(e.target.value)}
                value={yearOfConstruction}
              />
            </div>
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

          <Proximity
            market={market}
            setMarket={setMarket}
            interStateBusTerminal={interStateBusTerminal}
            setInterStateBusTerminal={setInterStateBusTerminal}
            srSecondarySchool={srSecondarySchool}
            setSrSecondarySchool={setSrSecondarySchool}
            university={university}
            setUniversity={setUniversity}
            militaryContonment={militaryContonment}
            setMilitaryContonment={setMilitaryContonment}
            fireStation={fireStation}
            setFireStation={setFireStation}
            barAndRestaurants={barAndRestaurants}
            setBarAndRestaurants={setBarAndRestaurants}
            shoppingMall={shoppingMall}
            setShoppingMall={setShoppingMall}
            cinema={cinema}
            setCinema={setCinema}
            publicSwimmingPool={publicSwimmingPool}
            setPublicSwimmingPool={setPublicSwimmingPool}
            club={club}
            setClub={setClub}
            townPark={townPark}
            setTownPark={setTownPark}
            golfCourse={golfCourse}
            setGolfCourse={setGolfCourse}
            liquorShop={liquorShop}
            setLiquorShop={setLiquorShop}
          />
          <Amenities amenities={amenities} setAmenities={setAmenities} />
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formFields.map((field, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {uploadPhotosFields.map((field, index) => (
                <div key={index} className="max-w-lg mx-auto">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor={field.name}
                  >
                    Upload {field.label}
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby={`${field.name}_help`}
                    id={field.name}
                    type="file"
                    onChange={(e) => {
                      const setFunction = {
                        siteView: setSiteView,
                        materPlan: setMaterPlan,
                        location: setLocation,
                        map: setMap,
                        otherPhoto: setOtherPhoto,
                        exteriorView: setExteriorView,
                        livingRoom: setLivingRoom,
                        bedroomsImage: setBedroomsImage,
                        kitchen: setKitchen,
                        floorPlan: setFloorPlan,
                      }[field.name];
                      handleFileChange(e, setFunction);
                    }}
                  />
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id={`${field.name}_help`}
                  >
                    Please upload a {field.label.toLowerCase()} file.
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <PropertyImages
            siteView={siteView}
            setSiteView={setSiteView}
            materPlan={materPlan}
            setMaterPlan={setMaterPlan}
            location={location}
            setLocation={setLocation}
            map={map}
            setMap={setMap}
            otherPhoto={otherPhoto}
            setOtherPhoto={setOtherPhoto}
            exteriorView={exteriorView}
            setExteriorView={setExteriorView}
            livingRoom={livingRoom}
            setLivingRoom={setLivingRoom}
            bedroomsImage={bedroomsImage}
            setBedroomsImage={setBedroomsImage}
            kitchen={kitchen}
            setKitchen={setKitchen}
            floorPlan={floorPlan}
            setFloorPlan={setFloorPlan}
          />

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default KycForm;
