import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "../../lib/supabase";

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Venues", "User", "Bookings"],
  endpoints: (builder) => ({
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
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  usePublishVenueMutation,
  useUploadFilesMutation,
  useGetAvatarImageQuery,
  useGetApiLocationQuery,
  useUpdateVenueMutation,
} = supabaseApi;
export { supabaseApi };
