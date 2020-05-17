const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  query: `
    articleBySlug(slug: String!): Article!
  `,
  resolver: {
    Query: {
      articleBySlug: {
        resolverOf: 'Article.findOne',
        resolver: async (_, { slug }) => {
          console.log({ slug });
          const entity = await strapi.services.article.findOne({ slug });
          return sanitizeEntity(entity, { model: strapi.models.article });
        },
      },
    },
  },
};
