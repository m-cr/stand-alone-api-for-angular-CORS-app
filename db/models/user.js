'use strict';
const db = require('../_db');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = db.define('user', {
  email: {
    type: db.Sequelize.STRING
  },
  password: {
    type: db.Sequelize.STRING
  },
  salt: {
    type: db.Sequelize.STRING
  }
}, {
  instanceMethods: {
    sanitize: function() {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },
    correctPassword: function(candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
    }
  },
  classMethods: {
    generateSalt: function() {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function(plainText, salt){
      let hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    }
  },
  hooks: {
    beforeCreate: function(user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
      }
    },
    beforeUpdate: function(user) {
      if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
      }
    }
  }
});
