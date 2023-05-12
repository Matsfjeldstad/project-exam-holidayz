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
          console.log();
          throw { error };
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
} = supabaseApi;
export { supabaseApi };
