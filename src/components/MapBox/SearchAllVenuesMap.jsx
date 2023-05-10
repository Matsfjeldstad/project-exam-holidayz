import { useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import House from "../../assets/icons/airbnb-icons-places/House";
import PropTypes from "prop-types";

// Set your Mapbox access token here
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_REACT_MAPBOX_API_KEY;

const SearchVenuesMap = ({ center, zoom, markers }) => {
  const [viewport, setViewport] = useState({
    latitude: center[1],
    longitude: center[0],
    zoom: zoom,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  });

  const onViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  console.log(markers);

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onViewportChange={onViewportChange}
      onMove={(evt) => setViewport(evt.viewport)}
      style={{ position: "relative" }}
    >
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker key={index} longitude={marker.lng} latitude={marker.lat}>
            <div
              className={`group relative flex items-center justify-center rounded-full bg-red-500/90 duration-150 ease-in-out hover:scale-110 hover:bg-red-400`}
            >
              <div className="absolute top-0 w-fit min-w-[150px] -translate-y-6 rounded-lg bg-white p-2 text-center opacity-0 duration-200 ease-in-out group-hover:-translate-y-12 group-hover:opacity-100 ">
                {marker.price} nok per night
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/90 text-white">
                <House className="h-8 fill-white" />
              </div>
            </div>
          </Marker>
        ))}
      <NavigationControl position="bottom-right" />
    </ReactMapGL>
  );
};

export default SearchVenuesMap;

SearchVenuesMap.propTypes = {
  center: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  markers: PropTypes.array,
};
