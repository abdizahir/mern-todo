import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        return rejectWithValue(data?.message || "Signup failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        return rejectWithValue(data?.message || "Login failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Login failed");
    }
  }
);

export const checkSession = createAsyncThunk("auth/checkSession", async () => {
  const res = await fetch(`${API_BASE}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.user ?? null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // do not trust localStorage for auth state
    isLoading: false,
    error: null,
    authChecked: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.authChecked = true;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user ?? action.payload;
        state.authChecked = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
        state.authChecked = true;
      })
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(checkSession.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.authChecked = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;