import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "../../lib/supabase";

/**
 * supabaseApi Object.
 *
 * @module supabaseApi
 * @namespace supabaseApi
 */

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Venues", "User", "Bookings"],
  endpoints: (builder) => ({
    /**
     * Fetches all venues with optional limit and category filters.
     *
     * @method getVenues
     * @memberOf supabaseApi
     * @param {object} arg Contains limit and category. Limit specifies the number of venues to fetch. Category specifies the type of venues to fetch.
     * @returns {Promise} Promise object representing an array of venues.
     */

    getVenues: builder.query({
      queryFn: async ({ limit, category }) => {
        console.log(category);
        if (limit) {
          const { data, error } = await supabase
            .from("venues")
            .select("*")
            .limit(limit);
          if (error) {
            throw { error };
          }

          return { data };
        }
        if (category) {
          const { data, error } = await supabase
            .from("venues")
            .select("*")
            .eq("type", category);
          if (error) {
            throw { error };
          }
          return { data };
        }
        const { data, error } = await supabase.from("venues").select("*");
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),

    /**
     * Fetches a single venue by its id.
     *
     * @method getSingleVenue
     * @memberOf supabaseApi
     * @param {number} id ID of the venue to fetch.
     * @returns {Promise} Promise object representing a single venue.
     */
    getSingleVenue: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),

    /**
     * Fetches all venues within a specific geo-bound.
     *
     * @method getOnMapVenues
     * @memberOf supabaseApi
     * @param {Array} bounds Array of four numbers representing the boundary of the area to fetch venues from.
     * @returns {Promise} Promise object representing an array of venues.
     */
    getOnMapVenues: builder.query({
      queryFn: async (bounds) => {
        const { data, error } = await supabase.rpc("venues_within_bounds", {
          min_lat: bounds[1],
          min_lng: bounds[0],
          max_lat: bounds[3],
          max_lng: bounds[2],
        });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
    }),

    /**
     * Fetches the daily income for the current week.
     *
     * @method getIncomeDailyWeek
     * @memberOf supabaseApi
     * @param {number} userId ID of the user for which to fetch income.
     * @returns {Promise} Promise object representing daily income data in the form {date:dd-mm-yy, income: number}..
     */
    getIncomeDailyWeek: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase.rpc("week_daily_income", {
          user_id: userId,
        });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["bookings"],
    }),

    /**
     * Fetches the daily income for the current month.
     *
     * @method getIncomeDailyMonth
     * @memberOf supabaseApi
     * @param {number} userId ID of the user for which to fetch income.
     * @returns {Promise} Promise object representing daily income data  in the form {date:dd-mm-yy, income: number}..
     */
    getIncomeDailyMonth: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase.rpc("month_daily_income", {
          user_id: userId,
        });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["bookings"],
    }),

    /**
     * Fetches the monthly income for the current year.
     *
     * @method getIncomeMonthYear
     * @memberOf supabaseApi
     * @param {number} userId ID of the user for which to fetch income.
     * @returns {Promise} Promise object representing monthly income data in the form {date:mm-yyyy, income: number}.
     */
    getIncomeMonthYear: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase.rpc("year_month_income", {
          user_id: userId,
        });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["bookings"],
    }),

    /**
     * Fetches a specific user profile.
     *
     * @method getUser
     * @memberOf supabaseApi
     * @param {number} userId The ID of the user to fetch.
     * @returns {Promise} Promise object representing the user profile data.
     */

    getUser: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["User"],
    }),

    /**
     * Fetches all venues owned by a specific user.
     *
     * @method getUserVenues
     * @memberOf supabaseApi
     * @param {number} userId The ID of the user whose venues to fetch.
     * @returns {Promise} Promise object representing the user's venue data.
     */

    getUserVenues: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("owner_id", userId);
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["Venues"],
    }),

    /**
     * Fetches booking details for the owner and venue.
     *
     * @method getOwnersBookings
     * @memberOf supabaseApi
     * @param {number} userId The ID of the user to fetch booking details for.
     * @returns {Promise} Promise object representing the booking details data.
     */

    getOwnersBookings: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .rpc("get_bookings_with_owner_and_venue_details", { user_id: userId })
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
      providesTags: ["Bookings"],
    }),

    /**
     * Get owners venue task for today. inclues a object with the venues the have something happening current date, like checkin and chekout.
     *
     * @method logIn
     * @memberOf supabaseApi
     * @param {Object} owner_id The user's id.
     * @returns {Promise[]} Promise object representing the user's venues with tasks for totday.
     */
    getTodaysChekinChekout: builder.query({
      queryFn: async (owner_id) => {
        const { data, error } = await supabase.rpc(
          "get_checkins_checkouts_today",
          { owner_id: owner_id }
        );
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
    }),

    /**
     * Logs in a user.
     *
     * @method logIn
     * @memberOf supabaseApi
     * @param {Object} credentials The user's credentials.
     * @returns {Promise} Promise object representing the user's authentication data.
     */
    logIn: builder.mutation({
      queryFn: async (credentials) => {
        const { data, error } = await supabase.auth.signInWithPassword(
          credentials
        );
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log(data);
        return { data };
      },
    }),

    /**
     * Signs up a new user.
     *
     * @method signUp
     * @memberOf supabaseApi
     * @param {Object} userDetails The user's details.
     * @returns {Promise} Promise object representing the new user's data.
     */
    signUp: builder.mutation({
      queryFn: async ({ email, password, name, is_host }) => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              name: name,
              is_host: is_host,
            },
          },
        });

        if (error) {
          console.log(error);
          throw error;
        }
        return { data };
      },
    }),

    /**
     * Deletes a venue.
     *
     * @method deleteVenue
     * @memberOf supabaseApi
     * @param {number} id The ID of the venue to delete.
     * @returns {Promise} Promise object that resolves when the venue has been deleted.
     */
    deleteVenue: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("venues")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log("tst", data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
    }),

    /**
     * Books a venue.
     *
     * @method bookVenue
     * @memberOf supabaseApi
     * @param {Object} bookingDetails Details of the booking.
     * @returns {Promise} Promise object that resolves when the venue has been booked.
     */
    bookVenue: builder.mutation({
      queryFn: async ({ from, to, user_id, id }) => {
        const { data, error } = await supabase
          .from("bookings")
          .insert({
            booking_start_date: from.toString(),
            booking_end_date: to.toString(),
            booked_by: user_id,
            venue_id: id,
          })
          .select()
          .single();
        if (error) {
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
    }),

    /**
     * Deletes a booking.
     *
     * @method deleteBooking
     * @memberOf supabaseApi
     * @param {number} id The ID of the booking to delete.
     * @returns {Promise} Promise object that resolves when the booking has been deleted.
     */
    deleteBooking: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("bookings")
          .delete()
          .eq("id", id);
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log("tst", data);
        return { data };
      },
      invalidatesTags: ["Venues", "Bookings", "User"],
    }),
    /**
     * Updates a booking status.
     *
     * @method updateBookingStatus
     * @memberOf supabaseApi
     * @param {Object} bookingStatus Details of the booking status to update.
     * @returns {Promise} Promise object that resolves when the booking status has been updated.
     */
    updateBookingStatus: builder.mutation({
      queryFn: async ({ status, bookingId }) => {
        const { data, error } = await supabase
          .from("bookings")
          .update({ status: status })
          .eq("id", bookingId)
          .select();
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Bookings"],
    }),

    /**
     * Gets a user's avatar image.
     *
     * @method getAvatarImage
     * @memberOf supabaseApi
     * @param {number} userId The ID of the user to fetch avatar for.
     * @returns {Promise} Promise object representing the avatar image data.
     */
    getAvatarImage: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase.storage
          .from("avatar")
          .getPublicUrl(`${userId}/profile.png`);
        if (error) {
          console.log(error);
          throw { error };
        }
        console.log(data);
        return { data };
      },
    }),

    /**
     * Fetches the location of the API.
     *
     * @method getApiLocation
     * @memberOf supabaseApi
     * @returns {Promise} Promise object representing the API's location data.
     */
    getApiLocation: builder.query({
      queryFn: async () => {
        try {
          const response = await fetch("https://ipapi.co/json");
          const data = await response.json();
          return { data };
        } catch (error) {
          console.log(error);
          throw { error };
        }
      },
    }),

    /**
     * Publishes a venue.
     *
     * @method publishVenue
     * @memberOf supabaseApi
     * @param {Object} venueDetails Details of the venue to publish.
     * @returns {Promise} Promise object that resolves when the venue has been published.
     */
    publishVenue: builder.mutation({
      queryFn: async ({
        user_id,
        location,
        meta,
        title,
        description,
        price_per_night,
        max_guests,
        type,
      }) => {
        const { data, error } = await supabase
          .from("venues")
          .insert({
            owner_id: user_id,
            location: location,
            title: title,
            description: description,
            price_per_night: price_per_night,
            max_guest: max_guests,
            type: type,
            meta: meta,
          })
          .select()
          .single();
        if (error) {
          throw { error };
        }
        console.log(data);
        return { data };
      },
      invalidatesTags: ["Venues"],
    }),

    /**
     * Uploads files to a specified location.
     *
     * @method uploadFiles
     * @memberOf supabaseApi
     * @param {Object} fileDetails Details of the file to upload, including file object, venue_id, and user_id.
     * @returns {Promise} Promise object that resolves with the response data when the file has been uploaded.
     */
    uploadFiles: builder.mutation({
      queryFn: async ({ file, venue_id, user_id }) => {
        const { data, error } = await supabase.storage
          .from("venue_media")
          .upload(`${user_id}/${venue_id}/${file.name}${Date.now()}`, file);
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),

    /**
     * Updates a venue.
     *
     * @method updateVenue
     * @memberOf supabaseApi
     * @param {Object} updateDetails Details of the update to perform, including type, media, and venue_id.
     * @returns {Promise} Promise object that resolves when the venue has been updated.
     */
    updateVenue: builder.mutation({
      queryFn: async ({ type, media, venue_id }) => {
        if (type === "addMedia") {
          const { data, error } = await supabase
            .from("venues")
            .update({ media: media })
            .eq("id", venue_id)
            .select();
          if (error) {
            throw { error };
          }
          return { data };
        }
      },
      invalidatesTags: ["Venues"],
    }),

    /**
     * Likes a venue.
     *
     * @method like
     * @memberOf supabaseApi
     * @param {Object} likeDetails Details for liking a venue, including type, venue_id, and user_id.
     * @returns {Promise} Promise object that resolves when the venue has been liked.
     */

    like: builder.mutation({
      queryFn: async ({ venue_id, user_id, usersLikedVenues }) => {
        let likedVenues = [...usersLikedVenues];

        if (likedVenues.includes(venue_id)) {
          likedVenues = likedVenues.filter((id) => id !== venue_id);
        } else {
          likedVenues.push(venue_id);
        }

        const { data: updatedData, error: updateError } = await supabase
          .from("profiles")
          .update({ liked_venues: likedVenues })
          .eq("id", user_id);

        if (updateError) {
          throw { updateError };
        }

        return { updatedData };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetSingleVenueQuery,
  useGetOnMapVenuesQuery,
  useGetUserQuery,
  useGetUserVenuesQuery,
  useGetOwnersBookingsQuery,
  useGetTodaysChekinChekoutQuery,
  useGetIncomeDailyWeekQuery,
  useGetIncomeDailyMonthQuery,
  useGetIncomeMonthYearQuery,
  useLogInMutation,
  useSignUpMutation,
  useDeleteVenueMutation,
  useBookVenueMutation,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  usePublishVenueMutation,
  useUploadFilesMutation,
  useGetAvatarImageQuery,
  useGetApiLocationQuery,
  useUpdateVenueMutation,
  useLikeMutation,
} = supabaseApi;

/** The main export of the supabaseApi object */
export { supabaseApi };
