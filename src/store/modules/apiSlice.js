import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "../../lib/supabase";

const supabaseApi = createApi({
  reducerPath: "SupabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getVenues: builder.query({
      queryFn: async () => {
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
          .eq("id", id);
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
    }),
    getOwnersBookings: builder.query({
      queryFn: async (userId) => {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("venue_owner", userId);
        if (error) {
          console.log(error);
          throw { error };
        }
        return { data };
      },
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
  useLogInMutation,
  useSignUpMutation,
} = supabaseApi;
export { supabaseApi };
