import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../utils/ThemeContext";

export default function Navbar() {
  const logedIn = false;

  const { isDarkTheme } = useContext(ThemeContext);
  const navLinkClass = isDarkTheme ? "text-white" : "text-black";
  const hoverNavLinkClass = isDarkTheme ? "after:bg-white" : "after:bg-black";

  console.log(isDarkTheme);

  const hoverLinkClass = `after:duration-150 ${hoverNavLinkClass} after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:opacity-0  hover:after:opacity-100 hover:after:w-full`;

  return (
    <div className="mx-auto flex w-full max-w-[1500px] justify-between p-6 font-poppins">
      <Link to={"/"} className="flex text-xl font-bold text-[#FF004D]">
        Holidaze
      </Link>
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
    </div>
  );
}
