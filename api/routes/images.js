const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");
const path = require("path");

const router = express.Router();

require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Load User model
// const User = require("../../models/User");
// @route POST api/images/upload
// @desc Register user
// @access Public

const s3 = new aws.S3();

// let storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       path.parse(file.originalname).name +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//   }
// });

const storage = multerS3({
  acl: "public-read",
  s3,
  bucket: "spotsharenl",
  key(req, file, cb) {
    cb(
      null,
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
  shouldTransform(req, file, cb) {
    cb(null, /^image/i.test(file.mimetype));
  },
  transforms: [
    {
      id: "original",
      key(req, file, cb) {
        cb(
          null,
          `${path.parse(file.originalname).name}-original-${Date.now()}${path.extname(file.originalname)}`
        );
      },
      transform(req, file, cb) {
        cb(null, sharp().jpeg());
      }
    },
    {
      id: "thumbnail",
      key(req, file, cb) {
        cb(
          null,
          `${path.parse(file.originalname).name}-thumb-${Date.now()}${path.extname(file.originalname)}`
        );
      },
      transform(req, file, cb) {
        cb(
          null,
          sharp()
            .resize(800, 400)
            .jpeg()
        );
      }
    },
    {
      id: "watermark",
      key(req, file, cb) {
        cb(
          null,
          `${path.parse(file.originalname).name}-watermark-${Date.now()}${path.extname(file.originalname)}`
        );
      },
      transform(req, file, cb) {
        cb(
          null,
          sharp()
            .resize(1500)
            .composite([
              {
                input: "./overlay.png",
                gravity: "southwest"
              }
            ])
            .jpeg()
        );
      }
    }
  ]
});

const upload = multer({ storage });

router.post("/upload", upload.single("workshopImage"), (req, res) => {


  console.log(req, res);
  const { file } = req;
  console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  file.cloudfront = "http://dkotwt30gflnm.cloudfront.net/";
  return res.send(file);
});

module.exports = router;
