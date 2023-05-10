import { useContext, useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import supabase from "../lib/supabase";
import ThemeContext from "../utils/ThemeContext";
export default function AllVenuesSupabase() {
  const [venueData, setVenueData] = useState([]);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
    }
    document.title = "Holidaze | Home";
    getVenues();
  }, [isDarkTheme, setIsDarkTheme]);

  async function getVenues() {
    let { data: venues, error } = await supabase.from("venues").select("*");
    if (!error) {
      setVenueData(venues);
    }
    return error.message;
  }

  return (
    <div className="mt-32 p-12">
      <section className="mx-auto my-0 flex max-w-7xl flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {venueData.length > 0 &&
          venueData.map((venue) => {
            return <VenueCard key={venue.id} data={venue} />;
          })}
      </section>
    </div>
  );
}
