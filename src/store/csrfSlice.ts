import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../lib/store";

interface CsrfState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CsrfState = {
  token: null,
  status: "idle",
  error: null,
};

export const fetchCsrfToken = createAsyncThunk(
  "csrf/fetchCsrfToken",
  async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/csrf-token`, {
      credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
  }
);

const csrfSlice = createSlice({
  name: "csrf",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCsrfToken.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.token = action.payload;
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(fetchCsrfToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCsrfToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch CSRF token";
      });
  },
});

export const { clearToken } = csrfSlice.actions;
export const selectCsrfToken = (state: RootState) => state.csrf.token;
export const selectCsrfStatus = (state: RootState) => state.csrf.status;

export default csrfSlice.reducer;
