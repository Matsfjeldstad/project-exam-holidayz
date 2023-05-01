import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function ImageDisplay({ MediaArray }) {
  if (MediaArray.length === 1) {
    return (
      <div className="h-96 w-full overflow-hidden rounded-lg">
        <img
          src={MediaArray[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  if (MediaArray.length === 2) {
    return (
      <div className="grid h-96 w-full grid-cols-2 gap-2 overflow-hidden rounded-lg">
        <div className="col-span-1 bg-gray-900">
          <img
            src={MediaArray[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 bg-gray-900">
          <img
            src={MediaArray[1]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }
  if (MediaArray.length === 3) {
    return (
      <div className="grid h-96 w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        <div className="col-span-2 row-span-2 bg-gray-900">
          <img
            src={MediaArray[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 bg-gray-900">
          <img
            src={MediaArray[1]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 bg-gray-900">
          <img
            src={MediaArray[2]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }
  if (MediaArray.length === 4) {
    return (
      <div className="grid h-96 w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        <div className="col-span-2 row-span-2 bg-gray-900">
          <img
            src={MediaArray[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-2 bg-gray-900">
          <img
            src={MediaArray[1]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          <img
            src={MediaArray[2]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          <img
            src={MediaArray[3]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }
  if (MediaArray.length >= 5) {
    return (
      <div className="grid h-96 w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
        <div className="col-span-2 row-span-2 bg-gray-900">
          {" "}
          <img
            src={MediaArray[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          {" "}
          <img
            src={MediaArray[1]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          {" "}
          <img
            src={MediaArray[2]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          {" "}
          <img
            src={MediaArray[3]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-900">
          {" "}
          <img
            src={MediaArray[4]}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }
}

ImageDisplay.propTypes = {
  MediaArray: PropTypes.array,
};

export default function SpesificVenue() {
  const [venueData, setVenueData] = useState();
  let { id } = useParams();
  async function getVenues() {
    try {
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    document.title = "Holidaze | Home";

    (async () => {
      const apiData = await getVenues();
      setVenueData(apiData);
      console.log(venueData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <h1 className="mb-2 text-4xl font-medium">
          {venueData && venueData.name}
        </h1>
        <div className="flex gap-2">
          <div>4.5</div>
          <div className="text-gray-700 underline"> 3 reviews</div>
          <div className="font-medium text-gray-700 underline">location</div>
        </div>
      </div>
      {venueData && venueData.media.length > 0 && (
        <ImageDisplay MediaArray={venueData.media} />
      )}
    </div>
  );
}
