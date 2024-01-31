import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./apis/blogsApi";
import { productApi } from "./apis/productApi";

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(productApi.middleware),
});

export default store;
