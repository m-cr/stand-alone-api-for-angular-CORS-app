'use strict';

const router = require('express').Router();
const models = require('../../db').models;
const User = models.User;
const Product = models.Product;
const LineItem = models.LineItem;
const Order = models.Order;

module.exports = router;

router.get('/', (req, res, next) => {
	User.findAll()
	.then( users => {
		res.send(users.map((user)=> user.sanitize()));
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	User.findById(req.params.id)
	.then( user => {
		res.send(user.sanitize());
	})
	.catch(next);
});

router.get('/:id/cart', (req, res, next) => {
	Order.getCartForUser(req.params.id)
	.then( (cart) => {
		res.send(cart);
	})
	.catch(next);
});

router.get('/:id/orders', (req, res, next) => {
	Order.findAll({
		where: { userId: req.params.id },
		include: [{ 
			model: LineItem, include: [Product] 
		}]
	})
	.then( (orders) => {
		res.send(orders);
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	User.update({
		isAdmin: req.body.isAdmin
	}, {
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	User.destroy({
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});
