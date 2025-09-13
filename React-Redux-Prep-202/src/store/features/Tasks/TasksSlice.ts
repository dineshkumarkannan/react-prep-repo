import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

type Task = {
  id: string;
  etadate: string;
  detail: string;
  priority: string;
  state: "pending" | "completed";
  title: string;
};

const initialState: Task[] = [];

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    create_task: (state, action: any) => {
      const taskObj: Task = {
        ...action.payload,
        id: uuid(),
        state: "pending",
      };
      state.push(taskObj);
    },
    delete_task: (state, action: any) => {
      return state.filter((val) => val.id !== action.payload);
    },
    task_status_change: (state, action: any) => {
      return state.map((val) =>
        val.id === action.payload
          ? { ...val, state: val.state === "pending" ? "completed" : "pending" }
          : val
      );
    },
  },
});

export default tasks.reducer;

export const { create_task, delete_task, task_status_change } = tasks.actions;
