// get sequelize

const Sequelize = require("sequelize");

// set up connection        //database, username, password
// const sequelize = new Sequelize("just_tech_news_db", "username", "password", {

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;