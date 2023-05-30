import { useContext, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import ThemeContext from "../utils/ThemeContext";

export default function Login() {
  const { isDarkTheme, setIsDarkTheme, hasBgColour, setHasBgColour } =
    useContext(ThemeContext);

  useEffect(() => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
    }
    if (hasBgColour) {
      setHasBgColour(true);
    }
  }, [isDarkTheme, setIsDarkTheme, hasBgColour, setHasBgColour]);
  return (
    <div className="mx-auto max-w-[1500px] pt-20">
      <LoginModal />
    </div>
  );
}
