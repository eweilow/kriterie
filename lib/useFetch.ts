import { useRef } from "react";

const fetchCache = new Map<string, Promise<Response>>();
const resolvedCache = new Map<string, any>();
const errorCache = new Map<string, any>();

export function useFetch<T = any>(url: string) {
  const promiseRef = useRef<Promise<Response>>(null);

  if (promiseRef.current == null) {
    if (fetchCache.has(url)) {
      promiseRef.current = fetchCache.get(url);
    } else {
      promiseRef.current = fetch(url)
        .then((res) => res.json())
        .then((value) => {
          resolvedCache.set(url, value);
          return value;
        })
        .catch((err) => {
          errorCache.set(url, err);
          throw err;
        });
      fetchCache.set(url, promiseRef.current);
    }
  }

  if (errorCache.has(url)) {
    throw errorCache.get(url);
  }
  if (resolvedCache.has(url)) {
    return resolvedCache.get(url) as T;
  }
  throw promiseRef.current;
}
