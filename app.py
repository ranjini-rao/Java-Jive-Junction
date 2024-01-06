# import the dependencies

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session
from flask_cors import CORS, cross_origin
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from datetime import datetime
import json

app = Flask(__name__)
# Enable CORS for all routes
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Configure the database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:anish2803@localhost:5432/Coffee_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Database connection
alchemyEngine = create_engine('postgresql://postgres:anish2803@localhost:5432/Coffee_db', pool_size=20, max_overflow=0);

# reflect an existing database into a new model
base = automap_base()

# reflect the tables
base.prepare(alchemyEngine, reflect=True)

# Save references to each table
coffee_consumption = base.classes.coffee_consumption
coffee_exporters = base.classes.coffee_exporters
coffee_importers = base.classes.coffee_importers
coffee_production = base.classes.coffee_production
coffee_countries = base.classes.countries


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
    

class CoffeeImport(db.Model):
    __tablename__ = 'coffee_importers'
    country = db.Column("country", db.String(255), primary_key=True)
    year_1990 = db.Column("year_1990", db.BigInteger)
    year_1991 = db.Column("year_1991", db.BigInteger)
    year_1992 = db.Column("year_1992", db.BigInteger)
    year_1993 = db.Column("year_1993", db.BigInteger)
    year_1994 = db.Column("year_1994", db.BigInteger)
    year_1995 = db.Column("year_1995", db.BigInteger)
    year_1996 = db.Column("year_1996", db.BigInteger)
    year_1997 = db.Column("year_1997", db.BigInteger)
    year_1998 = db.Column("year_1998", db.BigInteger)
    year_1999 = db.Column("year_1999", db.BigInteger)
    year_2000 = db.Column("year_2000", db.BigInteger)
    year_2001 = db.Column("year_2001", db.BigInteger)
    year_2002 = db.Column("year_2002", db.BigInteger)
    year_2003 = db.Column("year_2003", db.BigInteger)
    year_2004 = db.Column("year_2004", db.BigInteger)
    year_2005 = db.Column("year_2005", db.BigInteger)
    year_2006 = db.Column("year_2006", db.BigInteger)
    year_2007 = db.Column("year_2007", db.BigInteger)
    year_2008 = db.Column("year_2008", db.BigInteger)
    year_2009 = db.Column("year_2009", db.BigInteger)
    year_2010 = db.Column("year_2010", db.BigInteger)
    year_2011 = db.Column("year_2011", db.BigInteger)
    year_2012 = db.Column("year_2012", db.BigInteger)
    year_2013 = db.Column("year_2013", db.BigInteger)
    year_2014 = db.Column("year_2014", db.BigInteger)
    year_2015 = db.Column("year_2015", db.BigInteger)
    year_2016 = db.Column("year_2016", db.BigInteger)
    year_2017 = db.Column("year_2017", db.BigInteger)
    year_2018 = db.Column("year_2018", db.BigInteger)
    year_2019 = db.Column("year_2019", db.BigInteger)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
    
@app.route('/coffeeImport/<country>', methods=['GET'])
def get_coffeeImport(country):
    coffeeImports = CoffeeImport.query.filter(CoffeeImport.country.like("%%"+country+"%%"))
    coffeeImport_json = [coffeeImport.as_dict() for coffeeImport in coffeeImports]
    return jsonify(coffeeImport_json)

@app.route('/getCountries', methods=['GET'])
def get_countries_import():
    countries = []
    coffeeImports = CoffeeImport.query.all()
    for coffeeImport in coffeeImports: 
        countries.append(coffeeImport.country.strip())
    return jsonify(countries)

#create coffee Export
class CoffeeExport(db.Model):
    __tablename__ = 'coffee_exporters'
    country = db.Column("country", db.String(255), primary_key=True)
    year_1990 = db.Column("year_1990", db.BigInteger)
    year_1991 = db.Column("year_1991", db.BigInteger)
    year_1992 = db.Column("year_1992", db.BigInteger)
    year_1993 = db.Column("year_1993", db.BigInteger)
    year_1994 = db.Column("year_1994", db.BigInteger)
    year_1995 = db.Column("year_1995", db.BigInteger)
    year_1996 = db.Column("year_1996", db.BigInteger)
    year_1997 = db.Column("year_1997", db.BigInteger)
    year_1998 = db.Column("year_1998", db.BigInteger)
    year_1999 = db.Column("year_1999", db.BigInteger)
    year_2000 = db.Column("year_2000", db.BigInteger)
    year_2001 = db.Column("year_2001", db.BigInteger)
    year_2002 = db.Column("year_2002", db.BigInteger)
    year_2003 = db.Column("year_2003", db.BigInteger)
    year_2004 = db.Column("year_2004", db.BigInteger)
    year_2005 = db.Column("year_2005", db.BigInteger)
    year_2006 = db.Column("year_2006", db.BigInteger)
    year_2007 = db.Column("year_2007", db.BigInteger)
    year_2008 = db.Column("year_2008", db.BigInteger)
    year_2009 = db.Column("year_2009", db.BigInteger)
    year_2010 = db.Column("year_2010", db.BigInteger)
    year_2011 = db.Column("year_2011", db.BigInteger)
    year_2012 = db.Column("year_2012", db.BigInteger)
    year_2013 = db.Column("year_2013", db.BigInteger)
    year_2014 = db.Column("year_2014", db.BigInteger)
    year_2015 = db.Column("year_2015", db.BigInteger)
    year_2016 = db.Column("year_2016", db.BigInteger)
    year_2017 = db.Column("year_2017", db.BigInteger)
    year_2018 = db.Column("year_2018", db.BigInteger)
    year_2019 = db.Column("year_2019", db.BigInteger)

    def as_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    
@app.route('/CoffeeExport/<country>', methods=['GET'])
def get_CoffeeExport(country):
    coffeeExport = CoffeeExport.query.filter(CoffeeExport.country.like("%%"+country+"%%"))
    coffeeExport_json = [coffeeExport.as_dict() for coffeeExport in coffeeExport]
    return jsonify(coffeeExport_json)

@app.route('/getCountriesExport', methods=['GET'])
def get_countries_export():
    countries = []
    coffeeExports = CoffeeExport.query.all()
    for coffeeExportItem in coffeeExports: 
        countries.append(coffeeExportItem.country.strip())
    return jsonify(countries)

@app.route('/get_country_codes')
@cross_origin()
def country_codes():
    f = open('./js/country-code.json')
    
    # returns JSON object as 
    # a dictionary
    data = json.load(f)
    
    # Closing file
    f.close()
    return data;


@app.route('/get_all_years')
@cross_origin()
def all_years():

    years = [];
    for year in range(1990, 2020):
        years.append(year)

    return jsonify(years);

@app.route('/get_all_data_types')
@cross_origin()
def all_types():

    types = [];
    types.append("Production")
    types.append("Consumption")
    types.append("Export")
    types.append("Import")

    return jsonify(types);

@app.route('/get_all_countries')
@cross_origin()
def countries():

    # Create our session (link) from Python to the DB
    session = Session(alchemyEngine)
    # Excuting query on country table
    countries_data = session.query(coffee_countries.country_id, coffee_countries.country)

    # closing session
    session.close()

    dict = {};
    for row in countries_data:
        dict[row.country_id] = row.country

    return jsonify(dict);

