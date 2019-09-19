import App from "next/app";
import { GlobalNavbar } from "../components/globalNavbar";
import { GlobalFooter } from "../components/globalFooter";

export default class KriterieApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalNavbar />
        <Component {...pageProps} />
        <GlobalFooter />
      </>
    );
  }
}
