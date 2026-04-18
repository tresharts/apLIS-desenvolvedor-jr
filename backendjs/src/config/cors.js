function buildCorsOptions(appConfig) {
  return {
    origin: appConfig.corsOrigin || true,
    credentials: true,
  };
}

module.exports = {
  buildCorsOptions,
};
