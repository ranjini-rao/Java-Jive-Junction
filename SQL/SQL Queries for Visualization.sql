-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "products" (
    "product_id" VARCHAR(10)   NOT NULL,
    "coffee_type" CHAR(3)   NOT NULL,
    "roast_type" CHAR(1)   NOT NULL,
    "size" FLOAT(4)   NOT NULL,
    "unit_price" FLOAT(20)   NOT NULL,
    "price_per_100g" FLOAT(20)   NOT NULL,
    "profit" FLOAT(20)   NOT NULL,
    CONSTRAINT "pk_products" PRIMARY KEY (
        "product_id"
     )
);

CREATE TABLE "customers" (
    "customer_id" VARCHAR(20)   NOT NULL,
    "customer_name" VARCHAR(100)   NOT NULL,
    "email" VARCHAR(100)   NOT NULL,
    "phone_number" VARCHAR(30)   NOT NULL,
    "address_line1" VARCHAR(100)   NOT NULL,
    "city" VARCHAR(50)   NOT NULL,
    "country" VARCHAR(50)   NOT NULL,
    "postal_code" VARCHAR(20)   NOT NULL,
    "loyalty_card" varchar(20)   NOT NULL,
    CONSTRAINT "pk_customers" PRIMARY KEY (
        "customer_id"
     )
);


CREATE TABLE "orders" (
    "order_id" VARCHAR(15)   NOT NULL,
    "order_date" DATE   NOT NULL,
    "customer_id" VARCHAR(20)   NOT NULL,
    "product_id" VARCHAR(10)   NOT NULL,
    "quantity" FLOAT   NOT NULL,
    CONSTRAINT "pk_orders" PRIMARY KEY (
        "order_id","product_id"
     )
);

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_customer_id" FOREIGN KEY("customer_id")
REFERENCES "customers" ("customer_id");

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_product_id" FOREIGN KEY("product_id")
REFERENCES "products" ("product_id");


-- FIND THE PROFIT PER COUNTRY
SELECT
    c.country,
    SUM(p.profit * o.quantity) AS total_profit
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    c.country;


-- FIND THE PER CAPITA PROFIT PER COUNTRY
SELECT
    c.country,
    COUNT(DISTINCT c.customer_id) AS num_customers,
    SUM(p.profit * o.quantity) AS total_profit,
    SUM(p.profit * o.quantity) / COUNT(DISTINCT c.customer_id) AS per_capita_profit
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    c.country;
	
-- With and without a loyalt card
SELECT
    c.country,
    c.loyalty_card,
    COUNT(DISTINCT c.customer_id) AS num_customers,
    SUM(p.profit * o.quantity) AS total_profit,
    SUM(p.profit * o.quantity) / COUNT(DISTINCT c.customer_id) AS per_capita_profit
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    c.country, c.loyalty_card;
	

-- Rank the order by country
SELECT
    p.coffee_type,
    c.country,
    COUNT(o.order_id) AS order_count
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    p.coffee_type, c.country
ORDER BY
    p.coffee_type, order_count DESC;

-- Rank the order by country as a % of total orders
SELECT
    p.coffee_type,
    c.country,
    (COUNT(o.order_id) * 100.0) / NULLIF(SUM(COUNT(o.order_id)) OVER (PARTITION BY c.country), 0) AS percentage
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    p.coffee_type, c.country
ORDER BY
    p.coffee_type, c.country;
	
-- Just the United States as a percentage of orders
SELECT
    p.coffee_type,
    (COUNT(o.order_id) * 100.0) / NULLIF(SUM(COUNT(o.order_id)) OVER (), 0) AS percentage
FROM
    orders o
JOIN
    products p ON o.product_id = p.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
WHERE
    c.country = 'United States'
GROUP BY
    p.coffee_type
ORDER BY
    p.coffee_type;

-- average price and profit for each coffee type
SELECT
    p.coffee_type,
    AVG(p.unit_price) AS average_price,
    AVG(p.profit) AS average_profit
FROM
    products p
GROUP BY
    p.coffee_type
ORDER BY
    p.coffee_type;
	
-- Order % by each country with average price and profit

SELECT
    p.coffee_type,
    AVG(p.unit_price) AS average_price,
    AVG(p.profit) AS average_profit,
    c.country,
    COUNT(o.order_id) * 100.0 / NULLIF(SUM(COUNT(o.order_id)) OVER (PARTITION BY c.country), 0) AS percentage_ordered
FROM
    products p
JOIN
    orders o ON p.product_id = o.product_id
JOIN
    customers c ON o.customer_id = c.customer_id
GROUP BY
    p.coffee_type, c.country
ORDER BY
    p.coffee_type, c.country;
	
