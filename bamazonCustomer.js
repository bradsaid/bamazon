const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    connection.end();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      //create()
    });
  }

  inquirer
  .prompt([
    {
      type: "input",
      message: "Would you like to POST or BID on an item?",
      name: "selection"
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.selection === "POST" || inquirerResponse.selection === "BID") {
      console.log("\nOk, let's " + inquirerResponse.selection);
    }
    else {
      console.log("\nOoops, that wasn't an option\n");
    }
  });

  /*function create() {
    console.log("Inserting a new item...\n");
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        item: "",
        price: "",
      },
      function(err, res) {
        console.log(res.affectedRows + " item inserted!\n");
      }
    );
    //console.log(query.sql);
  }*/