import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../utils/ThemeContext";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const logedIn = false;
  const { isDarkTheme, hasMaxWidthContainer } = useContext(ThemeContext);
  const navLinkClass = isDarkTheme ? "text-white" : "text-black";
  const hoverNavLinkClass = isDarkTheme ? "after:bg-white" : "after:bg-black";
  const maxWidthContainerClass = hasMaxWidthContainer ? "max-w-[1500px]" : "";

  console.log(isDarkTheme);

  const hoverLinkClass = `after:duration-150 ${hoverNavLinkClass} after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:opacity-0  hover:after:opacity-100 hover:after:w-full`;

  return (
    <div
      className={`mx-auto ${maxWidthContainerClass} flex h-20 w-full items-center justify-between p-6 font-poppins md:px-10`}
    >
      <Link to={"/"} className="flex text-xl font-bold text-[#FF004D]">
        Holidaze
      </Link>

      {isDesktopOrLaptop && (
        <nav className={`flex gap-4 ${navLinkClass}`}>
          {/* todo: change to reactrouter links later  */}
          <Link to="/venues/supabase" className={`relative ${hoverLinkClass}`}>
            Venues
          </Link>
          <a className={`relative ${hoverLinkClass}`}>Location</a>
          {logedIn && (
            <a
              className={`relative ${hoverLinkClass}${
                isDarkTheme ? "bg-white" : "bg-black"
              }`}
            >
              Admin
            </a>
          )}

          {!logedIn && (
            <>
              <a className={`relative ${hoverLinkClass}`}>Login</a>
              <a className={`relative ${hoverLinkClass}`}>Signup</a>
            </>
          )}
        </nav>
      )}
      {isTabletOrMobile && <MobileNav></MobileNav>}
    </div>
  );
}
