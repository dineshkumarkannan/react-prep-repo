import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import api from "../../../apiService";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    const respone = await api.get("/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return respone.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (body, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    const respone = await api.post("/posts", {
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });
    return respone.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (body, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    console.log(body);
    const respone = await api.put(`/posts/${body.id}`, {
      body: body,
      headers: { Authorization: `Bearer ${token}` },
    });
    return respone.data;
  }
);
