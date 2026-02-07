import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
