import mongoose from "mongoose";
import { SaleNotation } from "../models/saleNotation.model.js";
import { SaleNotationMessage } from "../models/saleNotationMessage.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getSocketReceiverId } from "../app.js";
import { io } from "../app.js";
import { InitialForm } from "../models/initialFrom.model.js";

const saleNotationConversation = asyncHandler(async (req, res) => {
  const authUser = req.user._id;

  // Find all conversations where req.user._id is a participant
  const conversations = await SaleNotation.find({
    participants: authUser,
  })
    .populate("property", "title propertySubtype") // Adjust this to the actual fields in Property model
    .populate({
      path: "messages",
      populate: {
        path: "sender",
        model: "User",
        select: "username email fullname role avatar", // Select the fields you need
      },
    })
    .populate("participants", "username email fullname role avatar"); // Populate participants as well

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        conversations,
        "Sale notation conversations fetched successfully"
      )
    );
});

const getConversationUsers = asyncHandler(async (req, res) => {
  const authUser = req.user._id;

  // Find all conversations where req.user._id is a participant
  const conversations = await SaleNotation.find({
    participants: authUser,
  })
    .populate("participants")
    .populate("property", "title propertySubtype");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        conversations,
        "Sale notation conversations fetched successfully"
      )
    );
});

// const sendSaleNotationMessage = asyncHandler(async (req, res) => {
//   const {
//     brokerId,
//     lawyerId,
//     sellerId,
//     propertyId,
//     action,
//     totalPaymentAmount,
//     totalTime,
//     earnestMoney,
//     dateOfPayment,
//     agreementDate,
//     expectedBySeller_totalPaymentAmount,
//     expectedBySeller_totalTime,
//     expectedBySeller_earnestMoney,
//     type,
//     systemMessage,
//   } = req.body;

//   const token_doc = "";
//   const earnestMoney_doc = "";
//   const saleDeed_doc = "";

//   const buyerId = req.user._id;

//   // Validate required fields
//   if (!propertyId || !sellerId || !brokerId || !lawyerId || !buyerId) {
//     throw new ApiError(401, "All participant IDs and Property ID are required");
//   }

//   // Convert ids to ObjectId
//   const [
//     objectIdPropertyId,
//     objectIdSellerId,
//     objectIdBrokerId,
//     objectIdLawyerId,
//     objectIdBuyerId,
//   ] = [propertyId, sellerId, brokerId, lawyerId, buyerId].map(
//     (id) => new mongoose.Types.ObjectId(id)
//   );

//   // // Find or create conversation
//   let conversation = await SaleNotation.findOne({
//     participants: {
//       $all: [
//         objectIdSellerId,
//         objectIdBuyerId,
//         objectIdBrokerId,
//         objectIdLawyerId,
//       ],
//     },
//   });

//   if (!conversation) {
//     conversation = await SaleNotation.create({
//       property: objectIdPropertyId,
//       participants: [
//         objectIdSellerId,
//         objectIdBuyerId,
//         objectIdBrokerId,
//         objectIdLawyerId,
//       ],
//       messages: [],
//     });
//   }

//   const newMessage = await SaleNotationMessage.create({
//     saleNotationId: conversation._id,
//     sender: objectIdBuyerId,
//     type: type || null,
//     systemMessage: systemMessage || null,
//     offerDetails: {
//       totalPaymentAmount: totalPaymentAmount || null,
//       totalTime: totalTime || null,
//       earnestMoney: earnestMoney || null,
//       dateOfPayment: dateOfPayment || null,
//       expectedBySeller: {
//         totalPaymentAmount: expectedBySeller_totalPaymentAmount || null,
//         totalTime: expectedBySeller_totalTime || null,
//         earnestMoney: expectedBySeller_earnestMoney || null,
//       },
//     },
//     agreementDate: agreementDate || null,
//     agreementDoc: {
//       token: token_doc || null,
//       earnestMoney: earnestMoney_doc || null,
//       saleDeed: saleDeed_doc || null,
//     },
//   });

//   // Update conversation status based on action
//   conversation.messages.push(newMessage._id);
//   conversation.status =
//     action === "counter"
//       ? "countered"
//       : action === "accept"
//         ? "accepted"
//         : "pending";
//   conversation.lastActionBy = objectIdBuyerId;
//   await conversation.save();

//   //Socket
//   const saleNotationReceiverSocket = getSocketReceiverId(receiverId);
//   if (saleNotationReceiverSocket) {
//     io.to(saleNotationReceiverSocket).emit(
//       "receiveSaleNotationMessage",
//       newMessage
//     ); //receiveSaleNotationMessage
//   }

