'use strict';

const router = require('express').Router();

const authenticated = (req, res, next) => {
	
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
			if (err) {
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