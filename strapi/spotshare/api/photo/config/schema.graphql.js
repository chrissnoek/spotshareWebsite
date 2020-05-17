const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    photoBySlug(slug: String!): Photo
  `,
  resolver: {
    Query: {
      photoBySlug: {
        resolverOf: 'Photo.findOne',
        resolver: async (_, { slug }) => {
          console.log({ slug });
          const entity = await strapi.services.photo.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.photo });
        },
      },
    },
  },
};
