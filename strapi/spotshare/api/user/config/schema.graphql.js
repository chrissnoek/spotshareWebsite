// const { sanitizeEntity } = require("strapi-utils");

// module.exports = {
//   query: `
//     userByUsername(username: String!): User
//   `,
//   resolver: {
//     Query: {
//       userByUsername: {
//         resolverOf: "User.findOne",
//         resolver: async (_, { username }) => {
//           console.log({ username, strapi });
//           const entity = await strapi.services.user.findOne({ username });
//           return sanitizeEntity(entity, { model: strapi.models.user });
//         },
//       },
//     },
//   },
// };
