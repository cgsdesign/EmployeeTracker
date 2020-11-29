require('dotenv').config()
const mysql = require('mysql2');
const db = require('../db/company_db.db');
const connection = require('../connect');
const inquirer = require('inquirer');
//What would you like to do?

//---------------------------------------------//
//----------DBquery to populate Prompts-------//
//-------------------------------------------//
let departmentList =[]
const findDepartment = function() {
 const query = connection.query(
    'SELECT department_name FROM departments',
    function(err, res) {
        if (err) throw err;
        const tableGuts = res
        for(i=0; i<tableGuts.length; i++){
        departmentList.push(tableGuts[i].department_name);
        //console.log(departmentList)
        }
        //connection.end();// this will auto pull me out of mysql
      }
    );
}

let rolesList =[]
const findRoles = function() {
 const query = connection.query(
    'SELECT title FROM roles',
    function(err, res) {
        if (err) throw err;
        const tableGuts = res
        for(i=0; i<tableGuts.length; i++){
        rolesList.push(tableGuts[i].title);
        //console.log(departmentList)
        }
        //connection.end();// this will auto pull me out of mysql
      }
    );
}

let managerList =[]
const findMangers = function() {
 const query = connection.query(
  `SELECT roles.title FROM employees LEFT JOIN roles ON roles.id = employees.role_id WHERE manager_id IS NULL`,    
  //`SELECT CONCAT(first_name,' ',last_name) FROM employees WHERE manager_id IS NULL`,
    function(err, res) {
        if (err) throw err;
        const tableGuts = res
        for(i=0; i<tableGuts.length; i++){
        managerList.push(tableGuts[i].title); 
        //connection.end();// this will auto pull me out of mysql
        }
      }
    );
}

const promptGetEmployeeId = function(){//find emp by id
  return inquirer.prompt({//require must be above
      type: 'input',
      name: 'id',
      message: 'What is the employee id?',
      validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter id');
            return false;
          }
        }
  })
};



//----------------------------------------//
//------------Secondary Prompts----------//
//--------------------------------------//
//----------------------------------------PROMPT NEW ROLE
const promptNewRole = function() {
    findDepartment()
    // .then(({data}) => {
    //     console.log(data)})
        return inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the new title?',
            validate: descriptionInput => {
                if (descriptionInput) {
                return true;
                } else {
                console.log('Please enter title');
                return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salery? no comas',
            validate: descriptionInput => {
                if (descriptionInput) {
                return true;
                } else {
                console.log('Please enter sallery');
                return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'department_id',
            message: 'What department is the role in?',
            choices: departmentList,
            validate: descriptionInput => {
                if (descriptionInput) {
                  return true;
                } else {
                  console.log('Please select department');
                  return false;
                }
              }
        } 

        ])
    
}



const promptDepartment = function() {

}

const promptManager = function() {

}
//----------------------------------------PROMPT NEW EMPLOYEE
const promptNewEmployee = function(){
  findRoles()
  findMangers()
      return inquirer.prompt([{
          type: 'input',
          name: 'first_name',
          message: 'What is his/her first name?',
          validate: descriptionInput => {
              if (descriptionInput) {
              return true;
              } else {
              console.log('Please enter name');
              return false;
              }
          }
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'What is his/her last name?',
          validate: descriptionInput => {
              if (descriptionInput) {
              return true;
              } else {
              console.log('Please enter name');
              return false;
              }
          }
      },
      {
          type: 'checkbox',
          name: 'role_id',
          message: 'What is his/her role?',
          choices: rolesList,
          validate: descriptionInput => {
              if (descriptionInput) {
                return true;
              } else {
                console.log('Please select role');
                return false;
              }
            }
      },
      {
        type: 'checkbox',
        name: 'manager_id',
        message: 'What is his/her managers by title?',
        choices: managerList
      } 

    ])
  
}


//----------------------------------------PROMPT NEW DEPARTMENT
const promptNewDepartment = function(){
  return inquirer.prompt([{
    type: 'input',
    name: 'department_name',
    message: 'What is the new position?',
    validate: descriptionInput => {
        if (descriptionInput) {
        return true;
        } else {
        console.log('Please enter name');
        return false;
        }
      }
  }])
}


//-------------------------------------PROMPT UPDATE EMPLOYEE
const promptUpdateEmployee = function(){
  findRoles()
  return inquirer.prompt([
      { 
        type: 'input',
        name: 'id',
        message: 'What is the Employee ID?'
      },
      {
        type: 'checkbox',
        name: 'title',
        message: 'What is his/her new role?',
        choices: rolesList
      }
  ])
}

module.exports = {promptNewRole, promptGetEmployeeId, promptDepartment, promptManager, promptNewEmployee, promptNewDepartment, promptUpdateEmployee}