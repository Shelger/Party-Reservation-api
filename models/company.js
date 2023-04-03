const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const company = db.define('company', {
  company_username: DataTypes.TEXT,
  password: DataTypes.TEXT
});

//  (async () => {
//    await db.sync({ force: true });
//  })();

module.exports = company;