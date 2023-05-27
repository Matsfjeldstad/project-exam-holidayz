import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function NavigationCard(props) {
  const { text, className, imgLink, to } = props;
  return (
    <Link to={to} className={className}>
      <div className="relative z-20 text-white">{text}</div>
      <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-b from-transparent to-black " />
      <img
        src={imgLink}
        className="absolute left-0 top-0 h-full w-full object-cover duration-150 group-hover:scale-105 "
      />
    </Link>
  );
}

NavigationCard.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
