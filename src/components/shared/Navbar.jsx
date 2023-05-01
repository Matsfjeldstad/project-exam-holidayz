export default function Navbar() {
  const logedIn = false;

  const hoverLinkClass =
    "after:duration-150 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-gray-900 after:opacity-0  hover:after:opacity-100 hover:after:w-full";

  return (
    <div className="flex w-full justify-between font-poppins">
      <div className="flex text-xl font-bold text-[#FF004D]">Holidaze</div>
      <nav className="flex gap-4">
        {/* todo: change to reactrouter links later  */}
        <a className={`relative ${hoverLinkClass}`}>Venues</a>
        <a className={`relative ${hoverLinkClass}`}>Location</a>
        {logedIn && <a className={`relative ${hoverLinkClass}`}>Admin</a>}
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
