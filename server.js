'use strict';
const config = require('./config.js');
const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

module.exports = app;

app.set('serverSecret', config.serverSecret);

//logging
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
	res.send("API calls located at /api/ ...");
});

//error handling endware
app.use( (err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`) );

// console.log(app);


