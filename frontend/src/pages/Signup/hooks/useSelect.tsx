import { useState, useCallback } from 'react';

const useSelect = (initialValue: string) => {
  const [input, setInput] = useState<string>(initialValue);

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInput(event.target.value);
    },
    [setInput]
  );

  return { input, handleInput };
};

export default useSelect;
