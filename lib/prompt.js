const inquirer = require('inquirer');
const {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees} = require('./addRemoveSee');
//What would you like to do?



//----------------------------------------//
//------------Secondary Prompts----------//
//--------------------------------------//

const promptRole = function() {

}
const promptDepartment = function() {

}
const promptManager = function() {

}
const promptNewEmployee = function(){

}
const promptNewRole = function(){

}
const promptNewDepartment = function(){

}
const pomptGetEmployeeId = function(){

}
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
                console.log('you selected Remove Employee');
                //removeEmployee(promptGetEmployeeId()); 
                        //get all employees and turn into checklist
                        //OR they mst know employee id
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