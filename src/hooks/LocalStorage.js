import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue, normalize) {
  const [value, setValue] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key)) ?? initialValue;
      return normalize ? normalize(stored) : stored;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}