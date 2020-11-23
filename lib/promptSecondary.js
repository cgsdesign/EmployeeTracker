require('dotenv').config()
const mysql = require('mysql2');
const db = require('../db/company_db.db');
const connection = require('../connect');
const inquirer = require('inquirer');
//What would you like to do?

//----------------------------------------//
//----------DBquery to populate Prompts-------//
//--------------------------------------//
const roleList =[]
const findRoles = function(roles) {
 const query = connection.query(
    'SELECT department_name FROM departments',
    function(err, res) {
        if (err) throw err;
        const tableGuts = res
        //console.table(tableGuts);//prity table ^.
        //connection.end();// this will auto pull me out of mysql
        for(i=0; i<tableGuts.length; i++){
        roleList.push(tableGuts[i].department_name);
        //console.log(roleList)
        }
      }
    );
}

//----------------------------------------//
//------------Secondary Prompts----------//
//--------------------------------------//
//----------------------------------------PROMPT 
const promptNewRole = function() {
    findRoles()
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
            message: 'What is the salery (no comas)?',
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
            choices: roleList,
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


const promptDepartment = function() {

}

const promptManager = function() {

}

// const promptGetEmployeeId = function(){//find emp by id
//     inquirer
//     .prompt({
//         type: 'input',
//         name: 'id',
//         message: 'What is removed employees id?',
//         validate: descriptionInput => {
//             if (descriptionInput) {
//               return true;
//             } else {
//               console.log('Please enter number');
//               return false;
//             }
//           }
//     })
//     return 
// };

const promptNewEmployee = function(){//create new emp

}


const promptNewDepartment = function(){//creaing new dept

}

module.exports = {promptNewRole, promptGetEmployeeId, promptDepartment, promptManager, promptNewEmployee, promptNewDepartment}