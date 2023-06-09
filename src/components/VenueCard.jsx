import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeartLike from "./ui/HeartLike";
import AuthModal from "./modals/AuthModal";

export default function VenueCard({ data }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, translateY: 20 }}
        whileHover={{ y: -8 }}
        className="group flex cursor-pointer flex-col overflow-hidden font-poppins"
      >
        <div className="relative flex h-80 w-full justify-end overflow-hidden p-4">
          <div className="relative z-10 h-fit w-fit">
            <HeartLike
              venueID={data.id}
              setAuthModalIsOpen={setAuthModalIsOpen}
            />
          </div>

          {data.media && data.media.length > 0 && (
            <>
              <Link to={`/venue/${data.id}`}>
                <motion.img
                  initial={{ x: 20 }}
                  animate={{ x: 1 }}
                  exit={{ x: 20 }}
                  src={data.media[imgIndex]}
                  className="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-500 object-cover transition-all"
                />
              </Link>
              {data.media.length > 1 && (
                <>
                  <div className="absolute bottom-1 left-0 z-30 flex h-6 w-full justify-center gap-2">
                    {data.media.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full bg-white duration-150 ${
                            imgIndex == index
                              ? "scale-105 opacity-100"
                              : "opacity-70"
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="">
                    {data.media.length > imgIndex && imgIndex > 0 && (
                      <div
                        onClick={() => setImgIndex(imgIndex - 1)}
                        className="absolute bottom-0 left-2 top-0 mb-auto mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#FF004D] opacity-80"
                      />
                    )}
                    {imgIndex < data.media.length - 1 && (
                      <div
                        onClick={() => setImgIndex(imgIndex + 1)}
                        className="absolute bottom-0 right-2 top-0 mb-auto mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#FF004D] opacity-80"
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <Link to={`/venue/${data.id}`} className="flex flex-col gap-1 py-4">
          <div className="flex justify-between">
            <h3 className="font-bold">{data.title}</h3>
            <div>{data.rating}</div>
          </div>
          <div className="text-sm text-gray-500">
            {data.location.address.city} - {data.location.address.country}
          </div>
          <div className="text-sm text-gray-500">
            <div className="flex items-center gap-1 text-xs">Min night: 1</div>
          </div>
          <div className="text-sm">
            From{" "}
            <span className="text-lg font-bold">
              {data.price_per_night} nok
            </span>
          </div>
        </Link>
      </motion.div>
      {authModalIsOpen && <AuthModal setIsOpen={setAuthModalIsOpen} />}
    </>
  );
}

VenueCard.propTypes = {
  data: PropTypes.object,
};
