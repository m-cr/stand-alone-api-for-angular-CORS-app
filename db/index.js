'use strict';
const db = require('./_db');

const User = require('./models/user.js');
const Order = require('./models/order.js');
const Product = require('./models/product.js');
const LineItem = require('./models/lineitem.js');
const Review = require('./models/review.js');
const Category = require('./models/category.js');
const CategoryProduct = require('./models/categoryproduct.js')

module.exports = {
	db,
	models: {
		User,
		Order,
		Product,
		LineItem,
		Review,
		Category,
		CategoryProduct
	}
};

Review.belongsTo(Product);
Review.belongsTo(User);
Order.hasMany(LineItem);
User.hasMany(Order);
Product.hasMany(Review);
// Product.belongsTo(Category);
Category.belongsToMany(Product, {through: CategoryProduct});
Product.belongsToMany(Category, {through: CategoryProduct});
User.hasMany(Review);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
