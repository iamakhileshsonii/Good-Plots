import mongoose from "mongoose";
import { InitialForm } from "../models/initialFrom.model.js";

import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { kycListing } from "../models/kycListing.model.js";
import { ApiError } from "../utils/ApiError.js";

//SUBMIT INITIAL FORM
const submitInitialForm = asyncHandler(async (req, res) => {
  const {
    saleType,
    title,
    propertySubtype,
    description,
    address: { addressLine, pincode, city, state } = {},
    totalArea,
    expectedPrice,
    isNegotiable,
  } = req.body;
  // Check for missing or empty string fields
  const stringFields = [
    saleType,
    title,
    propertySubtype,
    description,
    addressLine,
    city,
    state,
    isNegotiable,
  ];
  const numberFields = [pincode, totalArea, expectedPrice];

  if (stringFields.some((field) => !field || field.trim() === "")) {
    throw new ApiError(
      401,
      "All string fields are required and cannot be empty"
    );
  }

  // Check for missing or invalid number fields
  if (
    numberFields.some(
      (field) => field === undefined || field === null || isNaN(field)
    )
  ) {
    throw new ApiError(
      401,
      "All numeric fields are required and must be valid numbers"
    );
  }

  const listingData = await InitialForm.create({
    saleType: saleType,
    title: title,
    propertySubtype: propertySubtype,
    description: description,
    address: {
      addressLine: addressLine,
      pincode: pincode,
      city: city,
      state: state,
    },
    totalArea: totalArea,
    expectedPrice: expectedPrice,
    isNegotiable: isNegotiable,
    owner: req.user?._id,
  });

  if (!listingData) {
    throw new ApiError(401, "Unable to submit intial form!!!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, listingData, "Initial form submitted successfully")
    );
});

//GET INITIAL FORM DATA (For KYC form)
const getInitialFormData = asyncHandler(async (req, res) => {
  const { formid } = req.params;

  if (!formid) {
    throw new ApiError(400, "Form ID is required");
  }

  const data = await InitialForm.findById(formid);

  if (!data) {
    throw new ApiError(404, "Initial form data not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Initial form data fetched successfully"));
});

// TEST KYC FORM
const submitTestForm = asyncHandler(async (req, res) => {
  // Extracting file paths from req.files
  const siteView = req.files?.siteView ? req.files.siteView[0].path : null;
  const materPlan = req.files?.materPlan ? req.files.materPlan[0].path : null;
  const location = req.files?.location ? req.files.location[0].path : null;
  const map = req.files?.map ? req.files.map[0].path : null;
  const otherPhoto = req.files?.otherPhoto
    ? req.files.otherPhoto[0].path
    : null;
  const exteriorView = req.files?.exteriorView
    ? req.files.exteriorView[0].path
    : null;
  const livingRoom = req.files?.livingRoom
    ? req.files.livingRoom[0].path
    : null;
  const bedroomsImage = req.files?.bedroomsImage
    ? req.files.bedroomsImage[0].path
    : null;
  const kitchen = req.files?.kitchen ? req.files.kitchen[0].path : null;
  const floorPlan = req.files?.floorPlan ? req.files.floorPlan[0].path : null;

  // Extracting other form fields from req.body
  const {
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
    geyser,
    other,
    reservedParking,
    coveredParking,
    openParking,
    whetherInCooperativeSociety,
    whetherInGatedComplex,
    isThisCornerHouse,
    amenities,
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
    propertyHasFireSafetyLicense,
    ageOfTheProperty,
    expectedRent,
    securityAmount,
    priceIncludes,
    otherCharges,
    maintenanceCharges,
    brokerage,
  } = req.body;

  // Validation checks for required fields
  const requiredFields = [
    { field: siteView, fieldName: "Site View image" },
    { field: materPlan, fieldName: "Master Plan image" },
    { field: location, fieldName: "Location image" },
    { field: map, fieldName: "Map image" },
    { field: otherPhoto, fieldName: "Other Photo image" },
    { field: exteriorView, fieldName: "Exterior View image" },
    { field: livingRoom, fieldName: "Living Room image" },
    { field: bedroomsImage, fieldName: "Bedrooms Image" },
    { field: kitchen, fieldName: "Kitchen image" },
    { field: floorPlan, fieldName: "Floor Plan image" },
  ];

  for (const fieldObj of requiredFields) {
    if (!fieldObj.field) {
      throw new ApiError(401, `${fieldObj.fieldName} is required`);
    }
  }

  // Upload on cloudinary
  // Uploading files to Cloudinary

  const siteViewCloudinary = siteView
    ? await uploadOnCloudinary(siteView)
    : null;
  const materPlanCloudinary = materPlan
    ? await uploadOnCloudinary(materPlan)
    : null;
  const locationCloudinary = location
    ? await uploadOnCloudinary(location)
    : null;
  const mapCloudinary = map ? await uploadOnCloudinary(map) : null;
  const otherPhotoCloudinary = otherPhoto
    ? await uploadOnCloudinary(otherPhoto)
    : null;
  const exteriorViewCloudinary = exteriorView
    ? await uploadOnCloudinary(exteriorView)
    : null;
  const livingRoomCloudinary = livingRoom
    ? await uploadOnCloudinary(livingRoom)
    : null;
  const bedroomsImageCloudinary = bedroomsImage
    ? await uploadOnCloudinary(bedroomsImage)
    : null;
  const kitchenCloudinary = kitchen ? await uploadOnCloudinary(kitchen) : null;
  const floorPlanCloudinary = floorPlan
    ? await uploadOnCloudinary(floorPlan)
    : null;

  //Update Initial form KYC field
  const initialForm = await InitialForm.findByIdAndUpdate(forProperty).set({
    kyc: "completed",
  });

  // Create new kycListing entry
  const kycFormUpdate = await kycListing.create({
    forProperty,
    propertySubtype,
    area: {
      superArea,
      length,
      breadth,
      facing,
      carpetArea,
      builtUpArea,
      yearOfConstruction,
    },
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
    ifFurnishedOrSemiFurnished: {
      lights,
      ac,
      fans,
      tv,
      beds,
      wardrobe,
      geyser,
      other,
    },
    reservedParking,
    coveredParking,
    openParking,
    whetherInCooperativeSociety,
    whetherInGatedComplex,
    isThisCornerHouse,
    amenities,
    proximity: {
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
    },
    propertyHasFireSafetyLicense,
    ageOfTheProperty,
    priceDetails: {
      expectedRent,
      securityAmount,
      priceIncludes,
      otherCharges,
      maintenanceCharges,
      brokerage,
    },
    photos: {
      siteView: siteViewCloudinary.url,
      materPlan: materPlanCloudinary.url,
      location: locationCloudinary.url,
      map: mapCloudinary.url,
      otherPhoto: otherPhotoCloudinary.url,
      exteriorView: exteriorViewCloudinary.url,
      livingRoom: livingRoomCloudinary.url,
      bedroomsImage: bedroomsImageCloudinary.url,
      kitchen: kitchenCloudinary.url,
      floorPlan: floorPlanCloudinary.url,
    },
  });

  // Return success response with uploaded file paths and other data
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Test form submitted successfully"));
});

// SUBMIT KYC FORM
const submitKycForm = asyncHandler(async (req, res) => {
  try {
    // Log the received files and fields
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    // Extract fields from req.body
    const {
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

      // other, // Currently not included
      reservedParking,
      coveredParking,
      openParking,
      whetherInCooperativeSociety,
      whetherInGatedComplex,
      isThisCornerHouse,
      amenities,
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
      proertyHasFireSafetyLicense, // Correct typo if needed
      ageOfTheProperty,
      expectedRent,
      securityAmount,
      priceIncludes,
      otherCharges,
      maintenanceCharges,
      brokerage,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "forProperty",
      "superArea",
      "length",
      "breadth",
      "facing",
      "carpetArea",
      "builtUpArea",
      "yearOfConstruction",
      "willingToRentOutTo",
      "totalFlatsInSociety",
      "nameOfProjectSociety",
      "availableFrom",
      "bedrooms",
      "maxSleepingCapacity",
      "isPrivateOrGroupAllowed",
      "maxPrivateOrGroupAllowed",
      "balconies",
      "bathrooms",
      "totalFloors",
      "propertyOnFloor",
      "otherRooms",
      "furnishedStatus",
      "lights",
      "ac",
      "fans",
      "tv",
      "beds",
      "wardrobe",

      // "other", // Currently not included
      "reservedParking",
      "coveredParking",
      "openParking",
      "whetherInCooperativeSociety",
      "whetherInGatedComplex",
      "isThisCornerHouse",
      "amenities",
      "market",
      "interStateBusTerminal",
      "srSecondarySchool",
      "university",
      "militaryContonment",
      "fireStation",
      "barAndRestaurants",
      "shoppingMall",
      "cinema",
      "publicSwimmingPool",
      "club",
      "townPark",
      "golfCourse",
      "liquorShop",
      // "proertyHasFireSafetyLicense", // Correct typo if needed
      // "ageOfTheProperty",
      // "expectedRent",
      // "securityAmount",
      // "priceIncludes",
      // "otherCharges",
      // "maintenanceCharges",
      // "brokerage",
      // "propertyHasFireSafetyLicense", // Correct typo if needed
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        throw new ApiError(401, `${field} is required`);
      }
    }

    // Extract file paths from req.files
    const {
      siteView,
      materPlan,
      location,
      map,
      exteriorView,
      livingRoom,
      bedroomsImage,
      kitchen,
      floorPlan,
      otherPhoto,
    } = req.files;

    // Validate required file uploads
    const requiredFiles = [
      siteView,
      materPlan,
      location,
      map,
      exteriorView,
      livingRoom,
      bedroomsImage,
      kitchen,
      floorPlan,
      otherPhoto,
    ];

    for (const file of requiredFiles) {
      if (!file || !file[0]?.path) {
        throw new ApiError(401, `${file} image is required`);
      }
    }

    // Upload files to cloudinary
    const uploadPromises = requiredFiles.map((file) =>
      uploadOnCloudinary(file[0].path)
    );
    const [
      uploadSiteViewFile,
      uploadMaterPlanFile,
      uploadLocationFile,
      uploadMapFile,
      uploadExteriorViewFile,
      uploadLivingRoomFile,
      uploadBedroomsImageFile,
      uploadKitchenFile,
      uploadFloorPlanFile,
      uploadOtherPhotoFile,
    ] = await Promise.all(uploadPromises);

    // Validate uploaded files
    const uploadedFiles = [
      uploadSiteViewFile,
      uploadMaterPlanFile,
      uploadLocationFile,
      uploadMapFile,
      uploadExteriorViewFile,
      uploadLivingRoomFile,
      uploadBedroomsImageFile,
      uploadKitchenFile,
      uploadFloorPlanFile,
      uploadOtherPhotoFile,
    ];

    uploadedFiles.forEach((file, index) => {
      if (!file.url) {
        throw new ApiError(401, `${requiredFiles[index]} image upload failed`);
      }
    });

    // Create KYC form entry
    const uploadDataOnKYCForm = await kycListing.create({
      forProperty,
      propertySubtype,
      area: {
        superArea,
        length,
        breadth,
        facing,
        carpetArea,
        builtUpArea,
        yearOfConstruction,
      },
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
      ifFurnishedOrSemiFurnished: {
        lights,
        ac,
        fans,
        tv,
        beds,
        wardrobe,

        // other, // Currently not included
      },
      reservedParking,
      coveredParking,
      openParking,
      whetherInCooperativeSociety,
      whetherInGatedComplex,
      isThisCornerHouse,
      amenities,
      proximity: {
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
      },

      ageOfTheProperty,
      priceDetails: {
        expectedRent,
        securityAmount,
        priceIncludes,
        otherCharges,
        maintenanceCharges,
        brokerage,
      },
      photos: {
        siteView: uploadSiteViewFile.url,
        materPlan: uploadMaterPlanFile.url,
        location: uploadLocationFile.url,
        map: uploadMapFile.url,
        exteriorView: uploadExteriorViewFile.url,
        livingRoom: uploadLivingRoomFile.url,
        bedroomsImage: uploadBedroomsImageFile.url,
        kitchen: uploadKitchenFile.url,
        floorPlan: uploadFloorPlanFile.url,
        otherPhoto: uploadOtherPhotoFile.url,
      },
    });

    // Send success response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          uploadDataOnKYCForm,
          "KYC Form submitted successfully"
        )
      );
  } catch (error) {
    console.error("Error submitting KYC form:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export { submitInitialForm, getInitialFormData, submitKycForm, submitTestForm };
