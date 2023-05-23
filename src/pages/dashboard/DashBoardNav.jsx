import { NavLink } from "react-router-dom";
import AvatarImg from "../../components/ui/AvatarImg";
import { useGetUserQuery } from "../../store/modules/apiSlice";
import { useAuth } from "../../utils/Auth";
import House, {
  ChartBar,
  Profile,
  SettingsGear,
} from "../../assets/icons/Icons";

export default function DashBoardNav() {
  const auth = useAuth();

  const {
    data: userData,
    isError,
    error,
    isLoading,
  } = useGetUserQuery(auth.user.id);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>{error.message}</div>;
  return (
    <div className="flex flex-col gap-2 p-4 pr-10 md:w-1/3 md:border-r-2 lg:w-1/4">
      <AvatarImg src={userData.profile_img} name={userData.name} />
      <h1 className="text-2xl font-semibold">Good Day, {userData.name} </h1>
      <div className="text-sm text-gray-500">
        {userData.is_host
          ? "You have earned 4000kr today"
          : "You have spent 4000kr today"}
      </div>
      <NavLink
        to="/"
        className={
          "group flex items-center gap-1 rounded-full p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100"
        }
      >
        <House className="h-7 w-7 fill-gray-700 duration-200 group-hover:scale-110" />
        <div>Your Venues</div>
      </NavLink>

      <NavLink
        to="/profile"
        className={
          "group flex items-center gap-1 rounded-full p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100"
        }
      >
        <Profile className="h-8 w-8 fill-gray-700 duration-200  group-hover:scale-110" />
        <div>View Profile</div>
      </NavLink>
      <NavLink
        to="/profile"
        className={
          "group flex items-center gap-1 rounded-full p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100"
        }
      >
        <ChartBar className="h-8 w-8 fill-gray-700 duration-200  group-hover:scale-110" />
        <div>Analytics</div>
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={
          "group flex items-center gap-1 rounded-full p-4 px-5 text-gray-900 duration-150 hover:bg-gray-100"
        }
      >
        <SettingsGear className="h-8 w-8 fill-gray-700 duration-200 group-hover:rotate-45 group-hover:scale-110" />
        <div>Settings</div>
      </NavLink>
    </div>
  );
}
