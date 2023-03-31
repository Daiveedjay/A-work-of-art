import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // Use useRef to wrap an object/array arguement which is a useEffect dependency
  // const

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("The fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
          console.log(error.message);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isPending, error };
};
