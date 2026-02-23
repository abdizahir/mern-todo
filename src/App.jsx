import React, { Suspense, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./Todos/pages/AuthPage";
import { checkSession } from "./Todos/store/authSlice";

const TodoPage = React.lazy(() => import("./Todos/pages/TodoPage"));

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { user, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  const bgTheme = theme === "dark" ? "bg-navy-950" : "bg-purple-300";

  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: "/", element: <Navigate to={user ? "/todos" : "/auth"} replace /> },
        { path: "/auth", element: user ? <Navigate to="/todos" replace /> : <AuthPage /> },
        {
          path: "/todos",
          element: user ? (
            <Suspense fallback={<div>Loading...</div>}>
              <TodoPage />
            </Suspense>
          ) : (
            <Navigate to="/auth" replace />
          ),
        },
        { path: "*", element: <Navigate to={user ? "/todos" : "/auth"} replace /> },
      ]),
    [user]
  );

  if (!authChecked) return <main className={`min-h-screen ${bgTheme}`} />;

  return (
    <main className={`min-h-screen ${bgTheme}`}>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;