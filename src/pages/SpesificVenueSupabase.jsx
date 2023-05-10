import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Wifi from "../assets/icons/airbnb-icons-amenities/Wifi";
import Parking from "../assets/icons/airbnb-icons-amenities/Parking";
import ForkKnife from "../assets/icons/airbnb-icons-amenities/ForkKnife";
import PawPrint from "../assets/icons/airbnb-icons-amenities/PawPrint";
import ImageDisplayGrid from "../components/ImageDisplayGrid";
import ReactMapGLMap from "../components/MapBox/SpesificVenueMap";
import Calendar from "../components/ui/Calendar";
import { format } from "date-fns";
import supabase from "../lib/supabase";
import ThemeContext from "../utils/ThemeContext";

export default function SpesificVenueSupabase() {
  const [venueData, setVenueData] = useState();
  const [mapGeoLocationData, setMapGeoLocationData] = useState({
    latitude: 6.2,
    longitude: 53.6,
  });
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  let { id } = useParams();

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkTheme) {
      setIsDarkTheme(true);
    }
    document.title = "Holidaze | Home";
    getVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVenues() {
    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("id", id);
    if (error) console.log(error);
    setMapGeoLocationData({
      longitude: data[0].location.coordinates.lon,
      latitude: data[0].location.coordinates.lat,
    });
    setVenueData(data[0]);
  }

  const bookedDates =
    venueData && venueData.bookings && venueData.bookings.length > 0
      ? venueData.bookings.map((booking) => {
          return {
            from: new Date(booking.dateFrom),
            to: new Date(booking.dateTo),
          };
        })
      : [];

  if (venueData) {
    return (
      <div className="mx-auto mt-32 flex max-w-7xl flex-col gap-14">
        <div className="">
          <h1 className="mb-2 text-4xl font-medium">{venueData.title}</h1>
          <div className="flex gap-2">
            <div>4.5</div>
            <div className="font-medium text-gray-700 underline">
              {venueData.location &&
                venueData.location.address.city &&
                venueData.location.address.country &&
                venueData.location.address.city !== "Unknown" &&
                venueData.location.address.country !== "Unknown" &&
                `${venueData.location.address.city}, ${venueData.location.address.country}`}
            </div>
          </div>
        </div>
        {venueData.media.length > 0 && (
          <ImageDisplayGrid MediaArray={venueData.media} />
        )}
        <section className="flex justify-between gap-10">
          <div className=" flex w-4/5 max-w-5xl flex-col gap-4">
            <h3 className="text-2xl font-medium">Description</h3>
            <p>{venueData.description}</p>
          </div>
          <div className="flex w-1/5 flex-col gap-4">
            <h3 className="text-2xl font-medium">Facilities</h3>
            <div className="">
              {venueData.meta.wifi && (
                <div className="flex items-center gap-2">
                  <Wifi />
                  <div>Wifi</div>
                </div>
              )}
              {venueData.meta.parking && (
                <div className="flex items-center gap-2">
                  <Parking />
                  <div>Free Parking</div>
                </div>
              )}
              {venueData.meta.pets && (
                <div className="flex items-center gap-2">
                  <PawPrint />
                  <div>Pets Allowed</div>
                </div>
              )}
              {venueData.meta.breakfast && (
                <div className="flex items-center gap-2">
                  <ForkKnife />
                  <div>Breakfast</div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-medium">Location</h3>
          {venueData.location.lng !== 0 && venueData.location.lat !== 0 ? (
            <div className="flex overflow-hidden rounded-lg border">
              <div className="relative h-[560px] w-full">
                <ReactMapGLMap
                  center={[
                    mapGeoLocationData.longitude,
                    mapGeoLocationData.latitude,
                  ]}
                  zoom={13}
                  marker={{
                    lng: mapGeoLocationData.longitude,
                    lat: mapGeoLocationData.latitude,
                    price: venueData.price_per_night,
                  }}
                />
              </div>
            </div>
          ) : (
            <>There is no information about the location of this venue... </>
          )}
        </section>
        <section className="flex flex-col gap-8">
          <h3 className="text-2xl font-medium">Book Venue</h3>
          <div className="flex w-full gap-20">
            <div className="flex flex-col items-end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                bookings={bookedDates}
                numberOfMonths={2}
                className="h-full w-fit"
              />
              <button
                onClick={() =>
                  setDateRange({
                    from: "",
                    to: "",
                  })
                }
                className="mr-8 mt-3 w-fit underline"
              >
                Reset dates
              </button>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="flex items-baseline gap-2">
                <div>
                  from{" "}
                  <span className="text-2xl font-bold">
                    {venueData && venueData.price_per_night}
                  </span>
                  nok per night
                </div>
                <div> ⭐ {venueData && venueData.rating} </div>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div>Max Guests {venueData && venueData.maxGuests}</div>
                  {(venueData && venueData.meta.wifi && (
                    <>
                      <Wifi /> Free Wifi
                    </>
                  )) ||
                    (venueData && venueData.meta.parking && (
                      <div className="flex items-center">
                        <Parking className="w-8" /> Free Parking
                      </div>
                    ))}
                </div>
              </div>
              <form className="flex w-full flex-col gap-3">
                <div className="w-full overflow-hidden rounded-md border-2 border-gray-900">
                  <div className="flex border-b-2 border-gray-900">
                    <label className="flex w-1/2 flex-col border-r-2 p-2">
                      <span className="font-medium">Date from</span>
                      <input
                        type="date"
                        value={
                          dateRange && dateRange.from
                            ? format(dateRange.from, "yyyy-MM-dd")
                            : ""
                        }
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                          setDateRange({
                            from: new Date(e.target.value),
                            to: dateRange.to,
                          });
                        }}
                      />
                    </label>
                    <label className="flex w-1/2 flex-col p-2">
                      <span className="font-medium">Date to</span>
                      <input
                        type="date"
                        value={
                          dateRange && dateRange.to
                            ? format(dateRange.to, "yyyy-MM-dd")
                            : ""
                        }
                        onChange={(e) => {
                          setDateRange({
                            from: dateRange.from,
                            to: new Date(e.target.value),
                          });
                        }}
                        // disable any date before from date
                        min={
                          dateRange && dateRange.from
                            ? format(dateRange.from, "yyyy-MM-dd")
                            : ""
                        }
                      />
                    </label>
                  </div>
                  <label className="flex flex-col p-2">
                    <span className="font-medium">Number of guests</span>
                    <input
                      type="number"
                      min="1"
                      defaultValue={1}
                      max={venueData.maxGuests}
                    ></input>
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-[#FF004D] p-3 text-white"
                  onClick={() => {
                    console.log({
                      venueId: venueData.id,
                      from: dateRange.from,
                      to: dateRange.to,
                    });
                  }}
                >
                  {" "}
                  Check Booking
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return <div>Loading...</div>;
}
