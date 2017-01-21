'use strict';

const router = require('express').Router();
const Category = require('../../db').models.Category;
const Product = require('../../db').models.Product;
module.exports = router;

router.get('/', (req, res, next) => {
	Category.findAll({
		include: [Product]
	})
	.then( categories => {
		res.send(categories);
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	Category.findById(req.params.id)
	.then( category => {
		res.send(category);
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	Category.create({
		name: req.body.name
	})
	.then( category => {
		res.status(201).send(category);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	Category.destroy({
		where: {id: req.params.id}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	Category.update({
		name: req.body.name
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