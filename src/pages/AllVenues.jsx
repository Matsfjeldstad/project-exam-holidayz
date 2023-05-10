import { useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";

export default function AllVenues() {
  const [venueData, setVenueData] = useState();
  async function getVenues() {
    try {
      const response = await fetch(
        "https://nf-api.onrender.com/api/v1/holidaze/venues?sort=created"
      );
      const data = await response.json();
      setVenueData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    document.title = "Holidaze | Home";

    (async () => {
      await getVenues();
    })();
  }, []);

  return (
    <div className="p-12">
      <section className="mx-auto my-0 flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {venueData &&
          venueData.map((venue) => {
            return <VenueCard key={venue.id} data={venue} />;
          })}
      </section>
    </div>
  );
}
