import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../apiService";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await api.post("/login", credentials);
  const data = response.data;
  return data;
});
