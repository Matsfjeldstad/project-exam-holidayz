import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllVenues from "../pages/AllVenues";
import AllVenuesSupabase from "../pages/AllVenuesSupabase";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";
import SearchMap from "../pages/SearchMap";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<AllVenues />} />
        <Route path="/venues/supabase" element={<AllVenuesSupabase />} />
        <Route path="/search" element={<SearchMap />} />
        <Route path="/venue/supabase/:id" element={<SpesificVenueSupabase />} />
      </Routes>
    </>
  );
}
