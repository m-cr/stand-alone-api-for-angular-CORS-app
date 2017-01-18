'use strict';
const db = require('../_db');

module.exports = db.define('lineitem', {
	quantity: db.Sequelize.INTEGER,
	price: db.Sequelize.FLOAT
});
