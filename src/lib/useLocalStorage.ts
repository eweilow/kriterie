import { useState, useMemo, useLayoutEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, transform: (val: any) => T) {
  const [stringValue, setStringValue] = useState<string>(null);

  const transformedValue = useMemo(() => {
    try {
      return transform(JSON.parse(stringValue));
    } catch (err) {
      return transform(null);
    }
  }, [stringValue]);

  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      setStringValue(localStorage.getItem(key));
      function onStorageEvent(evt: StorageEvent) {
        if (evt.key === key) {
          setStringValue(evt.newValue);
        }
      }
      window.addEventListener("storage", onStorageEvent);
      return () => {
        window.removeEventListener("storage", onStorageEvent);
      };
    });
  }

  const updateValue = useCallback(
    (val: T) => {
      localStorage.setItem(key, JSON.stringify(val));
      setStringValue(JSON.stringify(val));
    },
    [setStringValue]
  );

  return [transformedValue as T, updateValue] as [T, (val: T) => void];
}
