import App from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import * as Fathom from "fathom-client";
import { useRouter } from "next/router";

import { GlobalNavbar } from "../src/components/globalNavbar";
import { GlobalFooter } from "../src/components/globalFooter";

import Icons from "../generated/icons";
import { Column } from "../src/components/column";
import { LoadingBar } from "../src/components/loadingIndicator/bar";
import { defaultSeoConfiguration } from "../src/lib/next-seo.config";
import { useEffect } from "react";

import "../src/style/global.css";

function FathomAnalytics() {
  const router = useRouter();

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

  return null;
}

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
        {process.env.NODE_ENV === "production" && <FathomAnalytics />}
      </>
    );
  }
}
