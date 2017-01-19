'use strict';

const router = require('express').Router();

router.use('/lineitems', require('./lineitems'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/authenticate', require('./authenticate'));

module.exports = router;