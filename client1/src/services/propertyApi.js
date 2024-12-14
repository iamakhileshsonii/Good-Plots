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
