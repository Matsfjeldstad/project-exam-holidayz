import { useState } from "react";
import Router from "./routes/Router";
import Navbar from "./components/shared/Navbar";
import ThemeContext from "./utils/ThemeContext";

export default function Layout() {
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
        <header
          className={`fixed top-0 z-40 h-20 w-full ${
            hasBgColour && "bg-white"
          }`}
        >
          <Navbar></Navbar>
        </header>
        <main className="">
          <Router />
        </main>
        <footer>hello</footer>
      </ThemeContext.Provider>
    </>
  );
}
