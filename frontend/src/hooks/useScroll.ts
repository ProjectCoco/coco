/* import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0);

  const listner = () => {
    setScrollY(window.pageYOffset);
  };

  const delay = 15;

  useEffect(() => {
    window.addEventListener('scroll', debounce(listner, delay));
    return () => {
      window.removeEventListener('scroll', listner);
    };
  });
  return {
    scrollY,
  };
}
 */
