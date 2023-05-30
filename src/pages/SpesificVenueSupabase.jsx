import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ImageDisplayGrid from "../components/ImageDisplayGrid";
import ReactMapGLMap from "../components/MapBox/SpesificVenueMap";
import Calendar from "../components/ui/Calendar";
import { format } from "date-fns";
import ThemeContext from "../utils/ThemeContext";
import {
  useBookVenueMutation,
  useGetSingleVenueQuery,
} from "../store/modules/apiSlice";
import { Wifi, Parking, ForkKnife, PawPrint } from "../assets/icons/Icons";
import { useAuth } from "../utils/Auth";
import AuthModal from "../components/modals/AuthModal";

export default function SpesificVenueSupabase() {
  const [bookVenue] = useBookVenueMutation();
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user } = useAuth();

  let { id } = useParams();

  const {
    isDarkTheme,
    setIsDarkTheme,

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
    document.title = "Holidaze | Home";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, error, isLoading } = useGetSingleVenueQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const bookedDates =
    data.bookings && data.bookings.length > 0
      ? data.bookings.map((booking) => {
          return {
            from: new Date(booking.booking_start_date),
            to: new Date(booking.booking_end_date),
          };
        })
      : [];

  const sortedBookings = bookedDates
    .filter((booking) => booking.from > dateRange?.from)
    .sort((a, b) => a.from - b.from);

  // find the minimum booking date after the selected 'from' date¨
  const closestBooking = sortedBookings.length > 0 ? sortedBookings[0] : null;

  if (data) {
    return (
      <div className="mx-auto mt-32 flex max-w-[1500px] flex-col gap-14 p-4 md:px-10">
        <div className="">
          <h1 className="mb-2 text-4xl font-medium">{data.title}</h1>
          <div className="flex gap-2">
            <div>4.5</div>
            <div className="font-medium text-gray-700 underline">
              {data.location &&
                data.location.address.country &&
                `${data.location.address.city}, ${data.location.address.country}`}
            </div>
          </div>
        </div>
        {data.media.length > 0 && <ImageDisplayGrid MediaArray={data.media} />}
        <section className="flex flex-col justify-between gap-10 md:flex-row">
          <div className=" flex w-4/5 max-w-5xl flex-col gap-4">
            <h3 className="text-2xl font-medium">Description</h3>
            <p>{data.description}</p>
          </div>
          <div className="flex w-1/5 flex-col gap-4">
            <h3 className="text-2xl font-medium">Facilities</h3>
            <div className="">
              {data.meta.wifi && (
                <div className="flex items-center gap-2">
                  <Wifi className="min-w-[32px] fill-gray-700" />
                  <div>Wifi</div>
                </div>
              )}
              {data.meta.parking && (
                <div className="flex items-center gap-2">
                  <Parking className="min-w-[32px] fill-gray-700" />
                  <div>Free Parking</div>
                </div>
              )}
              {data.meta.pets && (
                <div className="flex items-center gap-2">
                  <PawPrint className="min-w-[32px] fill-gray-700" />
                  <div>Pets Allowed</div>
                </div>
              )}
              {data.meta.breakfast && (
                <div className="flex items-center gap-2">
                  <ForkKnife className="min-w-[32px] fill-gray-700" />
                  <div>Breakfast</div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl font-medium">Location</h3>
          {data.location.lng !== 0 && data.location.lat !== 0 ? (
            <div className="flex overflow-hidden rounded-lg border">
              <div className="relative h-[560px] w-full">
                <ReactMapGLMap
                  center={[
                    data.location.coordinates.lon,
                    data.location.coordinates.lat,
                  ]}
                  zoom={13}
                  marker={{
                    lng: data.location.coordinates.lon,
                    lat: data.location.coordinates.lat,
                    price: data.price_per_night,
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
          <div className="flex w-full flex-col gap-20 md:flex-row">
            <div className="flex w-full flex-col ">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                bookings={bookedDates}
                numberOfMonths={1}
                className="block h-full w-fit lg:hidden"
              />
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                bookings={bookedDates}
                numberOfMonths={2}
                className="hidden h-full w-fit lg:block"
              />
              <button
                onClick={() =>
                  setDateRange({
                    from: dateRange[0],
                    to: dateRange[1],
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
                    {data && data.price_per_night}
                  </span>
                  nok per night
                </div>
                <div> ⭐ {data && data.rating} </div>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div>Max Guests {data && data.maxGuests}</div>
                  {(data && data.meta.wifi && (
                    <>
                      <Wifi /> Free Wifi
                    </>
                  )) ||
                    (data && data.meta.parking && (
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
                        max={
                          closestBooking &&
                          format(closestBooking.from, "yyyy-MM-dd")
                        }
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
                        max={
                          closestBooking &&
                          format(closestBooking.from, "yyyy-MM-dd")
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
                      max={data.maxGuests}
                    ></input>
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-[#FF004D] p-3 text-white"
                  onClick={() => {
                    user
                      ? bookVenue({
                          id: data.id,
                          user_id: user.id,
                          from: new Date(dateRange.from).toISOString(),
                          to: new Date(dateRange.to).toISOString(),
                        })
                      : setAuthModalOpen(true);
                  }}
                >
                  {" "}
                  Check Booking
                </button>
              </form>
            </div>
          </div>
        </section>
        {authModalOpen && <AuthModal setIsOpen={setAuthModalOpen} />}
      </div>
    );
  }
  return <div>Loading...</div>;
}
