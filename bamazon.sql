DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE `products` (
  `item_id` INT AUTO_INCREMENT NOT NULL,
  `product_name` VARCHAR(70) NULL,
  `department_name` VARCHAR(70) NULL,
  `price` DECIMAL(8,2) NULL,
  `stock_quantity` INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO `products` (product_name, department_name, price, stock_quantity)
VALUES ("Women's Adidas Foam Running Shoes Size 7", "Clothing", 69.99, 8), 
("Cuisinart 3 quart Air Fryer", "Appliances", 50.95, 12), ("7 ft Artificial Christmas Tree", "Home", 299.00, 10),
("Apple Air Pods and Charger", "Electronics", 199.99, 25), ("Samsung 55' UHD Smart TV", "Electronics", 479.95, 8),
("Sweet Home Alabama DVD", "Electronics", 4.99, 15), ("Centrum One-A-Day Vitamin Gummies 60 ct", "Health and Beauty", 12.95, 25),
("Kids Barbie Dream Castle", "Toys", 99.00, 4), ("Glass-Top Picnic Table", "Outdoors", 89.99, 6),
("")

SELECT * FROM products;