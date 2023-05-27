import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllVenues from "../pages/AllVenues";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";
import SearchMap from "../pages/SearchMap";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PublishVenuePage from "../pages/dashboard/PublishVenuePage.jsx";
import UserVenues from "../pages/dashboard/UserVenues";
import EditVenue from "../pages/dashboard/EditVenue";
import ProfileSettings from "../pages/dashboard/ProfileSettings";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import AllVenuesBooking from "../pages/dashboard/AllVenuesBookings";
import VenueByCategory from "../pages/VenueByCategory";

export default function Router() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/venues/all" element={<AllVenues />} />
        <Route path="/venues/:category" element={<VenueByCategory />} />
        <Route path="/search" element={<SearchMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/venue/:id" element={<SpesificVenueSupabase />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="/dashboard/add-venue" element={<PublishVenuePage />} />
            <Route path="/dashboard/users-venues" element={<UserVenues />} />
            <Route
              path="/dashboard/all-bookings"
              element={<AllVenuesBooking />}
            />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/edit-venue/:id" element={<EditVenue />} />
            <Route path="/dashboard/settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
