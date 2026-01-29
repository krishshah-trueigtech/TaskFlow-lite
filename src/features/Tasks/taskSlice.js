import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    isModalOpen: false,
    editingTask: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.editingTask = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTask = null;
    },
  },
});

export const { openModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;