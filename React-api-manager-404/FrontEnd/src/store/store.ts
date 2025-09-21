import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import postsReducer from "./features/Posts/PostsSlice";
import { injectStore } from "../apiService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

injectStore(store);

export default store;
