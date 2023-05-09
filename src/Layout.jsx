import { useState } from "react";
import Router from "./routes/Router";
import Navbar from "./components/shared/Navbar";
import ThemeContext from "./utils/ThemeContext";

export default function Layout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <>
      <ThemeContext.Provider
        value={{ isDarkTheme, toggleTheme, setIsDarkTheme }}
      >
        <header className="absolute top-0 h-20 w-full">
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
