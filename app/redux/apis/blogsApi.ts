import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { posts } from "@/app/component/types/types";
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_base_url,
  }),
  endpoints: (builder) => ({
    getBlogPosts: builder.query<posts, { start: number; end: number }>({
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
        currentCache.limit = newItems.limit;
        currentCache.message = newItems.message;
        currentCache.offset = newItems.offset;
        currentCache.blogs.push(...newItems.blogs);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getReltedBlogPosts: builder.query<posts, void>({
      query: () => {
        return {
          url: `/sample-data/blog-posts?offset=${0}&limit=${3}`,
        };
      },
    }),
  }),
});

export const { useGetReltedBlogPostsQuery, useGetBlogPostsQuery } = blogApi;
