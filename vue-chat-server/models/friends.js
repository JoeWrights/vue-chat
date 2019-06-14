const Sequelize = require('sequelize');
const sequelize = require('./index');

const Friends = sequelize.define('friends', {
  fid: {
    type: Sequelize.STRING,
    autoIncrement: false,
    primaryKey: true,
    unique: true,
  },
  fname: {
    type: Sequelize.STRING,
    unique: true,
  },
  fphone: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: '',
  },
  favatar: {
    type: Sequelize.STRING,
  },
  fgender: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  fage: {
    type: Sequelize.INTEGER,
    defaultValue: '',
  },
  faddr: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
});

module.exports = Friends;
