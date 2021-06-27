const axios = require("axios");
module.exports = {
  doimport: async (ctx) => {
    const { data } = await axios.get("https://www.spotshare.nl/getjson/");

    const users = await Promise.all(
      data.map(
        (user) =>
          new Promise(async (resolve, reject) => {
            //resolve when the post is created
            console.log(user);
            const {
              id,
              name,
              email,
              lastname,
              firstname,
              woonplaats,
              facebook,
              website,
              instagram,
              image,
            } = user;

            try {
              let uploadedProfilePic = "";

              if (image != "") {
                console.log("https://www.spotshare.nl" + image);

                const downloaded = await strapi.config.functions.download(
                  "https://www.spotshare.nl" + image
                );

                console.log(downloaded);

                uploadedProfilePic = await strapi.config.functions.upload(
                  downloaded
                );
              }

              const hashedPassword = await strapi.plugins[
                "users-permissions"
              ].services.user.hashPassword("Joejoe1@");

              const params = {
                username: name,
                slug: name,
                email,
                confirmed: 1,
                role: ["5eae92b243f9162da3292e90"],
                firstname,
                lastname,
                prev_user_id: id,
                password: hashedPassword,
                provider: "local",
                website,
                city: woonplaats,
                fb_page: facebook,
                insta_page: instagram,
                profilePicture: uploadedProfilePic
                  ? [uploadedProfilePic.id]
                  : "",
              };

              const createdUser = await strapi
                .query("user", "users-permissions")
                .create(params);

              console.log(createdUser);

              resolve(createdUser);
            } catch (err) {
              reject(err);
            }
          })
      )
    );
    ctx.send(users);
  },

  testimport: async (ctx) => {
    const data = [1];

    const users = await Promise.all(
      data.map(
        (user) =>
          new Promise(async (resolve, reject) => {
            //resolve when the post is created

            try {
              // const foundLocation = await strapi
              //   .query("photo")
              //   .search({ prev_id: location_id });

              const result = await strapi
                .query("photo")
                .find({ title: "" }, ["photo.name", "autumn-haze.jpg"]);

              // const result = await strapi
              //   .query("photo")
              //   .find({ name: "autumn-haze.jpg" }, ["photo"]);

              //   strapi.query('photo').find({name:'autumn-haze.jpg','project.id':id});

              console.log(result);

              //const fields = result.map((entry) => entry.toObject());

              //console.log(fields);
              // const hashedPassword = await strapi.plugins[
              //   "users-permissions"
              // ].services.user.hashPassword("Joejoe1@");

              // const user = await strapi
              //   .query("user", "users-permissions")
              //   .search({ email: "chrissnoek8@hotmail.com" });

              // const user = await strapi
              //   .query("user", "users-permissions")
              //   .findOne({
              //     email: "chrissnoek8@hotmail.com",
              //   });

              // console.log(user);

              // const realUserId = user.id;

              // const updatedUser = await strapi
              //   .query("user", "users-permissions")
              //   .update(
              //     { id: realUserId },
              //     {
              //       password: hashedPassword,
              //     }
              //   );

              resolve(result);
            } catch (err) {
              reject(err);
            }

            // try {
            //   const params = {
            //     username: "christest",
            //     email: "chrissnoek8@gmail.com",
            //     confirmed: 1,
            //     role: ["5eae92b243f9162da3292e90"],
            //     firstname: "Chris",
            //     lastname: "Snoek",
            //     prev_user_id: "0001",
            //     password: hashedPassword,
            //     provider: "local",
            //   };

            //   const createdUser = await strapi
            //     .query("user", "users-permissions")
            //     .create(params);

            //   console.log(createdUser);

            //   resolve(createdUser);
            // } catch (err) {
            //   reject(err);
            // }
          })
      )
    );
    ctx.send(users);
  },
};
