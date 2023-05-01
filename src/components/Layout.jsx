import React from "react";
import Navbar from "./shared/navbar";
import Router from "../routes/Router";

export default function Layout() {
  return (
    <>
      <header className="flex h-20 items-center border-b px-12 py-4">
        <Navbar></Navbar>
      </header>
      <main>
        <Router />
      </main>
      <footer>hello</footer>
    </>
  );
}
