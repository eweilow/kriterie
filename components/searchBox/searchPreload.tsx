import Head from "next/head";

export const SearchPreload = () => (
  <Head>
    <link
      crossOrigin="anonymous"
      key="searchPreload"
      rel="prefetch"
      as="fetch"
      href="/api/search"
    />
  </Head>
);
