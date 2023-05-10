import { useContext, useEffect, useState } from "react";
import VenueCard from "../components/VenueCard";
import ThemeContext from "../utils/ThemeContext";
import { useGetVenuesQuery } from "../store/modules/apiSlice";

export default function AllVenuesSupabase() {
  // const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  // useEffect(() => {
  //   if (isDarkTheme) {
  //     setIsDarkTheme(false);
  //   }
  // }, [isDarkTheme, setIsDarkTheme]);

  const { data: venueData, error, isLoading } = useGetVenuesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
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
