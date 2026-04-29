import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: {
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      state.dialog = {
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type ?? "success",
      };
    },
    hideDialog: (state) => {
      state.dialog.isOpen = false;
    },
  },
});

export const { hideDialog, showDialog } = uiSlice.actions;

export default uiSlice.reducer;
