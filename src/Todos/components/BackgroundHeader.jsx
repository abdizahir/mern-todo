// ...existing code...
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/themeSlice";
import { logout } from "../store/authSlice";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const BackgroundHeader = () => {
  const sun = "images/icon-sun.svg";
  const moon = "images/icon-moon.svg";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const {user} = useSelector((state) => state.auth)
  console.log(user);
  const handleLogout = async () => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(logout()); 
    navigate("/auth", { replace: true });
  }
};

  return (
    <section
      className={`bg-cover h-50 ${
        theme === "dark"
          ? "bg-[url('images/bg-mobile-dark.jpg')]"
          : "bg-[url('images/bg-mobile-light.jpg')]"
      }`}
    >
      <article className="flex items-center justify-between py-10 px-7">
        <div>
          <h1 className="text-[24px] text-white font-bold tracking-[10px]">
            TODO
          </h1>
          {user && (
            <p className="mt-1 text-xs text-white/90">Welcome, {user.name}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/30"
            >
              Logout
            </button>
          )}

          <button
            aria-label="Toggle theme"
            onClick={() => dispatch(toggleTheme())}
          >
            <img
              className="w-5 h-5"
              src={theme === "dark" ? sun : moon}
              alt=""
            />
          </button>
        </div>
      </article>
    </section>
  );
};

export default BackgroundHeader;
// ...existing code...
