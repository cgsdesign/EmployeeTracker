//mysql -u root -p
require('dotenv').config();
const mysql = require('mysql2');
const db = require('./db/company_db.db');
const inquirer = require('inquirer');
const connection = require('./connect');
const {promptNewRole, promptGetEmployeeId, promptDepartment, promptManager, promptNewEmployee, promptNewDepartment, promptUpdateEmployee} = require("./lib/promptSecondary")



    //END =-------------------
    const endAction = function(){
        inquirer.prompt([{
            name: 'nextStep',
            message: 'Do you want to exit?'
        }]).then(res => {
            input = res.nextStep
            if (input !== 'y'){
                promptMe()
                return
            }
            connection.end()
        })
    }
    //--------------------------------------//
    //---------------SEE-------------------//
    //------------------------------------//
    //DEPARTMENT----------------------------------------------------------------------------------
    const seeDepartments = function(){
       query = connection.query(
        'SELECT * FROM departments', function(err, res) {
          if (err) throw err;
          console.table(res);
          endAction()
        });
    }
    
    //ROLE----------------------------------------------------------------------------------------
    const seeRoles = function(){
      query = connection.query(
        'SELECT roles.id, title, salary, departments.department_name FROM roles LEFT JOIN departments ON departments.id = roles.department_id', function(err, res) {
          if (err) throw err;
          console.table(res);
          endAction()
        });
    }
    //EMPLOYEE----------------------------------------------------------------------------------------
    const seeEmployees = function(){
      query = connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY departments.department_name`, function(err, res) {
          if (err) throw err;
          console.table(res);//prity table ^.^
          endAction();// this will auto pull me out of mysql
        });
    }
    // SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id CROSS JOIN employees manager ON manager.id = employees.manager_id ORDER BY departments.department_name;
    //--------------------------------------//
    //----------------ADD------------------//
    //------------------------------------//
    const addEmployee = function(x,y,zfix2id,zfix2mgr){
      console.log(x,y,zfix2id,zfix2mgr);
      let depID = ''
      let depMgr = ''
      query = connection.query(
        `SELECT id FROM roles WHERE title = '${zfix2id}'` , function(err, res) {
          if (err) throw err;
          depID =res[0].id
          query2()
        })
      const query2 = function() {
          query = connection.query(
            `SELECT employees.id FROM employees RIGHT JOIN roles ON roles.id = employees.role_id WHERE roles.title = '${zfix2mgr}'`, 
            function(err, res) {
                if (err) throw err;
                depMgr =res[0].id
                placeEmp()
            })
          }
    
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
            seeEmployees()
          }
        );
      }
    
    }
    //------------------------------
    const addRole = function(x,y,zfix2id){
      //console.log(x,y,zfix2id);
      let depID = ''
      const query1 = connection.query(
        `SELECT id FROM departments WHERE department_name = '${zfix2id}'` , function(err, res) {
          if (err) throw err;
          depID =res[0].id
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
            console.log('role added');
            seeRoles()
          }
        );
      }
    }
    //-------------------------------
    const addDepartment = function(depName){
      //console.log(depName);
        const query = connection.query(
          'INSERT INTO departments SET ?',
          {
            department_name: depName
          },
          function(err, res) {
            if (err) throw err;
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
          query = connection.query(
            'DELETE FROM employees WHERE ?', {id: employeeD},
          )
          console.log('employee deleted')
          seeEmployees()
      }    
    //--------------------------------------------------//
    //-----------UPDATE EMPLOYEE ROLE------------------//
    //------------------------------------------------//
    const updateEmployee = function(idIncoming,role){
      let roleID = ''
      let ID = idIncoming
      const query1 = connection.query(
        `SELECT id FROM roles WHERE title = '${role}'` , function(err, res) {
          if (err) throw err;
          roleID =res[0].id
          placeIt()
        })
        placeIt = () => {
           const query = connection.query(
             `UPDATE employees SET role_id = ${roleID} WHERE id=${ID}`)
             console.log('updated role')
             seeEmployees()
        }  
      }


//----------------------------------------//
//------------Primary Prompt-------------//
//--------------------------------------//
async function promptMe() {
   startPrompt = function(){ 
       inquirer.prompt([
            {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'VIEW EMPLOYEES',
                'VIEW ROLES', 
                'VIEW DEPARTMENTS',
                //'View Employees by Department',//Optional
                //'View Employees By Manager',//Optional
                //,'Update Employee Manager',//Optional
                //,'View department utalized budget',//Optional
                'ADD EMPLOYEE',
                'ADD ROLE',
                'ADD DEPARTMENT',
                'REMOVE EMPLOYEE',
                'UPDATE EMPLOYEE ROLE',
                'EXIT'
            ]
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
                    break
                };
                case 'VIEW ROLES': {
                    console.log('you selected VIEW ROLES');
                    seeRoles()
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
    }
     startPrompt()

}
promptMe()