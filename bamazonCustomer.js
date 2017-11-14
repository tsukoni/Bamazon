var inquirer = require('inquirer');
var mysql = require('mysql');

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});

function showProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.log('\nItems in Store:');
        for (i = 0; i < res.length; i++) {
            console.log('\nItem ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')')
        }
        placeOrder();
    })
}


function placeOrder() {
    inquirer.prompt([{
        name: 'selectId',
        message: '\nPlease enter the ID of the product you wish to purchase',
        validate: function(value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return '\nPlease enter a valid Product ID'
        }
    }, {
        name: 'selectQuantity',
        message: '\nHow many of this product would you like to order?',
        validate: function(value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return '\nPlease enter a numerical value'
        }
    }]).then(function(answer) {
        connection.query('SELECT * FROM products WHERE item_id = ?', [answer.selectId], function(err, res) {
            if (answer.selectQuantity > res[0].stock_quantity) {
                console.log('\nInsufficient Quantity');
                console.log('\nThis order has been cancelled\n');
                newOrder();
            } else {
                amountOwed = res[0].price * answer.selectQuantity;
                currentDepartment = res[0].department_name;
                console.log('\nThank you for your order');
                console.log('\nYour total comes out to $' + amountOwed);
                console.log('');
                connection.query('UPDATE products SET ? Where ?', [{
                    stock_quantity: res[0].stock_quantity - answer.selectQuantity
                }, {
                    item_id: answer.selectId
                }], function(err, res) {});
                logSaleToDepartment();
                newOrder();
            }
        })

    }, function(err, res) {})
};

function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'
    }]).then(function(answer) {
        if (answer.choice) {
            placeOrder();
        } else {
            console.log('\nThank you for shopping at Bamazon!');
            connection.end();
        }
    })
};

function logSaleToDepartment() {
    connection.query('SELECT * FROM departments WHERE department_name = ?', [currentDepartment], function(err, res) {
        updateSales = res[0].total_sales + amountOwed;
        updateDepartmentTable();
    })
};

function updateDepartmentTable() {
    connection.query('UPDATE departments SET ? WHERE ?', [{
        total_sales: updateSales
    }, {
        department_name: currentDepartment
    }], function(err, res) {});
};

showProducts();