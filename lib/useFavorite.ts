import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { sendCustomEvent } from "@excitare/analytics";

export function useFavorite(key: string, code: string) {
  const [state, setState] = useLocalStorage(key, val =>
    Array.isArray(val) ? val : []
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  const isFavorited = state.includes(code);

  const doFavorite = useCallback(() => {
    sendCustomEvent(code, "doFavorite");
    setState([...stateRef.current, code]);
  }, []);

  const doUnfavorite = useCallback(() => {
    sendCustomEvent(code, "doUnfavorite");
    setState(stateRef.current.filter(el => el !== code));
  }, []);

  return [isFavorited, doFavorite, doUnfavorite, state] as [
    boolean,
    () => void,
    () => void,
    any[]
  ];
}
