import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllVenuesSupabase from "../pages/AllVenuesSupabase";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";
import SearchMap from "../pages/SearchMap";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

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
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="/dashboard/profile" element={<DashboardIndex />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
