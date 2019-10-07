import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";
import { isNotFoundError } from "../api/helpers";

export function throwNotFound(message: string) {
  const error = new Error(message);
  (error as any).statusCode = 404;

  throw error;
}

export function checkError(err: any, ctx: NextPageContext) {
  if (ctx.res != null && (err as any).statusCode === 404) {
    ctx.res.statusCode = 404;
  }
}

export function wrappedInitialProps<T>(
  cb: (ctx: NextPageContext) => Promise<T>
) {
  return async (ctx: NextPageContext) => {
    try {
      return await cb(ctx);
    } catch (err) {
      checkError(err, ctx);
      throw err;
    }
  };
}

export async function fetchAndParseJson<T>(
  message: string,
  url: string,
  init?: RequestInit
) {
  const res = await fetch(url, init);

  if (res.status === 404) {
    try {
      const json = await res.json();
      throwNotFound(json.error != null ? json.error : message);
    } catch (err) {
      if (isNotFoundError(err)) {
        throw err;
      }
      throwNotFound(message);
    }
  }

  if (res.headers.get("content-type").includes("application/json")) {
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "An unknown error has occurred");
    }
    return json as T;
  }

  throw new Error(
    `An unexpected error has occurred fetching JSON from '${url}': ${res.status} ${res.statusText}`
  );
}
