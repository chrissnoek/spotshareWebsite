const withImages = require("next-images");
module.exports = withImages({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["spotsharenl.s3.eu-central-1.amazonaws.com"],
  },
});
