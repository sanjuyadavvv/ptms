import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ token, desiredRole }, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/googlelogin",
        { token, desiredRole }
      );
      
      return res.data; // { token, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);
