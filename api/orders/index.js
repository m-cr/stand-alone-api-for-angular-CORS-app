'use strict';

const router = require('express').Router();
const Order = require('../../db').models.Order;
const Product = require('../../db').models.Product;
const LineItem = require('../../db').models.LineItem;

module.exports = router;

router.use('/:id/lineItems', require('../lineitems'));

router.get('/', (req, res, next) => {
	Order.findAll({
		include: { model: LineItem, include: [Product] }
	})
	.then( (orders) => {
		res.send(orders);
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	Order.findOne({
		where: { id: req.params.id },
		include: { model: LineItem, include: [Product] }
	})
	.then( (order) => {
		res.send(order);
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	Order.create({
		status: req.body.status
	})
	.then( (order) => {
		res.status(201).send(order);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	Order.destroy({ where: {
		id: req.params.id
	}})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	Order.update({
		status: req.body.status
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

// where: {
// 			id: req.params.id
// 		},
// 		returning: true
// 	})
// 	.then( (result) => {
// 		order = result[1][0].get();


