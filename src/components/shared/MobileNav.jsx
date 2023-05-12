import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeContext from "../../utils/ThemeContext";
import { NavLink } from "react-router-dom";

function Hamburger({ navOpen, setNavOpen, className }) {
  const { isDarkTheme } = useContext(ThemeContext);
  const hamburgerLineClass = `h-1 w-7 ${
    isDarkTheme ? `${navOpen ? "bg-black" : "bg-white"}` : "bg-black"
  }`;
  return (
    <AnimatePresence>
      <motion.div
        onClick={() => {
          setNavOpen(!navOpen);
        }}
        className={
          className +
          " relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center"
        }
      >
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...(navOpen && { animate: { rotate: 45, position: "absolute" } })}
          className={hamburgerLineClass}
        ></motion.div>
        {!navOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={hamburgerLineClass + " mt-1"}
          ></motion.div>
        )}
        <motion.div
          {...(navOpen && { animate: { rotate: -45, margin: 0 } })}
          className={hamburgerLineClass + " mt-1"}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MobileNav() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Hamburger navOpen={navOpen} setNavOpen={setNavOpen} className="z-50" />
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute left-0 top-0 h-screen w-full bg-white"
        >
          <nav className="flex h-full flex-col items-center justify-center gap-4">
            <NavLink to={"/"} className="text-2xl font-bold text-[#FF004D]">
              Holidaze
            </NavLink>
            <NavLink
              to={"/venues/supabase"}
              className="text-xl font-bold text-black"
              onClick={() => setNavOpen(false)}
            >
              Venues
            </NavLink>
            <NavLink
              to={"/search"}
              className="text-xl font-bold text-black"
              onClick={() => setNavOpen(false)}
            >
              Location
            </NavLink>
            <NavLink className="text-xl font-bold text-black">Login</NavLink>
            <NavLink className="text-xl font-bold text-black">Signup</NavLink>
          </nav>
        </motion.div>
      )}
    </>
  );
}
