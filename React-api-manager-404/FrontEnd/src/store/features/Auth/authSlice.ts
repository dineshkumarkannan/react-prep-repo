import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunk";

const authToken = "authToken";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  loading: false,
  error: "",
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = "";
      localStorage.removeItem(authToken);
    },
    loadFromStore: (state) => {
      const localDetail = localStorage.getItem(authToken);
      if (localDetail) {
        const { user, token, loggedIn } = JSON.parse(localDetail);
        state.user = user;
        state.token = token;
        state.loggedIn = loggedIn;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
        state.loading = false;
        state.error = action.error.message || "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loggedIn = true;
        localStorage.setItem(authToken, JSON.stringify(state));
      });
  },
});

export const { logout, loadFromStore } = authSlice.actions;
export default authSlice.reducer;
