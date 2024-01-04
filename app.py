# import the dependencies
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/Coffee_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize SQLAlchemy
db = SQLAlchemy(app)


# Define Customers model
class Customers (db.Model):
    __tablename__ = 'Customers'

    Customer_ID = db.Column(db.String(100), primary_key = True)
    Customer_Name = db.Column(db.String(256))
    Email = db.Column(db.String(256))
    Phone_Number = db.Column(db.String(50))
    Address_Line_1 = db.Column(db.String(256))
    City = db.Column(db.String(128))
    Country =db.Column(db.String(126))
    Postcode = db.Column(db.String(10))
    Loyalty_Card = db.Column(db.String(20))
    orders = db.relationship('Order', backref='customer', lazy=True)

# Define the Products model
class Products(db.Model):
    __tablename__ = 'Products'

    Product_ID = db.Column(db.String(30), primary_key=True)
    Coffee_Type = db.Column(db.String(3))
    Roast_Type = db.Column(db.String(1))
    Size = db.Column(db.Float(5))
    Unit_Price = db.Column(db.Float(20))
    Price_per_100GRM = db.Column(db.Float(20))
    Profit = db.Column(db.Float(30))

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


# Define the Order model
class Order(db.Model):
    __tablename__ = 'Orders'

    Order_ID = db.Column(db.String(30), primary_key=True)
    Order_Date = db.Column(db.Date, default=datetime.utcnow)
    Customer_ID = db.Column(db.String(50), db.ForeignKey('Customers.Customer_ID'), nullable=False)

# Define the Order_Items model
class Order_Items(db.Model):
    __tablename__ = 'Order_Items'

    Order_ID = db.Column(db.String(30), db.ForeignKey('Orders.Order_ID'), primary_key=True)
    Product_ID = db.Column(db.String(30), db.ForeignKey('Products.Product_ID'), primary_key=True)
    Unit_Price = db.Column(db.Float(20))
    Quantity = db.Column(db.Float)
    Sale_Amount = db.Column(db.Float(30))

    order = db.relationship('Order', backref='order_items')
    product = db.relationship('Products', backref='order_items')

    __table_args__ = (
        db.UniqueConstraint('Order_ID', 'Product_ID', name='unique_order_product'),
    )

# Route to fetch products data
@app.route('/products', methods=['GET'])
def get_products():
    products = Products.query.all()
    products_json = [product.as_dict() for product in products]
    return jsonify(products_json)


# Route for the complete order details
@app.route('/get_order_data')
def get_order_data():
    with app.app_context():
        data = db.session.query(Order.Order_ID, Order.Order_Date, Customers.Customer_ID, Customers.Customer_Name, Customers.Email,
                               Customers.City,Customers.Country,Customers.Postcode, Customers.Loyalty_Card,Products.Coffee_Type, Products.Roast_Type, Products.Size,Products.Profit, Order_Items.Quantity, Order_Items.Product_ID,Products.Unit_Price). \
            join(Customers, Order.Customer_ID == Customers.Customer_ID). \
join(Order_Items, Order.Order_ID == Order_Items.Order_ID). \
join(Products, Order_Items.Product_ID == Products.Product_ID). \
filter(Customers.Country == 'United States').all()

        result = []
        for row in data:
            result.append({
                'order_id': row[0],
                'order_date': row[1].strftime('%Y-%m-%d'),
                'customer_id' : row[2],
                'customer_name': row[3],
                'customer_email': row[4],
                'city':row[5],
                'country': row[6],
                'postal_code': row[7],
                'loyalty_card' : row[8],
                'coffee_type': row[9],
                'roast_type': row[10],
                'size': row[11],
                'profit':row[12],
                'quantity': row[13],
                'product_id': row[14],
                'unit_price': row[15]
                
            })

        return jsonify(result)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)