const Sequelize = require('sequelize');
const sequelize = new Sequelize('chat', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
  },
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;