import { useGetOwnersBookingsQuery } from "../store/modules/apiSlice";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AvatarImg from "./ui/AvatarImg";

// eslint-disable-next-line react/prop-types
export function OwnerVenueBookingsTable({ user_id }) {
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
                  <Link to={`/venue/${booking.venue_id}`}>
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

// OwnerVenueBookingsTable.propTypes = {
//   user_id: PropTypes.string,
// };
