const Sequelize = require('sequelize');
const sequelize = require('./index');
const Friends = require('./friends');
const Chat = require('./chat');

const Users = sequelize.define('users', {
  uid: {
    type: Sequelize.UUID,
    autoIncrement: false,
    primaryKey: true,
    unique: true,
    defaultValue: Sequelize.UUIDV1,
  },
  token: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: '',
  },
  avatar: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
    defaultValue: 'male',
  },
  age: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  addr: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  register_at: {
    type: Sequelize.DATE,
  },
});

Users.belongsToMany(Friends, { through: Chat, foreignKey: 'uid' });
Friends.belongsToMany(Users, { through: Chat, foreignKey: 'fid'});

module.exports = Users;