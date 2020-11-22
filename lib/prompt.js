const inquirer = require('inquirer');
const {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees} = require('./addRemoveSee');
const {promptRole, promptDepartment, promptManager, promptNewEmployee, promptNewRole, promptNewDepartment} = require("./promptSecondary")

const promptGetEmployeeId = function(){//find emp by id
    inquirer
    .prompt({
        type: 'input',
        name: 'id',
        message: 'What is removed employees id?',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter number');
              return false;
            }
          }
    })
    return 
};
//----------------------------------------//
//------------Primary Prompt-------------//
//--------------------------------------//
const promptMe = function() {
    inquirer
    .prompt({
        type: 'checkbox',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles', 
            'View All Employees',
            'View Employees by Department',//Optional
            'View Employees By Manager',//Optional
            'Add Employee',
            'Add Role',
            'Add Department',
            'Remove Employee',
            'Update Employee Role'
            //,'Update Employee Manager'//Optional
            //,'View department utalized budget'//Optional
        ],
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please select an action');
              return false;
            }
          }
    })
    //NOTE!! No idea why switch does not work except that it is not ===. Using IF ELSE
    .then(({action}) => {
        console.log(action)
            if (action=='View All Departments') {
                console.log('you selected View All Departments');
                seeDepartments();
                //testHookups()
                return
            }
            else if (action=='View All Roles') {
                console.log('you selected View All Roles');
                seeRoles();
                return
            }
            else if (action=='View All Employees') {
                console.log('you selected View All Employees');
                seeEmployees();
                return
            }
            else if (action=='View Employees by Department') {
                console.log('you selected View Employees by Department');
                //viewEmpByDept(promptDepartment());
                return
            }
            else if (action=='View Employees By Manager') {
                console.log('you selected View Employees By Manager');
                //viewByMng(promptManager());
                return//
            }
            else if (action =='Add Employee'){
                console.log('you selected Add Employee');
                //addEmployee(promptNewEmployee());
                return;
            }
            else if (action =='Add Role'){
                console.log('you selected Add Role');
                //addRole(promptNewRole());
                return;
            }
            else if (action =='Add Department'){
                console.log('you selected Add Department');
                //addDepartment(promptNewDepartment());
                return;
            }

            else if  (action=='Remove Employee') {
                console.log('you selected Remove Employee');//-------------------------------
                const promptGetEmployeeId = function(){//find emp by id
                    return inquirer.prompt({//require must be above
                        type: 'input',
                        name: 'id',
                        message: 'What is removed employees id?',
                        validate: descriptionInput => {
                            if (descriptionInput) {
                              return true;
                            } else {
                              console.log('Please enter number');
                              return false;
                            }
                          }
                    })
                };
                promptGetEmployeeId()
                .then((data) => {
                   // console.log(Object.keys(data))================ THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                    removeEmployee(data.id)     
                });
                return;
            }
            else if (action== 'Update Employee Role') {
                console.log('you selected Update Employee Role');
                //updateEmployee(promptRole(promptGetEmployeeId()));
                    //get roles > feed into checkbox > update info
                return;
            }
            console.log('An error has occured...restart')
        
    }) 
}






module.exports = promptMe