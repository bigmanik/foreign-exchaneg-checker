import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // lazy initializer: read once on mount, same as your `load()` did
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  // mirror every change to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}