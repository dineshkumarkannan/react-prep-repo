import { configureStore } from "@reduxjs/toolkit";
import CountReducer from "./features/Count/CountSlice";
import TaskReducer from "./features/Tasks/TasksSlice";
import UsersReducer from "./features/Users/UsersSlice";

// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    count: CountReducer,
    tasks: TaskReducer,
    users: UsersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
