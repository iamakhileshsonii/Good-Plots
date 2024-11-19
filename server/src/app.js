import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http"; // Import http
import { Server } from "socket.io"; // Import Server from socket.io

const app = express();

// Define the CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // specify the frontend origin
  credentials: true, // allow credentials
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  express.json({
    limit: "16mb",
  })
);

app.use(express.static("public"));

app.use(
  express.urlencoded({
    limit: "16mb",
    extended: true,
  })
);

// ROUTES IMPORT
import userRouter from "./routes/user.routes.js";
import formRouter from "./routes/form.routes.js";
import propertyRouter from "./routes/property.routes.js";
import feedRouter from "./routes/feed.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import shortlistRouter from "./routes/shortlist.routes.js";
import messageRouter from "./routes/message.routes.js";
import saleNotationRouter from "./routes/saleNotation.routes.js";

// ROUTES DECLERATION
app.use("/api/v1/user", userRouter);
app.use("/api/v1/form", formRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/feed", feedRouter); //http://localhost:3001/api/v1/feed
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/shortlist", shortlistRouter);
app.use("/api/v1/chat", messageRouter);
app.use("/api/v1/saleNotation", saleNotationRouter);

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getSocketReceiverId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    socket.join(userId); // Join a room with the user's ID
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Send Chat Message
  socket.on("sendMessage", (message) => {
    try {
      const receiverSocket = userSocketMap[message.receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      }
      // Also send to the sender for consistency
      socket.emit("receiveMessage", message);
    } catch (error) {
      console.error("Error in sendMessage event:", error);
    }
  });

  // Send Sale Notation Message
  socket.on("sendSaleNotationMessage", (message) => {
    try {
      // Loop through each participant's receiverId in the message (assuming it's an array)
      message.participants.forEach((receiverId) => {
        const saleNotationReceiverSocket = getSocketReceiverId(receiverId);
        if (saleNotationReceiverSocket) {
          // Emit the message to the specific receiver's socket
          io.to(saleNotationReceiverSocket).emit(
            "receiveSaleNotationMessage",
            message
          );
        }
      });

      // Also send the message to the sender for consistency
      socket.emit("receiveSaleNotationMessage", message);
    } catch (error) {
      console.error("Error in sendSaleNotationMessage event:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    const disconnectedUserId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );
    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server }; // Correctly export both app and server
