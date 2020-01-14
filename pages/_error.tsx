import NextError, { ErrorProps } from "next/error";
import * as Sentry from "@sentry/node";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

function captureEvent(err: any, req?: any) {
  Sentry.withScope(scope => {
    scope.setTag(
      "environment",
      typeof window === "undefined" ? "frontend:server" : "frontend:browser"
    );
    if (req != null) {
      scope.setExtra("now-deployment-url", req.headers["x-now-deployment-url"]);
      scope.setExtra("now-trace", req.headers["x-now-trace"]);
      scope.addEventProcessor(function(event) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Handlers } = require("@sentry/node");
        return Handlers.parseRequest(event, req);
      });
    }
    if (err.statusCode != null) {
      scope.setExtra("statusCode", err.statusCode);
    }
    Sentry.captureException(err);
  });
}

// https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
const KriterieError: NextPage<
  ErrorProps & { hasGetInitialPropsRun: boolean; err: any }
> = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    captureEvent(err);
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

KriterieError.getInitialProps = async ctx => {
  const { res, req, err, asPath } = ctx;

  const errorInitialProps = await NextError.getInitialProps(ctx);

  const initialProps = {
    ...errorInitialProps,
    statusCode:
      err && err.statusCode == 404 ? 404 : errorInitialProps.statusCode,
    hasGetInitialPropsRun: true
  };

  if (initialProps.statusCode === 404) {
    return initialProps;
  }

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404, hasGetInitialPropsRun: true } as any;
    }
  }

  if (err) {
    captureEvent(err, req);
    return initialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing 'err' data at path: ${asPath}`)
  );

  return initialProps;
};

export default KriterieError;
