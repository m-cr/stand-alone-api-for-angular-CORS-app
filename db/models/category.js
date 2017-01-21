'use strict';

const db = require('../_db');

module.exports = db.define('category', {
	name: db.Sequelize.STRING
});