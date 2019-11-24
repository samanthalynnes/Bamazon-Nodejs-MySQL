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
    displayList();
});

// show initial list of what's available
function displayList() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Items Available:");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " Product Name: " + res[i].product_name +
                " Department: " + res[i].department_name + " Price: $" + res[i].price + " Stock Quantity: " + res[i].stock_quantity);
        };
        buyProducts();
    });
};

// buy function and database update
function buyProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // prompt the user for what they'd like to buy
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What is the ID number of the item you would like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }
            ])
            .then(function (answer) {
                connection.query("SELECT * FROM products WHERE ?",
                    {
                        item_id: answer.choice
                    },
                    function (err, res) {
                        if (answer.quantity > res[0].stock_quantity) {
                            console.log("Sorry, insufficient quantity!");
                            displayList();
                        }
                        else {
                            var total = res[0].price * answer.quantity;
                            console.log("Thank you! Your total is: $ " + total);
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: res[0].stock_quantity - answer.quantity
                                    },
                                    {
                                        item_id: answer.choice
                                    }
                                ]),
                                console.log("Feel free to order again below!");
                            displayList();
                        };
                    })
            })
    })
}

        // displayList();

