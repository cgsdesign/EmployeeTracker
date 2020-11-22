//mysql -u root -p
require('dotenv').config()
const mysql = require('mysql2');
const db = require('../db/company_db.db')
//const refresh = require('prompt.js');  ???? how can  auto restart?

//--------------------------------------------//
//----------INITIAL TEST HOOKUPS-------------//
//------------------------------------------//
const testHookups = function() {

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'D3athStar',
    database: 'company_db'
  });
  
  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
  });
}
//--------------------------------------//
//----------------ADD------------------//
//------------------------------------//
const addEmployee = function(){
    
}

const addRole = function(){
    
}

const addDepartment = function(){
    
}
//--------------------------------------//
//-------------REMOVE------------------//
//------------------------------------//
const removeEmployee = function(){
    
}

//--------------------------------------//
//---------------SEE-------------------//
//------------------------------------//
const seeDepartments = function(){
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'company_db'
  });

  connection.connect(err => {
    if (err) throw err;
    afterConnection();
  });
  
  afterConnection = () => {
    connection.query('SELECT name FROM departments', function(err, res) {
      if (err) throw err;
      console.table(res);//prity table ^.^
      connection.end();// this will auto pull me out of mysql
      console.log("need to refresh prompt...")
    });

  };
}

const seeRoles = function(){
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'company_db'
  });

  connection.connect(err => {
    if (err) throw err;
    afterConnection();
  });
  
  afterConnection = () => {
    connection.query('SELECT title FROM roles', function(err, res) {
      if (err) throw err;
      console.table(res);//prity table ^.^
      connection.end();// this will auto pull me out of mysql
      console.log("need to refresh prompt...")
    });

  };    
}

const seeEmployees = function(){
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'company_db'
  });

  connection.connect(err => {
    if (err) throw err;
    afterConnection();
  });
  
  afterConnection = () => {
    connection.query('SELECT first_name, last_name FROM employees', function(err, res) {
      if (err) throw err;
      console.table(res);//prity table ^.^
      connection.end();// this will auto pull me out of mysql
      console.log("need to refresh prompt...")
    });

  };
}




module.exports = {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees}