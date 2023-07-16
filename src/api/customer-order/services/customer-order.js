'use strict';

/**
 * customer-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::customer-order.customer-order');
