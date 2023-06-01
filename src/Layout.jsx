import { useState } from "react";
import Router from "./routes/Router";
import Navbar from "./components/shared/Navbar";
import ThemeContext from "./utils/ThemeContext";
import { useLocation } from "react-router-dom";
import Footer from "./components/shared/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [hasMaxWidthContainer, setHasMaxWidthContainer] = useState(false);
  const [hasBgColour, setHasBgColour] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme,
          setIsDarkTheme,
          hasMaxWidthContainer,
          setHasMaxWidthContainer,
          hasBgColour,
          setHasBgColour,
        }}
      >
        {!pathname.includes("/dashboard") && (
          <header
            className={`fixed top-0 z-40 h-20 w-full ${
              hasBgColour && "bg-white"
            }`}
          >
            <Navbar></Navbar>
          </header>
        )}
        <main className=" min-h-screen font-poppins">
          <Router />
        </main>
        <Footer />
      </ThemeContext.Provider>
    </>
  );
}
