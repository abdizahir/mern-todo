import { useSelector } from "react-redux";
import AuthPage from "./Todos/pages/AuthPage";
// import TodoPage from "./Todos/pages/TodoPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";

const TodoPage = React.lazy(() => import('./Todos/pages/TodoPage'));

const router = createBrowserRouter([
  {path: "/", element: <Navigate to="/auth" replace />},
  {path: "/auth", element: <AuthPage />},
  {path: "/todos", element: (
    <Suspense fallback={<div>Loading...</div>}>
       <TodoPage />
    </Suspense>
  )},
])


function App() {
  const theme = useSelector((state) => state.theme.mode);
  const bgTheme = theme === 'dark' ? "bg-navy-950" : "bg-purple-300";
  return (
    <main className={`h-screen ${bgTheme}`}>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
