'use strict';

/**
 * invoice-number service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::invoice-number.invoice-number');
