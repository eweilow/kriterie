import { NextApiRequest, NextApiResponse } from "next";

export function catchError(
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    error: message
  });
}

export function isNotFoundError(err: any) {
  return err.statusCode === 404;
}
