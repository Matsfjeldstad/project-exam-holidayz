import { useEffect, useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import supabase from "../lib/supabase";

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    center: [-122.4194, 37.7749],
    zoom: 11,
    width: "100%",
    height: "100%",
  });
  const onViewportChange = (newViewport) => {
    console.log(newViewport);
    setViewport({ ...viewport, ...newViewport });
  };

  const [houses, setHouses] = useState([]);

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      console.log(bounds);
    }
    if (viewport) {
      console.log(viewport);
      const fetchHouses = async () => {
        const { data, error } = await supabase.rpc("houses_within_radius", {
          center: `POINT(${viewport.longitude} ${viewport.latitude})`,
          radius: 5000, // Radius in meters
        });
        if (error) {
          console.error("Error fetching houses:", error);
        } else {
          console.log("Data:", data);
          setHouses(data);
        }
      };
      fetchHouses();
    } else {
      console.log("No viewport");
    }
  }, [viewport]);

  return (
    <div className="h-screen w-full">
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_REACT_MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onViewportChange={onViewportChange}
        onMove={(evt) => setViewport(evt.viewport)}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {houses.map((house) => (
          <Marker
            key={house.id}
            latitude={house.latitude}
            longitude={house.longitude}
          >
            <div>🏠</div>
          </Marker>
        ))}
        <NavigationControl position="bottom-right" />
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;
