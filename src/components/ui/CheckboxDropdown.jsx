import { motion } from "framer-motion";
import PropTypes from "prop-types";

const fadeIn = {
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 5,
    },
  },
  initial: {
    opacity: 0,
    y: 10,
  },
  exit: {
    opacity: 0,
    y: 0,
  },
};

export default function CheckboxDropdown({ formik, data }) {
  return (
    <motion.div
      variants={fadeIn}
      animate="animate"
      className="flex w-full flex-col rounded-sm bg-slate-100 p-2 shadow-md"
    >
      {data.map((amenity) => {
        return (
          <motion.label
            key={amenity}
            variants={fadeIn}
            animate="animate"
            initial="initial"
            exit="exit"
            className="flex w-full items-center justify-start gap-2 border-b p-2 font-medium"
          >
            <input
              type="checkbox"
              name={amenity}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              checked={formik.values[amenity]}
              value={formik.values[amenity]}
              className=" h-5 w-5 min-w-[20px] rounded-sm  border font-medium"
            />
            {amenity}
          </motion.label>
        );
      })}
    </motion.div>
  );
}

CheckboxDropdown.propTypes = {
  formik: PropTypes.object,
  data: PropTypes.array,
};
