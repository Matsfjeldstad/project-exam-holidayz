import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
// import House from "../assets/icons/airbnb-icons-places/House";
import { useGetApiLocationQuery } from "../../store/modules/apiSlice";
import { House } from "../../assets/icons/Icons";
import { SearchBox } from "@mapbox/search-js-react";

export default function GeneralMap({ formik, setLat, setLon }) {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    center: [-122.4194, 37.7749],
    zoom: 11,
    width: "100%",
    height: "100%",
  });
  const onViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const { data, error } = useGetApiLocationQuery();

  useEffect(() => {
    if (data) {
      setViewport({
        latitude: data.latitude,
        longitude: data.longitude,
        center: [data.longitude, data.latitude],
        zoom: 14,
        width: "100%",
        height: "100%",
      });
    }
  }, [data]);

  useEffect(() => {
    setLat(viewport.latitude);
    setLon(viewport.longitude);
  }, [viewport, setLat, setLon]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative h-full w-full">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={import.meta.env.VITE_REACT_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onViewportChange={onViewportChange}
        onMove={(evt) => {
          setViewport(evt.viewState);
        }}
        style={{ position: "relative", overflow: "hidden" }}
        maxZoom={12}
      >
        <div className="absolute left-4 top-4 z-50">
          <SearchBox
            accessToken={import.meta.env.VITE_REACT_MAPBOX_API_KEY}
            onRetrieve={(result) => {
              setViewport({
                ...viewport,
                longitude: result.features[0].properties.coordinates.longitude,
                latitude: result.features[0].properties.coordinates.latitude,
                zoom: 10,
              });
              formik.setFieldValue(
                "country",
                result.features[0].properties.context.country.name
              );
            }}
            value={data?.city}
          ></SearchBox>
        </div>
        <GeolocateControl position={"top-right"}></GeolocateControl>
        <Marker
          onDragEnd={(evt) => {
            setViewport({
              ...viewport,
              longitude: evt.target._lngLat.lng,
              latitude: evt.target._lngLat.lat,
            });
          }}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          draggable
        >
          <div
            className={`group relative flex items-center justify-center rounded-full bg-red-500/90 duration-150 ease-in-out hover:scale-110 hover:bg-red-400`}
          >
            <div className="absolute top-0 w-fit min-w-[150px] -translate-y-6 rounded-lg bg-white p-2 text-center opacity-0 duration-200 ease-in-out group-hover:-translate-y-12 group-hover:opacity-100 ">
              Your apartment here
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/90 text-white">
              <House fill="white" className="m-0 h-6 p-0" />
            </div>
          </div>
        </Marker>
        <NavigationControl />
      </ReactMapGL>
    </div>
  );
}

GeneralMap.propTypes = {
  formik: PropTypes.object,
  setLat: PropTypes.func,
  setLon: PropTypes.func,
};
