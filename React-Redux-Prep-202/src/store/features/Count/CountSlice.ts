import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const CountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    INCREMENT: (state) => {
      state.count++;
    },
    DECREMENT: (state) => {
      state.count--;
    },
    INCREMENTBYVALUE: (state, actions) => {
      state.count = state.count + actions.payload;
    },
    DECREMENTBYVALUE: (state, actions) => {
      state.count = state.count - actions.payload;
    },
  },
});

export default CountSlice.reducer;

export const { INCREMENT, DECREMENT, INCREMENTBYVALUE, DECREMENTBYVALUE } =
  CountSlice.actions;
