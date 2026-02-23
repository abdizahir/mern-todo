// ...existing code...
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/themeSlice";
import { logout } from "../store/authSlice";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const BackgroundHeader = () => {
  const sun = `${import.meta.env.BASE_URL}images/icon-sun.svg`;
  const moon = `${import.meta.env.BASE_URL}images/icon-moon.svg`;
  const bgDarkMobile = `${import.meta.env.BASE_URL}images/bg-mobile-dark.jpg`;
  const bgLightMobile = `${import.meta.env.BASE_URL}images/bg-mobile-light.jpg`;
  const bgDarkDesktop = `${import.meta.env.BASE_URL}images/bg-desktop-dark.jpg`;
  const bgLightDesktop = `${import.meta.env.BASE_URL}images/bg-desktop-light.jpg`;

  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const {user} = useSelector((state) => state.auth)
  
   useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);

    if (media.addEventListener) media.addEventListener("change", handler);
    else media.addListener(handler);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", handler);
      else media.removeListener(handler);
    };
  }, []);

  const bgImage =
    theme === "dark"
      ? isDesktop
        ? bgDarkDesktop
        : bgDarkMobile
      : isDesktop
      ? bgLightDesktop
      : bgLightMobile;

  const handleLogout = async (e) => {
    e?.preventDefault?.();
  e?.stopPropagation?.();

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
      className={"relative z-50 bg-cover bg-center h-30"}
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <article className="relative z-50 flex items-center justify-between py-10 px-7">
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
          type="button"
            aria-label="Toggle theme"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleTheme());
            }}
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
