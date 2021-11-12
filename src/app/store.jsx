import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice/userSlice";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import UserServices from "../helper/userLocal";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

function Store({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Store;
