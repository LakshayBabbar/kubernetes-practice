import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoonStar } from "lucide-react";
import { Sun } from "lucide-react";
import { apiUrl } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const router = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || !theme) {
      setDarkTheme(false);
    } else {
      setDarkTheme(true);
      document.documentElement.classList.toggle("dark", true);
    }
  }, []);

  const themeHandler = () => {
    if (darkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkTheme(!darkTheme);
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch(apiUrl + "/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setIsAuth(false);
      router("/auth?mode=login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 shadow-md flex items-center justify-center z-50">
      <ul className="flex items-center gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuth ? (
          <>
            <li>
              <Link to="/auth?mode=login">Login</Link>
            </li>
            <li>
              <Link to="/auth?mode=signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        )}
        <li>
          <button
            onClick={themeHandler}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-neutral-400 dark:border-neutral-800 bg-[rgba(153,140,140,0.27)]"
          >
            {darkTheme ? (
              <Sun className="size-4" />
            ) : (
              <MoonStar className="size-4" />
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
