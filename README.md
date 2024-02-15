# Employee Tracker

This is a simple employee tracker application built using Express, Inquirer, Node.js, and MySQL. It allows you to perform various operations such as viewing all departments, roles, and employees, adding new departments, roles, and employees, as well as updating an employee's role.

## Features

- View all departments: Lists all departments currently stored in the database.
- View all roles: Displays a list of all roles along with their salaries and associated departments.
- View all employees: Shows a list of all employees with their respective roles, salaries, and managers.
- Add a department: Allows you to create a new department by providing its name.
- Add a role: Enables you to add a new role with a title, salary, and associated department.
- Add an employee: Lets you add a new employee with their first name, last name, role, and optionally, a manager.
- Update an employee role: Allows you to change the role of an existing employee.

## Installation

1. Clone the repository:
2. Navigate to the project directory.
3. Install dependencies using npm:

```bash
git clone <'https://github.com/mcook2323/prework-study-guide.git'>
```
1. Make sure you have MySQL installed and running on your local machine. You can download and install MySQL from here.
2. Set up your MySQL database by running the provided schema.sql file in your MySQL command line or GUI tool.
```bash
mysql -u username -p < schema.sql
```
## Usage

1. Start appllication by running
``` bash
npm start
```
- Follow the prompts to view departments, roles, and employees, or to add a department, role, employee, or update an employee's role.

## Features
* View all departments: Displays a list of all departments.
* View all roles: Displays a list of all roles along with their department and salary information.
* View all employees: Displays a list of all employees along with their role, department, salary, and manager information.
* Add a department: Allows the user to add a new department.
* Add a role: Allows the user to add a new role by specifying the title, salary, and department.
* Add an employee: Allows the user to add a new employee by specifying their first name, last name, role, and manager.
* Update an employee role: Allows the user to update an employee's role by selecting the employee and the new role.

## Dependencies

* Express: Fast, unopinionated, minimalist web framework for Node.js.
* Inquirer.js: A collection of common interactive command line user interfaces.
* MySQL2: MySQL client for Node.js with focus on performance.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, feel free to open an issue or create a pull request.

# Walkthrough
![](Untitled_%20Feb%2015,%202024%202_57%20PM.gif)