const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        baseUrl: "http://192.168.0.9:8000",
      },
      trailingSlash: true,
      webpackDevMiddleware: (config) => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        };
        return config;
      },
      images: {
        domains: ["http://192.168.0.9:8000", "https://via.placeholder.com"],
      },
    };
  }

  return {
    env: {
      baseUrl: "http://192.168.0.9:8000",
    },
    trailingSlash: true,
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
    images: {
      domains: ["http://192.168.0.9:8000", "https://via.placeholder.com"],
    },
  };
};
