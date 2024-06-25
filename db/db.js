const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "",
  database: "cac_store",
});

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Conectados");
});

module.exports = connection;
