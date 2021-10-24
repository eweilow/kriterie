const { withSentryConfig } = require("@sentry/nextjs");
const withFonts = require("next-fonts");

const config = {
  productionBrowserSourceMaps: true,
  env: {
    FATHOM_URL: "https://tarsier.kriterie.se/script.js",
    FATHOM_ID: "UIRVULLC",
  },
  async rewrites() {
    return [
      {
        source: "/search.json",
        destination: "/api/search",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "cache-control",
            value:
              "public, max-age=31536000, s-maxage=86400, stale-while-revalidate",
          },
        ],
      },
      {
        source: "/search.json",
        headers: [
          {
            key: "cache-control",
            value:
              "public, max-age=3600, s-maxage=31536000, stale-while-revalidate",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "cache-control",
            value:
              "public, max-age=3600, s-maxage=31536000, stale-while-revalidate",
          },
        ],
      },
    ];
  },
};

const baseConfig = withFonts(config);

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: false, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
  process.env.SENTRY_BUILD === "1"
    ? withSentryConfig(baseConfig, sentryWebpackPluginOptions)
    : baseConfig;
