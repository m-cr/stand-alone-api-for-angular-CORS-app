'use strict';
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

module.exports = app;

if ( process.env.NODE_ENV === 'development'){
	app.set('serverSecret', require('./config.js').serverSecret)
	app.use(require('morgan')('dev'));
} else {
	app.set('serverSecret', process.env.SERVER_SECRET);
}

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', require('./api'));

app.get('/', (req, res) => {
	res.send('API located at /api/ ...');
});

app.use( (err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, ()=> console.log(`listening on port ${port}`) );
