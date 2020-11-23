//mysql -u root -p
require('dotenv').config()
const mysql = require('mysql2');
const db = require('../db/company_db.db');
const connection = require('../connect');
const { createPromptModule } = require('inquirer');
//const {promptRole, promptDepartment, promptManager, promptNewEmployee, promptNewRole, promptNewDepartment, promptGetEmployeeId} = require("./promptSecondary")
//const refresh = require('prompt.js');  ???? how can  auto restart?

//--------------------------------------------//
//----------INITIAL TEST HOOKUPS-------------//
//------------------------------------------//
 const testHookups = function() {

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     // Your MySQL username
//     user: 'root',
//     // Your MySQL password
//     password: '',
//     database: 'company_db'
//   });
  
//   connection.connect(err => {
//     if (err) throw err;
//     console.log('connected as id ' + connection.threadId + '\n');
//   });
 }

//--------------------------------------//
//---------------SEE-------------------//
//------------------------------------//
//DEPARTMENT----------------------------------------------------------------------------------
const seeDepartments = function(){
  const query = connection.query(
    'SELECT * FROM departments', function(err, res) {
      if (err) throw err;
      const tableGuts = res
      console.table(tableGuts);//prity table ^.^
      //connection.end();// this will auto pull me out of mysql
    });
}
//ROLE----------------------------------------------------------------------------------------
const seeRoles = function(){
  const query = connection.query(
    'SELECT roles.id, title, salary, departments.department_name FROM roles LEFT JOIN departments ON departments.id = roles.department_id', function(err, res) {
      if (err) throw err;
      const tableGuts = res
      console.table(tableGuts);//prity table ^.^
      //connection.end();// this will auto pull me out of mysql
    });
}
//EMPLOYEE----------------------------------------------------------------------------------------
const seeEmployees = function(){
  const query = connection.query(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name FROM employees CROSS JOIN roles ON roles.id = employees.role_id CROSS JOIN departments ON departments.id = roles.department_id', function(err, res) {
      if (err) throw err;
      const tableGuts = res
      console.table(tableGuts);//prity table ^.^
      //connection.end();// this will auto pull me out of mysql
    });
}

//--------------------------------------//
//----------------ADD------------------//
//------------------------------------//
const addEmployee = function(){
    
}

const addRole = function(x,y,z){
  console.log(x,y,z);
  const query = connection.query(
    'INSERT INTO roles SET ?',
    {
      title: x,
      salary: y,
      department_id: z
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      seeRoles()
    }
  );
}

const addDepartment = function(){
    
}
//--------------------------------------//
//-------------REMOVE------------------//
//------------------------------------//
const removeEmployee = function(idIncoming){
 employeeD = idIncoming
    //console.log(`Deleting ${employeeD}`);
      const query = connection.query(
        'DELETE FROM employees WHERE ?', {id: employeeD},
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' products deleted!\n');
          console.log(query.sql);
        }
      )
  }    




module.exports = {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees}