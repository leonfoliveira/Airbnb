import { useState } from 'react';

export default function useDebounce(callback, delay) {
  const [debouncing, setDebouncing] = useState(false);

  return () => {
    if (!debouncing) {
      callback();
      setDebouncing(true);
      setTimeout(() => {
        setDebouncing(false);
      }, delay);
    }
  };
}
