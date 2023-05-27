import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../utils/ThemeContext";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./MobileNav";
import { useAuth } from "../../utils/Auth";

export default function Navbar() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const { isDarkTheme } = useContext(ThemeContext);
  const navLinkClass = isDarkTheme ? "text-white" : "text-black";
  const hoverNavLinkClass = isDarkTheme ? "after:bg-white" : "after:bg-black";

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, [auth.user]);

  const hoverLinkClass = `after:duration-150 ${hoverNavLinkClass} after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:opacity-0  hover:after:opacity-100 hover:after:w-full`;

  return (
    <div
      className={`mx-auto flex h-20 w-full max-w-[1500px] items-center justify-between p-6 font-poppins md:px-10`}
    >
      <Link to={"/"} className="flex text-xl font-bold text-[#FF004D]">
        Holidaze
      </Link>

      {isDesktopOrLaptop && (
        <nav className={`flex gap-4 ${navLinkClass}`}>
          {/* todo: change to reactrouter links later  */}
          <Link to="/venues/all" className={`relative ${hoverLinkClass}`}>
            Venues
          </Link>
          <a className={`relative ${hoverLinkClass}`}>Location</a>
          {isLogedIn && (
            <>
              <Link to="/dashboard" className={`relative ${hoverLinkClass}`}>
                Dashboard
              </Link>
              <Link
                className={`relative ${hoverLinkClass}`}
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log out
              </Link>
            </>
          )}

          {!isLogedIn && (
            <>
              <Link to={"/login"} className={`relative ${hoverLinkClass}`}>
                Login
              </Link>
              <Link to={"/signup"} className={`relative ${hoverLinkClass}`}>
                Signup
              </Link>
            </>
          )}
        </nav>
      )}
      {isTabletOrMobile && (
        <MobileNav isLogedIn={isLogedIn} auth={auth}></MobileNav>
      )}
    </div>
  );
}
