






// redux/manager/managerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Fetch projects assigned to manager
export const fetchManagerProjects = createAsyncThunk(
  "manager/fetchManagerProjects",
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
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch manager projects");
    }
  }
);

// Fetch tasks by project
export const fetchTasksByProject = createAsyncThunk(
  "manager/fetchTasksByProject",
  async (projectId, thunkAPI) => {
    try {
      const res = await axios.get(
        `${baseURL}/api/auth/task/project/${projectId}`
      );
      return res.data.tasks;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch project tasks");
    }
  }
);

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    projects: [],
    selectedProject: null,
    tasks: [],
    loadingProjects: false,
    loadingTasks: false,
    error: null,
  },
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
      state.tasks = [];
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Projects
      .addCase(fetchManagerProjects.pending, (state) => {
        state.loadingProjects = true;
      })
      .addCase(fetchManagerProjects.fulfilled, (state, action) => {
        state.loadingProjects = false;
        state.projects = action.payload;
      })
      .addCase(fetchManagerProjects.rejected, (state, action) => {
        state.loadingProjects = false;
        state.error = action.payload;
      })

      // Tasks
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loadingTasks = true;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loadingTasks = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loadingTasks = false;
        state.error = action.payload;
      });
  },
});

export const { selectProject, clearSelectedProject } =
  managerSlice.actions;

export default managerSlice.reducer;


