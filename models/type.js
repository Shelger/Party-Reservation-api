const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const type = db.define('type', {
    type: DataTypes.TEXT
});

// (async () => {
//   await db.sync({ force: true });
// })();

module.exports = type; 