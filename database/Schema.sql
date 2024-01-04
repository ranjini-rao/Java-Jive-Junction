-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/hCKK3X
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Orders" (
    "Order_ID" VARCHAR(30)   NOT NULL,
    "Order_Date" DATE   NOT NULL,
    "Customer_ID" VARCHAR(50)   NOT NULL,
    CONSTRAINT "pk_Orders" PRIMARY KEY (
        "Order_ID"
     )
);

CREATE TABLE "Order_Items" (
    "Order_ID" VARCHAR(30)   NOT NULL,
    "Product_ID" VARCHAR(30)   NOT NULL,
    "Unit_Price" FLOAT(20)   NOT NULL,
    "Quantity" INT   NOT NULL,
    "Sale_Amount" FLOAT(30)   NOT NULL,
    CONSTRAINT "pk_Order_Items" PRIMARY KEY (
        "Order_ID","Product_ID"
     )
);

CREATE TABLE "Products" (
    "Product_ID" VARCHAR(20)   NOT NULL,
    "Coffee_Type" CHAR(10)   NOT NULL,
    "Roast_Type" CHAR(5)   NOT NULL,
    "Size" FLOAT(5)   NOT NULL,
    "Unit_Price" FLOAT(20)   NOT NULL,
    "Price_per_100GRM" FLOAT(20)   NOT NULL,
    "Profit" FLOAT(30)   NOT NULL,
    CONSTRAINT "pk_Products" PRIMARY KEY (
        "Product_ID"
     )
);

CREATE TABLE "Customers" (
    "Customer_ID" VARCHAR(100)   NOT NULL,
    "Customer_Name" CHAR(256)   NOT NULL,
    "Email" VARCHAR(256)   NOT NULL,
    "Phone_Number" VARCHAR(50)   NOT NULL,
    "Address_Line_1" VARCHAR(256)   NOT NULL,
    "City" VARCHAR(128)   NOT NULL,
    "Country" VARCHAR(126)   NOT NULL,
    "Postcode" VARCHAR(10)   NOT NULL,
    "Loyalty_Card" VARCHAR(20)   NOT NULL,
    CONSTRAINT "pk_Customers" PRIMARY KEY (
        "Customer_ID"
     )
);

ALTER TABLE "Orders" ADD CONSTRAINT "fk_Orders_Customer_ID" FOREIGN KEY("Customer_ID")
REFERENCES "Customers" ("Customer_ID");

ALTER TABLE "Order_Items" ADD CONSTRAINT "fk_Order_Items_Order_ID" FOREIGN KEY("Order_ID")
REFERENCES "Orders" ("Order_ID");

ALTER TABLE "Order_Items" ADD CONSTRAINT "fk_Order_Items_Product_ID" FOREIGN KEY("Product_ID")
REFERENCES "Products" ("Product_ID");

