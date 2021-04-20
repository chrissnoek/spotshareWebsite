module.exports = ({ env }) => ({
  upload: {
    provider: "s3-photo",
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
      testAddress: "chrissnoek8@hotmail.com",
    },
  },
});