@app.route('/get_export_data')
@cross_origin()
def coffee_export():
    
    # Create our session (link) from Python to the DB
    session = Session(alchemyEngine)
    # Excuting query on country table
    export_data = session.query(coffee_exporters)
     # closing session
    session.close()

    # Creating dictionary per year
    dict = {}
    dict_1990= {}
    dict_1991= {}
    dict_1992= {}
    dict_1993= {}
    dict_1994= {}
    dict_1995= {}
    dict_1996= {}
    dict_1997= {}
    dict_1998= {}
    dict_1999= {}
    dict_2000= {}
    dict_2001= {}
    dict_2002= {}
    dict_2003= {}
    dict_2004= {}
    dict_2005= {}
    dict_2006= {}
    dict_2007= {}
    dict_2008= {}
    dict_2009= {}
    dict_2010= {}
    dict_2011= {}
    dict_2012= {}
    dict_2013= {}
    dict_2014= {}
    dict_2015= {}
    dict_2016= {}
    dict_2017= {}
    dict_2018= {}
    dict_2019= {}
    dict_total_exports = {}

    # Iterating on all rows to assign value to inner dictinoary
    for row in export_data:
        dict_1990[row.country] = row.year_1990
        dict_1991[row.country] = row.year_1991
        dict_1992[row.country] = row.year_1992
        dict_1993[row.country] = row.year_1993
        dict_1994[row.country] = row.year_1994
        dict_1995[row.country] = row.year_1995
        dict_1996[row.country] = row.year_1996
        dict_1997[row.country] = row.year_1997
        dict_1998[row.country] = row.year_1998
        dict_1999[row.country] = row.year_1999
        dict_2000[row.country] = row.year_2000
        dict_2001[row.country] = row.year_2001
        dict_2002[row.country] = row.year_2002
        dict_2003[row.country] = row.year_2003
        dict_2004[row.country] = row.year_2004
        dict_2005[row.country] = row.year_2005
        dict_2006[row.country] = row.year_2006
        dict_2007[row.country] = row.year_2007
        dict_2008[row.country] = row.year_2008
        dict_2009[row.country] = row.year_2009
        dict_2010[row.country] = row.year_2010
        dict_2011[row.country] = row.year_2011
        dict_2012[row.country] = row.year_2012
        dict_2013[row.country] = row.year_2013
        dict_2014[row.country] = row.year_2014
        dict_2015[row.country] = row.year_2015
        dict_2016[row.country] = row.year_2016
        dict_2017[row.country] = row.year_2017
        dict_2018[row.country] = row.year_2018
        dict_2019[row.country] = row.year_2019
        dict_total_exports[row.country] = row.total_exports

    # Assigning yearwise dictionary to outer dictionary
    dict["1990"] = dict_1990
    dict["1991"] = dict_1991
    dict["1992"] = dict_1992
    dict["1993"] = dict_1993
    dict["1994"] = dict_1994
    dict["1995"] = dict_1995
    dict["1996"] = dict_1996
    dict["1997"] = dict_1997
    dict["1998"] = dict_1998
    dict["1999"] = dict_1999
    dict["2000"] = dict_2000
    dict["2001"] = dict_2001
    dict["2002"] = dict_2002
    dict["2003"] = dict_2003
    dict["2004"] = dict_2004
    dict["2005"] = dict_2005
    dict["2006"] = dict_2006
    dict["2007"] = dict_2007
    dict["2008"] = dict_2008
    dict["2009"] = dict_2009
    dict["2010"] = dict_2010
    dict["2011"] = dict_2011
    dict["2012"] = dict_2012
    dict["2013"] = dict_2013
    dict["2014"] = dict_2014
    dict["2015"] = dict_2015
    dict["2016"] = dict_2016
    dict["2017"] = dict_2017
    dict["2018"] = dict_2018
    dict["2019"] = dict_2019
    dict["total_exports"] = dict_total_exports

    return jsonify(dict)

