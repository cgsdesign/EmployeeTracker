//mysql -u root -p
require('dotenv').config()
const mysql = require('mysql2');
const db = require('../db/company_db.db');
const connection = require('../connect');
const { createPromptModule } = require('inquirer');
const { connect } = require('../connect');
//const {promptRole, promptDepartment, promptManager, promptNewEmployee, promptNewRole, promptNewDepartment, promptGetEmployeeId} = require("./promptSecondary")
//const refresh = require('prompt.js');  ???? how can  auto restart?

//--------------------------------------------//
//----------INITIAL TEST HOOKUPS-------------//
//------------------------------------------//
 const testHookups = function() {
//     console.log('connected as id ' + connection.threadId + '\n');
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
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id CROSS JOIN employees manager on manager.id = employees.manager_id ORDER BY departments.department_name`, function(err, res) {
      if (err) throw err;
      const tableGuts = res
      console.table(tableGuts);//prity table ^.^
      //connection.end();// this will auto pull me out of mysql
    });
}
// SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id CROSS JOIN employees manager on manager.id = employees.manager_id ORDER BY departments.department_name;
//--------------------------------------//
//----------------ADD------------------//
//------------------------------------//
const addEmployee = function(x,y,zfix2id,zfix2mgr){
  console.log(x,y,zfix2id,zfix2mgr);
  let depID = ''
  let depMgr = ''
  const query1 = connection.query(
    `SELECT id FROM roles WHERE title = '${zfix2id}'` , function(err, res) {
      if (err) throw err;
      depID =res[0].id
      console.log(depID, + '= role id')
      query2()
    })
  const query2 = function() {
  const query3 = connection.query(
    `SELECT employees.id FROM employees RIGHT JOIN roles ON roles.id = employees.role_id WHERE roles.title = '${zfix2mgr}'`, 
    function(err, res) {
        if (err) throw err;
        depMgr =res[0].id
        console.log(depMgr, +"= Manager id")
        placeEmp()
    })
    // const query2 = connection.query(
    //   `SELECT id FROM employees WHERE manager_id = '${zfix2mgr}'` , function(err, res) {
    //     if (err) throw err;
    //     depID =res[0].id
    //     console.log(depID)
    //     placeIt();
    //   })

  const placeEmp = () => {
    const query = connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: x,
        last_name: y,
        role_id: depID,
        manager_id: depMgr
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        seeEmployees()
      }
    );
  }
}
}
//------------------------------
const addRole = function(x,y,zfix2id){
  console.log(x,y,zfix2id);
  let depID = ''
  const query1 = connection.query(
    `SELECT id FROM departments WHERE department_name = '${zfix2id}'` , function(err, res) {
      if (err) throw err;
      depID =res[0].id
      console.log(depID)
      placeIt();
    })

  placeIt = () => {
    const query = connection.query(
      'INSERT INTO roles SET ?',
      {
        title: x,
        salary: y,
        department_id: depID
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        seeRoles()
      }
    );
  }
}
//-------------------------------
const addDepartment = function(depName){
  console.log(depName);
    const query = connection.query(
      'INSERT INTO departments SET ?',
      {
        department_name: depName
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' product inserted!\n');
        seeDepartments()
      }
    );
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