USE company_db;
/*above says which db using/going into*/

INSERT INTO departments (name)
VALUE
('engineering'),
('legal'),
('cleaning')
;

INSERT INTO roles (title, salary, department_id)
VALUE
('MANAGER', '50000', 1),
('Engineer', '40000', 1),
('Sr Engineer', '60000', 1),
('MANAGER','50000', 2),
('lawyer', '20000', 2),
('Secretary', '20000', 2),
('MANAGER','50000', 3),
('Cleaner', '20000', 3),
('Sweeper', '20000', 3)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE
('CAT', 'Striker', 1, 1),
('Katsu', 'Calli', 2, 1),
('John', 'Doe', 2, 1),
('Manna','May', 3, 1),
('FRANK', 'Fran', 4, 2),
('Mighty', 'Marlin', 5, 2),
('Jonathan','Smith', 6, 2),
('Amber', 'Coy', 6, 2),
('KEI', 'Sibley', 7, 2),
('Mighty', 'Marlin', 8, 3),
('Jonathan','Smith', 8, 3),
('Amber', 'Coy', 9, 3)
;