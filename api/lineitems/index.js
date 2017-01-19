const router = require('express').Router();
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;

module.exports = router;

router.get('/', (req, res, next) => {
	LineItem.findOne({
		where: {
			orderId: req.params.id
			// id: req.params.itemId
		},
		include: [Product]
	})
	.then( (lineItems) => {
		res.send(lineItems);
	})
	.catch(next);
});

router.post('/', (req, res, next) => {
	LineItem.create({
		price: req.body.price,
		quantity: req.body.quantity,
		orderId: req.body.orderId,
		productId: req.body.productId
	})
	.then( (lineitem) => {
		res.send(lineitem);
	})
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	LineItem.destroy({
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});

//if the lineup post has the same product, it updates the lineitem

router.put('/:id', (req, res, next) => {
	LineItem.update({
		quantity: req.body.quantity,
		price: req.body.price
	}, {
		where: {id: req.params.id}
	})
	.then( () => {
		res.sendStatus(204);
	})
	.catch(next);
});
