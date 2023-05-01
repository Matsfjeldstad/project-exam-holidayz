import Navbar from "./components/shared/Navbar";
import Home from "./views/Home";

function App() {
  return (
    <>
      <header className="flex h-20 items-center border-b px-12 py-4">
        <Navbar />
      </header>
      <Home />
    </>
  );
}

export default App;
