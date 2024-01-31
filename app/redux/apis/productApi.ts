import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categories, product, products } from "@/app/component/types/types";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<products, { page: number; search?: string }>({
      query: ({ page, search }) => {
        return {
          url: `/products?skip=${page * 10}&limit=20${
            search ? `&search=${search}` : ""
          }`,
        };
      },
    }),
    getProduct: builder.query<product, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/products/${id}`,
        };
      },
    }),
    getCategories: builder.query<categories, void>({
      query: () => {
        return {
          url: `/products/categories`,
        };
      },
    }),

    getProductOnCategory: builder.query<products, { category: string }>({
      query: ({ category }) => {
        return {
          url: `/products/category/${category}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductOnCategoryQuery,
} = productApi;
