const inquirer = require('inquirer');
const {addEmployee, addRole, addDepartment, removeEmployee, testHookups, seeDepartments, seeRoles, seeEmployees, updateEmployee} = require('./addRemoveSee');
const {promptNewRole, promptGetEmployeeId, promptDepartment, promptManager, promptNewEmployee, promptNewDepartment, promptUpdateEmployee} = require("./promptSecondary")

//----------------------------------------//
//------------Primary Prompt-------------//
//--------------------------------------//
const promptMe = function() {
    inquirer
    .prompt([
        {
        type: 'list',
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
            'ADD DEPARTMENT',
            'REMOVE EMPLOYEE',
            'UPDATE EMPLOYEE ROLE',
            'EXIT'
        ]
            //,'Update Employee Manager'//Optional
            //,'View department utalized budget'//Optional
        }
    ])
    //---------------------------------------------------//
    //------------Secondary Prompts/actions-------------//switch was glitching due to == vs ===
    //-------------------------------------------------//
    .then(res => {
        action = res.action
        //console.log(action)
        switch(action) {
        //------------VIEWS (No Promps)-------------//
            case 'VIEW DEPARTMENTS': {
                console.log('you selected VIEW DEPARTMENTS');
                seeDepartments();
                //testHookups()
                break
            };
            case 'VIEW ROLES': {
                console.log('you selected VIEW ROLES');
                seeRoles();
                break
            }
            case 'VIEW EMPLOYEES': {
                console.log('you selected VIEW EMPLOYEES');
                seeEmployees();
                break
            };
        //------------VIEWS (With Promps)-------------//
            // case 'View Employees by Department': {
            //     console.log('you selected View Employees by Department');
            //     //viewEmpByDept(promptDepartment());
            //     break
            // }
            // case'View Employees By Manager': {
            //     console.log('you selected View Employees By Manager');
            //     viewByMng(promptManager());
            //     break
            // }
        //--------------------ADD-----------------------------//
            case 'ADD EMPLOYEE': {
                console.log('you selected ADD EMPLOYEE');
                promptNewEmployee()
                .then((data) => {
                    //console.log(data)
                    addEmployee(data.first_name,data.last_name,data.role_id,data.manager_id)
                })
                break
            };
           case 'ADD ROLE':{
                console.log('you selected ADD ROLE');
                promptNewRole()
                .then((data) => {
                    // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                     addRole(data.title,data.salary,data.department_id )     
                 });
                 break
            };
            case 'ADD DEPARTMENT':{
                console.log('you selected ADD DEPARTMENT');
                promptNewDepartment()
                .then((data) => {
                    addDepartment(data.department_name);
                })
                break
            };
        //----------------------REMOVE-----------------------------//
            case 'REMOVE EMPLOYEE': {
                console.log('you selected REMOVE EMPLOYEE');
                promptGetEmployeeId()
                .then((data) => {
                   // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                    removeEmployee(data.id)     
                });
                break
            };
        //----------------------UPDATE-----------------------------//    
            case 'UPDATE EMPLOYEE ROLE': {
                console.log('you selected UPDATE EMPLOYEE ROLE');
                promptUpdateEmployee()
                .then((data) => {
                    updateEmployee(data.id,data.title)
                })
                 break
            };
            default: 
            connection.end();
            
        }
    })
    //.then(() => promptMe());
}





module.exports = promptMe