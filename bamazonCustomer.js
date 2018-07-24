const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bobcc",
    database: "bamazon"
  });
 
function start() {
    inquirer.prompt([
        {
            type: 'rawlist',
            message: 'Pick a Selection:',
            name: 'choice',
            choices: ['Manager Login', 'Customer Login', 'Exit']
        }
    ]).then(function (response) {
        switch (response.choice) {
            case 'Customer Login':
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                else {
                    console.log("------------------------------------------")
                    console.log("     Welcome to the B AMAZON Store")
                    console.log("Item ID : Product : Price : Stock Quantity")
                    console.log("------------------------------------------")
                  for (let i = 0; i < res.length; i++) {
                      console.log(`${res[i].item_id}  | ${res[i].product_name} | ${res[i].price} | ${res[i].stock_quantity}`)
                  }
                  console.log("------------------------------------------")
                  console.log("           Press CTRL C to exit")
                  console.log("------------------------------------------")
              }
              inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Which Product Would You Like To Buy? (Pick ID)'
                },
                {
                  type: 'input',
                  name: 'quantity',
                  message: 'How many would you like to buy?'
              }
              ]).then(function (answer) {
                  if (answer.id > 10 || isNaN(parseFloat(answer.id))) {
                      console.log("Not a valid product selection. Try again")
                      start()
                  }
                connection.query('SELECT item_id, product_name, price, department_name, stock_quantity  FROM products WHERE ?',
                    [{ item_id: answer.id }],
                    function (err, res) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            for (let i = 0; i < res.length; i++) {
                                console.log("There are " + res[i].stock_quantity + " " + res[i].product_name + " in stock")
                                if (answer.quantity > res[i].stock_quantity) {
                                  console.log("Insufficient Quantity! Try Again")
                                  start()
                                }
                                else {
                                  connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?',
                                  [ answer.quantity, { item_id: answer.id } ])
                                  for (let i = 0; i < res.length; i++) {
                                    console.log("Your purchase of " + answer.quantity + " units of " + res[i].product_name + " costs: " + (res[i].price * answer.quantity))
                                    start()
                                  }          
                                }
                            }    
                        }
                    })
               })
            });
            break
            case 'Manager Login':
                inquirer.prompt([
                    {
                        type: 'rawlist',
                        message: 'Pick a Selection:',
                        name: 'choice',
                        choices: ['View Product For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product']
                    }
                ]).then(function (answer1) {
                    switch (answer1.choice) {
                        case 'View Product For Sale':
                            connection.query("SELECT * FROM products", function(err, res) {
                                if (err) throw err;
                                else {
                                    console.log("------------------------------------------")
                                    console.log("     Welcome to the B AMAZON Store")
                                    console.log("Item ID : Product : Price : Stock Quantity")
                                    console.log("------------------------------------------")
                                for (let i = 0; i < res.length; i++) {
                                  console.log(`${res[i].item_id}  | ${res[i].product_name} | ${res[i].price} | ${res[i].stock_quantity}`)
                                }
                                console.log("------------------------------------------")
                                console.log("           Press CTRL C to exit")
                                console.log("------------------------------------------")
                                }
                                start()
                            })
                        break
                        case 'View Low Inventory':
                            connection.query('SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5', function(err, res) {
                                if (err) throw err;
                                else {
                                    for (let i = 0; i < res.length; i++) {
                                        console.log(`${res[i].item_id}  | ${res[i].product_name} | ${res[i].stock_quantity}`)
                                        if (res.length < 1) {
                                            console.log("All inventories are greater than 5")  // this is not working
                                            start()
                                        }
                                      }
                                      start()   
                                }
                            })        
                        break
                        case 'Add To Inventory':
                        connection.query("SELECT * FROM products", function(err, res) {
                            if (err) throw err;
                            else {
                                console.log("------------------------------------------")
                                console.log("     Welcome to the B AMAZON Store")
                                console.log("Item ID : Product : Price : Stock Quantity")
                                console.log("------------------------------------------")
                              for (let i = 0; i < res.length; i++) {
                                  console.log(`${res[i].item_id}  | ${res[i].product_name} | ${res[i].stock_quantity}`)
                              }
                              console.log("------------------------------------------")
                              console.log("           Press CTRL C to exit")
                              console.log("------------------------------------------")
                          }
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'product',
                                message: 'Which Product Would You Like To Add Inventory To (Pick ID)?'
                            },
                            {
                                type: 'input',
                                name: 'stock',
                                message: 'How much would you like to add?'
                            }    
                          ]).then(function (answer) {
                            connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', 
                            [answer.stock, answer.product],
                            function(err, res) {
                                if (err) throw err;
                                else {
                                    console.log("Stock quantity has been updated by " + answer.stock)
                                    start()
                                }
                            })
                        })
                        })        
                        break
                        case 'Add New Product':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'new_product',
                                message: 'What product would you like to add?'
                            },
                            {
                                type: 'input',
                                name: 'price',
                                message: 'What is the price of the new product?'
                            },
                            {
                                type: 'input',
                                name: 'stock',
                                message: 'How much stock of the new product is there?'
                            },
                            {
                                type: 'input',
                                name: 'department',
                                message: 'What department is this product in?'
                            }
                          ]).then(function (answer) {
                            connection.query('INSERT INTO products (product_name, price, department_name, stock_quantity) VALUES (?,?,?,?)', 
                            [answer.new_product, answer.price, answer.department, answer.stock],
                            function(err, res) {
                                if (err) throw err;
                                else {

                                    start()
                                }
                            })
                        })
                    }
                      
                })
            break
            case 'Exit':
                connection.end()  
        }
    })
} 
start()
