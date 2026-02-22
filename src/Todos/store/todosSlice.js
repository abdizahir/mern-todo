// import { createSlice } from "@reduxjs/toolkit";

// const todoSlice = createSlice({
//   name: "todos",
//   initialState: {
//     allTodos: [],
//     filter: "all",
//   },
//   reducers: {
//     addTodo: (state, action) => {
//       const payload = { ...action.payload, completed: action.payload.completed ?? false };
//       state.allTodos = [...state.allTodos, payload];
//     },
//     deleteTodo: (state, action) => {
//       state.allTodos = state.allTodos.filter(
//         (item) => item._id !== action.payload._id,
//       );
//     },
//     editTodo: (state, action) => {
//       state.allTodos = state.allTodos.map((item) =>
//         item._id === action.payload._id
//           ? { ...item, todo: action.payload.todo }
//           : item,
//       );
//     },
//     toggleTodo: (state, action) => {
//       const todo = state.allTodos.find(todo => todo.id === action.payload._id);;
//       if(todo) {
//         todo.completed = !todo.completed;
//       }
//     },
//     clearCompleted: (state) => {
//       state.allTodos = state.allTodos.filter(todo => !todo.completed);
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     }
//   },
// });

// export const { addTodo, deleteTodo, editTodo, toggleTodo, clearCompleted, setFilter } = todoSlice.actions;
// export default todoSlice.reducer;
