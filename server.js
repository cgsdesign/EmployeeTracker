//mysql -u root -p
require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const {addEmployee, addRole, addDepartment,removeEmployee, testHookups} = require('./lib/addRemoveSee');
const promptMe = require('./lib/prompt');

promptMe()
