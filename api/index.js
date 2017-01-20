'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const app = require('../server.js');

const authenticated = (req, res, next) => {
	
	let token;

	console.log(req.headers.authorization);

	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.authorization.split(' ')[1];
	}

	console.log('token: ' + token);

	if (token) {
		jwt.verify(token, app.get('serverSecret'), function(err, decoded) {      
			if (err) {
				console.error(err);
				return res.send('Failed to authenticate token.');    
			} else {
				req.decoded = decoded;    
				next();
			}
		});
	} else {
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});
	}
}

router.use('/lineitems', authenticated, require('./lineitems'));
router.use('/orders', authenticated, require('./orders'));
router.use('/products', authenticated, require('./products'));
router.use('/reviews', authenticated, require('./reviews'));
router.use('/users', authenticated, require('./users'));
router.use('/authenticate', require('./authenticate'));

module.exports = router;