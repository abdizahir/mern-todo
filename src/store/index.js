import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Todos/store/todoSlice";
import themeReducer from "../Todos/store/themeSlice";
import authReducer from "../Todos/store/authSlice";

const store = configureStore({
  reducer: { todos: todoReducer, theme: themeReducer, auth: authReducer },
});

export default store;
