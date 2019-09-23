import App from "next/app";
import Head from "next/head";

import { configureAnalytics, PageTracking } from "@excitare/analytics";

import { GlobalNavbar } from "../components/globalNavbar";
import { GlobalFooter } from "../components/globalFooter";

import { TrackingQuestion } from "../components/cookieQuestion";

import Icons from "../generated/icons";
import { LayoutStyle } from "../components/layoutStyle";
import { Column } from "../components/column";
import { LoadingBar } from "../components/loadingIndicator/bar";

if (process.env.NODE_ENV === "production") {
  configureAnalytics(process.env.ANALYTICS_ID);
}

export default class KriterieApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>kriterie.se</title>
          <Icons />
          {process.env.NODE_ENV === "production" && (
            <link rel="preload" as="fetch" href="/api/search" />
          )}
        </Head>
        <GlobalNavbar />
        <Column className="root">
          <Component {...pageProps} />
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
