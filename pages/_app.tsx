import App from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { configureAnalytics, PageTracking } from "@excitare/analytics";

import { GlobalNavbar } from "../components/globalNavbar";
import { GlobalFooter } from "../components/globalFooter";

import { TrackingQuestion } from "../components/cookieQuestion";

import Icons from "../generated/icons";
import { LayoutStyle } from "../components/layoutStyle";
import { Column } from "../components/column";
import { LoadingBar } from "../components/loadingIndicator/bar";
import * as Sentry from "@sentry/node";
import { defaultSeoConfiguration } from "../lib/next-seo.config";

if (process.env.NODE_ENV === "production") {
  configureAnalytics(process.env.ANALYTICS_ID);
}

// https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/pages/_app.js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production"
});

export default class KriterieApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <Icons />
        </Head>
        <DefaultSeo {...defaultSeoConfiguration} />
        <GlobalNavbar />
        <Column className="root">
          <Component {...{ ...pageProps, err: (this.props as any).err }} />
        </Column>
        <LoadingBar.Wrapped />
        <GlobalFooter />
        {typeof window !== "undefined" && <TrackingQuestion />}
        {typeof window !== "undefined" && <PageTracking />}
        <LayoutStyle />
      </>
    );
  }
}
