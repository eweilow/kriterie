import { IncomingMessage } from "http";

function getFirstNonNull(...values: string[]) {
  for (const value of values) {
    if (value != null) {
      return value;
    }
  }
  return null;
}

export function getSafeUrl(url: string, req?: IncomingMessage) {
  const host = getFirstNonNull(
    req.headers != null ? (req.headers["now-deployment-url"] as string) : null,
    req.headers != null ? req.headers.host : null
  );

  return `${
    host != null
      ? `${
          host.split(":")[0] === "localhost" ||
          host.split(":")[0].startsWith("192.168.")
            ? "http"
            : "https"
        }://${host}`
      : ""
  }${url}`;
}
