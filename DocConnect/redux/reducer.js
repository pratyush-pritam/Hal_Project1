import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("loadUserFail", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  builder.addCase("logOutSuccess", (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
  });
});
