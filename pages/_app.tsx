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

import localFont from "@next/font/local";

// config your font
const glacialIndifference = localFont({
  src: [
    {
      weight: "bold",
      path: "./font/GlacialIndifference-Bold.woff2",
      style: "normal",
    },
    {
      weight: "normal",
      path: "./font/GlacialIndifference-Italic.woff2",
      style: "italic",
    },
    {
      weight: "normal",
      path: "./font/GlacialIndifference-Regular.woff2",
      style: "normal",
    },
  ],
});

function FathomAnalytics() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.FATHOM_ID, {
      url: process.env.FATHOM_URL,
    });
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
        <Column className={"root"}>
          <Component {...{ ...pageProps, err: (this.props as any).err }} />
        </Column>
        <LoadingBar.Wrapped />
        <GlobalFooter />
        {process.env.NODE_ENV === "production" && <FathomAnalytics />}
        <style jsx global>{`
        html {
          font-family: ${glacialIndifference.style.fontFamily};
        }
      `}</style>
      </>
    );
  }
}
