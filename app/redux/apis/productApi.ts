import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { categories, product, products } from '@/app/component/types/types'
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      products,
      { page: number; search?: string; category?: string }
    >({
      query: ({ page, search, category }) => {
        return {
          url: `/products${`${
            !category
              ? search
                ? `/search?q=${search}&skip=${page * 10}&limit=24`
                : `?skip=${page * 10}&limit=24`
              : `/category/${category}`
          }`}`,
        }
      },
    }),
    getProduct: builder.query<product, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/products/${id}`,
        }
      },
    }),
    getCategories: builder.query<categories, void>({
      query: () => {
        return {
          url: `/products/categories`,
        }
      },
    }),

    getProductOnCategory: builder.query<products, { category: string }>({
      query: ({ category }) => {
        return {
          url: `/products/category/${category}`,
        }
      },
    }),
  }),
})

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductOnCategoryQuery,
} = productApi
