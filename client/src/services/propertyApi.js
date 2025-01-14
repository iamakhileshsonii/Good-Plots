import { apiClient } from "./apiClient";

//Get all verified properties
export const getAllVerifiedProperties = async () => {
  try {
    const res = await apiClient.get("/property/verified-properties");

    if (res.status == 200) {
      console.log("Verified Properties", res.data);
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch verified properties", error);
  }
};

//Explore Properties
export const exploreProperties = async () => {
  try {
    const res = await apiClient.get("/property/explore-properties");

    if (res.status == 200) {
      console.log("Verified Properties", res.data);
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch verified properties", error);
  }
};

//Get Liked Properties
export const likedProperties = async () => {
  try {
    const res = await apiClient.get(`/property/liked`);

    if (res.status == 200) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch liked properties", error);
  }
};

//Get ShortListed Properties
export const shortlistedProperties = async () => {
  try {
    const res = await apiClient.get(`/property/shortlisted`);

    if (res.status == 200) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch shortlisted properties", error);
  }
};

//Publish Property
export const publishNewProperty = async (formData) => {
  try {
    const res = await apiClient.post(`/property/publish-property`, {
      formData,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while publishing new property", error);
  }
};

//Get User Pending Properties
export const getUserVerifiedProperties = async () => {
  try {
    const res = await apiClient.get(`/property/user-verified-properties`);

    if (res.status === 200) {
      console.log("Fetched property: ", res.data);
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Something went wrong while fetching user verified properties",
      error
    );
    return null;
  }
};

//Get User Verified Properties
export const getUserPendingProperties = async () => {
  try {
    const res = await apiClient.get(`/property/user-pending-properties`);

    if (res.status === 200) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Something went wrong while fetching user pending properties",
      error
    );
    return null;
  }
};

//Get Property
export const getProperty = async (propertyId) => {
  try {
    const res = await apiClient.get(`/property/${propertyId}`);

    if (res.status === 200) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while getting property details");
  }
};

//Upload property kyc images
export const uploadPropertyKycImages = async (formData) => {
  console.log("Recieved Form Data for Property Images: ", formData);
  try {
    const res = await apiClient.post(`/property/kyc-images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      console.log("All images uploaded successfully", res.data);
      return res.data.data;
    } else {
      console.error("Error uploading kyc images", res.data);
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while uploading kyc images", error);
  }
};

//Property KYC
export const applyPropertyKYC = async (formData, propertyId) => {
  try {
    const res = await apiClient.post(`/property/kyc/${propertyId}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      console.log("KYC FORM SUBMITTED: ", res.data);
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while submitting kyc form", error);
  }
};

//Delete Property
export const deleteProperty = async (propertyId) => {
  try {
    const res = await apiClient.delete(`/property/delete/${propertyId}`);

    if (res.status === 200) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong while deleting property");
  }
};

//Like Property
export const likeProperty = async () => {
  try {
  } catch (error) {
    console.error("Something went wrong while liking the property");
  }
};

//Shortlist Property
export const shortlistProperty = async () => {
  try {
  } catch (error) {
    console.error("Something went wrong while shortlisting the property");
  }
};
