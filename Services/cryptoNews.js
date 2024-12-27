import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://crypto-news16.p.rapidapi.com/news/top/5";

export const cryptoNews = createApi({
  reducerPath: "cryptoNews",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "X-RapidAPI-Key",
        "de57958632msh8c052418fa4dbdcp176316jsn3bfca6a1d83d"
      );
      headers.set("X-RapidAPI-Host", "crypto-news16.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNews;
