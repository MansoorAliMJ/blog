import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_base_url,
  }),
  endpoints: (builder) => ({
    getBlogPosts: builder.query({
      query: ({ start, end }) => {
        return {
          url: `/sample-data/blog-posts?offset=${start}&limit=${end}`,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.blogs.push(...newItems.blogs);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetBlogPostsQuery } = blogApi;
