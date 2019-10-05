import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorite(key: string, code: string) {
  const [state, setState] = useLocalStorage(key, val =>
    Array.isArray(val) ? val : []
  );

  const isFavorited = Array.isArray(state) && state.includes(code);

  const doFavorite = useCallback(() => {
    if (!Array.isArray(state)) {
      setState([code]);
    } else {
      setState([...state, code]);
    }
  }, [state]);

  const doUnfavorite = useCallback(() => {
    if (!Array.isArray(state)) {
      setState([]);
    } else {
      setState(state.filter(el => el !== code));
    }
  }, [state]);

  return [isFavorited, doFavorite, doUnfavorite, state] as [
    boolean,
    () => void,
    () => void,
    any[]
  ];
}
