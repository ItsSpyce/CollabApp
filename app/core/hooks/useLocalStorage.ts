import { useState } from 'react';

function normalizeString(value: string) {
  if (value === 'true' || value === 'false') {
    return Boolean(value);
  }
  if (parseFloat(value).toString() === value) {
    return parseFloat(value);
  }
  if (parseInt(value).toString() === value) {
    return parseInt(value);
  }
  if (value === 'null') {
    return null;
  }
  if (value === 'undefined') {
    return void 0;
  }
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export default function useLocalStorage(key: string, initialValue: any) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? normalizeString(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = typeof value === 'function' ? value(stored) : value;
      setStored(valueToStore);
      if (valueToStore === null || typeof valueToStore === 'undefined') {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return [stored, setValue];
}
