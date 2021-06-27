module.exports = {
  async delete(ctx) {
    const { userAbility } = ctx.state;
    const { id, model } = ctx.params;

    console.log(model, id);

    const entityManager =
      strapi.plugins["content-manager"].services["entity-manager"];
    const permissionChecker = strapi.plugins["content-manager"].services[
      "permission-checker"
    ].create({
      userAbility,
      model,
    });

    if (permissionChecker.cannot.delete()) {
      return ctx.forbidden();
    }

    const entity = await entityManager.findOneWithCreatorRoles(id, model);

    console.log(entity);

    if (!entity) {
      return ctx.notFound();
    }

    if (permissionChecker.cannot.delete(entity)) {
      return ctx.forbidden();
    }

    const result = await entityManager.delete(entity, model);

    console.log(result);

    if (entity) {
      if (entity.photo.length > 0) {
        entity.photo.forEach((photo) => {
          strapi.plugins.upload.services.upload.remove(photo);
        });
      } else if (entity.photo.length === 1) {
        strapi.plugins.upload.services.upload.remove(entity.photo);
      }
    }
    ctx.body = permissionChecker.sanitizeOutput(result);
  },

  async bulkDelete(ctx) {
    const { userAbility } = ctx.state;
    const { model } = ctx.params;
    const { query, body } = ctx.request;
    const { ids } = body;

    const entityManager =
      strapi.plugins["content-manager"].services["entity-manager"];
    const permissionChecker = strapi.plugins["content-manager"].services[
      "permission-checker"
    ].create({
      userAbility,
      model,
    });

    if (permissionChecker.cannot.delete()) {
      return ctx.forbidden();
    }

    const permissionQuery = permissionChecker.buildDeleteQuery(query);

    const idsWhereClause = { [`id_in`]: ids };
    const params = {
      ...permissionQuery,
      _where: [idsWhereClause].concat(permissionQuery._where || {}),
    };

    const results = await entityManager.findAndDelete(params, model);

    results.forEach((entity) => {
      if (typeof entity.photo !== "undefined") {
        if (entity.photo.length > 0) {
          entity.photo.forEach((photo) => {
            strapi.plugins.upload.services.upload.remove(photo);
          });
        } else if (entity.photo.length === 1) {
          strapi.plugins.upload.services.upload.remove(entity.photo);
        }
      }
    });

    ctx.body = results.map((result) =>
      permissionChecker.sanitizeOutput(result)
    );
  },
};
