'use strict';
const db = require('../_db');
const LineItem = require('./lineitem.js');
const Product = require('./product.js');

module.exports = db.define('order', {
  status: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: 'cart'
  }
});
