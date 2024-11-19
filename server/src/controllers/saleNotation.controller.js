import mongoose from "mongoose";
import { SaleNotation } from "../models/saleNotation.model.js";
import { SaleNotationMessage } from "../models/saleNotationMessage.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getSocketReceiverId } from "../app.js";
import { io } from "../app.js";

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

const sendSaleNotationMessage = asyncHandler(async (req, res) => {
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
    type,
    systemMessage,
  } = req.body;

  const token_doc = "";
  const earnestMoney_doc = "";
  const saleDeed_doc = "";

  const buyerId = req.user._id;

  // Validate required fields
  if (!propertyId || !sellerId || !brokerId || !lawyerId || !buyerId) {
    throw new ApiError(401, "All participant IDs and Property ID are required");
  }

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
  let conversation = await SaleNotation.findOne({
    participants: {
      $all: [
        objectIdSellerId,
        objectIdBuyerId,
        objectIdBrokerId,
        objectIdLawyerId,
      ],
    },
  });

  if (!conversation) {
    conversation = await SaleNotation.create({
      property: objectIdPropertyId,
      participants: [
        objectIdSellerId,
        objectIdBuyerId,
        objectIdBrokerId,
        objectIdLawyerId,
      ],
      messages: [],
    });
  }

  const newMessage = await SaleNotationMessage.create({
    saleNotationId: conversation._id,
    sender: objectIdBuyerId,
    type: type || null,
    systemMessage: systemMessage || null,
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
      token: token_doc || null,
      earnestMoney: earnestMoney_doc || null,
      saleDeed: saleDeed_doc || null,
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

  // Socket: Emit to all participants
  const participants = [
    objectIdSellerId,
    objectIdBuyerId,
    objectIdBrokerId,
    objectIdLawyerId,
  ];

  participants.forEach((participantId) => {
    const saleNotationReceiverSocket = getSocketReceiverId(
      participantId.toString()
    );
    if (saleNotationReceiverSocket) {
      io.to(saleNotationReceiverSocket).emit(
        "newSaleNotationMessage",
        newMessage
      );
    }
  });

  // Return the new message as the response
  return res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Message sent successfully"));
});

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

const getSaleNotationMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await SaleNotation.aggregate([
    // Match the conversation by ID
    {
      $match: {
        _id: new mongoose.Types.ObjectId(conversationId),
      },
    },
    // Lookup to get participants details
    {
      $lookup: {
        from: "users", // Collection name for users
        localField: "participants",
        foreignField: "_id",
        as: "participantsDetails",
      },
    },
    // Lookup to get property details
    {
      $lookup: {
        from: "initialforms", // Collection name for properties
        localField: "property",
        foreignField: "_id",
        as: "propertyDetails",
      },
    },
    // Lookup to get messages details
    {
      $lookup: {
        from: "salenotationmessages", // Collection name for messages
        localField: "messages",
        foreignField: "_id",
        as: "messagesDetails",
      },
    },
    // Unwind messagesDetails to work with individual messages
    {
      $unwind: "$messagesDetails",
    },
    // Lookup to get sender details for each message
    {
      $lookup: {
        from: "users", // Collection name for users
        localField: "messagesDetails.sender",
        foreignField: "_id",
        as: "senderDetails",
      },
    },
    // Add sender details to the message
    {
      $addFields: {
        "messagesDetails.sender": { $arrayElemAt: ["$senderDetails", 0] },
      },
    },
    // Group back messagesDetails into an array
    {
      $group: {
        _id: "$_id",
        propertyDetails: { $first: "$propertyDetails" },
        participantsDetails: { $first: "$participantsDetails" },
        messagesDetails: { $push: "$messagesDetails" },
        status: { $first: "$status" },
        lastActionBy: { $first: "$lastActionBy" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    // Project to include only relevant fields
    {
      $project: {
        _id: 1,
        propertyDetails: { $arrayElemAt: ["$propertyDetails", 0] }, // Assuming one property
        participantsDetails: 1,
        messagesDetails: 1,
        status: 1,
        lastActionBy: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, conversation[0], "Fetched conversation details")
    );
});

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

export {
  saleNotationConversation,
  sendSaleNotationMessage,
  getSaleNotationMessage,
  getConversationUsers,
  acceptSaleNotationConversation,
  sendLawyerDocMessage,
  checkExistingConversation,
};
