import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
