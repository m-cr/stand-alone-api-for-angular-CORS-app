'use strict';

var router = require('express').Router();

router.use('/products' , require('./products'));
router.use('/orders' , require('./orders'));
router.use('/reviews' , require('./reviews'));
router.use('/lineitems' , require('./lineitems'));

//maybe not needed
// router.use('/categories' , require('./categories'));

module.exports = router;