import PropTypes from "prop-types";
import {
  useGetOwnersBookingsQuery,
  useGetTodaysChekinChekoutQuery,
  useGetUserQuery,
  useGetUserVenuesQuery,
} from "../../store/modules/apiSlice";
import Button from "../../components/ui/Button";
import AvatarImg from "../../components/ui/AvatarImg";
import VenueCard from "../../components/VenueCard";
import { HandWaving, Key } from "../../assets/icons/Icons";
import { motion } from "framer-motion";
import { useAuth } from "../../utils/Auth";
import SimpleLineChart from "../../components/ui/SimpleLineChart";
import { OwnerVenueBookingsTable } from "../../components/OwnerVenueBookingsTable";
import { sevenDayData } from "../../data/sevenDayData";
import { BookingsTable } from "./AllVenuesBookings";

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

export default function DashboardIndex() {
  // const [chartData, setChartData] = useState(sevenDayData);

  const auth = useAuth();

  const {
    data: userData,
    isError,
    error,
    isLoading,
  } = useGetUserQuery(auth.user.id);

  const { data: bookings } = useGetOwnersBookingsQuery(auth.user.id);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <div className="flex w-full flex-col gap-10 bg-gray-100 p-4 pt-6 md:px-10">
      {userData.is_host && (
        <>
          <div className="flex flex-col gap-3">
            <div className="mb-10">
              <AvatarImg src={userData.profile_img} name={userData.name} />
              <h1 className="text-2xl font-semibold">
                Good Day, {userData.name}{" "}
              </h1>
              <div className="text-sm text-gray-500">
                {userData.is_host
                  ? "You have earned 4000kr today"
                  : "You have spent 4000kr today"}
              </div>
            </div>
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
            <BookingsTable bookings={bookings} />
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
            <OwnerVenueBookingsTable
              user_id={auth.user.id}
            ></OwnerVenueBookingsTable>
          </div>
        </>
      )}
      {console.log(userData.venues.length)}
    </div>
  );
}

//proptypes for the functions above

OwnerVenueData.propTypes = {
  user_id: PropTypes.string,
};

TodaysChekinsAndChekOut.propTypes = {
  userId: PropTypes.string,
  checkIns: PropTypes.bool,
  checkOuts: PropTypes.bool,
};
