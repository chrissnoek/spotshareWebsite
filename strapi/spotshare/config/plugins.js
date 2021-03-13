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
});
