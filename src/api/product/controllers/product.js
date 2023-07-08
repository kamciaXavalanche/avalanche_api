"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::product.product");

// change id to slug

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query("api::product.product").findOne({
      where: { slug: id },
      populate: {
        images: true,
        subcategories: true,
        categories: true,
        colors: true,
      },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
