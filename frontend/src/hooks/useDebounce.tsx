import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleDebounceValue = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handleDebounceValue);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