@app.route('/get_import_data')
@cross_origin()
def coffee_import():
    
    # Create our session (link) from Python to the DB
    session = Session(alchemyEngine)
    # Excuting query on country table
    import_data = session.query(coffee_importers)
    # closing session
    session.close()
    # Creating dictionary per year
    dict = {}
    dict_1990= {}
    dict_1991= {}
    dict_1992= {}
    dict_1993= {}
    dict_1994= {}
    dict_1995= {}
    dict_1996= {}
    dict_1997= {}
    dict_1998= {}
    dict_1999= {}
    dict_2000= {}
    dict_2001= {}
    dict_2002= {}
    dict_2003= {}
    dict_2004= {}
    dict_2005= {}
    dict_2006= {}
    dict_2007= {}
    dict_2008= {}
    dict_2009= {}
    dict_2010= {}
    dict_2011= {}
    dict_2012= {}
    dict_2013= {}
    dict_2014= {}
    dict_2015= {}
    dict_2016= {}
    dict_2017= {}
    dict_2018= {}
    dict_2019= {}
    dict_total_imports = {}

    # Iterating on all rows to assign value to inner dictinoary
    for row in import_data:
        dict_1990[row.country] = row.year_1990
        dict_1991[row.country] = row.year_1991
        dict_1992[row.country] = row.year_1992
        dict_1993[row.country] = row.year_1993
        dict_1994[row.country] = row.year_1994
        dict_1995[row.country] = row.year_1995
        dict_1996[row.country] = row.year_1996
        dict_1997[row.country] = row.year_1997
        dict_1998[row.country] = row.year_1998
        dict_1999[row.country] = row.year_1999
        dict_2000[row.country] = row.year_2000
        dict_2001[row.country] = row.year_2001
        dict_2002[row.country] = row.year_2002
        dict_2003[row.country] = row.year_2003
        dict_2004[row.country] = row.year_2004
        dict_2005[row.country] = row.year_2005
        dict_2006[row.country] = row.year_2006
        dict_2007[row.country] = row.year_2007
        dict_2008[row.country] = row.year_2008
        dict_2009[row.country] = row.year_2009
        dict_2010[row.country] = row.year_2010
        dict_2011[row.country] = row.year_2011
        dict_2012[row.country] = row.year_2012
        dict_2013[row.country] = row.year_2013
        dict_2014[row.country] = row.year_2014
        dict_2015[row.country] = row.year_2015
        dict_2016[row.country] = row.year_2016
        dict_2017[row.country] = row.year_2017
        dict_2018[row.country] = row.year_2018
        dict_2019[row.country] = row.year_2019
        dict_total_imports[row.country] = row.totsl_imports

    # Assigning yearwise dictionary to outer dictionary
    dict["1990"] = dict_1990
    dict["1991"] = dict_1991
    dict["1992"] = dict_1992
    dict["1993"] = dict_1993
    dict["1994"] = dict_1994
    dict["1995"] = dict_1995
    dict["1996"] = dict_1996
    dict["1997"] = dict_1997
    dict["1998"] = dict_1998
    dict["1999"] = dict_1999
    dict["2000"] = dict_2000
    dict["2001"] = dict_2001
    dict["2002"] = dict_2002
    dict["2003"] = dict_2003
    dict["2004"] = dict_2004
    dict["2005"] = dict_2005
    dict["2006"] = dict_2006
    dict["2007"] = dict_2007
    dict["2008"] = dict_2008
    dict["2009"] = dict_2009
    dict["2010"] = dict_2010
    dict["2011"] = dict_2011
    dict["2012"] = dict_2012
    dict["2013"] = dict_2013
    dict["2014"] = dict_2014
    dict["2015"] = dict_2015
    dict["2016"] = dict_2016
    dict["2017"] = dict_2017
    dict["2018"] = dict_2018
    dict["2019"] = dict_2019
    dict["total_imports"] = dict_total_imports

    return jsonify(dict)

