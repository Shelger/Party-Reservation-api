const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const customer = db.define('customer', {
  customer_username: DataTypes.TEXT,
  password: DataTypes.TEXT
});

// (async () => {
//   await db.sync({ force: true });
// })();

module.exports = customer;