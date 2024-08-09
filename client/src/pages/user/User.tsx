import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useFetch from "../../hooks/usefetch";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../utils";

const User = () => {
  const { data, error, loading } = useFetch("/user");
  const router = useNavigate();
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="mt-28 text-xl text-center">{error}</p>;

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
      router("/auth?mode=login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main>
      <h1 className="text-2xl text-center mt-28">
        Welcome, {data?.user?.name}
      </h1>
      <div className="mt-10 text-center">
        <p>Email: {data?.user?.email}</p>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="p-2 rounded-md border border-neutral-700 w-20"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default User;
