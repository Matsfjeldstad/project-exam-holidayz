import { NavLink } from "react-router-dom";
import {
  Apartment,
  Boat,
  Cabin,
  Campervan,
  Castle,
  // Cabin,
  Cave,
  Dome,
  Farm,
  Hotel,
  House,
  LightHouse,
  Pyramid,
  Tent,
  TinyHome,
} from "../assets/icons/airbnb-icons-places/IconPlaces";

export default function VenueNavigation() {
  return (
    <nav className="flex h-fit w-fit justify-between gap-16">
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/cabin"}
      >
        <Cabin className={"h-8 flex-col justify-end fill-gray-700"} />
        cabin
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/house"}
      >
        <House className={"h-8 w-8 fill-gray-700"} />
        house
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/boat"}
      >
        <Boat className={"h-8 w-8 fill-gray-700"} />
        boat
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/villa"}
      >
        <House className={"h-8 w-8 fill-gray-700"} />
        villa
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/hotel"}
      >
        <Hotel className={"h-8 w-8 fill-gray-700 "} />
        hotel
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/apartment"}
      >
        <Apartment className={"h-8 w-8 fill-gray-700"} />
        apartment
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/castle"}
      >
        <Castle className={"h-8 fill-gray-700"} />
        castle
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/lighthouse"}
      >
        <LightHouse className={"h-8 w-8 fill-gray-700"} />
        lighthouse
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/caravan"}
      >
        <Campervan className={"h-8 w-8 fill-gray-700"} />
        caravan
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/tent"}
      >
        <Tent className={"h-8 fill-gray-700"} />
        tent
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/igloo"}
      >
        <Dome className={"h-8 fill-gray-700"} />
        igloo
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/pyramid"}
      >
        <Pyramid className={"h-8 stroke-gray-700"} />
        pyramid
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/dome"}
      >
        <Dome className={"h-8 fill-gray-700"} />
        dome
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/bungalow"}
      >
        <House className={"h-8 w-8 fill-gray-700"} />
        bungalow
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/cave"}
      >
        <Cave className={"h-8 fill-gray-700"} />
        cave
      </NavLink>
      <NavLink
        className={
          "flex w-fit flex-col items-center duration-150 hover:scale-105"
        }
        to={"/venues/tinyhome"}
      >
        <TinyHome className={"h-8 fill-gray-700"} />
        tiny-home
      </NavLink>
      <NavLink
        className={"flex flex-col items-center duration-150 hover:scale-105"}
        to={"/venues/farm"}
      >
        <Farm className={"h-8 w-8 fill-gray-700"} />
        farm
      </NavLink>
    </nav>
  );
}
