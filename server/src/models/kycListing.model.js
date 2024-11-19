import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const kycListingSchema = new mongoose.Schema(
  {
    forProperty: {
      type: mongoose.Types.ObjectId,
      ref: "InitialForm",
    },
    propertySubtype: {
      type: String,
    },
    area: {
      superArea: {
        type: String,
      },
      length: {
        type: String,
      },
      breadth: {
        type: String,
      },
      facing: {
        type: String,
      },
      carpetArea: {
        type: String,
      },
      builtUpArea: {
        type: String,
      },
      yearOfConstruction: {
        type: String,
      },
    },
    willingToRentOutTo: {
      type: String,
    },
    totalFlatsInSociety: {
      type: String,
    },
    nameOfProjectSociety: {
      type: String,
    },
    availableFrom: {
      type: String,
    },
    bedrooms: {
      type: String,
    },
    maxSleepingCapacity: {
      type: String,
    },
    isPrivateOrGroupAllowed: {
      type: String,
    },
    maxPrivateOrGroupAllowed: {
      type: String,
    },
    balconies: {
      type: String,
    },
    bathrooms: {
      type: String,
    },
    totalFloors: {
      type: String,
    },
    propertyOnFloor: {
      type: String,
    },
    otherRooms: {
      type: String,
    },
    furnishedStatus: {
      type: String,
    },
    ifFurnishedOrSemiFurnished: {
      lights: {
        type: String,
      },
      ac: {
        type: String,
      },
      fans: {
        type: String,
      },
      tv: {
        type: String,
      },
      beds: {
        type: String,
      },
      wardrobe: {
        type: String,
      },
      geyser: {
        type: String,
      },
      other: {
        type: String, //Sofa, Washing Machine, Stove, Fridge, Water Purifier, Microwave, Modular Kitchen, Chimney,Dinning Table, Curtains,  Exhaust Fan (Checkbox Select Multiple)
      },
    },
    reservedParking: {
      type: String, //yes   no
    },
    coveredParking: {
      type: String,
    },
    openParking: {
      type: String,
    },
    whetherInCooperativeSociety: {
      type: String, //yes   no
    },
    whetherInGatedComplex: {
      type: String, //yes  no
    },
    isThisCornerHouse: {
      type: String, //yes   no
    },
    amenities: {
      type: String,
    },
    proximity: {
      market: {
        type: String,
      },
      interStateBusTerminal: {
        type: String,
      },
      srSecondarySchool: {
        type: String,
      },
      university: {
        type: String,
      },
      militaryContonment: {
        type: String,
      },
      fireStation: {
        type: String,
      },
      barAndRestaurants: {
        type: String,
      },
      shoppingMall: {
        type: String,
      },
      cinema: {
        type: String,
      },
      publicSwimmingPool: {
        type: String,
      },
      club: {
        type: String,
      },
      townPark: {
        type: String,
      },
      golfCourse: {
        type: String,
      },
      liquorShop: {
        type: String,
      },
    },
    propertyHasFireSafetyLicense: {
      type: String, //yes    no
    },
    ageOfTheProperty: {
      type: String,
    },
    forFeiture: {
      type: Boolean,
    },
    priceDetails: {
      expectedRent: {
        type: String,
      },
      securityAmount: {
        type: String,
      },
      priceIncludes: {
        type: String,
      },
      otherCharges: {
        type: String,
      },
      maintenanceCharges: {
        type: String,
      },
      brokerage: {
        type: String,
      },
    },
    photos: {
      siteView: {
        type: String,
      },
      materPlan: {
        type: String,
      },
      location: {
        type: String,
      },
      map: {
        type: String,
      },
      otherPhoto: {
        type: String,
      },
      exteriorView: {
        type: String,
      },
      livingRoom: {
        type: String,
      },
      bedroomsImage: {
        type: String,
      },
      kitchen: {
        type: String,
      },
      floorPlan: {
        type: String,
      },
      masterPlan: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

kycListingSchema.plugin(mongooseAggregatePaginate);

export const kycListing = mongoose.model("kycListing", kycListingSchema);
