import { Trash } from "../../assets/icons/Icons";
import { motion } from "framer-motion";
import AvatarImg from "../ui/AvatarImg";
import PropTypes from "prop-types";

export default function DeleteModal({
  setIsOpen,
  modalObject,
  type,
  deleteFunction,
}) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        className="h-16 w-16 rounded-full bg-red-500"
      >
        <Trash className="h-full w-full fill-white" />
      </motion.div>
      {type === "venue" && (
        <div className="text-xl text-white">Title: {modalObject.title}</div>
      )}
      {type === "booking" && (
        <>
          <div className="text-xl text-white">
            Booking for {modalObject.title}
          </div>
          <div className="text-xl text-white">
            ({modalObject.date_start}-{modalObject.date_end})
          </div>
          <div className="flex items-center gap-2 text-xl text-white">
            by {modalObject.name}
            <AvatarImg
              size="small"
              src={modalObject.img}
              name={modalObject.name}
            />
          </div>
        </>
      )}
      <div className="text-3xl font-bold text-white">
        You are about to delete this {type}
      </div>
      <div className="text-white">Are you sure?</div>
      <div className="flex gap-2">
        <button
          className="flex items-center justify-center rounded-sm border border-gray-100 px-4 py-2 font-bold text-gray-100 duration-150 hover:bg-gray-100/20"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center rounded-sm bg-red-500 p-2 pl-2 pr-4 font-bold text-white duration-150 hover:bg-red-400"
          onClick={() => {
            deleteFunction(modalObject.id);
            setIsOpen(false);
          }}
        >
          <Trash className="h-6 w-6 fill-white" />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

DeleteModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  modalObject: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  deleteFunction: PropTypes.func.isRequired,
};
