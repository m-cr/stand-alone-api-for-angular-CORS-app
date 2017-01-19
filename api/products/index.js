'use strict';

const router = require('express').Router();
const models = require('../../db').models;
const Product = models.Product;
const Review = models.Review;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
	Product.findAll({
		include: [{
			model: Review,
			include: [User]
		}]
	})
	.then( (products) => {
		res.send(products);
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	Product.findOne({
		where: {id: req.params.id},
		include: [{
			model: Review,
			include: [User]
		}]
	})
	.then( (product) => {
		res.send(product);
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	Product.create({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		inventory_qty: req.body.inventory_qty,
		photos: req.body.photos,
		categories: req.body.categories
	})
	.then( (product) => {
		res.status(201).send(product);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	Product.destroy({ 
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	Product.update({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		inventory_qty: req.body.inventory_qty,
		photos: req.body.photos,
		categories: req.body.categories
	}, {
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.sendStatus(201);
	})
	.catch(next);
});
