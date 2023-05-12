import { useEffect, useState, useRef, useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useGetOnMapVenuesQuery } from "../store/modules/apiSlice";
import VenueCard from "../components/VenueCard";
import ThemeContext from "../utils/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import useSupercluster from "use-supercluster";
import House from "../assets/icons/airbnb-icons-places/House";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MapComponent = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const {
    isDarkTheme,
    setIsDarkTheme,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
    hasBgColour,
    setHasBgColour,
  } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
    }
    if (!hasBgColour) {
      setHasBgColour(true);
    }
    if (hasMaxWidthContainer) {
      setHasMaxWidthContainer(false);
    }
  }, [
    isDarkTheme,
    setIsDarkTheme,
    hasBgColour,
    setHasBgColour,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
  ]);

  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    center: [-122.4194, 37.7749],
    zoom: 11,
    width: "100%",
    height: "100%",
  });
  const [fetchBounds, setFetchBounds] = useState([0, 0, 0, 0]);
  const onViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const [venues, setVenues] = useState([]);

  const mapRef = useRef();

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : fetchBounds;

  const { data, error, isFetching } = useGetOnMapVenuesQuery(fetchBounds);

  useEffect(() => {
    if (data) {
      setVenues(data);
    }
  }, [fetchBounds, data]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const points = venues.map((venue) => ({
    type: "Feature",
    properties: {
      cluster: false,
      venueId: venue.id,
      venuePice: venue.price_per_night,
      category: "anti-social-behaviour",
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(venue.location.coordinates.lon),
        parseFloat(venue.location.coordinates.lat),
      ],
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { clusters } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: { radius: 85, maxZoom: 20 },
  });

  return (
    <div className="relative mt-20 h-full w-full">
      {/* <div className="z-30 flex h-fit flex-col gap-1 bg-white px-10 lg:w-3/5">
        <h1 className="text-4xl font-bold">Venues</h1>
        <AnimatePresence>
          {venues.length > 0 ? (
            <div className="mt-10 flex flex-col gap-4">
              <motion.div>{venues.length} homes found</motion.div>
              <motion.div
                animate="show"
                className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
              >
                {venues.map((venue) => (
                  <VenueCard key={venue.id} data={venue} />
                ))}
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 20 }}
              className="mt-10 flex flex-col gap-4"
            >
              <h2 className="text-xl">No Venues in this area...</h2>
              <Link to={"/venues/supabase"}>
                <button className="w-fit rounded-full bg-gray-900 px-4 py-2 text-white">
                  Check all venues
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
      <div className=" h-[calc(100vh_-_80px)] w-full bg-black lg:sticky lg:top-20 lg:w-2/5">
        <div className="h-full">
          {isTabletOrMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              dragConstraints={{ bottom: 0, top: 0 }}
              dragMomentum={false}
              // dragElastic={0.8}
              drag="y"
              className="absolute top-[calc(100%_-_96px)] z-20 mx-auto flex h-fit w-full flex-col justify-start overflow-y-scroll rounded-t-3xl bg-white p-6"
            >
              <div className="relative flex h-full flex-col items-center justify-start gap-4">
                <div className="h-3 w-20 rounded-full bg-slate-400"></div>
                <motion.div className="text-center">
                  {venues.length} homes found
                </motion.div>
              </div>
              <AnimatePresence>
                {venues.length > 0 ? (
                  <div className="mt-10 flex flex-col gap-4">
                    <motion.div
                      animate="show"
                      className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
                    >
                      {venues.map((venue) => (
                        <VenueCard key={venue.id} data={venue} />
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: 20 }}
                    className="mt-10 flex h-screen flex-col gap-4"
                  >
                    <h2 className="text-xl">No Venues in this area...</h2>
                    <Link to={"/venues/supabase"}>
                      <button className="w-fit rounded-full bg-gray-900 px-4 py-2 text-white">
                        Check all venues
                      </button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_REACT_MAPBOX_API_KEY}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            onViewportChange={onViewportChange}
            onMove={(evt) => {
              setViewport(evt.viewState);
            }}
            onMoveEnd={(evt) => {
              console.log(evt);
              setFetchBounds(bounds);
            }}
            style={{ position: "relative", overflow: "hidden" }}
            maxZoom={19}
          >
            {isFetching && (
              <div className="absolute left-4 top-4 z-30 bg-white p-4 text-black">
                Loading...
              </div>
            )}
            <GeolocateControl
              position={isTabletOrMobile ? "top-left" : "top-right"}
            ></GeolocateControl>
            {clusters.map((cluster) => {
              // every cluster point has coordinates
              const [longitude, latitude] = cluster.geometry.coordinates;
              // the point may be either a cluster or a crime point
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties;

              // we have a cluster to render
              if (isCluster) {
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              if (!isCluster) {
                // we have a single point (crime) to render
                return (
                  <Marker
                    key={`venue-${cluster.properties.venueId}`}
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <div
                      className={`group relative flex items-center justify-center rounded-full bg-red-500/90 duration-150 ease-in-out hover:scale-110 hover:bg-red-400`}
                    >
                      <div className="absolute top-0 w-fit min-w-[150px] -translate-y-6 rounded-lg bg-white p-2 text-center opacity-0 duration-200 ease-in-out group-hover:-translate-y-12 group-hover:opacity-100 ">
                        {cluster.properties.venuePice} nok
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/90 text-white">
                        <House fill="white" className="m-0 h-6 p-0" />
                      </div>
                    </div>
                  </Marker>
                );
              }
            })}
            <NavigationControl
              position={isTabletOrMobile ? "top-right" : "bottom-right"}
            />
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
