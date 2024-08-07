const node_env = process.env.NODE_ENV;

module.exports = {
  images: {
    domains: ["mk-cargle-img.s3.ap-northeast-2.amazonaws.com"],
  },
  experimental: {
    outputStandalone: true,
  },

  async rewrites() {
    if (node_env !== "production") {
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
