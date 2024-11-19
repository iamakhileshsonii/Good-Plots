import mongoose from "mongoose";
import { Conversation } from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { getSocketReceiverId, io } from "../app.js";

// GET MESSAGES
const getMessages = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;
  const loggedUser = req.user._id;

  if (!loggedUser) {
    throw new ApiError(401, "ReceiverId is required");
  }
  if (!receiverId) {
    throw new ApiError(401, "SenderId is required");
  }

  // Find the conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [loggedUser, receiverId] },
  }).populate("message"); // Ensure this field matches your schema

  if (conversation) {
    const members = await Conversation.findById(
      new mongoose.Types.ObjectId(conversation._id)
    ).populate("participants");
  }

  console.log("Conversation found:", conversation);

  if (!conversation) {
    return res.status(200).json(new ApiResponse(200, [], "No messages found"));
  }

  // Return the messages
  return res.status(200).json(
    new ApiResponse(
      200,
      { conversation, members }, // Ensure this matches your schema
      "All messages fetched successfully"
    )
  );
});

//SEND MESSAGES
const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { text } = req.body;
  const { receiverId } = req.params;

  if (!senderId) {
    throw new ApiError(401, "SenderId is required");
  }

  if (!text) {
    throw new ApiError(401, "Message text is required");
  }

  if (!receiverId) {
    throw new ApiError(401, "ReceiverId is required");
  }

  // Find or create a conversation between sender and receiver
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  // Create a new message
  const newMessage = new Message({
    receiverId: receiverId,
    senderId: senderId,
    text: text,
  });

  // Save the new message
  await newMessage.save();

  // Add the new message to the conversation
  conversation.message.push(newMessage._id);
  await conversation.save();

  //Socket
  const receiverSocketId = getSocketReceiverId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newMessage, "Message sent successfully"));
});

// GET CONVERSATIONS
const getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find all conversations involving the current user
  const conversations = await Conversation.find({
    participants: { $all: [userId] },
  }).populate("participants");

  // Extract the participants, and filter out the current userId
  const userIds = new Set();
  conversations.forEach((conversation) => {
    conversation.participants.forEach((participant) => {
      if (participant._id.toString() !== userId.toString()) {
        userIds.add(participant._id.toString());
      }
    });
  });

  // Convert the Set to an Array
  const uniqueUserIds = Array.from(userIds);

  // Fetch user details from the User collection
  const usersDetails = await User.find({ _id: { $in: uniqueUserIds } });

  // Respond with the user details
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        usersDetails,
        "User conversations fetched successfully"
      )
    );
});

export { getMessages, sendMessage, getUserConversations };
