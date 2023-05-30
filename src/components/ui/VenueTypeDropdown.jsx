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
      className="flex w-full flex-col rounded-sm p-2 shadow-md"
    >
      {data.map((type, i) => {
        return (
          <div key={i} className="flex gap-2">
            <input
              type="radio"
              name="type"
              onBlur={formik.handleBlur}
              onChange={() => formik.setFieldValue("type", type)}
              checked={formik.values.type === type}
              value={type}
              className="h-5 w-5 min-w-[20px]  rounded-sm border"
              placeholder="Type"
            />
            <div>{type}</div>
          </div>
        );
      })}
    </motion.div>
  );
}

CheckboxDropdown.propTypes = {
  formik: PropTypes.object,
  data: PropTypes.array,
};
