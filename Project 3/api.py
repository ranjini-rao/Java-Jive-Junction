# Import the dependencies.
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin
import json

# Database connection
alchemyEngine = create_engine('postgresql+psycopg2://postgres:pallavi@localhost:5432/Coffee_db', pool_size=20, max_overflow=0); 

# reflect an existing database into a new model
base = automap_base()

# reflect the tables
base.prepare(alchemyEngine, reflect=True)

print(base.classes.keys())

# Save references to each table
coffee_consumption = base.classes.coffee_consumption
coffee_exporters = base.classes.coffee_exporters
coffee_importers = base.classes.coffee_importers
coffee_production = base.classes.coffee_production
coffee_countries = base.classes.countries

# Create an app, being sure to pass __name__
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Flask route
@app.route('/get_country_codes')
@cross_origin()
def country_codes():
    f = open('./static/js/country-code.json')
    
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


if __name__ == "__main__":
    app.run(debug=True, port=5001)
    