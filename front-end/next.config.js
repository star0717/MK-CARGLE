// /** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/system",
  "@mui/icons-material",
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "production") {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination:
            process.env.DESTINATION_URL +
            process.env.DESTINATION_PORT +
            process.env.DESTINATION_PATH,
        },
      ];
    } else {
      return [
        {
          source: process.env.SOURCE_PATH,
          destination:
            process.env.DESTINATION_URL +
            process.env.DESTINATION_PORT +
            process.env.DESTINATION_PATH,
        },
      ];
    }
  },
});
