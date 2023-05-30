import { Profile } from "../../assets/icons/Icons";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal";

export default function AuthModal({ setIsOpen }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        exit={{ opacity: 0, scale: 0 }}
        className="h-16 w-16 rounded-full bg-red-500"
      >
        <Profile className="h-full w-full fill-white" />
      </motion.div>
      <div className="text-center text-xl font-bold text-white">
        To book a venue, you need to be logged in.
      </div>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-sm">
        <LoginModal />
        <button
          className="flex items-center justify-center rounded-sm border border-gray-900 px-4 py-2 font-bold text-gray-900 duration-150 hover:bg-gray-900/20"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

AuthModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};
