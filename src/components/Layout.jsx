import Router from "../routes/Router";
import Navbar from "./shared/Navbar";

export default function Layout() {
  return (
    <>
      <header className="flex h-20 items-center border-b px-12 py-4 font-poppins">
        <Navbar></Navbar>
      </header>
      <main className="p-12">
        <Router />
      </main>
      <footer>hello</footer>
    </>
  );
}
