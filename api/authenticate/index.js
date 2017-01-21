const router = require('express').Router();
const app = require('../../server.js');
const jwt = require('jsonwebtoken');
const User = require('../../db').models.User;

module.exports = router;

router.post('/', (req, res, next) => {
	User.findOne({
		where: {email: req.body.email}
	})
	.then( user => {
		if (!user) {
			return res.send('Authentication Fialed: Incorrect credentials.')
		} else if (user.correctPassword(req.body.password)) {
			let token = jwt.sign(user.sanitize(), app.get('serverSecret'), {
				expiresIn: '1 day'
			});
			return res.send ({
				success: true,
				message: 'Token Granted',
				token: token
			});
		} 
		res.send('Authentication Fialed: Incorrect credentials.')
	})
	.catch(next);
});
