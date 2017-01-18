'use strict';

const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//logging
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'));
}

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

//error handling endware
app.use( (err, req, res) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`) );

