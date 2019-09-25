/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");
const withWorkers = require("@zeit/next-workers");
const withSourcemaps = require("@zeit/next-source-maps");

module.exports = withPlugins(
  [
    [withSourcemaps],
    [
      withTM,
      {
        transpileModules: ["@excitare/analytics"]
      }
    ],
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
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: "empty",
          path: "empty"
        };
      }
      return config;
    },
    env: {
      ANALYTICS_ID: "UA-44812680-6",
      SENTRY_DSN: "https://d7ba9b78b3dc4897a4cdfc8d98142cce@sentry.io/1761526"
    }
  }
);
