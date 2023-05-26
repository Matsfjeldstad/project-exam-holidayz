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
import ThemeContext from "../utils/ThemeContext";
import { useGetSingleVenueQuery } from "../store/modules/apiSlice";

export default function SpesificVenueSupabase() {
  // const [mapGeoLocationData, setMapGeoLocationData] = useState({
  //   latitude: 6.2,
  //   longitude: 53.6,
  // });
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  let { id } = useParams();

  const {
    isDarkTheme,
    setIsDarkTheme,
    hasMaxWidthContainer,
    setHasMaxWidthContainer,
  } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkTheme) {
      setIsDarkTheme(true);
    }
    if (!hasMaxWidthContainer) {
      setHasMaxWidthContainer(true);
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

  if (data) {
    return (
      <div className="mx-auto mt-32 flex max-w-[1500px] flex-col gap-14 px-10">
        <div className="">
          <h1 className="mb-2 text-4xl font-medium">{data.title}</h1>
          <div className="flex gap-2">
            <div>4.5</div>
            <div className="font-medium text-gray-700 underline">
              {data.location &&
                data.location.address.city &&
                data.location.address.country &&
                data.location.address.city !== "Unknown" &&
                data.location.address.country !== "Unknown" &&
                `${data.location.address.city}, ${data.location.address.country}`}
            </div>
          </div>
        </div>
        {data.media.length > 0 && <ImageDisplayGrid MediaArray={data.media} />}
        <section className="flex justify-between gap-10">
          <div className=" flex w-4/5 max-w-5xl flex-col gap-4">
            <h3 className="text-2xl font-medium">Description</h3>
            <p>{data.description}</p>
          </div>
          <div className="flex w-1/5 flex-col gap-4">
            <h3 className="text-2xl font-medium">Facilities</h3>
            <div className="">
              {data.meta.wifi && (
                <div className="flex items-center gap-2">
                  <Wifi />
                  <div>Wifi</div>
                </div>
              )}
              {data.meta.parking && (
                <div className="flex items-center gap-2">
                  <Parking />
                  <div>Free Parking</div>
                </div>
              )}
              {data.meta.pets && (
                <div className="flex items-center gap-2">
                  <PawPrint />
                  <div>Pets Allowed</div>
                </div>
              )}
              {data.meta.breakfast && (
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
                      max={data.maxGuests}
                    ></input>
                  </label>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-[#FF004D] p-3 text-white"
                  onClick={() => {
                    console.log({
                      venueId: data.id,
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
