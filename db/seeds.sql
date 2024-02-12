INSERT INTO department (name)
VALUES ('Managment') 
      ('IT'), 
      ('HR'),
      ('Marketing'),
      ('Admissions'),
      ('Sales'),
      ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES ('Chief Exexutive Officer', 300000, 1),
        ('IT Manager', 150000, 2),
        ('HR Manager', 120000, 3),
        ('Marketingg Lead', 110000, 4),
        ('Admissions Director', 95000, 5),
        ('Sales Lead', 90000, 6),
        ('Accounting  Manager', 100000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Matt', 'Cook', 1, 1),
        ('Brittany', 'Cook', 2, 2),
        ('Henry', 'Cook', 3, 3),
        ('Bob', 'Cook', 4, 4),
        ('Kim', 'Cook', 5, 5),
        ('Scotty', 'Cook', 6, 6),
        ('Kyra', 'Cook', 7, 7);
