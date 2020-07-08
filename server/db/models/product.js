const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  picture: {
    type: Sequelize.STRING,
    default: 'https://robohash.org/default/?set=set4',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Product;
