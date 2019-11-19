var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    buyProducts();
});


function buyProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What is the ID number of the item you would like to buy?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How many would you like?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if there is enough in stock
                if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                    console.log("Insufficent Quantity!");
                    buyProducts();
                }
                // update database and display total
                else {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stock_quantity - answer.quantity
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Thank you! Your total is: $ " + (answer.quantity) * (chosenItem.price));
                            buyProducts();
                        }
                    );
                }

            });
    });
}