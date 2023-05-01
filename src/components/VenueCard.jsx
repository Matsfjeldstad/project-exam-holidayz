import { useState } from "react";
import PropTypes from "prop-types";

export default function VenueCard({ data }) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="max-w-40 group flex cursor-pointer flex-col overflow-hidden font-poppins">
      <div className="relative flex h-80 w-full justify-end overflow-hidden p-4">
        <div>💓</div>
        <img
          src={data.media[imgIndex]}
          className="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-500 object-cover transition-all"
        />
        {data.media.length > 1 && (
          <div className=" relative z-30 flex h-full w-full items-end justify-center gap-2">
            {data.media.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full bg-white opacity-80 ${
                    imgIndex == index && "opacity-100"
                  }`}
                />
              );
            })}
          </div>
        )}
        {data.media.length > 1 && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-between p-2 opacity-0 duration-150 group-hover:opacity-100 ">
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
        )}
      </div>
      <div className="flex flex-col gap-1 py-4">
        <div className="flex justify-between">
          <h3 className="font-bold">{data.name}</h3>
          <div>{data.rating}</div>
        </div>
        <div className="text-sm text-gray-500">france - paris</div>
        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1 text-xs">Min night: 1</div>
        </div>
        <div className="text-sm">
          From <span className="text-lg font-bold">{data.price} nok</span>
        </div>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  data: PropTypes.object,
};
