import { useCallback, useSyncExternalStore } from "react";

export function useLocalStorage<T>(key: string, transform: (val: any) => T) {
  const stringValue = useSyncExternalStore(
    (onChange) => {
      const changed = () => onChange();

      window.addEventListener("storage", changed);
      return function unsubscribe() {
        window.removeEventListener("storage", changed);
      };
    },
    function getSnapshot() {
      return localStorage.getItem(key);
    },
    function getServerSnapshot() {
      return null;
    }
  );

  const value = (() => {
    try {
      return transform(JSON.parse(stringValue));
    } catch (err) {
      return transform(null);
    }
  })();

  const updateValue = useCallback(
    (val: T) => {
      localStorage.setItem(key, JSON.stringify(val));
      window.dispatchEvent(new Event("storage"));
    },
    [key]
  );

  return [value as T, updateValue] as [T, (val: T) => void];
}
