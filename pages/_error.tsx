import * as Sentry from "@sentry/nextjs";
import { NextSeo } from "next-seo";

const KriterieError = ({ statusCode, err }) => {
  if (err && typeof window !== "undefined") {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

  return (
    <>
      <NextSeo
        title={
          statusCode === 404 ? "Sidan kan inte hittas" : "Ett fel har uppstått"
        }
      />
      <h1>
        {statusCode}:{" "}
        {statusCode === 404 ? "Sidan kan inte hittas" : "Ett fel har uppstått"}
      </h1>
    </>
  );
};

export default KriterieError;
