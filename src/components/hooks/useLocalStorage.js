import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setStateLocalStorage = (newState) => {
    window.localStorage.setItem(key, JSON.stringify(newState));
    return setState(newState);
  };

  return [state, setStateLocalStorage];
};
