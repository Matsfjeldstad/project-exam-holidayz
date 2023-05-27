import NavigationCard from "../components/ui/NavigationCard";
import { useContext, useEffect } from "react";
import ThemeContext from "../utils/ThemeContext";
import { motion } from "framer-motion";
import { useAuth } from "../utils/Auth";
import { useGetVenuesQuery } from "../store/modules/apiSlice";
import VenueCard from "../components/VenueCard";

const boxVariant = {
  hidden: {
    y: 60,
    opacity: 0, //move out of the site
  },
  visible: {
    y: 0,
    opacity: 1, // bring it back to nrmal
    transition: {
      delay: 0.1,
      when: "beforeChildren", //use this instead of delay
      staggerChildren: 0.06, //apply stagger on the parent tag
    },
  },
};

const listVariant = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const auth = useAuth();

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

  const { data: venueData, isLoading } = useGetVenuesQuery(4);

  return (
    <div className="">
      <section className="flex h-screen w-full items-center  bg-gradient-to-br from-[#262626] to-[#0b0b0b] p-6 text-white">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-10">
          <motion.div
            variants={boxVariant}
            animate="visible"
            initial="hidden"
            className="flex w-full flex-col items-center gap-8 p-2 lg:items-start"
          >
            <motion.h1
              variants={listVariant}
              className="text-center text-5xl font-black md:text-6xl lg:text-left"
            >
              Your{" "}
              <span className="h-fit translate-x-8 text-[#FF004D]">
                dream deastination,
              </span>
              <br />
              one click away
            </motion.h1>
            <motion.p
              variants={listVariant}
              className="mt-1 flex text-center text-lg font-medium lg:text-left"
            >
              Find the perfect place to stay for your holiday, from city
              apartments to secluded cabins.
            </motion.p>
            <motion.div
              variants={listVariant}
              onSubmit={handleForm}
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <button className="w-full rounded-full bg-[#FF004D] px-10 py-4 font-medium text-white duration-150 hover:scale-105 hover:bg-[#ff004ccc] sm:w-fit ">
                Search Locations
              </button>
              {auth.user ? (
                <button className="w-full rounded-full bg-gray-100 px-10 py-4 font-medium text-gray-950 duration-150 hover:scale-105 hover:bg-gray-200 sm:w-fit ">
                  Go to dashboard
                </button>
              ) : (
                <button className="w-full rounded-full bg-gray-100 px-10 py-4 font-medium text-gray-950 duration-150 hover:scale-105 hover:bg-gray-200 sm:w-fit ">
                  Login
                </button>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            variants={boxVariant}
            animate="visible"
            initial="hidden"
            className="group relative hidden h-[500px] w-[600px] items-center justify-center overflow-hidden rounded-[150px] lg:flex"
          >
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              alt="hero"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
            <div className="h-fit w-fit -translate-y-32 rounded-lg bg-gray-900 p-3 opacity-0 shadow-lg duration-150 group-hover:-translate-y-36 group-hover:opacity-100">
              You can live here
            </div>
          </motion.div>
        </div>
      </section>
      <section className="mt-20">
        <div className="mx-auto w-full max-w-[1500px] p-4">
          <h3 className="text-2xl font-bold"> Find any type of venue </h3>
          <p>All kinds of specaular shit </p>
          <div className="mx-auto mt-6  grid h-[1500px] w-full grid-rows-4 gap-4 sm:h-[900px] sm:grid-cols-2 sm:grid-rows-3 md:h-[700px] lg:grid-cols-3 lg:grid-rows-2">
            <NavigationCard
              className="group relative col-span-2 row-span-1 flex cursor-pointer items-end overflow-hidden rounded-lg p-6 text-2xl font-bold sm:col-span-1 lg:row-span-2"
              text="in Norway"
              to="venues/country/norway"
              imgLink="https://images.unsplash.com/photo-1602836948295-14b195efa63d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
            />
            {/* <div className="col-span-1 row-span-1 rounded-lg bg-red-300"></div> */}
            <NavigationCard
              className="group relative col-span-2 row-span-1 flex cursor-pointer items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold sm:col-span-1"
              text="Live in a caravan"
              to="/venues/caravan"
              imgLink="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
            />

            <NavigationCard
              className="group relative col-span-2 col-start-1 row-span-1 flex cursor-pointer items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold lg:col-span-1 lg:col-start-2"
              text="Chill in a cabin"
              to="/venues/cabin"
              imgLink="https://images.unsplash.com/photo-1604609165678-096d20fab1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            />
            <NavigationCard
              className="group relative col-span-2 col-start-1 row-span-1 row-start-1 flex cursor-pointer items-end overflow-hidden rounded-lg bg-blue-300 p-6 text-2xl font-bold"
              text="Lighthouse"
              to="/venues/lighthouse"
              imgLink="https://images.unsplash.com/photo-1540056145750-91179d279b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80"
            />
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="mx-auto w-full max-w-[1500px] p-4">
          <h3 className="text-2xl font-bold"> Check out one of these</h3>
          <p>Four of our newest bookings</p>
          <section className="mx-auto mt-6 flex max-w-[1500px] flex-col gap-6 p-4 sm:grid sm:grid-cols-2 md:p-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              <div>loading</div>
            ) : (
              venueData?.length > 0 &&
              venueData.map((venue) => {
                return <VenueCard key={venue.id} data={venue} />;
              })
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
