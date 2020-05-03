/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");
const withWorkers = require("@zeit/next-workers");
const withSourcemaps = require("@zeit/next-source-maps");

module.exports = withPlugins(
  [
    withSourcemaps,
    [
      withWorkers,
      {
        workerLoaderOptions: {
          name: "static/[hash].worker.js",
          publicPath: "/_next/",
          inline: false,
          fallback: true
        }
      }
    ]
  ],
  {
    experimental: {
      modern: true
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: "empty",
          path: "empty"
        };
        // https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }
      return config;
    },
    env: {
      SENTRY_DSN: "https://d7ba9b78b3dc4897a4cdfc8d98142cce@sentry.io/1761526",
      FATHOM_ID: "UIRVULLC"
    }
  }
);
