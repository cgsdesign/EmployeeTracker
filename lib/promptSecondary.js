const inquirer = require('inquirer');
//const {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees} = require('./addRemoveSee');
//What would you like to do?

//----------------------------------------//
//------------Secondary Prompts----------//
//--------------------------------------//
//----------------------------------------PROMPT 
const promptNewRole = function() {
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
        type: 'input',
        name: 'department_id',
        message: 'What is the department id?',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter id');
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