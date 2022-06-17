import { useState, useCallback } from 'react';

const useInput = (
  initialValue: string,
  validator: (inputText: string) => string
) => {
  const [input, setInput] = useState<string>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
      setErrorMessage(validator(event.target.value));
    },
    [setInput, validator, setErrorMessage]
  );

  return { input, handleInput, errorMessage };
};

export default useInput;
