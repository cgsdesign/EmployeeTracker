const inquirer = require('inquirer');
const {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees} = require('./addRemoveSee');
const {promptNewRole, promptGetEmployeeId, promptDepartment, promptManager, promptNewEmployee, promptNewDepartment} = require("./promptSecondary")

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
            'VIEW DEPARTMENTS',
            'VIEW ROLES', 
            'VIEW EMPLOYEES',
            //'View Employees by Department',//Optional
            //'View Employees By Manager',//Optional
            'ADD EMPLOYEE',
            'ADD ROLE',
            //'Add Department',-----------
            'REMOVE EMPLOYEE'
            //'Update Employee Role'--------------
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
    //---------------------------------------------------//
    //------------Secondary Prompts/actions-------------//switch was glitching due to == vs ===
    //-------------------------------------------------//
    .then(({action}) => {
        console.log(action)
        //------------VIEWS (No Promps)-------------//
            if (action=='VIEW DEPARTMENTS') {
                console.log('you selected VIEW DEPARTMENTS');
                seeDepartments();
                //testHookups()
                return
            }
            else if (action=='VIEW ROLES') {
                console.log('you selected VIEW ROLES');
                seeRoles();
                return
            }
            else if (action=='VIEW EMPLOYEES') {
                console.log('you selected VIEW EMPLOYEES');
                seeEmployees();
                return
            }
        //------------VIEWS (With Promps)-------------//
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
        //--------------------ADD-----------------------------//
            else if (action =='ADD EMPLOYEE'){
                console.log('you selected ADD EMPLOYEE');
                promptNewEmployee()
                .then((data) => {
                    //console.log(data)
                    addEmployee(data.first_name,data.last_name,data.role_id,data.manager_id)
                })
                return;
            }
            else if (action =='ADD ROLE'){
                console.log('you selected ADD ROLE');
                promptNewRole()
                .then((data) => {
                    // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                     addRole(data.title,data.salary,data.department_id )     
                 });
                 return;
            }
            else if (action =='Add Department'){
                console.log('you selected Add Department');
                //addDepartment(promptNewDepartment());
                return;
            }
        //----------------------REMOVE-----------------------------//
            else if  (action=='REMOVE EMPLOYEE') {
                console.log('you selected REMOVE EMPLOYEE');
                promptGetEmployeeId()
                .then((data) => {
                   // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                    removeEmployee(data.id)     
                });
                return;
            }
        //----------------------UPDATE-----------------------------//    
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