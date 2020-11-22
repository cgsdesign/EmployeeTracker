//mysql -u root -p
require('dotenv').config()
const mysql = require('mysql2');

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
    password: '',
    database: 'ice_creamDB'
  });
  
  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
  });
}
//--------------------------------------//
//-------------REMOVE------------------//
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


module.exports = {addEmployee, addRole, addDepartment, removeEmployee, testHookups}