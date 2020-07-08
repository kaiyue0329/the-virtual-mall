const User = require('./user');
const Review = require('./review');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const ShippingAddress = require('./shippingAddress');
const orderProduct = require('./orderProduct');

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Order);

ShippingAddress.hasOne(User);
User.belongsTo(ShippingAddress);

Order.belongsToMany(Product, { through: orderProduct });
Product.belongsToMany(Order, { through: orderProduct });

Product.hasMany(Review);
Review.belongsTo(Product);

Category.belongsToMany(Product, {
  through: 'category_product',
});
Product.belongsToMany(Category, {
  through: 'category_product',
});

module.exports = {
  User,
  Review,
  Product,
  Category,
  Order,
  ShippingAddress,
  orderProduct,
};
