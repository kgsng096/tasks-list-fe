import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useTaskCache } from "./taskCache";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState }) => {
    const state: any = getState();
    const csrfToken = state.csrf.token;
    const accessToken = Cookies.get("accessToken");

    if (!csrfToken) throw new Error("CSRF token missing. Please login again.");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/tasks`, {
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
    const data = await res.json();
    useTaskCache.getState().setTasks(data);
    return data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskName: string, { getState }) => {
    const state: any = getState();
    const csrfToken = state.csrf.token;
    const accessToken = Cookies.get("accessToken");

    if (!csrfToken) throw new Error("CSRF token missing. Please login again.");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/tasks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ name: taskName }),
    });
    return res.json();
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, name }: { id: string; name: string }, { getState }) => {
    const state: any = getState();
    const csrfToken = state.csrf.token;
    const accessToken = Cookies.get("accessToken");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/tasks/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!res.ok) throw new Error("Failed to update task");
    return { id, name };
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.tasks[idx].name = action.payload.name;
        }
      });
  },
});

export default taskSlice.reducer;
