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
}

start()
