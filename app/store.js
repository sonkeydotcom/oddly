import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import bookingReducer from "../features/bookingSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    booking: bookingReducer,
  },
});

export default store;
