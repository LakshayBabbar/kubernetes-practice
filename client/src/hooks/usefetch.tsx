import { useEffect, useState } from "react";
import { apiUrl } from "../utils";

const useFetch = (path: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const req = await fetch(apiUrl + path, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const res = await req.json();
        if (res?.error) {
          throw new Error(res.error);
        }
        if (!req.ok) {
          throw new Error("Network response was not ok");
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
  }, [path]);

  return { data, loading, error };
};

export default useFetch;
