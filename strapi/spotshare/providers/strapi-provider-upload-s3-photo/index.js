'use strict';

/* eslint-disable no-unused-vars */
// Public node modules.
const AWS = require("aws-sdk");
const sharp = require("sharp");
const path = require("path");

module.exports = {
  init(providerOptions) {

    console.log(providerOptions);

    AWS.config.update({
      apiVersion: '2006-03-01',
      ...providerOptions
    });

    const S3 = new AWS.S3();

    return {
      async upload(file) {

        const generatedFiles = await generateFiles(file);


        generatedFiles.forEach(image => {

          if (file.name != undefined && file.name != 'undefined') {
            //console.log(image);

            const { buffer, mime, suffix } = image;
            file.ext = file.ext === '.jpeg' ? '.jpg' : file.ext;

            return new Promise((resolve, reject) => {
              const path = file.path ? `${file.path}/` : '';
              //const objectKey = `${filePath}${path.parse(file.originalname).name}${suffix}`;
              const objectKey = `${path}${file.name}${suffix}${file.ext}`;

              console.log(`save: ${objectKey}`);

              S3.upload(
                {
                  Key: `${objectKey}`,
                  Body: Buffer.from(buffer, 'binary'),
                  ACL: 'public-read',
                  ContentType: file.mime,
                  Bucket: "spotsharenl"
                },
                (err, data) => {
                  if (err) {
                    return reject(err);
                  }

                  // set the bucket file url
                  file.url = data.Location;

                  resolve();
                }
              );

            });
          }
        });


      },
      delete(file) {

        let generatedSuffixes;

        switch (file.ext.toLowerCase()) {
          case '.png':
            generatedSuffixes = [`-original.png`, `-watermark.png`, `-thumbnail.png`, `-small.png`];
            break;
          case '.jpg':
          case '.jpeg':
            generatedSuffixes = [`-original.jpg`, `-watermark.jpg`, `-thumbnail.jpg`, `-small.jpg`];
            break;
        }


        generatedSuffixes.forEach(suffix => {

          if (file.name != undefined && file.name != 'undefined') {
            return new Promise((resolve, reject) => {
              const path = file.path ? `${file.path}/` : '';
              const objectKey = `${path}${file.name}${suffix}`;

              console.log(`delete: ${objectKey}`);

              S3.deleteObject({
                Key: `${objectKey}`,
                Bucket: "spotsharenl"
              }, (err, data) => {
                if (err) {
                  return reject(err);
                }
                resolve();
              }
              );
            });
          }
        });



      },
    };
  },
};


const generateFiles = async (file) => {
  const buffer = new Buffer.from(file.buffer, 'binary');


  let images = [];


  switch (file.ext.toLowerCase()) {
    case '.png':

      //original
      images.push(
        await sharp(buffer)
          .png().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-original`
          }))
      );


      //thumbnail
      images.push(
        await sharp(buffer)
          .resize(800, 400)
          .png().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-thumbnail`
          }))
      );


      //watermark
      images.push(
        await sharp(buffer)
          .resize(1500)
          .composite([
            {
              input: "./overlay.png",
              gravity: "southwest"
            }
          ]).png().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-watermark`
          }))
      );

      //small
      images.push(
        await sharp(buffer)
          .resize(500)
          .png().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-small`
          }))
      );


      break;
    case '.jpg':
    case '.jpeg':


      //original
      images.push(
        await sharp(buffer)
          .jpeg().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-original`
          }))
      );


      //thumbnail
      images.push(
        await sharp(buffer)
          .resize(800, 400)
          .jpeg().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-thumbnail`
          }))
      );


      //watermark
      images.push(
        await sharp(buffer)
          .resize(1500)
          .composite([
            {
              input: "./overlay.png",
              gravity: "southwest"
            }
          ]).jpeg().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-watermark`
          }))
      );

      //watermark
      images.push(
        await sharp(buffer)
          .resize(500)
          .jpeg().toBuffer()
          .then(data => ({
            buffer: data,
            mime: file.mime,
            ext: file.ext,
            suffix: `-small`
          }))
      );


      break;
  }
  //console.log(images);
  return Promise.all(images);
}
