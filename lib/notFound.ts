import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";

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
    throwNotFound(message);
  }
  const json = await res.json();
  return json as T;
}
