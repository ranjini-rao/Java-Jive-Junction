# import the dependencies
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:anish2803@localhost:5432/Coffee_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize SQLAlchemy
db = SQLAlchemy(app)


# Define Customers model
class Customers (db.Model):
    __tablename__ = 'customers'

    customer_id = db.Column(db.String(100), primary_key = True)
    customer_name = db.Column(db.String(256))
    email = db.Column(db.String(256))
    phone_number = db.Column(db.String(50))
    address_line_1 = db.Column(db.String(256))
    city = db.Column(db.String(128))
    country =db.Column(db.String(126))
    postcode = db.Column(db.String(10))
    loyalty_card = db.Column(db.String(20))
    orders = db.relationship('Order', backref='customer', lazy=True)

# Define the Products model
class Products(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.String(30), primary_key=True)
    coffee_type = db.Column(db.String(3))
    roast_type = db.Column(db.String(1))
    size = db.Column(db.Float(5))
    unit_price = db.Column(db.Float(20))
    price_per_100grm = db.Column(db.Float(20))
    profit = db.Column(db.Float(30))

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


# Define the Order model
class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.String(30), primary_key=True)
    order_date = db.Column(db.Date, default=datetime.utcnow)
    customer_id = db.Column(db.String(50), db.ForeignKey('customers.customer_id'), nullable=False)

# Define the Order_Items model
class Order_Items(db.Model):
    __tablename__ = 'order_items'

    order_id = db.Column(db.String(30), db.ForeignKey('orders.order_id'), primary_key=True)
    product_id = db.Column(db.String(30), db.ForeignKey('products.product_id'), primary_key=True)
    unit_price = db.Column(db.Float(20))
    quantity = db.Column(db.Float)
    sale_amount = db.Column(db.Float(30))

    order = db.relationship('Order', backref='order_items')
    product = db.relationship('Products', backref='order_items')

    __table_args__ = (
        db.UniqueConstraint('order_id', 'product_id', name='unique_order_product'),
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
        data = db.session.query(Order.order_id, Order.order_date, Customers.customer_id, Customers.customer_name, Customers.email,
                               Customers.city,Customers.country,Customers.postcode, Customers.loyalty_card,Products.coffee_type, Products.roast_type, Products.size,Products.profit, Order_Items.quantity, Order_Items.product_id,Products.unit_price). \
            join(Customers, Order.customer_id == Customers.customer_id). \
join(Order_Items, Order.order_id == Order_Items.order_id). \
join(Products, Order_Items.product_id == Products.product_id). \
filter(Customers.country == 'United States').all()

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