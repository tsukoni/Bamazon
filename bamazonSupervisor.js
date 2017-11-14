var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bohavrtvv96',
    database: 'bamazon_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
    supervisorOptions();
});

function supervisorOptions() {
    inquirer.prompt([{
        name: 'input',
        type: 'list',
        message: 'What would you like to do today?',
        choices: ['1) View Sales By Department', '2) Create New Department']
    }]).then(function(answer) {
        if (answer.input === '1) View Sales By Department') {
            console.log('');
            connection.query('SELECT * FROM departments', function(err, res) {
                console.log('SALES BY DEPARTMENT');
                for (i = 0; i < res.length; i++) {
                    var profit = res[i].total_sales - res[i].overhead_cost;
                    console.log('Department ID: ' + res[i].department_id + ' | ' + 'Department Name: ' + res[i].department_name);
                    console.log('Overhead Costs: ' + res[i].overhead_cost);
                    console.log('Total Sales: ' + res[i].total_sales);
                    console.log('Total Profit: ' + profit);
                    console.log('-----------------');
                }
                newAction();
            })
        } else {
            addDepartment();
        }

    })
};

function newAction() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to perform another action?'
    }]).then(function(answer) {
        if (answer.choice) {
            supervisorOptions();
        } else {
            console.log('Have a good day');
            connection.end();
        }
    })
}

function addDepartment() {
    inquirer.prompt([{
        name: 'department',
        message: 'Enter department name: '
    }, {
        name: 'overhead',
        message: 'Enter overhead costs: '
    }]).then(function(answer) {
        var department = answer.department;
        var overhead = answer.overhead;
        connection.query('INSERT INTO departments SET ?', {
            department_name: department,
            overhead_cost: overhead
        }, function(err, res) {});
        newAction();
    })
};