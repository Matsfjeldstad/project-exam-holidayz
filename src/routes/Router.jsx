import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AllVenuesSupabase from "../pages/AllVenuesSupabase";
import SpesificVenueSupabase from "../pages/SpesificVenueSupabase";
import SearchMap from "../pages/SearchMap";
import Login from "../pages/Login";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues/supabase" element={<AllVenuesSupabase />} />
        <Route path="/search" element={<SearchMap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/venue/supabase/:id" element={<SpesificVenueSupabase />} />
      </Routes>
    </>
  );
}
