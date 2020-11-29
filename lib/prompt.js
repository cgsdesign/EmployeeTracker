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
            'Update Employee Role',
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
        //------------VIEWS (No Promps)-------------//
            if (action==='VIEW DEPARTMENTS') {
                console.log('you selected VIEW DEPARTMENTS');
                seeDepartments();
                //testHookups()
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
            else if (action==='VIEW ROLES') {
                console.log('you selected VIEW ROLES');
                seeRoles();
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
            else if (action=='VIEW EMPLOYEES') {
                console.log('you selected VIEW EMPLOYEES');
                seeEmployees();
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
        //------------VIEWS (With Promps)-------------//
            // else if (action=='View Employees by Department') {
            //     console.log('you selected View Employees by Department');
            //     //viewEmpByDept(promptDepartment());
            //     return "PRESS ENTER TO RETURN TO PROMPTS"
            // }
            // else if (action=='View Employees By Manager') {
            //     console.log('you selected View Employees By Manager');
            //     viewByMng(promptManager());
            //     return "PRESS ENTER TO RETURN TO PROMPTS"
            // }
        //--------------------ADD-----------------------------//
            else if (action =='ADD EMPLOYEE'){
                console.log('you selected ADD EMPLOYEE');
                promptNewEmployee()
                .then((data) => {
                    //console.log(data)
                    addEmployee(data.first_name,data.last_name,data.role_id,data.manager_id)
                })
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
            else if (action =='ADD ROLE'){
                console.log('you selected ADD ROLE');
                promptNewRole()
                .then((data) => {
                    // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                     addRole(data.title,data.salary,data.department_id )     
                 });
                 return "PRESS ENTER TO RETURN TO PROMPTS"
            }
            else if (action =='ADD DEPARTMENT'){
                console.log('you selected ADD DEPARTMENT');
                promptNewDepartment()
                .then((data) => {
                    addDepartment(data.department_name);
                })
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
        //----------------------REMOVE-----------------------------//
            else if  (action=='REMOVE EMPLOYEE') {
                console.log('you selected REMOVE EMPLOYEE');
                promptGetEmployeeId()
                .then((data) => {
                   // console.log(Object.keys(data))===== THIS IS A VERY HELPFUL WAY TO TEST WHAT IS COMING IN
                    removeEmployee(data.id)     
                });
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
        //----------------------UPDATE-----------------------------//    
            else if (action== 'Update Employee Role') {
                console.log('you selected Update Employee Role');
                promptUpdateEmployee()
                .then((data) => {
                    updateEmployee(data.id,data.title)
                })
                return "PRESS ENTER TO RETURN TO PROMPTS"
            }
            else if (action== 'EXIT') {
                return "Goodbye"
            }
            console.log('ERROR WITH CHOICE SELECTION, PLEASE QUIT AND TRY AGAIN')
            return "PRESS ENTER TO RETURN TO PROMPTS"   
    })
    .then((WHAT) =>{
        console.log(WHAT)
        //promptMe()
        })
}





module.exports = promptMe