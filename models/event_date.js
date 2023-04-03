const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../config/database');

const event_date = db.define('event_date', {
    event_id: DataTypes.INTEGER,
    day: DataTypes.TEXT,
    time: DataTypes.TEXT
});

// (async () => {
//   await db.sync({ force: true });
// })();

module.exports = event_date; 