'use strict';
const db = require('./db').db;
const models = require('./db').models;
const User = models.User;
const Product = models.Product;
const Order = models.Order;
const Review = models.Review;
const LineItem = models.LineItem;
const Promise = require('sequelize').Promise;

const seed = () => {
	
	const seedUser = User.create({
		email: 'demo@demo.com',
		password: 'demo',
		isAdmin: true
	});

	const seedProduct = Product.create({
		title: 'Product1',
		description: 'Product Description',
		price: 99.99,
		inventory_qty: 10,
		photos: 'http://www.fillmurray.com/200/300',
		categories: ['Categor1', 'Category2']
	});

	const seedOrder = Order.create({ status: 'cart' });	

	const seedReview = Review.create({
		content: 'Review Content',
		rate: ['*','*','*','*','*']
	});

	const seedLineItem = LineItem.create({
		quantity: 1,
		price: 99.99
	});

	return Promise.all([seedUser, seedProduct, seedOrder, seedLineItem, seedReview])
		.spread( (user, product, order, lineItem, review) => {
			return Promise.all([
				user.setOrders(order),
				lineItem.setProduct(product),
				lineItem.setOrder(order),
				review.setUser(user),
				review.setProduct(product)
			]);

		});
}

db.sync({
	force: true
})
.then( ()=> {
	return seed();
})
.then( ()=> {
	console.log('seeded users!');
	process.exit(0);
})
.catch((err) => {
	console.error(err);
	process.exit(1);
});
