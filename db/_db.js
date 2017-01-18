'use strict';
const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/siriusiqmobile', {
	logging: console.log
});