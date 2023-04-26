import React from "react";
import VenueCard from "../components/VenueCard";

export default function Home() {
  return (
    <div className="p-12">
      <section className="mx-auto my-0 flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
      </section>
    </div>
  );
}
