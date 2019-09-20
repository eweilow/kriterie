const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ["@excitare/analytics"]
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
    publicRuntimeConfig: {
      analyticsId: "UA-44812680-6"
    }
  }
);
