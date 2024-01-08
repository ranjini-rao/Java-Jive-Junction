-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/hCKK3X
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "orders" (
    "order_id" VARCHAR(30)   NOT NULL,
    "order_date" DATE   NOT NULL,
    "customer_id" VARCHAR(100)   NOT NULL,
    CONSTRAINT "pk_orders" PRIMARY KEY (
        "order_id"
     )
);

CREATE TABLE "order_items" (
    "order_id" VARCHAR(30)   NOT NULL,
    "product_id" VARCHAR(30)   NOT NULL,
    "unit_price" FLOAT(20)   NOT NULL,
    "quantity" INT   NOT NULL,
    "sale_amount" FLOAT(30)   NOT NULL,
    CONSTRAINT "pk_order_items" PRIMARY KEY (
        "order_id","product_id"
     )
);

CREATE TABLE "products" (
    "product_id" VARCHAR(30)   NOT NULL,
    "coffee_type" CHAR(3)   NOT NULL,
    "roast_type" CHAR(1)   NOT NULL,
    "size" FLOAT(5)   NOT NULL,
    "unit_price" FLOAT(20)   NOT NULL,
    "price_per_100grm" FLOAT(20)   NOT NULL,
    "profit" FLOAT(30)   NOT NULL,
    CONSTRAINT "pk_products" PRIMARY KEY (
        "product_id"
     )
);

CREATE TABLE "customers" (
    "customer_id" VARCHAR(100)   NOT NULL,
    "customer_name" CHAR(256)   NOT NULL,
    "email" VARCHAR(256)   NOT NULL,
    "phone_number" VARCHAR(50)   NOT NULL,
    "address_line_1" VARCHAR(256)   NOT NULL,
    "city" VARCHAR(128)   NOT NULL,
    "country" VARCHAR(126)   NOT NULL,
    "postcode" VARCHAR(10)   NOT NULL,
    "loyalty_card" VARCHAR(20)   NOT NULL,
    CONSTRAINT "pk_customers" PRIMARY KEY (
        "customer_id"
     )
);

ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_customer_id" FOREIGN KEY("customer_id")
REFERENCES "customers" ("customer_id");

ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_order_id" FOREIGN KEY("order_id")
REFERENCES "orders" ("order_id");

ALTER TABLE "order_items" ADD CONSTRAINT "fk_order_items_product_id" FOREIGN KEY("product_id")
REFERENCES "products" ("product_id");

