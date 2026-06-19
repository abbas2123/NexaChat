import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard";
import LandingPage from "../components/LandingPage"
import ProtectedRoute from "./protectRoute";
import Profile from "../components/profile";
import ProtectedLayout from "../components/Layout";
import Contacts from "../components/contact";
import Calls from "../components/call";
import Status from "../components/status";
import Settings from "../components/settings";
import NewChat from "../components/newChat";
function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/chat" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element ={<Contacts/>}/>
        <Route path="/calls" element ={<Calls/>}/>
        <Route path="/status" element ={<Status/>}/>
        <Route path="/settings" element ={<Settings/>}/>
        <Route path="/new-chat" element ={<NewChat/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
