DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer shoes", "Apparel", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shinguards", "Apparel", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jersey", "Apparel", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Apparel", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shorts", "Apparel", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ball", "Equipment", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Net", "Equipment", 75, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air pump", "Equipment", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air needle", "Equipment", 1, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Field paint", "Equipment", 10, 100);