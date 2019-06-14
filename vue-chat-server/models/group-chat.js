const Sequelize = require('sequelize');
const sequelize = require('./index');

const GroupChat = sequelize.define('groupChat', {
  uid: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    unique: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  chat_time: {
    type: Sequelize.DATE,
  },
  message: {
    type: Sequelize.STRING,
  },
  pic: {
    type: Sequelize.STRING,
  },
  unread: {
    type: Sequelize.TINYINT,
    defaultValue: 1,
  },
}, {
  tableName: 'groupChat',
});

module.exports = GroupChat;