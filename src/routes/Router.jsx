import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import SpesificVenue from "../views/SpesificVenue";

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
