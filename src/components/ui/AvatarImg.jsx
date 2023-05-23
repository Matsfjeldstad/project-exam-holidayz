import PropTypes from "prop-types";

export default function AvatarImg({ src, alt, name, size }) {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={`${
        size && size === "small"
          ? "h-6 w-6"
          : size === "big"
          ? "h-16 w-16"
          : "h-10 w-10"
      }cursor-pointer rounded-full object-cover`}
    />
  ) : (
    <div
      className={`${
        size && size === "small"
          ? "h-9 w-9"
          : size === "big"
          ? "h-20 w-20"
          : "h-16 w-16"
      } cursor-pointer rounded-full bg-[#FF004D]`}
    >
      <div className="flex h-full items-center justify-center text-xl font-semibold text-white">
        {name[0]}
      </div>
    </div>
  );
}

AvatarImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
};
