import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Wifi from "../assets/icons/airbnb-icons-amenities/Wifi";
import Parking from "../assets/icons/airbnb-icons-amenities/Parking";
import ForkKnife from "../assets/icons/airbnb-icons-amenities/ForkKnife";
import Pawprint from "../assets/icons/airbnb-icons-amenities/Pawprint";
import ImageDisplayGrid from "../components/ImageDisplayGrid";
import ReactMapGLMap from "../components/shared/Map";
import Calendar from "../components/ui/Calendar";
import { format } from "date-fns";

export default function SpesificVenue() {
  const [venueData, setVenueData] = useState();
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  let { id } = useParams();
  async function getVenues() {
    try {
      const response = await fetch(
        `https://nf-api.onrender.com/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    document.title = "Holidaze | Home";

    (async () => {
      const apiData = await getVenues();
      setVenueData(apiData);
      console.log(venueData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookedDates =
    venueData && venueData.bookings.length > 0
      ? venueData.bookings.map((booking) => {
          return {
            from: new Date(booking.dateFrom),
            to: new Date(booking.dateTo),
          };
        })
      : "";

  if (venueData) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <div className="">
          <h1 className="mb-2 text-4xl font-medium">{venueData.name}</h1>
          <div className="flex gap-2">
            <div>4.5</div>
            <div className="font-medium text-gray-700 underline">
              {venueData.location.city &&
                venueData.location.country &&
                venueData.location.city !== "Unknown" &&
                venueData.location.country !== "Unknown" &&
                `${venueData.location.city}, ${venueData.location.country}`}
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
                  <Pawprint />
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
              <div className="h-[560px] w-full">
                <ReactMapGLMap
                  center={[venueData.location.lng, venueData.location.lat]}
                  zoom={13}
                  marker={{
                    lng: venueData.location.lng,
                    lat: venueData.location.lat,
                    price: venueData.price,
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
                    {venueData && venueData.price}
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
