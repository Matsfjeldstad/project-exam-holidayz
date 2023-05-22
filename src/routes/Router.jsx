import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllVenuesSupabase from "../pages/AllVenuesSupabase";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";
import SearchMap from "../pages/SearchMap";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/venues/supabase" element={<AllVenuesSupabase />} />
        <Route path="/search" element={<SearchMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/venue/supabase/:id" element={<SpesificVenueSupabase />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
