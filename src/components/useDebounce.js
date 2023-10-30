import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {

  const [debouncedTerm, setDebouncedTerm] = useState(value);

  useEffect(() => {

    const handler = setTimeout(() => {
      setDebouncedTerm(value);
    }, delay);

    return () => {
      clearTimeout(handler)
    }

  }, [value, delay])


  return debouncedTerm;
}