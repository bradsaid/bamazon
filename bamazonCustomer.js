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
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price} | ${res[i].stock_quantity}`)
        }
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
      connection.query('SELECT item_id, product_name, price, department_name, stock_quantity  FROM products WHERE ?',
          [{ item_id: answer.id }],
          function (err, res) {
              if (err) {
                  console.log(err)
              }
              else {
                  for (let i = 0; i < res.length; i++) {
                      console.log(`${res[i].product_name} | ${res[i].stock_quantity}`)
                      if (answer.quantity > res[i].stock_quantity) {
                        console.log("Insufficient Quantity! Try Again")
                        start()
                      }
                      else {
                        connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?',
                        [ answer.quantity, { item_id: answer.id } ])
                        for (let i = 0; i < res.length; i++) {
                          console.log("Your purchase of " + answer.quantity + " units of " + res[i].product_name + " costs: " + (res[i].price * answer.quantity))
                          connection.end()  
                        }          
                      }
                  }    
              }
          })
     })
  });
}

start()
