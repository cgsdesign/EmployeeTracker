//mysql -u root -p
require('dotenv').config()
const mysql = require('mysql2');
const inquirer = require('inquirer');
const promptMe = require('./scripts/prompt')
//const prompts = require('./scripts/prompts.js');

// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

//  const connection = mysql.createConnection({
//    host: process.env.DB_HOST,
//    port: 3306,
//    username: process.env.DB_USER,
//    password: process.env.DB_PASS,
//  });

// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId + '\n');
// });

// // simple query
// connection.query(
//   'SELECT * FROM employees',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

promptMe()