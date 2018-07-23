# bamazon

This is a Node.js & MySQL "Amazon" like application.

Through Node, a user can select a product and quantity to purchase.

If there is sufficient inventory of selected product, the user will get a message showing the purchase price and the inventory will be updated in the database to reflect the purchase.

If there is not sufficient inventory, the user will be prompted to choose again.

Directions:

1. npm install inquirer
1. npm install mysql
1. node bamazonCustomer.js
1. Returns a list of products to select
1. Select product by ID
1. Enter quantity
1. Retuns the purchase price and updates the stock quantity in the database

