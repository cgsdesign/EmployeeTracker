const inquirer = require('inquirer');
//What would you like to do?
    //View All Employees
    //View All Employees by Department
    //View All Employees By Manger
    //Add Employee
    //Remove Employee
    //Update Emloyee Role
        //What is the employee's new role?
    //Update Employee Manager
        //Who is their new Manger?

// const prompts= function (){
// }

//Make Manager
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
                //viewDept();
                return
            }
            else if (action=='View All Roles') {
                console.log('you selected View All Roles');
                //viewEmp;
                return
            }
            else if (action=='View All Employees') {
                console.log('you selected View All Employees');
                //viewEmp;
                return
            }
            else if (action=='View Employees by Department') {
                console.log('you selected View Employees by Department');
                //viewEmp;
                return
            }
            else if (action=='View Employees By Manager') {
                console.log('you selected View Employees By Manager');
                //viewByMng(askManager());
                return//
            }
            else if (action =='Add Employee'){
                console.log('you selected Add Employee');
                //addEmployee();
                return;
            }
            else if (action =='Add Role'){
                console.log('you selected Add Role');
                //addEmployee();
                return;
            }
            else if (action =='Add Department'){
                console.log('you selected Add Department');
                //addEmployee();
                return;
            }
            else if  (action=='Remove Employee') {
                console.log('you selected Remove Employee');
                //removeEmployee();
                return;
            }
            else if (action== 'Update Employee Role') {
                console.log('you selected Update Employee Role');
                //updateEmployee();
                return;
            }
            console.log('An error has occured...restart')
        
    }) 
}






module.exports = promptMe