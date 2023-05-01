import React from "react";

export default function VenueCard({ data }) {
  return (
    <div className="max-w-40 flex cursor-pointer flex-col overflow-hidden font-poppins">
      <div className="relative flex h-80 w-full justify-end overflow-hidden p-4">
        <div>💓</div>
        <img
          src={data.media[0]}
          className="absolute left-0 top-0 h-full w-full rounded-lg bg-gray-500 object-cover transition-all"
        />
      </div>
      <div className="flex flex-col gap-1.5 py-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{data.name}</h3>
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
