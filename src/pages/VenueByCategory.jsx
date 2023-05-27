import { useContext, useEffect } from "react";
import VenueCard from "../components/VenueCard";
import ThemeContext from "../utils/ThemeContext";
import { useGetVenuesQuery } from "../store/modules/apiSlice";
import { useParams } from "react-router-dom";
import VenueNavigation from "../components/VenueNavigation";

export default function VenueByCategory() {
  const { category } = useParams();

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

  const { data: venueData, error, isLoading } = useGetVenuesQuery({ category });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-32">
      <section className="mx-auto max-w-[1500px] px-10">
        <div className="relative mb-10 w-full overflow-scroll">
          <div className="fixed left-8 top-0 h-full w-[100px]"></div>
          <VenueNavigation />
        </div>
        <h1 className="mb-10 text-4xl font-bold capitalize">{category}s</h1>
        <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {venueData.length > 0 ? (
            venueData.map((venue) => {
              return <VenueCard key={venue.id} data={venue} />;
            })
          ) : (
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">No venues found</h3>
              <p className="text-lg">Try a different search</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
