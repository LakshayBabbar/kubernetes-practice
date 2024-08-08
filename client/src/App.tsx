import LoadingSpinner from "./components/ui/LoadingSpinner";
import useFetch from "./hooks/usefetch";

const App = () => {
  const { data, error, loading } = useFetch("/api/data");

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Data: {data?.host}</h1>
      {error && <h1>Error: {error}</h1>}
    </div>
  );
};

export default App;
