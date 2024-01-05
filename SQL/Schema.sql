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

