import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useFetch from "../../hooks/usefetch";

const User = () => {
  const { data, error, loading } = useFetch("/user");
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="mt-28 text-xl text-center">{error}</p>;

  return (
    <main>
      <h1 className="text-2xl text-center mt-28">
        Welcome, {data?.user?.name}
      </h1>
      <div className="mt-10 text-center">
        <p>Email: {data?.user?.email}</p>
      </div>
    </main>
  );
};

export default User;