@app.route('/get_consumption_data')
@cross_origin()
def coffee_consumption_data():
    # Create our session (link) from Python to the DB
    session = Session(alchemyEngine)
    # Excuting query on country table
    consumption = session.query(coffee_consumption)
     # closing session
    session.close()

    # Creating dictionary per year
    dict = {}
    dict_1990= {}
    dict_1991= {}
    dict_1992= {}
    dict_1993= {}
    dict_1994= {}
    dict_1995= {}
    dict_1996= {}
    dict_1997= {}
    dict_1998= {}
    dict_1999= {}
    dict_2000= {}
    dict_2001= {}
    dict_2002= {}
    dict_2003= {}
    dict_2004= {}
    dict_2005= {}
    dict_2006= {}
    dict_2007= {}
    dict_2008= {}
    dict_2009= {}
    dict_2010= {}
    dict_2011= {}
    dict_2012= {}
    dict_2013= {}
    dict_2014= {}
    dict_2015= {}
    dict_2016= {}
    dict_2017= {}
    dict_2018= {}
    dict_2019= {}
    dict_total_consumption = {}
    dict_coffee_type = {}

     # Iterating on all rows to assign value to inner dictinoary
    for row in consumption:
        dict_1990[row.country] = row.year_1990
        dict_1991[row.country] = row.year_1991
        dict_1992[row.country] = row.year_1992
        dict_1993[row.country] = row.year_1993
        dict_1994[row.country] = row.year_1994
        dict_1995[row.country] = row.year_1995
        dict_1996[row.country] = row.year_1996
        dict_1997[row.country] = row.year_1997
        dict_1998[row.country] = row.year_1998
        dict_1999[row.country] = row.year_1999
        dict_2000[row.country] = row.year_2000
        dict_2001[row.country] = row.year_2001
        dict_2002[row.country] = row.year_2002
        dict_2003[row.country] = row.year_2003
        dict_2004[row.country] = row.year_2004
        dict_2005[row.country] = row.year_2005
        dict_2006[row.country] = row.year_2006
        dict_2007[row.country] = row.year_2007
        dict_2008[row.country] = row.year_2008
        dict_2009[row.country] = row.year_2009
        dict_2010[row.country] = row.year_2010
        dict_2011[row.country] = row.year_2011
        dict_2012[row.country] = row.year_2012
        dict_2013[row.country] = row.year_2013
        dict_2014[row.country] = row.year_2014
        dict_2015[row.country] = row.year_2015
        dict_2016[row.country] = row.year_2016
        dict_2017[row.country] = row.year_2017
        dict_2018[row.country] = row.year_2018
        dict_2019[row.country] = row.year_2019
        dict_total_consumption[row.country] = row.total_domestic_consumption
        dict_coffee_type[row.country] = row.coffee_type

     # Assigning yearwise dictionary to outer dictionary
    dict["1990"] = dict_1990
    dict["1991"] = dict_1991
    dict["1992"] = dict_1992
    dict["1993"] = dict_1993
    dict["1994"] = dict_1994
    dict["1995"] = dict_1995
    dict["1996"] = dict_1996
    dict["1997"] = dict_1997
    dict["1998"] = dict_1998
    dict["1999"] = dict_1999
    dict["2000"] = dict_2000
    dict["2001"] = dict_2001
    dict["2002"] = dict_2002
    dict["2003"] = dict_2003
    dict["2004"] = dict_2004
    dict["2005"] = dict_2005
    dict["2006"] = dict_2006
    dict["2007"] = dict_2007
    dict["2008"] = dict_2008
    dict["2009"] = dict_2009
    dict["2010"] = dict_2010
    dict["2011"] = dict_2011
    dict["2012"] = dict_2012
    dict["2013"] = dict_2013
    dict["2014"] = dict_2014
    dict["2015"] = dict_2015
    dict["2016"] = dict_2016
    dict["2017"] = dict_2017
    dict["2018"] = dict_2018
    dict["2019"] = dict_2019
    dict["total_consumption"] = dict_total_consumption
    dict["coffee_type"] = dict_coffee_type

    return jsonify(dict)

