// bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [], // Array to store bookings
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload); // Add new booking to the state
    },
  },
});

export const { addBooking } = bookingSlice.actions;

export const selectBookingItems = (state) => state.booking.bookings;

export default bookingSlice.reducer;
