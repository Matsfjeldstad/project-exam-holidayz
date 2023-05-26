import { useParams } from "react-router-dom";
import { useGetSingleVenueQuery } from "../../store/modules/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CheckboxDropdown from "../../components/ui/CheckboxDropdown";
import { useState } from "react";
import { Chevorn, MapPin, Pencil } from "../../assets/icons/Icons";
import { AnimatePresence, motion } from "framer-motion";
import VenueTypeDropdown from "../../components/ui/VenueTypeDropdown";
import { AddressAutofill } from "@mapbox/search-js-react";

export function EditVenueForm({ data }) {
  console.log();
  const [facilitiesDropdownOpen, setFacilitiesDropdownOpen] = useState(false);
  const [venueTypeDropdownOpen, setVenueTypeDropdownOpen] = useState(false);
  const [countryValue, setCountryValue] = useState(
    data.location.address.country
  );

  const formik = useFormik({
    initialValues: {
      title: data && data.title,
      description: data.description,
      price_per_night: data.price_per_night,
      country: countryValue,
      city: data.location.address.city,
      street: data.location.address.street,
      zip: data.location.address.zip,
      max_guest: data.max_guest,
      wifi: data.meta.wifi,
      pool: data.meta.pool,
      kitchen: data.meta.kitchen,
      heating: data.meta.heating,
      parking: data.meta.parking,
      air_conditioning: data.meta.air_conditioning,
      pets: data.meta.pets,
      tv: data.meta.tv,
      washing_machine: data.meta.washing_machine,
      gym: data.meta.gym,
      // boat: data.type.boat,
      // house: data.type.house,
      // hotel: data.type.hotel,
      // apartment: data.type.apartment,
      // cabin: data.type.cabin,
      // caravan: data.type.caravan,
      boat: data.type.boat,
      house: data.type.house,
      hotel: data.type.hotel,
      apartment: data.type.apartment,
      cabin: data.type.cabin,
      caravan: data.type.caravan,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log({
        title: values.title,
        description: values.description,
        price_per_night: values.price_per_night,
        location: {
          address: {
            country: values.country,
            city: values.city,
            street: values.street,
            zip: values.zip,
          },
        },
        max_guest: values.max_guest,
        meta: {
          wifi: values.wifi,
          pool: values.pool,
          kitchen: values.kitchen,
          heating: values.heating,
          parking: values.parking,
          air_conditioning: values.air_conditioning,
          pets: values.pets,
          tv: values.tv,
          washing_machine: values.washing_machine,
          gym: values.gym,
        },
        type: {
          boat: values.boat,
          house: values.house,
          hotel: values.hotel,
          apartment: values.apartment,
          cabin: values.cabin,
          caravan: values.caravan,
        },
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-150 mt-6 flex w-full flex-col gap-4 rounded-lg border-2 border-gray-300 p-10"
    >
      <label className="flex w-full flex-col gap-1 text-xl font-medium">
        Title:
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border-b-2 border-gray-300 py-2 text-3xl font-medium  focus-visible:outline-transparent "
        />
      </label>
      <label className="mt-10 flex w-full flex-col gap-1 rounded-lg border bg-gray-50 px-2 py-2 text-xs font-medium text-gray-500">
        Venue description*
        <textarea
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className=" h-40 w-full bg-transparent text-base font-medium text-gray-900"
        />
      </label>
      <div className="mt-10 flex w-full flex-col gap-4 font-medium">
        <div className="flex items-center">
          <MapPin className="h-10 w-10 fill-gray-700" /> Location
        </div>
        <div className="flex w-full gap-4">
          <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
            Country
            <AddressAutofill
              accessToken={import.meta.env.VITE_REACT_MAPBOX_API_KEY}
              onChange={(city) => {
                formik.setFieldValue("country", city);
              }}
              onRetrieve={(city) => {
                console.log(city);
              }}
            >
              <input
                type="text"
                name="country"
                onBlur={formik.handleBlur}
                value={formik.values.country}
                onChange={(e) => {
                  formik.handleChange(e);
                  setCountryValue(e.target.value);
                }}
                autoComplete="country-name"
                placeholder="Country"
                className="w-full bg-transparent text-lg font-medium text-gray-900"
              />
            </AddressAutofill>
          </label>
          <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
            city
            <input
              type="text"
              name="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              autoComplete="address-level2"
              placeholder="city"
              className="w-full bg-transparent text-lg font-medium text-gray-900"
            />
          </label>
        </div>
        <div className="flex w-full gap-4">
          <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
            Street name
            <input
              type="text"
              name="street"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.street}
              autoComplete="address-line1"
              placeholder="street name"
              className="w-full bg-transparent text-lg font-medium text-gray-900"
            />
          </label>
          <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
            zip code
            <input
              type="zip"
              name="zip"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.zip}
              placeholder="zip code"
              autoComplete="shipping postcode"
              className="w-full bg-transparent text-lg font-medium text-gray-900"
            />
          </label>
        </div>
      </div>
      <div className="mt-10 flex w-full gap-4">
        <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
          Max number of guest
          <input
            type="number"
            min={0}
            name="max_guest"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.max_guest}
            placeholder="maximum number of guests"
            className="w-full bg-transparent text-lg font-medium text-gray-900"
          />
        </label>
        <label className="flex h-fit w-full flex-col gap-1 rounded-lg border bg-gray-50 p-1 px-2 text-xs font-medium text-gray-500">
          Price per night
          <input
            type="number"
            min={0}
            name="price_per_night"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.price_per_night}
            placeholder="Price per night"
            className="w-full bg-transparent text-lg font-medium text-gray-900"
          />
        </label>
      </div>
      <div className="flex gap-4">
        <div className="mt-10 h-fit w-1/2 rounded-md border px-4 py-3 font-medium shadow-md">
          <h2
            className="flex cursor-pointer items-center justify-between"
            onClick={() => setFacilitiesDropdownOpen(!facilitiesDropdownOpen)}
          >
            View all facilities
            <motion.div>
              <Chevorn
                className={`h-9 fill-gray-900 duration-300 ${
                  facilitiesDropdownOpen && "rotate-180"
                }`}
              />
            </motion.div>
          </h2>
          <div className="relative flex gap-4">
            <AnimatePresence>
              {facilitiesDropdownOpen && (
                <motion.div
                  animate={{ height: "auto" }}
                  initial={{ height: 0 }}
                  exit={{ height: 0 }}
                  className=" w-full overflow-hidden"
                >
                  <CheckboxDropdown
                    formik={formik}
                    data={[
                      "wifi",
                      "parking",
                      "pets",
                      "pool",
                      "gym",
                      "air_conditioning",
                      "heating",
                      "tv",
                      "washing_machine",
                      "kitchen",
                    ]}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-10 h-fit w-1/2 rounded-md border px-4 py-3 font-medium shadow-md">
          <h2
            className="flex cursor-pointer items-center justify-between"
            onClick={() => setVenueTypeDropdownOpen(!venueTypeDropdownOpen)}
          >
            Pick Venue type
            <motion.div>
              <Chevorn
                className={`h-9 fill-gray-900 duration-300 ${
                  venueTypeDropdownOpen && "rotate-180"
                }`}
              />
            </motion.div>
          </h2>
          <div className="relative flex gap-4">
            <AnimatePresence>
              {venueTypeDropdownOpen && (
                <motion.div
                  animate={{ height: "auto" }}
                  initial={{ height: 0 }}
                  exit={{ height: 0 }}
                  className=" w-full overflow-hidden"
                >
                  <VenueTypeDropdown
                    formik={formik}
                    data={[
                      "hotel",
                      "apartment",
                      "house",
                      "boat",
                      "cabin",
                      "caravan",
                    ]}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-10 w-full rounded-lg bg-gray-900 py-2 font-medium text-white"
      >
        Edit venue
      </button>
    </form>
  );
}

export default function EditVenue() {
  const { id } = useParams();
  const { data, isError, isLoading, error } = useGetSingleVenueQuery(id);

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>{error.message}</div>;

  console.log(data);

  return (
    <div className="w-full p-10">
      <h1 className="flex items-center text-3xl font-bold">
        <Pencil className={"fill-gray-700"} />
        Edit Venue
      </h1>
      <EditVenueForm data={data} />
    </div>
  );
}

EditVenueForm.propTypes = {
  data: PropTypes.object,
};
