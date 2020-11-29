//mysql -u root -p
require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const promptMe = require('./lib/prompt');

promptMe()
