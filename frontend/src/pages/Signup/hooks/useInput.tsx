import { useState, useCallback } from 'react';

const useInput = (initialValue: string) => {
  const [input, setInput] = useState<string>(initialValue);

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    [setInput]
  );

  return { input, handleInput };
};

export default useInput;
