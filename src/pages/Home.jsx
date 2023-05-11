import NavigationCard from "../components/ui/NavigationCard";
import { useContext, useEffect } from "react";
import ThemeContext from "../utils/ThemeContext";
import { MapPin } from "../assets/icons/Icons";
import { SearchBox } from "@mapbox/search-js-react";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_REACT_MAPBOX_API_KEY;

export default function Home() {
  const {
    isDarkTheme,
    setIsDarkTheme,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
    hasBgColour,
    setHasBgColour,
  } = useContext(ThemeContext);

  useEffect(() => {
    if (!isDarkTheme) {
      setIsDarkTheme(true);
    }
    if (hasBgColour) {
      setHasBgColour(false);
    }
    if (hasMaxWidthContainer) {
      setHasMaxWidthContainer(false);
    }
  }, [
    isDarkTheme,
    setIsDarkTheme,
    hasBgColour,
    setHasBgColour,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
  ]);

  function handleForm(event) {
    event.preventDefault();
    console.log(event.target[0].value);
  }

  return (
    <div className="">
      <section className="flex h-screen w-full items-center  bg-gradient-to-br from-[#151515] to-[#0b0b0b] p-6 text-white">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-10">
          <div className="flex w-full flex-col items-center gap-8 lg:items-start">
            <h1 className="text-center text-6xl font-black lg:text-left">
              Your{" "}
              <span className="h-fit translate-x-8 text-[#FF004D]">
                dream deastination,
              </span>
              <br />
              one click away
            </h1>
            <p className="mt-4 text-center text-lg font-medium md:text-left">
              Find the perfect place to stay for your holiday, from city
              apartments to secluded cabins.
            </p>
            <form
              onSubmit={handleForm}
              className="flex w-fit items-center justify-between rounded-full bg-white px-6 py-2 pr-3 text-gray-900 lg:gap-5"
            >
              <label className="flex w-fit items-center ">
                <MapPin fill="#444" />
                <SearchBox
                  accessToken={MAPBOX_ACCESS_TOKEN}
                  onRetrieve={(res) => {
                    console.log(res);
                  }}
                >
                  <input
                    className="w-full rounded-md bg-transparent p-3 text-gray-900 "
                    type="text"
                    name="address"
                    placeholder="add location here"
                    autoComplete="address-line2 country-name"
                  />
                </SearchBox>
              </label>
              <button className="rounded-full bg-[#FF004D] px-10 py-4 font-medium text-white hover:bg-[#ff004ccc] ">
                search
              </button>
            </form>
            <button className="w-fit font-medium underline">
              Explore all destinations
            </button>
          </div>
          <div className="group relative hidden h-[500px] w-[600px] items-center justify-center overflow-hidden rounded-[150px] lg:flex">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              alt="hero"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="h-fit w-fit -translate-y-32 rounded-lg bg-gray-900 p-3 opacity-0 shadow-lg duration-150 group-hover:-translate-y-36 group-hover:opacity-100">
              You can live here
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="mx-auto grid h-[600px] w-full max-w-7xl grid-cols-3 grid-rows-2 gap-4">
          {/* <div className="">
            <div
              className="relative z-20 text-white
            "
            >
              In Norway
            </div>
            <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-b from-transparent to-black " />
            <img
              src="https://images.unsplash.com/photo-1602836948295-14b195efa63d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
              className="absolute left-0 top-0 h-full w-full object-cover "
            />
          </div> */}
          <NavigationCard
            className="group relative col-span-1 row-span-2 flex items-end overflow-hidden rounded-lg p-6 text-2xl font-bold"
            text="in Norway"
            imgLink="https://images.unsplash.com/photo-1602836948295-14b195efa63d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
          />
          {/* <div className="col-span-1 row-span-1 rounded-lg bg-red-300"></div> */}
          <NavigationCard
            className="group relative col-span-1 row-span-1 flex items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold"
            text="Live in a caravan"
            imgLink="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
          />

          <NavigationCard
            className="group relative col-span-1 col-start-2 row-span-1 flex items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold"
            text="Chill in a cabin"
            imgLink="https://images.unsplash.com/photo-1604609165678-096d20fab1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          />
          <NavigationCard
            className="group relative col-span-1 col-start-3 row-span-2 row-start-1 flex items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold"
            text="Lighthouse"
            imgLink="https://images.unsplash.com/photo-1540056145750-91179d279b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80"
          />
        </div>
      </section>
    </div>
  );
}
