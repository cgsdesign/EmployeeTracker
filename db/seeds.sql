USE company_db;
/*
mysql -u root -p
source db/schema.sql*/
/*above says which db using/going into*/

INSERT INTO departments (department_name)
VALUE
('engineering'),
('legal'),
('cleaning')
;

INSERT INTO roles (title, salary, department_id)
VALUE
('Engineering Manager', '50000', 1),
('Engineer', '40000', 1),
('Sr Engineer', '60000', 1),
('Legal Manager','50000', 2),
('Lawyer', '40000', 2),
('Secretary', '20000', 2),
('Custodial Manager','50000', 3),
('Cleaner', '20000', 3),
('Sweeper', '20000', 3)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE
('Cat', 'Striker', 1, NULL),
('Katsu', 'Calli', 2, 1),
('John', 'Doe', 2, 1),
('Manna','May', 3, 1),
('Jokinsa', 'Mea', 4, NULL),
('Mighty', 'Marlin', 5, 5),
('Jonathan','Smith', 6, 5),
('Amber', 'Coy', 6, 5),
('Kei', 'Sibley', 7, NULL),
('Damien', 'Pendergast', 8, 10),
('Jonathan','Smith', 8, 10),
('Amber', 'Coy', 9, 10)
;