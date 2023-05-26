import { useState } from "react";
import { format } from "date-fns";
import {
  useDeleteVenueMutation,
  useGetUserVenuesQuery,
} from "../../store/modules/apiSlice";
import { useAuth } from "../../utils/Auth";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash } from "../../assets/icons/Icons";
import DeleteModal from "../../components/modals/DeleteModal";
import { AnimatePresence, motion } from "framer-motion";

export default function UserVenues() {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [modalObject, setmodalObject] = useState({
    id: "",
    title: "",
  });
  const auth = useAuth();

  console.log(auth.user);

  const { data, isLoading, error } = useGetUserVenuesQuery(auth.user.id);
  const [deleteVenue] = useDeleteVenueMutation();

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error.message}</div>;

  // console.log("qurie", hello);

  return (
    <div className="flex w-full flex-col gap-6 p-10">
      <h1 className="text-3xl font-bold">All Your Venues({data.length})</h1>

      {data && data.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="font-poppins text-sm font-semibold text-[#4B5563]"></th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Venue Title
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Date created
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Pricer per night
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Venue type
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Bookings
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Edit
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563]">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((venue) => {
                const created_at = format(
                  new Date(venue.created_at),
                  "dd.MM.yyyy HH:mm"
                );
                return (
                  <motion.tr
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    key={venue.id}
                    className="border-b border-[#E2E8F0]"
                  >
                    <td className="py-4"></td>
                    <td className="py-4">
                      <Link to={`/venue/supabase/${venue.id}`}>
                        {venue.title}
                      </Link>
                    </td>
                    <td className="py-4">{created_at}</td>
                    <td className="py-4">{venue.price_per_night}</td>
                    <td className="py-4">{venue.type.caravan}</td>
                    <td className="py-4 ">{venue.bookings.length}</td>
                    <td className="py-4">
                      <Link to={`/dashboard/edit-venue/${venue.id}`}>
                        <Pencil className="h-8 w-8 cursor-pointer rounded-md fill-gray-800 duration-100 hover:bg-blue-100" />
                      </Link>
                    </td>
                    <td className="py-4">
                      <Trash
                        onClick={() => {
                          setmodalObject({
                            id: venue.id,
                            title: venue.title,
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
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-gray-600">You have no venues yet...</h1>
          <Link
            to="/dashboard/add-venue"
            className={
              "group relative flex w-fit min-w-[250px] items-center justify-center gap-1.5 rounded-full bg-gray-900 p-4 text-gray-100 duration-150 hover:bg-gray-800"
            }
          >
            <Plus className="absolute left-4 h-8 w-8 rounded-full bg-transparent fill-gray-100 duration-200 group-hover:scale-110 group-hover:bg-[#FF004D] group-hover:fill-white" />
            <div>List A Vanue</div>
          </Link>
        </div>
      )}
      <AnimatePresence>
        {deleteModalIsOpen && (
          <DeleteModal
            modalObject={modalObject}
            setIsOpen={setDeleteModalIsOpen}
            deleteFunction={deleteVenue}
            type="venue"
          />
        )}
      </AnimatePresence>
      {console.log(data)}
    </div>
  );
}
