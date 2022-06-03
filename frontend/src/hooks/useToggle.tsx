import { useState } from 'react';

export default function useToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleCallback = () => {
    setIsEnabled((current) => !current);
  };
  return { isEnabled, toggleCallback };
}
