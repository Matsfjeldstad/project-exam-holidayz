import PropTypes from "prop-types";

export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        className +
        " flex items-center justify-center rounded bg-[#FF004D] px-4 py-2 font-bold text-white"
      }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
