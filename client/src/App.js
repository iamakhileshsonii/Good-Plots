import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Routes Import
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/logout/Logout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Mylistings from "./pages/dashboard/mylistings/Mylistings";
import InitialForm from "./pages/forms/InitialForm";
import Profile from "./pages/profile/Profile";

import ExploreListings from "./pages/dashboard/exploreListing/ExploreListings";
import SingleProperty from "./pages/template/single/SingleProperty";
import TestPage from "./pages/TestPage";
import Appointments from "./pages/appointments/Appointments";
import NotFound from "./pages/NotFound";
import Liked from "./pages/like/Liked";
import Shortlisted from "./pages/shortlisted/Shortlisted";
import Overview from "./pages/dashboard/mylistings/components/Overview";
import Messages from "./pages/messages/Messages";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import SaleNotation from "./pages/saleNotation/SaleNotation";
import KycForm from "./pages/forms/KycForm";
import Toaster from "./lib/Toaster";
import PrivateRoute from "./routes/PrivateRoute";
import Index from "./components/forms/kyc";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route
              path="mylistings"
              element={
                <PrivateRoute>
                  <Mylistings />
                </PrivateRoute>
              }
            />
            <Route
              path="initialform"
              element={
                <PrivateRoute>
                  <InitialForm />
                </PrivateRoute>
              }
            />
            <Route
              path="profile-setting"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="property-kyc/:params"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path="explore-listings"
              element={
                <PrivateRoute>
                  <ExploreListings />
                </PrivateRoute>
              }
            />
            <Route
              path="appointments"
              element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              }
            />
            <Route
              path="messages"
              element={
                <PrivateRoute>
                  <Messages />
                </PrivateRoute>
              }
            >
              <Route
                path="chat/:receiverId"
                element={
                  <PrivateRoute>
                    <Messages />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="liked"
              element={
                <PrivateRoute>
                  <Liked />
                </PrivateRoute>
              }
            />
            <Route
              path="shortlisted"
              element={
                <PrivateRoute>
                  <Shortlisted />
                </PrivateRoute>
              }
            />
            <Route
              path="manage-users"
              element={
                <PrivateRoute>
                  <ManageUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="sale-notations"
              element={
                <PrivateRoute>
                  <SaleNotation />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="property/:params" element={<SingleProperty />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/test" element={<TestPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
