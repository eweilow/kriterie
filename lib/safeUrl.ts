import { IncomingMessage } from "http";

export function getSafeUrl(url: string, req?: IncomingMessage) {
  return `${
    req
      ? `${
          req.headers.host.split(":")[0] === "localhost" ||
          req.headers.host.split(":")[0].startsWith("192.168.")
            ? "http"
            : "https"
        }://${req.headers.host}`
      : ""
  }${url}`;
}
