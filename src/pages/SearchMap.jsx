import { useEffect, useState } from "react";
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
    overflow: "hidden",
  });
  const onViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const { data, error } = await supabase.rpc("houses_within_radius", {
        center: `POINT(${viewport.longitude} ${viewport.latitude})`,
        radius: 50000, // Radius in meters
      });

      if (error) {
        console.error("Error fetching houses:", error);
      } else {
        console.log("Data:", data);
        setHouses(data);
      }
    };

    fetchHouses();
  }, [viewport]);

  return (
    <div className="h-screen w-screen">
      <ReactMapGL
        {...viewport}
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
