import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice"; 
import managerReducer from './managerredux/managerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
   manager: managerReducer,
  },
});
