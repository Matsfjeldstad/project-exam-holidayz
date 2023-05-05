import Router from "../routes/Router";
import Navbar from "./shared/Navbar";

export default function Layout() {
  return (
    <>
      <header className="mx-auto w-full max-w-7xl">
        <Navbar></Navbar>
      </header>
      <main className="">
        <Router />
      </main>
      <footer>hello</footer>
    </>
  );
}
