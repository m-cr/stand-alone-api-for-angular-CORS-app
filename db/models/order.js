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
}
// , {
// 	classMethods: {
// 		getCartForUser: function(user){
// 			var that = this;
// 			return this.findOne({
// 				where: { userId: user.id, status: 'cart' },
// 				include: [{
// 					model: LineItem,
// 					include: [Product]
// 				}]
// 			})
// 			.then(function(cart){
// 				if (cart) {
// 					return cart;
// 				}
// 				return that.create({ userId: user.id });
// 			});
// 		}
// 	}}
);
