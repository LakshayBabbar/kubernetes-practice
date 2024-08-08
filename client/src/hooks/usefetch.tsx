import { useEffect, useState } from "react";

const useFetch = (path: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_PUBLIC_API_URL! + String(path) || path;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const req = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!req.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await req.json();
        if (res?.error) {
          throw new Error(res.error);
        }
        setLoading(false);
        setData(res);
      } catch (error) {
        setLoading(false);
        setError((error as any).message);
        setData(null);
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
