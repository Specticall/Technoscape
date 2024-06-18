import { useEffect, useState } from "react";

export default function useDebounce<T>(
  callback: React.SetStateAction<T>,
  delay: number
) {
  const [debounced, setDebounced] = useState<T | unknown>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return debounced;
}
