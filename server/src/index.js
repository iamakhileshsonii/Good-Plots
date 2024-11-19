import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app, server } from "./app.js"; // Correctly import server

dotenv.config({
  path: "./.env",
});

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    // Use server to listen
    console.log(`SERVER RUNNING ON: ${process.env.PORT}`);
  });
});
