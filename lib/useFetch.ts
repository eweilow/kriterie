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
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `${url} responded not ok: ${res.status} ${res.statusText}`
            );
          }
          if (res.headers.get("content-type") !== "application/json") {
            throw new Error(
              `${url} responded with not JSON: ${res.headers.get(
                "content-type"
              )}`
            );
          }
          return res.json();
        })
        .then((value) => {
          resolvedCache.set(url, value);
          return value;
        })
        .catch((err) => {
          const mappedErr = new Error(`useFetch error: ${String(err)}`);
          errorCache.set(url, mappedErr);
          throw mappedErr;
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
