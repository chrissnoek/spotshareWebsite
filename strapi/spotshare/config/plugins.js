module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("S3_ACCESSKEYID"),
      secretAccessKey: env("S3_SECRETACCESSKEY"),
      region: "eu-central-1",
      params: {
        Bucket: "spotsharenl",
      },
    },
  },
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "info@spotshare.nl",
      defaultReplyTo: "info@spotshare.nl",
    },
  },
  graphql: {
    amountLimit: 5000,
  },
});
