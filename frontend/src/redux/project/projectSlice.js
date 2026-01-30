import { createSlice } from "@reduxjs/toolkit";
// import { fetchManagerProjects } from "./projectThunks.js";
import { fetchManagerProjects } from "./projectThunk";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManagerProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchManagerProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectProject } = projectSlice.actions;
export default projectSlice.reducer;
