const Sequelize = require("sequelize");

module.exports = new Sequelize("reservation", "eric", "123456", {
  host: "localhost",
  dialect: "postgres",
});
