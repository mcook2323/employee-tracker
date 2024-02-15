// Various packages used to run
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// List choices to begin the process of running the employee tracker along with the functions used to complete each task 
function startQuestions() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
      message: 'What would you like to do?'
    }
  ])
  .then((answer) => {
    switch (answer.options) {
      case 'view all departments':
        viewAllDepartments();
        break;
      case 'view all roles':
        viewAllRoles();
        break;
      case 'view all employees':
        viewallEmployees();
        break;
      case 'add a department':
        addDepartment();
        break;
      case 'add a role':
        addRole();
        break;
      case 'add an employee':
        addEmployee();
        break;
      case 'update an employee role':
        updateEmployeeRole();
        break;
    }
  });
}

// Function allows you to view all departments 
function viewAllDepartments() {
  const sql = 'SELECT * FROM department'; 
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
}

// Function allows you to view each role 
function viewAllRoles() {
  const sql = 'SELECT * FROM role'; 
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
}

// Function allows you to view each employee 
function viewallEmployees() {
  const sql = 'SELECT * FROM employee';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuestions();
  });
}

// Function allows you to add a department 
function addDepartment() {
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  })
  .then((answer) => {
    console.log(answer.name);
    const sql = `INSERT INTO department (name) VALUES ('${answer.name}')`;
    connection.query(sql, (err, res) => {
      if(err) throw err;
      console.log(`Added department ${answer.name} to the table`);
      startQuestions();
    });
  });
}

// Function allows you to add a role 
function addRole() {
  const sql = 'SELECT * FROM department';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the new role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: "Select the department for the new role:",
        choices: res.map((department) => ({
          name: department.name,
          value: department.id 
        }))
      }
    ])
    .then((answer) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department_id}')`;
      connection.query(sql, (err, res) => {
        if(err) throw err;
        console.log(`Added role ${answer.title} to the table`);
        startQuestions();
      });
    });
  });
}

// Function allows you to add an employee 
function addEmployee() {
  const sql = `SELECT title, id FROM role`;
  connection.query(sql, (err, roles) => {
    if (err) throw err;

    const roleChoices = roles.map((role) => ({ name: role.title, value: role.id }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "roleId",
          message: "What role does the employee hold?",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the employee manager:",
          choices: [
            { name: "None", value: null },
            
          ],
        },
      ])
      .then((answer) => {
        const { firstName, lastName, roleId, managerId } = answer;
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [firstName, lastName, roleId, managerId], (err, res) => {
          if (err) throw err;
          console.log(`Added employee ${firstName} ${lastName} to the table`);
          startQuestions();
        });
      });
  });
}


// Function allows you to update the role (role_id) of the employee 
function updateEmployeeRole() {
  const sqlEmployee = 'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee';
  const sqlRole = 'SELECT * FROM role';
  
  connection.query(sqlEmployee, (err, resEmployees) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      return;
    }
    
    connection.query(sqlRole, (err, resRoles) => {
      if (err) {
        console.error('Error retrieving roles:', err);
        return;
      }
      
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Select the employee',
          choices: resEmployees.map(
            (employee) => 
            `${employee.first_name} ${employee.last_name}`
          )
        },
        {
          type: 'list',
          name: 'role',
          message: 'Select the new role',
          choices: resRoles.map((role) => role.title)
        }
      ]).then((answers) => {
        const selectedEmployee = resEmployees.find((employee) =>
          `${employee.first_name} ${employee.last_name}` === answers.employee
        );
        const selectedRole = resRoles.find((role) => role.title === answers.role);

        const sqlUpdate = 'UPDATE employee SET role_id = ? WHERE id = ?';
        connection.query(sqlUpdate, [selectedRole.id, selectedEmployee.id], (err, result) => {
          if (err) {
            console.error('Error updating employee role:', err);
            return;
          }
          console.log('Employee role updated successfully');
          startQuestions();
        });
      });
    });
  });
}



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startQuestions();
});

process.on('exit', () => {
  connection.end();
});
