'use strict';

const router = require('express').Router();
const Review = require('../../db').models.Review;

module.exports = router;

router.get('/', (req, res, next) => {
	Review.findAll()
	.then( (reviews) => {
		res.send(reviews);
	})
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	Review.findById(req.params.id)
	.then( (review) => {
		res.send(review);
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	Review.create({
		content: req.body.content,
		rate: req.body.rate,
		productId: req.body.productId,
		userId: req.body.userId
	})
	.then( (review) => {
		res.status(201).send(review);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	Review.destroy({
		where: {id: req.params.id}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	Review.update({
		content: req.body.content,
		rate: req.body.rate,
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