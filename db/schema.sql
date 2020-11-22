CREATE DATABASE [IF NOT EXISTS] company_db

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(20),
    department_id INTEGER(10),
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(10),
    manager_id INTEGER(10),
    PRIMARY KEY (id)
);