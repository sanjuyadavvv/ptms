import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;


export const fetchManagerProjects = createAsyncThunk(
  "project/fetchManagerProjects",
  async (_, thunkAPI) => {
    try {
      const { user, token } = thunkAPI.getState().auth;

      const res = await axios.get(
        `${baseURL}/api/auth/manager/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch projects");
    }
  }
);
