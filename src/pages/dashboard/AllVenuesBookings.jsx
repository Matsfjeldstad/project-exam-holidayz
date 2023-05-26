import { useState } from "react";
import { differenceInDays, format } from "date-fns";
import {
  useDeleteBookingMutation,
  useGetOwnersBookingsQuery,
  useUpdateBookingStatusMutation,
} from "../../store/modules/apiSlice";
import { useAuth } from "../../utils/Auth";
import { Link } from "react-router-dom";
import { Trash } from "../../assets/icons/Icons";
import DeleteModal from "../../components/modals/DeleteModal";
import { AnimatePresence, motion } from "framer-motion";
import AvatarImg from "../../components/ui/AvatarImg";
import PropTypes from "prop-types";

export function StatusSelectInput({ booking }) {
  const [status, setStatus] = useState(booking.status);
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  return (
    <select
      value={status}
      onChange={(e) => {
        setStatus(e.target.value);
        updateBookingStatus({
          status: e.target.value,
          bookingId: booking.booking_id,
        });
      }}
      className={`flex w-fit items-center justify-center rounded-full p-1 px-2 font-medium capitalize ${
        status === "confirmed"
          ? "bg-green-300 text-green-800"
          : status === "canceled"
          ? "bg-red-300 text-red-900"
          : status === "pending"
          ? "bg-yellow-300 text-yellow-900"
          : "bg-gray-300 text-gray-900"
      }`}
    >
      <option
        className="bg-gray-200 font-medium text-gray-700"
        value={"pending"}
      >
        pending
      </option>
      <option
        className=" bg-green-300 font-medium text-green-900 "
        value={"confirmed"}
      >
        confirmed
      </option>
      <option
        className="bg-red-400 font-medium text-red-900"
        value={"canceled"}
      >
        canceled
      </option>
    </select>
  );
}

export function BookingsTable({
  bookings,
  setDeleteModalIsOpen,
  setmodalObject,
}) {
  if (bookings) {
    if (bookings.length === 0) {
      return (
        <div className="mt-10 text-gray-700">
          Your venues has no bookings yet..
        </div>
      );
    }

    if (bookings.length > 0)
      return (
        <table className="mt-10 w-full">
          <thead>
            <tr className="text-left">
              <th className="font-poppins text-sm font-semibold text-[#4B5563]"></th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Booked by
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Venue Booked
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                status
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Total Price
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Created
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                No. Of Nights
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Booked From
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Booked To
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {bookings.map((booking) => {
                const created_at = format(
                  new Date(booking.created_at),
                  "dd.MM.yyyy HH:mm"
                );
                const BookingStartDate = format(
                  new Date(booking.booking_start_date),
                  "dd.MM.yyyy"
                );
                const BookingEndDate = format(
                  new Date(booking.booking_end_date),
                  "dd.MM.yyyy"
                );

                return (
                  <motion.tr
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    key={booking.booking_id}
                    className="border-b border-[#E2E8F0]"
                  >
                    <td className="py-4">
                      <AvatarImg
                        src={booking.profile_img}
                        alt={booking.name}
                        name={booking.name}
                      />
                    </td>
                    <td className="py-4">{booking.name}</td>
                    <td className="pr-4">
                      <StatusSelectInput booking={booking} />
                    </td>
                    <td className="py-4">
                      <Link to={`/venue/supabase/${booking.venue_id}`}>
                        {booking.venue_title}
                      </Link>
                    </td>
                    <td className="py-4">{booking.total_price}nok</td>
                    <td className="py-4">{created_at}</td>
                    <td className="py-4">
                      {differenceInDays(
                        new Date(booking.booking_end_date),
                        new Date(booking.booking_start_date)
                      )}
                    </td>
                    <td className="py-4">{BookingStartDate}</td>
                    <td className="py-4">{BookingEndDate}</td>
                    <td className="py-4">
                      <Trash
                        onClick={() => {
                          setmodalObject({
                            id: booking.booking_id,
                            title: booking.venue_title,
                            name: booking.name,
                            img: booking.profile_img,
                            date_start: BookingStartDate,
                            date_end: BookingEndDate,
                          });
                          setDeleteModalIsOpen(true);
                        }}
                        className="h-8 w-8 cursor-pointer rounded-md fill-red-500 duration-100 hover:bg-red-100"
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      );
  }

  return <div>loading...</div>;
}

export default function AllbookingsBooking() {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [modalObject, setmodalObject] = useState({
    id: "",
    title: "",
    name: "",
  });
  const auth = useAuth();

  const { data, isLoading, error } = useGetOwnersBookingsQuery(auth.user.id);

  const [deleteBooking] = useDeleteBookingMutation();

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex w-full flex-col gap-6 p-10">
      <h1 className="text-3xl font-bold">All Your Bookings({data.length})</h1>
      <BookingsTable
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        setmodalObject={setmodalObject}
        bookings={data}
      />
      <AnimatePresence>
        {deleteModalIsOpen && (
          <DeleteModal
            modalObject={modalObject}
            setIsOpen={setDeleteModalIsOpen}
            deleteFunction={deleteBooking}
            type="booking"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

AllbookingsBooking.propTypes = {
  bookings: PropTypes.array,
};

BookingsTable.propTypes = {
  bookings: PropTypes.array,
  setDeleteModalIsOpen: PropTypes.func,
  setmodalObject: PropTypes.func,
};

StatusSelectInput.propTypes = {
  booking: PropTypes.object,
};
