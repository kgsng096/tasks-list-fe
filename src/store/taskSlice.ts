import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useTaskCache } from "./taskCache";
import Cookies from "js-cookie";

async function getCsrfToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/csrf-token`, {
    credentials: "include", // important if your backend uses cookies
  });
  const data = await res.json();
  return data.csrfToken; // adjust this according to your backend's response
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const csrfToken = await getCsrfToken();
  const accessToken = Cookies.get("accessToken"); // get token from cookie

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
});

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
      });
  },
});

export default taskSlice.reducer;
