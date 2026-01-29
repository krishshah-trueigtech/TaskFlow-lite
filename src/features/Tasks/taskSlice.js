import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as TaskServices from "../../services/TaskServices";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await TaskServices.fetchTasks();
  return response;
});

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData) => {
    const newTask = await TaskServices.createTask(taskData);
    return newTask;
  },
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (taskData) => {
    await TaskServices.updateTask(taskData);
    return taskData;
  },
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  await TaskServices.deleteTask({ id });
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
    isModalOpen: false,
    editingTask: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.editingTask = action.payload ;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.editingTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (task) => task.id !== action.payload,
        );
      });
  },
});

export const { openModal, closeModal } = taskSlice.actions;
export default taskSlice.reducer;
