import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, SetState] = useState(() => {
    if (window.localStorage.getItem(key)) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setStateLocalStorage = (newState) => {
    window.localStorage.setItem(key, JSON.stringify(newState));
    SetState(newState);

    return [state, setStateLocalStorage];
  };
};
