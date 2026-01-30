// import { createSlice } from "@reduxjs/toolkit";
// // import { googleLogin } from "./authThunks";






// import { googleLogin } from "./authThunk.js";
// const initialState = {
//   user: null,       // {_id, name, email, role}
//   token: null,
//   isAuth: false,
//   loading: false,
//   error: null,
// };










// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuth = false;
//       localStorage.clear();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(googleLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuth = true;

//         // persist
//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem(
//           "user",
//           JSON.stringify(action.payload.user)
//         );
//       })
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;






import { createSlice } from "@reduxjs/toolkit";
import { googleLogin } from "./authThunk.js";

// 🔥 READ FROM LOCAL STORAGE
const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuth: !!tokenFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;

        // persist
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
