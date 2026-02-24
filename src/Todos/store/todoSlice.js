import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Validate environment variable
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
if (!BASE_URL) {
  console.error('VITE_BACKEND_URL environment variable is not set in Vercel');
}
const API_URL = `${BASE_URL}/todos`;

// Fetch wrapper with timeout for mobile networks
async function fetchWithTimeout(url, options, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      mode: "cors",
      cache: "no-cache",
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Add Todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text, { rejectWithValue }) => {
    try {
      console.log('Adding todo to:', API_URL);
      
      const res = await fetchWithTimeout(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data?.message || "Failed to add todo");
      return data;
    } catch (err) {
      console.error('Add todo error:', {
        message: err.message,
        name: err.name,
        url: API_URL
      });
      
      if (err.name === 'AbortError') {
        return rejectWithValue("Request timeout - please check your connection");
      }
      if (err.message === 'Failed to fetch') {
        return rejectWithValue("Network error - please check if backend is accessible");
      }
      return rejectWithValue(err.message);
    }
  },
);

// Fetch Todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (filter = "all", { rejectWithValue }) => {
    try {
      const url = `${API_URL}?filter=${filter}`;
      console.log('Fetching from:', url);
      
      const res = await fetchWithTimeout(url, {
        credentials: "include",
      }, 15000);
      
      console.log('Response status:', res.status);
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data?.message || "Failed to fetch todos");
      return data;
    } catch (err) {
      console.error('Fetch todos error:', {
        message: err.message,
        name: err.name,
        url: `${API_URL}?filter=${filter}`
      });
      
      if (err.name === 'AbortError') {
        return rejectWithValue("Request timeout - please check your connection");
      }
      if (err.message === 'Failed to fetch') {
        return rejectWithValue("Cannot connect to server. Please check if backend is running.");
      }
      return rejectWithValue(err.message);
    }
  },
);

// Delete Todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to delete todo");
      return id;
    } catch (err) {
      console.error('Delete todo error:', err);
      
      if (err.name === 'AbortError') {
        return rejectWithValue("Request timeout");
      }
      if (err.message === 'Failed to fetch') {
        return rejectWithValue("Network error");
      }
      return rejectWithValue(err.message);
    }
  },
);

// Toggle Todo
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ completed }),
      });
      
      if (!res.ok) throw new Error("Failed to toggle todo");
      return await res.json();
    } catch (err) {
      console.error('Toggle todo error:', err);
      
      if (err.name === 'AbortError') {
        return rejectWithValue("Request timeout");
      }
      if (err.message === 'Failed to fetch') {
        return rejectWithValue("Network error");
      }
      return rejectWithValue(err.message);
    }
  },
);

// Clear Completed Todos
export const clearCompletedTodos = createAsyncThunk(
  "todos/clearCompletedTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/completed`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to clear completed todos");
      return true;
    } catch (err) {
      console.log('Clear completed error:', err);
      
      if (err.name === 'AbortError') {
        return rejectWithValue("Request timeout");
      }
      if (err.message === 'Failed to fetch') {
        return rejectWithValue("Network error");
      }
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  allTodos: [],
  filter: "all",
  isLoading: false,
  error: null, // Add error state to track errors
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    reorderTodos(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [moved] = state.allTodos.splice(sourceIndex, 1);
      state.allTodos.splice(destinationIndex, 0, moved);
    },
    resetTodosState(state) {
      state.allTodos = [];
      state.filter = "all";
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos cases
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTodos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch todos";
      })
      
      // Add Todo cases
      .addCase(addTodo.fulfilled, (state, action) => {
        state.allTodos.unshift(action.payload);
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload || "Failed to add todo";
      })
      
      // Delete Todo cases
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.allTodos = state.allTodos.filter((t) => t._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete todo";
      })
      
      // Toggle Todo cases
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const i = state.allTodos.findIndex((t) => t._id === updated._id);
        if (i !== -1) state.allTodos[i] = updated;
        state.error = null;
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle todo";
      })
      
      // Clear Completed cases
      .addCase(clearCompletedTodos.fulfilled, (state) => {
        state.allTodos = state.allTodos.filter((t) => !t.completed);
        state.error = null;
      })
      .addCase(clearCompletedTodos.rejected, (state, action) => {
        state.error = action.payload || "Failed to clear completed todos";
      });
  },
});

export const { setFilter, reorderTodos, resetTodosState, clearError } = todoSlice.actions;
export default todoSlice.reducer;