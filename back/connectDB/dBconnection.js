const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "crud_uade",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.log("Failed to connect");
    return;
  }
  console.log("Connection established");
});

const sequelize = new Sequelize("crud_uade", "root", "", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

module.exports = { connection, sequelize };
