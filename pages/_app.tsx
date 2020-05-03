import App from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";

import { GlobalNavbar } from "../components/globalNavbar";
import { GlobalFooter } from "../components/globalFooter";

import { TrackingQuestion } from "../components/cookieQuestion";

import Icons from "../generated/icons";
import { LayoutStyle } from "../components/layoutStyle";
import { Column } from "../components/column";
import { LoadingBar } from "../components/loadingIndicator/bar";
import * as Sentry from "@sentry/node";
import { defaultSeoConfiguration } from "../lib/next-seo.config";
import { useEffect } from "react";

function FathomAnalytics() {
  const router = useRouter();
  if (process.env.NODE_ENV === "production") {
    useEffect(() => {
      Fathom.load();
      Fathom.setSiteId(process.env.FATHOM_ID);
      Fathom.trackPageview();
    }, []);

    useEffect(() => {
      function listener() {
        Fathom.trackPageview();
      }

      router.events.on("routeChangeComplete", listener);
      return () => {
        router.events.off("routeChangeComplete", listener);
      };
    }, [router]);
  }

  return null;
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
        <FathomAnalytics />
        <LayoutStyle />
      </>
    );
  }
}
