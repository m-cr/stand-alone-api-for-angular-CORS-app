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

router.post('/', function(req, res, next){
	LineItem.create({
		price: req.body.price,
		quantity: req.body.quantity
	})
	.then( (lineitem) => {
		lineitem.setOrder(req.body.orderId);
		return lineitem;
	})
	.then(function(lineitem){
		lineitem.setProduct(req.body.productId);
		return lineitem;
	})
	.then(function(lineitem){
		res.send(lineitem);
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
	LineItem.destroy({
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		console.log('deleted line item' + req.params.id);
		res.sendStatus(200);
	})
	.catch(next);
});

//if the lineup post has the same product, it updates the lineitem

router.put('/:id', function(req, res, next){
	LineItem.update({
		quantity: req.body.quantity,
		price: req.body.price
	}, {
		where: {id: req.params.id}
	})
	.then( (result) => {
		console.log(result);
		console.log('lineitem ' + req.params.id + ' updated');
		res.sendStatus(201);
	})
	.catch(next);
});
