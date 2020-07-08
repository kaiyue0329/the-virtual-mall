const Sequelize = require('sequelize');
const db = require('../db');

const orderProduct = db.define('order_product', {
  productPrice: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = orderProduct;
