'use strict';

const router = require('express').Router();
const models = require('../../db').models;
const User = models.User;
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