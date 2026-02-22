import { useState } from "react";

import BackgroundHeader from "../components/BackgroundHeader";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetTodosState } from "../store/todoSlice.js";
import { loginUser } from "../store/authSlice";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // const endpoint = isSignup ? "/signup" : "/login";

    try {
      const action = await dispatch(loginUser(payload));

      if (loginUser.rejected.match(action)) {
        console.log(action.payload || "Login failed");
        return;
      }

      form.reset();
      dispatch(resetTodosState());
      navigate("/todos", { replace: true });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundHeader />
      <section
        className={`mx-auto mt-8 w-[90%] max-w-md rounded-xl bg-white p-5 shadow-lg sm:p-6`}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {isSignup ? "Sign up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup ? <SignupForm /> : <LoginForm />}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-purple-600 py-2 font-medium text-white hover:bg-purple-700"
          >
            {loading ? "Please wait..." : isSignup ? "Sign up" : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsSignup((prev) => !prev)}
          className="mt-3 w-full text-sm text-purple-600 hover:underline"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </button>
      </section>
    </>
  );
};

export default AuthPage;
