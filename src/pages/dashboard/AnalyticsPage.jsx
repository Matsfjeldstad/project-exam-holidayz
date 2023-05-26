import { useEffect, useState } from "react";
import SimpleLineChart from "../../components/ui/SimpleLineChart";
import {
  useGetIncomeDailyMonthQuery,
  useGetIncomeDailyWeekQuery,
  useGetIncomeMonthYearQuery,
  useGetOwnersBookingsQuery,
  useGetUserQuery,
} from "../../store/modules/apiSlice";
import { useAuth } from "../../utils/Auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 2,
    },
  },
};

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState();
  const auth = useAuth();
  const {
    data: week_daily_income,
    isLoading: sevenDayDataIsLoading,
    error: sevenDayDataError,
  } = useGetIncomeDailyWeekQuery(auth.user.id);

  const { data: month_daily_income } = useGetIncomeDailyMonthQuery(
    auth.user.id
  );

  const { data: year_month_income } = useGetIncomeMonthYearQuery(auth.user.id);
  const { data: user, isLoading } = useGetUserQuery(auth.user.id);

  const { data: bookingsData } = useGetOwnersBookingsQuery(auth.user.id);

  useEffect(() => {
    !sevenDayDataIsLoading &&
      week_daily_income &&
      setChartData(week_daily_income);
  }, [sevenDayDataIsLoading, week_daily_income]);

  if (isLoading && sevenDayDataIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-10">
      <h1 className="text-3xl font-bold">
        Lets check Your stats, {user?.name}
      </h1>
      <motion.div
        variants={container}
        initial="hidden"
        className="mt-8 flex gap-3"
      >
        {!sevenDayDataIsLoading ? (
          <motion.div
            variants={container}
            animate="show"
            className="flex h-[200px] w-[300px] flex-col justify-center gap-1 rounded-xl bg-slate-900 p-4 text-white"
          >
            <div className="text-gray-300">Income</div>
            <div className="text-4xl font-bold">
              {chartData?.reduce((a, b) => a + b.income, 0).toFixed(0)}
              <span className="text-base">Nok</span>
            </div>
            <div className="text-gray-300">the last 7 days</div>
          </motion.div>
        ) : (
          <div className="flex h-[200px] w-[300px] rounded-xl bg-gray-200"></div>
        )}
        <motion.div>
          <Link
            to="/dashboard/users-venues"
            className="flex h-[200px] w-[300px] flex-col justify-center gap-1 rounded-xl bg-orange-700 p-4 text-white shadow-md duration-200 hover:scale-105 hover:bg-orange-600"
          >
            <div className="flex items-center text-6xl font-bold">
              {user?.venues.length}
            </div>
            <div className="text-gray-300">Number of venues</div>
          </Link>
        </motion.div>
        <motion.div>
          <Link
            to="/dashboard/all-bookings"
            className="flex h-[200px] w-[300px] flex-col justify-center gap-1 rounded-xl bg-slate-900 p-4 text-white"
          >
            <div className="text-gray-300">Total Bookings</div>
            <div className="text-4xl font-bold">{bookingsData?.length}</div>
            <div className="text-gray-300">On your venue</div>
          </Link>
        </motion.div>
      </motion.div>

      <div className="mt-10 h-[400px] ">
        <select
          className="mb-3 w-1/4 border-2"
          onChange={(e) => {
            setChartData(JSON.parse(e.target.value));
            console.log(e.target.children[0].innerText);
          }}
        >
          <option value={JSON.stringify(week_daily_income)}>Last 7 days</option>
          <option value={JSON.stringify(month_daily_income)}>
            Last 30 days
          </option>
          <option value={JSON.stringify(year_month_income)}>
            Last 365 days
          </option>
        </select>
        {sevenDayDataIsLoading ? (
          <div>Loading...</div>
        ) : (
          sevenDayDataError && <div>Error</div>
        )}
        {chartData && chartData.reduce((a, b) => a + b.income, 0) !== 0 ? (
          <SimpleLineChart data={chartData} />
        ) : (
          <div>No data to Display</div>
        )}
      </div>
    </div>
  );
}
