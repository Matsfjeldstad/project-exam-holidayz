import NavigationCard from "../components/ui/NavigationCard";

export default function Home() {
  return (
    <div className="">
      <section className="flex h-screen w-full items-center  bg-gradient-to-br from-[#151515] to-[#0b0b0b] p-6 text-white">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-10">
          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-black">
              Your <span className=" text-[#FF004D]">dream deastination,</span>
              <br /> one click away
            </h1>
            <p className="mt-4 text-lg font-medium">
              Find the perfect place to stay for your holiday, from city
              apartments to secluded cabins.
            </p>
            <form className="flex w-fit items-center justify-between gap-5 rounded-full bg-white py-2 pl-10 pr-3 text-gray-900 ">
              <label className="flex items-center border-r border-gray-300">
                <span className="font-medium">Location</span>
                <input
                  type="text"
                  placeholder="Add location here"
                  className="rounded-md bg-transparent p-3 text-gray-900 "
                />
              </label>
              <label className="flex items-center border-gray-300">
                <span className="font-medium">Guests</span>
                <input
                  type="text"
                  placeholder="Number of guests"
                  className="rounded-md bg-transparent p-3 text-gray-900 "
                />
              </label>
              <button className="rounded-full bg-[#FF004D] px-10 py-4 font-medium text-white hover:bg-[#ff004ccc] ">
                search
              </button>
            </form>
            <button className="font-medium">Explore all destinations</button>
          </div>
          <div className="group relative hidden h-[500px] w-[400px] items-center justify-center overflow-hidden rounded-[150px] lg:flex">
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
