# bamazon

This is a Node.js & MySQL "Amazon" like application.

Through Node, a user can select a product and quantity to purchase.

If there is sufficient inventory of selected product, the user will get a message showing the purchase price and the inventory will be updated in the database to reflect the purchase.

If there is not sufficient inventory, the user will be prompted to choose again.

Installation Directions:

1. npm install inquirer
1. npm install mysql
1. node bamazonCustomer.js

Manager Login Usage Directions:

1. Manager Login allows for creating products, viewing product status and add stock quantities. [a link](https://github.com/bradsaid/bamazon/blob/master/Screenshots/1.png)
1. View Products For Sale returns a list of product details.
1. View Low Inventory returns a list of all products with a stock_quanity less than 5.
1. Add To Inventory allows the manager to add to the stock_quantity of a specific item.
1. And New Product allows the manager to create a new product.

Customer Login Usage Directions:

1. Customer Login allows for purchases.
1. Returns a list of products to select.
1. Select product by ID.
1. Enter quantity.
1. Retuns the purchase price and updates the stock quantity in the database.

