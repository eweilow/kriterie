import { useLayoutEffect } from "react";

export function useTimedEffect(
  enabled: boolean,
  run: () => void,
  time: number
) {
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      if (!enabled) {
        return;
      }
      const id = setTimeout(() => {
        run();
      }, time);
      return () => clearTimeout(id);
    }, [enabled]);
  }
}
