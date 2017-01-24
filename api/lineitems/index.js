'use strict';
const router = require('express').Router();
const LineItem = require('../../db').models.LineItem;
const Product = require('../../db').models.Product;
const Order = require('../../db').models.Order;

module.exports = router;

router.get('/', (req, res, next) => {
  LineItem.findAll({
    include: [Product, Order]
  })
  .then( (lineItems) => {
    res.send(lineItems);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  LineItem.findOne({
    where: {id: req.params.id},
    include: [Product, Order]
  })
  .then( lineItems => {
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
  .then( lineitem => {
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
