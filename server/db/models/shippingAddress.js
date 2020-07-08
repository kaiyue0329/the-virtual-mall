const Sequelize = require('sequelize');
const db = require('../db');

const ShippingAddress = db.define('shipping-address', {
  streetAddress: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
});

module.exports = ShippingAddress;
