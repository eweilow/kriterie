import NextError, { ErrorProps } from "next/error";
import * as Sentry from "@sentry/node";
import { NextPage } from "next";

// https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
const KriterieError: NextPage<
  ErrorProps & { hasGetInitialPropsRun: boolean; err: any }
> = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextError statusCode={statusCode} />;
};

KriterieError.getInitialProps = async ctx => {
  const { res, err, asPath } = ctx;

  const errorInitialProps = await NextError.getInitialProps(ctx);

  const initialProps = {
    ...errorInitialProps,
    hasGetInitialPropsRun: true
  };

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404, hasGetInitialPropsRun: true } as any;
    }

    if (err) {
      Sentry.captureException(err);

      return initialProps;
    }
  } else {
    if (err) {
      Sentry.captureException(err);

      return initialProps;
    }
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return initialProps;
};
