const axios = require("axios");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  import: async (ctx) => {
    const { data } = await axios.get("https://www.spotshare.nl/getjson/");

    const locations = await Promise.all(
      data.map(
        (location) =>
          new Promise(async (resolve, reject) => {
            //resolve when the post is created
            //console.log(location);
            let {
              created,
              title,
              name,
              user_id,
              id,
              lat,
              lng,
              desc,
            } = location;

            try {
              // featured_image functionality here that we built
              // out with our helper functions
              if (user_id === "1062") {
                user_id = "1063";
              }

              if (user_id === "40") {
                user_id = "41";
              }

              if (user_id === "") {
                user_id = "41";
              }

              const foundUser = await strapi
                .query("user", "users-permissions")
                .search({ prev_user_id: user_id });

              console.log(foundUser.length);

              if (foundUser.length === 0) {
                console.log("user_id: ", user_id);
              } else {
              }

              const realUserId = foundUser[0].id;

              // now that we have fileId we can complete our photoData object
              const locationData = {
                createdAt: created,
                title,
                desc,
                slug: name,
                user: [realUserId],
                prev_id: id,
                longitude: lng,
                latitude: lat,
              };
              // console.log(locationData);
              // use the strapi services create function to create entry
              // const createdLocation = await strapi.services.location.create(
              //   locationData
              // );

              //console.log(id, name);
              const searchResult = await strapi
                .query("location")
                .search({ slug: name });

              let entry = null;
              //console.log(searchResult);
              if (searchResult.length > 0) {
                // existing location
              } else {
                // use the strapi services create function to create entry
                entry = await strapi.services.location.create(locationData);
              }
              console.log(entry);
              resolve(entry);
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    ctx.send(locations);
  },
};
