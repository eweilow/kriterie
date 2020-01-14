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
