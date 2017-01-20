const router = require('express').Router();
const app = require('../../server.js');
const jwt = require('jsonwebtoken');
const User = require('../../db').models.User;

module.exports = router;

router.post('/', (req, res, next) => {
	// console.log(req.body);
	// console.log(req.headers.authorization);
	User.findOne({
		where: {email: req.body.email}
	})
	.then( user => {
		if (!user) {
			res.send('Authentication Fialed: Incorrect credentials.')
		} else if (user.correctPassword(req.body.password)) {
			
			let token = jwt.sign(user.sanitize(), app.get('serverSecret'), {
				expiresIn: '1 day'
			});

			res.send ({
				success: true,
				message: 'See Token',
				token: token
			});

		} 
		else res.send('Authentication Fialed: Incorrect credentials.')
	})
	.catch(next);
});
