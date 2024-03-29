const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = async (url) => {
  // get the filename such as `image01.jpg`
  const name = path.basename(url);
  //console.log(name);
  // we need to set a file path on our host where the image will be
  // downloaded to
  const filePath = `/tmp/${name}`;
  //console.log(filePath);
  // create an instance of fs.writeStream
  const writeStream = fs.createWriteStream(filePath);
  //console.log(url);
  // make a GET request and create a readStream to the resource
  const { data } = await axios.get(url, { responseType: "stream" });
  //console.log(data);
  // pipe the data we receive to the writeStream
  data.pipe(writeStream);
  // return a new Promise that resolves when the event writeStream.on
  // is emitted. Resolves the file path
  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      resolve(filePath);
    });
    writeStream.on("error", reject);
  });
};
