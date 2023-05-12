import { useContext, useEffect } from "react";
import VenueCard from "../components/VenueCard";
import ThemeContext from "../utils/ThemeContext";
import { useGetVenuesQuery } from "../store/modules/apiSlice";

export default function AllVenuesSupabase() {
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
    if (!hasMaxWidthContainer) {
      setHasMaxWidthContainer(true);
    }
  }, [
    isDarkTheme,
    setIsDarkTheme,
    hasBgColour,
    setHasBgColour,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
  ]);

  const { data: venueData, error, isLoading } = useGetVenuesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-32">
      <section className="mx-auto my-0 flex max-w-[1500px] flex-col gap-6 p-6 sm:grid sm:grid-cols-2 md:p-10 lg:grid-cols-3 xl:grid-cols-4">
        {venueData.length > 0 &&
          venueData.map((venue) => {
            return <VenueCard key={venue.id} data={venue} />;
          })}
      </section>
    </div>
  );
}
