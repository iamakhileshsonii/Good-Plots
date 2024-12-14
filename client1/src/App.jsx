import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ExploreProperties from "./pages/ExploreProperties";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import PublishProperty from "./pages/PublishProperty";
import { useAuthContext } from "./context/authContext";
import Profile from "./pages/Profile";
import LikedProperties from "./pages/LikedProperties";
import ShortlistedProperties from "./pages/ShortlistedProperties";
import VerifiedProperties from "./pages/VerifiedProperties";
import PendingProperties from "./pages/PendingProperties";
import PropertyPage from "./pages/PropertyPage";
import PropertyKyc from "./pages/PropertyKyc";

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="liked-properties" element={<LikedProperties />} />
        <Route
          path="shortlisted-properties"
          element={<ShortlistedProperties />}
        />
        <Route path="verified-properties" element={<VerifiedProperties />} />
        <Route path="pending-properties" element={<PendingProperties />} />
        <Route path="publish-property" element={<PublishProperty />} />
        <Route path="property-kyc" element={<PropertyKyc />} />
      </Route>
      <Route path="/property/:propertyId" element={<PropertyPage />} />
      <Route path="/explore-properties" element={<ExploreProperties />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/publish-property" element={<PublishProperty />} />
    </Routes>
  );
}

export default App;
