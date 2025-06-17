import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "error",
  vertical: "top",
  horizontal: "center",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.vertical = action.payload.vertical || "top";
      state.horizontal = action.payload.horizontal || "center";
    },
    clearAlert: (state) => {
      state.open = false;
      state.message = "";
      state.severity = "";
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
