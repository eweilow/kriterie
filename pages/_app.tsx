import App from "next/app";
import Head from "next/head";

import { configureAnalytics } from "@excitare/analytics";

import { GlobalNavbar } from "../components/globalNavbar";
import { GlobalFooter } from "../components/globalFooter";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
configureAnalytics(publicRuntimeConfig.analyticsId);

export default class KriterieApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>kriterie.se</title>
        </Head>
        <GlobalNavbar />
        <Component {...pageProps} />
        <GlobalFooter />
      </>
    );
  }
}
