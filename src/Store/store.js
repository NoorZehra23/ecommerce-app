import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userSlice from "../features/userSlice";
import cartSlice from "../features/cartSlice";

// Combine your reducers
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

// Configure Redux Persist options
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // state slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Create a persisted store
export const persistor = persistStore(store);