//   // Return the new message as the response
//   return res
//     .status(200)
//     .json(new ApiResponse(200, newMessage, "Message sent successfully"));
// });

// _____________________           OLD WORKING CONTROLLERS     ____________

// const sendSaleNotationMessage = asyncHandler(async (req, res) => {
//   const {
//     brokerId,
//     lawyerId,
//     sellerId,
//     propertyId,
//     action,
//     totalPaymentAmount,
//     totalTime,
//     earnestMoney,
//     dateOfPayment,
//     agreementDate,
//     expectedBySeller_totalPaymentAmount,
//     expectedBySeller_totalTime,
//     expectedBySeller_earnestMoney,
//     type,
//     systemMessage,
//   } = req.body;

//   const token_doc = "";
//   const earnestMoney_doc = "";
//   const saleDeed_doc = "";

//   const buyerId = req.user._id;

//   // Validate required fields
//   if (!propertyId || !sellerId || !brokerId || !lawyerId || !buyerId) {
//     throw new ApiError(401, "All participant IDs and Property ID are required");
//   }

//   // Convert ids to ObjectId
//   const [
//     objectIdPropertyId,
//     objectIdSellerId,
//     objectIdBrokerId,
//     objectIdLawyerId,
//     objectIdBuyerId,
//   ] = [propertyId, sellerId, brokerId, lawyerId, buyerId].map(
//     (id) => new mongoose.Types.ObjectId(id)
//   );

//   // Find or create conversation
//   let conversation = await SaleNotation.findOne({
//     participants: {
//       $all: [
//         objectIdSellerId,
//         objectIdBuyerId,
//         objectIdBrokerId,
//         objectIdLawyerId,
//       ],
//     },
//   });

//   if (!conversation) {
//     conversation = await SaleNotation.create({
//       property: objectIdPropertyId,
//       participants: [
//         objectIdSellerId,
//         objectIdBuyerId,
//         objectIdBrokerId,
//         objectIdLawyerId,
//       ],
//       messages: [],
//     });
//   }

//   const newMessage = await SaleNotationMessage.create({
//     saleNotationId: conversation._id,
//     sender: objectIdBuyerId,
//     type: type || null,
//     systemMessage: systemMessage || null,
//     offerDetails: {
//       totalPaymentAmount: totalPaymentAmount || null,
//       totalTime: totalTime || null,
//       earnestMoney: earnestMoney || null,
//       dateOfPayment: dateOfPayment || null,
//       expectedBySeller: {
//         totalPaymentAmount: expectedBySeller_totalPaymentAmount || null,
//         totalTime: expectedBySeller_totalTime || null,
//         earnestMoney: expectedBySeller_earnestMoney || null,
//       },
//     },
//     agreementDate: agreementDate || null,
//     agreementDoc: {
//       token: token_doc || null,
//       earnestMoney: earnestMoney_doc || null,
//       saleDeed: saleDeed_doc || null,
//     },
//   });

//   // Update conversation status based on action
//   conversation.messages.push(newMessage._id);
//   conversation.status =
//     action === "counter"
//       ? "countered"
//       : action === "accept"
//         ? "accepted"
//         : "pending";
//   conversation.lastActionBy = objectIdBuyerId;
//   await conversation.save();

//   // Socket: Emit to all participants
//   const participants = [
//     objectIdSellerId,
//     objectIdBuyerId,
//     objectIdBrokerId,
//     objectIdLawyerId,
//   ];

//   participants.forEach((participantId) => {
//     const saleNotationReceiverSocket = getSocketReceiverId(
//       participantId.toString()
//     );
//     if (saleNotationReceiverSocket) {
//       io.to(saleNotationReceiverSocket).emit(
//         "newSaleNotationMessage",
//         newMessage
//       );
//     }
//   });

//   // Return the new message as the response
//   return res
//     .status(200)
//     .json(new ApiResponse(200, newMessage, "Message sent successfully"));
// });

