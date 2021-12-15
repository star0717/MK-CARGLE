/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
};
