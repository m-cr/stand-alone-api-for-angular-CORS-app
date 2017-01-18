'use strict';
const db = require('../_db');

module.exports = db.define('user', {
	email: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	isAdmin: {
		type: db.Sequelize.BOOLEAN,
		defaultValue: false
	}
});