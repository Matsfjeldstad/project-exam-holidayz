import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SpesificVenue from "../pages/SpesificVenue";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venue/:id" element={<SpesificVenue />} />
      </Routes>
    </>
  );
}
