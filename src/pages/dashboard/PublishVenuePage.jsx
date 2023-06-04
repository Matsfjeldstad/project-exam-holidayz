import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import CheckboxDropdown from "../../components/ui/CheckboxDropdown";
import { useEffect, useState } from "react";
import { Chevorn, MapPin, Pencil, Plus, Cross } from "../../assets/icons/Icons";
import { AnimatePresence, motion } from "framer-motion";
import VenueTypeDropdown from "../../components/ui/VenueTypeDropdown";
import GeneralMap from "../../components/MapBox/SearchAllVenuesMap";
import { useAuth } from "../../utils/Auth";
import {
  useDeleteVenueMutation,
  usePublishVenueMutation,
  useUpdateVenueMutation,
  useUploadFilesMutation,
} from "../../store/modules/apiSlice";
import { Navigate } from "react-router-dom";

export function PublishVenueForm() {
  const [publishVenue] = usePublishVenueMutation();
  const [uploadFiles] = useUploadFilesMutation();
  const [deleteVenue] = useDeleteVenueMutation();
  const [updateVeneue] = useUpdateVenueMutation();

  const [facilitiesDropdownOpen, setFacilitiesDropdownOpen] = useState(false);
  const [venueTypeDropdownOpen, setVenueTypeDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [files, setFiles] = useState([]);

  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price_per_night: 0,
      country: "",
      city: "",
      street: "",
      zip: "",
      lon: lon,
      lat: lat,
      max_guest: "",
      wifi: "",
      pool: "",
      kitchen: "",
      heating: "",
      parking: "",
      air_conditioning: "",
      pets: "",
      tv: "",
      washing_machine: "",
      gym: "",
      type: "house",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      images: Yup.array().required("Images are required").min(1),
      description: Yup.string().required("Description is required"),
      price_per_night: Yup.number()
        .required("Price is required")
        .min(1, "Price must be greater than 0"),
      max_guest: Yup.number()
        .required("Max guests is required")
        .min(1, "Max guests must be greater than 0"),
      type: Yup.string().required("Type is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setIsLoading(true);
      publishVenue({
        user_id: user.id,
        title: values.title,
        description: values.description,
        price_per_night: values.price_per_night,
        max_guests: values.max_guest,
        type: values.type,
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
        location: {
          address: {
            country: values.country,
            city: values.city,
            street: values.street,
            zip: values.zip,
          },
          coordinates: {
            lat: values.lat,
            lon: values.lon,
          },
        },
      }).then((res) => {
        console.log(res);
        const venue_id = res.data.id;
        const venue_owner = res.data.owner_id;
        const imageUrls = [];
        files.forEach((file) => {
          const uploadFunction = uploadFiles({
            venue_id,
            file,
            user_id: venue_owner,
          })
            .then((res) => {
              const ImagePath = res.data.path;
              const fileUrl = `${
                import.meta.env.VITE_REACT_SUPABASE_URL
              }/storage/v1/object/public/venue_media/${ImagePath}`;
              return fileUrl;
            })
            .catch((err) => {
              console.log(err);
              deleteVenue(venue_id);
            });
          imageUrls.push(uploadFunction);

          Promise.all(imageUrls)
            .then((res) => {
              const venueArray = res;
              updateVeneue({
                type: "addMedia",
                venue_id: venue_id,
                media: venueArray,
              }).then((res) => {
                console.log("hello", res);
                setIsLoading(false);
                return <Navigate to={"/venue/"} />;
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    },
  });

  console.log(formik.errors);

  useEffect(() => {
    formik.setFieldValue("lat", lat);
    formik.setFieldValue("lon", lon);
  }, [lat, lon]);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    const validFiles = newFiles.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
    );
    console.log(validFiles);
    setFiles([...files, ...validFiles]);
    formik.setFieldValue("images", [...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-150 mt-6 flex w-full flex-col gap-4 rounded-lg border-2 border-gray-300 p-4 md:p-10"
    >
      <label className="flex w-full flex-col gap-1 text-xl font-medium">
        {formik.errors.title && formik.touched.title && (
          <div className=" text-red-500">{formik.errors.title}</div>
        )}
        Title:
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Title"
          className="w-full border-b-2 border-gray-300 py-2 text-3xl font-medium focus-visible:outline-transparent "
        />
      </label>
      {formik.errors.description && formik.touched.description && (
        <div className="text-red-500">{formik.errors.description}</div>
      )}
      <label className="mt-2 flex w-full flex-col gap-1 rounded-lg border bg-gray-50 px-2 py-2 text-xs font-medium text-gray-500">
        Venue description*
        <textarea
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Description"
          className=" h-40 w-full bg-transparent text-base font-medium text-gray-900"
        />
      </label>
      <div className="mt-10 flex w-full flex-col gap-4 font-medium">
        <div className="flex items-center">
          <MapPin className="h-10 w-10 fill-gray-700" />
          Location
        </div>
        <div className=" h-[500px]">
          <GeneralMap
            formik={formik}
            setLat={setLat}
            setLon={setLon}
          ></GeneralMap>
        </div>
      </div>
      <div className="mt-10 flex w-full gap-4">
        {(formik.errors.max_guest && formik.touched.max_guest) ||
          (formik.errors.price_per_night && formik.touched.price_per_night && (
            <div className="text-red-500">
              {formik.errors.price_per_night || formik.errors.max_guest}
            </div>
          ))}
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
      <div className="mt-10 flex flex-col gap-4 md:flex-row">
        <div className="h-[500px] w-full border-2 border-dashed md:w-1/2 ">
          <label
            htmlFor="images"
            className="flex h-full cursor-pointer items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center gap-2">
              {!files.length ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-950 p-0.5">
                    <Plus className="fill-gray-100" />
                  </div>
                  <div className="text-center">
                    {" "}
                    Click Here to add Image Or Drag and Drop file
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-950 p-0.5">
                    <Plus className="fill-gray-100" />
                  </div>
                  <div>{files.length} files</div>
                  <div className="text-center">
                    {" "}
                    Click Here to add Image Or Drag and Drop file
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              id="images"
              name="images"
              onBlur={formik.handleBlur}
              onChange={(event) => {
                setFiles((prev) => [...prev, ...event.target.files]);
                formik.setFieldValue("images", [
                  ...files,
                  ...event.target.files,
                ]);
              }}
              multiple
              hidden
            />
          </label>
        </div>
        <div className="w-full md:w-1/2">
          <AnimatePresence className="md:grid-cols- grid grid-cols-2 gap-4 sm:grid-cols-2">
            {files.length ? (
              files.map((file, index) => (
                <motion.div
                  animate={{ scale: 1, opacity: 1 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key={index}
                  className="relative"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="venue"
                    className="h-40 w-40 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900"
                    onClick={() => {
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <Cross className="fill-gray-100" />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                No Images Added
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-fit min-w-[300px] rounded-lg bg-gray-900 p-4 py-2 font-medium text-white"
      >
        {isLoading ? "loading.." : "Publish venue"}
      </button>
    </form>
  );
}

export default function PublishVenuePage() {
  return (
    <div className="w-full p-4 md:p-10">
      <h1 className="flex items-center text-3xl font-bold">
        <Pencil className={"fill-gray-700"} />
        Publish your venue
      </h1>
      <PublishVenueForm />
    </div>
  );
}

PublishVenueForm.propTypes = {
  data: PropTypes.object,
};
