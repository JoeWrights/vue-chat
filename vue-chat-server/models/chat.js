const Sequelize = require('sequelize');

const sequelize = require('./index');

const Chat = sequelize.define('chat', {
  uid: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    unique: true,
  },
  fid: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    unique: true,
  },
  message: {
    type: Sequelize.JSON,
  },
}, {
  tableName: 'chat',
});

module.exports = Chat;
