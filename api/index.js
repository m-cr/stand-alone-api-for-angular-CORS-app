'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const app = require('../server.js');

const authenticated = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    let token = req.headers.authorization.split(' ')[1];
    let secret = app.get('serverSecret');
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        console.error(err);
        return res.send('Failed to authenticate token.');    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.status(403).send('No token provided.');
  }
}

router.use('/lineitems', authenticated, require('./lineitems'));
router.use('/orders', authenticated, require('./orders'));
router.use('/products', authenticated, require('./products'));
router.use('/reviews', authenticated, require('./reviews'));
router.use('/users', authenticated, require('./users'));
router.use('/categories', authenticated, require('./categories'));
router.use('/authenticate', require('./authenticate'));

module.exports = router;