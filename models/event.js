const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const event = db.define('event', {
  company_id: DataTypes.INTEGER,
  title: DataTypes.TEXT,
  image: DataTypes.TEXT,
  num_player: DataTypes.INTEGER,
  limit_player: DataTypes.INTEGER,
  regular_price: DataTypes.INTEGER,
  additional_price: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  type_id: DataTypes.INTEGER
});

// (async () => {
//   await db.sync({ force: true });
// })();

module.exports = event; 