@app.route('/get_production_data')
@cross_origin()
def coffee_production_data():
    # Create our session (link) from Python to the DB
    session = Session(alchemyEngine)
    # Excuting query on country table
    production = session.query(coffee_production)
     # closing session
    session.close()

    # Creating dictionary per year
    dict = {}
    dict_1990= {}
    dict_1991= {}
    dict_1992= {}
    dict_1993= {}
    dict_1994= {}
    dict_1995= {}
    dict_1996= {}
    dict_1997= {}
    dict_1998= {}
    dict_1999= {}
    dict_2000= {}
    dict_2001= {}
    dict_2002= {}
    dict_2003= {}
    dict_2004= {}
    dict_2005= {}
    dict_2006= {}
    dict_2007= {}
    dict_2008= {}
    dict_2009= {}
    dict_2010= {}
    dict_2011= {}
    dict_2012= {}
    dict_2013= {}
    dict_2014= {}
    dict_2015= {}
    dict_2016= {}
    dict_2017= {}
    dict_2018= {}
    dict_2019= {}
    dict_total_production = {}

     # Iterating on all rows to assign value to inner dictinoary
    for row in production:
        dict_1990[row.country] = row.year_1990
        dict_1991[row.country] = row.year_1991
        dict_1992[row.country] = row.year_1992
        dict_1993[row.country] = row.year_1993
        dict_1994[row.country] = row.year_1994
        dict_1995[row.country] = row.year_1995
        dict_1996[row.country] = row.year_1996
        dict_1997[row.country] = row.year_1997
        dict_1998[row.country] = row.year_1998
        dict_1999[row.country] = row.year_1999
        dict_2000[row.country] = row.year_2000
        dict_2001[row.country] = row.year_2001
        dict_2002[row.country] = row.year_2002
        dict_2003[row.country] = row.year_2003
        dict_2004[row.country] = row.year_2004
        dict_2005[row.country] = row.year_2005
        dict_2006[row.country] = row.year_2006
        dict_2007[row.country] = row.year_2007
        dict_2008[row.country] = row.year_2008
        dict_2009[row.country] = row.year_2009
        dict_2010[row.country] = row.year_2010
        dict_2011[row.country] = row.year_2011
        dict_2012[row.country] = row.year_2012
        dict_2013[row.country] = row.year_2013
        dict_2014[row.country] = row.year_2014
        dict_2015[row.country] = row.year_2015
        dict_2016[row.country] = row.year_2016
        dict_2017[row.country] = row.year_2017
        dict_2018[row.country] = row.year_2018
        dict_2019[row.country] = row.year_2019
        dict_total_production[row.country] = row.totsl_production

     # Assigning yearwise dictionary to outer dictionary
    dict["1990"] = dict_1990
    dict["1991"] = dict_1991
    dict["1992"] = dict_1992
    dict["1993"] = dict_1993
    dict["1994"] = dict_1994
    dict["1995"] = dict_1995
    dict["1996"] = dict_1996
    dict["1997"] = dict_1997
    dict["1998"] = dict_1998
    dict["1999"] = dict_1999
    dict["2000"] = dict_2000
    dict["2001"] = dict_2001
    dict["2002"] = dict_2002
    dict["2003"] = dict_2003
    dict["2004"] = dict_2004
    dict["2005"] = dict_2005
    dict["2006"] = dict_2006
    dict["2007"] = dict_2007
    dict["2008"] = dict_2008
    dict["2009"] = dict_2009
    dict["2010"] = dict_2010
    dict["2011"] = dict_2011
    dict["2012"] = dict_2012
    dict["2013"] = dict_2013
    dict["2014"] = dict_2014
    dict["2015"] = dict_2015
    dict["2016"] = dict_2016
    dict["2017"] = dict_2017
    dict["2018"] = dict_2018
    dict["2019"] = dict_2019
    dict["total_production"] = dict_total_production

    return jsonify(dict)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True)