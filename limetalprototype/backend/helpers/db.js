// Check the Connection wiht DataBase
require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection(JSON.parse(process.env.DB));

connection.connect(function (err) {

  if (err) {

    console.log(err);

  }

  console.log("Connected to database");

  setInterval(function () {

    db.query("SELECT 1");

  }, 3000);

});
connection.runQuery = async (q) => {

  return new Promise((resolve, reject) => {

    db.query(q, (err, results) => {

      if (err) {

        return reject(err.message);

      }
      resolve(results);

    });

  });

};

module.exports =connection;