DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Nova Laptop', 'Electronics', 249.99, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Twilight Sparkles', 'Figurines', 109.95, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Rob Lucci', 'Figurines', 119.95, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Sidavicious Pants', 'Apparel', 59.95, 33);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Falsebound Kingdom Shirt', 'Apparel', 30, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Error Prone Jacket', 'Apparel', 45, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Doflamingo Donquixote', 'Figurines', 125.75, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('X Treasure Pen', 'Accessories', 5, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Utility Belt', 'Accessories', 55, 4);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Quackulator', 'Electronics', 25, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('GPS Recorder', 'Electronics', 299.99, 2);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100) NOT NULL,
	overhead_cost DECIMAL(10,2) NOT NULL,
	total_sales DECIMAL(10,2) DEFAULT 2000,
    profit DECIMAL(10,2) DEFAULT 0,
	PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, overhead_cost) VALUES('Electronics', 1500);
INSERT INTO departments(department_name, overhead_cost) VALUES('Apparel', 500);
INSERT INTO departments(department_name, overhead_cost) VALUES('Figurines', 800);
INSERT INTO departments(department_name, overhead_cost) VALUES('Accessories', 300);