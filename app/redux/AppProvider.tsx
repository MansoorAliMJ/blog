"use client";
import React from "react";
import { Provider } from "react-redux";

import store from "./store";

const AppProvider = (props: { children: React.ReactNode }) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default AppProvider;
