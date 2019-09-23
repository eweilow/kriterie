const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");
const withWorkers = require("@zeit/next-workers");

module.exports = withPlugins(
  [
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
      ANALYTICS_ID: "UA-44812680-6"
    }
  }
);
