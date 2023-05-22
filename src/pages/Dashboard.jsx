import PropTypes from "prop-types";
import SimpleLineChart from "../components/ui/SimpleLineChart";
import AvatarImg from "../components/ui/AvatarImg";
import { useAuth } from "../utils/Auth";
import {
  useGetOwnersBookingsQuery,
  useGetTodaysChekinChekoutQuery,
  useGetUserQuery,
  useGetUserVenuesQuery,
} from "../store/modules/apiSlice";
import Button from "../components/ui/Button";
import VenueCard from "../components/VenueCard";
import { HandWaving, Key } from "../assets/icons/Icons";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";

export function OwnerVenueData({ user_id }) {
  const { data, error, isLoading } = useGetUserVenuesQuery(user_id);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {data.map((venue) => (
        <VenueCard key={venue.id} data={venue} />
      ))}
    </div>
  );
}

export function OwnerVenueBookings({ user_id }) {
  const { data, error, isLoading } = useGetOwnersBookingsQuery(user_id);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    // table
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="font-poppins text-sm font-semibold text-[#4B5563]"></th>
            <th className="font-poppins text-sm font-semibold text-[#4B5563]">
              Venue
            </th>
            <th className="font-poppins text-sm font-semibold text-[#4B5563]">
              Date
            </th>
            <th className="font-poppins text-sm font-semibold text-[#4B5563]">
              Check in
            </th>
            <th className="font-poppins text-sm font-semibold text-[#4B5563]">
              Check out
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking) => {
            const created_at = format(
              new Date(booking.created_at),
              "dd.MM.yyyy HH:mm"
            );
            const checkInDate = format(
              new Date(booking.booking_start_date),
              "dd.MM.yyyy"
            );
            const checkOutDate = format(
              new Date(booking.booking_end_date),
              "dd.MM.yyyy "
            );
            return (
              <tr key={booking.id} className="border-b border-[#E2E8F0]">
                <td className="py-4">
                  <AvatarImg size={"small"} name={"hello"} />
                </td>
                <td className="py-4">
                  <Link to={`/venue/supabase/${booking.venue_id}`}>
                    {booking.venue_id}
                  </Link>
                </td>
                <td className="py-4">{created_at}</td>
                <td className="py-4">{checkInDate}</td>
                <td className="py-4">{checkOutDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TodaysChekinsAndChekOut({ userId, checkIns, checkOuts }) {
  const { data, isError, error, isLoading } =
    useGetTodaysChekinChekoutQuery(userId);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (checkIns) {
    const NumberOfCheckIns = data.reduce((acc, curr) => {
      if (curr.check_in) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return <div>{NumberOfCheckIns.length}</div>;
  }
  if (checkOuts) {
    const NumberOfCheckOuts = data.reduce((acc, curr) => {
      if (curr.check_out) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return <div className="text-black">{NumberOfCheckOuts.length}</div>;
  }
  return data;
}

export default function Dashboard() {
  const sevenDayData = [
    { date: "25.05.2023", income: 23000 },
    { date: "26.05.2023", income: 14000 },
    { date: "27.05.2023", income: 2500 },
    { date: "28.05.2023", income: 6000 },
    { date: "29.05.2023", income: 17000 },
    { date: "30.05.2023", income: 2000 },
    { date: "31.05.2023", income: 14000 },
  ];
  // const [chartData, setChartData] = useState(sevenDayData);

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
    <div className="flex flex-col px-6 pt-20 font-poppins md:flex-row">
      <div className="flex flex-col gap-2 p-4 pr-10 md:w-1/3 md:border-r-2 lg:w-1/4">
        <AvatarImg src={userData.profile_img} name={userData.name} />
        <h1 className="text-2xl font-semibold">Good Day, {userData.name} </h1>
        <div className="text-sm text-gray-500">
          {userData.is_host
            ? "You have earned 4000kr today"
            : "You have spent 4000kr today"}
        </div>
        <NavLink
          to="/profile"
          className={"rounded-full bg-gray-900 p-4 px-5 text-gray-50"}
        >
          <div>Your Venues</div>
        </NavLink>
        <NavLink
          to="/profile"
          className={
            "duration-250 rounded-full p-4 px-5 hover:bg-gray-900 hover:text-gray-50"
          }
        >
          <div>Statistics</div>
        </NavLink>
        <NavLink
          to="/profile"
          className={"rounded-full bg-gray-900 p-4 px-5 text-gray-50"}
        >
          <div>View Profile</div>
        </NavLink>
        <NavLink
          to="/profile"
          className={"rounded-full bg-gray-900 p-4 px-5 text-gray-50"}
        >
          Create Venue
        </NavLink>
      </div>

      <div className="flex flex-col gap-10 bg-gray-100 p-4 md:w-2/3 md:px-10 lg:w-3/4">
        {userData.is_host && (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Whats Happening Today?</h2>
              <div className="flex gap-2">
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8 },
                      }}
                    >
                      <Key className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">
                      <TodaysChekinsAndChekOut
                        userId={userData.id}
                        checkIns={true}
                      />
                    </div>
                  </div>
                  <div className="text-sm">check inns</div>
                </div>
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8 },
                      }}
                    >
                      <Key className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">
                      <TodaysChekinsAndChekOut
                        userId={userData.id}
                        checkOuts={true}
                      />
                    </div>
                  </div>
                  <div className="text-sm">Total Bookings</div>
                </div>
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8 },
                      }}
                    >
                      <HandWaving className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">
                      <TodaysChekinsAndChekOut
                        userId={userData.id}
                        checkOuts={true}
                      />
                    </div>
                  </div>
                  <div className="text-sm">check outs</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className=" text-xl font-semibold">Preformance</h3>
              <div>
                Your venue has earned{" "}
                <span className="font-semibold">
                  {" "}
                  {sevenDayData.reduce((a, b) => a + b.income, 0)}
                </span>
                kr in the last 7 days
              </div>
              <div className="flex gap-2">
                <div className="flex h-[500px] w-full flex-col gap-2 rounded-md border bg-white p-4 shadow-lg">
                  {sevenDayData ? (
                    <SimpleLineChart data={sevenDayData} />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div>You currently have no chart Data</div>
                      <Button className="w-fit" rounded={true}>
                        List a Venue
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold">Newest Bookings</h3>
              <OwnerVenueBookings user_id={userData.id} />
            </div>
          </>
        )}
        {!userData.is_host && (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Whats Hpening Today?</h2>
              <div className="flex gap-2">
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8, repeat: 1 },
                      }}
                    >
                      <Key className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">0</div>
                  </div>
                  <div className="text-sm">check inns</div>
                  <TodaysChekinsAndChekOut userId={userData.id} />
                </div>
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8, repeat: 1 },
                      }}
                    >
                      <Key className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">0</div>
                  </div>
                  <div className="text-sm">Total Bookings</div>
                </div>
                <div className="flex w-full flex-col gap-2.5 rounded-md border bg-white p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        rotate: [0, 20, -20, 20, -20, 0],
                        transition: { duration: 0.8, repeat: 1 },
                      }}
                    >
                      <HandWaving className="fill-gray-800" />
                    </motion.div>
                    <div className="text-xl font-semibold">0</div>
                  </div>
                  <div className="text-sm">check outs</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className=" text-xl font-semibold">Preformance</h3>
              <div>
                Your venue has earned{" "}
                <span className="font-semibold">
                  {" "}
                  {sevenDayData.reduce((a, b) => a + b.income, 0)}
                </span>
                kr in the last 7 days
              </div>
              <div className="flex gap-2">
                <div className="flex h-[300px] w-full flex-col gap-2 rounded-md border bg-white p-4 shadow-lg">
                  {sevenDayData ? (
                    <SimpleLineChart />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div>You currently have no chart Data</div>
                      <Button className="w-fit" rounded={true}>
                        List a Venue
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold">Your Top venues</h3>
              {userData.venues.length > 0 ? (
                <OwnerVenueData user_id={auth.user.id} />
              ) : (
                <div className="flex flex-col gap-3">
                  <div>You currently have no venues</div>
                  <Button className="w-fit" rounded={true}>
                    List a Venue
                  </Button>
                </div>
              )}
            </div>
            <div>
              <OwnerVenueBookings user_id={auth.user.id}></OwnerVenueBookings>
            </div>
          </>
        )}
        {console.log(userData.venues.length)}
      </div>
    </div>
  );
}

//proptypes for the functions above

OwnerVenueData.propTypes = {
  user_id: PropTypes.string,
};

OwnerVenueBookings.propTypes = {
  user_id: PropTypes.string,
};

TodaysChekinsAndChekOut.propTypes = {
  userId: PropTypes.string,
  checkIns: PropTypes.bool,
  checkOuts: PropTypes.bool,
};
