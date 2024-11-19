// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { SocketContextProvider } from "./context/SocketContext";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
