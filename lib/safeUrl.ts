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
    req.headers["now-deployment-url"] as string,
    req.headers.host
  );

  return `${
    req
      ? `${
          host.split(":")[0] === "localhost" ||
          host.split(":")[0].startsWith("192.168.")
            ? "http"
            : "https"
        }://${host}`
      : ""
  }${url}`;
}
