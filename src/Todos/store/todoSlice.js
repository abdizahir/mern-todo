import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/todos";

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to add todo");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (filter = "all", { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}?filter=${filter}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch todos");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error("Failed to toggle todo");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const clearCompletedTodos = createAsyncThunk(
  "todos/clearCompletedTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/completed`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to clear completed todos");
      return true;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  allTodos: [],
  filter: "all",
  isLoading: false
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
    resetTodosState (state) {
      state.allTodos = [],
      state.filter = "all"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.allTodos.unshift(action.payload);
      })
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTodos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.allTodos = state.allTodos.filter((t) => t._id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const updated = action.payload;
        const i = state.allTodos.findIndex((t) => t._id === updated._id);
        if (i !== -1) state.allTodos[i] = updated;
      })
      .addCase(clearCompletedTodos.fulfilled, (state) => {
        state.allTodos = state.allTodos.filter((t) => !t.completed);
      });
  },
});

export const { setFilter, reorderTodos, resetTodosState } = todoSlice.actions;
export default todoSlice.reducer;
