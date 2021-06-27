const axios = require("axios");
const slugify = require("slugify");
const { create } = require("lodash");
const { isDraft } = require("strapi-utils").contentTypes;

const checkForAvailableSlug = async (slug) => {
  const result = await strapi.query("photo").search({ slug });

  return result;
};

const createSlug = async (slug, suffix, previousSuffix) => {
  var result = await checkForAvailableSlug(slug);
  console.log("result: ", result);

  if (result.length == 0) {
    console.log("final returned slug by Createdslug:", slug);
    return slug;
  } else {
    if (!suffix) {
      suffix = 1;
    } else {
      suffix++;
    }
    const cleanSlug = slug.replace(previousSuffix, "");

    const createdSuffix = "-" + suffix;
    let adjustedSlug = cleanSlug + createdSuffix;
    console.log("adjusted and checked slug:", adjustedSlug);
    return createSlug(adjustedSlug, suffix, createdSuffix);
  }
};

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  mapthose: async (ctx) => {
    const { data } = await axios.get("https://www.spotshare.nl/getjson/");

    const updatedPhotos = await Promise.all(
      data.map(
        (remotePhoto) =>
          new Promise(async (resolve, reject) => {
            const { name, location_id } = remotePhoto;

            try {
              const foundPhoto = await strapi
                .query("photo")
                .search({ slug: name });

              console.log("location_id: ", location_id);
              return;

              const foundLocation = await strapi
                .query("location")
                .search({ prev_id: location_id });

              const realLocationID = foundLocation[0].id;

              const slug = slugify(foundPhoto[0].title, {
                replacement: "-", // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true, // convert to lower case, defaults to `false`
                strict: true, // strip special characters except replacement, defaults to `false`
              });

              const newSlugger = await createSlug(slug);

              const _isDraft = isDraft(foundPhoto, strapi.models.photo);
              const validData = await strapi.entityValidator.validateEntityUpdate(
                strapi.models.photo,
                { slug: newSlugger, location: [realLocationID] },
                { _isDraft }
              );

              let updatedPhoto = await strapi.services.photo.update(
                { id: foundPhoto[0].id },
                validData
              );
              console.log(updatedPhoto);

              resolve(updatedPhoto);
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    ctx.send(updatedPhotos);

    // loop through those photos
    // get prev_location_id
    // get realLocationId based on prev_location_id
    // create slug
    // update photo
  },
  restore: async (ctx) => {
    const { data } = await axios.get("https://www.spotshare.nl/getjson/");

    const photos = await Promise.all(
      data.map(
        (photo) =>
          new Promise(async (resolve, reject) => {
            const {
              id,
              created,
              brand,
              camera,
              name,
              date,
              image,
              aperture,
              desc,
              iso,
              location_id,
              shutterspeed,
              title,
              user_id,
            } = photo;

            try {
              const foundPhoto = await strapi
                .query("photo")
                .search({ slug: name });

              let entry = null;

              if (foundPhoto[0]) {
                if (foundPhoto[0].slug) {
                  const foundLocation = await strapi
                    .query("location")
                    .search({ prev_id: location_id });

                  const realLocationID = foundLocation[0].id;

                  const slug = slugify(foundPhoto[0].title, {
                    replacement: "-", // replace spaces with replacement character, defaults to `-`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: true, // convert to lower case, defaults to `false`
                    strict: true, // strip special characters except replacement, defaults to `false`
                  });

                  const newSlug = await createSlug(slug);

                  const _isDraft = isDraft(foundPhoto, strapi.models.photo);
                  const validData = await strapi.entityValidator.validateEntityUpdate(
                    strapi.models.photo,
                    { slug: newSlug, location: [realLocationID] },
                    { _isDraft }
                  );

                  entry = await await strapi.services.photo.update(
                    { id: foundPhoto[0].id },
                    validData
                  );
                }
              }

              // not neccesarry: search photo based on prev_photo_id
              // search realLocationID based prev_id = location_id
              // update searchedPhoto: where location = realLocationID

              // const user = await strapi
              //   .query("user", "users-permissions")
              //   .search({ prev_user_id: user_id });

              // const realUserId = searchResult[0].id;

              // console.log("searchResultID", realUserId);

              // const photoData = {
              //   createdAt: created,
              //   title,
              //   desc,
              //   photo: [result.id],
              //   slug: name,
              //   user: [realUserId],
              //   date: isoDate,
              //   brand,
              //   shutterspeed,
              //   camera,
              //   prev_location_id: location_id,
              //   iso,
              //   aperture,
              // };

              // use the strapi services create function to create entry

              // const createdPhoto = await strapi.services.photo.create(
              //   photoData
              // );
              console.log(entry);
              resolve(entry);
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    console.log("done");
    ctx.send(photos);
  },
  import: async (ctx) => {
    const { data } = await axios.get("https://www.spotshare.nl/getjson/");

    const photos = await Promise.all(
      data.map(
        (photo) =>
          new Promise(async (resolve, reject) => {
            //resolve when the post is created
            //console.log(photo);
            const {
              id,
              created,
              brand,
              camera,
              name,
              date,
              image,
              aperture,
              desc,
              iso,
              location_id,
              shutterspeed,
              title,
              user_id,
            } = photo;

            try {
              if (user_id == "") {
                user_id = 40;
              }

              const foundPhoto = await strapi
                .query("photo")
                .findOne({ prev_id: id });

              if (foundPhoto !== null) {
                console.log("found photo with id: ", foundPhoto.id);
                resolve(foundPhoto);
                return;
              }

              // featured_image functionality here that we built
              // out with our helper functions

              const slug = slugify(title, {
                replacement: "-", // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true, // convert to lower case, defaults to `false`
                strict: true, // strip special characters except replacement, defaults to `false`
              });

              const newSlug = await createSlug(slug);

              const downloaded = await strapi.config.functions.download(
                "https://www.spotshare.nl" + image[0].url
              );

              //console.log(downloaded);

              const result = await strapi.config.functions.upload(downloaded);

              //console.log(result);

              let isoDate = null;
              if (date.split(":").length === 5) {
                const splitted = date.split(" ");
                const splittedDate = splitted[0].split(":");
                const splittedTime = splitted[1].split(":");

                const year = splittedDate[0];
                const month = splittedDate[1];
                const day = splittedDate[2];

                const hour = splittedTime[0];
                const minute = splittedTime[1];
                const second = splittedTime[2];

                isoDate = new Date(
                  year,
                  month,
                  day,
                  hour,
                  minute,
                  second
                ).toISOString();
              }

              //console.log("user_id", user_id);
              const searchResult = await strapi
                .query("user", "users-permissions")
                .search({ prev_user_id: user_id });

              //console.log(searchResult);

              const realUserId = searchResult[0].id;

              const foundLocation = await strapi
                .query("location")
                .findOne({ prev_id: location_id });

              if (foundLocation === null) {
                resolve({});
              }

              //console.log("searchResultID", realUserId);

              const photoData = {
                createdAt: new Date(created * 1000).toISOString(),
                title,
                desc,
                photo: [result.id],
                prev_name: name,
                slug: newSlug,
                user: [realUserId],
                date: isoDate,
                brand,
                shutterspeed,
                camera,
                prev_location_id: location_id,
                iso,
                aperture,
                prev_id: id.toString(),
                location: [foundLocation.id],
              };

              const createdPhoto = await strapi.services.photo.create(
                photoData
              );

              resolve(createdPhoto);
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    ctx.send(photos);
  },
};
