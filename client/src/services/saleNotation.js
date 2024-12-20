import { apiClient } from "./apiClient";

// Get All Sale Notation Conversations
export const getSaleNotationConversations = async () => {
  try {
    const res = await apiClient.get(`/saleNotation/get-conversation`);
    if (res.status === 200) {
      return res.data.data;
    } else if (res.status === 404) {
      console.log("NO CONVERSATIONS FOUND");
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch all sale notations");
  }
};

// Get Sale Notation Messages
export const getSaleNotationMessages = async (conversationId) => {
  try {
    const res = await apiClient.get(
      `/saleNotation/get-message/${conversationId}`
    );

    if (res.status === 200) {
      return res.data.data;
    } else if (res.status === 404) {
      console.log("NO MESSAGES FOUND ");
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Unable to fetch conversation messages");
  }
};

//Send Sale Notation Message
export const sendSaleNotationMessage = async (formData) => {
  try {
    const res = await apiClient.post("/saleNotation/send-message", {
      formData,
    });

    console.log("SALE NOTATION MESSAGE: ", res.data);

    if (res.status === 200) {
      return res.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Something went wrong, unable to send sale notation message");
  }
};

// Is Sale Notation Exists
export const isSaleNotationExists = async (owner, propertyId) => {
  try {
    const res = await apiClient.post(`/saleNotation/is-saleNotation-exists`, {
      owner,
      propertyId,
    });

    return res.data.data;
  } catch (error) {
    // console.log("AXIOS RESPONSE: ", res);
    console.error(
      "Something went wrong while checking if sale notation exists:",
      error.message
    );
  }
};
