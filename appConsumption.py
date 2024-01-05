from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/Coffee_Dataset_Db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize SQLAlchemy
db = SQLAlchemy(app)


# Define Customers model
class Customers (db.Model):
    __tablename__ = 'customers'

    customer_id = db.Column(db.String(20), primary_key = True)
    customer_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(30))
    address_line1 = db.Column(db.String(100))
    city = db.Column(db.String(50))
    country =db.Column(db.String(50))
    postal_code = db.Column(db.String(20))
    loyalty_card = db.Column(db.String(20))
    orders = db.relationship('Order', backref='customer', lazy=True)

# Define the Products model
class Products(db.Model):
    __tablename__ = 'products'

    product_id = db.Column(db.String(10), primary_key=True)
    coffee_type = db.Column(db.String(3))
    roast_type = db.Column(db.String(1))
    size = db.Column(db.Float(4))
    unit_price = db.Column(db.Float(20))
    price_per_100g = db.Column(db.Float(20))
    profit = db.Column(db.Float(20))

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.String(15), primary_key=True)
    order_date = db.Column(db.Date, default=datetime.utcnow)
    customer_id = db.Column(db.String(20), db.ForeignKey('customers.customer_id'), nullable=False)
    product_id = db.Column(db.String(10), db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Float)

    __table_args__ = (
        db.UniqueConstraint('order_id', 'product_id', name='unique_order_product'),
    )

# Create a route to fetch and return the data as JSON
@app.route('/coffeeCountries', methods=['GET'])
def get_country():
    with app.app_context():
        data = db.session.query(Customers.country).\
        join(Order, Customers.customer_id == Order.customer_id).\
        join(Products, Order.product_id == Products.product_id).distinct().all()

        result = []
        for row in data:
            result.append({
                'country': row[0]
            })
        return jsonify(result)

# Create a route to fetch and return the data as JSON
@app.route('/coffee', methods=['GET'])
def get_coffee_country():
    with app.app_context():
        data = db.session.query(Customers.country, Products.coffee_type).\
        join(Order, Customers.customer_id == Order.customer_id).\
        join(Products, Order.product_id == Products.product_id).distinct().all()

        result = []
        for row in data:
            result.append({
                'country': row[0],
                'coffee_type': row[1]
            })
        return jsonify(result)

# Create a route to fetch and return the data as JSON
@app.route('/coffeeYear', methods=['GET'])
def get_coffee_year():
    with app.app_context():
        data = db.session.query(Customers.country, db.func.extract('year', Order.order_date).label('order_year')).\
        join(Order, Customers.customer_id == Order.customer_id).\
        join(Products, Order.product_id == Products.product_id).distinct().all()

        result = []
        for row in data:
            result.append({
                'country': row[0],
                'order_year': row[1]
            })
        return jsonify(result)

   # Inside your Flask route or function
@app.route('/get_order_City_CoffeeType')
def get_order_City_CoffeeType():
    with app.app_context():
        data = db.session.query(Customers.city, Customers.country, Customers.postal_code, Products.coffee_type, db.func.extract('year', Order.order_date).label('order_year'),db.func.sum(Order.quantity*Products.size)). \
            join(Customers).join(Products).group_by(Customers.city,Customers.country,Customers.postal_code,Products.coffee_type,'order_year').all()

        result = []
        for row in data:
            result.append({
                'city':row[0],
                'country': row[1],
                'zipcode': row[2],                
                'coffee_type': row[3],
                'order_year': row[4],
                'quantity': row[5]
            })

        return jsonify(result)

   # Inside your Flask route or function
@app.route('/get_order_City_ByYear')
def get_order_City_ByYear():
    with app.app_context():
        data = db.session.query(Customers.city, Customers.country, Customers.postal_code, db.func.extract('year', Order.order_date).label('order_year'), db.func.sum(Order.quantity*Products.size)). \
            join(Customers).join(Products).group_by(Customers.city, Customers.country,Customers.postal_code,'order_year').all()

        result = []
        for row in data:
            result.append({
                'city':row[0],
                'country': row[1],
                'zipcode': row[2],
                'order_year': row[3],                
                'quantity': row[4]
            })

        return jsonify(result)

   # Inside your Flask route or function
@app.route('/get_order_City_ByCoffeType')
def get_order_City_ByCoffeType():
    with app.app_context():
        data = db.session.query(Customers.city, Customers.country, Customers.postal_code, Products.coffee_type, db.func.sum(Order.quantity*Products.size)). \
            join(Customers).join(Products).group_by(Customers.city, Customers.country,Customers.postal_code, Products.coffee_type).all()

        result = []
        for row in data:
            result.append({
                'city':row[0],
                'country': row[1],
                'zipcode': row[2],
                'coffee_type': row[3],                
                'quantity': row[4]
            })

        return jsonify(result)

   # Inside your Flask route or function
@app.route('/get_order_City')
def get_order_City():
    with app.app_context():
        data = db.session.query(Customers.city, Customers.country, Customers.postal_code, db.func.sum(Order.quantity*Products.size)). \
            join(Customers).join(Products).group_by(Customers.city, Customers.country,Customers.postal_code).all()

        result = []
        for row in data:
            result.append({
                'city':row[0],
                'country': row[1],
                'zipcode': row[2],
                'quantity': row[3]
            })

        return jsonify(result)
    
        
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)