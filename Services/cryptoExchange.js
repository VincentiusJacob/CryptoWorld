import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coingecko.p.rapidapi.com/exchanges";

export const exchange = createApi({
  reducerPath: "cryptoExchange",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { useState }) => {
      headers.set(
        "X-RapidAPI-Key",
        "de57958632msh8c052418fa4dbdcp176316jsn3bfca6a1d83d"
      ),
        headers.set("X-RapidAPI-Host", "coingecko.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExchange: builder.query({
      query: (count) => `?per_page=${count}`,
    }),
  }),
});

export const { useGetExchangeQuery } = exchange;
