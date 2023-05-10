import PropTypes from "prop-types";
export default function ImageDisplayGrid({ MediaArray }) {
  // Img grid if only one image is present
  if (MediaArray.length === 1) {
    return (
      <div className="h-[560px] w-full overflow-hidden rounded-lg">
        <img
          src={MediaArray[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  // Img grid if only two images are present
  if (MediaArray.length === 2) {
    return (
      <div className="grid h-[560px] w-full grid-cols-2 gap-2 overflow-hidden rounded-lg">
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
  // Img grid if only three images are present
  if (MediaArray.length === 3) {
    return (
      <div className="grid h-[560px] w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
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
  // Img grid if only four images are present
  if (MediaArray.length === 4) {
    return (
      <div className="grid h-[560px] w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
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
  // Img grid if five or more images are present
  if (MediaArray.length >= 5) {
    return (
      <div className="grid h-[560px] w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-lg">
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

ImageDisplayGrid.propTypes = {
  MediaArray: PropTypes.array,
};
