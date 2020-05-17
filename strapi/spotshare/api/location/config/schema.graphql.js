const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    locationBySlug(slug: String!): Location
  `,
  resolver: {
    Query: {
      locationBySlug: {
        resolverOf: 'Location.findOne',
        resolver: async (_, { slug }) => {
          console.log({ slug });
          const entity = await strapi.services.location.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.location });
        },
      },
    },
  },
};
