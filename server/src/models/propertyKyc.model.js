import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const propertyKycSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Types.ObjectId,
      ref: "InitialForm",
      required: true, // Ensures that propertyId is provided
    },
    propertySubtype: {
      type: String,
    },
    area: {
      superArea: { type: String },
      length: { type: String },
      breadth: { type: String },
      facing: { type: String },
      carpetArea: { type: String },
      builtUpArea: { type: String },
      yearOfConstruction: { type: String },
    },
    ifSociety: {
      whetherInCooperativeSociety: { type: Boolean, default: false },
      whetherInGatedComplex: { type: Boolean, default: false },
      totalFloors: { type: String },
      propertyOnFloor: { type: String },
      maxSleepingCapacity: { type: String },
      isPrivateOrGroupAllowed: { type: String },
      maxPrivateOrGroupAllowed: { type: String },
      reservedParking: { type: Boolean, default: false }, // Set default as false
      coveredParking: { type: Boolean, default: false },
      openParking: { type: Boolean, default: false },
      totalFlatsInSociety: { type: String },
      nameOfProjectSociety: { type: String },
    },
    ifFurnishedOrSemiFurnished: {
      lights: { type: String },
      ac: { type: String },
      fans: { type: String },
      tv: { type: String },
      beds: { type: String },
      wardrobe: { type: String },
      geyser: { type: String },
      other: { type: String }, // (multiple options like Sofa, Washing Machine, etc.)
    },
    propertyInfo: {
      bedrooms: { type: String },
      balconies: { type: String },
      bathrooms: { type: String },
      isThisCornerHouse: { type: Boolean, default: false },
      propertyHasFireSafetyLicense: { type: Boolean, default: false },
      ageOfTheProperty: { type: String },
      otherRooms: { type: String },
      furnishedStatus: { type: String },
      availableFrom: { type: String },
      willingToRentOutTo: {
        type: String,
      },
    },
    amenities: {},
    proximity: {
      market: { type: String },
      interStateBusTerminal: { type: String },
      srSecondarySchool: { type: String },
      university: { type: String },
      militaryContonment: { type: String },
      fireStation: { type: String },
      barAndRestaurants: { type: String },
      shoppingMall: { type: String },
      cinema: { type: String },
      publicSwimmingPool: { type: String },
      club: { type: String },
      townPark: { type: String },
      golfCourse: { type: String },
      liquorShop: { type: String },
    },

    forFeiture: { type: Boolean, default: false },
    priceDetails: {
      expectedRent: { type: String },
      securityAmount: { type: String },
      priceIncludes: { type: String },
      otherCharges: { type: String },
      maintenanceCharges: { type: String },
      brokerage: { type: String },
    },
    photos: {
      siteView: { type: String },
      materPlan: { type: String },
      location: { type: String },
      map: { type: String },
      otherPhoto: { type: String },
      exteriorView: { type: String },
      livingRoom: { type: String },
      bedroomsImage: { type: String },
      kitchen: { type: String },
      floorPlan: { type: String },
      masterPlan: { type: String },
    },
  },
  { timestamps: true }
);

propertyKycSchema.plugin(mongooseAggregatePaginate);

export const PropertyKyc = mongoose.model("PropertyKyc", propertyKycSchema);
