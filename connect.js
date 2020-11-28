require('dotenv').config();
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'company_db'
  });

connection.connect(err => {
  if (err) throw err;
  console.log(' ')
  //console.log('connected as id ' + connection.threadId + '\n');
});

// // simple query
// connection.query(
//   'SELECT * FROM employees',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//    // console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

module.exports = connection