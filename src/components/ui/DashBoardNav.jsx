import { NavLink, Link } from "react-router-dom";
import {
  House,
  ChartBar,
  Profile,
  SettingsGear,
  Plus,
  Calendar,
} from "../../assets/icons/Icons";

export default function DashBoardNav() {
  return (
    <div className="sticky top-0 hidden h-fit flex-col gap-2 p-4 pr-10 md:w-1/3 md:border-r-2 lg:flex lg:w-1/4">
      <Link
        to={"/"}
        className="mb-12 flex p-4 text-2xl font-bold text-[#FF004D]"
      >
        Holidaze
      </Link>
      <NavLink
        to="/dashboard/"
        className={({ isActive }) =>
          `group flex items-center gap-1 rounded-full ${
            isActive && "bg-gray-100"
          } p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100`
        }
      >
        <Profile className="h-8 w-8 fill-gray-700 duration-200  group-hover:scale-110" />
        <div>Main Dashboard</div>
      </NavLink>
      <NavLink
        to="/dashboard/users-venues"
        className={({ isActive }) =>
          `group flex items-center gap-1 rounded-full ${
            isActive && "bg-gray-100"
          } p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100`
        }
      >
        <House className="h-7 w-7 fill-gray-700 duration-200 group-hover:scale-110" />
        <div>Your Venues</div>
      </NavLink>
      <NavLink
        to="/dashboard/all-bookings"
        className={({ isActive }) =>
          `group flex items-center gap-1 rounded-full ${
            isActive && "bg-gray-100"
          } p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100`
        }
      >
        <Calendar className="h-7 w-7 fill-gray-700 duration-200 group-hover:scale-110" />
        <div>All Bookings</div>
      </NavLink>
      <NavLink
        to="/dashboard/analytics"
        className={({ isActive }) =>
          `group flex items-center gap-1 rounded-full ${
            isActive && "bg-gray-100"
          } p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100`
        }
      >
        <ChartBar className="h-8 w-8 fill-gray-700 duration-200  group-hover:scale-110" />
        <div>Analytics</div>
      </NavLink>
      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          `group flex items-center gap-1 rounded-full ${
            isActive && "bg-gray-100"
          } p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100`
        }
      >
        <SettingsGear className="h-8 w-8 fill-gray-700 duration-200 group-hover:rotate-45 group-hover:scale-110" />
        <div>Settings</div>
      </NavLink>
      <NavLink
        to="/dashboard/add-venue"
        className={
          "group relative flex items-center justify-center gap-1.5 rounded-full bg-gray-900 p-4 text-gray-100 duration-150 hover:bg-gray-800"
        }
      >
        <Plus className="absolute left-4 h-8 w-8 rounded-full bg-transparent fill-gray-100 duration-200 group-hover:scale-110 group-hover:bg-[#FF004D] group-hover:fill-white" />
        <div>List A Vanue</div>
      </NavLink>
    </div>
  );
}
