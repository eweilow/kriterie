import createPersistedState from "use-persisted-state";
import { useEffect, useCallback } from "react";

const hookCache = new Map<string, ReturnType<typeof createPersistedState>>();
function getHook(key: string) {
  if (hookCache.has(key)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return hookCache.get(key)!;
  }
  const value = createPersistedState(key);
  hookCache.set(key, value);
  return value;
}

export function useFavorite(key: string, code: string) {
  const useFavoritesState = getHook(key);

  const [state, setState] = useFavoritesState(() => []);
  useEffect(() => {
    if (!Array.isArray(state)) {
      setState([]);
    }
  }, [state]);

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

  return [
    isFavorited,
    doFavorite,
    doUnfavorite,
    Array.isArray(state) ? state : []
  ] as [boolean, () => void, () => void, any[]];
}
