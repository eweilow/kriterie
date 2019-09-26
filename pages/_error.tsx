import NextError, { ErrorProps } from "next/error";
import * as Sentry from "@sentry/node";
import { NextPage } from "next";

function captureEvent(err: any) {
  Sentry.setTag(
    "environment",
    typeof window === "undefined" ? "frontend:server" : "frontend:browser"
  );
  if (err.statusCode != null) {
    Sentry.setExtra("statusCode", err.statusCode);
  }
  Sentry.captureException(err);
}

// https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
const KriterieError: NextPage<
  ErrorProps & { hasGetInitialPropsRun: boolean; err: any }
> = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    captureEvent(err);
  }

  return <NextError statusCode={statusCode} />;
};

KriterieError.getInitialProps = async ctx => {
  const { res, err, asPath } = ctx;

  const errorInitialProps = await NextError.getInitialProps(ctx);

  const initialProps = {
    ...errorInitialProps,
    statusCode:
      err && err.statusCode == 404 ? 404 : errorInitialProps.statusCode,
    hasGetInitialPropsRun: true
  };

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404, hasGetInitialPropsRun: true } as any;
    }
  }
  if (err) {
    captureEvent(err);
    return initialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing 'err' data at path: ${asPath}`)
  );

  return initialProps;
};

export default KriterieError;
