import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../utils/index.ts";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useContext } from "react";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signup";
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const [errorMssg, setErrorMssg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const inputStyle =
    "w-full rounded-md border border-neutral-800 p-2 bg-transparent";

  useEffect(() => {
    if (mode !== "login" && mode !== "signup") {
      router("/auth?mode=signup");
    }
  }, [mode, router]);

  const valHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMssg(null);
    try {
      const req = await fetch(apiUrl + `/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (!req.ok || res.error) {
        throw new Error(res.error);
      }
      setLoading(false);
      setIsAuth(true);
      router("/profile");
    } catch (error) {
      setLoading(false);
      setErrorMssg((error as Error)?.message);
    }
  };

  return (
    <main className="flex h-screen justify-center items-center">
      <form className="flex flex-col gap-4 w-80" onSubmit={submitHandler}>
        <div>
          <h1 className="text-2xl text-blue-950 dark:text-blue-100 tracking-widest">
            {mode.toUpperCase()}
          </h1>
          <h2 className="mt-1 text-blue-950 dark:text-blue-100">
            {mode === "login" ? "Welcome back 👋" : "Create new account"}
          </h2>
        </div>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={valHandler}
            className={inputStyle}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={valHandler}
          className={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={valHandler}
          className={inputStyle}
          required
        />
        <button
          type="submit"
          className="p-2 border rounded-md bg-primary-foreground text-primary"
          disabled={loading}
        >
          Submit
        </button>
        {errorMssg && <p className="text-red-500">{errorMssg}</p>}
        <Link
          to={`/auth?mode=${mode === "login" ? "signup" : "login"}`}
          className="text-md text-blue-500 underline underline-offset-4"
        >
          {mode === "login"
            ? "Need an account? Signup"
            : "Already have an account? Login"}
        </Link>
      </form>
      <div className="fixed w-[90%] md:w-[70%] h-[18%] bg-gradient-to-r from-blue-800 to-purple-800 blur-[150px] rounded-xl -top-10 -left-20 -rotate-12 -z-1" />
      <div className="fixed w-[90%] md:w-[70%] h-[18%] bg-gradient-to-r from-blue-800 to-purple-800 blur-[150px] rounded-xl -bottom-10 -right-20 -rotate-12 -z-1" />
    </main>
  );
};

export default AuthPage;
