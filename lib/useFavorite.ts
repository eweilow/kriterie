import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import * as Fathom from "fathom-client";

export function useFavorite(key: string, code: string) {
  const [state, setState] = useLocalStorage(key, val =>
    Array.isArray(val) ? val : []
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  const isFavorited = state.includes(code);

  const doFavorite = useCallback(() => {
    Fathom.trackGoal("FWI8FJXC", 0);
    setState([...stateRef.current, code]);
  }, []);

  const doUnfavorite = useCallback(() => {
    Fathom.trackGoal("L1PQNAAK", 0);
    setState(stateRef.current.filter(el => el !== code));
  }, []);

  return [isFavorited, doFavorite, doUnfavorite, state] as [
    boolean,
    () => void,
    () => void,
    any[]
  ];
}