const sendLawyerDocMessage = asyncHandler(async (req, res) => {
  const {
    brokerId,
    lawyerId,
    sellerId,
    propertyId,
    action,
    totalPaymentAmount,
    totalTime,
    earnestMoney,
    dateOfPayment,
    agreementDate,
    expectedBySeller_totalPaymentAmount,
    expectedBySeller_totalTime,
    expectedBySeller_earnestMoney,
  } = req.body;

  const buyerId = req.user._id;

  // Validate required fields
  if (!propertyId || !sellerId || !brokerId || !lawyerId || !buyerId) {
    throw new ApiError(401, "All participant IDs and Property ID are required");
  }

  // Access uploaded files
  const token_doc = req.files.token_doc ? req.files.token_doc[0].path : "";
  const earnestMoney_doc = req.files.earnestMoney_doc
    ? req.files.earnestMoney_doc[0].path
    : null;
  const saleDeed_doc = req.files.saleDeed_doc
    ? req.files.saleDeed_doc[0].path
    : null;

  // Prepare data for the new message
  const allData = {
    brokerId,
    lawyerId,
    sellerId,
    buyerId,
    propertyId,
    action,
    totalPaymentAmount,
    totalTime,
    earnestMoney,
    dateOfPayment,
    agreementDate,
    expectedBySeller_totalPaymentAmount,
    expectedBySeller_totalTime,
    expectedBySeller_earnestMoney,
    token_doc,
    earnestMoney_doc,
    saleDeed_doc,
  };

  // Convert ids to ObjectId
  const [
    objectIdPropertyId,
    objectIdSellerId,
    objectIdBrokerId,
    objectIdLawyerId,
    objectIdBuyerId,
  ] = [propertyId, sellerId, brokerId, lawyerId, buyerId].map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  // Find or create conversation
  let conversation = await SaleNotation.findById(
    new mongoose.Types.ObjectId(req.params.conversationId)
  );

  //Upload doc on cloudinary
  const token_doc_cloudinary = await uploadOnCloudinary(token_doc);
  const earnest_money_doc_cloudinary =
    await uploadOnCloudinary(earnestMoney_doc);
  const sale_deed_doc_cloudinary = await uploadOnCloudinary(saleDeed_doc);

  // Create and save the new message
  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversation._id,
    sender: objectIdBuyerId,
    offerDetails: {
      totalPaymentAmount: totalPaymentAmount || null,
      totalTime: totalTime || null,
      earnestMoney: earnestMoney || null,
      dateOfPayment: dateOfPayment || null,
      expectedBySeller: {
        totalPaymentAmount: expectedBySeller_totalPaymentAmount || null,
        totalTime: expectedBySeller_totalTime || null,
        earnestMoney: expectedBySeller_earnestMoney || null,
      },
    },
    agreementDate: agreementDate || null,
    agreementDoc: {
      token: token_doc_cloudinary.url || null,
      earnestMoney: earnest_money_doc_cloudinary.url || null,
      saleDeed: sale_deed_doc_cloudinary.url || null,
    },
  });

  // Update conversation status based on action
  conversation.messages.push(newMessage._id);
  conversation.status =
    action === "counter"
      ? "countered"
      : action === "accept"
        ? "accepted"
        : "pending";
  conversation.lastActionBy = objectIdBuyerId;
  await conversation.save();

  // Return the new message as the response
  return res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Message sent successfully"));
});

// const getSaleNotationMessage = asyncHandler(async (req, res) => {
//   const { conversationId } = req.params;

//   const conversation = await SaleNotation.aggregate([
//     // Match the conversation by ID
//     {
//       $match: {
//         _id: new mongoose.Types.ObjectId(conversationId),
//       },
//     },
//     // Lookup to get participants details
//     {
//       $lookup: {
//         from: "users", // Collection name for users
//         localField: "participants",
//         foreignField: "_id",
//         as: "participantsDetails",
//       },
//     },
//     // Lookup to get property details
//     {
//       $lookup: {
//         from: "initialforms", // Collection name for properties
//         localField: "property",
//         foreignField: "_id",
//         as: "propertyDetails",
//       },
//     },
//     // Lookup to get messages details
//     {
//       $lookup: {
//         from: "salenotationmessages", // Collection name for messages
//         localField: "messages",
//         foreignField: "_id",
//         as: "messagesDetails",
//       },
//     },
//     // Unwind messagesDetails to work with individual messages
//     {
//       $unwind: "$messagesDetails",
//     },
//     // Lookup to get sender details for each message
//     {
//       $lookup: {
//         from: "users", // Collection name for users
//         localField: "messagesDetails.sender",
//         foreignField: "_id",
//         as: "senderDetails",
//       },
//     },
//     // Add sender details to the message
//     {
//       $addFields: {
//         "messagesDetails.sender": { $arrayElemAt: ["$senderDetails", 0] },
//       },
//     },
//     // Group back messagesDetails into an array
//     {
//       $group: {
//         _id: "$_id",
//         propertyDetails: { $first: "$propertyDetails" },
//         participantsDetails: { $first: "$participantsDetails" },
//         messagesDetails: { $push: "$messagesDetails" },
//         status: { $first: "$status" },
//         lastActionBy: { $first: "$lastActionBy" },
//         createdAt: { $first: "$createdAt" },
//         updatedAt: { $first: "$updatedAt" },
//       },
//     },
//     // Project to include only relevant fields
//     {
//       $project: {
//         _id: 1,
//         propertyDetails: { $arrayElemAt: ["$propertyDetails", 0] }, // Assuming one property
//         participantsDetails: 1,
//         messagesDetails: 1,
//         status: 1,
//         lastActionBy: 1,
//         createdAt: 1,
//         updatedAt: 1,
//       },
//     },
//   ]);

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, conversation[0], "Fetched conversation details")
//     );
// });

const acceptSaleNotationConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await SaleNotation.findByIdAndUpdate(
    new mongoose.Types.ObjectId(conversationId),
    {
      $set: {
        status: "accepted",
        lastActionBy: new mongoose.Types.ObjectId(req.user),
      },
    }
  );

  if (!conversation) {
    throw new ApiError(409, "Unable to accept offer");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, conversation, "Offer accepted successfully"));
});

const checkExistingConversation = asyncHandler(async (req, res) => {
  console.log("REQUESTED USER: ", req.user);
  const { propertyId } = req.params;
  const authUserId = req.user._id;

  try {
    // Find a conversation where the propertyId matches and the authenticated user is in the participants
    const convoExists = await SaleNotation.findOne({
      property: propertyId,
      participants: { $in: [authUserId] }, // Use $in to check if authUserId is in the participants array
    });

    if (!convoExists) {
      return res
        .status(200)
        .json(new ApiResponse(200, 0, "Conversation does not exist"));
    }

    return res.status(200).json(new ApiResponse(200, 1, "Conversation exists"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong"));
  }
});

// ____________      NEW CONTROLLERS      ____________

//Get Sale Notation Conversation
export const getAllConversation = asyncHandler(async (req, res) => {
  const conversations = await SaleNotation.aggregate([
    {
      $match: {
        participants: req.user._id,
      },
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "property",
        foreignField: "_id",
        as: "propertyDetails",
      },
    },
    {
      $project: {
        _id: 1,

        participants: 1,
        status: 1,
        lastActionBy: 1,
        propertyDetails: 1,
      },
    },
  ]);

  if (!conversations) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No Conversations Found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        conversations,
        "All Conversation Fetched Successfully"
      )
    );
});

//Get Selected Sale Notation Message
export const getSaleNotationMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  console.log("CONVERSATION ID RECIEVED: ", conversationId);

  if (!conversationId) {
    throw new ApiError(401, "Conversation Id is required");
  }

  // const messages =
  //   await SaleNotation.findById(conversationId).populate("messages");
  const messages = await SaleNotationMessage.aggregate([
    {
      $match: {
        saleNotationId: new mongoose.Types.ObjectId(conversationId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderInfo",
      },
    },
  ]);

  if (!messages) {
    return res.status(404).json(new ApiResponse(404, {}, "No Messages Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "All Messages Fetched Successfully"));
});

// Send Sale Notation Message
const sendSaleNotationMessage = asyncHandler(async (req, res) => {
  const { formData } = req.body;

  console.log("FORM DATA RECEIVED: ", formData);

  // Check if conversation exists
  let conversation = await SaleNotation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
    },
    property: new mongoose.Types.ObjectId(formData.propertyId),
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = await SaleNotation.create({
      participants: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
      property: new mongoose.Types.ObjectId(formData.propertyId),
      messages: [],
    });
  }

  // Create a new message
  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversation._id,
    sender: new mongoose.Types.ObjectId(formData.sender),
    offerDetails: formData.offerDetails,
  });

  // Push the new message into the conversation's messages array
  conversation.messages.push(newMessage._id);
  conversation.lastActionBy = new mongoose.Types.ObjectId(req.user._id);
  await conversation.save();

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, formData, "Message sent successfully"));
});

// Is Sale Notation Exists
const isSaleNotationExists = asyncHandler(async (req, res) => {
  const { owner, propertyId } = req.body;

  const isNotationExists = await SaleNotation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(owner), // Owner ID
        new mongoose.Types.ObjectId(req.user._id), // Current user ID (sender)
      ],
    },
    property: new mongoose.Types.ObjectId(propertyId), // Property ID condition
  });

  // console.log("Notation Exists: ", isNotationExists)

  if (!isNotationExists) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "Sale Notation Not Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, isNotationExists, "Sale Notation Found"));
});

