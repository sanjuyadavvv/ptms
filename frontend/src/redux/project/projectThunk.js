import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchManagerProjects = createAsyncThunk(
  "project/fetchManagerProjects",
  async (_, thunkAPI) => {
    try {
      const { user, token } = thunkAPI.getState().auth;

      const res = await axios.get(
        `http://localhost:3000/api/auth/manager/${user._id}`,
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
