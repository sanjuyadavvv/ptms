import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = import.meta.env.VITE_API_URL;


export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ token, desiredRole }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/googlelogin`,
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
