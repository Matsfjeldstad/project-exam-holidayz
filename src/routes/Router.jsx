import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpesificVenue from "../pages/SpesificVenue";
import AllVenues from "../pages/AllVenues";
import AllVenuesSupabase from "../pages/AllVenuesSupabase";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<AllVenues />} />
        <Route path="/venues/supabase" element={<AllVenuesSupabase />} />
        <Route path="/venue/supabase/:id" element={<SpesificVenueSupabase />} />
        <Route path="/venue/:id" element={<SpesificVenue />} />
      </Routes>
    </>
  );
}
