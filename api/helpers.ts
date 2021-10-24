import { NextApiRequest, NextApiResponse } from "next";
import * as Sentry from "@sentry/node";

export function catchError(
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.NODE_ENV === "production",
  });
  Sentry.setExtra("now-deployment-url", req.headers["x-now-deployment-url"]);
  Sentry.setExtra("now-trace", req.headers["x-now-trace"]);
  Sentry.setTag("environment", "api");
  Sentry.captureException(err);

  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return sendError(res, 500, err.message);
  }

  return sendError(res, 500, "Something bad has happened");
}

export function sendError(
  res: NextApiResponse,
  status: number,
  message: string
) {
  res.status(status).json({
    error: message,
  });
}

export function isNotFoundError(err: any) {
  return err.statusCode === 404;
}
