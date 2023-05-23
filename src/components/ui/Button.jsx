import PropTypes from "prop-types";

export default function Button({
  children,
  className,
  onClick,
  rounded,
  type,
}) {
  const roudedClass = rounded ? "rounded-full" : "rouded";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} flex items-center justify-center px-4 py-2 font-bold text-white ${roudedClass} bg-gray-900 duration-150 hover:bg-gray-700`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  type: PropTypes.string,
};
