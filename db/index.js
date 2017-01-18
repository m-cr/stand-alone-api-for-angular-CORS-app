'use strict';
const db = require('./_db');

const User = require('./models/user.js');
const Order = require('./models/order.js');
const Product = require('./models/product.js');
const LineItem = require('./models/lineitem.js');
const Review = require('./models/review.js');

module.exports = {
	db,
	models: {
		User,
		Order,
		Product,
		LineItem,
		Review
	}
};

Review.belongsTo(Product);
Review.belongsTo(User);
Order.hasMany(LineItem);
User.hasMany(Order);
Product.hasMany(Review);
User.hasMany(Review);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