//Get Sale Notation By ID
export const getSaleNotationById = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const saleNotation = await SaleNotation.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(conversationId),
      },
    },
    {
      $lookup: {
        from: "initialforms",
        localField: "property",
        foreignField: "_id",
        as: "propertyDetails",
      },
    },
    {
      $unwind: "$propertyDetails",
    },
    {
      $lookup: {
        from: "users",
        localField: "lastActionBy",
        foreignField: "_id",
        as: "lastUserAction",
      },
    },
    {
      $unwind: "$lastUserAction",
    },
    {
      $project: {
        _id: 1,
        lastUserAction: {
          _id: 1,
          fullname: 1,
          role: 1,
          email: 1,
          phone: 1,
        },
        propertyDetails: 1,
        status: 1,
        participants: 1,
        messages: 1,
      },
    },
  ]);

  if (!saleNotation) {
    throw new ApiError(404, "Sale Notation with Provided ID Not Found");
  }

  console.log("Conversation ID received: ", conversationId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        saleNotation,
        `Sale Notation ${conversationId} fetched successfully`
      )
    );
});

//Accept Offer
export const acceptOffer = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await SaleNotation.findByIdAndUpdate(
    new mongoose.Types.ObjectId(conversationId),
    {
      $set: {
        status: "ACCEPTED",
        lastActionBy: new mongoose.Types.ObjectId(req.user),
      },
    },
    {
      new: true,
    }
  );

  if (!conversation) {
    throw new ApiError(409, "Unable to accept offer");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, conversation, "Offer accepted successfully"));
});

//Counter Offer
export const counterOffer = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { formData } = req.body;

  console.log("FORM DATA: ", formData);

  // Check if conversation exists
  let conversation = await SaleNotation.findById(conversationId);

  if (conversation) {
    console.log("✅ CONVERSATION FOUND ");
  }

  // If no conversation exists, create a new one
  if (!conversation) {
    console.log("❌ CONVERSATION NOT FOUND: Creating New");
    throw new ApiError(404, "Conversation Does Not Exists");
  }

  // Create a new message
  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversationId,
    sender: new mongoose.Types.ObjectId(formData.sender),
    offerDetails: formData.offerDetails,
  });

  // Push the new message into the conversation's messages array
  conversation.messages.push(newMessage._id);
  conversation.lastActionBy = new mongoose.Types.ObjectId(req.user._id);
  await conversation.save();

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, formData, "Message sent successfully"));
});

//BROKER: Send Message
export const sendMessageByBroker = asyncHandler(async (req, res) => {
  const { formData } = req.body;

  console.log("sendMessageByBroker FORM DATA RECEIVED: ", formData);

  // Check if conversation exists
  let conversation = await SaleNotation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
    },
    property: new mongoose.Types.ObjectId(formData.propertyId),
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = await SaleNotation.create({
      participants: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
      property: new mongoose.Types.ObjectId(formData.propertyId),
      messages: [],
    });
  }

  // Create a new message
  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversation._id,
    sender: new mongoose.Types.ObjectId(formData.sender),
    offerDetails: formData.offerDetails,
  });

  // Push the new message into the conversation's messages array
  conversation.messages.push(newMessage._id);
  conversation.lastActionBy = new mongoose.Types.ObjectId(req.user._id);
  await conversation.save();

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, formData, "Message sent successfully"));
});

//LAWYER: Send Message
export const sendMessageByLawyer = asyncHandler(async (req, res) => {
  const { formData } = req.body;

  console.log("sendMessageByLawyer FORM DATA RECEIVED: ", formData);

  // Check if conversation exists
  let conversation = await SaleNotation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
    },
    property: new mongoose.Types.ObjectId(formData.propertyId),
  });

  // If no conversation exists, create a new one
  if (!conversation) {
    conversation = await SaleNotation.create({
      participants: [
        new mongoose.Types.ObjectId(formData.sender),
        new mongoose.Types.ObjectId(formData.owner),
      ],
      property: new mongoose.Types.ObjectId(formData.propertyId),
      messages: [],
    });
  }

  // Create a new message
  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversation._id,
    sender: new mongoose.Types.ObjectId(formData.sender),
    offerDetails: formData.offerDetails,
  });

  // Push the new message into the conversation's messages array
  conversation.messages.push(newMessage._id);
  conversation.lastActionBy = new mongoose.Types.ObjectId(req.user._id);
  await conversation.save();

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, formData, "Message sent successfully"));
});

export {
  saleNotationConversation,
  sendSaleNotationMessage,
  getConversationUsers,
  acceptSaleNotationConversation,
  sendLawyerDocMessage,
  checkExistingConversation,
  isSaleNotationExists,
};
